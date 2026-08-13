---
title: 完整命令
sidebar:
  order: 2
---

## 命令速查

SRA-cli 当前内置命令主要包括：

- `task`：任务管理
- `extension`：扩展管理
- `game`：游戏截图、OCR、进程控制
- `run`：同步运行任务
- `single`：同步运行单个任务
- `init`：初始化资源和默认配置
- `version`：显示版本号
- `notify`：测试通知
- `quit` / `exit`：退出 CLI
- `help`：显示帮助

此外，CLI 还会动态加载 `tasks/` 目录中的外部命令，例如 `strategy` 和 `tpconfig`。

## 内置命令

这些命令是 SRA-cli 内置命令，默认提供且不能删除。

### `task` — 任务管理器

管理当前任务的启动、停止和状态查询。

```text
sra> help task
Usage: task [-h] SUBCOMMAND ...

任务管理器 - 管理 SRA-cli 的任务。

Subcommands:
  run       运行指定配置文件中的所有选中的任务
  single    运行由其名称或索引指定的单个任务
  stop      停止当前运行的任务
  status    显示当前任务状态
```

#### `task run`

运行指定配置文件中的所有选中的任务。任务在后台线程中执行，命令行不会被阻塞。

```text
task run [config ...]
```

- `config`：配置文件名（不含 `.json` 后缀）或配置文件路径，可指定多个配置；留空时使用当前配置。

示例：运行名为 `114` 和 `514` 的配置

```text
sra> task run 114 514
```

示例：运行指定目录下的 `my_config.json` 配置

```text
sra> task run "path\to\my_config.json"
```

#### `task single`

运行指定的单个任务。任务会在后台线程中执行，命令行不会被阻塞。

```text
task single task [--config CONFIG]
```

- `task`：任务的类名（如 `ReceiveRewardsTask`）或索引（如 `2`）
- `--config`：指定配置文件名，留空则使用当前配置

示例：运行当前配置中的单个任务 `领取奖励`

```text
sra> task single ReceiveRewardsTask
```

或者

```text
sra> task single 2
```

:::tip
`领取奖励` 任务在 SRA 中的类名为 `ReceiveRewardsTask`，索引为 `2`。
:::

示例：运行指定配置中的单个任务 `清开拓力`

```text
sra> task single TrailblazePowerTask --config my_config.json
```

:::tip
`清开拓力` 任务在 SRA 中的类名为 `TrailblazePowerTask`，索引为 `1`。
:::

#### `task stop`

停止当前正在运行的任务。

```text
sra> task stop
```

如果当前没有任务在运行，会输出提示：`没有任务在运行`。

#### `task status`

显示当前任务的状态信息。

```text
task status [--json]
```

- `--json`：以 JSON 格式输出状态信息

输出字段包括：

- `Session ID`：当前任务会话 ID
- `PID`：任务进程 ID
- `Mode`：运行模式
- `Status`：当前状态
- `Unit`：任务单位信息
- `Configs`：使用的配置列表
- `Progress`：当前进度
- `Error`：错误信息（若存在）

### `extension` — 扩展管理器

管理动态加载的扩展，包括查看、运行、停止和配置。

```text
sra> help extension
Usage: extension [-h] SUBCOMMAND ...

扩展管理：查看、运行已注册的扩展

Subcommands:
  list     列出所有已注册的扩展
  run      运行指定扩展
  info     显示扩展的配置 Schema 详情
  reload   重新扫描并导入扩展模块
  stop     停止指定后台扩展或当前正在运行的单次扩展
  status   显示扩展运行状态
  config   扩展配置管理
```

#### `extension list`

列出当前已注册的扩展。

```text
extension list [--json]
```

- `--json`：输出一行 JSON

示例：

```text
sra> extension list
sra> extension list --json
```

#### `extension run`

按扩展类型执行扩展。非后台扩展会走共享线程，后台扩展会走专用线程。

```text
extension run NAME [--config CONFIG]
```

- `NAME`：扩展标识（可通过 `extension list` 查看）
- `--config`：加载指定配置文件名，不带 `.json` 后缀

示例：

```text
sra> extension run hello
sra> extension run hello --config my_ext
```

#### `extension info`

查看扩展的配置 Schema 和类信息。

```text
extension info NAME [--json]
```

示例：

```text
sra> extension info hello
sra> extension info hello --json
```

#### `extension reload`

重新扫描并导入扩展模块，更新注册表。

```text
sra> extension reload
```

#### `extension stop`

停止指定后台扩展，或停止当前正在运行的单次扩展。

```text
extension stop [NAME]
```

- `NAME`：后台扩展标识；不传时停止当前单次扩展

示例：

```text
sra> extension stop my_background_ext
```

#### `extension status`

显示扩展运行状态。

```text
sra> extension status
```

输出字段包括：

- `Status`
- `Unit`
- `Error`

#### `extension config`

扩展配置管理。支持读取和写入配置。

```text
extension config SUBCOMMAND ...
```

##### `extension config get`

获取扩展配置。

```text
extension config get NAME [--json]
```

##### `extension config set`

设置扩展配置。

```text
extension config set NAME JSON
```

- `NAME`：扩展标识
- `JSON`：配置 JSON 字符串

示例：

```text
sra> extension config get hello
sra> extension config set hello '{"enabled": true}'
```

### `game` — 游戏操作

提供与游戏交互的实用工具命令。

```text
sra> help game
Usage: game [-h] SUBCOMMAND ...

管理游戏

Subcommands:
  screenshot  截取游戏截图
  ocr         执行 OCR 文字识别
  kill        终止游戏进程
```

#### `game screenshot`

截取当前游戏画面的截图。

```text
game screenshot [--save SAVE] [--show] [--background]
```

- `--save SAVE`：保存截图到指定路径，默认文件名为 `screenshot.png`
- `--show`：在屏幕上显示截图
- `--background`：在后台截取截图（不显示游戏窗口）

:::note
`--save` 或 `--show` 至少需要指定一个。
:::

示例：保存截图到文件

```text
sra> game screenshot --save my_screenshot.png
```

示例：在后台截取并显示截图

```text
sra> game screenshot --background --show
```

#### `game ocr`

对当前画面执行 OCR 文字识别。

```text
game ocr [--region X1 Y1 X2 Y2] [--json]
```

- `--region X1 Y1 X2 Y2`：指定识别区域的坐标比例（0 到 1 之间的浮点数），格式为左上角坐标和右下角坐标
- `--json`：以 JSON 格式输出识别结果

示例：识别左上角区域

```text
sra> game ocr --region 0 0 0.5 0.3
```

示例：输出完整画面的 OCR JSON

```text
sra> game ocr --json
```

#### `game kill`

终止游戏进程。

```text
sra> game kill
```

该命令会强制关闭游戏进程，使用前请谨慎。

### `run`

运行指定配置文件中的所有选中的任务，并阻塞当前命令行，直到任务完成。

```text
run [config ...]
```

- `config`：配置文件名或路径，可指定多个配置

示例：同步运行 `114` 配置

```text
sra> run 114
```

使用 `Ctrl+C` 可随时中断任务执行。

### `single`

运行单个指定任务，并阻塞当前命令行，直到任务完成。

```text
single task [--config CONFIG]
```

- `task`：任务的类名或索引
- `--config`：指定配置文件名

示例：同步运行单个任务

```text
sra> single ReceiveRewardsTask
```

使用 `Ctrl+C` 可随时中断任务执行。

### `init`

初始化 SRA 应用：下载资源包并创建默认设置与配置文件。

```text
sra> init
```

:::warning
此命令需要联网，会从 GitHub 下载资源包。如果资源文件已存在，则会跳过创建步骤。
:::

### `version`

显示 SRA-cli 当前版本号。

```text
sra> version
```

### `notify`

发送测试通知，用于验证通知渠道是否可用。

```text
notify test CHANNEL
```

- `test`：固定子命令，用于发送测试通知
- `CHANNEL`：通知渠道名称，如 `email`、`webhook`、`telegram` 等

示例：

```text
sra> notify test email
```

### `quit` / `exit`

退出 SRA-cli 应用程序。两个命令功能相同。

```text
sra> quit
sra> exit
```

退出前会自动清理所有运行中的任务和事件监听器。

### `help`

显示命令帮助信息。

```text
sra> help [command]
```

- `command`：要查看帮助的命令名称，留空则列出所有命令

示例：查看 `task` 命令帮助

```text
sra> help task
```

## 外部命令

这些命令是 SRA-cli 运行时动态加载的命令，通常定义在 `tasks/` 目录下的 Python 文件中。它们可能会根据版本和插件扩展而变化。

### `strategy` — 货币战争攻略管理

查询和管理货币战争攻略配置。

```text
sra> help strategy
Usage: strategy [-h] SUBCOMMAND ...

管理货币战争攻略

Subcommands:
  list    列出所有攻略
```

#### `strategy list`

列出所有可用攻略。

```text
strategy list [--json]
```

- `--json`：以 JSON 格式输出

示例：

```text
sra> strategy list
sra> strategy list --json
```

### `tpconfig` — 开拓力副本配置查询

查询开拓力副本配置信息。

```text
sra> help tpconfig
Usage: tpconfig [-h] [--json] [subtask]

查看开拓力副本配置

Positional Arguments:
  subtask     指定子任务名称（如 calyx_golden）

Options:
  -h, --help  show this help message and exit
  --json      以 JSON 格式输出
```

示例：

```text
sra> tpconfig
sra> tpconfig calyx_golden
sra> tpconfig --json
sra> tpconfig calyx_golden --json
```

## 快捷方式

cmd2 提供了一些内置快捷方式：

| 快捷方式 | 说明 |
|---------|------|
| `@script.txt` | 运行脚本文件（等同于 `run_script script.txt`） |
| `!command` | 在系统命令行中执行指定命令（等同于 `shell command`） |

示例：

```text
sra> @my_tasks.txt        # 运行脚本文件
sra> !python -V           # 执行系统命令
```
