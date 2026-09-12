#!/usr/bin/env node
/**
 * 碧蓝档案（Blue Archive）活动数据生成器
 *
 * 按 `public/api/v1/activity/{game}.json` 的既有格式，生成三个服的数据：
 *
 *     node scripts/gen-ba-activity.mjs
 *     node scripts/gen-ba-activity.mjs --out-dir ./tmp   # 先看结果再决定要不要覆盖
 *
 * 数据来源
 * --------
 * Kivo 古书馆时间轴公开接口：https://api.kivo.wiki/api/v1/timeline/
 *
 * 选它而不是 SchaleDB，是因为它同时给出**日服 / 国际服 / 国服**三份数据，并带封面图与
 * 描述文本；SchaleDB 的国服时间字段实测滞后（最后一条结束于 2026-07-16），且没有封面与描述。
 *
 * 两点使用注意事项：
 *
 * 1. 该接口对 `Origin` 做白名单校验（只放行 kivo.wiki 自己的来源）。脚本这类不带 `Origin`
 *    的请求可以正常拿到 200，但**浏览器直连会 403** —— 所以更新数据只能在 Node/Python 侧跑，
 *    不能靠页面里 fetch。
 * 2. 接口地址带上结尾斜杠；少了会先吃一个 301。
 *
 * 与 skill 的关系
 * ---------------
 * `.agents/skills/game-activity-extractor` 描述的是「从官方公告（文章/图片）人工或 agent 提取」，
 * 适用于原神 / 星穹铁道 / 绝区零 / 鸣潮 / 异环这类有明确版本号的游戏。碧蓝档案没有版本号概念，
 * 且三服进度不同，公告分散在各服官网与社区，因此这里改用 Kivo 的结构化时间轴生成，
 * 再由人工核对后提交 —— 流程上仍属于「提取 → 复核 → 提交」，只是提取环节由脚本完成。
 *
 * 需要人工确认的部分：Kivo 的分类（`type`）偶尔会把同一活动拆成「活动」与「活动介绍PV」两条，
 * 脚本按标题去重并保留结束时间最晚的一条；版本字段（`version` / `versionName`）在碧蓝档案没有
 * 对应概念，用「当月 + 服务器名」占位，保证字段齐全。
 */

import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const API_URL = 'https://api.kivo.wiki/api/v1/timeline/'

/** 只取「活动」；卡池、掉落加倍、维护等分类不进活动数据 */
const WANTED_TYPES = new Set(['Event'])

/** 每页 50 条、按时间倒序，3 页足以覆盖最近数周 */
const PAGE_SIZE = 50
const MAX_PAGES = 3

/** 往前多带几天已经结束的活动，让数据在活动间隙里也有内容 */
const RECENT_WINDOW_DAYS = 14

/** SRA 的时间字段不带时区标记，按其既有数据的惯例填北京时间 */
const TIMEZONE_OFFSET_MS = 8 * 60 * 60 * 1000

/** Kivo 的服务器标识 → 输出文件名（注意国际服的原文拼写是 Globle） */
const SERVERS = [
  { key: 'jp', lineType: 'JP', label: '日服' },
  { key: 'global', lineType: 'Globle', label: '国际服' },
  { key: 'cn', lineType: 'CN', label: '国服' },
]

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DEFAULT_OUT_DIR = path.join(REPO_ROOT, 'public', 'api', 'v1', 'activity')

/** Unix 秒 → SRA 使用的无时区 ISO 8601 字符串（北京时间） */
const toIso = seconds => new Date(seconds * 1000 + TIMEZONE_OFFSET_MS).toISOString().slice(0, 19)

/** Kivo 的图片地址是协议相对 URL（//static...），补全为 https */
const normalizeImage = image => {
  if (!image) return ''
  return image.startsWith('//') ? `https:${image}` : image
}

/** 当月（北京时间），用作碧蓝档案缺失的版本号占位 */
const currentMonth = () =>
  new Date(Date.now() + TIMEZONE_OFFSET_MS).toISOString().slice(0, 7)

const parseOutDir = () => {
  const index = process.argv.indexOf('--out-dir')
  if (index === -1) return DEFAULT_OUT_DIR
  const value = process.argv[index + 1]
  if (!value) {
    throw new Error('--out-dir 后面要跟一个目录')
  }
  return path.resolve(value)
}

const fetchTimeline = async lineType => {
  const items = []
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const url = new URL(API_URL)
    url.searchParams.set('page', String(page))
    url.searchParams.set('page_size', String(PAGE_SIZE))
    url.searchParams.set('line_type', lineType)

    const response = await fetch(url, { headers: { Accept: 'application/json' } })
    if (!response.ok) {
      throw new Error(`${lineType} 第 ${page} 页请求失败：HTTP ${response.status}`)
    }

    const payload = await response.json()
    const batch = payload?.data?.timeline ?? []
    if (batch.length === 0) break
    items.push(...batch)
  }
  return items
}

/** 筛出目标分类、去重并按开始时间升序，转成 SRA 的活动条目 */
const buildActivities = (items, now) => {
  const horizon = now - RECENT_WINDOW_DAYS * 86400
  const picked = new Map()

  for (const item of items) {
    if (!WANTED_TYPES.has(item?.type)) continue

    const { start_time: start, end_time: end } = item
    if (!Number.isFinite(start) || !Number.isFinite(end)) continue
    if (end < horizon) continue

    const name = (item.title ?? '').trim()
    if (!name) continue

    // 同一活动可能被拆成多条记录，「保留结束时间最晚的那条」
    const existing = picked.get(name)
    if (existing && existing.end >= end) continue

    picked.set(name, {
      name,
      description: (item.body_summary ?? '').trim().slice(0, 200),
      startTime: toIso(start),
      endTime: toIso(end),
      cover: normalizeImage(item.image),
      start,
      end,
    })
  }

  return [...picked.values()]
    .sort((left, right) => left.start - right.start)
    .map(({ start, end, ...activity }) => activity)
}

const main = async () => {
  const outDir = parseOutDir()
  const now = Date.now() / 1000

  await mkdir(outDir, { recursive: true })

  for (const { key, lineType, label } of SERVERS) {
    const activities = buildActivities(await fetchTimeline(lineType), now)

    // SRA 的 version / versionName 描述「当前版本」；碧蓝档案没有版本号概念，
    // 用当月与服务器名占位，保证字段齐全。顶层 cover 取最新一条活动的封面。
    const head = activities[0]
    const latest = activities.at(-1)

    const payload = {
      version: currentMonth(),
      versionName: `${label}活动`,
      startTime: head?.startTime ?? '',
      endTime: latest?.endTime ?? '',
      cover: latest?.cover ?? '',
      activities,
    }

    const file = path.join(outDir, `ba-${key}.json`)
    await writeFile(file, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
    console.log(`${label}: ${activities.length} 条 → ${path.relative(REPO_ROOT, file)}`)
  }

  console.log('\n请人工核对最新活动后提交（各服进度不同，Kivo 的数据也会有延迟）。')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
