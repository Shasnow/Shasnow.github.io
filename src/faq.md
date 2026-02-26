---
title: 常见问题与排查
icon: question
---

# SRA 常见问题与排查指南

此文章会解答你对 SRA 的大部分疑惑，以及引导你缩小你遇到问题可能存在的范围。可使用右侧（或屏幕上方）的`此页内容`快速定位。

本页面目前只整合了大部分常见的问题，可能覆盖不全。如果您的问题在本页中未找到或解决方法没用，请前往官方群反馈问题。

想为此文档做出贡献？在文档尾部点击 *在 GitHub 上编辑此页* 

## 有关 SRA 的常见问题

::: details SRA能支持Linux/macOS/*nix吗
对于 *Linux* ,官方内部已有计划 !!~~某SRA作者之前说支持Linux没用来着？~~!!；此外[StarRailAssistant.Neo](https://github.com/EveGlowLuna/StarRailAssistant.Neo)项目的[后端项目 Linux开发分支](https://github.com/EveGlowLuna/SRA-CE-Cli/tree/linux_dev)已有雏形，可前往查看。该fork的效果不代表官方的最终效果。

对于 *macOS* ,如果你有足够资金供开发者购入**MacBook**, **iMac**, **Mac mini**或**Mac Studio**设备并向我们提供，我们（或团队贡献中的某一个人）会着手针对 *macOS* 系统开发。

对于其他系统 *例如FreeBSD* ？洗洗睡吧喵，梦里啥都有喵
:::

::: details 挂后台会抢鼠标吗？/可以挂后台吗？
包抢的，SRA使用模拟操作技术，需要真实的控制您的鼠标去移动和点击。

不过您可以查看我们的*新*项目(https://github.com/Shasnow/ok-starrailassistant)，这个项目或许能解决您的要求（不过目前暂停了维护）
:::

::: details 可以做一做绝区零的/有没有绝区零版本？
~~绝区零因抽不出角色导致退游，望周知~~，且市面上已有解决方案。
:::

::: details 国际版是否可用？/Can the Global Edition of the Honkai:Star Rail be used?
SRA已经支持国际服，在语言设置为简体中文的情况下是可以使用的。

The globel edition of the Honkai:Star Rail is now supported and operates as expected with Simplified Chinese selected as the display language.
:::

::: details 和maa是一个作者吗/和maa是什么关系？
SRA仅在命名和UI上部分借鉴MAA，除此之外与MAA并无联系。
:::

::: details 会封号吗挺担心的
<ul><li>从SRA立项到0.8.3版本的更新，作者一直使用本人的账号进行测试，目前暂未封号。</li><li>SRA依靠计算机图像识别和模拟操作运行，不会做出任何修改游戏文件、读写游戏内存等任何危害游戏本体的行为，理论上不会导致封号。但是使用脚本或者模拟操作仍然是米哈游的封号理由之一，既然使用SRA，就要承担可能存在的风险。</li><li>另：请不要在崩坏：星穹铁道及米哈游在各平台（包括但不限于：米游社、B 站、微博）的官方动态下讨论任何有关 SRA 的内容。</li></ul>
:::

::: details 能用异种分辨率吗（例如1600×900）/只能使用1920 * 1080吗？
SRA理论支持全16:9的分辨率，但是在部分分辨率下可能会出现识别错误。效果较稳定的分辨率为1600 *
900，此时需调节设置中识图置信度为0.8。其他分辨率请自行尝试。
:::

::: details Windows 8.1/8/7可以用吗？
Python 3.12 支持Windows 8.1,但不支持Windows 8或更早版本（包括 Windows 7）。如果语法兼容，可以尝试使用Python 3.8.x打包程序（但大概率不能跑）。

!!不过，你也可以尝试将你旧电脑升级到Windows 8.1/Windows 10的早期版本，这些版本在老旧电脑上的流畅度不亚于Windows 7。!!
:::

::: details 网页云崩铁可以嘛/适配云游戏吗？
目前还在尝试中。
:::

::: details 下载速度太慢
SRA已接入Mirror酱，可以尝试使用。
:::

::: details 会出手机版吗/手机平板能用吗？
不会，不同手机之间屏幕大小各不相同，实现难度较大。
:::

::: details 为什么文件会被报告为*具有可能有害的行为*？
SRA请求了管理员权限，但是部分杀毒软件会误报，导致SRA无法正常运行。请放心，SRA不会对您的电脑造成任何损害。运行软件前，请将SRA的目录添加入 Windows Defender 排除项以及防病毒软件的信任区或开发者目录，避免被误杀。
:::

## SRA 常见问题和排查指南

::: details 找不到文件

特征：

- 启动任务时提示无法启动配置xxx,请检查后端状态
- 控制台提示无法找到文件 SRA-cli.exe,请检查安装完整性

解决方法：

将 SRA 整体文件夹添加信任（具体可[点击此处查看](../getstarted/getstarted.html#添加信任)）

然后，重新解压程序（如果你使用的是安装包，请重新打开安装包安装程序）

:::

::: details SRA 启动问题

特征：

- 打开是一个*黑色窗口*，里面有一堆带颜色的文字；
- 并且可能有类似 `找不到xxx\AppData\Roaming\SRA\settings.json`的提示

解决方法：

- 情况一：文件夹中同时存在SRA.exe和SRA-cli.exe
  - 打开SRA.exe而不是SRA-cli.exe
- 情况二：文件夹中只有SRA-cli.exe
  - 下错版本了，如果你下载的文件为`StarRailAssistant_Core_版本号.zip`或`StarRailAssistant_Lite_v2.7.0.zip`，请删掉他们并前往下载`StarRailAssistant_版本号.zip`或`StarRailAssistant_版本号_Setup.exe`。

:::

::: details SRA 打不开

特征：

- 打开SRA.exe提示`You must install or update .NET to run this application.`

解决方法：

点击`Download it now`，在弹出的浏览器窗口等待程序下载完成，打开下载的程序安装。

---

特征：

- 控制台提示后端未运行，原因是找不到xxx文件
- 运行任务提示请检查后端状态

解决方法：

- 可能是下错版本了，如果你下载的文件为`StarRailAssistant_Core_版本号.zip`或`StarRailAssistant_Lite_v2.7.0.zip`，请删掉他们并前往下载`StarRailAssistant_版本号.zip`或`StarRailAssistant_版本号_Setup.exe`。

---

特征：

- 控制台提示启动失败：An error occurred trying to start prosess "SRA-cli.exe" with working directory 'xxx'. 应用程序控制策略已阻止文件。恶意二进制信誉

解决方法：

打开 Windows Defender(Windows 安全中心),在左侧选择“应用与浏览器控制”，将“基于声誉的保护”关闭。

![与图片相同就对了](/img/wd_safe.png)


:::

::: details 任务无法执行

特征：

- 控制台的报错信息中存在`Invalid task ID`

解决方法：

尝试重新添加任务。

---

特征：

- 差分宇宙不能执行

解决方法：

- 检查**开拓者名称**是否填写。
- 检查是否在差分宇宙界面执行。
- 检查分辨率是否为1920*1080。检查“图片识别失败”相关问题。

:::

::: details SRA 找不到游戏

特征：

- 控制台的报错信息中存在`No such file or directory`
- 游戏不启动时无法正常执行任务，启动时可以正常执行任务

解决方法：

第一种方案：

- 在任务页中，游戏路径后方使用全局设置打开

- 在设置页面->游戏路径的自动检测打开；或关闭自动检测，手动选择文件夹

第二种方案：

- 在任务页中，设置或重新设置游戏路径

:::

::: details 图片识别失败

特征：

- 控制台的报错消息包含`OCR识别结果为空`或`Could not locate the image`，**从而导致任务失败**

解决方法：

**对于系统接了多台显示器的用户**：
- 选择将一个屏幕拔掉，或者在设置中修改为镜像屏幕或仅在1/2中显示

**对于所有任务**：

- 检查游戏的分辨率是否为1920*1080。

**对于寰宇纷争**：

- 可能没在指定页面开始任务，请检查[特定要求](../getstarted/getstarted.html#模拟宇宙)。

:::
