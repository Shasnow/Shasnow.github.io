import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "StarRailAssistant",
  head:[['link', {rel: 'icon', href: '/img/SRAicon.ico'}]],
  description: "一个基于图像识别的崩铁自动化程序，帮您完成从启动到退出的崩铁日常。",
  theme,
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
