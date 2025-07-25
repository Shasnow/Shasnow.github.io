---
title: API
order: 5
icon: box
---


# API

SRA（StarRailAssistant）是基于图像识别的自动化工具，其核心功能通过API接口实现。本文档详细介绍各模块API的功能、参数及返回值。


## 一、鼠标事件  
鼠标事件用于模拟真实鼠标操作，支持图像定位点击、坐标点击、光标移动及滚轮控制，核心实现位于 `SRACore.utils.SRAOperator.SRAOperator` 类。

### 1.1 click_img(img_path: str, title: str = "崩坏：星穹铁道", offset: tuple[int, int] = (0, 0))  
- **功能**：在指定窗口中定位目标图像并点击（支持偏移量调整）。  
- **原理**：通过 `locate()` 定位图像位置，计算实际屏幕坐标后调用 `pyautogui.click()` 点击。  
- **参数**：  
  - `img_path`：待点击图像的本地路径（如 `res/img/start_game.png`）。  
  - `title`：目标窗口标题（默认："崩坏：星穹铁道"）。  
  - `offset`：点击位置相对于图像中心的偏移量（格式：(x偏移, y偏移)）。  
- **返回值**：`bool`，成功点击返回 `True`，未找到图像或窗口异常返回 `False`。  
- **异常**：可能抛出 `MatchFailureException`（图像未匹配）、`WindowNoFoundException`（窗口未找到）。  
- **示例**：  
  ```python
  # 点击启动游戏按钮（米哈游启动器窗口）
  success = SRAOperator.click_img("res/img/start_game.png", title="米哈游启动器")
  ```

### 1.2 click_point(x: int, y: int, clicks: int = 1, interval: float = 0.1)  
- **功能**：在指定屏幕坐标处点击鼠标。  
- **参数**：  
  - `x`、`y`：目标坐标（基于屏幕绝对位置）。  
  - `clicks`：点击次数（默认1次）。  
  - `interval`：多次点击的间隔时间（秒，默认0.1秒）。  
- **返回值**：无。  
- **注意**：坐标需基于当前屏幕分辨率（推荐1920×1080），窗口遮挡或坐标超出屏幕可能导致点击失败。

### 1.3 moveTo(x: int, y: int, duration: float = 0.2)  
- **功能**：平滑移动光标到指定坐标。  
- **参数**：  
  - `x`、`y`：目标坐标。  
  - `duration`：移动耗时（秒，默认0.2秒）。  
- **返回值**：无。  

### 1.4 moveRel(x_offset: int, y_offset: int, duration: float = 0.2)  
- **功能**：相对于当前光标位置移动。  
- **参数**：  
  - `x_offset`、`y_offset`：横向/纵向偏移量（正数向右/下，负数向左/上）。  
  - `duration`：移动耗时（秒，默认0.2秒）。  
- **返回值**：无。  

### 1.5 scroll(delta: int)  
- **功能**：模拟鼠标滚轮滚动。  
- **参数**：  
  - `delta`：滚动量（正数向上滚，负数向下滚）。  
- **返回值**：无。  


## 二、键盘事件  
键盘事件用于模拟键盘输入及组合键操作，核心实现位于 `SRACore.utils.SRAOperator.SRAOperator` 类。

### 2.1 press_key(key: str, presses: int = 1, interval: float = 0.1)  
- **功能**：模拟按键按下并释放（支持单个按键或组合键，如 `ctrl+c`）。  
- **参数**：  
  - `key`：按键名称（如 `'enter'`、`'ctrl+a'`）。  
  - `presses`：按键次数（默认1次）。  
  - `interval`：多次按键的间隔时间（秒，默认0.1秒）。  
- **返回值**：无。  
- **示例**：  
  ```python
  # 按下Enter键
  SRAOperator.press_key("enter")
  ```

### 2.2 press_key_for_a_while(key: str, duration: float = 1.0)  
- **功能**：按住按键持续一段时间后释放。  
- **参数**：  
  - `key`：按键名称（如 `'shift'`）。  
  - `duration`：按住时间（秒，默认1秒）。  
- **返回值**：无。  

### 2.3 copy(text: str)  
- **功能**：将指定文本复制到系统剪贴板。  
- **参数**：  
  - `text`：待复制的文本内容。  
- **返回值**：无。  
- **依赖**：基于 `pyperclip` 实现，需确保系统剪贴板服务正常。

### 2.4 paste()  
- **功能**：将剪贴板内容粘贴到当前焦点位置。  
- **返回值**：无。  

### 2.5 write(text: str, interval: float = 0.05)  
- **功能**：模拟逐字符输入文本（支持中文需输入法配合）。  
- **参数**：  
  - `text`：待输入的文本。  
  - `interval`：字符输入间隔（秒，默认0.05秒）。  
- **返回值**：无。  


## 三、画面检测  
画面检测是SRA的核心能力，通过图像识别定位游戏内元素，核心实现位于 `SRACore.utils.SRAOperator.SRAOperator` 类。

### 3.0 reset()  
- **功能**：重置截图区域的偏移量和缩放比例为默认值。  
- **参数**：无。  
- **返回值**：无。  

### 3.1 get_screenshot_region(title: str) -> tuple[int, int, int, int]  
- **功能**：根据窗口标题获取截图区域并计算实际坐标。  
- **参数**：  
  - `title`：目标窗口标题。  
- **返回值**：截图区域元组 `(area_left, area_top, area_width, area_height)`。  
- **异常**：`WindowNoFoundException`（窗口未找到）。

### 3.2 get_screenshot(title: str = "崩坏：星穹铁道", region: tuple[int, int, int, int] | None = None) -> Image.Image  
- **功能**：获取指定窗口的截图并调整尺寸（适配1920×1080分辨率）。  
- **参数**：  
  - `title`：窗口标题（默认："崩坏：星穹铁道"）。  
  - `region`：截图区域（格式：`(left, top, width, height)`，默认自动计算窗口区域）。  
- **返回值**：`PIL.Image.Image` 对象（调整后的截图）。  
- **注意**：若窗口未激活或分辨率非1920×1080，可能导致截图比例异常。

### 3.3 locate(img_path: str, title: str = "崩坏：星穹铁道") -> tuple[int, int, int, int] | None  
- **功能**：在目标窗口截图中定位指定图像的位置。  
- **原理**：使用 `pyscreeze.locate` 进行模板匹配，匹配置信度由 `SRAOperator.confidence` 控制（默认0.9）。  
- **参数**：  
  - `img_path`：待定位图像的本地路径。  
  - `title`：目标窗口标题（默认："崩坏：星穹铁道"）。  
- **返回值**：匹配区域的坐标及尺寸（格式：`(left, top, width, height)`），未找到返回 `None`。  
- **异常**：  
  - `FileNotFoundError`：图像文件无法读取。  
  - `MatchFailureException`：图像未匹配。  
  - `WindowInactiveException`：窗口未激活。

### 3.4 locateCenter(img_path: str, offset: tuple[int, int] = (0, 0), title: str = "崩坏：星穹铁道") -> tuple[int, int]  
- **功能**：定位图像中心坐标（支持偏移调整）。  
- **参数**：  
  - `img_path`：待定位图像的本地路径。  
  - `offset`：中心坐标的偏移量（格式：`(x偏移, y偏移)`，默认无偏移）。  
  - `title`：目标窗口标题（默认："崩坏：星穹铁道"）。  
- **返回值**：实际屏幕坐标（格式：`(x, y)`）。  
- **示例**：  
  ```python
  # 定位"开始游戏"按钮中心（偏移10像素向下）
  x, y = SRAOperator.locateCenter("res/img/start_game.png", offset=(0, 10))
  ```

### 3.5 locateAny(img_list: list[str], title: str = "崩坏：星穹铁道", trace: bool = True) -> tuple[int, tuple[int, int, int, int]]  
- **功能**：依次检测图像列表，返回第一个匹配的图像索引及位置。  
- **参数**：  
  - `img_list`：待检测的图像路径列表（如 `["res/a.png", "res/b.png"]`）。  
  - `title`：目标窗口标题（默认："崩坏：星穹铁道"）。  
  - `trace`：是否记录追踪日志（默认 `True`）。  
- **返回值**：`(匹配索引, 位置元组)`，无匹配抛出 `MatchFailureException`。  

### 3.6 exist(img_path: str | PathLike, wait_time: float = 2.0) -> bool  
- **功能**：检查指定图像是否存在于当前窗口。  
- **参数**：  
  - `img_path`：待检测图像的本地路径。  
  - `wait_time`：等待检测的时间（秒，默认2.0秒）。  
- **返回值**：存在返回 `True`，否则 `False`。

### 3.7 check(img_path: str, interval: float = 0.5, max_time: float = 20.0) -> bool  
- **功能**：按间隔持续检测图像，直到出现或超时。  
- **参数**：  
  - `img_path`：待检测图像的本地路径。  
  - `interval`：检测间隔（秒，默认0.5秒）。  
  - `max_time`：最大检测时间（秒，默认20秒）。  
- **返回值**：检测到图像返回 `True`，超时返回 `False`。  
- **示例**：  
  ```python
  # 最多等待10秒检测登录成功界面
  is_login = SRAOperator.check("res/img/welcome.png", max_time=10)
  ```

### 3.8 _screenshot_region_calculate(region: tuple[int, int, int, int]) -> tuple[int, int, int, int]  
- **功能**：内部方法，计算截图区域的实际坐标和尺寸。  
- **参数**：  
  - `region`：窗口区域元组 `(left, top, width, height)`。  
- **返回值**：计算后的截图区域元组。  

### 3.9 _image_resize(pillow_image: Image.Image) -> Image.Image  
- **功能**：调整图像尺寸到1920宽度并保持宽高比。  
- **参数**：  
  - `pillow_image`：待调整的Pillow图像对象。  
- **返回值**：调整后的图像对象。

### 3.10 _location_calculator(x: int, y: int) -> tuple[int, int]  
- **功能**：根据缩放比例和偏移量计算实际屏幕坐标。  
- **参数**：  
  - `x`、`y`：截图上的坐标。  
- **返回值**：实际屏幕坐标元组。  


## 四、电源操作  
电源操作用于控制计算机的关机、休眠等行为，实现位于 `SRACore.utils.WindowsPower` 模块。

### 4.1 schedule_shutdown(delay_in_seconds: int)  
- **功能**：设置Windows延时关机。  
- **参数**：  
  - `delay_in_seconds`：延时秒数（需大于0）。  
- **异常**：`subprocess.CalledProcessError`（命令执行失败）。  
- **示例**：  
  ```python
  # 30分钟后关机（1800秒）
  WindowsPower.schedule_shutdown(1800)
  ```

### 4.2 shutdown_cancel()  
- **功能**：取消已设置的关机任务。  
- **返回值**：无。  

### 4.3 hibernate()  
- **功能**：使计算机进入休眠状态（需系统支持）。  
- **返回值**：无。  


## 五、进程操作  
进程操作用于管理游戏及相关进程，实现位于 `SRACore.utils.WindowsProcess` 模块。  

### 5.1 find_window(title: str) -> int | None  
- **功能**：基于窗口标题查找窗口句柄。  
- **参数**：  
  - `title`：窗口标题（如 "崩坏：星穹铁道"）。  
- **返回值**：窗口句柄（整数），未找到返回 `None`。  

### 5.2 check_window(title: str) -> bool  
- **功能**：检查窗口是否存在并激活。  
- **参数**：同 `find_window()`。  
- **返回值**：窗口存在且激活返回 `True`，否则 `False`。  

### 5.3 is_process_running(process_name: str) -> bool  
- **功能**：检查指定进程是否运行。  
- **参数**：  
  - `process_name`：进程名（如 "StarRail.exe"）。  
- **返回值**：运行中返回 `True`，否则 `False`。

### 5.4 task_kill(process_name: str)  
- **功能**：强制关闭指定进程。  
- **参数**：  
  - `process_name`：进程名（如 "HYP.exe"）。  
- **异常**：`subprocess.CalledProcessError`（命令执行失败）。  

### 5.5 Popen(path: str, shell: bool = False) -> bool  
- **功能**：非阻塞方式启动程序。  
- **参数**：  
  - `path`：程序路径（如 "D:/StarRail/StarRail.exe"）。  
  - `shell`：是否通过Shell执行（默认 `False`）。  
- **返回值**：启动成功返回 `True`，否则 `False`。

### 5.6 is_window_active(window_title) -> bool:
- **功能**：检查指定窗口是否处于活动状态。
- **参数**：
  - `window_title`：窗口标题。
- **返回值**：窗口处于活动状态返回 `True`，否则 `False`。


## 六、配置操作  
配置操作用于管理工具的自定义配置（如任务开关、路径设置），实现位于 `SRACore.utils.Configure` 模块。

### 6.1 init()  
- **功能**：初始化配置系统（创建默认配置文件）。  
- **说明**：首次运行时调用，生成 `data/globals.json` 全局配置。

### 6.2 load(path: str) -> dict  
- **功能**：从JSON文件加载配置。  
- **参数**：  
  - `path`：配置文件路径（如 "data/globals.json"）。  
- **返回值**：配置字典。

### 6.3 save(config: dict, path: str)  
- **功能**：将配置字典保存到JSON文件。  
- **参数**：  
  - `config`：配置字典。  
  - `path`：目标文件路径。  


## 七、日志操作  
日志操作用于记录工具运行状态，便于调试与问题排查，核心对象为 `SRACore.utils.Logger.logger` 。  

### 7.1 info(text: str)  
- **功能**：记录普通信息（如任务启动、成功提示）。  
- **示例**：  
  ```python
  logger.info("登录成功，开始执行日常任务")
  ```
  
### 7.2 warning(text: str)  
- **功能**：记录警告信息（如配置缺失、操作超时）。  

### 7.3 error(text: str)  
- **功能**：记录错误信息（如关键任务失败、异常捕获）。  

### 7.4 debug(text: str)  
- **功能**：记录调试信息（仅在开发模式下输出）。  


## 八、对话框  
对话框用于与用户交互（如输入、提示），实现位于 `SRACore.utils.Dialog` 模块，基于PySide6的 `QDialog` 封装。  

### 8.1 MessageBox
- **功能**：显示消息提示框（含确定按钮）。  
- **参数**：  
  - `parent`：父窗口对象。  
  - `title`：对话框标题。  
  - `message`：提示内容。  
- **静态方法**：  
  - `MessageBox.info(parent: QWidget | None, title: str, text: str)`：显示信息提示框。

### 8.2 InputDialog
- **功能**：显示输入框（获取用户输入）。  
- **静态方法**：  
  - `InputDialog.getText(parent: QWidget, title: str, text: str) -> tuple[str, bool]`：显示输入对话框。
    - **参数**： 
      - `parent`：父窗口对象。
      - `title`：对话框标题。
      - `text`：提示文本。
    - **返回值**：元组 `(输入文本, 是否确认)`，用户点击确定返回输入文本，否则返回空字符串和 `False`。

### 8.3 ExceptionMessageBox
- **功能**：显示异常信息对话框。
- **参数**：
  - `exception`：异常类型（如ZeroDivisionError）。
  - `value`：异常值（如 ‘1/0’）。
  - `traceback`：异常追踪信息。