---
title: 参数与启动
---

SRA-cli 支持通过命令行参数启动任务，同时也支持启动命令与启动脚本

## 命令行参数与启动命令

SRA-cli 支持一些命令行参数，可以在启动时指定来改变其行为。
SRA支持将这些参数直接传递给 SRA-cli，允许用户在启动时指定后端的行为。下面所有的SRA-cli.exe都可以替换为SRA.exe

使用 `SRA-cli.exe --help` 来查看所有可用的命令行参数
```text
usage: SRA-cli.exe [-h] [--inline] [--embed] [--command [COMMAND ...]] [--version]
                   [--log-level {TRACE,DEBUG,INFO,SUCCESS,WARNING,ERROR,CRITICAL}]
                   command ...

SRA-cli：SRA 命令行工具

options:
  -h, --help            show this help message and exit
  --inline              内联模式（无命令提示符）
  --command [COMMAND ...], -c [COMMAND ...], --execute [COMMAND ...], -e [COMMAND ...]
                        The command to execute AFTER launch
  --version             显示 SRA-cli 的版本并退出。
  --log-level {TRACE,DEBUG,INFO,SUCCESS,WARNING,ERROR,CRITICAL}
                        设置日志记录级别（默认：TRACE）。
  --no-admin            以非管理员权限运行 SRA-cli。
```

- `--inline`：内联模式，启动后直接进入命令输入状态，无需显示命令提示符。
- `--command` 或 `-c` 或 `--execute` 或 `-e`：指定启动后要执行的命令，可以是单个命令或多个命令。命令之间用`+`分隔。
- `--version`：显示 SRA-cli 的版本信息并退出。
- `--log-level`：设置日志记录级别，默认为 `TRACE`，可选值包括 `TRACE`、`DEBUG`、`INFO`、`SUCCESS`、`WARNING`、`ERROR` 和
  `CRITICAL`。
- `--no-admin`：以非管理员权限运行 SRA-cli，默认情况下 SRA-cli 需要管理员权限才能正常运行，会自动以管理员权限重新启动自己，使用此参数可以禁止自动提升权限，以非管理员权限运行。
- `command`：启动立即执行的命令，SRA-cli 将每个参数解释为一个单独的命令，因此如果命令超过一个单词，你应该将每个命令用引号括起来。你可以使用单引号或双引号。

示例：启动 SRA-cli 后立即运行名为 `Default` 的配置：
```bash
SRA-cli.exe -e task run Default
SRA-cli.exe "task run Default"
```

示例：启动 SRA-cli 后立即运行名为 `Default` 和 `PlanB` 的配置：
```bash
SRA-cli.exe -e "task run Default PlanB"
SRA-cli.exe "task run Default PlanB"
```

示例：启动 SRA-cli 后立即运行全部配置：
```bash
SRA-cli.exe -e task run
SRA-cli.exe "task run"
```

示例：启动 SRA-cli 后立即运行全部配置，并在完成后退出：
```bash
SRA-cli.exe -e run + exit
SRA-cli.exe run exit
```
:::caution
此处必须使用run命令而不是task run命令，因为后者会启动一个单独的线程来运行任务以保证命令行界面的响应性，但这会导致命令行立即开始处理exit命令，从而在任务完成前就退出了程序。
:::
示例：启动 SRA-cli 后立即运行名为 `Default` 的配置， 并在完成后退出：
```bash
SRA-cli.exe -e run Default + exit
SRA-cli.exe "run Default" exit
```

## 启动脚本

SRA-cli 还支持启动脚本，您可以在当前目录下创建一个名为`.srarc`的文件，用于在启动时自动执行的命令。
示例：
```text
run Default
exit
```
这将在启动SRA后立即阻塞式运行“Default”配置文件，并在完成后执行“exit”命令退出SRA。
您可以在启动脚本中添加多个命令，每个命令占一行。命令将按顺序执行，直到遇到“exit”命令或脚本结束。