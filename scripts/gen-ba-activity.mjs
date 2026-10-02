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
 * GameKee 的活动表接口：https://www.gamekee.com/v1/activity/page-list
 *
 * 选它而不是 Kivo 时间轴，是因为 Kivo 那份数据实测会滞后一到两周，而且把「战斗通行证」
 * 这类没有活动关的付费内容也标成 `Event`；GameKee 的活动表三服都有，分类、起止时间与
 * 配图都是结构化的，更新也更及时（AUTO-MAS 首页的碧蓝档案卡片用的就是它）。
 *
 * 三点使用注意事项：
 *
 * 1. 请求必须带 `game-alias: ba` 头，站点靠它识别是哪个游戏，少了会返回
 *    `{"code":403,"msg":"缺少游戏信息"}`；`serverId` 区分服务器：15 日服、17 国际服、16 国服。
 * 2. 配图那个 CDN 校验 `Referer`，浏览器直接引用会吃到一张 HTML 而不是图片。这里只生成
 *    静态 JSON，给不出可用图，所以 `cover` 一律留空——消费端（如 AUTO-MAS）自己有图片
 *    中转的可以按活动名自行补图。
 * 3. 分类字段是中文：只有「活动」会开活动关，总力大决、爬塔、多倍活动、战术测试这些都不算；
 *    标题里带「战斗通行证」「网页活动」的同样不算（与 AUTO-MAS 侧口径一致）。
 *
 * 需要人工确认的部分：同一活动可能被拆成多条记录，脚本按标题去重并保留结束时间最晚的一条；
 * 版本字段（`version` / `versionName`）在碧蓝档案没有对应概念，用「当月 + 服务器名」占位，
 * 保证字段齐全。
 */

import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const API_URL = 'https://www.gamekee.com/v1/activity/page-list'

/** 站点靠这个头识别游戏，少了会 403「缺少游戏信息」 */
const GAMEKEE_HEADERS = {
  'game-alias': 'ba',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  Accept: 'application/json',
}

/** 只取「活动」；卡池、总力战、爬塔、多倍活动等分类不进活动数据 */
const WANTED_KIND = '活动'

/** 分类算「活动」但没有活动关的，按标题排除 */
const SKIP_TITLE_KEYWORDS = ['战斗通行证', '网页活动']

/** 每页 100 条、按开始时间倒序，3 页足以覆盖最近数周 */
const PAGE_SIZE = 100
const MAX_PAGES = 3

/** 往前多带几天已经结束的活动，让数据在活动间隙里也有内容 */
const RECENT_WINDOW_DAYS = 14

/** SRA 的时间字段不带时区标记，按其既有数据的惯例填北京时间 */
const TIMEZONE_OFFSET_MS = 8 * 60 * 60 * 1000

/** 服务器标识 → 输出文件名（`serverId` 取自 GameKee，国际服在它那儿叫 Globle） */
const SERVERS = [
  { key: 'jp', serverId: 15, label: '日服' },
  { key: 'global', serverId: 17, label: '国际服' },
  { key: 'cn', serverId: 16, label: '国服' },
]

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DEFAULT_OUT_DIR = path.join(REPO_ROOT, 'public', 'api', 'v1', 'activity')

/** Unix 秒 → SRA 使用的无时区 ISO 8601 字符串（北京时间） */
const toIso = seconds => new Date(seconds * 1000 + TIMEZONE_OFFSET_MS).toISOString().slice(0, 19)

/** 结束时间按既有数据的惯例落到那一分钟的最后一秒（`03:59:59` 而不是 `03:59:00`） */
const toEndIso = seconds => `${toIso(seconds).slice(0, 17)}59`

/** 当月（北京时间），用作碧蓝档案缺失的版本号占位 */
const currentMonth = () => new Date(Date.now() + TIMEZONE_OFFSET_MS).toISOString().slice(0, 7)

const parseOutDir = () => {
  const index = process.argv.indexOf('--out-dir')
  if (index === -1) return DEFAULT_OUT_DIR
  const value = process.argv[index + 1]
  if (!value) {
    throw new Error('--out-dir 后面要跟一个目录')
  }
  return path.resolve(value)
}

const fetchActivities = async serverId => {
  const items = []
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const url = new URL(API_URL)
    url.searchParams.set('serverId', String(serverId))
    url.searchParams.set('page_no', String(page))
    url.searchParams.set('limit', String(PAGE_SIZE))
    url.searchParams.set('status', '0')
    url.searchParams.set('importance', '0')
    url.searchParams.set('sort', '-1')
    url.searchParams.set('keyword', '')

    const response = await fetch(url, {
      headers: { ...GAMEKEE_HEADERS, Referer: `https://www.gamekee.com/ba/huodong/${serverId}` },
    })
    if (!response.ok) {
      throw new Error(`serverId=${serverId} 第 ${page} 页请求失败：HTTP ${response.status}`)
    }

    const payload = await response.json()
    if (payload?.code !== 0) {
      throw new Error(`serverId=${serverId} 第 ${page} 页返回异常：${payload?.msg ?? payload?.code}`)
    }

    const batch = Array.isArray(payload?.data) ? payload.data : []
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
    if (item?.activity_kind_name !== WANTED_KIND) continue

    const name = (item.title ?? '').trim()
    if (!name) continue
    if (SKIP_TITLE_KEYWORDS.some(keyword => name.includes(keyword))) continue

    const start = item.begin_at
    const end = item.end_at
    if (!Number.isFinite(start) || !Number.isFinite(end)) continue
    if (end <= start || end < horizon) continue

    // 同一活动可能被拆成多条记录：「保留结束时间最晚的那条」
    const existing = picked.get(name)
    if (existing && existing.end >= end) continue

    picked.set(name, {
      name,
      description: (item.description ?? '').trim().replace(/\s+/g, ' ').slice(0, 200),
      startTime: toIso(start),
      endTime: toEndIso(end),
      // 配图 CDN 校验 Referer，静态 JSON 里给了也取不到，留空
      cover: '',
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

  for (const { key, serverId, label } of SERVERS) {
    const activities = buildActivities(await fetchActivities(serverId), now)

    // SRA 的 version / versionName 描述「当前版本」；碧蓝档案没有版本号概念，
    // 用当月与服务器名占位，保证字段齐全。顶层时间取活动区间的首尾。
    const head = activities[0]
    const latest = activities.at(-1)

    const payload = {
      version: currentMonth(),
      versionName: `${label}活动`,
      startTime: head?.startTime ?? '',
      endTime: latest?.endTime ?? '',
      cover: '',
      activities,
    }

    const file = path.join(outDir, `ba-${key}.json`)
    await writeFile(file, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
    console.log(`${label}: ${activities.length} 条 → ${path.relative(REPO_ROOT, file)}`)
  }

  console.log('\n请人工核对最新活动后提交（各服进度不同，站点数据也会有延迟）。')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
