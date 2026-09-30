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
];
