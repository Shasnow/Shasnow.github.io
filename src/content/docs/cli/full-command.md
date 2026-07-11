---
title: 完整命令
sidebar:
  order: 2
---

## SRA-cli 完整命令列表
### `task`
  ```text
  sra> help task
  Usage: task [-h] SUBCOMMAND ...

  任务管理器 - 管理 SRA-cli 的任务。

  Options:
    -h, --help  show this help message and exit

  Subcommands:
    SUBCOMMAND
      run       配置文件名称或路径。
      single    运行由其名称或索引指定的单个任务。
      stop      停止当前运行的任务。

  sra>
  ```

  示例： 运行名为 `114` 和 `514` 的配置：
  ```text
  sra> task run 114 514
  ```

  示例：运行指定目录下的 `my_config.json` 配置：
  ```text
  sra> task run "path\to\my_config.json"
  ```

  示例：运行当前配置中的单个任务 `领取奖励`：
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

  示例：运行指定配置中的单个任务 `清开拓力`：
  ```text
  sra> task single TrailblazePowerTask --config my_config.json
  ```
  :::tip
  `清开拓力` 任务在 SRA 中的类名为 `TrailblazePowerTask`, 索引为 `1`。
  :::

### `trigger`
  ```text
  sra> help trigger
  Usage: trigger [-h] SUBCOMMAND ...

  触发器管理器 - 管理 SRA-cli 的触发器。

  Options:
    -h, --help  show this help message and exit

  Subcommands:
    SUBCOMMAND
      disable   禁用指定触发器。
      enable    启用指定触发器。
      run       运行触发器线程。
      set       设置触发器属性。
      stop      停止触发器线程。

  sra>
  ```
  当至少有一个触发器被设置为启用时，SRA-cli 会自动启动触发器线程。
  当所有触发器都被禁用时，SRA-cli 会自动停止触发器线程。

  示例：启用自动对话：
  ```text
  sra> trigger enable AutoPlotTrigger
  ```
  示例：启用跳过对话：
  ```text
  sra> trigger set --type bool AutoPlotTrigger skip_plot true
  ```

### `exit`
  退出 SRA-cli 应用程序。
### `version`
  显示 SRA-cli 的当前版本。
### `help`
  显示命令的帮助信息。
### `run`
  此命令的功能与 `task run` 相同。区别在于，`run` 命令执行后会阻塞当前命令行，直到任务完成。
### `single`
  此命令的功能与 `task single` 相同。区别在于，`single` 命令执行后会阻塞当前命令行，直到任务完成。
### `alias`
  管理命令别名。
### `history`
  显示命令历史记录。
### `shortcuts`
  显示快捷方式。
### `run_script`
  运行指定的脚本文件。快捷方式：`@`
  示例：
  ```text
  sra> run_script script.txt
  sra> @script.txt
  ```
### `shell`
  打开系统默认的命令行工具，执行指定的命令。快捷方式：`!`
  示例：
  ```text
  sra> shell echo 'Hello, World from SRA-cli!'
  sra> !echo 'Hello, World from SRA-cli!'
  ```
### `macro`
  管理宏。
### `edit`
  使用默认的文本编辑器打开指定的文件进行编辑。
  示例：
  ```text
  sra> edit script.txt
  ```
  