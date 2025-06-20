import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    "pluginstore",
    "download",
    "sponsor",
    "faq",
    {
      text: "开始使用",
      icon: "signs-post",
      prefix: "/getstarted/",
      children: [
        {
          text: "快速上手",
          prefix: "/getstarted/",
          children: [
            { text: "介绍", icon: "play", link: "/getstarted/" },
            { text: "基础操作", icon: "flag", link: "/getstarted/getstarted" },
            { text: "进阶操作", icon: "rocket", link: "/getstarted/advance" }
          ]
        }
      ]
    },
    {
      text: "开发文档",
      icon: "laptop-code",
      prefix: "/develop/",
      children: [
        {
          text: "前置条件",
          prefix: "/getstarted/",
          children: [
            { text: "介绍", icon: "play", link: "/develop/" },
            { text: "前言", icon: "info", link: "/develop/before" },
            { text: "学习 Python", icon: "laptop", link: "/develop/study" }
          ]
        },
        {
          text: "开始开发",
          prefix: "/getstarted/",
          children: [
            { text: "编写规范", icon: "file", link: "/develop/coding-style-guidelines" },
            { text: "SRA API", icon: "box", link: "/develop/API" },
            { text: "插件开发指南", icon: "laptop-code", link: "/develop/plugin-development-guide" }
          ]
        }
      ]
    },
  ]
});
