## 项目简介
本项目为 StarRailAssistant 的官方网站提供支持，基于 VuePress 框架，使用 VuePress Theme Hope 主题。

相关链接

[StarRailAssistant](https://starrailassistant.top)

[VuePress Theme Hope](https://theme-hope.vuejs.press/zh/)


## 🚀 快速开始

## 如果需要修改文档内容，可直接定位到对应的md文件，修改后保存即可。

### 1️⃣ 安装依赖
确保你的机器上安装了 **Node.js (>=18.x)**，然后运行：
```sh
npm install  # 或者使用 pnpm install / yarn install
```
> 如果你看到了类似 `npm error While resolving: vuepress-theme-hope@2.0.0-rc.92` 的错误，可以尝试用 `npm install @vuepress/plugin-docsearch@2.0.0-rc.108 --save-dev` 解决。


### 2️⃣ 本地运行
```sh
npm run docs:dev  # 或 pnpm run docs:dev / yarn docs:dev
```
你会在控制台看到如下内容：
```bash
> sra-docs@1.0.0 docs:dev
> vuepress-vite dev src

✔ Initializing and preparing data - done in 1.09s

  vite v6.3.5 dev server running at:

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://172.23.224.1:8080/
  ➜  Network: http://192.168.2.6:8080/
```
你可以Ctrl+鼠标左键点击提示中的地址来预览文档。
你也可以直接访问 **`http://localhost:8080/`** 来预览文档。

### 3️⃣ 生成静态文件
```sh
npm run docs:build  # 或 pnpm run docs:build / yarn docs:build
```
静态文件将生成到 `.vitepress/dist/` 目录。

### 4️⃣ 预览构建结果
```sh
npm run docs:preview  # 或 pnpm run docs:preview / yarn docs:preview
```


## ❤️ 贡献指南

欢迎贡献你的改进！
1. **Fork** 本仓库
2. **创建分支**
   ```sh
   git checkout -b feature/my-new-feature
   ```
3. **提交修改**
   ```sh
   git commit -m "feat: 添加新功能"
   ```
4. **推送分支**
   ```sh
   git push origin feature/my-new-feature
   ```
5. **创建 Pull Request**


## 📜 许可证
本项目采用 MIT License 许可。