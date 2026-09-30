// 从 public/api/v1/activity/*.json 中找出最需要更新的游戏：
// 按游戏分组（文件名 {id}.json / {id}-{locale}.json），取组内顶层版本 endTime 的最大值作为
// 该游戏的数据截止时间（不看活动 endTime），输出截止最早（最先过期）的游戏及该时间。
import { readdir, readFile } from "node:fs/promises";

const LOCALE_SUFFIXES = ["-zh-CN", "-en-US"];
const dir = new URL("../public/api/v1/activity/", import.meta.url);

const files = (await readdir(dir)).filter((f) => f.endsWith(".json")).sort();

/** @type {Map<string, { version: string, latest: string, files: string[] }>} */
const games = new Map();

const toTime = (iso) => {
  const t = Date.parse(iso);
  return Number.isNaN(t) ? null : t;
};

const collectEndTimes = (data) =>
  typeof data.endTime === "string" ? [data.endTime] : [];

for (const file of files) {
  const base = file.slice(0, -".json".length);
  const suffix = LOCALE_SUFFIXES.find((s) => base.endsWith(s));
  const id = suffix ? base.slice(0, -suffix.length) : base;

  const data = JSON.parse(await readFile(new URL(file, dir), "utf8"));
  const entry = games.get(id) ?? { version: "", latest: "", files: [] };
  entry.files.push(file);
  if (data.version && data.version > entry.version) entry.version = data.version;

  for (const iso of collectEndTimes(data)) {
    const t = toTime(iso);
    if (t !== null && (entry.latest === "" || t > toTime(entry.latest))) entry.latest = iso;
  }
  games.set(id, entry);
}

const now = Date.now();
const ranked = [...games.entries()]
  .filter(([, e]) => e.latest)
  .sort((a, b) => toTime(a[1].latest) - toTime(b[1].latest));

const fmt = (ms) => {
  const days = Math.floor(Math.abs(ms) / 86400000);
  const sign = ms < 0 ? "已过期" : "剩余";
  return `${sign} ${days} 天`;
};

console.log("按数据截止时间（max endTime）升序，最上面的最需要更新：\n");
for (const [id, e] of ranked) {
  const diff = toTime(e.latest) - now;
  console.log(`  ${id.padEnd(8)} | ${e.latest} | ${fmt(diff)} | v${e.version || "?"} | ${e.files.join(", ")}`);
}

const [mostStale] = ranked;
if (mostStale) {
  console.log(`\n最需要更新的游戏: ${mostStale[0]}，更新时间（max endTime）: ${mostStale[1].latest}（${fmt(toTime(mostStale[1].latest) - now)}）`);
} else {
  console.log("未找到任何包含 endTime 的活动数据。");
}
