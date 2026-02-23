---
title: API
order: 5
icon: box
author: Shasnow
---


# API
此文档介绍StarRailAssistant（SRA）的API接口，涵盖鼠标事件、键盘事件、图像识别、窗口管理等模块的功能和用法。

```component VPBanner
title: 版本差异
content: 此文档适用于新版 SRA，旧版的 API 文档已过时。如果需要，可以点击下方按钮查看旧版 API 文档。
background: var(--bg-10)
color: var(--banner-text)
actions:
  - text: 旧版 API 文档
    link: API-old
```
* 部分内容可能过时，以源码内注释为准。

## SRACore.operators 软件包

## ioperator 模块
  ioperator 模块定义了操作游戏窗口的接口类 `IOperator`

## IOperator
```python :no-line-numbers
class SRACore.operators.ioperator.IOperator(ABC)
```
`IOperator` 是一个抽象基类，定义了操作游戏窗口的接口方法。具体实现由 `Operator` 类提供。

### 属性
- `settings` (dict): 存储应用程序设置项，从配置文件加载。
- `confidence` (float): 模板图像匹配的置信度阈值，范围为0.0~1.0。从`settings`中加载，默认值为0.9。
- `zoom` (float): 窗口缩放比例，从`settings`中加载。
- `top` (int): 窗口区域的顶部坐标缓存。
- `left` (int): 窗口区域的左侧坐标缓存。
- `width` (int): 窗口区域的宽度缓存。
- `height` (int): 窗口区域的高度缓存。


### 方法

#### is_window_active
```python :no-line-numbers
@property
@abstractmethod
def is_window_active(self) -> bool: ...
```
检查游戏窗口是否为当前活动窗口。

#### get_win_region
```python :no-line-numbers
@abstractmethod
def get_win_region(self, active_window: bool | None = None, raise_exception: bool = True) -> Region | None: ...
```
获取目标窗口的区域坐标

`参数`：
- `active_window` (bool | None, optional): 是否在获取窗口区域前激活窗口。
- `raise_exception` (bool, optional): 如果无法获取窗口区域，是否抛出异常。默认为True。
`返回值`：
- `Region | None`: 返回窗口区域对象，如果无法获取且raise_exception为False，则返回None。
`异常`：
- `Exception`: 如果无法获取窗口区域且raise_exception为True，则抛出异常。

#### screenshot
```python :no-line-numbers
def screenshot(self, region: Region | None = None,
                   *,
                   from_x: float | None = None,
                   from_y: float | None = None,
                   to_x: float | None = None,
                   to_y: float | None = None) -> Image: ...
```
截取屏幕截图

`参数`：
- `region` (Region | None, optional): 要截取的区域对象，包含left, top, width, height属性。
        如果为None，则默认截取当前活动窗口的区域。默认为None。
- `from_x` (float, optional): 起始点X坐标比例 (0-1)，相对于窗口左上角
- `from_y` (float, optional): 起始点Y坐标比例 (0-1)，相对于窗口左上角
- `to_x` (float, optional): 结束点X坐标比例 (0-1)，相对于窗口左上角
- `to_y` (float, optional): 结束点Y坐标比例 (0-1)，相对于窗口左上角
`返回值`：
- `PIL.Image.Image`: 返回截取的屏幕区域图像对象
`注意`：
- 当region为None时，会自动获取活动窗口区域
- 坐标比例是基于当前窗口区域计算的
- 当传入完整的比例坐标时，region参数会被忽略
`异常`：
- `ValueError`: 如果坐标比例参数不完整或不在0-1范围内

#### locate
```python :no-line-numbers
def locate(self,
            template: str,
            region: Region | None = None,
            *,
            from_x: float | None = None,
            from_y: float | None = None,
            to_x: float | None = None,
            to_y: float | None = None,
            confidence: float | None = None,
            trace: bool = True) -> Box | None: ...
```
在窗口内查找模板图片位置

`参数`：
- `template` (str): 模板图片路径
- `region` (Region | None, optional): 要查找的区域对象，包含left, top, width, height属性。
        如果为None，则默认查找当前活动窗口的区域。默认为None。
- `from_x` (float, optional): 起始点X坐标比例 (0-1), 相对于窗口左上角
- `from_y` (float, optional): 起始点Y坐标比例 (0-1), 相对于窗口左上角
- `to_x` (float, optional): 结束点X坐标比例 (0-1), 相对于窗口左上角
- `to_y` (float, optional): 结束点Y坐标比例 (0-1), 相对于窗口左上角
- `confidence` (float | None, optional): 匹配置信度阈值 (0-1), 如果为None则使用默认值。默认为None。
- `trace` (bool, optional): 是否打印调试信息。默认为True。
`返回值`：
- `Box | None`: 找到的图片位置，如果未找到则返回None
`异常`：
- `ValueError`: 如果坐标比例参数不完整或不在0-1范围内

#### locate_any
```python :no-line-numbers
def locate_any(self,
            templates: list[str],
            region: Region | None = None,
            *,
            from_x: float | None = None,
            from_y: float | None = None,
            to_x: float | None = None,
            to_y: float | None = None,
            confidence: float | None = None,
            trace: bool = True) -> tuple[int, Box | None]: ...
```
在窗口内查找任意一张图片位置
        
`参数`：
- `templates` (list[str]): 模板图片路径列表
- `region` (Region | None, optional): 要查找的区域对象，包含left, top, width, height属性。
        如果为None，则默认查找当前活动窗口的区域。默认为None。
- `from_x` (float, optional): 起始点X坐标比例 (0-1)，相对于窗口左上角
- `from_y` (float, optional): 起始点Y坐标比例 (0-1)，相对于窗口左上角
- `to_x` (float, optional): 结束点X坐标比例 (0-1)，相对于窗口左上角
- `to_y` (float, optional): 结束点Y坐标比例 (0-1)，相对于窗口左上角
- `confidence` (float | None, optional): 匹配度, 0-1之间的浮点数, 默认为self.confidence
- `trace` (bool, optional): 是否打印调试信息。默认为True。
`返回值`：
- `tuple[int, Box | None]`: 找到的图片索引和位置，如果未找到则返回-1和None
`异常`：
- `ValueError`: 如果坐标比例参数不完整或不在0-1范围内

#### locate_all
```python :no-line-numbers
def locate_all(self,
            template: str,
            region: Region | None = None,
            *,
            from_x: float | None = None,
            from_y: float | None = None,
            to_x: float | None = None,
            to_y: float | None = None,
            confidence: float | None = None,
            trace: bool = True) -> list[Box] | None: ...
```
在窗口内查找所有匹配的图片位置

`参数`：
- `template` (str): 模板图片路径
- `region` (Region | None, optional): 要查找的区域对象，包含left, top, width, height属性。
        如果为None，则默认查找当前活动窗口的区域。默认为None。
- `from_x` (float, optional): 起始点X坐标比例 (0-1), 相对于窗口左上角
- `from_y` (float, optional): 起始点Y坐标比例 (0-1), 相对于窗口左上角
- `to_x` (float, optional): 结束点X坐标比例 (0-1), 相对于窗口左上角
- `to_y` (float, optional): 结束点Y坐标比例 (0-1), 相对于窗口左上角
- `confidence` (float | None, optional): 匹配置信度阈值 (0-1), 如果为None则使用默认值。默认为None。
- `trace` (bool, optional): 是否打印调试信息。默认为True。
`返回值`：
- `list[Box] | None`: 找到的所有图片位置列表，如果未找到则返回None
`异常`：
- `ValueError`: 如果坐标比例参数不完整或不在0-1范围内



#### ocr
```python :no-line-numbers
def ocr(self,
        region: Region | None = None,
        *,
        from_x: float | None = None,
        from_y: float | None = None,
        to_x: float | None = None,
        to_y: float | None = None,
        trace: bool = True) -> list[Any] | None: ...
```
执行 OCR 文字识别

考虑使用 ocr_match 或 ocr_match_any 方法来处理文本匹配和位置获取，而不是直接使用此方法。
`参数`：
- `region` (Region | None, optional): 要识别的区域对象，包含left, top, width, height属性。
        如果为None，则默认识别当前活动窗口的区域。默认为None。如果传入完整的比例坐标时，region参数会被忽略
- `from_x` (float, optional): 起始点X坐标比例 (0-1)，相对于窗口左上角
- `from_y` (float, optional): 起始点Y坐标比例 (0-1)，相对于窗口左上角
- `to_x` (float, optional): 结束点X坐标比例 (0-1)，相对于窗口左上角
- `to_y` (float, optional): 结束点Y坐标比例 (0-1)，相对于窗口左上角
- `trace` (bool, optional): 是否打印调试信息。默认为True。
`返回值`：
- `list[Any] | None`: OCR 引擎返回的原始结果。如果发生错误，返回None。
`异常`：
- `ValueError`: 如果坐标比例参数不完整或不在0-1范围内

```python :no-line-numbers
@overload
def ocr(self, from_x: float, from_y: float, to_x: float, to_y: float, trace: bool = True) -> list[Any] | None: ...
```
在窗口的指定区域内执行 OCR 文字识别，返回原始 OCR 结果（包含文本、坐标、置信度等）。
`参数`：
- `from_x`：识别区域左上角的相对X坐标，范围为0.0~1.0。
- `from_y`：识别区域左上角的相对Y坐标，范围为0.0~1.0。
- `to_x`：识别区域右下角的相对X坐标，范围为0.0~1.0。
- `to_y`：识别区域右下角的相对Y坐标，范围为0.0~1.0。
- `trace`：是否显示错误信息。

`返回值`：
- `list[Any]`：识别成功，返回 OCR 结果列表。
- `None`：识别失败，返回`None`。

`示例`：
```python :no-line-numbers
# 在整个窗口区域内识别
ocr_result = operator.ocr()
# 在指定区域内识别
region = Region(left=100, top=100, width=400, height=300)
ocr_result = operator.ocr(region=region)
# 在指定相对坐标区域内识别
ocr_result = operator.ocr(from_x=0.1, from_y=0.1, to_x=0.5, to_y=0.5)
```

#### ocr_match
```python :no-line-numbers
def ocr_match(self,
                text: str,
                confidence=0.9,
                region: Region = None,
                *,
                from_x: float | None = None,
                from_y: float | None = None,
                to_x: float | None = None,
                to_y: float | None = None,
                trace: bool = True) -> Box | None: ...
```
OCR识别并匹配指定文本，返回文本位置

当提供完整4个比例坐标时，region参数会被忽略。
`参数`：
- `text` (str): 要识别的文本
- `confidence` (float, optional): 识别置信度。默认为0.9。
- `region` (Region | None, optional): 识别区域。如果为None，则默认识别当前活动窗口的区域。默认为None。
- `from_x` (float, optional): 识别区域起始x坐标比例(0-1)。
- `from_y` (float, optional): 识别区域起始y坐标比例(0-1)。
- `to_x` (float, optional): 识别区域结束x坐标比例(0-1)。
- `to_y` (float, optional): 识别区域结束y坐标比例(0-1)。
- `trace` (bool, optional): 是否打印调试信息。默认为True。
`返回值`：
- `Box | None`: 找到的文本位置，如果未找到则返回None。

#### ocr_match_any
```python :no-line-numbers
def ocr_match_any(self,
                      texts: list[str],
                      confidence=0.9,
                      region: Region = None,
                      *,
                      from_x: float | None = None,
                      from_y: float | None = None,
                      to_x: float | None = None,
                      to_y: float | None = None,
                      trace: bool = True) -> tuple[int, Box | None]: ...
```
OCR识别并匹配任意指定文本，返回文本索引和位置

当提供完整4个比例坐标时，region参数会被忽略。
`参数`：
- `texts` (list[str]): 要识别的文本列表
- `confidence` (float, optional): 识别置信度。默认为0.9。
- `region` (Region | None, optional): 识别区域。如果为None，则默认识别当前活动窗口的区域。默认为None。
- `from_x` (float, optional): 识别区域起始x坐标比例(0-1)。
- `from_y` (float, optional): 识别区域起始y坐标比例(0-1)。
- `to_x` (float, optional): 识别区域结束x坐标比例(0-1)。
- `to_y` (float, optional): 识别区域结束y坐标比例(0-1)。
- `trace` (bool, optional): 是否打印调试信息。默认为True。
`返回值`：
- `tuple[int, Box | None]`: 找到的文本索引和位置，如果未找到则返回-1和None

#### wait_ocr
```python :no-line-numbers
def wait_ocr(self, text: str, timeout: float = 10, interval: float = 0.2, confidence=0.9, *args,
                 **kwargs) -> Box | None: ...
```
等待指定文本出现在窗口中，返回文本位置

`参数`：
- `text`：要等待的文本。
- `timeout`：等待超时时间，单位为秒。默认值为10秒。
- `interval`：检查间隔时间，单位为秒。默认值为0.2秒。
- `confidence`：识别置信度。默认值为0.9。
- `*args`：额外的位置参数。
- `**kwargs`：额外的关键字参数。

`返回值`：
- `Box | None`：找到的文本位置，如果未找到则返回`None`。

#### wait_ocr_any
```python :no-line-numbers
def wait_ocr_any(self, texts: list[str], timeout: float = 10, interval: float = 0.2, confidence=0.9, *args,
                     **kwargs) -> tuple[int, Box | None]: ...
```
等待任意指定文本出现在窗口中，返回文本索引和位置

`参数`：
- `texts`：要等待的文本列表。
- `timeout`：等待超时时间，单位为秒。默认值为10秒。
- `interval`：检查间隔时间，单位为秒。默认值为0.2秒。
- `confidence`：识别置信度。默认值为0.9。
- `*args`：额外的位置参数。
- `**kwargs`：额外的关键字参数。

`返回值`：
- `tuple[int, Box | None]`：找到的文本索引和位置，如果未找到则返回-1和None。
                     
#### click_point
```python :no-line-numbers
@abstractmethod
def click_point(self, x: int | float, y: int | float, x_offset: int | float = 0, y_offset: int | float = 0,
                after_sleep: float = 0, tag: str = "") -> bool: ...
```
在游戏窗口区域内点击指定位置。

`参数`：
- `x`：点击位置的X坐标。
    - `int`：绝对坐标，单位为像素。
    - `float`：相对坐标，范围为0.0~1.0。
- `y`：点击位置的Y坐标。
    - `int`：绝对坐标，单位为像素。
    - `float`：相对坐标，范围为0.0~1.0。
- `x_offset`：点击位置的X偏移量，单位为像素。默认值为0。
- `y_offset`：点击位置的Y偏移量，单位为像素。默认值为0。
- `after_sleep`：点击后等待的时间，单位为秒。默认值为0。

`返回值`：
- `bool`：点击成功，返回`True`；点击失败，返回`False`

`异常`：
- `ValueError`：参数错误

#### click_box
```python :no-line-numbers
def click_box(self, box: Box,
                x_offset: int = 0, y_offset: int = 0,
                after_sleep: float = 0) -> bool: ...
```
点击Box区域中心
        
计算box中心点坐标并调用click_point方法进行点击
`参数`：
- `box` (Box): Box对象，表示要点击的区域
- `x_offset` (int | float, optional): x偏移量(px)或百分比(float)。默认值为0。
- `y_offset` (int | float, optional): y偏移量(px)或百分比(float)。默认值为0。
- `after_sleep` (float, optional): 点击后等待时间，单位秒。默认值为0。
`返回值`：
- `bool`: 点击成功返回True，否则返回False

#### click_img
```python :no-line-numbers
def click_img(self, template: str, x_offset: int | float = 0, y_offset: int | float = 0,
                  after_sleep: float = 0) -> bool: ...
```
查找图片并点击其中心位置
        
先调用locate方法查找图片位置，如果找到则调用click_box方法点击
`参数`：
- `template` (str): 模板图片路径
- `x_offset` (int | float, optional): x偏移量(px)或百分比(float)。默认值为0。
- `y_offset` (int | float, optional): y偏移量(px)或百分比(float)。默认值为0。
- `after_sleep` (float, optional): 点击后等待时间，单位秒。默认值为0。
`返回值`：
- `bool`: 点击成功返回True，否则返回False

#### wait_img
```python :no-line-numbers
def wait_img(self, template: str, timeout: int = 10, interval: float = 0.5) -> Box | None:
```
等待模板图片出现
        
`参数`：
- `template` (str): 模板图片路径
- `timeout` (int, optional): 超时时间，单位秒。默认值为10秒。
- `interval` (float, optional): 检查间隔时间，单位秒，默认为0.5秒。默认值为0.5秒。
`返回值`：
- `Box | None`: 找到的图片位置，如果未找到则返回None

#### wait_any_img
```python :no-line-numbers
def wait_any_img(self, templates: list[str], timeout: int = 10, interval: float = 0.2) -> tuple[int, Box | None]:
```
在游戏窗口区域内等待指定模板图像列表中的任意一个出现。

`参数`：
- `templates`：模板图像路径列表。
- `timeout`：等待超时时间，单位为秒。默认值为10秒。
- `interval`：每次查找间隔时间，单位为秒。默认值为0.2秒。

`返回值`：
- `int`：图像出现，返回找到的模板图像在列表中的索引；超时未出现，返回-1

#### press_key
```python :no-line-numbers
@staticmethod
def press_key(key: str, presses: int = 1, interval: float = 0, wait: float = 0) -> bool: ...    
```
模拟按下指定键。

`参数`：
- `key`：要按下的键名称
- `presses`：按下次数。默认值为1。
- `interval`：每次按下间隔时间，单位为秒。默认值为0秒。
- `wait`：首次按下前等待的时间，单位为秒。默认值为0秒。

`返回值`：
- `bool`：按键成功，返回`True`；按键失败，返回`False`

#### hold_key
```python :no-line-numbers
@staticmethod
def hold_key(key: str, duration: float = 0) -> bool: ...
```
模拟按住指定键一段时间。

`参数`：
- `key`：要按住的键名称
- `duration`：按住时间，单位为秒。默认值为0秒。

`返回值`：
- `bool`：按键成功，返回`True`；按键失败，返回`False`

#### sleep
```python :no-line-numbers
@staticmethod
def sleep(seconds: float) -> None: ...  
```
暂停程序执行一段时间。

`参数`：
- `seconds`：暂停时间，单位为秒。

`返回值`：
- `None`

#### copy
```python :no-line-numbers
@staticmethod   
def copy(text: str) -> Any: ...
```
将指定文本复制到系统剪贴板。

`参数`：
- `text`：要复制的文本。

#### paste
```python :no-line-numbers
@staticmethod
def paste() -> None: ...
```
模拟粘贴操作，将系统剪贴板中的文本粘贴到当前光标位置。

`参数`：
- 无

`返回值`：
- `None`

#### move_rel
```python :no-line-numbers
@abstractmethod
def move_rel(self, x_offset: int, y_offset: int) -> bool: ...
```
模拟鼠标相对移动。

`参数`：
- `x_offset`：鼠标在X轴上的移动偏移量，单位为像素。
- `y_offset`：鼠标在Y轴上的移动偏移量，单位为像素。

`返回值`：
- `bool`：移动成功，返回`True`；移动失败，返回`False`

#### move_to
```python :no-line-numbers
@abstractmethod
def move_to(self, x: int | float, y: int | float, duration: float = 0.0) -> bool: ...
```
模拟鼠标移动到指定位置。

`参数`：
- `x`：目标位置的X坐标。
    - `int`：绝对坐标，单位为像素。
    - `float`：相对坐标，范围为0.0~1.0。
- `y`：目标位置的Y坐标。
    - `int`：绝对坐标，单位为像素。
    - `float`：相对坐标，范围为0.0~1.0。
- `duration`：移动时间，单位为秒。默认值为0秒。

`返回值`：
- `bool`：移动成功，返回`True`；移动失败，返回`False`

#### mouse_down
```python :no-line-numbers
@abstractmethod
def mouse_down(self, x: int | float | None, y: int | float | None) -> bool:
```
模拟鼠标按键按下。

`参数`：
- `x`：鼠标点击位置的X坐标。
    - `int`：绝对坐标，单位为像素。
    - `float`：相对坐标，范围为0.0~1.0。
- `y`：鼠标点击位置的Y坐标。
    - `int`：绝对坐标，单位为像素。
    - `float`：相对坐标，范围为0.0~1.0。

`返回值`：
- `bool`：按下成功，返回`True`；按下失败，返回`False`

#### mouse_up
```python :no-line-numbers
@abstractmethod
def mouse_up(self, x: int | float | None, y: int | float | None) -> bool: ...
```
模拟鼠标按键释放。

`参数`：
- `x`：鼠标点击位置的X坐标。
    - `int`：绝对坐标，单位为像素。
    - `float`：相对坐标，范围为0.0~1.0。
- `y`：鼠标点击位置的Y坐标。
    - `int`：绝对坐标，单位为像素。
    - `float`：相对坐标，范围为0.0~1.0。

`返回值`：
- `bool`：释放成功，返回`True`；释放失败，返回`False`

#### scroll
```python :no-line-numbers
@staticmethod
def scroll(distance: int) -> bool: ...
```
模拟鼠标滚轮滚动。

`参数`：
- `distance`：滚动距离。正值表示向上滚动，负值表示向下滚动。

`返回值`：
- `bool`：滚动成功，返回`True`；滚动失败，返回`False`

#### drag_to
```python :no-line-numbers
@abstractmethod
def drag_to(self, from_x: int | float, from_y: int | float, to_x: int | float, to_y: int | float,
                duration: float = 0.5) -> bool:
```
模拟鼠标拖动到指定位置。

`参数`：
- `from_x` (int | float): 拖动开始位置的X坐标。
    - `int`：绝对坐标，单位为像素。
    - `float`：相对坐标，范围为0.0~1.0。
- `from_y` (int | float): 拖动开始位置的Y坐标。
    - `int`：绝对坐标，单位为像素。
    - `float`：相对坐标，范围为0.0~1.0。
- `to_x` (int | float): 拖动结束位置的X坐标。
    - `int`：绝对坐标，单位为像素。
    - `float`：相对坐标，范围为0.0~1.0。
- `to_y` (int | float): 拖动结束位置的Y坐标。
    - `int`：绝对坐标，单位为像素。
    - `float`：相对坐标，范围为0.0~1.0。
- `duration` (float): 拖动持续时间，单位为秒。默认值为0.5秒。
`返回值`：
- `bool`: 如果拖动成功则返回 True，否则返回 False。

#### do_while
```python :no-line-numbers
@staticmethod
def do_while(action: Callable[[], Any], condition: Callable[[], bool], interval: float = 0.1,
                 max_iterations: int = 50) -> bool:
```
重复执行操作，直到满足条件或达到最大迭代次数。

`参数`：
- `action`：要重复执行的操作函数。
- `condition`：判断是否继续执行的条件函数。
- `interval`：每次执行之间的间隔时间，单位为秒。默认值为0.1秒。
- `max_iterations`：最大迭代次数。默认值为50次。

`返回值`：
- `bool`：因不再满足条件而退出返回 True，达到最大迭代次数返回 False。

## model 模块
model 模块提供了与模型相关的功能，包括表示矩形区域的 Box 类和表示矩形区域的 Region 类。

## Box
```python :no-line-numbers
@dataclasses.dataclass
class SRACore.operators.model.Box
```
表示一个矩形区域，包含位置和尺寸信息。

例如，Box(0,0,0,0) 表示窗口左上角的一个点

### 属性
- `left` (int)：矩形左上角的X坐标。
- `top` (int)：矩形左上角的Y坐标。
- `width` (int)：矩形的宽度。
- `height` (int)：矩形的高度。
- `source` (str | None)：矩形的来源，用于标识矩形的来源。默认值为None。

### 方法
#### center
```python :no-line-numbers
@property
center() -> tuple[int, int]
```
计算并返回矩形的中心点坐标。

## Region
```python :no-line-numbers
@dataclasses.dataclass
class SRACore.operators.model.Region
```
表示一个矩形区域，包含位置和尺寸信息。

### 属性
- `left` (int)：矩形左上角的X坐标。
- `top` (int)：矩形左上角的Y坐标。
- `width` (int)：矩形的宽度。
- `height` (int)：矩形的高度。
- `parent` (Region | None)：矩形的父区域，用于表示矩形的嵌套关系。默认值为None。

### 方法
#### tuple
```python :no-line-numbers
@property
tuple() -> tuple[int, int, int, int]
```
将区域信息转换为元组形式，返回 (left, top, width, height)。

#### sub_region
```python :no-line-numbers
def sub_region(self, from_x: float, from_y: float, to_x: float, to_y: float) -> 'Region':
```
创建一个子区域，基于当前区域的位置和尺寸。

`参数`：
- `from_x` (float)：子区域左上角的X坐标，范围为0.0~1.0。
- `from_y` (float)：子区域左上角的Y坐标，范围为0.0~1.0。
- `to_x` (float)：子区域右下角的X坐标，范围为0.0~1.0。
- `to_y` (float)：子区域右下角的Y坐标，范围为0.0~1.0。

`返回值`：
- `Region`：新创建的子区域对象。

## Operator
```python :no-line-numbers
class SRACore.operators.ioperator.Operator(IOperator)
```
实现了操作游戏窗口的具体方法。基于PC端的窗口操作。

## SRACore.task 软件包

### task 模块
task 模块定义了任务系统的基类，所有任务类都应继承自 `BaseTask`

## Executable
```python :no-line-numbers
class SRACore.task.Executable
```
`Executable` 是一个基础类，为可执行对象提供操作符和设置访问。

### 属性
- `operator` (IOperator): 操作符实例，用于执行窗口操作。
- `settings` (dict): 应用程序设置项，从操作符的设置中加载。

## BaseTask
```python :no-line-numbers
class SRACore.task.BaseTask(Executable, ABC)
```
`BaseTask` 是所有任务类的抽象基类，定义了任务的基本结构和生命周期。

### 属性
- `operator` (IOperator): 操作符实例，用于执行窗口操作。
- `settings` (dict): 应用程序设置项，从操作符的设置中加载。
- `config` (dict): 任务配置字典。
- `stop_flag` (bool): 停止标志，用于控制任务执行。

### 方法

#### __init__
```python :no-line-numbers
def __init__(self, operator: IOperator, config: dict):
```
初始化任务实例。

`参数`：
- `operator` (IOperator): 操作符实例。
- `config` (dict): 任务配置字典。

#### _post_init
```python :no-line-numbers
def _post_init(self):
```
子类可重写此方法以进行额外初始化。

`注意`：
- 此方法在 `__init__` 方法末尾自动调用。
- 子类可以重写此方法来执行额外的初始化逻辑。

#### run
```python :no-line-numbers
@abstractmethod
def run(self):
```
执行任务的主要逻辑。

`注意`：
- 这是一个抽象方法，子类必须实现。
- 任务的具体执行逻辑应在此方法中实现。
- 应定期检查 `stop_flag` 以支持任务中断。

#### stop
```python :no-line-numbers
def stop(self):
```
停止任务执行。

`注意`：
- 设置 `stop_flag` 为 `True`。
- 子类的 `run` 方法应定期检查此标志并优雅地停止执行。

#### __str__
```python :no-line-numbers
def __str__(self):
```
返回任务的字符串表示。

`返回值`：
- `str`: 任务类的名称。

#### __repr__
```python :no-line-numbers
def __repr__(self):
```
返回任务的正式字符串表示。

`返回值`：
- `str`: 任务类的正式表示，格式为 `<ClassName>`。

### 使用示例

```python :no-line-numbers
from SRACore.task import BaseTask
from SRACore.operators import Operator

class MyTask(BaseTask):
    def _post_init(self):
        # 额外的初始化逻辑
        self.max_attempts = self.config.get('max_attempts', 10)
        self.attempts = 0
    
    def run(self):
        while not self.stop_flag and self.attempts < self.max_attempts:
            # 执行任务逻辑
            self.operator.press_key('space')
            self.operator.sleep(1)
            self.attempts += 1

# 使用示例
operator = Operator()
config = {'max_attempts': 5}
task = MyTask(operator, config)
task.run()
task.stop()
```

