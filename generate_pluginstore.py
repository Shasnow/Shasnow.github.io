import os
import time

import urllib3
from supabase import Client, create_client

SUPABASE_URL = "https://hddyaljmbzepamxegwee.supabase.co"
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")


def create_supabase_client():
    """创建Supabase客户端，处理连接失败的情况"""
    try:
        return create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"无法连接到Supabase: {e}")
        return None


def fetch_plugins(max_retries=3):
    """获取插件数据，支持重试机制"""
    supabase = create_supabase_client()
    if not supabase:
        print("Supabase客户端创建失败，无法获取插件数据")
        return []

    for attempt in range(max_retries):
        try:
            response = supabase.table("plugins").select("*").execute()
            return response.data
        except Exception as e:
            print(f"获取插件数据失败 (尝试 {attempt + 1}/{max_retries}): {e}")
            if attempt < max_retries - 1:
                time.sleep(2**attempt)  # 指数退避
            else:
                print("所有重试均失败，返回空列表")
                return []


def safe_delete_plugin(plugin_id, plugin_name):
    """安全删除插件，处理删除失败的情况"""
    supabase = create_supabase_client()
    if not supabase:
        print(f"无法删除插件 '{plugin_name}' (ID: {plugin_id}): Supabase客户端不可用")
        return False

    try:
        supabase.table("plugins").delete().eq("id", plugin_id).execute()
        print(f"已成功删除插件 '{plugin_name}' (ID: {plugin_id})")
        return True
    except Exception as e:
        print(f"删除插件 '{plugin_name}' (ID: {plugin_id}) 失败: {e}")
        return False


def generate_md(plugins, output_path="src/pluginstore.md"):
    """生成插件商店页面"""
    header = """---
home: true
title: 插件商店
portfolio: false
icon: plug
content: doc
heroFullScreen: true

bgImage: https://theme-hope-assets.vuejs.press/bg/2-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/2-dark.svg
bgImageStyle:
    background-attachment: fixed
heroText: 插件商店
tagline: 安装由官方/第三方开发的扩展来提高SRA的可用性与美观性<br>插件内容将在每次构建后更新<br>新版本的插件功能目前暂未实现

highlights:
    - header: 插件列表
      bgImageStyle:
        background-attachment: fixed
      features:
"""

    features_lines = []
    http = urllib3.PoolManager()
    valid_plugins = []

    for p in plugins:
        link = p.get("repo", "#")
        plugin_name = p.get("name", "未知插件")
        plugin_id = p.get("id")

        # 检查链接是否能正常访问
        if link != "#":
            try:
                resp = http.request("GET", link, timeout=5)
                if resp.status >= 400:
                    print(
                        f"警告: 插件 '{plugin_name}' 的链接 '{link}' 访问失败，状态码: {resp.status}"
                    )
                    if plugin_id:
                        if not safe_delete_plugin(plugin_id, plugin_name):
                            print(f"插件 '{plugin_name}' 删除失败，已跳过")
                    continue
            except urllib3.exceptions.MaxRetryError:
                print(f"警告: 插件 '{plugin_name}' 的链接 '{link}' 访问超时")
                if plugin_id:
                    if not safe_delete_plugin(plugin_id, plugin_name):
                        print(f"插件 '{plugin_name}' 删除失败，已跳过")
                continue
            except Exception as e:
                print(
                    f"警告: 插件 '{plugin_name}' 的链接 '{link}' 访问发生未知错误: {e}"
                )
                if plugin_id:
                    if not safe_delete_plugin(plugin_id, plugin_name):
                        print(f"插件 '{plugin_name}' 删除失败，已跳过")
                continue

        # 如果链接检查通过，添加到有效插件列表
        print(f"插件 {plugin_name} 提供的链接可正常访问，继续...")
        valid_plugins.append(p)

    # 生成有效插件的Markdown内容
    for p in valid_plugins:
        title = p.get("name") or "未命名插件"
        details = p.get("description", "").replace("\n", "<br>")
        author = p.get("author", "未知作者")
        version = p.get("version", "未知版本")
        link = p.get("repo", "#")

        feature_md = f"""        - title: {title}
          details: {details}<br>作者：{author}<br>版本：{version}
          link: {link}
"""
        features_lines.append(feature_md)

    content = header + "".join(features_lines) + "\n---\n"

    # 检查文件是否存在，如果存在则删除
    try:
        if os.path.exists(output_path):
            os.remove(output_path)
            print(f"已删除现有文件: {output_path}")
    except Exception as e:
        print(f"删除文件 {output_path} 失败: {e}")

    # 确保目录存在
    try:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
    except Exception as e:
        print(f"创建目录失败: {e}")

    # 创建空文件并写入内容
    try:
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"已生成插件商店页面: {output_path}")
        print(f"成功处理 {len(valid_plugins)} 个有效插件")
    except Exception as e:
        print(f"写入文件 {output_path} 失败: {e}")


if __name__ == "__main__":
    plugins = fetch_plugins()
    if not plugins:
        print("未获取到插件数据，跳过生成插件商店页面。")
    else:
        generate_md(plugins)
