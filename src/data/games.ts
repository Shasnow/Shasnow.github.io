export interface Game {
  id: string;
  name: string | Record<string, string>;
  locales: string[];
  defaultLocale: string;
  dataSources: Record<string, string>;
}

export const games: Game[] = [
  { id: "sr", name: {"zh-CN": "崩坏：星穹铁道", en: "Honkai: Star Rail"}, locales: ["zh-CN", "en-US"], defaultLocale: "zh-CN", dataSources: {
    "zh-CN": "https://sr.mihoyo.com/news?nav=news&type=notice",
    "en-US": "https://hsr.hoyoverse.com/en-us/news?type=notice",
  } },
  { id: "ys", name: {"zh-CN": "原神", en: "Genshin Impact"}, locales: ["zh-CN", "en-US"], defaultLocale: "zh-CN", dataSources: {
    "all" : "node scripts/fetch-ys-activity.mjs",
    "zh-CN": "https://ys.mihoyo.com/main/news",
    "en-US": "https://genshin.hoyoverse.com/en/news",
  } },
  { id: "zzz", name: {"zh-CN": "绝区零", en: "Zenless Zone Zero"}, locales: ["zh-CN", "en-US"], defaultLocale: "zh-CN", dataSources: {
    "zh-CN": "https://zzz.mihoyo.com/news",
    "en-US": "https://zenless.hoyoverse.com/en-us/news",
  } },
  { id: "ww", name: {"zh-CN": "鸣潮", en: "Wuthering Waves"}, locales: ["zh-CN", "en-US"], defaultLocale: "zh-CN", dataSources: {
    "zh-CN": "https://mc.kurogames.com/main/news",
    "en-US": "https://wutheringwaves.kurogames.com/en/main/news",
  } },
  { id: "nte", name: {"zh-CN": "异环", en: "NTE"}, locales: ["zh-CN", "en-US"], defaultLocale: "zh-CN", dataSources: {
    "zh-CN": "https://yh.wanmei.com/news/index.html",
    "en-US": "https://nte.perfectworld.com/en/article/news/gamenews/index.html",
  } },
  // 碧蓝档案三个服进度各不相同，按维护者此前的做法拆成三个条目。数据由
  // scripts/gen-ba-activity.mjs 从 GameKee 的活动表生成（各服官网都是 JS 渲染，
  // 拿不到活动列表），返回的文案本身就是中文，所以三个条目都只出 zh-CN
  { id: "ba-cn", name: {"zh-CN": "蔚蓝档案（国服）", en: "Blue Archive (CN)"}, locales: ["zh-CN"], defaultLocale: "zh-CN", dataSources: {
    "all": "node scripts/gen-ba-activity.mjs",
  } },
  { id: "ba-jp", name: {"zh-CN": "蔚蓝档案（日服）", en: "Blue Archive (JP)"}, locales: ["zh-CN"], defaultLocale: "zh-CN", dataSources: {
    "all": "node scripts/gen-ba-activity.mjs",
  } },
  { id: "ba-global", name: {"zh-CN": "蔚蓝档案（国际服）", en: "Blue Archive (Global)"}, locales: ["zh-CN"], defaultLocale: "zh-CN", dataSources: {
    "all": "node scripts/gen-ba-activity.mjs",
  } },
  { id: "ak", name: {"zh-CN": "明日方舟", en: "Arknights"}, locales: ["zh-CN"], defaultLocale: "zh-CN", dataSources: {
    "zh-CN": "https://ak.hypergryph.com/news",
    // 活动一览（含分类与精确起止）在 PRTS 上，公告里没写全时以它为准
    // https://prts.wiki/w/活动一览
  } },
  { id: "end", name: {"zh-CN": "明日方舟：终末地", en: "Arknights: Endfield"}, locales: ["zh-CN"], defaultLocale: "zh-CN", dataSources: {
    "zh-CN": "https://endfield.hypergryph.com/news",
    // 活动与卡池的结构化数据在 AKEData（https://data.akedata.wiki），公告里文字含糊时以它为准
  } },
  { id: "end-global", name: {"en-US": "Arknights: Endfield", "zh-CN": "明日方舟：终末地（国际服）"}, locales: ["en-US"], defaultLocale: "en-US", dataSources: {
    "en-US": "https://endfield.gryphline.com/news",
  } },
  { id: "ss", name: {"zh-CN": "星塔旅人", en: "Stella Sora"}, locales: ["zh-CN"], defaultLocale: "zh-CN", dataSources: {
    // 官网公告列表是 JS 渲染的，用它的接口：每页固定 6 条，翻页加 index
    "zh-CN": "https://stellasora.yostar.cn/api/resource/news?index=1",
  } },
];
