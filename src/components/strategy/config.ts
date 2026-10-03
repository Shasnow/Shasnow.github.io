/** 攻略站（/strategy/）配置。VITE_ 变量均为公开信息，缺省值保证本地与 CI 构建都能工作。 */

/** 后端 API 基地址；本地开发不设置时走 astro.config.mjs 中的 /api 代理 */
export const API_BASE_URL = import.meta.env.DEV ? "/api" : "https://shasnow.top/s/api";

/** GitHub OAuth App 的 Client ID（公开信息） */
export const GITHUB_CLIENT_ID = import.meta.env.VITE_APP_GITHUB_CLIENT_ID || "Iv23liAPKeExYzzMOOPr";

/** OAuth 回调路径，需与 GitHub OAuth App 中登记的地址一致 */
export const REDIRECT_PATH = "/strategy/";

/** 攻略列表请求超时（毫秒） */
export const REQUEST_TIMEOUT = 10000;