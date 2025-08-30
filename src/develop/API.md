---
title: API
order: 5
icon: box
author: Shasnow
---


# API
此文档介绍StarRailAssistant（SRA）的API接口，涵盖鼠标事件、键盘事件、图像识别、窗口管理等模块的功能和用法。
[查看旧版](API-old.md)

## operator 模块
operator 模块提供了与游戏窗口交互的功能，包括截图、图像识别、鼠标点击、键盘按键等操作。
# 类：
## Operator
```python :no-line-numbers
class SRACore.util.operator.Operator
```
Operator 是操作游戏窗口的核心类，封装了与游戏窗口交互的各种方法。
要创建`Operator`，可调用其构造函数。不接收任何参数。
```python :no-line-numbers
operator = Operator()
```
### 属性
- `window_title` (str): 游戏窗口标题。默认值为`"崩坏：星穹铁道"`。
- `gcm` (GlobalConfigManager): 全局配置管理器实例。
- `confidence` (float): 图像识别置信度。从 `gcm` 获取，范围为0.0~1.0。默认值为0.9。
- `zoom` (float): 屏幕缩放比例。从 `gcm` 获取。默认值为1.25。
- `active_window` (bool): 是否在获取窗口区域时激活窗口。默认值为True。

一个`Operator`实例可调用以下方法：
### Operator.is_window_active
```python :no-line-numbers
@property
Operator.is_window_active() -> bool
```
检查游戏窗口是否为当前活动窗口。
`返回值`:
- `True`: 窗口为当前活动窗口。
- `False`: 窗口不为当前活动窗口。

### Operator.get_win_region
```python :no-line-numbers
Operator.get_win_region(active_window: bool|None = None, raise_exception: bool = True) -> Region | None
```
获取游戏窗口区域。
`参数`:
- `active_window`: 是否在获取时激活窗口。
    - `True`: 获取前激活窗口。
    - `False`: 获取前不激活窗口。
    - `None`: 使用当前实例默认值。（默认值为`True`）
- `raise_exception`: 是否在获取失败时抛出异常。
    - `True`: 获取失败时抛出异常。
    - `False`: 获取失败时返回`None`。
  
`返回值`:
- `Region`: 获取成功，返回窗口区域。
- `None`: 获取失败，返回`None`。

`异常`:
- `Exception`: 未找到游戏窗口 | 窗口未激活 | 获取失败

### Operator.screenshot
```python :no-line-numbers
@overload
Operator.screenshot(region: Region | None = None) -> PIL.Image.Image
```
截取游戏窗口区域的截图。
`参数`:
- `region`: 截图区域。
    - `Region`: 截图指定区域。
    - `None`: 截图整个窗口区域。

`返回值`:
- `PIL.Image.Image`: 截图成功，返回截图图像。

```python :no-line-numbers
@overload
Operator.screenshot(from_x: float, from_y: float, to_x: float, to_y: float) -> PIL.Image.Image
```
截取游戏窗口区域的截图。
`参数`:
- `from_x`: 截图区域左上角的相对X坐标，范围为0.0~1.0。
- `from_y`: 截图区域左上角的相对Y坐标，范围为0.0~1.0。
- `to_x`: 截图区域右下角的相对X坐标，范围为0.0~1.0。
- `to_y`: 截图区域右下角的相对Y坐标，范围为0.0~1.0。

`返回值`:
- `PIL.Image.Image`: 截图成功，返回截图图像。

`异常`:
- `ValueError`: 参数错误

### Operator.locate
```python :no-line-numbers
@overload
Operator.locate(template: str | Path, region: Region | None = None, trace: bool = True) -> Box | None
```
在游戏窗口区域内查找指定模板图像。
`参数`:
- `template`: 模板图像路径。
- `region`: 查找区域。
    - `Region`: 在指定区域内查找。
    - `None`: 在整个窗口区域内查找。
- `trace`: 是否显示查找过程。
    - `True`: 显示查找过程。
    - `False`: 不显示查找过程。

`返回值`:
- `Box`: 查找成功，返回模板图像在窗口区域内的位置。
- `None`: 查找失败，返回`None`。

```python :no-line-numbers
@overload
Operator.locate(template: str | Path, 
                from_x: float, 
                from_y: float, 
                to_x: float, 
                to_y: float, 
                trace: bool = True) -> Box | None
```
在游戏窗口区域内查找指定模板图像。
`参数`:
- `template`: 模板图像路径。
- `from_x`: 查找区域左上角的相对X坐标，范围为0.0~1.0。
- `from_y`: 查找区域左上角的相对Y坐标，范围为0.0~1.0。
- `to_x`: 查找区域右下角的相对X坐标，范围为0.0~1.0。
- `to_y`: 查找区域右下角的相对Y坐标，范围为0.0~1.0。
- `trace`: 是否显示查找过程。
    - `True`: 显示查找过程。
    - `False`: 不显示查找过程。

`返回值`:
- `Box`: 查找成功，返回模板图像在窗口区域内的位置。
- `None`: 查找失败，返回`None`。

### Operator.locate_any
```python :no-line-numbers
@overload
Operator.locate_any(templates: list[str | Path],
                    region: Region | None = None,
                    trace: bool = True) -> tuple[int, Box | None]
```
在游戏窗口区域内查找指定模板图像列表中的任意一个。
`参数`:
- `templates`: 模板图像路径列表。
- `region`: 查找区域。
    - `Region`: 在指定区域内查找。
    - `None`: 在整个窗口区域内查找。
- `trace`: 是否显示查找过程。

`返回值`:
- `tuple[int, Box | None]`: 查找成功，返回找到的模板图像在列表中的索引及其在窗口区域内的位置；查找失败，返回-1及`None`。

```python :no-line-numbers
@overload
Operator.locate_any(templates: list[str | Path],
                    from_x: float,
                    from_y: float,
                    to_x: float,
                    to_y: float,
                    trace: bool = True) -> tuple[int, Box | None]
```
在游戏窗口区域内查找指定模板图像列表中的任意一个。
`参数`:
- `templates`: 模板图像路径列表。
- `from_x`: 查找区域左上角的相对X坐标，范围为0.0~1.0。
- `from_y`: 查找区域左上角的相对Y坐标，范围为0.0~1.0。
- `to_x`: 查找区域右下角的相对X坐标，范围为0.0~1.0。
- `to_y`: 查找区域右下角的相对Y坐标，范围为0.0~1.0。
- `trace`: 是否显示查找过程。

`返回值`:
- `tuple[int, Box | None]`: 查找成功，返回找到的模板图像在列表中的索引及其在窗口区域内的位置；查找失败，返回-1及`None`。

### Operator.click_point
```python :no-line-numbers
Operator.click_point(x: int | float, y: int | float, 
                     x_offset: int = 0, y_offset: int = 0
                     after_sleep: float = 0) -> bool
```
在游戏窗口区域内点击指定位置。
`参数`:
- `x`: 点击位置的X坐标。
    - `int`: 绝对坐标，单位为像素。
    - `float`: 相对坐标，范围为0.0~1.0。
- `y`: 点击位置的Y坐标。
    - `int`: 绝对坐标，单位为像素。
    - `float`: 相对坐标，范围为0.0~1.0。
- `x_offset`: 点击位置的X偏移量，单位为像素。默认值为0。
- `y_offset`: 点击位置的Y偏移量，单位为像素。默认值为0。
- `after_sleep`: 点击后等待的时间，单位为秒。默认值为0。

`返回值`:
- `bool`: 点击成功，返回`True`；点击失败，返回`False`

`异常`:
- `ValueError`: 参数错误

### Operator.click_box
```python :no-line-numbers
Operator.click_box(box: Box,
                  x_offset: int = 0, y_offset: int = 0,
                  after_sleep: float = 0) -> bool
```
在游戏窗口区域内点击指定位置。
`参数`:
- `box`: 点击位置的区域。
- `x_offset`: 点击位置的X偏移量，单位为像素。默认值为0。
- `y_offset`: 点击位置的Y偏移量，单位为像素。默认值为0。
- `after_sleep`: 点击后等待的时间，单位为秒。默认值为0。

`返回值`:
- `bool`: 点击成功，返回`True`；点击失败，返回`False`

### Operator.click_img
```python :no-line-numbers
Operator.click_img(img_path: str | Path,
                   x_offset: int = 0, y_offset: int = 0,
                   after_sleep: float = 0) -> bool
```
在游戏窗口区域内查找指定模板图像并点击其中心位置。
`参数`:
- `img_path`: 模板图像路径。
- `x_offset`: 点击位置的X偏移量，单位为像素。默认值为0。
- `y_offset`: 点击位置的Y偏移量，单位为像素。默认值为0。
- `after_sleep`: 点击后等待的时间，单位为秒。默认值为0。

`返回值`:
- `bool`: 点击成功，返回`True`；点击失败，返回`False`

### Operator.wait_img
```python :no-line-numbers
Operator.wait_img(img_path: str | Path,
                  timeout: float = 10,
                  interval: float = 0.5) -> bool
```
在游戏窗口区域内等待指定模板图像出现。
`参数`:
- `img_path`: 模板图像路径。
- `timeout`: 等待超时时间，单位为秒。默认值为10秒。
- `interval`: 每次查找间隔时间，单位为秒。默认值为0.5秒。

`返回值`:
- `bool`: 图像出现，返回`True`；超时未出现，返回`False`

### Operator.wait_any_img
```python :no-line-numbers
Operator.wait_any_img(img_paths: list[str | Path],
                      timeout: float = 10,
                      interval: float = 0.5) -> int
```
在游戏窗口区域内等待指定模板图像列表中的任意一个出现。
`参数`:
- `img_paths`: 模板图像路径列表。
- `timeout`: 等待超时时间，单位为秒。默认值为10秒。
- `interval`: 每次查找间隔时间，单位为秒。默认值为0.5秒。

`返回值`:
- `int`: 图像出现，返回找到的模板图像在列表中的索引；超时未出现，返回-1

### Operator.press_key
```python :no-line-numbers
@staticmethod
Operator.press_key(key: str, 
                   presses: int = 1,
                   interval: float = 0,
                   wait: float = 0) -> bool
```
模拟按下指定键。
`参数`:
- `key`: 要按下的键名称
- `presses`: 按下次数。默认值为1。
- `interval`: 每次按下间隔时间，单位为秒。默认值为0秒。
- `wait`: 首次按下前等待的时间，单位为秒。默认值为0秒。

`返回值`:
- `bool`: 按键成功，返回`True`；按键失败，返回`False`

### Operator.hold_key
```python :no-line-numbers
@staticmethod
Operator.hold_key(key: str, duration: float = 0) -> bool
```
模拟按住指定键一段时间。
`参数`:
- `key`: 要按住的键名称
- `duration`: 按住时间，单位为秒。默认值为0秒。

`返回值`:
- `bool`: 按键成功，返回`True`；按键失败，返回`False`

### Operator.sleep
```python :no-line-numbers
@staticmethod
Operator.sleep(seconds: float) -> None
```
暂停程序执行一段时间。
`参数`:
- `seconds`: 暂停时间，单位为秒。

`返回值`:
- `None`

### Operator.copy
```python :no-line-numbers
@staticmethod
Operator.copy(text: str) -> Any
```
将指定文本复制到系统剪贴板。
`参数`:
- `text`: 要复制的文本。

### Operator.paste
```python :no-line-numbers
@staticmethod
Operator.paste() -> None
```
模拟粘贴操作，将系统剪贴板中的文本粘贴到当前光标位置。
`参数`:
- 无

`返回值`:
- `None`

### Operator.move_rel
```python :no-line-numbers
@staticmethod
Operator.move_rel(x_offset: int, y_offset: int) -> bool
```
模拟鼠标相对移动。
`参数`:
- `x_offset`: 鼠标在X轴上的移动偏移量，单位为像素。
- `y_offset`: 鼠标在Y轴上的移动偏移量，单位为像素。

`返回值`:
- `bool`: 移动成功，返回`True`；移动失败，返回`False`

### Operator.move_to
```python :no-line-numbers
@staticmethod
Operator.move_to(x: int | float, y: int | float, duration: float = 0.0) -> bool
```
模拟鼠标移动到指定位置。
`参数`:
- `x`: 目标位置的X坐标。
    - `int`: 绝对坐标，单位为像素。
    - `float`: 相对坐标，范围为0.0~1.0。
- `y`: 目标位置的Y坐标。
    - `int`: 绝对坐标，单位为像素。
    - `float`: 相对坐标，范围为0.0~1.0。
- `duration`: 移动时间，单位为秒。默认值为0秒。

`返回值`:
- `bool`: 移动成功，返回`True`；移动失败，返回`False`

### Operator.scroll
```python :no-line-numbers
@staticmethod
Operator.scroll(distance: int) -> bool
```
模拟鼠标滚轮滚动。
`参数`:
- `distance`: 滚动距离。正值表示向上滚动，负值表示向下滚动。

`返回值`:
- `bool`: 滚动成功，返回`True`；滚动失败，返回`False`

## Executable
```python :no-line-numbers
class SRACore.util.operator.Executable(Operator)
```
`Executable` 仅继承自 `Operator`，无新增属性和方法。可直接创建实例使用。
```python :no-line-numbers
executable = Executable()
```

## Box
```python :no-line-numbers
@dataclasses.dataclass
class SRACore.util.operator.Box
```
表示一个矩形区域，包含位置和尺寸信息。
属性
- `left` (int): 矩形左上角的X坐标。
- `top` (int): 矩形左上角的Y坐标。
- `width` (int): 矩形的宽度。
- `height` (int): 矩形的高度。

方法
### Box.center
```python :no-line-numbers
@property
Box.center() -> tuple[int, int]
```
计算并返回矩形的中心点坐标。

## Region
```python :no-line-numbers
@dataclasses.dataclass
class SRACore.util.operator.Region
```
表示一个矩形区域，包含位置和尺寸信息。
属性
- `left` (int): 矩形左上角的X坐标。
- `top` (int): 矩形左上角的Y坐标。
- `width` (int): 矩形的宽度。
- `height` (int): 矩形的高度。

方法
### Region.tuple
```python :no-line-numbers
@property
Region.tuple() -> tuple[int, int, int, int]
```
将区域信息转换为元组形式，返回 (left, top, width, height)。

## system 模块
system 模块提供了与系统交互的功能，包括执行命令、检查进程、终止进程等操作。
# 方法: 
### Popen
```python :no-line-numbers
SRACore.util.system.Popen(arg: str | list[str], 
                           shell: bool = False, 
                           **kwargs) -> bool
```
使用子进程执行指定命令。是对`psutil.Popen`的封装。

然而`psutil.Popen`是对`subprocess.Popen`的封装。
`参数`:
- `arg`: 要执行的命令字符串或字符串列表。
- `shell`: 是否通过shell执行命令。默认值为`False`。
- `**kwargs`: 传递给`subprocess.Popen`的其他参数。

`返回值`:
- `bool`: 命令执行成功，返回`True`；命令执行失败，返回`False`

### is_process_running
```python :no-line-numbers
SRACore.util.system.is_process_running(process_name: str) -> bool
```
检查指定名称的进程是否正在运行。
`参数`:
- `process_name`: 要检查的进程名称。

`返回值`:
- `bool`: 进程正在运行，返回`True`；进程未运行，返回`False`

### task_kill
```python :no-line-numbers
SRACore.util.system.task_kill(process_name: str) -> bool
```
终止指定名称的进程。
`参数`:
- `process_name`: 要终止的进程名称。

`返回值`:
- `bool`: 进程终止成功，返回`True`；进程终止失败，返回`False`

## config 模块
config 模块提供了配置文件管理的功能，包括加载、获取、设置和保存配置项等操作。
# 类:
## GlobalConfigManager
```python :no-line-numbers
class SRACore.util.config.GlobalConfigManager
```
用于管理全局配置文件`globals.json`。

要使用`GlobalConfigManager`，除了SRA自身，其他位置不应通过构造函数创建实例。
```python :no-line-numbers
gcm = GlobalConfigManager.get_instance() # 获取单例实例
```

一个`GlobalConfigManager`实例可调用以下方法：
### load
```python :no-line-numbers
GlobalConfigManager.load() -> None
```
加载全局配置文件`globals.json`。
如果文件不存在或无法解析，将使用默认值。
如果发生错误（如文件不存在、JSON解析错误或类型错误），将打印错误信息并使用默认值。
例如，如果文件不存在，将打印"Global config file not found, using default values."。
如果JSON解析错误，将打印"Error decoding JSON from globals.json, using default values."。
如果发生类型错误，将打印"Error initializing GlobalConfig, using default values."。
这些错误处理确保程序在配置文件有问题时仍能正常运行。
该方法不会抛出异常，而是通过打印错误信息来通知用户。
`返回值`:
- `None`

:::warning
不应手动调用此方法，它在初始化时自动调用。
:::

### get
```python :no-line-numbers
GlobalConfigManager.get(key: str, default: Any = None) -> Any
```
获取指定键的配置值。如果配置项不存在，则添加该项并返回默认值。
`参数`:
- `key`: 要获取的配置键。
- `default`: 如果键不存在，返回的默认值。默认值为`None`

`返回值`:
- `Any`: 配置值或默认值。

### set
```python :no-line-numbers
GlobalConfigManager.set(key: str, value: Any) -> None
```
设置指定键的配置值。如果配置项不存在，则添加该项。
`参数`:
- `key`: 要设置的配置键。
- `value`: 要设置的配置值。

### sync
```python :no-line-numbers
GlobalConfigManager.sync() -> None
```
将当前配置保存到全局配置文件`globals.json`。

### get_instance
```python :no-line-numbers
@classmethod
GlobalConfigManager.get_instance() -> GlobalConfigManager
```
获取`GlobalConfigManager`的单例实例。如果实例不存在, 抛出异常。
`返回值`:
- `GlobalConfigManager`: 单例实例。

`异常`:
- `RuntimeError`: 实例未初始化

## ConfigManager
```python :no-line-numbers
class SRACore.util.config.ConfigManager
```
用于管理指定路径的JSON配置文件。
要创建`ConfigManager`，可调用其构造函数，传入配置文件路径。
```python :no-line-numbers
config_manager = ConfigManager(config_path: str | Path)
```
或使用`get_instance`获取单例实例。
```python :no-line-numbers
config_manager = ConfigManager.get_instance()
```
除了SRA自身，其他位置不应通过构造函数创建实例。
一个`ConfigManager`实例可调用以下方法：
### load
```python :no-line-numbers
ConfigManager.load(name: str) -> None
```
加载指定名称的配置文件。如果文件不存在或无法解析，将使用默认值。

`参数`:
- `name`: 要加载的配置文件名称（不含扩展名）。

### get
```python :no-line-numbers
ConfigManager.get(key: str, default: Any = None) -> Any
```
获取指定键的配置值。如果配置项不存在，则添加该项并返回默认值。
`参数`:
- `key`: 要获取的配置键。
- `default`: 如果键不存在，返回的默认值。默认值为`None`

`返回值`:
- `Any`: 配置值或默认值。

### set
```python :no-line-numbers
ConfigManager.set(key: str, value: Any) -> None
```
设置指定键的配置值。如果配置项不存在，则添加该项。
`参数`:
- `key`: 要设置的配置键。
- `value`: 要设置的配置值。

### sync
```python :no-line-numbers
ConfigManager.sync() -> None
```
将当前配置保存到配置文件。

### switch
```python :no-line-numbers
ConfigManager.switch(name: str) -> None
```
保存当前配置，切换到另一个配置文件。
`参数`:
- `name`: 要切换到的配置文件名称（不含扩展名）。

### get_instance
```python :no-line-numbers
@classmethod
ConfigManager.get_instance() -> ConfigManager
```
获取`ConfigManager`的单例实例。如果实例不存在, 抛出异常。
`返回值`:
- `ConfigManager`: 单例实例。

`异常`:
- `RuntimeError`: 实例未初始化

### delete
```python :no-line-numbers
@staticmethod
ConfigManager.delete(name: str) -> bool
```
删除指定名称的配置文件。
`参数`:
- `name`: 要删除的配置文件名称（不含扩展名）。

## const 模块
const 模块定义了一些常量
### 常量
- `RANDOM_TITLE` (str): 用于创建随机窗口标题的字符串列表。

## encryption 模块
encryption 模块提供了数据加密和解密的功能，使用Windows的DPAPI进行加密和解密操作。
方法:
### win_encryptor
```python :no-line-numbers
SRACore.util.encryption.win_encryptor(note: str, description: str = None, entropy: bytes = None) -> str
```
使用Windows DPAPI加密数据
`参数`:
- `note`: 要加密的字符串。
- `description`: 可选的描述字符串，默认为`None`。
- `entropy`: 可选的附加熵，默认为`None`。

`返回值`:
- `str`: 加密后的字符串，使用Base64编码。

### win_decryptor
```python :no-line-numbers
SRACore.util.encryption.win_decryptor(encrypted_note: str, entropy: bytes = None) -> str
```
使用Windows DPAPI解密数据
`参数`:
- `encrypted_note`: 要解密的Base64编码字符串。
- `entropy`: 可选的附加熵，默认为`None`。

`返回值`:
- `str`: 解密后的字符串。

## logger 模块
logger 模块提供了日志记录的功能
### logger
```python :no-line-numbers
from SRACore.util.logger import logger
```
`logger` 是一个预配置的日志记录器实例，使用Python的`loguru`库进行日志记录。

### log_emitter
```python :no-line-numbers
from SRACore.util.logger import log_emitter
```
`log_emitter` 是一个QObject子类，用于在Qt应用程序中转发日志消息到UI线程。
`信号`:
- `log_signal`: 当有新日志消息时发射，携带日志消息的格式化字符串
