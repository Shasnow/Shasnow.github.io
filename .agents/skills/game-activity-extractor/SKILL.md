---
name: "game-activity-extractor"
description: "Extracts game version activity info from URLs or images and outputs structured JSON. Invoke when user provides an article URL or image and asks to extract version activity info."
---

# Game Activity Extractor

Extract game version activity information from announcement articles (URLs or images) and output structured JSON.

## When to Invoke

- User provides a URL (e.g., miyoushe.com, bilibili.com) or an uploaded image containing a game version update announcement
- User asks to extract version activity information / 活动信息 from an article or image
- User asks to output game activity data in JSON format

## Workflow Steps

### Step 1: Fetch Source Content

- If the input is a **URL**: Use `WebFetch` to retrieve the article content.
- If the input is an **uploaded image**: Use `Read` with the image file path to extract all visible text (activity names, date ranges, reward amounts, category labels, etc.).

### Step 2: Identify Version-Level Information

Extract or infer the following version-level fields:

| Field         | Description                                    | How to Determine                                              |
| ------------- | ---------------------------------------------- | ------------------------------------------------------------- |
| `version`     | Version number (e.g., "4.4", "3.5")            | Usually stated in the article title or header                 |
| `versionName` | Version subtitle/name (e.g., "鸣笛于归寂之时") | Usually in quotes in the article title                        |
| `startTime`   | Version start time (ISO 8601)                  | Maintenance/update start time stated in the article           |
| `endTime`     | Version end time (ISO 8601)                    | Explicitly stated, or inferred from version cycle (\~42 days) |
| `cover`       | Version cover image URL                        | Leave empty string `""` if not available                      |

### Step 3: Identify Activities to Include

**Include** the following types of activities:

- Version limited-time events (版本限时活动)
- Sign-in events (签到活动)
- Combat/challenge events (战斗挑战活动)
- Exploration events (区域探索活动)
- Version-rotating challenges (版本轮换挑战)

**Exclude** the following types of content:

- 网页活动 (Web/H5 events) — explicitly labeled as web events
- 角色卡池/祈愿/唤取/棋盘 (Character banners/gacha)
- 武器卡池/弧盘研募 (Weapon banners/gacha)
- 永久开放内容 (Permanently available content — story quests, new regions, permanent game modes)
- 商城上架内容 (Shop items — costumes, vehicles, houses)
- 补偿邮件 (Compensation mail)
- 版本更新公告本身 (The version update notice itself)
- 新手活动 (New player activities, unless they are version-limited)

**Preserve ongoing activities from previous versions:** When updating an existing game's JSON file, check the previous version's activities. If any activity's `endTime` is after the new version's `startTime`, that activity is still ongoing and **must be kept** in the updated JSON, even if the new version introduces a replacement activity of the same type.

### Step 4: Extract Activity-Level Fields

For each included activity, extract:

| Field         | Description                    | How to Determine                                                                                                          |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `name`        | Activity name                  | Use exact text from the article, including special characters like 「」・·                                                |
| `description` | Activity description           | Use the descriptive text from the article. If no description is provided, summarize the activity purpose in one sentence. |
| `startTime`   | Activity start time (ISO 8601) | See "Time Format Rules" below                                                                                             |
| `endTime`     | Activity end time (ISO 8601)   | See "Time Format Rules" below                                                                                             |
| `cover`       | Activity cover image URL       | Leave empty string `""` if not available. For recurring activities with fixed covers (see below), use the fixed cover URL |

#### Fixed Covers for Recurring Activities

These are the fixed covers for recurring activities:

| Activity Prefix | Cover URL                                                                         |
| --------------- | --------------------------------------------------------------------------------- |
| 异相仲裁        | `https://i0.hdslb.com/bfs/new_dyn/0869ac215b041b4bbab8197c9c44cef71340190821.jpg` |
| 末日幻影        | `https://i0.hdslb.com/bfs/article/839c3f2ba8ffc2b63b4cd209f8f989041340190821.jpg` |
| 虚构叙事        | `https://i0.hdslb.com/bfs/new_dyn/13e21e998566cef8e41f4ae287c17fc11340190821.jpg` |
| 异器盈界        | `https://i0.hdslb.com/bfs/new_dyn/125f62a2238e44ea5a0ae7278b4029501340190821.png` |
| 花藏繁生        | `https://i0.hdslb.com/bfs/new_dyn/5cf1083cdeaabb38eb94d30ab2b6a2e51340190821.png` |
| 位面分裂        | `https://i0.hdslb.com/bfs/new_dyn/234306c260be1c80654431efe81c6ce81340190821.png` |
| 砺行修远        | `https://i0.hdslb.com/bfs/new_dyn/c05ee2327918f3e4271db3ff66ce2026401742377.jpg` |

### Step 5: Time Format Rules

**General rules:**

- All times must be in **ISO 8601 format**: `YYYY-MM-DDTHH:mm:ss`
- All times are in **Asia/Shanghai timezone (UTC+8)** unless the article specifies otherwise
- The article usually states times as "服务器时间" (server time), which defaults to UTC+8
- **End times must use the last second of the minute** (e.g., `03:59:59` instead of `03:59:00`).

**Converting relative time references:**

| Article Text                                | How to Convert                                                                                    |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| "X版本更新后"                               | Use the version maintenance completion time (e.g., if maintenance is 06:00-11:00, use 11:00:00)   |
| "X版本结束（前）"                           | Use the version end time                                                                          |
| "永久开放"                                  | **Exclude** this activity — it's not a limited-time event                                         |
| "Y版本结束前" (references a future version) | Search the web for that version's end date, then use it. If not found, note it as an estimate.    |
| "活动期间" with no dates                    | If version-period aligned, use version start/end. If no dates at all, note it in the explanation. |

**Common game time conventions:**

| Game                               | Daily Reset | Version Update Time             | Version End Time     |
| ---------------------------------- | ----------- | ------------------------------- | -------------------- |
| Genshin Impact (原神)              | 04:00       | \~06:00 after maintenance       | \~06:00 next version |
| Honkai: Star Rail (崩坏：星穹铁道) | 04:00       | \~06:00 after maintenance       | \~06:00 next version |
| Zenless Zone Zero (绝区零)         | 04:00       | \~06:00-11:00 after maintenance | \~06:00 next version |
| Wuthering Waves (鸣潮)             | 04:00       | \~04:00-11:00 after maintenance | \~03:59 next version |
| Neverness To Eeverness (异环)      | 05:00       | \~06:00-11:00 after maintenance | \~05:59 next version |

### Step 6: Output JSON

Output the final result as a JSON code block with the following structure:

```json
{
  "version": "X.X",
  "versionName": "版本副标题",
  "startTime": "YYYY-MM-DDTHH:mm:ss",
  "endTime": "YYYY-MM-DDTHH:mm:ss",
  "cover": "",
  "activities": [
    {
      "name": "活动名称",
      "description": "活动描述",
      "startTime": "YYYY-MM-DDTHH:mm:ss",
      "endTime": "YYYY-MM-DDTHH:mm:ss",
      "cover": ""
    }
  ]
}
```

### Step 7: Provide Explanations

After the JSON output, provide a brief **说明** (explanation) section covering:

1. **Version time**: How the version start/end times were determined
2. **Excluded items**: List what was excluded and why (e.g., web events, gacha, permanent content)
3. **Time notes**: Explain any time assumptions or conversions made (e.g., "3.5版本更新后" was converted to 11:00 as the maintenance completion time)
4. **Estimated dates**: If any dates were estimated (e.g., referencing a future version's end date), note that the actual date should be confirmed with official announcements

## Additional Rules

- **Language matching**: All output (JSON values, descriptions, explanations) must be in the same language as the source article (typically Chinese for miyoushe.com/bilibili.com articles).
- **Description text**: Use the article's original descriptive text verbatim when available. If the article doesn't provide a description, write a concise one-sentence summary.
- **Cover field**: Leave as empty string `""` unless a specific cover image URL is available for that activity.
- **Ordering**: List activities in chronological order by start time.
- **No fabrication**: Do not invent dates, times, or descriptions not present in or reasonably inferable from the source material. If information is missing, note it in the explanation.
