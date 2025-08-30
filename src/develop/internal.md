---
title: 内部参考
icon: code
order: 7
author: Shasnow
---
:::warning
本章节内容主要面向开发者和高级用户，普通用户可以跳过。
本章节内容可能会随着SRA版本更新而变化。
本章节内容可能涉及SRA源码编辑。
:::
## 任务执行
SRA的任务执行基于任务队列，任务队列中的任务按顺序执行。
主体逻辑位于 `SRACore/thread/task_thread.py` 中的 `TaskManager` 类。
`TaskManager` 继承自QThread类，调度任务的执行。
执行时，根据全局配置决定是执行多配置还是当前配置，

## 任务
任务均继承自 `SRACore/tasks/BaseTask.py` 中的 `BaseTask` 类。
```python
class SRACore.tasks.BaseTask.BaseTask(Executable,ABC)
```
属性：
- `cm`: ConfigManager 对象，用于管理配置。
- `config`: 当前任务的配置字典。
抽象方法：
- `def run(self) -> bool`: 任务的执行逻辑，返回任务是否成功完成。

## 修改任务流程
SRA的任务流程均存放于 `SRACore/tasks/`, 要修改任务流程，可以直接编辑对应的Python文件。

## 添加一个任务
### UI准备
1. 准备任务的UI:
    使用 Qt Designer 设计一个Widget类型的UI，保存为 .ui 文件，存放在 `resources/ui` 目录下。
2. 修改 `resources/ui/main.ui`:
    在 `main.ui` 左侧 `任务配置` 栏中添加新的任务, 并修改 checkBox 和 pushButton 的 objectName 为更有标识度的名字。
    例如: start_game_checkBox, start_game_pushButton
3. 编译UI文件:
    在SRA根目录下运行以下命令，将 .ui 文件编译为 Python 文件，存放在 `SRACore/ui` 目录下。
    ```bash
    python built.py
    ```
   
### 编写组件
在 `SRACore/component` 目录下创建一个新的 Python 文件，例如 `start_game.py`，并编写对应的组件类。
组件类应继承自 `SRAComponent`，并实现必要的方法

### 编写任务
在 `SRACore/tasks` 目录下创建一个新的 Python 文件，例如 `StartGameTask.py`，并编写对应的任务类。
任务类应继承自 `BaseTask`，并实现 `run` 方法。

### 修改任务调度
在 `SRACore/thread/task_thread.py` 中的 `TaskManager` 类中，修改`task_list`，添加新的任务调度逻辑。

## 触发器
触发器用于在特定条件下持续执行任务。示例：自动对话。
触发器均继承自 `SRACore/triggers/BaseTrigger.py` 中的 `BaseTrigger` 类。
```python
class SRACore.triggers.BaseTrigger.BaseTrigger(Executable,ABC)
```
属性：
- `enabled`: 触发器是否启用。
- `name`: 触发器的名称。会显示在SRA的 “拓展/插件” 的 “拓展功能” 中
- `config`: 触发器的配置字典。将根据配置字段类型自动生成UI。
抽象方法：
- `run(self) -> bool`: 触发器的执行逻辑。
    
    