// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightDocSearch from "@astrojs/starlight-docsearch";

// https://astro.build/config
export default defineConfig({
	site: 'https://starrailassistant.top',
	integrations: [
		starlight({
			title: 'StarRailAssistant',
			description: '崩坏：星穹铁道助手 | 一个基于图像识别的崩铁自动化程序，帮您完成从启动到退出的崩铁日常。',
			logo: { src: './src/assets/SRAico.png'},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Shasnow/StarRailAssistant' }],
			editLink: { baseUrl: 'https://github.com/Shasnow/Shasnow.github.io' },
			sidebar: [
				{
					label: '从这里开始',
					items: [{autogenerate: { directory: 'getting-started' }}],
				},
				{
					label: 'SRA-cli 命令行工具',
					items: [{ autogenerate: { directory: 'cli' } }],
				},
				{
					label: 'SRA-server',
					items: [{ autogenerate: { directory: 'server' } }]
				},
				{
					label: '指南',
					items: [{ autogenerate: { directory: 'guides' } }]
				},
				{
					label: '教程',
					items: [{ autogenerate: { directory: 'tutorials' } }]
				},
				{ label: '赞助', slug: 'sponsor' },
				{ label: '加入我们', slug: 'join-us' },
			],
			locales: {
				root: {
					label: "简体中文",
					lang: "zh-CN"
				}
			},
			plugins: [
				starlightDocSearch({
					appId: "S8GXZVU0M4",
					apiKey: "29f87aa85e555e6bcd3df6e748615101",
					indexName: "starrailassistant",
				})
			],
			customCss: [
				'./src/styles/main.css',
				'./src/styles/download.css',
			],
			favicon: 'favicon.ico',
			lastUpdated: true
		}),
	],
});
