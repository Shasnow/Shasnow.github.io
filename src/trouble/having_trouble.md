---
title: SRA 问题排查指南
icon: tool
order: 1
---

# SRA 问题排查指南

此文章会引导你缩小你遇到的问题可能存在的范围。可使用右侧（或屏幕下方）的`此页内容`快速定位。

本页面目前只整合了最少、最常见的问题。如果您的问题在本页和[常见问题](/faq)都没有，请前往官方群反馈问题。

想为此文档做出贡献？在文档尾部点击 *在 GitHub 上编辑此页* 

你可以在外部链接中找到官方群的进群链接。

## 找不到文件

特征：

- 启动任务时提示无法启动配置xxx,请检查后端状态
- 控制台提示无法找到文件 SRA-cli.exe,请检查安装完整性

解决方法：

将 SRA 整体文件夹添加信任（具体可[点击此处查看](../getstarted/getstarted.html#添加信任)）

然后，重新解压程序（如果你使用的是安装包，请重新打开安装包安装程序）

---

特征：

- 控制台提示启动失败：An error occurred trying to start prosess "SRA-cli.exe" with working directory 'xxx'. 应用程序控制策略已阻止文件。恶意二进制信誉

解决方法：

打开 Windows Defender(Windows 安全中心),在左侧选择“应用与浏览器控制”，将“基于声誉的保护”关闭。

![与图片相同就对了](/img/wd_safe.png)

---

特征：

- 打开后有一个窗口并有类似 `找不到xxx\AppData\Roaming\SRA\settings.json`的提示

解决方法：

下错版本了，应该下载`StarRailAssistant_版本号.zip`或`StarRailAssistant_版本号_Setup.exe`，不要下载`StarRailAssistant_Core_版本号.zip`或`StarRailAssistant_Lite_v2.7.0.zip`。

---

## SRA 打不开

特征：

- 打开SRA.exe提示`You must install or update .NET to run this application.`

解决方法：

点击`Download it now`，在弹出的浏览器窗口等待程序下载完成，打开下载的程序安装。

---

## 更新后（可能）任务无法执行

特征：

- 控制台的报错信息中存在`Invalid task ID`

解决方法：

尝试重新添加任务。

## 找不到游戏

特征：

- 控制台的报错信息中存在`No such file or directory`
- 游戏不启动时无法正常执行任务，启动时可以正常执行任务

解决方法：

第一种方案：

- 在任务页中，游戏路径后方使用全局设置打开

- 在设置页面->游戏路径的自动检测打开；或关闭自动检测，手动选择文件夹

第二种方案：

- 在任务页中，设置或重新设置游戏路径

---

## 图片识别失败

特征：

- 控制台的报错消息包含`OCR识别结果为空`，**从而导致任务失败**

解决方法：

**对于常规任务**：

- 检查游戏的分辨率是否为1920*1080。

**对于寰宇纷争**：

- 可能没在指定页面开始任务，请检查[特定要求](../getstarted/getstarted.html#模拟宇宙)。

