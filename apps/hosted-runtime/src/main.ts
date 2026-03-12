import {
  bootstrapSceneShellApp,
  createHomeAssistantWeatherReader,
  DEFAULT_SCENE_SHELL_COPY_EN,
  DEFAULT_SCENE_SHELL_LABELS_EN,
  DEFAULT_SCENE_SHELL_PRESET_LABELS_EN,
  type SceneShellLabels,
  type WeatherOverviewPayload,
} from "@kiosk-scene/shell-browser";
import { sanitizeAvatarManifestV1, type AvatarManifestV1 } from "@kiosk-scene/core";
import "@kiosk-scene/shell-browser/styles";
import { mountNativeEditorShell } from "./editor-mode";

interface SceneHostBootstrap {
  success?: boolean;
  packId?: string;
  entryUrl?: string;
  runtimeBaseUrl?: string;
  sceneEditorUrl?: string;
  sceneEditorFormUrl?: string;
  sceneEditorApiUrl?: string;
  files?: {
    rendererConfigUrl?: string;
    sceneConfigUrl?: string;
    entityMapUrl?: string;
    avatarManifestUrl?: string;
    haStatesUrl?: string;
    haStatesStreamUrl?: string;
    avatarCatalogUrl?: string;
    avatarImportUrl?: string;
    avatarPackApiUrl?: string;
  };
  availability?: Record<string, boolean>;
}

interface AvatarCatalogItem {
  id: string;
  name?: string;
  manifestUrl?: string;
  previewUrl?: string;
}

interface AvatarCatalogPayload {
  success?: boolean;
  items?: AvatarCatalogItem[];
}

interface HostedSceneConfig {
  avatar?: {
    packId?: string | null;
  };
}

interface HostedRendererConfig {
  version?: number;
  assistant?: {
    name?: string;
    locale?: string;
  };
  links?: Record<string, string>;
  avatar?: {
    manifestUrl?: string;
  };
  scene?: {
    configUrl?: string;
  };
  state?: {
    provider?: "json" | "ha";
    stateUrl?: string;
    apiUrl?: string;
    haApiFallback?: boolean;
    idleLinesUrl?: string;
    entityMapUrl?: string;
  };
  control?: {
    provider?: "json" | "ha";
    controlUrl?: string;
    apiUrl?: string;
    entityMapUrl?: string;
  };
}

const DEFAULT_BOOTSTRAP_URL = "../scene-api/bootstrap";
const WEATHER_ENTITY = "weather.forecast_home_assistant";
const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6";
const LEGACY_LIVE2D_PREFIX = "/local/live2d/";
const SCENE_LEGACY_LIVE2D_PREFIX = "/scene-legacy/live2d/";

const NEIRI_COPY_RU = {
  ...DEFAULT_SCENE_SHELL_COPY_EN,
  offlineLabel: "Не в сети",
  busyLabel: "Думаю",
  speakingLabel: "Отвечаю",
  idleLabel: "Жду",
  technicalHealthyLabel: "Онлайн",
  messageCaption: "Монолог",
  statusCaption: "Статус",
  modeCaption: "Режим",
  offlineBody: "Нейри временно недоступна.",
  busyBody: "Нейри готовит ответ.",
  idleBody: "Нейри рядом и продолжает работать в фоне.",
};

const NEIRI_LABELS_RU: SceneShellLabels = {
  ...DEFAULT_SCENE_SHELL_LABELS_EN,
  humidity: "Влажность",
  pressure: "Давление",
  wind: "Ветер",
  clouds: "Облачность",
  rangeStamp: "Период",
  pageStamp: "Страница",
  noCardsConfigured: "Карточки ещё не настроены",
  avatarPresetGroup: "Варианты ракурса аватара",
  carouselRegion: "Карусель сцены",
  pagesRegion: "Переключение страниц",
  forecastRangeFallback: "Прогноз на несколько дней",
};

const NEIRI_PRESET_LABELS_RU = {
  ...DEFAULT_SCENE_SHELL_PRESET_LABELS_EN,
  full: "Полный рост",
  torso: "Голова и туловище",
  head: "Только лицо",
};

const NEIRI_DEFAULT_WEATHER_RU: Partial<WeatherOverviewPayload> = {
  title: "Погода",
  location: "Санкт-Петербург",
  todayCaption: "Сегодня",
  todayValue: "7 марта",
  todayLabel: "суббота",
  updatedCaption: "Обновлено",
  updatedAt: "13:52",
  temperature: "4,3",
  unit: "C",
  condition: "Ясно",
  feelsLike: "Ощущается как 1,5°C",
  badgeSummary: "Ясно",
  badgeRange: "6° / 0° сегодня",
  metrics: {
    humidity: "66%",
    pressure: "765 мм рт. ст.",
    wind: "4,1 м/с",
    clouds: "0%",
  },
  forecastTitle: "Недельный ритм",
  forecast: [
    {
      name: "вс",
      dayNumber: "8",
      monthShort: "март",
      note: "Пасмурно",
      max: "4°",
      min: "-1° · 0%",
      icon: "./assets/cloud.svg",
    },
    {
      name: "пн",
      dayNumber: "9",
      monthShort: "март",
      note: "Морось",
      max: "2°",
      min: "0° · 18%",
      icon: "./assets/cloud-rain.svg",
    },
    {
      name: "вт",
      dayNumber: "10",
      monthShort: "март",
      note: "Морось",
      max: "3°",
      min: "0° · 4%",
      icon: "./assets/cloud-rain.svg",
    },
    {
      name: "ср",
      dayNumber: "11",
      monthShort: "март",
      note: "Пасмурно",
      max: "2°",
      min: "1° · 6%",
      icon: "./assets/cloud.svg",
    },
    {
      name: "чт",
      dayNumber: "12",
      monthShort: "март",
      note: "Морось",
      max: "5°",
      min: "1° · 8%",
      icon: "./assets/cloud-rain.svg",
    },
  ],
};

type UiLang = "ru" | "en";

type HostedRuntimeCopy = {
  startingTitle: string;
  startingBody: string;
  missingRendererTitle: string;
  missingRendererBody: string;
  failedTitle: string;
  failedBody: string;
  editorTitle: string;
  editorSubtitle: (packId: string) => string;
  viewOnly: string;
  openForm: string;
  hidePanel: string;
  showPanel: string;
  iframeTitle: string;
};

const COPY: Record<UiLang, HostedRuntimeCopy> = {
  ru: {
    startingTitle: "Запуск сцены",
    startingBody: "Загружаю bootstrap для размещённой версии kiosk-scene...",
    missingRendererTitle: "Не найден renderer config",
    missingRendererBody: "Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",
    failedTitle: "Сцена не запустилась",
    failedBody: "Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",
    editorTitle: "Режим редактора сцены",
    editorSubtitle: (packId: string) =>
      `Pack: ${packId || "default"} · Редактирование поверх живого runtime`,
    viewOnly: "Только просмотр",
    openForm: "Открыть форму",
    hidePanel: "Скрыть панель",
    showPanel: "Показать панель",
    iframeTitle: "Форма редактора сцены",
  },
  en: {
    startingTitle: "Starting scene host",
    startingBody: "Loading hosted kiosk-scene bootstrap...",
    missingRendererTitle: "Scene host is missing a renderer config",
    missingRendererBody:
      "The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",
    failedTitle: "Scene host failed to start",
    failedBody: "The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",
    editorTitle: "Scene Editor Mode",
    editorSubtitle: (packId: string) =>
      `Pack: ${packId || "default"} · Preview-first editing on the live kiosk runtime`,
    viewOnly: "View Only",
    openForm: "Open Form",
    hidePanel: "Hide Panel",
    showPanel: "Show Panel",
    iframeTitle: "Scene editor form",
  },
};

function resolveUiLang(): UiLang {
  const locale = String(navigator.language || "").toLowerCase();
  return locale.startsWith("ru") ? "ru" : "en";
}

function resolveBootstrapUrl(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("bootstrap") || DEFAULT_BOOTSTRAP_URL;
}

function resolveIngressRoot(bootstrapUrl: string): string | null {
  const resolved = new URL(bootstrapUrl, window.location.href);
  const ingressMatch = resolved.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);
  if (ingressMatch) {
    return new URL(ingressMatch[0], resolved.origin).toString();
  }
  for (const marker of ["/scene-api/", "/scene-runtime/", "/scene-editor/"]) {
    const index = resolved.pathname.indexOf(marker);
    if (index >= 0) {
      return new URL(resolved.pathname.slice(0, index + 1), resolved.origin).toString();
    }
  }
  return null;
}

function resolveHostedUrl(value: string, bootstrapUrl: string): string {
  const normalized = remapLegacyHostedUrl(String(value || "").trim(), bootstrapUrl);
  if (!normalized) {
    return "";
  }
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(normalized)) {
    return normalized;
  }

  const bootstrapBase = new URL(bootstrapUrl, window.location.href);
  if (normalized.startsWith("/")) {
    const ingressRoot = resolveIngressRoot(bootstrapUrl);
    if (ingressRoot) {
      return new URL(normalized.slice(1), ingressRoot).toString();
    }
  }
  return new URL(normalized, bootstrapBase).toString();
}

function remapLegacyHostedUrl(value: string, bootstrapUrl: string): string {
  const normalized = String(value || "").trim();
  if (!normalized) {
    return "";
  }
  if (normalized.startsWith(LEGACY_LIVE2D_PREFIX)) {
    return `${SCENE_LEGACY_LIVE2D_PREFIX}${normalized.slice(LEGACY_LIVE2D_PREFIX.length)}`;
  }
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(normalized)) {
    try {
      const parsed = new URL(normalized, new URL(bootstrapUrl, window.location.href));
      if (parsed.pathname.startsWith(LEGACY_LIVE2D_PREFIX)) {
        const relativePath = parsed.pathname.slice(LEGACY_LIVE2D_PREFIX.length);
        const remapped = resolveHostedUrl(
          `${SCENE_LEGACY_LIVE2D_PREFIX}${relativePath}${parsed.search}${parsed.hash}`,
          bootstrapUrl,
        );
        return remapped || normalized;
      }
    } catch {
      return normalized;
    }
  }
  return normalized;
}

function normalizeHostedAvatarManifest(
  manifest: AvatarManifestV1,
  manifestUrl: string,
): AvatarManifestV1 {
  const normalized = sanitizeAvatarManifestV1(manifest);
  const sharedLive2dRuntimeUrl = normalized.adapter === "live2d"
    ? resolveHostedUrl("../../scene-runtime/avatar.html", manifestUrl)
    : "";
  const assetRoot = resolveHostedUrl(String(normalized.assetRoot || "").trim(), manifestUrl);
  const remapHostedAssetValue = (value: string): string => {
    const normalizedValue = String(value || "").trim();
    if (!normalizedValue) {
      return "";
    }
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(normalizedValue) || normalizedValue.startsWith("/")) {
      return resolveHostedUrl(normalizedValue, manifestUrl);
    }
    return normalizedValue;
  };
  const remapManifestValue = (value: string): string => {
    const normalizedValue = String(value || "").trim();
    if (!normalizedValue) {
      return "";
    }
    return resolveHostedUrl(normalizedValue, manifestUrl);
  };
  const presetThumbs = Object.fromEntries(
    Object.entries(normalized.presetThumbs || {})
      .map(([key, value]) => [key, resolveHostedUrl(String(value || ""), manifestUrl)])
      .filter(([, value]) => Boolean(value)),
  );

  return {
    ...normalized,
    assetRoot,
    runtimeUrl: sharedLive2dRuntimeUrl || resolveHostedUrl(String(normalized.runtimeUrl || "").trim(), manifestUrl),
    entry: remapHostedAssetValue(String(normalized.entry || "").trim()),
    modelUrl: remapHostedAssetValue(String(normalized.modelUrl || "").trim()),
    fallbackPortrait: remapHostedAssetValue(String(normalized.fallbackPortrait || "").trim()),
    motionMapUrl: remapManifestValue(String(normalized.motionMapUrl || "").trim()),
    presetThumbs,
  };
}

function renderStatus(root: HTMLElement, title: string, body: string, details?: string): void {
  root.innerHTML = `
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${title}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${body}</p>
        ${details ? `<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${details}</pre>` : ""}
      </div>
    </section>
  `;
}

function isEditorMode(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.get("editor") === "1";
}

function applyRuntimeSurfaceClass(): void {
  document.body.classList.toggle("ks-display-runtime", !isEditorMode());
  document.body.classList.toggle("ks-editor-runtime", isEditorMode());
}

function prepareEditorViewport(): void {
  if (!isEditorMode()) {
    return;
  }
  const resetScroll = (): void => window.scrollTo(0, 0);
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  resetScroll();
  window.addEventListener("pageshow", resetScroll, { once: true });
  window.addEventListener("load", resetScroll, { once: true });
  window.requestAnimationFrame(() => {
    resetScroll();
    window.setTimeout(resetScroll, 120);
  });
  let userInteracted = false;
  const stopGuard = (): void => {
    userInteracted = true;
  };
  const interactionEvents = ["pointerdown", "wheel", "touchstart", "keydown"] as const;
  for (const eventName of interactionEvents) {
    window.addEventListener(eventName, stopGuard, { once: true, passive: true });
  }
  let attempts = 0;
  const guardTimer = window.setInterval(() => {
    if (userInteracted || attempts >= 24) {
      window.clearInterval(guardTimer);
      return;
    }
    resetScroll();
    attempts += 1;
  }, 80);
}

function mountEditorShell(options: {
  packId: string;
  editorFormUrl: string;
  editorApiUrl: string;
  sceneUrl: string;
}): void {
  const copy = COPY[resolveUiLang()];
  const existing = document.getElementById("scene-editor-shell");
  if (existing) {
    existing.remove();
  }

  const wrapper = document.createElement("aside");
  wrapper.id = "scene-editor-shell";
  wrapper.innerHTML = `
    <style>
      #scene-editor-shell {
        position: fixed;
        top: 18px;
        right: 18px;
        bottom: 18px;
        width: min(460px, calc(100vw - 36px));
        z-index: 30;
        display: grid;
        grid-template-rows: auto 1fr;
        border-radius: 28px;
        border: 1px solid rgba(32, 48, 65, 0.12);
        background: rgba(244, 249, 252, 0.78);
        box-shadow: 0 26px 80px rgba(46, 72, 94, 0.26);
        backdrop-filter: blur(18px);
        overflow: hidden;
      }

      #scene-editor-shell[data-collapsed="true"] {
        width: auto;
        bottom: auto;
        background: transparent;
        border: 0;
        box-shadow: none;
        backdrop-filter: none;
        overflow: visible;
      }

      #scene-editor-shell[data-collapsed="true"] .scene-editor-panel {
        display: none;
      }

      #scene-editor-shell .scene-editor-topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 14px 16px;
        border-bottom: 1px solid rgba(32, 48, 65, 0.08);
        background: linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.52));
      }

      #scene-editor-shell[data-collapsed="true"] .scene-editor-topbar {
        border: 0;
        padding: 0;
        background: transparent;
      }

      #scene-editor-shell .scene-editor-title {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      #scene-editor-shell .scene-editor-title strong {
        font: 600 15px/1.1 "Aptos", "Segoe UI", sans-serif;
        color: #203041;
        letter-spacing: -0.02em;
      }

      #scene-editor-shell .scene-editor-title span {
        font: 12px/1.3 "Aptos", "Segoe UI", sans-serif;
        color: rgba(32, 48, 65, 0.68);
      }

      #scene-editor-shell .scene-editor-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      #scene-editor-shell .scene-editor-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 0 14px;
        border-radius: 999px;
        border: 1px solid rgba(62, 98, 122, 0.18);
        background: rgba(255,255,255,0.86);
        color: #203041;
        text-decoration: none;
        font: 13px/1 "Aptos", "Segoe UI", sans-serif;
        cursor: pointer;
      }

      #scene-editor-shell .scene-editor-button.is-accent {
        background: linear-gradient(180deg, rgba(111, 191, 162, 0.22), rgba(111, 191, 162, 0.12));
        border-color: rgba(77, 147, 121, 0.28);
      }

      #scene-editor-shell .scene-editor-panel {
        min-height: 0;
        background: rgba(248, 251, 253, 0.92);
      }

      #scene-editor-shell .scene-editor-frame {
        width: 100%;
        height: 100%;
        border: 0;
        background: transparent;
      }
    </style>
    <div class="scene-editor-topbar">
      <div class="scene-editor-title">
        <strong>${copy.editorTitle}</strong>
        <span>${copy.editorSubtitle(options.packId || "default")}</span>
      </div>
      <div class="scene-editor-actions">
        <a class="scene-editor-button" href="${options.sceneUrl}">${copy.viewOnly}</a>
        <a class="scene-editor-button" href="${options.editorFormUrl}" target="_blank" rel="noreferrer">${copy.openForm}</a>
        <button class="scene-editor-button is-accent" type="button" data-scene-editor-toggle>${copy.hidePanel}</button>
      </div>
    </div>
    <div class="scene-editor-panel">
      <iframe class="scene-editor-frame" src="${options.editorFormUrl}" title="${copy.iframeTitle}"></iframe>
    </div>
  `;

  document.body.appendChild(wrapper);

  const toggleButton = wrapper.querySelector<HTMLButtonElement>("[data-scene-editor-toggle]");
  toggleButton?.addEventListener("click", () => {
    const collapsed = wrapper.dataset.collapsed === "true";
    wrapper.dataset.collapsed = collapsed ? "false" : "true";
    if (toggleButton) {
      toggleButton.textContent = collapsed ? copy.hidePanel : copy.showPanel;
    }
  });

  document.documentElement.dataset.editorMode = "true";
  document.body.dataset.editorMode = "true";
  document.body.style.overflow = "hidden";
  if (options.editorApiUrl) {
    document.documentElement.dataset.editorApiUrl = options.editorApiUrl;
  }
}

async function loadBootstrap(url: string): Promise<SceneHostBootstrap> {
  const response = await fetch(url, { cache: "no-store" });
  const payload = await response.json() as SceneHostBootstrap;
  if (!response.ok || payload.success === false) {
    throw new Error(`Failed to load ${url}: HTTP ${response.status}`);
  }
  return payload;
}

async function readJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: HTTP ${response.status}`);
  }
  return response.json() as Promise<T>;
}

function absolutizeRendererConfig(config: HostedRendererConfig, rendererConfigUrl: string): HostedRendererConfig {
  return {
    ...config,
    links: Object.fromEntries(
      Object.entries(config.links || {})
        .map(([key, value]) => [key, resolveHostedUrl(value, rendererConfigUrl)])
        .filter(([, value]) => Boolean(value)),
    ),
    avatar: {
      manifestUrl: resolveHostedUrl(String(config.avatar?.manifestUrl || "").trim(), rendererConfigUrl),
    },
    scene: {
      configUrl: resolveHostedUrl(String(config.scene?.configUrl || "").trim(), rendererConfigUrl),
    },
    state: {
      provider: config.state?.provider || "json",
      stateUrl: resolveHostedUrl(String(config.state?.stateUrl || "").trim(), rendererConfigUrl),
      apiUrl: resolveHostedUrl(String(config.state?.apiUrl || "").trim(), rendererConfigUrl) || undefined,
      haApiFallback: config.state?.haApiFallback === true,
      idleLinesUrl: resolveHostedUrl(String(config.state?.idleLinesUrl || "").trim(), rendererConfigUrl),
      entityMapUrl: resolveHostedUrl(String(config.state?.entityMapUrl || "").trim(), rendererConfigUrl),
    },
    control: {
      provider: config.control?.provider || "json",
      controlUrl: resolveHostedUrl(String(config.control?.controlUrl || "").trim(), rendererConfigUrl),
      apiUrl: resolveHostedUrl(String(config.control?.apiUrl || "").trim(), rendererConfigUrl) || undefined,
      entityMapUrl: resolveHostedUrl(String(config.control?.entityMapUrl || "").trim(), rendererConfigUrl) || undefined,
    },
  };
}

async function resolveRuntimeRendererConfigUrl(
  bootstrap: SceneHostBootstrap,
  bootstrapUrl: string,
): Promise<string> {
  const rendererConfigUrl = resolveHostedUrl(
    String(bootstrap.files?.rendererConfigUrl || "").trim(),
    bootstrapUrl,
  );
  if (!rendererConfigUrl) {
    return "";
  }

  const sceneConfigUrl = resolveHostedUrl(
    String(bootstrap.files?.sceneConfigUrl || "").trim(),
    bootstrapUrl,
  );
  const avatarCatalogUrl = resolveHostedUrl(
    String(bootstrap.files?.avatarCatalogUrl || "").trim(),
    bootstrapUrl,
  );
  let selectedAvatarPackId = "";
  if (sceneConfigUrl && avatarCatalogUrl) {
    try {
      const sceneConfig = await readJson<HostedSceneConfig>(sceneConfigUrl);
      selectedAvatarPackId = String(sceneConfig.avatar?.packId || "").trim();
    } catch {
      selectedAvatarPackId = "";
    }
  }

  let selectedAvatarManifestUrl = "";
  if (selectedAvatarPackId && avatarCatalogUrl) {
    try {
      const avatarCatalog = await readJson<AvatarCatalogPayload>(avatarCatalogUrl);
      const selectedAvatar = Array.isArray(avatarCatalog.items)
        ? avatarCatalog.items.find((item) => String(item.id || "").trim() === selectedAvatarPackId)
        : null;
      selectedAvatarManifestUrl = resolveHostedUrl(String(selectedAvatar?.manifestUrl || "").trim(), bootstrapUrl);
    } catch {
      selectedAvatarManifestUrl = "";
    }
  }

  const rendererConfig = absolutizeRendererConfig(
    await readJson<HostedRendererConfig>(rendererConfigUrl),
    rendererConfigUrl,
  );
  if (sceneConfigUrl) {
    rendererConfig.scene = {
      ...(rendererConfig.scene || {}),
      configUrl: sceneConfigUrl,
    };
  }
  const haStatesUrl = resolveHostedUrl(
    String(bootstrap.files?.haStatesUrl || "").trim(),
    bootstrapUrl,
  );
  if (haStatesUrl) {
    rendererConfig.state = {
      ...(rendererConfig.state || {}),
      apiUrl: rendererConfig.state?.apiUrl || haStatesUrl,
    };
    rendererConfig.control = {
      ...(rendererConfig.control || {}),
      apiUrl: rendererConfig.control?.apiUrl || haStatesUrl,
    };
  }
  const activeAvatarManifestUrl = selectedAvatarManifestUrl || String(rendererConfig.avatar?.manifestUrl || "").trim();
  if (!activeAvatarManifestUrl) {
    return URL.createObjectURL(
      new Blob([JSON.stringify(rendererConfig)], { type: "application/json" }),
    );
  }

  const resolvedAvatarManifestUrl = resolveHostedUrl(activeAvatarManifestUrl, bootstrapUrl);
  const normalizedAvatarManifest = normalizeHostedAvatarManifest(
    await readJson<AvatarManifestV1>(resolvedAvatarManifestUrl),
    resolvedAvatarManifestUrl,
  );
  const avatarManifestBlobUrl = URL.createObjectURL(
    new Blob([JSON.stringify(normalizedAvatarManifest)], { type: "application/json" }),
  );

  const overriddenConfig: HostedRendererConfig = {
    ...rendererConfig,
    avatar: {
      manifestUrl: avatarManifestBlobUrl,
    },
  };

  return URL.createObjectURL(
    new Blob([JSON.stringify(overriddenConfig)], { type: "application/json" }),
  );
}

const root = document.getElementById("app");
if (!root) {
  throw new Error("Missing #app root element");
}

const copy = COPY[resolveUiLang()];

applyRuntimeSurfaceClass();
prepareEditorViewport();
renderStatus(root, copy.startingTitle, copy.startingBody);

void (async () => {
  const bootstrapUrl = resolveBootstrapUrl();
  try {
    const bootstrap = await loadBootstrap(bootstrapUrl);
    const packId = String(bootstrap.packId || "").trim();
    const isNeiriPack = packId.toLowerCase() === "neiri";
    const rendererConfigUrl = await resolveRuntimeRendererConfigUrl(bootstrap, bootstrapUrl);
    const runtimeRendererConfig = rendererConfigUrl
      ? await readJson<HostedRendererConfig>(rendererConfigUrl)
      : null;
    if (!rendererConfigUrl) {
      renderStatus(
        root,
        copy.missingRendererTitle,
        copy.missingRendererBody,
        JSON.stringify(bootstrap, null, 2),
      );
      return;
    }

    document.documentElement.dataset.packId = packId;
    document.title = isNeiriPack
      ? "Нейри"
      : (packId ? `kiosk-scene hosted runtime (${packId})` : "kiosk-scene hosted runtime");

    await bootstrapSceneShellApp(root, {
      rendererConfigUrl,
      stateStreamUrl: resolveHostedUrl(
        String(bootstrap.files?.haStatesStreamUrl || "").trim(),
        bootstrapUrl,
      ) || undefined,
      weatherUrl: isNeiriPack ? "./weather.json" : undefined,
      weatherReader: isNeiriPack
        ? createHomeAssistantWeatherReader({
            weatherEntity: WEATHER_ENTITY,
            openMeteoUrl: OPEN_METEO_URL,
            locale: "ru-RU",
            iconBaseUrl: "./assets",
            apiUrl: String(runtimeRendererConfig?.state?.apiUrl || "").trim() || undefined,
            allowApiFallback: true,
          })
        : undefined,
      iconBaseUrl: "./assets",
      copy: isNeiriPack ? NEIRI_COPY_RU : undefined,
      labels: isNeiriPack ? NEIRI_LABELS_RU : undefined,
      presetLabels: isNeiriPack ? NEIRI_PRESET_LABELS_RU : undefined,
      defaultWeather: isNeiriPack ? NEIRI_DEFAULT_WEATHER_RU : undefined,
    });

    if (isEditorMode()) {
      await mountNativeEditorShell({
        packId,
        sceneApiUrl: resolveHostedUrl(
          String(bootstrap.sceneEditorApiUrl || "").trim(),
          bootstrapUrl,
        ),
        sceneAvatarManifestUrl: resolveHostedUrl(
          String(bootstrap.files?.avatarManifestUrl || "").trim(),
          bootstrapUrl,
        ),
        avatarCatalogUrl: resolveHostedUrl(
          String(bootstrap.files?.avatarCatalogUrl || "").trim(),
          bootstrapUrl,
        ),
        avatarImportUrl: resolveHostedUrl(
          String(bootstrap.files?.avatarImportUrl || "").trim(),
          bootstrapUrl,
        ),
        avatarPackApiUrl: resolveHostedUrl(
          String(bootstrap.files?.avatarPackApiUrl || "").trim(),
          bootstrapUrl,
        ),
        sceneUrl: resolveHostedUrl(
          String(bootstrap.entryUrl || bootstrap.runtimeBaseUrl || "./").trim(),
          bootstrapUrl,
        ),
      });
    }
  } catch (error) {
    renderStatus(
      root,
      copy.failedTitle,
      copy.failedBody,
      String(error),
    );
  }
})();
