---
title: PySide6基础教程
order: 3
icon: code
---

# PySide6
PySide6是一个Python绑定库，用于创建和管理基于Qt的用户界面。它提供了一组Python类和函数，使开发人员能够使用Python语言来创建和操作Qt应用程序的用户界面。

SRA使用PySide6作为GUI界面。

此教程将以初学者角度讲解PySide6的基础使用，并重点介绍Qt Designer的应用。

## 基础
PySide6 是 Qt 框架的 Python 绑定，用于创建跨平台的 GUI 应用程序。

### 窗口与组件
PySide6 提供了多种 GUI 组件，如按钮、文本框、标签等，可以组合创建复杂的用户界面。

```python
import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        
        self.setWindowTitle("My App")
        
        button = QPushButton("Click Me!")
        button.clicked.connect(self.button_clicked)
        
        self.setCentralWidget(button)
    
    def button_clicked(self):
        print("Button was clicked!")

app = QApplication(sys.argv)
window = MainWindow()
window.show()
app.exec()
```

PySide6应用程序的基本结构包含三个主要部分：
1. QApplication对象管理整个应用程序的生命周期和控制流
2. QMainWindow作为主窗口提供基本的窗口框架
3. 信号与槽机制用于处理用户交互和组件通信

### 布局管理
PySide6 提供了多种布局管理器来组织窗口中的组件。

```python
from PySide6.QtWidgets import QVBoxLayout, QWidget, QLabel

class MyWindow(QWidget):
    def __init__(self):
        super().__init__()
        
        layout = QVBoxLayout()
        
        label1 = QLabel("Label 1")
        label2 = QLabel("Label 2")
        
        layout.addWidget(label1)
        layout.addWidget(label2)
        
        self.setLayout(layout)
```

PySide6提供了多种布局管理器来组织界面元素：
- QVBoxLayout将组件按垂直方向排列
- QHBoxLayout将组件按水平方向排列
- QGridLayout以网格形式排列组件，适合复杂布局

## Qt Designer

## Qt Designer 详细教程

### 1. Qt Designer简介
Qt Designer是Qt官方提供的可视化界面设计工具，它允许开发者通过拖放组件的方式快速构建GUI界面，而无需手动编写大量布局代码。使用Qt Designer可以显著提高开发效率，特别适合初学者快速上手。

### 2. 安装与启动
安装PySide6时会自动包含Qt Designer工具。启动方式如下：

```bash
# 启动Qt Designer
pyside6-designer
```

### 3. 界面设计基础
1. **选择模板**：
   - 启动后首先选择窗口类型，常用选项有：
     - MainWindow：带菜单栏、工具栏的主窗口
     - Widget：通用空白窗口
     - Dialog：对话框窗口

2. **添加组件**：
   - 从左侧组件面板拖拽所需组件到设计区域
   - 常用组件包括：
     - Buttons：按钮类组件
     - Input Widgets：输入类组件
     - Display Widgets：显示类组件
     - Layouts：布局管理器

3. **属性设置**：
   - 选中组件后，在右侧属性编辑器中调整属性
   - 重要属性包括：
     - objectName：组件对象名称（在代码中引用）
     - geometry：位置和大小
     - text：显示文本
     - styleSheet：CSS样式

4. **布局管理**：
   - 使用布局管理器（如垂直、水平、网格布局）组织组件
   - 右键点击窗口/容器 → 布局 → 选择布局类型

5. **信号与槽**：
   - 点击工具栏的"编辑信号/槽"按钮
   - 拖动组件到空白处设置交互
   - 例如：按钮点击事件连接到槽函数

6. **保存设计**：
   - 文件 → 保存（.ui格式）
   - .ui文件是XML格式的界面描述文件

### 在Python中使用.ui文件
有两种主要方法可以在PySide6应用程序中使用.ui文件：

### 4. 在Python中使用Qt Designer设计的界面

PySide6提供了两种方式加载.ui文件，各有优缺点：

#### 方法1：动态加载（推荐）
```python
import sys
from PySide6.QtWidgets import QApplication
from PySide6.QtUiTools import QUiLoader  # 用于动态加载.ui文件
from PySide6.QtCore import QFile  # 用于文件操作

# 1. 创建应用程序对象
app = QApplication(sys.argv)

# 2. 加载.ui文件
ui_file = QFile("mainwindow.ui")  # 指定.ui文件路径
if not ui_file.open(QFile.ReadOnly):  # 以只读方式打开文件
    print("无法打开.ui文件")
    sys.exit(1)

# 3. 使用QUiLoader加载界面
loader = QUiLoader()
window = loader.load(ui_file)  # 加载界面
ui_file.close()  # 关闭文件

if not window:  # 检查是否加载成功
    print(loader.errorString())
    sys.exit(1)

# 4. 显示窗口并启动事件循环
window.show()
sys.exit(app.exec())  # 启动应用程序
```

**优点**：
- 无需预编译.ui文件
- 修改界面后无需重新生成代码
- 适合快速原型开发

#### 方法2：预编译为Python代码

1. 首先将.ui文件转换为Python代码：
```bash
# 将mainwindow.ui转换为ui_mainwindow.py
pyside6-uic mainwindow.ui -o ui_mainwindow.py
```

2. 在程序中使用生成的界面类：
```python
import sys
from PySide6.QtWidgets import QApplication, QMainWindow
from ui_mainwindow import Ui_MainWindow  # 导入生成的界面类

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        
        # 1. 创建界面实例
        self.ui = Ui_MainWindow()
        
        # 2. 设置界面（自动创建所有组件）
        self.ui.setupUi(self)
        
        # 3. 添加业务逻辑
        # 通过self.ui访问界面组件，如按钮、文本框等
        self.ui.pushButton.clicked.connect(self.on_button_click)
    
    def on_button_click(self):
        """按钮点击事件处理函数"""
        print("按钮被点击了!")
        self.ui.label.setText("Hello PySide6!")

# 应用程序入口
if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())  # 启动事件循环
```

**优点**：
- 代码更直观，可直接查看界面结构
- 类型检查和代码补全更好
- 适合大型项目

### 自定义组件与Qt Designer集成
您可以将自定义组件集成到Qt Designer中，使其可以在设计界面时使用：

1. 创建自定义组件类
2. 创建一个插件类，继承自QPyDesignerCustomWidgetCollection
3. 设置环境变量PYSIDE_DESIGNER_PLUGINS指向插件目录

```python
# customwidget.py
from PySide6.QtWidgets import QPushButton

class CustomButton(QPushButton):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setStyleSheet("background-color: #4CAF50; color: white;")

# customplugin.py
from PySide6.QtDesigner import QPyDesignerCustomWidgetCollection
from customwidget import CustomButton

# 注册自定义组件
QPyDesignerCustomWidgetCollection.addCustomWidget(CustomButton)
```

## 进阶

### 5. 信号与槽机制详解

信号与槽是PySide6中组件间通信的核心机制，采用发布-订阅模式：

```python
from PySide6.QtCore import Signal, QObject  # 导入信号相关类

# 1. 定义信号发布者
class Communicate(QObject):
    # 声明一个信号，参数类型为str
    speak = Signal(str)  # 相当于定义了一个可以发送字符串的事件

# 2. 定义信号接收者
class Speaker(QObject):
    def __init__(self):
        super().__init__()
        
    # 槽函数 - 接收信号的处理方法
    def say(self, message):
        print(f"收到消息: {message}")

# 3. 创建对象实例
com = Communicate()  # 信号发送者
speaker = Speaker()  # 信号接收者

# 4. 建立信号与槽的连接
com.speak.connect(speaker.say)  # 将speak信号连接到say槽

# 5. 触发信号
com.speak.emit("Hello PySide6!")  # 发射信号，自动调用连接的槽函数
```

**关键点说明：**
1. **信号(Signal)**：
   - 必须继承自QObject的类才能定义信号
   - 使用`Signal(类型)`声明，支持多种参数类型
   - 信号本身不包含实现逻辑，只负责通知

2. **槽(Slot)**：
   - 可以是任何Python可调用对象（方法、函数等）
   - 参数类型必须与信号匹配
   - 一个信号可以连接多个槽，一个槽也可以接收多个信号

3. **连接与发射**：
   - `connect()`建立信号与槽的关联
   - `emit()`触发信号并传递参数
   - 连接可以随时用`disconnect()`断开

### 6. 创建自定义组件

通过继承现有组件并添加自定义功能，可以创建可重用的UI组件：

```python
from PySide6.QtWidgets import QPushButton

class CustomButton(QPushButton):
    """
    自定义按钮组件，继承自QPushButton
    特点：
    - 预设绿色主题样式
    - 可直接在构造函数设置文本
    """
    def __init__(self, text):
        super().__init__(text)  # 调用父类构造函数初始化
        
        # 设置按钮样式表(QSS语法)
        self.setStyleSheet("""
            /* 按钮默认状态样式 */
            QPushButton {
                background-color: #4CAF50;  /* 绿色背景 */
                border: none;              /* 无边框 */
                color: white;              /* 白色文字 */
                padding: 15px 32px;        /* 内边距 */
                text-align: center;        /* 文字居中 */
                font-size: 16px;           /* 字体大小 */
                border-radius: 8px;        /* 圆角 */
            }
            
            /* 按钮悬停状态样式 */
            QPushButton:hover {
                background-color: #45a049;
            }
            
            /* 按钮按下状态样式 */
            QPushButton:pressed {
                background-color: #3e8e41;
            }
        """)
        
        # 设置固定大小策略
        self.setSizePolicy(
            QSizePolicy.Preferred,  # 水平策略
            QSizePolicy.Fixed       # 垂直固定高度
        )

# 使用示例
button = CustomButton("点击我")
button.show()
```

**自定义组件最佳实践：**
1. **继承选择**：
   - 从最接近需求的现有组件继承
   - 常用基类：QWidget、QFrame、QPushButton等

2. **样式控制**：
   - 使用Qt样式表(QSS)定制外观
   - 支持状态伪类(:hover, :pressed等)
   - 保持样式与业务逻辑分离

3. **功能扩展**：
   - 添加自定义方法和属性
   - 重写事件处理函数(如mousePressEvent)
   - 定义新信号用于组件间通信

### 7. 事件处理机制

PySide6的事件系统处理所有用户交互和系统事件，采用事件循环机制：

```python
import sys
from PySide6.QtWidgets import QApplication, QWidget, QPushButton
from PySide6.QtCore import Qt  # 导入Qt键值常量

class EventHandlingWindow(QWidget):
    """
    事件处理演示窗口
    展示：
    - 按钮点击事件(信号与槽)
    - 键盘事件处理
    """
    def __init__(self):
        super().__init__()
        
        # 窗口基本设置
        self.setWindowTitle("事件处理演示")
        self.setGeometry(100, 100, 300, 200)  # x,y,width,height

        # 创建按钮并连接信号
        button = QPushButton("点击我", self)
        button.move(100, 80)  # 设置按钮位置
        button.clicked.connect(self.on_button_click)  # 连接点击信号

    def on_button_click(self):
        """按钮点击事件处理函数"""
        print("按钮被点击!")

    def keyPressEvent(self, event):
        """键盘事件处理函数"""
        if event.key() == Qt.Key_Escape:  # ESC键
            self.close()  # 关闭窗口
        else:
            # 打印按键信息
            print(f"按键: {event.text()} (Key code: {event.key()})")

# 应用程序入口
if __name__ == "__main__":
    app = QApplication(sys.argv)  # 创建应用实例
    window = EventHandlingWindow()  # 创建窗口实例
    window.show()  # 显示窗口
    sys.exit(app.exec())  # 启动事件循环
```

**事件处理要点：**
1. **事件循环**：
   - `app.exec()`启动主事件循环
   - 持续监听和分发事件(鼠标、键盘、定时器等)

2. **事件类型**：
   - 鼠标事件：`mousePressEvent`, `mouseMoveEvent`等
   - 键盘事件：`keyPressEvent`, `keyReleaseEvent`
   - 窗口事件：`closeEvent`, `resizeEvent`等

3. **事件处理流程**：
   - 事件首先发送到目标组件
   - 如果未处理，会传递给父组件
   - 可通过`event.accept()`或`event.ignore()`控制事件传播

### 8. 对话框使用指南

PySide6提供多种标准对话框，用于用户交互：

```python
import sys
from PySide6.QtWidgets import (QApplication, QMainWindow, QPushButton, 
                              QMessageBox, QInputDialog, QVBoxLayout, QWidget)

class DialogDemoWindow(QMainWindow):
    """
    对话框演示窗口
    展示：
    - 信息提示框(QMessageBox)
    - 输入对话框(QInputDialog)
    """
    def __init__(self):
        super().__init__()
        self.setWindowTitle("对话框演示")
        self.setGeometry(100, 100, 400, 300)
        
        # 使用布局管理器
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)
        
        # 信息提示框按钮
        btn_msg = QPushButton("显示消息框")
        btn_msg.clicked.connect(self.show_message_box)
        layout.addWidget(btn_msg)
        
        # 输入对话框按钮
        btn_input = QPushButton("显示输入框")
        btn_input.clicked.connect(self.show_input_dialog)
        layout.addWidget(btn_input)

    def show_message_box(self):
        """显示标准信息提示框"""
        # 参数：父窗口, 标题, 消息内容
        QMessageBox.information(
            self, 
            "提示", 
            "这是一个信息提示框\n支持多行文本显示"
        )

    def show_input_dialog(self):
        """显示文本输入对话框"""
        text, ok = QInputDialog.getText(
            self, 
            "输入对话框", 
            "请输入您的名字:",
            echo=QLineEdit.Normal  # 正常显示输入
        )
        
        if ok and text:  # 用户点击OK且有输入内容
            QMessageBox.information(
                self, 
                "欢迎", 
                f"您好, {text}!"
            )

# 应用程序入口
if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = DialogDemoWindow()
    window.show()
    sys.exit(app.exec())
```

**对话框类型及用途：**
1. **QMessageBox**：
   - `.information()` 信息提示
   - `.warning()` 警告提示
   - `.critical()` 错误提示
   - `.question()` 确认对话框

2. **QInputDialog**：
   - `.getText()` 获取文本
   - `.getInt()` 获取整数
   - `.getDouble()` 获取浮点数
   - `.getItem()` 选择列表项

3. **模态特性**：
   - 模态对话框会阻塞父窗口
   - 非模态对话框允许同时操作父窗口
   - 使用`setModal(True)`设置模态

### 文件操作
在 PySide6 应用程序中进行文件操作，通常会结合 `QFileDialog` 来选择文件路径。

```python
# 文件操作示例：创建一个简单的文本编辑器，支持打开和保存文件
import sys
from PySide6.QtWidgets import (QApplication, QMainWindow, QPushButton, 
                              QTextEdit, QVBoxLayout, QWidget, QFileDialog,
                              QMessageBox)

class FileOperationWindow(QMainWindow):
    """
    文件操作演示窗口类
    功能：
    - 打开文本文件并显示内容
    - 编辑文本内容并保存到文件
    """
    def __init__(self):
        super().__init__()
        # 初始化窗口属性
        self.setWindowTitle("文件操作演示")
        self.setGeometry(100, 100, 500, 400)

        # 创建中心部件和布局
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)

        # 创建文本编辑区域
        self.text_edit = QTextEdit()
        layout.addWidget(self.text_edit)

        # 创建打开文件按钮
        btn_open = QPushButton("打开文件")
        btn_open.clicked.connect(self.open_file)  # 连接点击信号到槽函数
        layout.addWidget(btn_open)

        # 创建保存文件按钮
        btn_save = QPushButton("保存文件")
        btn_save.clicked.connect(self.save_file)  # 连接点击信号到槽函数
        layout.addWidget(btn_save)

    def open_file(self):
        """打开文件并读取内容到文本编辑器"""
        # 显示文件打开对话框，限制文件类型为文本文件
        file_name, _ = QFileDialog.getOpenFileName(
            self, "打开文件", "", "文本文件 (*.txt);;所有文件 (*)")
        
        if file_name:  # 如果用户选择了文件
            try:
                # 使用utf-8编码打开文件并读取内容
                with open(file_name, 'r', encoding='utf-8') as f:
                    content = f.read()
                    self.text_edit.setText(content)  # 显示文件内容
            except Exception as e:
                # 捕获并显示文件打开错误
                QMessageBox.critical(self, "错误", f"无法打开文件: {e}")

    def save_file(self):
        """将文本编辑器内容保存到文件"""
        # 显示文件保存对话框
        file_name, _ = QFileDialog.getSaveFileName(
            self, "保存文件", "", "文本文件 (*.txt);;所有文件 (*)")
        
        if file_name:  # 如果用户指定了保存路径
            try:
                # 使用utf-8编码写入文件
                with open(file_name, 'w', encoding='utf-8') as f:
                    f.write(self.text_edit.toPlainText())  # 获取纯文本内容并保存
            except Exception as e:
                # 捕获并显示文件保存错误
                QMessageBox.critical(self, "错误", f"无法保存文件: {e}")

# 创建并运行应用程序
if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = FileOperationWindow()
    window.show()
    app.exec()
```

## 文件操作详解

PySide6 提供了 `QFileDialog` 类来处理文件选择操作，这是 GUI 应用中常见的功能。下面详细介绍文件操作的关键点：

1. **文件对话框类型**
   - `getOpenFileName()`: 用于选择要打开的文件
   - `getSaveFileName()`: 用于选择要保存的文件路径
   - `getExistingDirectory()`: 用于选择目录

2. **文件过滤器**
   可以通过字符串参数指定文件类型过滤器，例如：
   - `"Text Files (*.txt)"`: 只显示.txt文件
   - `"All Files (*)"`: 显示所有文件
   - 多个过滤器用`;;`分隔

3. **安全文件操作**
   使用Python的`with`语句可以确保文件正确关闭，即使在发生异常的情况下。

### 多线程
在 GUI 应用程序中，长时间运行的任务应该在单独的线程中执行，以避免阻塞主线程，保持界面响应。

```python
# 多线程示例：演示如何在GUI应用中使用工作线程
import sys
import time
from PySide6.QtWidgets import (QApplication, QMainWindow, QPushButton, 
                              QLabel, QVBoxLayout, QWidget)
from PySide6.QtCore import QThread, Signal

class Worker(QThread):
    """
    工作线程类
    功能：在后台执行耗时任务，完成后通过信号通知主线程
    """
    # 定义信号
    progress_updated = Signal(int)  # 进度更新信号
    finished = Signal(str)         # 任务完成信号
    error_occurred = Signal(str)   # 错误发生信号

    def run(self):
        """线程执行的主方法"""
        try:
            # 模拟耗时操作（如网络请求、复杂计算等）
            for i in range(1, 101):
                time.sleep(0.05)  # 模拟工作进度
                self.progress_updated.emit(i)  # 发送进度更新信号
            
            # 任务完成后发出信号，传递完成消息
            self.finished.emit("任务成功完成!")
        except Exception as e:
            # 捕获异常并通过信号通知主线程
            self.error_occurred.emit(f"任务失败: {str(e)}")

class MultiThreadingDemo(QMainWindow):
    """
    多线程演示窗口类
    功能：
    - 启动后台任务
    - 显示任务状态和进度
    - 处理任务完成和错误通知
    """
    def __init__(self):
        super().__init__()
        # 初始化窗口属性
        self.setWindowTitle("多线程演示")
        self.setGeometry(100, 100, 400, 250)

        # 创建中心部件和布局
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)

        # 创建状态标签
        self.status_label = QLabel("准备就绪")
        layout.addWidget(self.status_label)

        # 创建进度标签
        self.progress_label = QLabel("进度: 0%")
        layout.addWidget(self.progress_label)

        # 创建启动任务按钮
        btn_start = QPushButton("开始长时间任务")
        btn_start.clicked.connect(self.start_long_task)  # 连接按钮点击信号
        layout.addWidget(btn_start)

        # 创建停止任务按钮
        btn_stop = QPushButton("停止任务")
        btn_stop.clicked.connect(self.stop_long_task)  # 连接按钮点击信号
        btn_stop.setEnabled(False)  # 初始不可用
        layout.addWidget(btn_stop)

        # 线程状态标志
        self.is_running = False

    def start_long_task(self):
        """启动后台任务"""
        if self.is_running:
            return
            
        self.is_running = True
        self.status_label.setText("任务运行中...")
        self.findChild(QPushButton, "开始长时间任务").setEnabled(False)
        self.findChild(QPushButton, "停止任务").setEnabled(True)
        
        # 创建工作线程实例
        self.worker_thread = Worker()
        # 连接各种信号到处理函数
        self.worker_thread.progress_updated.connect(self.update_progress)
        self.worker_thread.finished.connect(self.on_task_finished)
        self.worker_thread.error_occurred.connect(self.on_task_error)
        # 启动线程
        self.worker_thread.start()

    def stop_long_task(self):
        """停止后台任务"""
        if not self.is_running:
            return
            
        self.worker_thread.terminate()  # 终止线程
        self.worker_thread.wait()       # 等待线程结束
        self.status_label.setText("任务已停止")
        self.is_running = False
        self.findChild(QPushButton, "开始长时间任务").setEnabled(True)
        self.findChild(QPushButton, "停止任务").setEnabled(False)

    def update_progress(self, value):
        """更新进度显示"""
        self.progress_label.setText(f"进度: {value}%")

    def on_task_finished(self, message):
        """任务完成处理函数"""
        self.status_label.setText(message)
        self.progress_label.setText("进度: 100%")
        self.is_running = False
        self.findChild(QPushButton, "开始长时间任务").setEnabled(True)
        self.findChild(QPushButton, "停止任务").setEnabled(False)
        self.worker_thread.deleteLater()  # 安全释放线程资源

    def on_task_error(self, error_msg):
        """任务错误处理函数"""
        self.status_label.setText(error_msg)
        self.is_running = False
        self.findChild(QPushButton, "开始长时间任务").setEnabled(True)
        self.findChild(QPushButton, "停止任务").setEnabled(False)
        self.worker_thread.deleteLater()  # 安全释放线程资源

# 创建并运行应用程序
if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MultiThreadingDemo()
    window.show()
    app.exec()
```

## 多线程编程指南

在GUI应用中，长时间运行的任务必须放在单独的线程中执行，以避免界面冻结。PySide6使用`QThread`和`Signal`机制实现线程间通信。

### 关键注意事项

1. **线程安全**
   - GUI操作只能在主线程执行
   - 工作线程不能直接操作UI组件
   - 通过Signal/Slot机制进行跨线程通信

2. **线程生命周期**
   - 使用`start()`方法启动线程
   - `finished`信号在线程结束时发出
   - 确保线程对象在适当时候被销毁

3. **错误处理**
   - 捕获工作线程中的异常
   - 通过信号将错误信息传递到主线程
   - 在主线程中显示错误信息

### 数据库集成
PySide6 可以与各种数据库进行集成，例如 SQLite，通过 Qt 的数据库模块 `QtSql`。

```python
import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton, QVBoxLayout, QWidget, QTableWidget, QTableWidgetItem, QMessageBox
from PySide6.QtSql import QSqlDatabase, QSqlQuery

# 数据库集成演示窗口
class DatabaseDemoWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        # 设置窗口标题和大小
        self.setWindowTitle("数据库集成演示")
        self.setGeometry(100, 100, 600, 400)

        # 创建中央部件和布局
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)

        # 创建表格部件用于显示数据
        self.table_widget = QTableWidget()
        layout.addWidget(self.table_widget)

        # 添加加载数据按钮
        btn_load = QPushButton("加载数据")
        btn_load.clicked.connect(self.load_data)
        layout.addWidget(btn_load)

        # 初始化数据库连接
        self.init_database()

    def init_database(self):
        # 添加SQLite数据库驱动
        self.db = QSqlDatabase.addDatabase("QSQLITE")
        # 设置数据库文件名
        self.db.setDatabaseName("example.db")

        # 尝试打开数据库
        if not self.db.open():
            QMessageBox.critical(self, "错误", "无法打开数据库")
            return

        # 创建表和初始化数据
        query = QSqlQuery()
        query.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)")
        query.exec("INSERT OR IGNORE INTO users (id, name, age) VALUES (1, '张三', 30)")
        query.exec("INSERT OR IGNORE INTO users (id, name, age) VALUES (2, '李四', 24)")
        query.exec("INSERT OR IGNORE INTO users (id, name, age) VALUES (3, '王五', 35)")

    def load_data(self):
        # 执行SQL查询获取用户数据
        query = QSqlQuery("SELECT name, age FROM users")
        
        # 初始化表格
        self.table_widget.setRowCount(0)
        self.table_widget.setColumnCount(2)
        self.table_widget.setHorizontalHeaderLabels(["姓名", "年龄"])

        # 遍历查询结果并填充表格
        row = 0
        while query.next():
            self.table_widget.insertRow(row)
            self.table_widget.setItem(row, 0, QTableWidgetItem(query.value(0)))
            self.table_widget.setItem(row, 1, QTableWidgetItem(str(query.value(1))))
            row += 1

    def closeEvent(self, event):
        # 关闭窗口时断开数据库连接
        self.db.close()
        super().closeEvent(event)

# 应用程序入口
app = QApplication(sys.argv)
window = DatabaseDemoWindow()
window.show()
app.exec()
```

## 数据库集成详解

PySide6 通过 `QtSql` 模块提供了强大的数据库支持，可以轻松集成 SQLite、MySQL、PostgreSQL 等数据库。

### 数据库连接管理

1. **连接数据库**
   - 使用 `QSqlDatabase.addDatabase()` 创建数据库连接
   - 通过 `setDatabaseName()` 设置数据库名称或路径
   - 调用 `open()` 方法建立连接

2. **执行SQL查询**
   - `QSqlQuery` 用于执行SQL语句
   - `exec()` 方法执行不返回结果的查询
   - `next()` 方法遍历结果集

3. **数据显示**
   - `QTableWidget` 适合显示表格数据
   - 使用 `setRowCount()` 和 `setColumnCount()` 设置表格大小
   - 通过 `setItem()` 填充表格内容

### 网络编程
PySide6 提供了 `QtNetwork` 模块，用于处理网络通信，例如 HTTP 请求。

```python
# 导入必要的模块
import sys
from PySide6.QtWidgets import (QApplication, QMainWindow, QPushButton, 
                              QTextEdit, QVBoxLayout, QWidget, QMessageBox)
from PySide6.QtNetwork import QNetworkAccessManager, QNetworkRequest, QNetworkReply
from PySide6.QtCore import QUrl

class NetworkDemoWindow(QMainWindow):
    """
    网络请求演示窗口
    展示如何使用PySide6进行HTTP网络请求
    """
    def __init__(self):
        super().__init__()
        self.setWindowTitle("网络请求演示")
        self.setGeometry(100, 100, 600, 400)

        # 创建中央部件和布局
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)

        # 创建文本显示区域
        self.text_edit = QTextEdit()
        self.text_edit.setReadOnly(True)  # 设置为只读
        layout.addWidget(self.text_edit)

        # 创建请求按钮
        btn_fetch = QPushButton("获取网络数据")
        btn_fetch.clicked.connect(self.fetch_data)
        layout.addWidget(btn_fetch)

        # 初始化网络管理器
        self.manager = QNetworkAccessManager()
        # 连接请求完成信号
        self.manager.finished.connect(self.on_request_finished)

    def fetch_data(self):
        """
        发起网络请求
        """
        # 创建URL对象 - 这里可以替换为任何有效的URL
        url = QUrl("https://www.example.com")
        
        # 验证URL有效性
        if not url.isValid():
            QMessageBox.critical(self, "错误", "无效的URL地址")
            return

        # 创建网络请求
        request = QNetworkRequest(url)
        # 设置请求头（可选）
        request.setRawHeader(b"User-Agent", b"PySide6 Network Client")
        
        # 发送GET请求
        self.manager.get(request)
        self.text_edit.setText("正在请求数据...")

    def on_request_finished(self, reply: QNetworkReply):
        """
        请求完成回调
        """
        try:
            # 检查是否有错误
            if reply.error() == QNetworkReply.NetworkError.NoError:
                # 读取响应数据并解码
                data = reply.readAll().data().decode("utf-8")
                self.text_edit.setText(data)
            else:
                # 显示错误信息
                self.text_edit.setText(f"请求错误: {reply.errorString()}")
        finally:
            # 确保释放reply对象
            reply.deleteLater()

# 应用程序入口
if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = NetworkDemoWindow()
    window.show()
    app.exec()
```

## 网络编程详解

PySide6 通过 `QtNetwork` 模块提供了强大的网络功能，支持 HTTP、HTTPS、FTP 等协议。

### 关键组件

1. **QNetworkAccessManager**
   - 负责发送网络请求和管理网络操作
   - 处理请求队列和缓存
   - 提供信号机制监听请求状态

2. **QNetworkRequest**
   - 封装请求URL和头部信息
   - 可以设置请求属性如超时时间
   - 支持HTTPS安全连接

3. **QNetworkReply**
   - 表示网络请求的响应
   - 提供读取响应数据的方法
   - 包含错误状态和元数据

### 异步处理

- 网络请求默认是异步的
- 通过信号/槽机制获取结果
- 避免阻塞主线程保持UI响应

### 最佳实践

- 添加适当的请求超时处理
- 实现进度指示器
- 处理SSL/TLS安全连接
- 考虑使用线程处理大量请求

### 绘图与图形视图
PySide6 提供了强大的绘图功能，通过 `QPainter` 可以在任何 `QWidget` 上进行绘制。`QGraphicsView` 和 `QGraphicsScene` 则提供了一个用于管理大量 2D 图形项的框架。

```python
import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QWidget, QVBoxLayout, QPushButton, QGraphicsView, QGraphicsScene, QGraphicsRectItem, QGraphicsEllipseItem
from PySide6.QtGui import QPainter, QColor, QPen
from PySide6.QtCore import Qt, QRectF

class CustomPaintWidget(QWidget):
    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing)

        # 绘制矩形
        painter.setPen(QPen(QColor(255, 0, 0), 2)) # 红色边框
        painter.setBrush(QColor(255, 0, 0, 127)) # 半透明红色填充
        painter.drawRect(50, 50, 100, 50)

        # 绘制圆形
        painter.setPen(QPen(QColor(0, 0, 255), 3)) # 蓝色边框
        painter.setBrush(QColor(0, 0, 255, 127)) # 半透明蓝色填充
        painter.drawEllipse(150, 100, 80, 80)

        # 绘制文本
        painter.setPen(QPen(QColor(0, 0, 0))) # 黑色文本
        painter.setFont(painter.font().setPointSize(16))
        painter.drawText(50, 200, "Hello PySide6 Drawing!")

class GraphicsViewDemo(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Graphics View Demo")
        self.setGeometry(100, 100, 600, 500)

        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)

        # 自定义绘图组件
        paint_widget = CustomPaintWidget()
        paint_widget.setFixedSize(300, 250)
        layout.addWidget(paint_widget)

        # 图形视图组件
        self.scene = QGraphicsScene(self)
        self.view = QGraphicsView(self.scene)
        layout.addWidget(self.view)

        # 在场景中添加图形项
        rect_item = QGraphicsRectItem(QRectF(0, 0, 100, 50))
        rect_item.setBrush(QColor(0, 255, 0, 150))
        rect_item.setPen(QPen(Qt.NoPen))
        self.scene.addItem(rect_item)

        ellipse_item = QGraphicsEllipseItem(QRectF(50, 50, 80, 80))
        ellipse_item.setBrush(QColor(255, 165, 0, 150))
        ellipse_item.setPen(QPen(Qt.NoPen))
        self.scene.addItem(ellipse_item)

        self.scene.setSceneRect(self.scene.itemsBoundingRect())

app = QApplication(sys.argv)
window = GraphicsViewDemo()
window.show()
app.exec()
```

**核心概念：**
*   **QPainter**: 用于低级绘图，直接在 `QWidget` 上绘制
*   **paintEvent**: `QWidget` 的事件处理方法，用于自定义绘制
*   **QGraphicsScene**: 管理 2D 图形项的容器
*   **QGraphicsView**: 显示 `QGraphicsScene` 内容的视图
*   **QGraphicsItem**: 场景中的基本图形项（如 `QGraphicsRectItem`, `QGraphicsEllipseItem`）

### 部署
将 PySide6 应用程序打包成可执行文件，方便在没有 Python 环境的机器上运行。常用的工具是 `PyInstaller`。

#### 使用 PyInstaller 打包
1.  **安装 PyInstaller**:
    ```bash
    pip install pyinstaller
    ```

2.  **创建打包命令**:
    假设你的主 PySide6 应用程序文件是 `main.py`。
    ```bash
    pyinstaller --onefile --windowed main.py
    ```
    *   `--onefile`: 将所有内容打包成一个单独的可执行文件。
    *   `--windowed` 或 `-w`: 禁用命令行窗口（对于 GUI 应用程序）。

3.  **添加图标 (可选)**:
    ```bash
    pyinstaller --onefile --windowed --icon=app.ico main.py
    ```
    *   `--icon=app.ico`: 指定应用程序图标文件（`.ico` 格式）。

4.  **处理资源文件 (可选)**:
    如果你的应用程序使用了图片、配置文件等资源文件，需要通过 `--add-data` 参数将其包含进去。
    例如，如果 `images` 文件夹在 `main.py` 同级目录下：
    ```bash
    pyinstaller --onefile --windowed --add-data "images;images" main.py
    ```
    *   格式为 `源路径;目标路径`。在 Windows 上使用 `;` 分隔，在 Linux/macOS 上使用 `:` 分隔。

5.  **运行打包后的程序**:
    打包成功后，可执行文件会在 `dist` 文件夹中。

**核心概念：**
*   **PyInstaller**: 将 Python 应用程序及其所有依赖项打包成独立可执行文件的工具。
*   **`--onefile`**: 生成单个可执行文件，便于分发。
*   **`--windowed`**: 隐藏控制台窗口，适用于 GUI 应用。
*   **`--add-data`**: 包含非代码资源文件。

### 使用Qt Designer创建完整应用示例

下面是一个使用Qt Designer创建简单文本编辑器的完整示例：

1. 在Qt Designer中创建一个MainWindow，添加菜单栏、工具栏和中央文本编辑器
2. 保存为texteditor.ui
3. 使用pyside6-uic转换为Python代码

```bash
pyside6-uic texteditor.ui -o ui_texteditor.py
```

4. 创建主应用程序文件：

```python
import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QFileDialog, QMessageBox
from PySide6.QtCore import QFile, QTextStream
from ui_texteditor import Ui_MainWindow

class TextEditor(QMainWindow):
    def __init__(self):
        super().__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        
        # 当前文件路径
        self.current_file = None
        
        # 连接信号和槽
        self.ui.actionNew.triggered.connect(self.new_file)
        self.ui.actionOpen.triggered.connect(self.open_file)
        self.ui.actionSave.triggered.connect(self.save_file)
        self.ui.actionSaveAs.triggered.connect(self.save_file_as)
        self.ui.actionExit.triggered.connect(self.close)
        self.ui.actionAbout.triggered.connect(self.about)
        
        # 设置窗口标题
        self.update_title()
    
    def new_file(self):
        self.ui.textEdit.clear()
        self.current_file = None
        self.update_title()
    
    def open_file(self):
        file_name, _ = QFileDialog.getOpenFileName(self, "打开文件", "", "文本文件 (*.txt);;所有文件 (*)")
        if file_name:
            try:
                file = QFile(file_name)
                if file.open(QFile.ReadOnly | QFile.Text):
                    stream = QTextStream(file)
                    self.ui.textEdit.setText(stream.readAll())
                    file.close()
                    self.current_file = file_name
                    self.update_title()
            except Exception as e:
                QMessageBox.critical(self, "错误", f"无法打开文件: {e}")
    
    def save_file(self):
        if self.current_file:
            self.save_to_file(self.current_file)
        else:
            self.save_file_as()
    
    def save_file_as(self):
        file_name, _ = QFileDialog.getSaveFileName(self, "保存文件", "", "文本文件 (*.txt);;所有文件 (*)")
        if file_name:
            self.save_to_file(file_name)
    
    def save_to_file(self, file_name):
        try:
            file = QFile(file_name)
            if file.open(QFile.WriteOnly | QFile.Text):
                stream = QTextStream(file)
                stream << self.ui.textEdit.toPlainText()
                file.close()
                self.current_file = file_name
                self.update_title()
                return True
        except Exception as e:
            QMessageBox.critical(self, "错误", f"无法保存文件: {e}")
        return False
    
    def update_title(self):
        title = "无标题" if not self.current_file else self.current_file
        self.setWindowTitle(f"{title} - 文本编辑器")
    
    def about(self):
        QMessageBox.about(self, "关于", "使用PySide6和Qt Designer创建的简单文本编辑器")
    
    def closeEvent(self, event):
        if self.ui.textEdit.document().isModified():
            reply = QMessageBox.question(self, "保存更改", 
                                       "文档已被修改，是否保存更改？",
                                       QMessageBox.Save | QMessageBox.Discard | QMessageBox.Cancel)
            
            if reply == QMessageBox.Save:
                if not self.save_file():
                    event.ignore()
            elif reply == QMessageBox.Cancel:
                event.ignore()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = TextEditor()
    window.show()
    sys.exit(app.exec())
```

这个示例展示了如何将Qt Designer创建的UI与PySide6代码结合，实现一个功能完整的文本编辑器应用程序。
