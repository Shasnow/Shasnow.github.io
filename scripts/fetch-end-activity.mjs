// 抓取 akedata.wiki（明日方舟：终末地）活动表数据，联表解析后生成临时文件 tmp/end-activity.json（不直接覆盖 public 下的 end.json）
// 链路：manifest.json 的 latest → 版本化 TableCfg → ActivityTable（主表）+ TimeRangeTable（时间）
//       + ActivityTagTable（标签）+ I18nTextTable_CN（文本回填）
// 数据来源即 https://www.akedata.wiki/?plugin=v3_activity 页面的后端表
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "tmp", "end-activity.json");

const DATA_BASE = "https://data.akedata.wiki";

// 文本引用使用有符号 Int64 id，先转成字符串再 JSON.parse 以避免精度丢失
const losslessParse = (text) =>
  JSON.parse(text.replace(/("id"\s*:\s*)(-?\d{16,})(?=\s*[,}])/g, '$1"$2"'));

const getJson = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
    return res.text();
  }).then(losslessParse);

// 1. 解析 manifest 定位 latest 版本的表格路径
const manifest = await getJson(`${DATA_BASE}/manifest.json`);
const version = manifest.versions.find((v) => v.id === manifest.latest) ?? manifest.versions[0];
if (!version?.tableCfgPath) throw new Error("manifest.json 中未找到可用的 tableCfgPath");
const tableUrl = (name) => `${DATA_BASE}/${version.tableCfgPath}/${name}.json`;

// 2. 并行下载四张表
const [activities, timeRanges, tagsTable, i18n] = await Promise.all([
  getJson(tableUrl("ActivityTable")),
  getJson(tableUrl("TimeRangeTable")),
  getJson(tableUrl("ActivityTagTable")),
  getJson(tableUrl("I18nTextTable_CN")),
]);

// {id, text} 结构的文本：text 为空时用 I18n 表按 id 回填（与 akedata 前端 hydrate 逻辑一致）
const text = (ref) => (typeof ref === "string" ? ref : ref?.text || i18n[String(ref?.id)] || "");
// 去除游戏内富文本标记（如 <size=30><color=#FFF100>…</color></size>）
const plainText = (ref) => text(ref).replace(/<[^>]+>/g, "").trim();

// "2026/9/9 12:00:00" → "2026-09-09T12:00:00"（逐段补零，否则 new Date 解析失败）
const toIso = (value) => {
  const [date, time = "00:00:00"] = value.split(" ");
  const [y, m, d] = date.split("/");
  const [hh, mm, ss] = time.split(":");
  const pad = (n) => n.padStart(2, "0");
  return `${y}-${pad(m)}-${pad(d)}T${pad(hh)}:${pad(mm)}:${pad(ss)}`;
};
// 结束时间取最后一秒（06:00:00 关闭 → 05:59:59）
const toEndIso = (value) => {
  const t = new Date(toIso(value));
  t.setSeconds(t.getSeconds() - 1);
  const pad = (n) => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}T${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`;
};

// 3. 联表转换 + 过滤
const now = Date.now();
const excluded = [];
const result = [];
for (const [id, row] of Object.entries(activities)) {
  const range = timeRanges[row.timeId]?.timeRangeList?.[0] || {};
  const name = text(row.name) || id;
  let reason = "";
  if (!range.closeTime) reason = "永久/常驻";
  else if ((row.panelId || "").startsWith("ActivityWEB")) reason = "网页活动";
  else if (!range.openTime) reason = "无开始时间";
  else if (new Date(toIso(range.closeTime)).getTime() < now) reason = "已结束";
  else if (id === "activity_more") reason = "占位入口";
  if (reason) {
    excluded.push(`${name}（${reason}）`);
    continue;
  }
  result.push({
    name,
    description: plainText(row.desc),
    startTime: toIso(range.openTime),
    endTime: toEndIso(range.closeTime),
    cover: "",
  });
}
result.sort((a, b) => a.startTime.localeCompare(b.startTime));

// 4. 版本级信息：version 取 gameVersion 前两段（如 1.5.3 → 1.5），起止取收录活动的最早/最晚时间
const startTimes = result.map((a) => a.startTime).sort();
const endTimes = result.map((a) => a.endTime).sort();
const output = {
  version: version.gameVersion.split(".").slice(0, 2).join("."),
  versionName: "",
  startTime: startTimes[0] ?? "",
  endTime: endTimes[endTimes.length - 1] ?? "",
  cover: "",
  activities: result,
};

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");
console.log(`表版本 ${version.id}：已写入 ${result.length} 个活动到 ${outPath}`);
console.log("用法：输出已是目标格式，核对后写入 public/api/v1/activity/end.json（保持 2 空格缩进）；");
console.log("versionName / cover 为空（表数据无此来源），如有版本公告可补充。");
const ended = excluded.filter((e) => e.includes("已结束")).length;
const rest = excluded.filter((e) => !e.includes("已结束"));
if (rest.length) console.log(`已排除 ${excluded.length} 项（其中已结束 ${ended} 项）：\n  ${rest.join("\n  ")}`);
