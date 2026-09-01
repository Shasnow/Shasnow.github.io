---
title: 获取SRA
sidebar:
  order: 0
---

您可以通过多种方式获取 StarRailAssistant（SRA）

## 通过 Mirror 酱下载

下载链接：[**Mirror酱**](https://mirrorchyan.com/zh/projects?rid=StarRailAssistant&source=sra-webside)

:::note
SRA已集成Mirror酱，可直接从Mirror酱下载

Mirror酱作为第三方分发平台，仅对下载加速服务收取费用，不代表 SRA 需付费订阅。

Mirror酱也可以负责接下来的更新工作。
:::

## 通过 GitHub Release 下载

下载链接：[**GitHub Releases**](https://github.com/Shasnow/StarRailAssistant/releases/latest)

<div class="download-card">
  <div class="download-card__content">
    <h3 style="margin: 0; color: #FFFFFF;">下载 StarRailAssistant </h3>
    <p style="margin: 0; color: #8BC53F;">包含3件物品：
      <span style="color: #B0AEA3;">SRA.exe、</span>
      <span style="color: #B0AEA3;">SRA-cli.exe、</span>
      <span style="color: #B0AEA3;">SRA-server.exe</span>
    </p>
  </div>
  <div class="download-card__actions">
    <div class="download-card__price">
      <span style="background-color: #4C6B22; font-weight: bold; color: #BEEE11; padding: 6px 8px; border-radius: 4px 0 0 4px;">-100%</span>
      <span style="font-weight: bold; color: #BEEE11; background-color: #344654; padding: 6px 8px; border-radius: 0 4px 4px 0;">￥0.00</span>
    </div>
    <a class="download-card__button" href="https://github.com/Shasnow/StarRailAssistant/releases/latest">添加至购物车</a>
  </div>
</div>

:::note
`-100%`, `￥0.00` 等字样为娱乐宣传手段，不代表 SRA 需付费订阅。
:::

### 版本说明

#### StarRailAssistant Core

- 文件名：`StarRailAssistant_Core_vx.x.x.zip`
- 包含：SRA-cli.exe 及核心资源（tasks、extensions、resources、SRACore）
- 提供最基本的命令行功能。单独使用时需手动创建配置文件和设置文件。

#### StarRailAssistant

- 文件名：`StarRailAssistant_vx.x.x.zip`
- 包含：SRA.exe（图形化界面）、SRA-cli.exe（命令行）、SRA-server.exe（HTTP 服务端）及核心资源
- 具有 SRA 全部功能，包括图形化界面、命令行工具和 HTTP 服务端。**对于一般用户，我们建议您使用这个版本。**

#### StarRailAssistant Lite

- 文件名：`StarRailAssistant_Lite_vx.x.x.zip`
- 包含：SRA.exe、main.py 及 Python 源码
- 由桌面端发布产物与 SRA 源码组成，需要手动配置 Python 环境才能运行。

#### StarRailAssistant Resources

- 文件名：`StarRailAssistant_Resources_vx.x.x.zip`
- 包含：tasks、extensions、resources 及 package.json
- 仅包含资源文件，用于手动更新 Core 包中的资源，无需重新下载完整版本。

## 通过夸克网盘下载

下载链接：[**夸克网盘**](https://pan.quark.cn/s/8c00dec47499)
:::note
通过此方式获取的 SRA 版本可能滞后。
:::

## PyPI

:::caution
使用此方式只能获取 SRA-cli，无图形化界面。
:::

SRA-cli 已发布到 PyPI，提供更方便的使用方式。

先决条件：

- Python 3.12
- 以管理员权限运行终端

### pip 安装

推荐为SRA创建专用虚拟环境，以避免与系统其他Python项目冲突。

创建虚拟环境：（如果还没有创建）

```bash
mkdir starrailassistant
cd starrailassistant
python -m venv .venv
```

安装SRA-cli：

```bash
(venv) pip install starrailassistant
```

### pipx 安装

```bash
pipx install starrailassistant
```

### uv 安装

```bash
uv tool install starrailassistant
```

### 首次使用

推荐创建SRA专用文件夹：`mkdir -p starrailassistant` (如果你在虚拟环境中安装，不需要这一步)
运行初始化命令：`cd starrailassistant && sra-cli init`
启动应用：

```bash
cd starrailassistant && sra-cli
```

### 更新应用

```bash
(venv) pip install --upgrade starrailassistant
```

```bash
pipx upgrade starrailassistant
```

```bash
uv tool upgrade starrailassistant
```

更新后可能需要重新运行`init`命令以应用新配置。
