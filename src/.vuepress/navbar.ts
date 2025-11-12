import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",

  "/download",
  "/sponsor",
  "/faq",
    {
      text: "教程文档",
      icon: "book",
      children:[
        {
          text: "快速上手",
          prefix: "/getstarted/",
          children: [
            { text: "介绍", icon: "play", link: "/getstarted/" },
            { text: "基础操作", icon: "flag", link: "/getstarted/getstarted" },
            { text: "进阶操作", icon: "rocket", link: "/getstarted/advance" }
          ]
        },
        {
          text: "参与开发-前置条件",
          prefix: "/develop/",
          children: [
            { text: "介绍", icon: "play", link: "/develop/" },
            { text: "学习 Python", icon: "laptop", link: "/develop/study" },
            { text: "PySide基础", icon: "code", link:"/develop/study-pyside"}
          ]
        },
        {
          text: "参与开发-开始开发",
          prefix: "/develop/",
          children: [
            { text: "代码格式规范", icon: "file", link: "/develop/coding-style-guidelines" },
            { text: "SRA API", icon: "box", link: "/develop/API" },
            { text: "插件开发指南", icon: "laptop-code", link: "/develop/plugin-development-guide" },
            { text: "插件提交管理指南", icon: "upload", link: "/develop/plugin-submit-manage-guide" }
          ]
        }
      ]
    },
    {
      text: "外部链接",
      icon: "link",
      children: [
        {
          text: "项目仓库",
          link: "https://github.com/Shasnow/StarRailAssistant"
        },
        // {
        //   text: "插件管理平台（测试环节）",
        //   link: "https://sra-pm-platform.netlify.app/"
        // }
      ]
    }
]);
