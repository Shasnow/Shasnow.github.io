---
title: 代码格式规范
icon: file
order: 3
---

# 代码格式规范
在开发SRA过程中，应该遵守如下代码格式规范。

## 命名规范

### 变量
   变量应当使用英文命名，使用小写字母，且有实际意义。每个单词之间用下划线分隔开，避免出现拼写错误。
   
   例如：`user_name`，`is_logged_in`。

### 常量名
   常量应当使用英文命名，使用大写字母，且有实际意义。每个单词之间用下划线分隔开，避免出现拼写错误。

   例如：`MAX_USER_COUNT`，`DEFAULT_TIMEOUT`。

### 函数名
   函数名应当使用英文命名，使用小写字母，且有实际意义。每个单词之间用下划线分隔开，避免出现拼写错误。

   例如：`calculate_average`，`get_user_info`。

### 类名
   类名应当使用英文命名，使用单词首字母大写，且有实际意义。

   例如：`User`，`DatabaseConnection`。

### 模块名
   模块名应当使用英文命名，使用小写字母，且有实际意义。每个单词之间用下划线分隔开，避免出现拼写错误。

   例如：`math_utils`，`database`。

### 包名
   包名应当使用英文命名，使用小写字母，且有实际意义。每个单词之间用下划线分隔开，避免出现拼写错误。

   例如：`utils`，`database`。

## 格式规则

### 缩进
   缩进应当使用四个空格。

   例如：

   ```python
   def calculate_average(numbers):
       total = 0
       for number in numbers:
           total += number
       return total / len(numbers)
   ```
### 换行
   换行应当使用换行符，避免使用空格。行长不建议超过120。

   例如：

   ```python
   result = calculate_average([1, 2, 3, 4, 5])
   print("The average is:", result)
   ```

### 空格
   空格应当使用空格，避免使用制表符。

   例如：

   ```python
   result = calculate_average([1, 2, 3, 4, 5])
   print("The average is:", result)
   ```

### 引号
   引号应当首选双引号。

   例如：

   ```python
   print("Hello, 'world'!")
   ```
