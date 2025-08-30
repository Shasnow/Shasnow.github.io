---
title: 插件开发指南
icon: laptop-code
order: 6
---

# 插件开发指南

在本章节中，我们将介绍如何开发一个SRA插件。

## 插件介绍

插件是SRA的扩展模块，通过插件可以实现一些特定的功能。插件可以是一个单独的Python文件，也可以是一个包含多个Python文件的文件夹。或用Python调用其他语言。

## 插件结构

一个插件的结构一般如下：

```
plugin_name/
    ├── __init__.py
    ├── plugin.toml
    ├── somepluginfile1.py
    ├── somepluginfile2.py
    ├── ...
    └── src/
        ├── config.json
        ├── image.png
        ├──...
```

其中，`__init__.py`是插件的入口文件，用于初始化插件。`somepluginfile1.py`、`somepluginfile2.py`等是插件的具体实现文件。`src/`文件夹中存放插件所需的资源文件，如配置文件和图片等。

你也可以自己决定插件结构。

## 插件元数据
插件元数据用来描述插件信息，或请求与SRA交互。

元数据有如下参数：
- displayName: 插件的名称
- version: 插件的版本号
- author: 作者/制作团队
- description: 有关插件的描述
- SRAVersion: 请求的SRA最低版本
- loadPeriod: 加载时机，如果为`normal`则会在 SRA 运行时直接加载
- enable: 是否启用该插件，默认为`true`

示例如下：

- 对于0.8.3及后续版本，元数据存储在`plugin.toml`文件中
```toml
displayName = "StarRailAssistant Error Analyzer"
version = "0.2 Alpha"
author = "EveGlowLuna"
description = "分析SRA运行时错误，以中文提示显示并提供可能的解决方案"
SRAVersion = "0.8.2"
loadPeriod = "normal"
enable=true
```
- 对于0.8.3前的版本
```python
NAME="StarRailAssistant Error Analyzer"                     # 插件的名称
VERSION="0.2 Alpha"                                         # 插件的版本
DESCRIPTION="分析SRA运行时错误"                               # 插件的描述
AUTHOR="EveGlowLuna"                                        # 插件的作者
UI=PluginManager.public_ui                                  # 请求的 UI
```

## 插件 API

插件API是用于与SRA交互的接口。使用API方法如下：
- `run()`:插件按钮被点击启动时调用的方法。
- `PluginBase`:插件的基类，插件必须继承此类。
- `PluginManager.register()`:注册插件线程。

:::warning
- 插件必须有一个`__init__.py`文件。
- 插件必须有一个`run()`函数，即便它什么用也没有。除非`loadPeriod`被设置为`late`。
- 使用源码的插件尽量仅使用`SRA API`或`Python`标准库中的内容。
:::

## 着手开发一个插件

### 前置条件

1. 下载源代码
   - 前往 https://github.com/Shasnow/StarRailAssistant ，点击`Code` -> `Download ZIP`，下载后解压到一个文件夹中 或 使用 `git clone https://github.com/Shasnow/StarRailAssistant.git` (要求电脑中有 `Git`)
   - 前往 https://github.com/Shasnow/StarRailAssistant/releases ，直接下载**编译好的SRA本体**

2. 创建插件结构

    在 *IDE* 或 *文件资源管理器* 中，打开项目的文件夹，找到\plugins（或创建plugins文件夹），在\plugins中创建一个文件夹，文件夹的名称可随意填写，最好体现出你插件的名称/行为。
    
    ::: tip 
    
    文件夹中自带了一个插件： `BeautifulLog`，您的插件可以仿照此插件来写。
    
    ~~这个插件在新版本中疑似被删除。如果你想下载一个插件作为示例，可以前往[插件商店](https://starrailassistant.top/pluginstore.html)下载~~
    
    :::
    
    请注意，文件夹名称最好使用**英文**且**尽量不要使用空格**。
    
    现在，创建`plugin.toml`和`__init__.py`文件，这就是一个基础插件了。

3. 填写插件基本信息

   - 在0.8.3后
   在文件根目录创建一个`plugin.toml`文件，在文件中填写插件基本信息。

   - 在0.8.3前
   在`__init__.py`文件中填写插件基本信息。

### 开始编写自己的插件内容
#### 最简单的插件
在 `__init__.py` 中添加以下内容：
```python
def run():
    print("Hello, SRA Plugin!")
```
此时运行SRA, 你就能在SRA的 `拓展/插件` 中看到你的插件了。
点击插件按钮, 你会在控制台看到 `Hello, SRA Plugin!`。
    
#### 带独立UI窗口的插件
在 `__init__.py` 中定义一个类，继承 `QWidget`，并在类中实现UI逻辑。
例如
```python
from PySide6.QtWidgets import QWidget, QPushButton, QVBoxLayout

from SRACore.util.operator import Operator
class DevTootKit(QWidget):
    def __init__(self):
        super().__init__()
        self.operator=Operator()
        self.setWindowTitle("DevTootKit")
        self.setLayout(QVBoxLayout())
        self.screenshot_button=QPushButton("截图测试")
        self.setFixedSize(300, 300)
        self.screenshot_button.clicked.connect(lambda :self.operator.screenshot().show())
        self.layout().addWidget(self.screenshot_button)

toot_kit=DevTootKit() # 全局实例，否则你会看到窗口一闪而过

def run():
    toot_kit.show() # 显示窗口
```
很简单，我们创建了一个窗口，窗口中有一个按钮，点击按钮会调用SRA的截图功能。
现在运行SRA, 你就能在SRA的 `拓展/插件` 中看到你的插件了。
点击插件按钮, 你会看到一个窗口，窗口中有一个按钮，点击按钮会调用SRA的截图功能，并显示截图。

#### 自动运行的插件
如果你想让插件在SRA启动时自动运行，在 `__init__.py` 中添加以下内容：
```python
def run():
    pass # 这里可以不写任何内容
# 这里是自动运行的内容    
if __name__ != "__main__":
    print("插件已自动运行！")
    took_kit.show()
```
此时运行SRA, 你会在控制台看到 `插件已自动运行！`，并且窗口也会自动显示。

至此，您可以创建一个完整的插件了。编写完成后，您可以提交插件，~~或等待插件被官方收录~~。