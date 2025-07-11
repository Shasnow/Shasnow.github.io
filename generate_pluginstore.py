import os
import urllib3
from supabase import create_client, Client

SUPABASE_URL = "https://hddyaljmbzepamxegwee.supabase.co"
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def fetch_plugins():
    response = supabase.table("plugins").select("*").execute()

    return response.data

def generate_md(plugins, output_path="src/pluginstore.md"):
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
tagline: 安装由官方/第三方开发的扩展来提高SRA的可用性与美观性<br>插件内容将在每次构建后更新

highlights:
    - header: 插件列表
      bgImageStyle:
        background-attachment: fixed
      features:
"""

    features_lines = []
    http = urllib3.PoolManager()
    for p in plugins:
        link = p.get("repo", "#")
        # 检查链接是否能正常访问
        if link != "#":
            try:
                resp = http.request('GET', link, timeout=5)
                if resp.status >= 400:
                    print(f'警告: 插件 \'{p.get("name", "未知插件")}\' 的链接 \'{link}\' 访问失败，状态码: {resp.status}。将从 Supabase 中删除此插件。')
                    supabase.table("plugins").delete().eq("id", p.get("id")).execute()
                    continue
            except urllib3.exceptions.MaxRetryError:
                print(f'警告: 插件 \'{p.get("name", "未知插件")}\' 的链接 \'{link}\' 访问超时。将从 Supabase 中删除此插件。')
                supabase.table("plugins").delete().eq("id", p.get("id")).execute()
                continue
            except Exception as e:
                print(f'警告: 插件 \'{p.get("name", "未知插件")}\' 的链接 \'{link}\' 访问发生未知错误: {e}。将从 Supabase 中删除此插件。')
                supabase.table("plugins").delete().eq("id", p.get("id")).execute()
                continue
        title = p.get("name") or "未命名插件"
        print(f"插件 {title} 提供的链接可正常访问，继续...")
        details = p.get("description", "").replace("\n", "<br>")
        author = p.get("author", "未知作者")
        version = p.get("version", "未知版本")

        feature_md = f"""        - title: {title}
          details: {details}<br>作者：{author}<br>版本：{version}
          link: {link}
"""
        features_lines.append(feature_md)

    content = header + "".join(features_lines) + "\n---\n"
    
    # 检查文件是否存在，如果存在则删除
    if os.path.exists(output_path):
        os.remove(output_path)
        print(f"已删除现有文件: {output_path}")

    # 确保目录存在
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # 创建空文件并写入内容
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"已生成插件商店页面: {output_path}")

if __name__ == "__main__":
    plugins = fetch_plugins()
    if not plugins:
        print("未获取到插件数据，跳过生成插件商店页面。")
    else:
        generate_md(plugins)
