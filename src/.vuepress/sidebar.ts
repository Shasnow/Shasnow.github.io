import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    {
      text: "问题排查",
      icon: "info",
      // prefix: "/getstarted/",
      children: [
        {
          text: "常见问题",
          // prefix: "/trouble/",
          children: [
            { text: "常见问题", link: "/faq" },
          ]
        },
        {
          text: "快速排查",
          prefix: "/trouble/",
          children: [
            { text: "SRA 问题排查指南", link: "/trouble/having_trouble" },
          ]
        }
      ]
    },
    {
      text: "开始使用",
      icon: "signs-post",
      prefix: "/getstarted/",
      children: [
        {
          text: "快速上手",
          prefix: "/getstarted/",
          children: [
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
            { text: "学习 Python", icon: "laptop", link: "/develop/study" },
            { text: "PySide基础", icon: "code", link:"/develop/study-pyside"}
          ]
        },
        {
          text: "开始开发",
          prefix: "/getstarted/",
          children: [
            { text: "编写规范", icon: "file", link: "/develop/coding-style-guidelines" },
            { text: "SRA API", icon: "box", link: "/develop/API" },
            // { text: "插件开发指南", icon: "laptop-code", link: "/develop/plugin-development-guide" },
            // { text: "插件提交管理指南", icon: "upload", link: "/develop/plugin-submit-manage-guide" },
            { text: "教程",icon: "code", link: "/develop/tutorial" },
          ]
        }
      ]
    },
  ]
});
