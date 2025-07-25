---
home: true
title: 常见问题
icon: question

heroFullScreen: false

bgImage: https://theme-hope-assets.vuejs.press/bg/9-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/9-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: 常见问题及解答
tagline: 提供您在使用StarRailAssistant时可能遇到的问题及解决方案
---

::: details SRA能支持Linux/Mac吗
不能，SRA使用了较多的Windows相关的操作，不能很好的适配其他的操作系统。
:::

::: details 挂后台会抢鼠标吗？/可以挂后台吗？
包抢的，SRA使用模拟操作技术，需要真实的控制你的鼠标去移动和点击。
:::

::: details 可以做一做绝区零的/有没有绝区零版本？
绝区零因抽不出角色导致退游，望周知。且市面上已有成熟的解决方案。
:::

::: details 國際版可以用嗎？
SRA的识图素材基于简体中文制作，如果能将语言切换为简体中文理论上应该可用。或者您可以以自己的语言版本自行替换SRA的识图素材。
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
参见[分辨率兼容性列表](/getstarted/getstarted.html#%E5%88%86%E8%BE%A8%E7%8E%87%E5%85%BC%E5%AE%B9%E6%80%A7%E5%88%97%E8%A1%A8)
:::

::: details Win7可以用吗？
不知道，SRA的开发和测试环境为Win11，在Win10上也能够运行，缺少Win7的验证。
:::

::: details 网页云崩铁可以嘛/适配云游戏吗？
目前还在尝试中。
:::

::: details 下载好慢啊/下载慢
SRA已接入Mirror酱，可以尝试使用。或先下载SRA更新器，再使用更新器下载SRA。
:::

::: details 会出手机版吗/手机平板能用吗？
不会，不同手机之间屏幕大小各不相同，实现难度较大。
:::

::: details 为什么下了点exe文件显示存在威胁，电脑自动删掉了，完全打不开?
SRA请求了管理员权限，但是部分杀毒软件会误报，导致SRA无法正常运行。请放心，SRA不会对您的电脑造成任何损害。运行软件前，请将SRA的目录添加入
Windows Defender 排除项以及防病毒软件的信任区或开发者目录，避免被误杀。
:::

::: details 为什么限制配置方案的数量/如何提升配置方案的数量？
唉！蛋糕还是败给了蛋糕<br />蛋糕有人在蛋糕做蛋糕阴蛋糕，可能是蛋糕动了蛋糕的蛋糕<br />蛋糕，蛋糕赢了……<br />
总之，普通用户的配置方案将被限制为3个，如果需要提升数量或解除限制，请联系作者。<br />这个过程不会很难。
:::

::: details SRA.exe不见了/SRA.exe会把自己删除？
我们确信SRA中不含有把自己删除的代码。<br />出现这种情况可能是杀毒软件误报，特别是 **Windows Defender。**<br />
下面的步骤可以帮助您解决问题<br />[点击此处查看如何为软件添加信任](quickstart.html#trust)
:::

::: details 错误编号(1-20)
#### 错误编号1
在点击**生存索引**时遇到问题。此问题发生在执行**清开拓力**的任意一项子任务中。如果您遇到此问题，可能是由于以下原因造成的：
**星际和平指南**页面未正常打开——可能由于加载时间过长，或者您修改了打开它的按键**F4**。

#### 错误编号2
在点击**饰品提取**或其他子任务时遇到问题。此问题发生在执行**清开拓力**的任意一项子任务中。如果您遇到此问题，可能是由于以下原因造成的：
**生存索引**页面未正常打开——可能由于加载时间过长，或者此前触发了错误编号1。

#### 错误编号3
在点击**挑战**时遇到问题。此问题发生在执行**清开拓力**的任意一项子任务中。如果您遇到此问题，可能是由于以下原因造成的：
未正确传送到对应副本——可能由于加载时间过长，或者此前触发了错误编号2。

#### 错误编号4
在点击**开始战斗**时遇到问题。此问题发生在执行**清开拓力**的任意一项子任务中。如果您遇到此问题，可能是由于以下原因造成的：
未正确传送到对应副本——可能由于加载时间过长，或者此前触发了错误编号3

#### 错误编号5
在点击**再来一次**时遇到问题。此问题发生在执行**清开拓力**的任意一项子任务中。
此问题应极少发生，如果您遇到此问题，欢迎向我们反馈。

#### 错误编号6
在点击**再次派遣**时遇到问题。此问题发生在执行**派遣**任务中。
此问题应极少发生，如果您遇到此问题，欢迎向我们反馈。

#### 错误编号7
在点击无名勋礼的**一键领取**时遇到问题。此问题发生在执行**无名勋礼**任务中。如果您遇到此问题，可能是由于以下原因造成的：
无名勋礼有红点提示但是没有可领取的奖励。

#### 错误编号9
在点击**进入游戏**时遇到问题。此问题发生在执行**自动登录**任务中。

#### 错误编号10
在点击**账号密码**时遇到问题。此问题发生在执行**自动登录**任务中。

#### 错误编号11
~~未检测到登录界面。此问题发生在执行**自动登录**任务中。~~在0.8.1+被移除。

#### 错误编号12
在点击**退出关卡**时遇到问题。此问题发生在执行**清开拓力**的任意一项子任务中。

#### 错误编号13
通过后备开拓力补充体力时遇到问题。此问题发生在执行**补充开拓力**任务中。如果您遇到此问题，可能是由于以下原因造成的：
没有后备开拓力。

#### 错误编号14
通过燃料补充体力时遇到问题。此问题发生在执行**补充开拓力**任务中。如果您遇到此问题，可能是由于以下原因造成的：
没有后备开拓力或没有燃料。

#### 错误编号15
通过星琼补充体力时遇到问题。此问题发生在执行**补充开拓力**任务中。如果您遇到此问题，可能是由于以下原因造成的：
没有后备开拓力且没有燃料或没有星琼。

#### 错误编号16
点击**兑换码**时遇到问题。此问题发生在执行**兑换码**任务中。如遇到此问题，可能是由于以下原因造成的：
菜单**ESC**界面未能正常打开。

#### 错误编号17
点击菜单右上角三个点时遇到问题，此问题发生在执行**兑换码**任务中。如遇到此问题，可能是由于以下原因造成的：
菜单**ESC**界面未能正常打开。

#### 错误编号18
点击开始游戏按钮（差分宇宙界面）时遇到问题。可能未处于正确的页面。

#### 错误编号19
点击周期演算时遇到问题。可能未处于正确的页面。

#### 错误编号20
点击**启动差分宇宙**时遇到问题。可能未处于正确的页面。
:::

::: details 超时编号(1-5)
#### 超时编号1
在20次检测时间（约50秒）内未能检测到**星际和平指南**（**F4**）界面。

#### 超时编号2
在20次检测时间（约50秒）内未能检测到聊天框（Enter）。（也作为处于大世界场景的标志）

#### 超时编号3
在20次检测时间（约54秒）内未能检测到bilibili服的登录按钮。

#### 超时编号4
在40次检测时间（约100秒）内未能检测到挑战按钮。

#### 超时编号5
在20次检测时间（约50秒）内未能检测到委托界面。
:::

