---
title: PySide基础
order: 3
icon: code
---

# PySide
PySide是一个Python绑定库，用于创建和管理基于Qt的用户界面。它提供了一组Python类和函数，使开发人员能够使用Python语言来创建和操作Qt应用程序的用户界面。

SRA使用PySide6作为GUI界面。

此教程将以初学者角度讲解PySide6的基础使用。


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

**核心概念：**
*   **QApplication**: 管理应用程序的控制流和主设置
*   **QMainWindow**: 提供主应用程序窗口
*   **信号与槽**: PySide6 的事件处理机制

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

**核心概念：**
*   **QVBoxLayout**: 垂直布局
*   **QHBoxLayout**: 水平布局
*   **QGridLayout**: 网格布局

## 进阶

### 信号与槽
PySide6 使用信号与槽机制进行组件间的通信。

```python
from PySide6.QtCore import Signal, QObject

class Communicate(QObject):
    speak = Signal(str)

class Speaker(QObject):
    def __init__(self):
        super().__init__()
        
    def say(self, message):
        print(message)

com = Communicate()
speaker = Speaker()

com.speak.connect(speaker.say)
com.speak.emit("Hello World")
```

**核心概念：**
*   **Signal**: 定义信号
*   **Slot**: 接收信号的函数
*   **emit**: 触发信号

### 自定义组件
可以创建自定义组件来扩展 PySide6 的功能。

```python
from PySide6.QtWidgets import QPushButton

class CustomButton(QPushButton):
    def __init__(self, text):
        super().__init__(text)
        
        self.setStyleSheet("""
            QPushButton {
                background-color: #4CAF50;
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                font-size: 16px;
            }
        """)
```

**核心概念：**
*   **继承**: 从现有组件继承
*   **样式表**: 使用 CSS 样式自定义外观

### 事件处理
PySide6 应用程序通过事件循环处理用户交互和系统事件。

```python
import sys
from PySide6.QtWidgets import QApplication, QWidget, QPushButton
from PySide6.QtCore import Qt

class EventHandlingWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Event Handling Demo")
        self.setGeometry(100, 100, 300, 200)

        button = QPushButton("Click Me", self)
        button.move(100, 80)
        button.clicked.connect(self.on_button_click)

    def on_button_click(self):
        print("Button clicked!")

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            self.close()
        else:
            print(f"Key pressed: {event.text()}")

app = QApplication(sys.argv)
window = EventHandlingWindow()
window.show()
app.exec()
```

**核心概念：**
*   **事件循环**: 应用程序等待和分发事件的机制
*   **事件处理器**: 响应特定事件的方法（如 `keyPressEvent`）
*   **信号与槽**: 处理用户交互的主要方式

### 对话框
对话框用于与用户进行短期交互，获取输入或显示信息。

```python
import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton, QMessageBox, QInputDialog

class DialogDemoWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Dialog Demo")
        self.setGeometry(100, 100, 400, 300)

        btn_msg = QPushButton("Show Message Box", self)
        btn_msg.move(50, 50)
        btn_msg.clicked.connect(self.show_message_box)

        btn_input = QPushButton("Show Input Dialog", self)
        btn_input.move(50, 100)
        btn_input.clicked.connect(self.show_input_dialog)

    def show_message_box(self):
        QMessageBox.information(self, "Info", "This is an information message.")

    def show_input_dialog(self):
        text, ok = QInputDialog.getText(self, "Input Dialog", "Enter your name:")
        if ok and text:
            QMessageBox.information(self, "Hello", f"Hello, {text}!")

app = QApplication(sys.argv)
window = DialogDemoWindow()
window.show()
app.exec()
```

**核心概念：**
*   **QMessageBox**: 用于显示信息、警告、错误或询问用户
*   **QInputDialog**: 用于获取用户文本、整数或浮点数输入
*   **模态对话框**: 阻塞父窗口直到对话框关闭

### 文件操作
在 PySide6 应用程序中进行文件操作，通常会结合 `QFileDialog` 来选择文件路径。

```python
import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton, QTextEdit, QVBoxLayout, QWidget, QFileDialog

class FileOperationWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("File Operation Demo")
        self.setGeometry(100, 100, 500, 400)

        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)

        self.text_edit = QTextEdit()
        layout.addWidget(self.text_edit)

        btn_open = QPushButton("Open File")
        btn_open.clicked.connect(self.open_file)
        layout.addWidget(btn_open)

        btn_save = QPushButton("Save File")
        btn_save.clicked.connect(self.save_file)
        layout.addWidget(btn_save)

    def open_file(self):
        file_name, _ = QFileDialog.getOpenFileName(self, "Open File", "", "Text Files (*.txt);;All Files (*)")
        if file_name:
            try:
                with open(file_name, 'r', encoding='utf-8') as f:
                    content = f.read()
                    self.text_edit.setText(content)
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Could not open file: {e}")

    def save_file(self):
        file_name, _ = QFileDialog.getSaveFileName(self, "Save File", "", "Text Files (*.txt);;All Files (*)")
        if file_name:
            try:
                with open(file_name, 'w', encoding='utf-8') as f:
                    f.write(self.text_edit.toPlainText())
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Could not save file: {e}")

app = QApplication(sys.argv)
window = FileOperationWindow()
window.show()
app.exec()
```

**核心概念：**
*   **QFileDialog**: 提供文件选择对话框
*   **getOpenFileName**: 获取要打开的文件路径
*   **getSaveFileName**: 获取要保存的文件路径
*   **with open(...)**: 安全地处理文件读写

### 多线程
在 GUI 应用程序中，长时间运行的任务应该在单独的线程中执行，以避免阻塞主线程，保持界面响应。

```python
import sys
import time
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QVBoxLayout, QWidget
from PySide6.QtCore import QThread, Signal

class Worker(QThread):
    finished = Signal(str)

    def run(self):
        # 模拟耗时操作
        time.sleep(3) 
        self.finished.emit("Task Completed!")

class MultiThreadingDemo(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Multi-threading Demo")
        self.setGeometry(100, 100, 300, 200)

        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)

        self.status_label = QLabel("Ready")
        layout.addWidget(self.status_label)

        btn_start = QPushButton("Start Long Task")
        btn_start.clicked.connect(self.start_long_task)
        layout.addWidget(btn_start)

    def start_long_task(self):
        self.status_label.setText("Task running...")
        self.worker_thread = Worker()
        self.worker_thread.finished.connect(self.on_task_finished)
        self.worker_thread.start()

    def on_task_finished(self, message):
        self.status_label.setText(message)

app = QApplication(sys.argv)
window = MultiThreadingDemo()
window.show()
app.exec()
```

**核心概念：**
*   **QThread**: 用于在单独线程中执行任务
*   **Signal**: 用于从工作线程向主线程发送信号
*   **避免阻塞主线程**: 确保 GUI 保持响应

### 数据库集成
PySide6 可以与各种数据库进行集成，例如 SQLite，通过 Qt 的数据库模块 `QtSql`。

```python
import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton, QVBoxLayout, QWidget, QTableWidget, QTableWidgetItem, QMessageBox
from PySide6.QtSql import QSqlDatabase, QSqlQuery

class DatabaseDemoWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Database Integration Demo")
        self.setGeometry(100, 100, 600, 400)

        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)

        self.table_widget = QTableWidget()
        layout.addWidget(self.table_widget)

        btn_load = QPushButton("Load Data")
        btn_load.clicked.connect(self.load_data)
        layout.addWidget(btn_load)

        self.init_database()

    def init_database(self):
        self.db = QSqlDatabase.addDatabase("QSQLITE")
        self.db.setDatabaseName("example.db")

        if not self.db.open():
            QMessageBox.critical(self, "Error", "Could not open database.")
            return

        query = QSqlQuery()
        query.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)")
        query.exec("INSERT OR IGNORE INTO users (id, name, age) VALUES (1, 'Alice', 30)")
        query.exec("INSERT OR IGNORE INTO users (id, name, age) VALUES (2, 'Bob', 24)")
        query.exec("INSERT OR IGNORE INTO users (id, name, age) VALUES (3, 'Charlie', 35)")

    def load_data(self):
        query = QSqlQuery("SELECT name, age FROM users")
        
        self.table_widget.setRowCount(0)
        self.table_widget.setColumnCount(2)
        self.table_widget.setHorizontalHeaderLabels(["Name", "Age"])

        row = 0
        while query.next():
            self.table_widget.insertRow(row)
            self.table_widget.setItem(row, 0, QTableWidgetItem(query.value(0)))
            self.table_widget.setItem(row, 1, QTableWidgetItem(str(query.value(1))))
            row += 1

    def closeEvent(self, event):
        self.db.close()
        super().closeEvent(event)

app = QApplication(sys.argv)
window = DatabaseDemoWindow()
window.show()
app.exec()
```

**核心概念：**
*   **QSqlDatabase**: 管理数据库连接
*   **QSqlQuery**: 执行 SQL 查询
*   **QTableWidget**: 显示数据库查询结果
*   **SQLite**: 轻量级文件数据库，常用于桌面应用

### 网络编程
PySide6 提供了 `QtNetwork` 模块，用于处理网络通信，例如 HTTP 请求。

```python
import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton, QTextEdit, QVBoxLayout, QWidget, QMessageBox
from PySide6.QtNetwork import QNetworkAccessManager, QNetworkRequest, QNetworkReply
from PySide6.QtCore import QUrl

class NetworkDemoWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Network Demo")
        self.setGeometry(100, 100, 600, 400)

        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)

        self.text_edit = QTextEdit()
        layout.addWidget(self.text_edit)

        btn_fetch = QPushButton("Fetch Data from URL")
        btn_fetch.clicked.connect(self.fetch_data)
        layout.addWidget(btn_fetch)

        self.manager = QNetworkAccessManager()
        self.manager.finished.connect(self.on_request_finished)

    def fetch_data(self):
        url = QUrl("https://www.example.com") # 替换为你要请求的URL
        if not url.isValid():
            QMessageBox.critical(self, "Error", "Invalid URL.")
            return

        request = QNetworkRequest(url)
        self.manager.get(request)
        self.text_edit.setText("Fetching data...")

    def on_request_finished(self, reply: QNetworkReply):
        if reply.error() == QNetworkReply.NetworkError.NoError:
            data = reply.readAll().data().decode("utf-8")
            self.text_edit.setText(data)
        else:
            self.text_edit.setText(f"Error: {reply.errorString()}")
        reply.deleteLater()

app = QApplication(sys.argv)
window = NetworkDemoWindow()
window.show()
app.exec()
```

**核心概念：**
*   **QNetworkAccessManager**: 发送网络请求
*   **QNetworkRequest**: 封装网络请求信息
*   **QNetworkReply**: 接收网络请求的响应
*   **异步操作**: 网络请求通常是异步的，避免阻塞 GUI

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

## 总结
本教程涵盖了 PySide6 从基础的窗口和组件、布局管理，到进阶的信号与槽、自定义组件、事件处理、对话框、文件操作、多线程、数据库集成以及最终的应用程序部署。希望这些内容能帮助你更好地理解和使用 PySide6 进行 GUI 应用程序开发。