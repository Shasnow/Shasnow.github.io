---
title: 完整命令
sidebar:
  order: 2
---

## 内置命令

这些命令是 SRA-cli 内置的命令，您无法删除或修改它们。

### `task` — 任务管理器

管理 SRA-cli 的任务。

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

- `config`：配置文件名（不含 `.json` 后缀）或配置文件路径。可指定多个配置，留空则使用当前配置。

示例：运行名为 `114` 和 `514` 的配置

```text
sra> task run 114 514
```

示例：运行指定目录下的 `my_config.json` 配置

```text
sra> task run "path\to\my_config.json"
```

#### `task single`

运行指定的单个任务。任务在后台线程中执行，命令行不会被阻塞。

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
`清开拓力` 任务在 SRA 中的类名为 `TrailblazePowerTask`, 索引为 `1`。
:::

#### `task stop`

停止当前正在运行的任务。

```text
sra> task stop
```

如果当前没有任务在运行，会提示 "没有任务在运行"。

#### `task status`

显示当前任务的状态信息。

```text
task status [--json]
```

- `--json`：以 JSON 格式输出

输出内容包括：
- **Session ID**：当前会话 ID
- **PID**：任务进程 ID
- **Mode**：运行模式
- **Configs**：使用的配置文件列表
- **Task**：当前执行的任务
- **Status**：任务状态

### `trigger` — 触发器管理器

管理 SRA-cli 的触发器。触发器在后台监听游戏事件（如自动对话、自动战斗等）。

```text
sra> help trigger
Usage: trigger [-h] SUBCOMMAND ...

触发器管理器 - 管理 SRA-cli 的触发器。

Subcommands:
  run       运行触发器线程
  stop      停止触发器线程
  enable    启用指定触发器
  disable   禁用指定触发器
  set       设置触发器属性
```

#### `trigger run`

启动触发器线程。至少需要有一个触发器被启用时才能启动。

```text
sra> trigger run
```

#### `trigger stop`

停止触发器线程。

```text
sra> trigger stop
```

#### `trigger enable`

启用指定的触发器。

```text
trigger enable NAME
```

- `NAME`：触发器的类名（不区分大小写），如 `AutoPlotTrigger`

示例：启用自动对话触发器

```text
sra> trigger enable AutoPlotTrigger
```

#### `trigger disable`

禁用指定的触发器。

```text
trigger disable NAME
```

- `NAME`：触发器的类名（不区分大小写）

示例：禁用自动对话触发器

```text
sra> trigger disable AutoPlotTrigger
```

当所有触发器都被禁用时，触发器线程会自动停止。

#### `trigger set`

设置触发器的属性值。

```text
trigger set NAME ATTR VALUE [--type {int,float,str,bool}]
```

- `NAME`：触发器的类名
- `ATTR`：要设置的属性名
- `VALUE`：属性值
- `--type`：值的类型，默认为 `str`。可选值：`int`、`float`、`str`、`bool`

示例：设置 `skip_plot` 属性为 `True`

```text
sra> trigger set AutoPlotTrigger skip_plot true --type bool
```

示例：设置截图间隔为 `5` 秒

```text
sra> trigger set AutoPlotTrigger screenshot_interval 5 --type int
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

示例：截取后台画面并显示

```text
sra> game screenshot --background --show
```

#### `game ocr`

对游戏画面执行 OCR 文字识别。

```text
game ocr [--region X1 Y1 X2 Y2] [--json]
```

- `--region X1 Y1 X2 Y2`：指定识别区域的坐标比例（0 到 1 之间的浮点数），格式为左上角坐标和右下角坐标
- `--json`：以 JSON 格式输出识别结果

:::tip
如果不指定 `--region`，则对整个游戏画面进行识别。
:::

示例：识别左上角区域的文字

```text
sra> game ocr --region 0 0 0.5 0.3
```

示例：以 JSON 格式输出完整画面的识别结果

```text
sra> game ocr --json
```

#### `game kill`

终止游戏进程。

```text
sra> game kill
```

该命令会强制关闭游戏进程（`StarRail.exe`）。使用时请谨慎。

### `run`

运行指定配置文件中的所有选中的任务。与 `task run` 的区别在于，`run` 会**阻塞当前命令行**直到任务完成。

```text
run [config ...]
```

- `config`：配置文件名或路径。可指定多个配置。

示例：同步运行 `114` 配置

```text
sra> run 114
```

使用 `Ctrl+C` 可随时中断任务执行。

### `single`

运行单个指定的任务。与 `task single` 的区别在于，`single` 会**阻塞当前命令行**直到任务完成。

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

初始化 SRA 应用。下载必要的资源文件并创建默认的设置和配置文件。

```text
sra> init
```

:::warning
此命令需要联网，会从 GitHub 下载资源包。如果资源文件已存在则会跳过创建步骤。
:::

### `version`

显示 SRA-cli 的当前版本。

```text
sra> version
```

### `notify`

发送测试通知，用于验证通知渠道（邮箱、Webhook、Telegram、Server酱、OneBot等）是否正常工作。

```text
notify test CHANNEL
```

- `test`：固定子命令，用于发送测试通知
- `CHANNEL`：通知渠道名称

示例：发送邮件测试通知

```text
sra> notify test email
```

如果渠道配置正确，你会收到一条测试通知消息。

### `quit` / `exit`

退出 SRA-cli 应用程序。两个命令功能相同。

```text
sra> quit
sra> exit
```

退出前会自动清理所有运行中的任务和触发器线程。

### `help`

显示命令的帮助信息。

```text
sra> help [command]
```

- `command`：要查看帮助的命令名称，留空则列出所有命令

示例：查看 `task` 命令的帮助

```text
sra> help task
```

## 外部命令

这些命令是 SRA-cli 运行时动态加载的命令，您可以新增、删除或修改这些命令。它们定义在 `tasks/` 目录下的 Python 文件中。

### `strategy` — 货币战争攻略管理

查询和管理货币战争的攻略配置。

```text
sra> help strategy
Usage: strategy [-h] SUBCOMMAND ...

管理货币战争攻略

Subcommands:
  list    列出所有攻略
```

#### `strategy list`

列出所有可用的货币战争攻略。

```text
strategy list [--json]
```

- `--json`：以 JSON 格式输出

输出内容包括每条攻略的：
- **标题**
- **文件名**
- **作者**
- **最低金币**
- **最低等级**
- **前台加成**（on_field）
- **后台加成**（off_field）
- **描述**

示例：查看所有攻略

```text
sra> strategy list
```

示例：以 JSON 格式输出

```text
sra> strategy list --json
```

### `tpconfig` — 开拓力副本配置查询

查询开拓力副本的配置信息。

```text
sra> help tpconfig
Usage: tpconfig [-h] [--json] [subtask]

查看开拓力副本配置

Positional Arguments:
  subtask     指定子任务名称（如 calyx_golden）

Options:
  -h, --help  show this help message and exit
  --json      以JSON格式输出
```

#### 无参数

显示所有子任务的配置信息。

```text
sra> tpconfig
```

输出内容包括每个子任务的：
- **函数名**
- **体力消耗**
- **最大次数**
- **各关卡**（关卡 ID、名称、结算类型）

#### 指定子任务

只显示指定子任务的配置。

```text
sra> tpconfig calyx_golden
```

#### `--json` 输出

以 JSON 格式输出配置数据，便于程序化处理。

```text
sra> tpconfig --json
sra> tpconfig calyx_golden --json
```

## 快捷方式

cmd2 提供了一些内置的快捷方式：

| 快捷方式 | 说明 |
|---------|------|
| `@script.txt` | 运行指定的脚本文件（等同于 `run_script script.txt`） |
| `!command` | 在系统命令行中执行指定命令（等同于 `shell command`） |

示例：

```text
sra> @my_tasks.txt        # 运行脚本文件
sra> !python -V           # 执行系统命令
```
