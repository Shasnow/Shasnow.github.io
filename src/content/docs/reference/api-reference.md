---
title: SRA Server API
sidebar:
  order: 1
---

SRA-server 提供 RESTful API 用于控制 SRA 的运行。所有 API 端点在生产环境下带有 `/api` 前缀（如 `/api/Task/status`）。

:::tip
交互式 API 文档可通过 Swagger UI 访问：`http://localhost:5000/swagger`
:::

## 通用响应格式

所有 API 返回统一的 JSON 响应格式：

```json
{
  "success": true,
  "message": "success",
  "data": { ... }
}
```

`success` 为 `false` 时，`message` 中包含错误描述。

## 任务控制

### 获取任务状态

```
GET /api/Task/status
```

获取当前任务的运行状态。

**响应示例：**

```json
{
  "success": true,
  "message": "success",
  "data": {
    "status": "running",
    "progress": "领取奖励中..."
  }
}
```

### 运行任务

```
POST /api/Task/run
```

运行指定配置中的所有任务。支持三种调用方式：

**方式一：使用已有配置名**

```json
{
  "configName": "Default"
}
```

**方式二：传入完整配置并持久化保存**

```json
{
  "config": { ... },
  "persist": true
}
```

**方式三：传入完整配置作为临时配置（不保存）**

```json
{
  "config": { ... },
  "persist": false
}
```

:::note
使用方式三时，系统会自动生成一个以 `_api_` 为前缀的临时配置名。
:::

**错误码：**

| 状态码 | 说明 |
|--------|------|
| 400 | 配置不存在 |
| 409 | 任务正在运行中 |
| 500 | 后端错误 |

### 运行单个任务

```
POST /api/Task/single
```

运行指定的单个任务。

```json
{
  "taskName": "ReceiveRewardsTask",
  "configName": "Default"
}
```

- `taskName`：任务的类名或索引（如 `"ReceiveRewardsTask"` 或 `"2"`）
- `configName`：可选，指定配置名，留空则使用当前配置

**错误码：**

| 状态码 | 说明 |
|--------|------|
| 409 | 任务正在运行中 |
| 500 | 后端错误 |

### 停止任务

```
POST /api/Task/stop
```

停止当前正在运行的任务。无请求参数。

## 后端管理

### 重启后端

```
POST /api/Backend/restart
```

重启后端进程（SRA-cli 或 Python）。

```json
{
  "arguments": "--inline --no-admin"
}
```

- `arguments`：可选，后端启动参数，默认为 `"--inline --no-admin"`

**错误码：**

| 状态码 | 说明 |
|--------|------|
| 500 | 重启失败 |

### 获取后端日志

```
GET /api/Backend/logs?count=100
```

获取最近 N 条后端日志。

- `count`：可选，返回的日志条数，默认 100

**响应示例：**

```json
{
  "success": true,
  "message": "success",
  "data": ["[INFO] 正在初始化...", "[INFO] 就绪"]
}
```

### SSE 日志流

```
GET /api/Backend/logs/stream
```

以 Server-Sent Events (SSE) 格式实时推送后端日志。

**响应格式：** `text/event-stream`

```text
data: [INFO] 正在初始化...

data: [INFO] 就绪

```

:::tip
SSE 日志流适用于需要实时监控后端输出的场景，如构建 Web 端日志面板。
:::

## 配置管理

### 获取所有配置名

```
GET /api/Configs
```

返回所有配置的名称列表。

**响应示例：**

```json
{
  "success": true,
  "message": "success",
  "data": ["Default", "PlanB", "MyConfig"]
}
```

### 获取指定配置

```
GET /api/Configs/{configName}
```

获取指定配置的详细内容。

:::warning
返回的配置中 `startGame` 的 `username`、`password`、`encryptedUsername`、`encryptedPassword` 字段会被自动移除，以保护敏感信息。
:::

**错误码：** 404 — 配置不存在

### 创建配置

```
POST /api/Configs/{configName}
```

创建一个新的任务配置。配置名称不能包含以下字符：

```text
\ / : * ? " < > |
```

**错误码：**

| 状态码 | 说明 |
|--------|------|
| 400 | 名称包含非法字符 |
| 409 | 配置已存在 |

### 更新配置

```
PUT /api/Configs/{configName}
```

更新指定配置的内容。请求体为完整的 `TasksConfig` JSON 对象。

:::note
更新时会智能处理 `startGame` 中的 `username`/`password` 字段：如果请求中未包含这些字段，则保留原值。
:::

**错误码：** 404 — 配置不存在

### 删除配置

```
DELETE /api/Configs/{configName}
```

删除指定配置。

**错误码：** 404 — 配置不存在

## 设置管理

### 获取设置

```
GET /api/Settings
```

获取完整的应用设置。设置包含五个部分：

| 分区 | 说明 |
|------|------|
| `general` | 游戏路径、启动参数、云游戏、OCR/模板匹配置信度等 |
| `display` | 背景图片、面板透明度、语言、窗口状态 |
| `update` | 下载渠道、自动更新、更新频道 |
| `advanced` | 后端参数、远程后端、开发者模式、Python 配置 |
| `notification` | 通知渠道配置（Bark、邮件、Telegram 等） |

### 修改设置

```
PUT /api/Settings
```

按字段修改设置，支持部分更新。请求体格式为分层 JSON：

```json
{
  "general": {
    "gamePath": "D:\\Games\\StarRail\\StarRail.exe"
  },
  "advanced": {
    "backend": {
      "remote": {
        "enabled": true,
        "url": "http://192.168.1.100:5000"
      }
    }
  }
}
```

**响应：** 返回更新的字段列表。

**错误码：** 400 — 无有效更新

## 扩展管理

### 列出扩展

```
GET /api/Extensions
```

列出所有已注册的扩展模块。

### 获取扩展 Schema

```
GET /api/Extensions/{id}/schema
```

获取指定扩展的配置 JSON Schema。

### 获取扩展配置

```
GET /api/Extensions/{id}/config
```

获取扩展的当前配置值（JSON 字符串）。

### 设置扩展配置

```
PUT /api/Extensions/{id}/config
```

设置扩展的配置值。请求体为 JSON 字符串。

### 运行扩展

```
POST /api/Extensions/{id}/run
```

运行指定扩展。

- `config`：可选，查询参数，指定配置名

### 停止扩展

```
POST /api/Extensions/{id}/stop
```

停止指定扩展。

### 重载扩展

```
POST /api/Extensions/reload
```

重新扫描并导入所有扩展模块。

## 游戏操作

### 截取游戏画面

```
GET /api/Operator/screenshot
```

获取当前游戏窗口的截图，分辨率为 720p，返回 PNG 图片。

**响应：** `image/png`

### 列出可用操作

```
GET /api/Operator/list
```

列出所有可用的 Operator 方法。

### 获取操作帮助

```
GET /api/Operator/help/{method}
```

获取指定 Operator 方法的详细帮助信息。

### 调用操作

```
POST /api/Operator/call
```

调用指定的 Operator 方法并传递参数。

```json
{
  "method": "screenshot",
  "params": {}
}
```

- `method`：方法名称（必填）
- `params`：方法参数（可选）

**错误码：**

| 状态码 | 说明 |
|--------|------|
| 400 | method 为空 |
| 500 | 后端错误 |

## 认证

### 验证令牌

```
POST /api/Auth
```

验证访问令牌。此端点无需认证。

```json
{
  "token": "your-token"
}
```

**响应：**

- 200：认证成功或未配置 Token（此时所有请求无需认证）
- 401：认证失败
