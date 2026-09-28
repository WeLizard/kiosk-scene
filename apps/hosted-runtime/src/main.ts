import {
  bootstrapSceneShellApp,
  createHomeAssistantWeatherReader,
  type BrowserSceneShellApp,
} from "@kiosk-scene/shell-browser";
import { ExtensionRegistry } from "@kiosk-scene/core";
import "@kiosk-scene/shell-browser/styles";
import { loadBootstrap, readJson, resolveBootstrapUrl, resolveHostedUrl, retryBoot } from "./bootstrap";
import { mountNativeEditorShell } from "./editor-mode";
import { loadBootstrapExtensions } from "./kiosk-extensions";
import { buildLabels, buildPresentationCopy, buildPresetLabels, buildWeatherPlaceholder, resolveUiLang } from "./locale";
import { isEditorMode, resolveRuntimeRendererConfigUrl, type HostedRendererConfig } from "./renderer-config";
import { renderStatus } from "./status";

/** Kept for pre-`weather` configs of the original instance; new packs must declare `weather` explicitly. */
const LEGACY_WEATHER_ENTITY = "weather.forecast_home_assistant";

type DisplayPowerMessageType = "kiosk-display-off" | "kiosk-display-on";

interface DisplayPowerMessage {
  type: DisplayPowerMessageType;
  displayOn?: boolean;
  source?: string;
  timestamp?: number;
}

const STRINGS = {
  ru: {
    startingTitle: "Запуск сцены",
    startingBody: "Загружаю bootstrap для размещённой версии kiosk-scene...",
    missingRendererTitle: "Не найден renderer config",
    missingRendererBody: "Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",
    failedTitle: "Сцена не запустилась",
    failedBody: "Не удалось загрузить bootstrap из add-on Kiosk Scene. Повторяю попытку автоматически.",
    retryIn: (seconds: number, attempt: number) => `Попытка ${attempt}, следующая через ${seconds} с.`,
  },
  en: {
    startingTitle: "Starting scene host",
    startingBody: "Loading hosted kiosk-scene bootstrap...",
    missingRendererTitle: "Scene host is missing a renderer config",
    missingRendererBody:
      "The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",
    failedTitle: "Scene host failed to start",
    failedBody: "The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on. Retrying automatically.",
    retryIn: (seconds: number, attempt: number) => `Attempt ${attempt}, next try in ${seconds}s.`,
  },
};

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseDisplayPowerMessage(value: unknown): DisplayPowerMessage | null {
  if (!isObjectRecord(value)) {
    return null;
  }
  const type = String(value.type || "").trim();
  if (type !== "kiosk-display-off" && type !== "kiosk-display-on") {
    return null;
  }
  return {
    type,
    displayOn: value.displayOn === undefined ? type === "kiosk-display-on" : value.displayOn === true,
    source: String(value.source || "").trim() || undefined,
    timestamp: Number.isFinite(Number(value.timestamp)) ? Number(value.timestamp) : undefined,
  };
}

let lastDisplayPowerMessage: DisplayPowerMessage | null = null;
let displayPowerReplayTimer: number | null = null;

function postDisplayPowerMessageToAvatarFrames(message: DisplayPowerMessage): boolean {
  const frames = Array.from(document.querySelectorAll<HTMLIFrameElement>("iframe.ks-live2d-iframe"));
  let delivered = false;
  for (const frame of frames) {
    if (!frame.contentWindow) {
      continue;
    }
    frame.contentWindow.postMessage(message, "*");
    delivered = true;
  }
  return delivered;
}

function scheduleDisplayPowerReplay(attemptsRemaining = 24): void {
  if (displayPowerReplayTimer !== null) {
    window.clearTimeout(displayPowerReplayTimer);
    displayPowerReplayTimer = null;
  }
  if (!lastDisplayPowerMessage) {
    return;
  }
  if (postDisplayPowerMessageToAvatarFrames(lastDisplayPowerMessage) || attemptsRemaining <= 0) {
    return;
  }
  displayPowerReplayTimer = window.setTimeout(() => {
    scheduleDisplayPowerReplay(attemptsRemaining - 1);
  }, 120);
}

window.addEventListener("message", (event) => {
  const message = parseDisplayPowerMessage(event.data);
  if (!message) {
    return;
  }
  lastDisplayPowerMessage = message;
  scheduleDisplayPowerReplay();
});

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

function buildOpenMeteoUrl(source: { latitude: number; longitude: number; timezone?: string }): string {
  const params = new URLSearchParams({
    latitude: String(source.latitude),
    longitude: String(source.longitude),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: source.timezone || "auto",
    forecast_days: "6",
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

const root = document.getElementById("app");
if (!root) {
  throw new Error("Missing #app root element");
}

const lang = resolveUiLang();
const strings = STRINGS[lang];

prepareEditorViewport();
renderStatus(root, strings.startingTitle, strings.startingBody);

async function boot(container: HTMLElement): Promise<BrowserSceneShellApp | null> {
  const bootstrapUrl = resolveBootstrapUrl();
  const bootstrap = await loadBootstrap(bootstrapUrl);
  const packId = String(bootstrap.packId || "").trim();
  const rendererConfigUrl = await resolveRuntimeRendererConfigUrl(bootstrap, bootstrapUrl);
  if (!rendererConfigUrl) {
    renderStatus(
      container,
      strings.missingRendererTitle,
      strings.missingRendererBody,
      JSON.stringify(bootstrap, null, 2),
    );
    return null;
  }
  const runtimeRendererConfig = await readJson<HostedRendererConfig>(rendererConfigUrl);

  document.documentElement.dataset.packId = packId;
  const assistantName = runtimeRendererConfig.assistant?.name || packId || "kiosk-scene";
  document.title = assistantName;

  // Weather sources come from the pack. Only the original instance ("neiri") predates the `weather`
  // block; it keeps its previous Home Assistant entity so existing installs behave identically.
  const weather = runtimeRendererConfig.weather
    ?? (packId.toLowerCase() === "neiri" ? { entity: LEGACY_WEATHER_ENTITY } : undefined);
  const stateApiUrl = String(runtimeRendererConfig.state?.apiUrl || "").trim() || undefined;

  const registry = new ExtensionRegistry();
  const shell = await bootstrapSceneShellApp(container, {
    rendererConfigUrl,
    weatherUrl: "./weather.json",
    weatherReader: weather?.entity || weather?.openMeteo
      ? createHomeAssistantWeatherReader({
        weatherEntity: weather.entity || "",
        openMeteoUrl: weather.openMeteo ? buildOpenMeteoUrl(weather.openMeteo) : undefined,
        locale: lang === "ru" ? "ru-RU" : "en-US",
        iconBaseUrl: "./assets",
        apiUrl: stateApiUrl,
        allowApiFallback: true,
      })
      : undefined,
    iconBaseUrl: "./assets",
    copy: buildPresentationCopy(lang, assistantName),
    labels: buildLabels(lang),
    presetLabels: buildPresetLabels(lang),
    defaultWeather: buildWeatherPlaceholder(lang, weather?.location ?? ""),
    extensions: registry,
  });
  scheduleDisplayPowerReplay();

  // Extensions load in the background: the scene is already on screen and upgrades its `app` pages
  // and widget cards when they arrive.
  void loadBootstrapExtensions(registry, bootstrap, bootstrapUrl);

  try {
    await mountEditorIfRequested();
  } catch (error) {
    // retryBoot will run boot() again: without this the retry would stack a second shell (and a second set of
    // extension services, e.g. a second microphone) on top of this one.
    await shell.dispose();
    await Promise.allSettled(registry.listExtensions().map((extension) => registry.unload(extension.id)));
    throw error;
  }
  return shell;

  async function mountEditorIfRequested(): Promise<void> {
  if (isEditorMode()) {
    await mountNativeEditorShell({
      packId,
      sceneApiUrl: resolveHostedUrl(String(bootstrap.sceneEditorApiUrl || "").trim(), bootstrapUrl),
      sceneAvatarManifestUrl: resolveHostedUrl(String(bootstrap.files?.avatarManifestUrl || "").trim(), bootstrapUrl),
      avatarCatalogUrl: resolveHostedUrl(String(bootstrap.files?.avatarCatalogUrl || "").trim(), bootstrapUrl),
      avatarImportUrl: resolveHostedUrl(String(bootstrap.files?.avatarImportUrl || "").trim(), bootstrapUrl),
      avatarPackApiUrl: resolveHostedUrl(String(bootstrap.files?.avatarPackApiUrl || "").trim(), bootstrapUrl),
      sceneUrl: resolveHostedUrl(String(bootstrap.entryUrl || bootstrap.runtimeBaseUrl || "./").trim(), bootstrapUrl),
    });
    scheduleDisplayPowerReplay();
  }
  }
}

void retryBoot(() => boot(root), {
  onRetry(error, attempt, waitMs) {
    renderStatus(
      root,
      strings.failedTitle,
      `${strings.failedBody} ${strings.retryIn(Math.round(waitMs / 1000), attempt)}`,
      String(error),
    );
  },
}).catch((error) => {
  renderStatus(root, strings.failedTitle, strings.failedBody, String(error));
});

