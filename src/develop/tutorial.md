---
title: 教程
icon: code
order: 7
author: Shasnow
---

:::warning
本章节内容主要面向开发者和高级用户，普通用户可以跳过。
本章节内容可能会随着SRA版本更新而变化。
本章节内容可能涉及SRA源码编辑。
:::

## 从源码运行 SRA 交互式命令行界面

本章节介绍如何从源码运行 SRA-cli。

### 先决条件

- Python 3.12 及以上版本
- Git

### 分步教程

1. 克隆存储库：
    ```bash
    git clone https://github.com/Shasnow/StarRailAssistant.git 
    ```
   如果克隆较慢，考虑使用浅层克隆
    ```bash
    git clone https://github.com/Shasnow/StarRailAssistant.git --depth=1
    ```
2. 进入项目目录：
    ```bash
    cd StarRailAssistant
    ```

3. 创建并激活虚拟环境：
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # Linux 或 macOS
    .venv\Scripts\activate     # Windows
    ```

4. 安装依赖：
    ```bash
    pip install -r requirements.txt
    ```
   如果安装较慢，考虑使用国内镜像源，例如清华大学的 PyPI 镜像：
    ```bash
    pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
    ```

5. 运行 SRA：
    ```bash
    python main.py
    ```
   这会让你进入 SRA 的交互式命令行界面，你应该看到下面的输出：
    ```text
    # ... 这些是一些调试信息
    SRA-cli 2.4.0 (2.4.0 on win32)
    输入 'help' 或 '?' 来查看命令列表。
    sra> 
    ```

6. 运行任务，或进行其他操作：
   参考进阶操作中 [SRA-cli](/getstarted/advance#sracli) 章节了解如何使用 SRA-cli。

7. 尝试一下：
    - 运行 `help` 命令查看可用命令。
    - 运行 `version` 命令查看当前 SRA 版本。
    - 运行 `exit` 命令退出 SRA-cli。

8. 常见问题：
    - SRA 提示 `WARNING | 您没有以管理员权限运行 SRA-cli。某些命令可能无法正常工作。`：
        - 考虑以管理员权限运行终端，然后重新执行步骤 5。
        - 如果您使用 Pycharm 等 IDE，请确保以管理员权限运行 IDE。

## 从源码运行 SRA 图形化用户界面

本章节介绍如何从源码运行 SRA GUI。

### 先决条件

- .NET 8.0 SDK 及以上版本
- Git

### 分步教程

1. 克隆存储库：
   如果您已经克隆过存储库，可以跳过此步骤。
    ```bash
    git clone https://github.com/Shasnow/StarRailAssistant.git 
    ```
   如果克隆较慢，考虑使用浅层克隆
    ```bash
    git clone https://github.com/Shasnow/StarRailAssistant.git --depth=1
    ```
2. 进入项目目录：
    ```bash
    cd StarRailAssistant
    ```

3. 运行项目：
    ```bash
    dotnet run --project ./SRAFrontend/SRAFrontend.csproj
    ```
   这会编译并运行 SRA GUI，你应该看到 SRA 窗口弹出。

4. 尝试一下：
    - 浏览各个功能模块，熟悉 SRA 的使用。
    - 访问设置页面，调整 SRA 的配置。

5. 常见问题：
    - `请求的操作需要提升`:
        - 考虑以管理员权限运行终端，然后重新执行步骤 3。
        - 如果您使用 Visual Studio 等 IDE，请确保以管理员权限运行 IDE。

## 在 SRA 中添加自定义任务

本章节介绍如何在 SRA 中添加一个自定义任务。

### 先决条件

- 已安装 SRA 或已获取 SRA 源码
- 了解 Python 编程基础
- 文本编辑器（如 VSCode、Notepad++）

### 分步教程

1. 打开 SRA 的安装目录或源码目录，找到 `tasks` 文件夹。
   ![SRA 安装目录](/img/develop/custom-task-1.png)
   这里存放了所有的任务脚本。
   ![tasks 文件夹](/img/develop/custom-task-2.png)
2. 创建一个新的 Python 文件，例如 `MyCustomTask.py`。
3. 在文件中编写任务代码，例如：
    ```python
    from SRACore.task import BaseTask
    from SRACore.util.logger import logger
   
   
    class MyCustomTask(BaseTask):
        def run(self):
            logger.info("这是我的自定义任务！")
    ```
   解释：
   这是一个简单的任务类，继承自 `BaseTask`，并实现了 `run` 方法，在运行时会打印一条日志信息。
    - `from SRACore.task import BaseTask`：导入任务基类。
    - `from SRACore.util.logger import logger`：导入日志记录器。
    - `class MyCustomTask(BaseTask):`：定义一个新的任务类。
    - `def run(self):`：实现任务的主要逻辑。
    - `logger.info("这是我的自定义任务！")`：打印日志信息。
    - `BaseTask` 类是所有任务的基类，必须继承它才能被 SRA 识别为任务。
    - `BaseTask` 要求实现 `run` 方法，作为任务的入口点。

4. 注册任务：
   打开 `SRACore/config.toml` 在文件末尾追加：
    ```toml
    [[tasks]]
    name = "自定义任务"
    main = "MyCustomTask"
    module = "tasks.MyCustomTask"
    ```
   解释：
    - `[[tasks]]`：表示这是一个任务配置块。
    - `name`：任务的显示名称。
    - `main`：任务类的名称。
    - `module`：任务类所在的模块路径。

5. 测试你的任务类：
   在进行下一步之前，确保你所有的修改都已保存。
   运行 SRA：
    - 如果你使用的是安装的 SRA，请在 SRA 安装目录下找到 `SRA-cli.exe` 并运行它。
    - 如果你使用的是源码，请参考前面的章节了解如何运行 SRA。

   如果一切正常，你应该能在 SRA-cli 中看到你的自定义任务已被加载，得到类似如下的输出：
    ```text
    DEBUG | Successfully load task: [<class 'tasks.StartGameTask.StartGameTask'>,
    <class 'tasks.TrailblazePowerTask.TrailblazePowerTask'>,
    <class 'tasks.ReceiveRewardsTask.ReceiveRewardsTask'>,
    <class 'tasks.CosmicStrifeTask.CosmicStrifeTask'>,
    <class 'tasks.MissionAccomplishTask.MissionAccomplishTask'>,
    <class 'tasks.MyCustomTask.MyCustomTask'>]
    ```
   SRA 会打印出已加载的任务列表，其中应包含 `MyCustomTask`，你的任务已成功注册，它的索引为 5.

   在 SRA-cli 中，运行以下命令来执行你的自定义任务：
    ```text
    task single 5
    ```
   或者
    ```text
    task single MyCustomTask
    ```

   你应该能在控制台看到日志输出：
    ```text
   sra> task single 5
    12:28:40[7916] | DEBUG | [Start]
    12:28:40[7916] | DEBUG | run single task: config=Default, task=5
    12:28:40[7916] | DEBUG | config: ...
    12:28:40[7916] | DEBUG | running task: MyCustomTask
    12:28:40[7916] | INFO  | 这是我的自定义任务！
    12:28:40[7916] | ERROR | 任务 'MyCustomTask' 失败。停止进一步执行。
    12:28:40[7916] | DEBUG | [Done]
   sra>
    ```
   这表示你的任务已成功运行。
   你可能注意到日志中有一条错误信息 `任务 'MyCustomTask' 失败。停止进一步执行。`，这是因为我们没有在任务执行完成后返回成功状态。

   在 `run` 方法的末尾添加以下代码以返回成功状态：
    ```python
    return True
    ```
   现在再次运行任务，你应该不会再看到错误信息。

6. 恭喜！
   你已经成功创建并运行了一个自定义任务！如果想实现更复杂的功能，可以参考 SRA 的其他任务脚本，和 SRA 提供的 API 文档。