<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  ApiError,
  createStrategy,
  getStrategies,
  getStrategiesByUploader,
  getStrategyDetail,
} from "@/components/strategy/api";
import type { StrategyDetail, StrategyMeta } from "@/components/strategy/api";
import {
  getCurrentUser,
  handleOAuthCallback,
  isAuthenticated,
  login,
  logout,
} from "@/components/strategy/auth";
import { confirmDialog, formatTime, setLoading, showToast } from "@/components/strategy/ui";

/** “我的攻略”每页条数 */
const MY_PAGE_SIZE = 10;

/** 详情弹窗展示的字段与顺序 */
const DETAIL_FIELDS = [
  { label: "title", key: "title" },
  { label: "description", key: "description" },
  { label: "author", key: "author" },
  { label: "uploader", key: "uploader" },
  { label: "share_code", key: "share_code" },
  { label: "min_coins", key: "min_coins" },
  { label: "min_level", key: "min_level" },
  { label: "mid_level", key: "mid_level" },
  { label: "on_field", key: "on_field" },
  { label: "off_field", key: "off_field" },
];

const ICON_INFO =
  "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z";
const ICON_DOWNLOAD =
  "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z";

const user = ref(getCurrentUser());
const authenticated = ref(isAuthenticated());

const strategies = ref<StrategyMeta[]>([]);
const allLoaded = ref(false);
const myStrategies = ref<StrategyMeta[]>([]);
const mineLoaded = ref(false);

const view = ref<"all" | "mine">("all");
const myPage = ref(1);
const myTotal = ref(0);

const detail = ref<StrategyDetail | null>(null);
const uploadFileName = ref("");
const isDragover = ref(false);

const detailDialog = ref<HTMLDialogElement | null>(null);
const uploadDialog = ref<HTMLDialogElement | null>(null);
const uploadInput = ref<HTMLInputElement | null>(null);
const userMenu = ref<HTMLDetailsElement | null>(null);

/** 当前视图对应的列表，两个视图共用同一套卡片渲染 */
const list = computed(() => (view.value === "all" ? strategies.value : myStrategies.value));
const listLoaded = computed(() => (view.value === "all" ? allLoaded.value : mineLoaded.value));
const totalPages = computed(() => Math.max(1, Math.ceil(myTotal.value / MY_PAGE_SIZE)));

function errorMessage(err: unknown, fallback: string): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof DOMException && err.name === "AbortError") return "请求超时，请稍后重试";
  if (err instanceof TypeError) return "网络请求失败，请检查网络后重试";
  return fallback;
}

function refreshAuth(): void {
  user.value = getCurrentUser();
  authenticated.value = isAuthenticated();
}

function fieldValue(key: string): string {
  const value = detail.value?.[key];
  return value == null ? "" : String(value);
}

async function loadAll(): Promise<void> {
  try {
    const data = await getStrategies();
    strategies.value = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to fetch strategies:", err);
    strategies.value = [];
    showToast(errorMessage(err, "加载攻略列表失败"), "error");
  } finally {
    allLoaded.value = true;
  }
}

async function loadMine(page = 1): Promise<void> {
  const uploader = user.value?.name || user.value?.login || "";
  if (!uploader) return;

  setLoading(true, "正在加载我的攻略...");
  try {
    const data = await getStrategiesByUploader({ uploader, page, pageSize: MY_PAGE_SIZE });
    myStrategies.value = Array.isArray(data?.records) ? data.records : [];
    myPage.value = page;
    myTotal.value = Number(data?.total) || myStrategies.value.length;
  } catch (err) {
    console.error("Failed to fetch my strategies:", err);
    myStrategies.value = [];
    myPage.value = 1;
    myTotal.value = 0;
    showToast(errorMessage(err, "加载我的攻略失败"), "error");
  } finally {
    mineLoaded.value = true;
    setLoading(false);
  }
}

function downloadJsonFile(data: unknown, fileName: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

async function download(id: StrategyMeta["id"] | null): Promise<void> {
  if (id == null) return;
  showToast("正在下载攻略...", "info");
  try {
    const data = await getStrategyDetail(id);
    downloadJsonFile(data, `SRAstrategy_${data.title ?? String(id)}.json`);
    showToast("攻略下载成功！", "success");
  } catch (err) {
    console.error("Failed to download strategy:", err);
    showToast(errorMessage(err, "攻略下载失败！"), "error");
  }
}

async function openDetail(id: StrategyMeta["id"]): Promise<void> {
  setLoading(true, "正在加载攻略详情...");
  try {
    detail.value = await getStrategyDetail(id);
    detailDialog.value?.showModal();
  } catch (err) {
    console.error("Failed to fetch strategy detail:", err);
    showToast(errorMessage(err, "加载攻略详情失败"), "error");
  } finally {
    setLoading(false);
  }
}

function closeUploadDialog(): void {
  uploadDialog.value?.close();
  uploadFileName.value = "";
  if (uploadInput.value) uploadInput.value.value = "";
}

async function handleUploadFile(file: File): Promise<void> {
  if (!authenticated.value) {
    showToast("请先完成 GitHub 登录后再上传", "error");
    closeUploadDialog();
    return;
  }
  const isJson = file.type === "application/json" || file.name.toLowerCase().endsWith(".json");
  if (!isJson) {
    showToast("请上传 JSON 文件", "error");
    return;
  }

  uploadFileName.value = `已选择：${file.name}`;
  setLoading(true, "正在上传...");
  try {
    const parsed = JSON.parse(await file.text()) as Record<string, unknown>;
    parsed.uploader = user.value?.name || user.value?.login || "";
    await createStrategy(parsed);
    showToast("上传成功", "success");
    closeUploadDialog();
    if (view.value === "mine") await loadMine(1);
  } catch (err) {
    console.error("Failed to upload strategy:", err);
    showToast(err instanceof SyntaxError ? "JSON 格式不正确" : errorMessage(err, "上传失败"), "error");
  } finally {
    setLoading(false);
  }
}

function onFileChange(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) void handleUploadFile(file);
}

function onDrop(event: DragEvent): void {
  isDragover.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) void handleUploadFile(file);
}

async function requestUpload(): Promise<void> {
  if (!authenticated.value) {
    const confirmed = await confirmDialog("上传攻略需要 GitHub 登录授权，是否前往登录？", {
      title: "需要登录",
      confirmText: "GitHub 登录",
    });
    if (!confirmed) return;
    const message = login();
    if (message) showToast(message, "error");
    return;
  }
  uploadDialog.value?.showModal();
}

function onLogin(): void {
  const message = login();
  if (message) showToast(message, "error");
}

function onLogout(): void {
  logout();
  refreshAuth();
  view.value = "all";
  userMenu.value?.removeAttribute("open");
  showToast("已退出登录", "success");
}

function openMine(): void {
  view.value = "mine";
  void loadMine(1);
}

onMounted(async () => {
  setLoading(true, "正在完成 GitHub 登录...");
  const callback = await handleOAuthCallback();
  setLoading(false);
  if (callback) {
    refreshAuth();
    if (callback.ok) showToast("登录成功", "success");
    else if (callback.message) showToast(callback.message, "error");
  }
  await loadAll();
});
</script>

<template>
  <div class="strategy-toolbar">
    <button v-if="!authenticated" type="button" class="btn btn--primary" @click="onLogin">
      GitHub 登录
    </button>
    <details v-else ref="userMenu" class="user-menu">
      <summary>
        <img class="user-menu__avatar" :src="user?.avatar_url" alt="" />
        <span class="user-menu__name">{{ user?.name || user?.login }}</span>
      </summary>
      <div class="user-menu__list">
        <button type="button" class="user-menu__item" @click="onLogout">退出登录</button>
      </div>
    </details>
    <button type="button" class="btn" @click="requestUpload">上传攻略</button>
    <button v-if="authenticated" type="button" class="btn" @click="openMine">我的攻略</button>
  </div>

  <section v-show="view === 'mine'">
    <div class="my-strategies-header">
      <h2>我的攻略</h2>
      <button type="button" class="btn" @click="view = 'all'">返回全部攻略</button>
    </div>
  </section>

  <section>
    <div class="strategy-list">
      <article v-for="item in list" :key="item.id" class="strategy-card">
        <div class="strategy-card__content">
          <h3 class="strategy-card__title">{{ item.title }}</h3>
          <p class="strategy-card__desc">{{ item.description }}</p>
          <div class="strategy-card__tags">
            <span class="tag tag--primary">上传者：{{ item.uploader }}</span>
            <span class="tag tag--info">上次更新：{{ formatTime(item.updateTime) }}</span>
            <span v-if="item.isPublic" class="tag tag--success">公开</span>
            <span v-else class="tag tag--danger">仅自己可见</span>
          </div>
        </div>
        <div class="strategy-card__actions">
          <button
            type="button"
            class="icon-btn"
            title="详细信息"
            aria-label="详细信息"
            @click="openDetail(item.id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <path :d="ICON_INFO"></path>
            </svg>
          </button>
          <button
            type="button"
            class="icon-btn"
            data-action="download"
            title="下载攻略"
            aria-label="下载攻略"
            @click="download(item.id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <path :d="ICON_DOWNLOAD"></path>
            </svg>
          </button>
        </div>
      </article>
    </div>
    <p v-if="list.length === 0 && listLoaded" class="strategy-empty">
      {{ view === "all" ? "暂无攻略，快来上传第一份吧！" : "你还没有上传过攻略。" }}
    </p>
  </section>

  <div v-if="view === 'mine' && myTotal > MY_PAGE_SIZE" class="strategy-pagination">
    <span class="strategy-pagination__info">
      第 {{ myPage }} / {{ totalPages }} 页 · 共 {{ myTotal }} 条
    </span>
    <button type="button" class="btn" :disabled="myPage <= 1" @click="loadMine(myPage - 1)">
      上一页
    </button>
    <button type="button" class="btn" :disabled="myPage >= totalPages" @click="loadMine(myPage + 1)">
      下一页
    </button>
  </div>

  <dialog ref="detailDialog" class="strategy-dialog">
    <h2 class="strategy-dialog__title">攻略详情</h2>
    <div v-if="detail">
      <div v-for="field in DETAIL_FIELDS" :key="field.key" class="detail-row">
        <span class="detail-label">{{ field.label }}</span>
        <span class="detail-value">{{ fieldValue(field.key) }}</span>
      </div>
    </div>
    <div class="strategy-dialog__footer">
      <button type="button" class="btn" @click="detailDialog?.close()">关闭</button>
      <button type="button" class="btn btn--primary" @click="download(detail?.id ?? null)">
        下载攻略
      </button>
    </div>
  </dialog>

  <dialog ref="uploadDialog" class="strategy-dialog">
    <h2 class="strategy-dialog__title">上传攻略</h2>
    <label
      class="upload-dropzone"
      :class="{ 'is-dragover': isDragover }"
      for="strategy-upload-input"
      @dragover.prevent="isDragover = true"
      @dragleave="isDragover = false"
      @drop.prevent="onDrop"
    >
      <span>拖拽 JSON 文件到此处，或<em>点击选择文件</em></span>
    </label>
    <input
      id="strategy-upload-input"
      ref="uploadInput"
      type="file"
      accept="application/json,.json"
      hidden
      @change="onFileChange"
    />
    <p class="upload-hint">{{ uploadFileName }}</p>
    <div class="strategy-dialog__footer">
      <button type="button" class="btn" @click="closeUploadDialog">取消</button>
    </div>
  </dialog>
</template>