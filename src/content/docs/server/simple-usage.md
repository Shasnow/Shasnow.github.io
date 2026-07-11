---
title: 简单使用
---

:::tip
开发中
:::

在 SRA 2.17 版本中新增了 SRAServer 功能，用于在 SRA 运行时提供一个 HTTP 服务器，允许其他程序通过 HTTP 请求来控制 SRA 运行。
服务器默认监听端口为 `5000`，您可以在启动时指定其他端口。示例：
```bash
SRA-server.exe --urls http://0.0.0.0:8080
```
这将在启动一个监听端口为 `8080` 的 SRA HTTP 服务器。
