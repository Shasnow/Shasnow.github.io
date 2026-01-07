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
执行时，根据全局配置决定是执行多配置还是当前配置，

## 任务
任务均继承自 `SRACore/tasks/BaseTask.py` 中的 `BaseTask` 类。
```python
class SRACore.tasks.BaseTask(Executable,ABC)
```
属性：
- `config`: 全局配置字典。
抽象方法：
- `def run(self) -> bool`: 任务的执行逻辑，返回任务是否成功完成。

## 修改任务流程
SRA的任务流程均存放于 `SRACore/tasks/`, 要修改任务流程，可以直接编辑对应的Python文件。

## 添加一个任务
### 编写任务
在 `SRACore/tasks` 目录下创建一个新的 Python 文件，例如 `StartGameTask.py`，并编写对应的任务类。
任务类应继承自 `BaseTask`，并实现 `run` 方法。

### 修改任务调度
在 `SRACore/config.toml` 中添加新的任务配置项，以便在UI中显示和配置该任务。

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
    
    