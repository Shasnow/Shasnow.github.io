---
title: 插件开发指南
icon: laptop-code
order: 5
---

# 插件开发指南

在本章节中，我们将介绍如何开发一个SRA插件。

## 插件介绍

插件是SRA的扩展模块，通过插件可以实现一些特定的功能。插件可以是一个单独的Python文件，也可以是一个包含多个Python文件的文件夹。或用Python调用其他语言。

## 插件结构

一个插件的结构一般如下：

```
插件名/
    ├── __init__.py
    ├── 插件文件1.py
    ├── 插件文件2.py
    ├── ...
    └── 资源/
        ├── 资源文件1.png
        ├── 资源文件2.png
        ├──...
```

其中，`__init__.py`是插件的入口文件，用于初始化插件。`插件文件1.py`、`插件文件2.py`等是插件的具体实现文件。`资源/`文件夹中存放插件所需的资源文件。

你也可以自己决定插件结构。

## 插件元数据
插件元数据用来描述插件信息，或请求与SRA交互。

元数据有如下数值：
- NAME: 插件的名称，必须是字符串类型。
- VERSION: 插件的版本号，必须是字符串类型。
- DESCRIPTION: 插件的描述，必须是字符串类型。
- AUTHOR: 插件的作者，必须是字符串类型。
- UI: 请求SRA的主ui。仅做声明即可。

示例如下：
```python
NAME="StarRailAssistant Error Analyzer"                     # 插件的名称
VERSION="0.2 Alpha"                                         # 插件的版本
DESCRIPTION="分析SRA运行时错误，以中文提示显示并提供可能的解决方案"  # 插件的描述
AUTHOR="EveGlowLuna"                                        # 插件的作者
UI=PluginManager.public_ui                                  # 请求的 UI
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

1. 下载SRA源代码，然后在Plugins新建一个文件夹，上面写上插件名。
:::warning
文件夹名称应为英文，且尽量不要使用空格。
:::
2. 在插件文件夹中新建一个`__init__.py`文件。
3. 在`__init__.py`文件中导入需要的模块。
```python
from SRACore.utils.Plugins import PluginBase, PluginManager
from SRACore.utils.Logger import logger # 可以根据你需要的内容导入，此处仅作示例
```
4. 在`__init__.py`文件中定义插件元数据。上方已做示例，此处不再演示。
5. 在`__init__.py`文件中创建一个类，并作出你想实现的内容。
```python
class Plugin(PluginBase):
    def __init__(self):
        super().__init__("Plugin Name") # 此处需要填写名称（内容随意），否则会引发报错。
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
6. 在`__init__.py`文件中创建一个run()方法。
```python
def run():
    plugin = Plugin()
    PluginManager.register(plugin)
    plugin.function()
```
7. 运行SRA，打开插件页面，点击插件名，即可运行插件。

:::tip 启动时运行

插件在SRA刚启动时是不会运行的，需要手动激活。

如果你需要自动激活插件，可以添加如下代码：
```python
if __name__ != "__main__":
    # 执行run的函数，这样run可以进行其他事情
    # 注意不要使用重复使用PluginManager.register()注册插件
    pass
:::
    