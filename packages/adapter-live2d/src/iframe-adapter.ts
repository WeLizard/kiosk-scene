import type {
  AvatarAdapter,
  AvatarAdapterCapabilities,
  AvatarManifestV1,
  ControlCueV1,
  RendererConfigV1,
  StateV1,
  ViewPreset,
} from "@kiosk-scene/core";
import {
  mergeControlCueIntoState,
  sanitizeAvatarManifestV1,
  sanitizeRendererConfigV1,
  sanitizeStateV1,
  trimText,
} from "@kiosk-scene/core";

type QueryValue = string | number | boolean | null | undefined;

interface Live2dBubbleState {
  text: string;
  key: string;
  ttlMs: number;
  speak: boolean;
  typewriter: boolean;
}

interface Live2dLegacyRendererConfig {
  version: 1;
  assistant: {
    name: string;
  };
  links: Record<string, string>;
  state: {
    stateUrl: string;
    idleLinesUrl?: string;
    haApiFallback?: boolean;
  };
  assetPack: {
    modelJson: string;
    fallbackPortrait?: string;
    motionMapUrl?: string;
    presetThumbs?: Record<string, string>;
  };
}

export interface Live2dAdapterOptions {
  manifest?: Partial<AvatarManifestV1>;
  rendererConfig?: Partial<RendererConfigV1>;
  runtimeUrl?: string;
  iframeTitle?: string;
  iframeSandbox?: string;
  targetOrigin?: string;
  displayMode?: boolean;
  query?: Record<string, QueryValue>;
}

const DEFAULT_CUE: ControlCueV1 = {
  cue: null,
  emotion: null,
  motion: null,
  until: null,
};

const DEFAULT_BUBBLE_STATE: Live2dBubbleState = {
  text: "",
  key: "",
  ttlMs: 0,
  speak: true,
  typewriter: true,
};

const RENDERER_READY_TIMEOUT_MS = 15_000;

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function withTrailingSlash(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

function resolveIngressRoot(baseUrl: string): string {
  try {
    const parsed = new URL(baseUrl, window.location.href);
    const match = parsed.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);
    if (!match) {
      return "";
    }
    return new URL(match[0], parsed.origin).toString();
  } catch {
    return "";
  }
}

function resolveUrl(assetRoot: string, candidate: string): string {
  const normalized = trimText(candidate, 1024);
  if (!normalized) {
    return "";
  }
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(normalized)) {
    return normalized;
  }
  if (normalized.startsWith("/")) {
    const ingressRoot = resolveIngressRoot(assetRoot || window.location.href);
    if (ingressRoot) {
      return new URL(normalized.slice(1), ingressRoot).toString();
    }
    const baseOrigin = new URL(window.location.href).origin;
    return new URL(normalized, baseOrigin).toString();
  }
  const base = new URL(withTrailingSlash(trimText(assetRoot, 1024) || "."), window.location.href);
  return new URL(normalized, base).toString();
}

function resolvePageUrl(candidate: string): string {
  const normalized = trimText(candidate, 1024);
  if (!normalized) {
    return "";
  }
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(normalized)) {
    return normalized;
  }
  if (normalized.startsWith("/")) {
    const ingressRoot = resolveIngressRoot(window.location.href);
    if (ingressRoot) {
      return new URL(normalized.slice(1), ingressRoot).toString();
    }
    return new URL(normalized, new URL(window.location.href).origin).toString();
  }
  return new URL(normalized, window.location.href).toString();
}

function resolveRuntimeUrl(options: Live2dAdapterOptions, manifest: AvatarManifestV1, assetRoot: string): string {
  const explicitRuntimeUrl = trimText(options.runtimeUrl, 1024)
    || trimText(manifest.runtimeUrl, 1024);
  if (explicitRuntimeUrl) {
    return resolvePageUrl(explicitRuntimeUrl);
  }
  return new URL("../avatar.html", new URL(withTrailingSlash(trimText(assetRoot, 1024) || "."), window.location.href)).toString();
}

function resolveTargetOrigin(runtimeUrl: string, override?: string): string {
  const explicit = trimText(override, 512);
  if (explicit) {
    return explicit;
  }
  try {
    const parsed = new URL(runtimeUrl, window.location.href);
    return parsed.origin || "*";
  } catch {
    return "*";
  }
}

function resolveSplashText(): string {
  const locale = String(navigator.language || "").toLowerCase();
  return locale.startsWith("ru") ? "Поднимаю рендер аватара…" : "Loading compatibility renderer...";
}

function resolveAssistantFallbackName(localeHint: string): string {
  const locale = String(localeHint || navigator.language || "").toLowerCase();
  return locale.startsWith("ru") ? "Ассистент" : "Assistant";
}

function resolveAvatarFrameTitle(localeHint: string, assistantName: string): string {
  const locale = String(localeHint || navigator.language || "").toLowerCase();
  const normalizedName = trimText(assistantName, 40) || resolveAssistantFallbackName(locale);
  return locale.startsWith("ru") ? `${normalizedName}: аватар` : `${normalizedName} avatar`;
}

function buildRuntimeSrc(runtimeUrl: string, options: Live2dAdapterOptions): string {
  const url = new URL(runtimeUrl, window.location.href);
  const query = { ...(options.query || {}) };
  if (options.displayMode !== false && query.display == null) {
    query.display = true;
  }
  for (const [key, rawValue] of Object.entries(query)) {
    const normalizedKey = trimText(key, 64);
    if (!normalizedKey || rawValue == null) {
      continue;
    }
    const normalizedValue = typeof rawValue === "boolean" ? (rawValue ? "1" : "0") : String(rawValue);
    url.searchParams.set(normalizedKey, normalizedValue);
  }
  return url.toString();
}

function createLegacyRendererConfig(
  rendererConfig: RendererConfigV1,
  manifest: AvatarManifestV1,
  assetRoot: string,
): Live2dLegacyRendererConfig {
  const presetThumbs = Object.fromEntries(
    Object.entries(manifest.presetThumbs || {})
      .map(([key, value]) => [trimText(key, 32), resolveUrl(assetRoot, value)])
      .filter(([key, value]) => key && value),
  );

  return {
    version: 1,
    assistant: {
      name: trimText(rendererConfig.assistant.name, 40) || "Assistant",
    },
    links: Object.fromEntries(
      Object.entries(rendererConfig.links || {})
        .map(([key, value]) => [trimText(key, 64), resolvePageUrl(value)])
        .filter(([key, value]) => key && value),
    ),
    state: {
      stateUrl: resolvePageUrl(rendererConfig.state.stateUrl),
      idleLinesUrl: resolvePageUrl(rendererConfig.state.idleLinesUrl || ""),
      haApiFallback: rendererConfig.state.haApiFallback === true,
    },
    assetPack: {
      modelJson: resolveUrl(assetRoot, trimText(manifest.modelUrl, 1024) || trimText(manifest.entry, 1024)),
      fallbackPortrait: resolveUrl(assetRoot, manifest.fallbackPortrait || ""),
      motionMapUrl: resolveUrl(assetRoot, manifest.motionMapUrl || ""),
      presetThumbs,
    },
  };
}

class Live2dIframeAdapter implements AvatarAdapter {
  readonly id = "live2d";

  private readonly options: Live2dAdapterOptions;
  private readonly manifest: AvatarManifestV1;
  private readonly rendererConfig: RendererConfigV1;
  private host: HTMLElement | null = null;
  private containerEl: HTMLDivElement | null = null;
  private iframeEl: HTMLIFrameElement | null = null;
  private splashEl: HTMLDivElement | null = null;
  private splashTextEl: HTMLDivElement | null = null;
  private assetRoot = "";
  private rendererConfigBlobUrl = "";
  private currentState: StateV1;
  private currentCue: ControlCueV1 = { ...DEFAULT_CUE };
  private currentPreset: ViewPreset = "full";
  private currentBubble: Live2dBubbleState = { ...DEFAULT_BUBBLE_STATE };
  private targetOrigin = "*";
  private isReady = false;
  private bubbleRevision = 0;
  private readyTimeoutHandle: number | null = null;

  constructor(options: Live2dAdapterOptions = {}) {
    this.options = options;
    this.manifest = sanitizeAvatarManifestV1({
      ...(options.manifest || {}),
      adapter: "live2d",
    });
    this.rendererConfig = sanitizeRendererConfigV1(options.rendererConfig || {});
    this.currentState = sanitizeStateV1({}, {
      assistant: this.rendererConfig.assistant.name,
    });
  }

  async mount(context: { host: HTMLElement; assetRoot: string }): Promise<void> {
    await this.dispose();

    this.host = context.host;
    this.host.innerHTML = "";
    this.isReady = false;
    this.assetRoot = trimText(context.assetRoot, 1024) || this.manifest.assetRoot;

    const runtimeUrl = resolveRuntimeUrl(this.options, this.manifest, this.assetRoot);
    const iframeQuery: Record<string, QueryValue> = {
      ...(this.options.query || {}),
    };
    try {
      const runtimeOrigin = new URL(runtimeUrl, window.location.href).origin;
      if (runtimeOrigin === window.location.origin) {
        const legacyConfig = createLegacyRendererConfig(this.rendererConfig, this.manifest, this.assetRoot);
        this.rendererConfigBlobUrl = URL.createObjectURL(
          new Blob([JSON.stringify(legacyConfig)], { type: "application/json" }),
        );
        iframeQuery.rendererConfigUrl = this.rendererConfigBlobUrl;
      }
    } catch {
      this.rendererConfigBlobUrl = "";
    }
    const iframeSrc = buildRuntimeSrc(runtimeUrl, {
      ...this.options,
      query: iframeQuery,
    });
    this.targetOrigin = resolveTargetOrigin(iframeSrc, this.options.targetOrigin);

    const containerEl = document.createElement("div");
    containerEl.className = "ks-live2d-frame";
    Object.assign(containerEl.style, {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      borderRadius: "24px",
      background: "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",
      border: "1px solid rgba(32,48,65,0.08)",
      boxShadow: "0 18px 50px rgba(90,112,132,0.14)",
    });

    const iframeEl = document.createElement("iframe");
    iframeEl.className = "ks-live2d-iframe";
    iframeEl.src = iframeSrc;
    iframeEl.title = trimText(this.options.iframeTitle, 80)
      || resolveAvatarFrameTitle(this.rendererConfig.assistant.locale || "", this.rendererConfig.assistant.name);
    iframeEl.loading = "eager";
    iframeEl.allow = "autoplay";
    Object.assign(iframeEl.style, {
      width: "100%",
      height: "100%",
      border: "0",
      display: "block",
      background: "transparent",
    });
    if (trimText(this.options.iframeSandbox, 255)) {
      iframeEl.setAttribute("sandbox", trimText(this.options.iframeSandbox, 255));
    }

    const splashEl = this.createSplash(this.assetRoot);
    containerEl.append(iframeEl, splashEl);
    this.host.append(containerEl);

    iframeEl.addEventListener("load", () => {
      this.armReadyTimeout();
      this.postRendererConfig();
      void this.flush();
    });

    window.addEventListener("message", this.handleWindowMessage);

    this.containerEl = containerEl;
    this.iframeEl = iframeEl;
    this.splashEl = splashEl;
    this.splashTextEl = splashEl.querySelector("[data-live2d-splash-text]");
  }

  async dispose(): Promise<void> {
    window.removeEventListener("message", this.handleWindowMessage);
    this.isReady = false;
    this.targetOrigin = "*";
    this.assetRoot = "";
    this.clearReadyTimeout();
    if (this.rendererConfigBlobUrl) {
      URL.revokeObjectURL(this.rendererConfigBlobUrl);
      this.rendererConfigBlobUrl = "";
    }
    if (this.host) {
      this.host.innerHTML = "";
    }
    this.host = null;
    this.containerEl = null;
    this.iframeEl = null;
    this.splashEl = null;
    this.splashTextEl = null;
  }

  async setState(state: StateV1): Promise<void> {
    this.currentState = sanitizeStateV1(state, {
      assistant: this.rendererConfig.assistant.name,
    });
    await this.flushState();
  }

  async setCue(cue: ControlCueV1): Promise<void> {
    this.currentCue = {
      cue: trimText(cue?.cue, 32) || null,
      emotion: trimText(cue?.emotion, 32) || null,
      motion: trimText(cue?.motion, 32) || null,
      until: trimText(cue?.until, 64) || null,
    };
    await this.flushState();
  }

  async setViewPreset(preset: ViewPreset): Promise<void> {
    this.currentPreset = preset;
    if (!this.isReady) {
      return;
    }
    this.postMessage({
      type: "neiri-view-preset",
      preset,
    });
  }

  async showBubble(text: string, options?: { ttlMs?: number; speak?: boolean; typewriter?: boolean }): Promise<void> {
    const normalizedText = trimText(text, 255);
    this.currentBubble = {
      text: normalizedText,
      key: normalizedText ? `bubble:${++this.bubbleRevision}` : "",
      ttlMs: Number.isFinite(Number(options?.ttlMs)) ? Math.max(0, Number(options?.ttlMs)) : 0,
      speak: options?.speak !== false,
      typewriter: options?.typewriter !== false,
    };
    if (!this.isReady) {
      return;
    }
    this.postBubble();
  }

  getCapabilities(): AvatarAdapterCapabilities {
    return {
      supportsEmotion: true,
      supportsMotion: true,
      supportsViewPresets: true,
      supportsLipSync: true,
      supportsPointerFocus: true,
    };
  }

  private readonly handleWindowMessage = (event: MessageEvent<unknown>): void => {
    const iframeWindow = this.iframeEl?.contentWindow;
    if (!iframeWindow || event.source !== iframeWindow || !isObjectRecord(event.data)) {
      return;
    }

    const type = trimText(event.data.type, 64);
    if (type === "neiri-renderer-config-request") {
      this.postRendererConfig();
      void this.flush();
      return;
    }

    if (type !== "neiri-avatar-ready") {
      return;
    }

    this.isReady = true;
    this.clearReadyTimeout();
    this.setSplashVisible(false);
    void this.flush();
  };

  private createSplash(assetRoot: string): HTMLDivElement {
    const splashEl = document.createElement("div");
    splashEl.className = "ks-live2d-splash";
    Object.assign(splashEl.style, {
      position: "absolute",
      inset: "0",
      display: "grid",
      placeItems: "center",
      padding: "18px",
      background: "linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",
      transition: "opacity 180ms ease, visibility 180ms ease",
      zIndex: "1",
    });

    const panelEl = document.createElement("div");
    Object.assign(panelEl.style, {
      display: "grid",
      gap: "10px",
      justifyItems: "center",
      padding: "18px 20px",
      minWidth: "190px",
      borderRadius: "20px",
      background: "rgba(255,255,255,0.82)",
      border: "1px solid rgba(32,48,65,0.08)",
      boxShadow: "0 18px 36px rgba(90,112,132,0.14)",
      textAlign: "center",
      backdropFilter: "blur(10px)",
    });

    const titleEl = document.createElement("div");
    titleEl.textContent = trimText(this.rendererConfig.assistant.name, 40)
      || resolveAssistantFallbackName(this.rendererConfig.assistant.locale || "");
    Object.assign(titleEl.style, {
      fontSize: "14px",
      fontWeight: "600",
      color: "#203041",
    });

    const textEl = document.createElement("div");
    textEl.dataset.live2dSplashText = "true";
    textEl.textContent = resolveSplashText();
    Object.assign(textEl.style, {
      fontSize: "12px",
      lineHeight: "1.35",
      color: "rgba(32,48,65,0.72)",
      maxWidth: "220px",
    });

    panelEl.append(titleEl, textEl);
    splashEl.append(panelEl);
    return splashEl;
  }

  private setSplashVisible(visible: boolean): void {
    if (!this.splashEl) {
      return;
    }
    this.splashEl.style.opacity = visible ? "1" : "0";
    this.splashEl.style.visibility = visible ? "visible" : "hidden";
    this.splashEl.style.pointerEvents = visible ? "auto" : "none";
  }

  private clearReadyTimeout(): void {
    if (this.readyTimeoutHandle != null) {
      window.clearTimeout(this.readyTimeoutHandle);
      this.readyTimeoutHandle = null;
    }
  }

  private armReadyTimeout(): void {
    this.clearReadyTimeout();
    this.readyTimeoutHandle = window.setTimeout(() => {
      if (this.isReady) {
        return;
      }
      console.warn("Live2D iframe did not report ready in time; hiding splash guard.");
      this.setSplashVisible(false);
    }, RENDERER_READY_TIMEOUT_MS);
  }

  private getLegacyRendererConfig(): Live2dLegacyRendererConfig | null {
    if (!this.host || !this.assetRoot) {
      return null;
    }
    return createLegacyRendererConfig(this.rendererConfig, this.manifest, this.assetRoot);
  }

  private postRendererConfig(): void {
    const config = this.getLegacyRendererConfig();
    if (!config) {
      return;
    }
    this.postMessage({
      type: "neiri-renderer-config",
      config,
    });
  }

  private async flush(): Promise<void> {
    await this.flushState();
    await this.setViewPreset(this.currentPreset);
    this.postBubble();
  }

  private async flushState(): Promise<void> {
    if (!this.isReady) {
      return;
    }
    const effectiveState = mergeControlCueIntoState(this.currentState, {
      version: 1,
      revision: 0,
      viewPreset: this.currentPreset,
      page: {
        mode: "auto",
        target: null,
        until: null,
      },
      cue: this.currentCue,
    });
    this.postMessage({
      type: "neiri-display-state",
      state: effectiveState,
    });
  }

  private postBubble(): void {
    if (!this.isReady) {
      return;
    }
    this.postMessage({
      type: "neiri-display-bubble",
      text: this.currentBubble.text,
      key: this.currentBubble.key,
      ttlMs: this.currentBubble.ttlMs,
      speak: this.currentBubble.speak,
      typewriter: this.currentBubble.typewriter,
    });
  }

  private postMessage(payload: Record<string, unknown>): void {
    const iframeWindow = this.iframeEl?.contentWindow;
    if (!iframeWindow) {
      return;
    }
    iframeWindow.postMessage(payload, this.targetOrigin);
  }
}

export function createLive2dAdapter(options: Live2dAdapterOptions = {}): AvatarAdapter {
  return new Live2dIframeAdapter(options);
}
