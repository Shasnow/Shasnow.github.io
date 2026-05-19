---
title: 常见问题与排查
icon: question
---

本文将解答你对 SRA 的大部分疑问，并帮助你缩小问题范围。可使用右侧（或屏幕上方）的 `此页内容` 快速定位。

本页面目前只整理了最常见的问题，可能仍有遗漏。如果你的问题在这里没有找到，或者尝试后仍未解决，请前往官方群反馈。

如果你想为本文档做出贡献，可以点击文末的 *在 GitHub 上编辑此页*。

## 有关 SRA 的常见问题
::: details 和三月七小助手(March7Assistant)有什么区别？
SRA 和三月七小助手（下文简称 m7a）是两个不同的项目，由不同的开发者团队独立开发，功能和设计也各不相同。
请理性比较，两者都是为社区贡献的项目。我们也欢迎 m7a 的用户来体验 SRA，看看哪个更适合你。
下面列出一些 SRA 和 m7a 的主要差异：
图例：✅ 完整支持 / ❌ 不支持 / ⚠️ 部分支持

| 项目             | SRA v2.13     | m7a v2026.4.22 |
|----------------|---------------|----------------|
| 功能             | ---           | ---            |
| 清体力            | ✅             | ✅              |
| 使用支援角色         | ✅             | ✅              |
| 启用培养目标         | ✅             | ✅              |
| 体力计划           | ✅             | ✅              |
| 每日实训           | ✅             | ✅              |
| 领取奖励           | ✅             | ✅              |
| 货币战争 - 标准博弈    | ✅             | ✅              |
| 货币战争 - 超频博弈    | ✅             | ✅              |
| 货币战争 - 刷开局     | ✅             | ❌              |
| 货币战争自定义阵容 / 羁绊 | ✅             | ❌              |
| 差分宇宙           | ⚠️            | ✅              |
| 模拟宇宙           | ❌             | ✅              |
| 锄大地            | ❌             | ✅              |
| 逐光捡金（深渊）       | ❌             | ✅              |
| 自动对话           | ✅             | ✅              |
| 多账号托管          | ✅             | ❌              |
| 自定义任务          | ✅             | ❌              |
| 其他             | ---           | ---            |
| 开发语言           | Python, C#    | Python         |
| Docker 支持      | ❌             | ✅              |
| 云星穹铁道支持        | ⚠️            | ⚠️             |
| 下载大小           | 约 120 MB（zip） | 约 700 MB（zip）  |
| 解压大小           | 约 290 MB      | 约 2 GB         |

:::

::: details SRA能支持Linux/macOS/*nix吗
对于 *Linux*，官方内部已有相关计划。~~某 SRA 作者之前还说过 Linux 没用来着？~~
此外，[StarRailAssistant.Neo](https://github.com/EveGlowLuna/StarRailAssistant.Neo) 项目的 [后端项目 Linux 开发分支](https://github.com/EveGlowLuna/SRA-CE-Cli/tree/linux_dev) 已有雏形，可前往查看。该 fork 的效果不代表官方最终效果。

对于 *macOS*，~~如果你愿意资助开发者购买 **MacBook**、**iMac**、**Mac mini** 或 **Mac Studio** 设备并提供给我们，可能会考虑针对 *macOS* 开发。~~

对于其他系统，例如 *FreeBSD*？洗洗睡吧喵，梦里啥都有喵。
:::

::: details 挂后台会抢鼠标吗？/可以挂后台吗？
包抢的。SRA 使用模拟操作技术，需要真实控制鼠标进行移动和点击，因此在挂后台时会占用鼠标。
如果你需要挂后台，可以通过 Windows 本地多用户、远程桌面、虚拟机等方式实现，也可以使用云游戏。
:::

::: details 可以做一做绝区零的/有没有绝区零版本？
~~绝区零因抽不出角色导致退游，望周知~~，且市面上已经有现成解决方案。
:::

::: details 国际版是否可用？/Can the Global Edition of the Honkai:Star Rail be used?
SRA 已支持国际服，在语言设置为简体中文的情况下可以使用。

The global edition of Honkai: Star Rail is now supported and works as expected when Simplified Chinese is selected as
the display language.
:::

::: details 和maa是一个作者吗/和maa是什么关系？
SRA 仅在命名和 UI 上部分借鉴 MAA，除此之外与 MAA 并无联系。
:::

::: details 会封号吗挺担心的
从 SRA 立项到 2.11 版本更新，作者一直使用自己的账号进行测试，目前暂未封号。

SRA 依靠计算机图像识别和模拟操作运行，不会修改游戏文件，也不会读写游戏内存，因此理论上不会导致封号。
但脚本或模拟操作仍然可能触发米哈游的封号规则之一。既然使用 SRA，就要承担相应风险。

另外，请不要在崩坏：星穹铁道以及米哈游各平台（包括但不限于米游社、B 站、微博）的官方动态下讨论任何有关 SRA 的内容。
:::

::: details 能用异种分辨率吗（例如1600×900）/只能使用1920 * 1080吗？
暂不支持异种分辨率，目前只能使用 1920 × 1080。
:::

::: details Windows 8.1/8/7可以用吗？
Python 3.12 支持 Windows 8.1，但不支持 Windows 8 或更早版本（包括 Windows 7）。如果语法兼容，可以尝试使用 Python
3.8.x 打包程序（但大概率不能跑）。

!!不过，你也可以尝试将旧电脑升级到 Windows 8.1 / Windows 10 的早期版本，这些版本在老旧电脑上的流畅度不一定比 Windows 7 差。!!
:::

::: details 网页云崩铁可以嘛/适配云游戏吗？
2.13 版本已支持云游戏，且在云游戏环境下表现良好。
:::

::: details 下载速度太慢
SRA 已接入 Mirror 酱，可以尝试使用。
:::

::: details 会出手机版吗/手机平板能用吗？
不会。不同手机和平板的屏幕尺寸差异较大，实现难度较高。
:::

::: details 为什么文件会被报告为*具有可能有害的行为*？
SRA 需要管理员权限，但部分杀毒软件会误报，导致 SRA 无法正常运行。请放心，SRA 不会对您的电脑造成任何损害。运行前，请将 SRA 的目录添加到 Windows Defender 排除项，以及防病毒软件的信任区或开发者目录，避免被误杀。
:::

## SRA 常见问题和排查指南

### SRA 启动问题

#### Windows Defender 阻止启动 | 恶意二进制信誉

特征：

- 控制台提示启动失败：An error occurred trying to start prosess "SRA-cli.exe" with working directory 'xxx'.
  应用程序控制策略已阻止文件。恶意二进制信誉

解决方法：

打开 Windows Defender（Windows 安全中心），在左侧选择“应用与浏览器控制”，将“基于声誉的保护”关闭。

![与图片相同就对了](/img/wd_safe.png)

---

#### 打开来是一个黑色窗口 | 找不到 settings.json

特征：

- 打开后是一个 *黑色窗口*，里面有一堆带颜色的文字；
- 并且可能出现类似 `找不到 xxx\AppData\Roaming\SRA\settings.json` 的提示。

  ![黑色窗口](/img/faq/black_window.png)

解决方法：

- 情况一：文件夹中同时存在 `SRA.exe` 和 `SRA-cli.exe`
  - 打开 `SRA.exe`，不要打开 `SRA-cli.exe`。
- 情况二：文件夹中只有 `SRA-cli.exe`
  - 你下载错版本了。如果下载的是 `StarRailAssistant_Core_版本号.zip` 或 `StarRailAssistant_Lite_v2.7.0.zip`，请删除后改下载
    `StarRailAssistant_版本号.zip` 或 `StarRailAssistant_版本号_Setup.exe`。

---

#### 未安装 `.NET Runtime` | You must install or update .NET to run this application.

特征：

- 打开 SRA.exe 提示 `You must install or update .NET to run this application.`

解决方法：
这是未安装 .NET Runtime 10 导致的。请安装 .NET Runtime 10 后重试。

点击 `Download it now`（或直接打开
https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/runtime-10.0.7-windows-x64-installer
），在弹出的浏览器窗口中等待下载完成，然后运行安装程序。

---

#### 后端未运行 | 找不到后端可执行文件

特征：

- 控制台提示后端未运行，原因是找不到 xxx 文件
- 运行任务提示请检查后端状态

解决方法：

- 下错版本了。如果你下载的是 `StarRailAssistant_Lite_v2.7.0.zip`，请删除后改下载 `StarRailAssistant_版本号.zip` 或 `StarRailAssistant_版本号_Setup.exe`。
- 可能是杀毒软件误杀了后端程序，请将 SRA 的目录添加到 Windows Defender 排除项，以及防病毒软件的信任区或开发者目录。
  将 SRA 整体文件夹添加信任 [点击此处查看](../getstarted/getstarted.html#添加信任)

---

### 任务执行问题

#### 刷本时无限滚动 | 找不到材料

特征：

- 刷本时进入材料选择界面后无限滚动

解决方法：

- 确认材料是否按“命途”排序，而不是“更新时间”排序。

#### 截图失败 | Error code from Windows: 0 - 操作成功完成

特征：

- 任务执行时控制台 TRACE 日志显示 `Error taking screenshot: Error code from Windows: 0 - 操作成功完成`
- 游戏窗口任务栏图标闪烁

解决方法：

- 手动点击游戏窗口以激活窗口。此问题通常是因为 Windows 认为你当前正在使用 SRA 窗口，因此拒绝了 SRA 将游戏窗口置于前台的请求。

#### 开始任务后立即结束

特征：

- 开始任务后，没有任何行为
- 控制台日志显示类似：

```text
20:57:30 | INFO  | Current config: Default
20:57:30 | INFO  | 旷宇纷争任务全部完成
20:57:30 | INFO  | All tasks in config 'Default' have been completed.
20:57:30 | INFO  | ==================================================
20:57:30 | INFO  | All tasks completed.
```

解决方法：

- 确认配置中是否勾选了任务。如果没有勾选任何任务，SRA 会认为所有任务已经完成，从而直接结束。
- 确认配置中大类任务中的子任务是否勾选。如果没有勾选任何子任务，SRA 会认为该大类任务已经完成，从而直接结束。
- 例如：
  ![子任务勾选](/img/faq/subtask.png)

#### 配置好了任务但不能执行 | Invalid task ID

特征：

- 控制台的报错信息中存在 `Invalid task ID`

解决方法：

- 尝试重新添加任务。
- 如果仍无法执行，尝试新建配置。

---

#### 差分宇宙不能执行

特征：

- 差分宇宙不能执行

解决方法：

- 检查 **旷宇纷争** 大类是否勾选。
- 检查 **开拓者名称** 是否填写。
- 检查是否在差分宇宙界面执行。
- 检查分辨率是否为 1920 × 1080，并参考“图片识别失败”相关问题。

---

#### 战斗时卡住/无法自动战斗

特征：

- 刷本时进入战斗后停住不动
- 差分宇宙/货币战争时进入战斗后停住不动

解决方法：

- 游戏设置中，**其他** -> **战斗功能** -> **是否沿用自动战斗设置**：**是**，然后手动开启自动战斗（如果之前没开过的话）。
  ![自动战斗](/img/faq/auto_battle.png)

#### 图片识别失败

特征：

- 控制台的报错消息包含 `OCR识别结果为空` 或 `Could not locate the image`，**从而导致任务失败**

解决方法：

**对于连接了多台显示器的用户**：
- 将 SRA 和游戏都放在主屏幕上。
- 或拔掉一块屏幕，
- 或者在设置中改为镜像屏幕或仅在 1 / 2 中显示。

**对于所有任务**：

- 检查游戏的分辨率是否为 1920 × 1080。

**对于旷宇纷争**：

- 可能没在指定页面开始任务，请检查 [特定要求](../getstarted/getstarted.html#模拟宇宙)。

---

#### 找不到游戏

特征：

- 控制台的报错信息中存在 `No such file or directory`
- 游戏不启动时无法正常执行任务，启动时可以正常执行任务

解决方法：

第一种方案：

- 在任务页中，通过游戏路径右侧的全局设置打开。
- 在设置页面中开启游戏路径自动检测；或者关闭自动检测，手动选择文件夹。

第二种方案：

- 在任务页中设置或重新设置游戏路径。

---

#### 窗口未激活

特征：

- 任务执行时，游戏窗口未被激活

解决方法：

- 手动点击游戏窗口即可。
