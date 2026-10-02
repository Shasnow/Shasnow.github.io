# StarRailAssistant Docs

[StarRailAssistant](https://github.com/Shasnow/StarRailAssistant) 的官方文档站与公共数据 API，基于 [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) 构建。

线上地址：[starrailassistant.top](https://starrailassistant.top)

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

## 站点内容

- **文档**：SRA 使用文档（从这里开始、SRA-cli、SRA-server、指南、教程、赞助、加入我们）
- **参考**：开发者参考（如 [SRA 公共 API](https://starrailassistant.top/api/v1/) 及其贡献指南）
- **攻略站**：`/strategy/` 货币战争攻略的分享与下载（Vue 岛屿组件，复用 Starlight 页头、无文档侧边栏，登录与数据来自外部后端）
- **公共数据 API**：`public/api/v1/activity/` 下以静态 JSON 提供各游戏版本活动数据，支持简体中文与英文

## 目录结构

```text
├── astro.config.mjs          # 站点配置（标题、侧边栏、多语言、搜索）
├── src/
│   ├── content/docs/         # 文档内容（简体中文为根，en/ 为英文版）
│   ├── data/games.ts         # 游戏活动数据源配置（GameDataSource）
│   ├── pages/strategy/       # 攻略站页面（StarlightPage 外壳，无侧边栏）
│   ├── components/           # 自定义组件（GameTabs 等）
│   │   └── strategy/         # 攻略站 Vue 岛屿（StrategyApp.vue + api/auth/session/ui 模块）
│   └── styles/               # 全局样式
├── public/api/v1/activity/   # 公共活动数据 JSON（随站点静态发布）
├── public/sra-strategy-site/ # 旧攻略站路径重定向页
├── scripts/                  # 数据抓取 / 生成脚本（输出到 tmp/）
└── .agents/skills/           # skills
```

## 快速开始

环境要求：**Node.js ≥ 22**，包管理器使用 **pnpm**（见 `packageManager` 字段）。

```sh
pnpm install       # 安装依赖
pnpm dev           # 本地开发，访问 http://localhost:4321
pnpm build         # 生成静态文件到 ./dist/
pnpm preview       # 本地预览构建结果
```

## 公共活动数据

活动数据由 `src/data/games.ts` 中配置的数据源驱动，支持三种类型：

| 类型       | 说明                                                     |
| ---------- | -------------------------------------------------------- |
| `html`     | 公告列表页，AI 从列表页定位版本公告并解析活动信息         |
| `script`   | 生成脚本（`scripts/` 下），自行抓取并转换数据             |
| `pageData` | 分页 JSON 接口，通过 `articleUrl` 模板拼接文章链接        |

新增游戏或维护活动数据的完整格式说明，参见站点内的[公共 API 贡献指南](https://starrailassistant.top/en/reference/public-api/)（源文件 `src/content/docs/reference/public-api.mdx`）。AI 辅助提取流程见 `.agents/skills/game-activity-extractor/SKILL.md`。

## 部署

推送到 `main` 分支后，[GitHub Actions](.github/workflows/deploy.yml) 自动构建并发布到 GitHub Pages（自定义域名 `starrailassistant.top`）。

## 贡献

欢迎贡献！Fork 本仓库 → 创建分支 → 修改并提交 → 创建 Pull Request。

- 文档修改：直接编辑 `src/content/docs/` 下对应的 `.md` 或 `.mdx` 文件（英文版在 `en/` 子目录）
- 活动数据修改：编辑 `public/api/v1/activity/` 下对应的 JSON 文件

## 许可证

[MIT License](LICENSE)
