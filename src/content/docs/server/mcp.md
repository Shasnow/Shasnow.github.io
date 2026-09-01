---
title: MCP 工具
sidebar:
  order: 4
---

SRA-server 内置了对 Model Context Protocol (MCP) 的支持，允许 AI 助手（如 Claude、Cursor 等）通过 MCP 协议直接控制 SRA。

MCP 端点地址：`http://localhost:5000/mcp`

## 连接方式

在支持 MCP 的 AI 客户端中，添加以下 MCP 服务器配置：

```json
{
  "mcpServers": {
    "sra": {
      "url": "http://localhost:5000/mcp"
    }
  }
}
```

## 可用工具

### 截图

#### `sra_screenshot`

截取游戏窗口截图（720p），返回 PNG 图片。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| — | — | — | 无参数 |

返回结果包含截图图片和坐标转换提示，可用于 AI 分析当前游戏状态。

### 后端控制

#### `sra_startup`

启动 SRA 后端。

#### `sra_shutdown`

关闭 SRA 后端。

### 任务控制

#### `sra_task_list`

列出所有可用任务。

#### `sra_task_run`

运行指定配置中的所有任务。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `configNames` | string | 否 | 空格分隔的配置名列表，留空则运行全部 |

#### `sra_task_single`

运行单个任务。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `task` | string | 是 | 任务名或索引 |
| `configName` | string | 否 | 配置名，留空使用当前配置 |

#### `sra_task_stop`

停止当前运行的任务。

#### `sra_task_status`

获取当前任务状态（JSON 格式）。

### OCR 文字识别

#### `sra_ocr`

对游戏窗口执行 OCR 文字识别。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `fromX` | int | 否 | 识别区域左上角 X |
| `fromY` | int | 否 | 识别区域左上角 Y |
| `toX` | int | 否 | 识别区域右下角 X |
| `toY` | int | 否 | 识别区域右下角 Y |

#### `sra_ocr_match`

OCR 匹配指定文字。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `text` | string | 是 | 要匹配的文字 |
| `fromX` | int | 否 | 识别区域左上角 X |
| `fromY` | int | 否 | 识别区域左上角 Y |
| `toX` | int | 否 | 识别区域右下角 X |
| `toY` | int | 否 | 识别区域右下角 Y |

### 游戏操作

#### `sra_click_point_abs`

点击游戏窗口的绝对坐标位置。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `x` | int | 是 | X 坐标 |
| `y` | int | 是 | Y 坐标 |

#### `sra_click_point_rel`

点击游戏窗口的相对坐标位置（0.0 ~ 1.0）。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `x` | float | 是 | X 比例 |
| `y` | float | 是 | Y 比例 |

#### `sra_scroll`

鼠标滚轮滚动。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `clicks` | int | 是 | 滚动量（正数向上，负数向下） |
| `x` | int | 否 | 滚动位置 X |
| `y` | int | 否 | 滚动位置 Y |

#### `sra_press_key`

按下键盘按键，支持组合键（如 `"w+d"`）。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `key` | string | 是 | 按键名称或组合 |

#### `sra_hold_key`

长按键盘按键。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `key` | string | 是 | 按键名称 |
| `duration` | float | 否 | 长按时间（秒），默认 1.0 |

#### `sra_sleep`

暂停执行指定时间。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `seconds` | int | 是 | 暂停秒数 |

## 使用示例

以下是通过 MCP 工具实现的常见工作流：

### 截图分析

1. 调用 `sra_screenshot` 获取当前游戏画面
2. AI 分析截图内容，判断当前状态
3. 根据分析结果调用相应操作

### 自动运行任务

1. 调用 `sra_task_list` 查看可用任务
2. 调用 `sra_task_status` 确认当前无任务运行
3. 调用 `sra_task_run` 开始执行
4. 调用 `sra_task_status` 等待任务完成

### 游戏内操作

1. 调用 `sra_ocr` 识别当前界面文字
2. 调用 `sra_click_point_rel` 点击目标位置
3. 调用 `sra_sleep` 等待动画完成
4. 调用 `sra_ocr_match` 确认操作结果

:::tip
使用 MCP 工具时，SRA-server 需要已经启动且后端进程就绪。如果后端尚未启动，请先调用 `sra_startup`。
:::
