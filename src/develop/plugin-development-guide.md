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
- NAME: 插件的名称，必须是字符串类型。
- VERSION: 插件的版本号，必须是字符串类型。
- DESCRIPTION: 插件的描述，必须是字符串类型。
- AUTHOR: 插件的作者，必须是字符串类型。
- UI: 请求SRA的主ui。仅做声明即可。

在 Beta 版本中，参数添加：
- displayName: 插件的名称
- version: 插件的版本号
- author: 作者/制作团队
- description: 有关插件的描述
- SRAVersion: 请求的SRA最低版本
- loadPeriod: 加载时机，如果为`normal`则会在 SRA 运行时直接加载

示例如下：
```python
NAME="StarRailAssistant Error Analyzer"                     # 插件的名称
VERSION="0.2 Alpha"                                         # 插件的版本
DESCRIPTION="分析SRA运行时错误，以中文提示显示并提供可能的解决方案"  # 插件的描述
AUTHOR="EveGlowLuna"                                        # 插件的作者
UI=PluginManager.public_ui                                  # 请求的 UI
```

```toml
displayName = "StarRailAssistant Error Analyzer"
version = "0.2 Alpha"
author = "EveGlowLuna"
description = "分析SRA运行时错误，以中文提示显示并提供可能的解决方案"
SRAVersion: "0.8.2"
loadPeriod: "normal"
```

## 插件 API

插件API是用于与SRA交互的接口。使用API方法如下：
- `run()`:插件启动时调用的方法。
- `PluginBase`:插件的基类，插件必须继承此类。
- `PluginManager.register()`:注册插件线程。

:::warning
- 插件中至少要有一个子类继承PluginBase类。
- 插件必须有一个`__init__.py`文件，并在其中实现run()方法。
- 插件必须使用`PluginManager.register()`方法注册到多线程运行。
- 使用源码的插件尽量仅使用`SRA API`或`Python`标准库中的内容。
:::

## 着手开发一个插件

### 前置条件

1. 下载源代码
- 前往 https://github.com/Shasnow/StarRailAssistant ，点击`Code` -> `Download ZIP`，下载后解压到一个文件夹中
- 使用 `git clone https://github.com/Shasnow/StarRailAssistant.git` (要求电脑中有 `Git`)

2. 创建插件结构

在 *IDE* 或 *文件资源管理器* 中，打开项目的文件夹，找到\plugins，创建一个文件夹，文件夹的名称可随意填写，最好体现出你插件的名称/行为。

::: tip 

文件夹中自带了一个插件： `BeautifulLog`，您的插件可以仿照此插件来写。

:::

请注意，文件夹名称最好使用**英文**且**尽量不要使用空格**。

现在，创建`plugin.toml`和`__init__.py`文件，这就是一个基础插件了。

3. 填写插件基本信息

在您的`plugin.toml`和`__init__.py`中填写插件基本信息。上方已经介绍过，此处不过多赘述。

::: info 新版本中的元数据

新版本不再强制要求`__init__.py`中填写插件基本信息。所以如果你的代码文件中没有使用到的地方，你可以不去填写。

:::

4. 导入需要的插件
::: warning 导入插件时请注意尽量使用Python标准库中的内容。
:::

此处进行导入示例：
```python
# 从 SRA 中导入插件
from SRACore.utils.Plugins import *
from SRACore.utils.Logger import logger
# 从标准库中导入插件
import os
import json
# 从该插件中导入
from . import somepluginfile1
```

5. 开始编写自己的插件内容

创建一个类，继承`PluginBase`。

```python
class Plugin(PluginBase):
    def __init__(self):
        super().__init__("Plugin Name") # 此处需要填写名称（您的插件名称），否则会引发报错。
        # 可以在这里初始化类内容。
        # 你可以定义变量，也可以调用函数。
        # 例如：
        self.plugin_count = 0
        self.add_function()
    def function(self):
        # 可以在这里实现你的功能。
        # 你可以做任何你想要做的事情。如果调用SRA API, 你需要提前导入模块。
        logger.info(f"插件成功运行，plugin_count目前值：{str(self.plugin_count)}")
    def add_function(self):
        # 此处作为一个示例被调用。
        self.plugin_count += 1
```

记得添加一个`run()`函数，即便它什么用也没有。

```python
def run():
    pass # 可以执行你想干的事，他会在设置页面中点击插件按钮后执行。
```

创建一个入口函数。

```python
if __name__ != "__main__":
    plugin = Plugin()
    PluginManager.register(plugin)
    plugin.function()
```

恭喜！此时您可以打开 SRA 查看您刚写的内容了！

!!2025-06-22 16:27:38 | WARNING | Plugins.load_plugins:49 | Failed to load plugin 'MyPlugin': PluginBase.__init__() missing 1 required positional argument: 'name'!!

至此，您可以创建一个完整的插件了。编写完成后，就可以提交插件了。