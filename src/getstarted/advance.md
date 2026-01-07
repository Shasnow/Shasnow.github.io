---
title: 进阶操作
icon: rocket
order: 2
author: Shasnow
---

# 进阶操作

帮助您了解SRA的更多高级功能，帮助您更好地使用SRA。

## 多账号托管

在 `0.8.0` 及以上版本，SRA添加了多账号托管相关的配置功能。

可以点击标签页上方的 `多账号` (0.8.0版本)或 `配置方案` (更新版本)进入。

![0.8.0 版本中的"多账号(配置方案)"](/img/use/ma.png)

在`2.0.0`版本之后，该页面被简化的操作面板所替代。下面的内容以 `2.0.0` 版本之后的操作面板为例进行说明。

![操作面板](/img/use/operation2.png)

### 新建方案

点击操作面板左侧的 + 按钮，即可出现方案名称输入框。
![新建方案](/img/use/newplan.png)
输入方案名称后，点击右侧确认按钮，即可向配置方案列表中添加一个新方案。
如果方案名称为空，则会关闭输入框而不执行任何操作。

#### 示例

每个 `配置方案` 对应着一个账号的托管方案，假设将要配置A、B、C三个账号托管

- 对于账号 A

  使用默认方案Default，到标签页 `任务` 中完成任务配置，在使用多账号托管时:

  这些任务**必须配置**：

    - 点击 `启动游戏` -选择 `游戏路径`
    - 点击 `启动游戏` -勾选 `自动登录` (同时填充账号与密码)
    - 点击 `结束后` -勾选 `退出当前账号`

  这些任务**不能配置**：
    - 退出游戏
    - 退出SRA
    - 关机
    - 休眠

  完成 `任务配置` 后，这些行为会触发当前 `配置方案` 的保存：

    - 切换方案
    - 执行任务
    - 关闭窗口

- 对于账号B

  点击操作面板左侧的 + 按钮，输入一个方案名称，例如' planB '，后点击确认按钮

  点击右侧的配置方案选框就可以看到我们新建的planB，选中它，接下来像配置方案default那样配置planB即可。

- 对于账号C

  同理。

现在我们有了三份方案，分别为default、planB、planC。接下来只需要将操作面板中的按钮切换到 `启动全部配置` 模式，然后点击即可开始多账号托管。

方案的执行顺序为从上到下，依次执行default、planB、planC。

为了使多账号托管按预期运行，建议先运行游戏并退出当前登录的账号，进入下面的界面：

![登录界面](/img/use/login.png)

现在，您可以回到SRA的操作面板，点击 `启动全部配置` 即可开始您的多账号托管之旅。

## 货币战争自定义攻略

SRA 的货币战争任务使用预定义的攻略，参阅 `tasks/currency_wars/strategies/template.json`

```json5
{
  // json 通常不允许使用注释，所以这里是json5
  "name": "攻略模版",
  // 攻略名称
  "description": "这是一个攻略模版，请根据实际情况进行修改。",
  // 攻略描述
  "author": "作者",
  // 攻略作者
  "uploader": "可选，默认与作者相同",
  // 攻略上传者，可选，默认为作者
  "min_coins": 40,
  // 最小金币保留数量，当金币数量少于这个数量时，SRA会跳过购买角色和提升等级
  "min_level": 6,
  // 最小等级要求，当等级低于这个值时，SRA会优先提升等级
  "mid_level": 9,
  // 中等等级要求，当等级低于这个值时，SRA会在购买角色中穿插提升等级
  "on_field": {
    // 前台角色字典
    "飞霄": 9,
    // 格式为 角色名: 购买次数
    "砂金": 9,
    // 例如：这个键值对告诉SRA应该购买9次砂金，即3星砂金
    "椒丘": 1,
    // 也可以把后台角色强制放到前台
    "灵砂": 1,
    // 角色在字典中出现的顺序即为角色在场上的位置
    // 例如，如果想让飞霄在前台1号位，只需把她放到字典顶部
  },
  "off_field": {
    // 后台角色字典，不要在前后台出现同一个角色，否则这名角色最终会是后台位
    "貊泽": 1,
    "镜流": 1,
    "托帕&账账": 1,
    "云璃": 1,
    // 角色顺序同时也是站位，例如当场上只有七个位置，但我们有八名角色时，托帕&账账会比云璃更优先上场
    "彦卿": 1
  }
}
```
您可以修改这个文件中的一些字段，以完成对攻略的自定义，但不要移动或重命名此文件。

## 扩展功能

点击侧边栏中的 `扩展` 进入拓展标签页。
![拓展界面](/img/use/extension.png)

### 自动对话

开启后在进入剧情时会自动播放对话、自动选择对话选项。
跳过对话：需先开启自动对话，开启后在进入剧情时会自动跳过可跳过的对话。

扩展功能在开启后会立即执行直到取消勾选。

## 设置

:::tip
下面的内容以 `2.0.0` 版本为例进行说明。
:::
点击侧边栏'设置'进入标签页。此处可更改SRA的设置。

### 任务通用设置

![任务通用设置](/img/use/settings/tasksetting.png)

- 缩放比例：自动获取，应该与系统显示设置中的缩放比例一致。
- 识图置信度阈值：控制应用识别游戏内元素的严格程度。默认值为 0.90（90%），可在 0~1
  之间调整，每次增减0.01。值越高，识别越精准（减少误识别）；值越低，识别范围越广（可能出现误识别）。
- 停止快捷键：设置一个全局快捷键，用于在任务执行过程中立即停止当前任务。默认是 `F9` 键。点击输入框后按下所需快捷键即可更改。点击空白处可取消更改。

### 游戏内快捷键设置

![游戏内快捷键设置](/img/use/settings/gamehotkey.png)
应当根据游戏内对快捷键的修改，同步更新此处的快捷键设置，以确保 SRA 能正确执行游戏内的操作。

### 显示设置

![显示设置](/img/use/settings/displaysetting.png)

- 背景图片：设置主页的背景图片。粘贴图片的本地路径到输入框中即可完成修改，支持常见图片格式（如 PNG、JPG）。例如
  `"C:\path\to\your\image.png"`.
  如果输入框为空，则使用默认背景图片。
- 背景图片不透明度：调整主页背景图片的不透明程度，默认值为 0.9（90% 不透明）。
  拖动滑块可在 0~1 之间精细调整，值越小越透明，值越大越清晰（0 为完全透明，1 为完全不透明）。
- 控制面板不透明度：调整控制面板的背景不透明程度，默认值为 0.9（90% 不透明）。
  拖动滑块可在 0~1 之间精细调整，值越小越透明，值越大越清晰（0 为完全透明，1 为完全不透明）。
- 语言切换：选择应用界面的显示语言，默认是 “简体中文”。可切换为 “English”（英文），切换后需重启应用才能生效。

### 常规设置

![常规设置](/img/use/settings/generalsetting.png)

- 通知管理
    - 允许通知：总开关，开启后才能接收应用的各类通知（默认开启）；关闭后所有通知都会被屏蔽。
    - 系统通知：开启后，应用会通过系统弹窗发送提醒（如更新通知、任务完成提示，默认开启）。
    - 邮件通知：开启后，应用会通过邮件发送重要信息（如异常提醒，默认关闭），需提前配置接收邮箱。
        - SMTP 设置：见下方 [邮件通知](#邮件通知) 部分。
- 创建桌面快捷方式：如果你曾经在提示创建桌面快捷方式的对话框中选择了“不再提示”，可以在此处重新创建桌面快捷方式。

### 更新设置

![更新设置](/img/use/settings/updatesetting.png)

- 检查更新：点击按钮手动检查应用的新版本。
- 自动更新：开启后，应用会自动检测新版本并下载和解压更新包（默认开启）。
- Mirror 酱 CDK：输入 Mirror 酱高速下载服务的授权码（CDK），解锁高速下载更新包的权限。输入时内容会以 “*” 隐藏，下方会显示 CDK
  的状态（如 “已激活”“过期”）。
- 更新渠道：选择更新包的下载来源，默认是 “GitHub”（官方源，无需授权）
  可切换为 “Mirror 酱”（高速源，需有效 CDK 才能使用）或 Auto MAS（AUTO-MAS 提供的镜像源，无需授权）。
- 应用渠道：选择应用的版本类型，默认是 “stable”（稳定版，bug 少，适合日常使用）；可切换为 “beta”（测试版，含最新功能，可能存在少量bug）。

### 高级设置

![高级设置](/img/use/settings/advancedsetting.png)

- 文件夹快捷打开按钮：点击对应按钮可快速打开应用的相关文件夹位置：
    - 后端日志文件夹：存放应用前端运行日志的文件夹。
    - 前端日志文件夹：存放应用后端运行日志的文件夹。
    - 配置文件文件夹：存放用户配置文件（如任务配置、多账号配置等）的文件夹。
    - 应用程序文件夹：存放应用运行时产生的临时数据和缓存的文件夹。
- 资源完整性校验：尚未实现，目前处于禁用状态，暂不支持手动触发 “应用资源文件检查” 功能，后续版本可能开放（该功能用于检测核心文件是否损坏或被篡改）。

### 关于

![关于](/img/use/settings/about.png)

## 控制台

![控制台界面](/img/use/console.png)
控制台标签页用于显示应用的运行日志，帮助用户了解应用的运行状态和调试信息。

### 日志过滤器

转到控制台标签页，可以看到日志过滤器。
其中有5个日志级别的按钮，分别是：

- TRACE：跟踪级别，显示最详细的日志信息，通常用于调试
- DEBUG：调试级别，显示调试信息，帮助开发者诊断问题
- INFO：信息级别，显示一般信息，通常用于记录程序的正常运行状态
- WARNING：警告级别，显示潜在问题的警告信息
- ERROR：错误级别，显示错误信息，通常用于记录程序运行中的错误

点击对应按钮可以切换对应日志级别的显示状态。按钮亮起表示该级别日志被显示，按钮暗淡表示该级别日志被隐藏。

### 交互输入框

在控制台标签页的底部，有一个交互输入框。提示“请输入文本” ，用于接收用户的输入。
用户可以在此输入文本，并按下回车键提交输入。
提交后，输入的文本会被发送到SRA的标准输入流中，供程序读取和处理。
详细使用方法请参考 [SRAcli 的简单使用](#简单使用) 部分。

### 重启按钮

在 `控制台` 文本右侧，有一个重启按钮（带有旋转箭头的图标）。
点击该按钮可以重启后端服务。

## SRAcli

在 SRA 2.0 版本中，我们提供了一个独立的命令行程序 `SRA-cli.exe`，用于在命令行中执行 SRA 任务。

![SRA-cli](/img/use/software2.png)

此应用程序是 SRA 的实际功能执行者，主程序通过嵌入式调用 SRA-cli 来完成任务。

因此，您可以直接使用 SRA-cli 来执行任务，而无需打开主程序。
:::tip 尽管如此，您仍需要先通过主程序配置好任务，SRA-cli 仅用于执行任务。
:::

### 简单使用

双击运行 `SRA-cli.exe`，即可看到 SRA-cli 的控制台窗口。
输入help查看可用命令：

```bash
SRA-cli 2.4.0 (2.4.0 on win32)
输入 'help' 或 '?' 来查看命令列表。
sra> help
可用命令：
  EOF - Ctrl+D exit command line tool
  exit - 退出 SRA-cli 应用程序。
  help - 显示命令的帮助信息。
  run - 运行指定配置文件中的所有选中的任务，输入 'help run' 获取更多信息。
  single - 运行由其名称或索引指定的单个任务，输入 'help single' 获取更多信息。
  task - 管理 SRA-cli 中的任务，输入 'help task' 获取更多信息。
  trigger - 管理 SRA-cli 中的触发器，输入 'help trigger' 获取更多信息。
  version - 显示 SRA-cli 的当前版本。

输入 'help <command>' 来获取特定命令的更多信息。
sra> 
```

#### 运行任务

使用 `task run [配置名称...]` 命令运行任务。
如果不指定配置名称，则默认运行**全部**配置。
可以指定多个配置名称，SRA-cli 会依次运行这些配置。
示例：运行名为 `Default` 和 `PlanB` 的配置：

```bash
sra> task run Default PlanB
```

示例：运行全部配置：

```bash
sra> task run
```

#### 停止任务

使用 `task stop` 命令停止正在运行的所有任务。
示例：

```bash
sra> task stop
```

#### 触发器管理

使用 `trigger` 命令管理触发器。
查看触发器帮助：

```bash
sra> help trigger
管理 SRA-cli 中的触发器。
用法：
  trigger run                   启动触发器服务。
  trigger stop                  停止触发器服务。
  trigger enable <trigger_name>    启用特定触发器。
  trigger disable <trigger_name>   禁用特定触发器。
  trigger set-<type> <trigger_name> <property> <value>
                                更改特定触发器的属性。

sra> 
```

示例：启用自动对话功能
自动对话是一个触发器，可以通过以下命令启用：

```bash
sra> trigger run
sra> trigger enable AutoDialogueTrigger
```

自动对话具有skip_plot属性，可以通过以下命令启用跳过对话功能：

```bash
sra> trigger set-bool AutoDialogueTrigger skip_plot true
```

### 完整命令列表

- task

```bash
sra> help task
管理 SRA-cli 中的任务。
用法：
  task run [<name | path>...]
                运行指定配置文件中的所有选中的任务
                如果未指定配置文件，则使用缓存中的全部配置文件
  task single (taks_name | task_index) [<config_name | config_path>]
                运行由其名称或索引指定的单个任务，无论它是否被选中
                如果未指定配置文件，则使用缓存中的当前配置文件
  task stop     停止所有正在运行的任务

sra> 
```

示例： 运行名为 `114` 和 `514` 的配置：

```bash
sra> task run 114 514
```

示例：运行指定目录下的 `my_config.json` 配置：

```bash
sra> task run "path\to\my_config.json"
```

示例： 运行当前配置中的单个任务 `领取奖励`：

```bash
sra> task single ReceiveRewardsTask
```

或者

```bash
sra> task single 2
```

:::tip
`领取奖励` 任务在 SRA 中的类名为 `ReceiveRewardsTask`，索引为 `2`。
如果想了解更多任务的类名和索引，参见 `SRACore/config.toml`
:::
示例：运行指定配置中的单个任务 `清开拓力`：

```bash
sra> task single TrailblazePowerTask my_config.json
```

:::tip
`清开拓力` 任务在 SRA 中的类名为 `TrailblazePowerTask`, 索引为 `1`。
如果想了解更多任务的类名和索引，参见 `SRACore/config.toml`
:::

- trigger
  前文已详细介绍

- exit

退出 SRA-cli 应用程序。

```bash
sra> exit
```

- version
  显示 SRA-cli 的当前版本。

```bash
sra> version
2.4.0
sra> 
```

- help
  显示命令的帮助信息。

- run
  此命令的功能与 `task run` 相同。区别在于，`run` 命令执行后会阻塞当前命令行，直到任务完成。

- single
  此命令的功能与 `task single` 相同。区别在于，`single` 命令执行后会阻塞当前命令行，直到任务完成。

### 高级使用

SRA-cli 支持通过命令行参数调用。
使用`SRA-cli --help`查看帮助信息：

```bash
usage: SRA-cli [-h] [--inline] [--embed] [--version] [--log-level {TRACE,DEBUG,INFO,SUCCESS,WARNING,ERROR,CRITICAL}] {run,single} ...

SRA-cli：SRA 命令行工具

options:
  -h, --help            show this help message and exit
  --inline              内联模式（无命令提示符）
  --embed               嵌入模式（无命令提示符）
  --version             显示 SRA-cli 的版本并退出。
  --log-level {TRACE,DEBUG,INFO,SUCCESS,WARNING,ERROR,CRITICAL}
                        设置日志记录级别（默认：TRACE）。

subcommands:
  {run,single}
    run                 运行指定配置文件中的所有选中的任务。输入 'run --help' 获取更多信息。
    single              运行由其名称或索引指定的单个任务。输入 'single --help' 获取更多信息。
```

#### 通过命令行参数运行任务

输入 `SRA-cli run -h` 查看 `run` 命令的帮助信息：

```bash
usage: SRA-cli run [-h] [--config [CONFIG ...]] [--once]

运行指定配置文件中的所有任务。如果未指定配置文件，则使用缓存中的全部配置文件。此命令将阻塞 CLI 直到所有任务完成。

options:
  -h, --help            show this help message and exit
  --config [CONFIG ...]
                        配置文件名称或路径。
  --once                运行命令后退出 SRA-cli。
```

使用 `SRA-cli run --config [配置名称...]` 命令运行任务。
如果不指定配置名称，则默认运行**全部**配置。
可以指定多个配置名称，SRA-cli 会依次运行这些配置。
使用此命令运行任务后，当前命令行会被阻塞，直到任务完成。可通过按下 `Ctrl+C` 停止任务。
使用此命令运行任务后，SRA-cli 会在任务完成后返回交互模式。如果需要仅执行任务后退出，可以添加 `--once` 参数。

示例：运行名为 `Default` 和 `PlanB` 的配置，并在任务完成后退出 SRA-cli：

```bash
SRA-cli run --config Default PlanB --once
```

示例: 运行当前配置，并在任务完成后进入 SRA-cli：

```bash
SRA-cli run
```

示例: 运行指定目录下的 `my_config.json` 配置，并在任务完成后退出 SRA-cli：

```bash
SRA-cli run --config "path\to\my_config.json" --once
```

输入 `SRA-cli single -h` 查看 `single` 命令的帮助信息：

```bash
usage: SRA-cli single [-h] --task-name TASK_NAME [--config [CONFIG]] [--once]

运行由其名称或索引指定的单个任务，无论它是否被选中。如果未指定配置文件，则使用缓存中的当前配置文件。此命令将阻塞 CLI 直到任务完成

options:
  -h, --help            show this help message and exit
  --task-name TASK_NAME, -t TASK_NAME
                        要运行的任务的名称或索引
  --config [CONFIG]     配置文件名称或路径
  --once                运行命令后退出 SRA-cli
```

使用 `SRA-cli single` 命令运行单个任务，无论它在配置中是否被启用。
**必须通过 `--task-name` 或 `-t` 参数指定任务的名称或索引。**
可以通过 `--config` 参数指定配置名称或路径。如果不指定，则默认使用**当前**配置。
使用此命令运行任务后，当前命令行会被阻塞，直到任务完成。可通过按下 `Ctrl+C` 停止任务。
使用此命令运行任务后，SRA-cli 会在任务完成后返回交互模式。如果需要仅执行任务后退出，可以添加 `--once` 参数。

示例：运行当前配置中的单个任务 `领取奖励`，并在任务完成后退出 SRA-cli：

```bash
SRA-cli single --task-name ReceiveRewardsTask --once
```

或者

```bash
SRA-cli single -t 2 --once
```

示例：运行指定配置中的单个任务 `清开拓力`，并在任务完成后进入 SRA-cli：

```bash
SRA-cli single --task-name TrailblazePowerTask --config my_config.json
```

#### 将 SRA 与第三方程序集成

:::tip SRA运行需要管理员权限
:::

- 直接将 SRA-cli.exe 作为子程序：
  对于这类程序，SRA-cli 支持内嵌模式，可通过 `--inline` 或 `--embed` 参数启用。
  启用内嵌模式后，SRA-cli 将会关闭prompt，专注于打印日志，非常适合被其他程序调用。
  示例：
  ```bash
  SRA-cli --inline
  ```
  此命令会启动 SRA-cli 并进入内嵌模式，等待其他程序通过标准输入发送命令。

- 监控 SRA-cli 的日志输出来控制SRA：
  SRA-cli 支持通过日志文件输出运行状态，第三方程序可以通过监控日志文件来获取 SRA-cli 的运行状态。
  SRA的运行日志存放在 `SRA根目录/log/` 下，按日期分割，第三方程序可以日志文件来获取运行状态。

  可以使用 `--log-level` 参数来设置日志的输出级别，默认为 `TRACE`，可以根据需要调整日志的详细程度。
  示例：将日志级别设置为 `DEBUG`：
  ```bash
  SRA-cli --log-level DEBUG
  ```

确保SRA-cli的工作目录为安装目录，否则可能无法正确加载任务类。

当开始运行任务时，SRA-cli会打印级别为 `DEBUG`, 含有 `[Start]` 信息的日志，便于第三方程序检测任务开始。

当任务结束或中断时，SRA-cli会打印级别为 `DEBUG`, 含有 `[Done]` 信息的日志，便于第三方程序检测任务结束。

#### 使用 Windows 计划任务程序启动SRA-cli

您可以结合Windows的计划任务程序，实现开机自启动SRA-cli并运行任务、定时运行任务等功能。

按下您键盘上的Windows徽标键，搜索“任务计划程序”，并打开它。
![任务计划程序](/img/use/taskschd1.png)

点击创建任务，填写任务名称，例如“SRA自动运行”。
![创建任务](/img/use/taskschd2.png)

注意勾选“使用最高权限运行”，以确保SRA-cli能够正常运行。
![使用最高权限运行](/img/use/taskschd3.png)

点击触发器，设置任务的触发条件，例如“在登录时”或“按计划”。
![触发器](/img/use/taskschd4.png)

点击操作，添加一个新操作，选择“启动程序”。
![操作](/img/use/taskschd5.png)
在“程序或脚本”栏中，填写SRA-cli的完整路径，例如 `C:\Program Files\SRA\SRA-cli.exe`。
在“添加参数”栏中，填写运行命令，例如 `run --config Default --once`。
在“起始于”栏中，填写SRA-cli的安装目录，例如 `C:\Program Files\SRA`。

## 邮件通知

在 `0.8.1` 版本中引入了邮件通知功能。

在设置中，勾选 `邮件通知` ，并在下方配置 SMTP 服务并点击验证。

SMTP是一种可靠有效的电子邮件传输协议，SRA 使用SMTP-SSL推送电子邮件通知。

### SMTP 服务器地址

根据发信邮箱的电子邮件服务提供商选择正确的 SMTP 服务器地址。

| 电子邮件服务提供商       | SMTP服务器地址             |
|-----------------|-----------------------|
| QQ邮箱            | smtp.qq.com           |
| 163邮箱           | smtp.163.com          |
| Gmail           | smtp.gmail.com        |
| Outlook/Hotmail | smtp-mail.outlook.com |
| Yahoo Mail      | smtp.mail.yahoo.com   |

上方列举了部分邮件提供商以及对应的SMTP服务器地址。如果您没在上表中找到您的邮件提供商，请自行查找、咨询。

### 授权码

**授权码**是用于替代您的邮箱密码进行第三方客户端登录的一种特殊密码，您需要填写发信邮箱的授权码。

下面列举了部分提供商授权码的获取步骤：

- [QQ邮箱](https://service.mail.qq.com/detail/0/75)
    - 登录您的邮箱，然后进入[QQ邮箱账号与安全中心](https://wx.mail.qq.com/account)
    - 在 `账号与安全` -> `安全设置` -> `SMTP/IMAP服务` 中开启服务并获取授权码

- [163邮箱](https://help.mail.163.com/faqDetail.do?code=d7a5dc8471cd0c0e8b4b8f4f8e49998b374173cfe9171305fa1ce630d7f67ac2a5feb28b66796d3b)
    - 登录您的邮箱，然后进入 `设置` -> `POP3/SMTP/IMAP` ，找到 `IMAP/SMTP服务` 并点击开启
    - 在弹窗中按照提示操作，然后弹窗生成授权密码，该密码即授权码。

- **Gmail**
    - 登录您的邮箱，然后进入[安全性](https://myaccount.google.com/security?) -> `您的Google账号登录选项` -> `两步验证`
      ，按照说明启动两步验证。
    - 打开[应用专用密码](https://myaccount.google.com/apppasswords)，按照提示操作即可获取专用密码，该密码即授权码。

:::tip
自 2025 年 1 月起，"启用 IMAP"和"停用 IMAP"选项将无法再使用。Gmail 中的 IMAP
访问功能始终处于启用状态，您当前与其他电子邮件客户端的连接不会受到影响。您无需采取任何行动。
:::

- **Outlook/Hotmail**
    - 登录 `Mircosoft账号` ，然后进入[其他安全选项](https://go.microsoft.com/fwlink/?linkid=2274139) -> `双重验证`
      ，按照说明打开双重验证。
    - 打开双重验证后，向下滑找到 `应用密码` ，点击 `创建新应用密码`

- [Yahoo Mail](https://help.yahoo.com/kb/generate-third-party-passwords-sln15241.html)
    - 登录到[Yahoo账号安全](https://login.yahoo.com/account/security?.lang=en-US&.intl=us&.src=yhelp)
    - 点击 `Generate app password` 或 `Generate and manage app passwords` -> `Get Started` -> 在文本字段中输入您的应用名称
    - 点击 `Generate password` ，此密码即授权码。

:::warning
为了您的信息安全，请勿将授权码告诉他人，并定期更换。

部分邮箱的授权码仅显示一次，请及时保存；部分邮箱的授权码存在有效期，请在到期前及时更换。

SRA 已对本地授权码数据使用 `Windows DPAPI`
加密，这种加密方式将当前用户的登录凭据作为加密密钥的一部分，这意味着只有同一个用户在同一台计算机上才能解密数据。如果您需要跨设备迁移配置文件，请重新输入授权码。

**SMTP**邮件推送服务允许发信邮箱与收信邮箱相同，若没有多余的电子邮箱，可以填写相同的发信邮箱与收信邮箱地址。
:::


