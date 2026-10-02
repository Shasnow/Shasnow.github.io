import type { GithubUser } from "@/components/strategy/api";
import { exchangeGithubToken, fetchGithubUser } from "@/components/strategy/api";
import { GITHUB_CLIENT_ID, REDIRECT_PATH } from "@/components/strategy/config";
import {
  clearSession,
  consumeOAuthState,
  getToken,
  getUser,
  saveOAuthState,
  saveSession,
} from "@/components/strategy/session";

const OAUTH_ERROR_TEXT: Record<string, string> = {
  access_denied: "您取消了 GitHub 授权",
  redirect_uri_mismatch: "回调地址未在 GitHub 应用中登记",
  application_suspended: "GitHub 应用已被暂停",
};

export interface OAuthCallbackResult {
  ok: boolean;
  message?: string;
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export function getCurrentUser(): GithubUser | null {
  return getUser();
}

/** 生成 URL-safe 的随机 state（CSRF 防护） */
function createOAuthState(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** 回调地址 = 攻略站页面路径（需在 GitHub OAuth 应用中登记） */
function buildRedirectUri(): string {
  return new URL(REDIRECT_PATH, window.location.origin).toString();
}

function buildAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: buildRedirectUri(),
    scope: "read:user user:email",
    state,
    allow_signup: "true",
  });
  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

/** 移除地址栏中的 code/state 等敏感参数 */
function cleanCallbackUrl(): void {
  const url = new URL(window.location.href);
  if (url.search) {
    url.search = "";
    window.history.replaceState(window.history.state, "", url.toString());
  }
}

/** 跳转到 GitHub 授权页面；未配置 Client ID 时返回错误文案 */
export function login(): string | null {
  if (!GITHUB_CLIENT_ID) {
    return "未配置 GitHub Client ID，无法登录";
  }
  const state = createOAuthState();
  saveOAuthState(state);
  window.location.assign(buildAuthorizeUrl(state));
  return null;
}

export function logout(): void {
  clearSession();
}

/**
 * 处理 GitHub 授权回调：校验 state -> 后端换取令牌 -> 获取用户信息 -> 保存会话。
 * 当前地址不带 code/state/error 时返回 null（表示不是回调）。
 */
export async function handleOAuthCallback(): Promise<OAuthCallbackResult | null> {
  const query = new URLSearchParams(window.location.search);
  const code = query.get("code");
  const state = query.get("state");
  const error = query.get("error");

  if (!code && !error) return null;

  cleanCallbackUrl();

  if (error) {
    const description = query.get("error_description");
    return {
      ok: false,
      message: description || OAUTH_ERROR_TEXT[error] || "GitHub 授权失败",
    };
  }
  if (!code || !state) {
    return { ok: false, message: "授权回调参数缺失" };
  }
  if (!consumeOAuthState(state)) {
    return { ok: false, message: "state 校验失败，会话可能已过期，请重新登录" };
  }

  try {
    const { access_token: accessToken } = await exchangeGithubToken(code);
    if (!accessToken) {
      return { ok: false, message: "登录服务未返回访问令牌" };
    }
    let userInfo: GithubUser | null = null;
    try {
      userInfo = await fetchGithubUser(accessToken);
    } catch (err) {
      console.error("Failed to fetch GitHub user info:", err);
      return { ok: false, message: "获取用户信息失败，请稍后重试" };
    }
    saveSession(accessToken, userInfo);
    return { ok: true };
  } catch (err) {
    console.error("GitHub OAuth token exchange failed:", err);
    return { ok: false, message: "登录失败，请稍后重试" };
  }
}