import type { AvatarAdapter, AvatarAdapterCapabilities, ControlCueV1, StateV1, ViewPreset } from "@kiosk-scene/core";

export interface StaticViewPreset {
  scale: number;
  x: number;
  y: number;
}

export interface StaticAdapterOptions {
  alt?: string;
  imageUrl?: string;
  fallbackImageUrl?: string;
  viewPresets?: Record<string, StaticViewPreset>;
}

export const staticCapabilities: AvatarAdapterCapabilities = {
  supportsEmotion: false,
  supportsMotion: false,
  supportsViewPresets: true,
  supportsLipSync: false,
  supportsPointerFocus: false,
};

const DEFAULT_VIEW_PRESETS: Record<string, StaticViewPreset> = {
  full: { scale: 1, x: 0, y: 0 },
  torso: { scale: 1.25, x: 0, y: 16 },
  head: { scale: 1.5, x: 0, y: 28 },
};

class StaticAvatarAdapter implements AvatarAdapter {
  readonly id = "static";

  private readonly options: StaticAdapterOptions;
  private host: HTMLElement | null = null;
  private frameEl: HTMLDivElement | null = null;
  private imageEl: HTMLImageElement | null = null;
  private bubbleEl: HTMLDivElement | null = null;
  private fallbackEl: HTMLDivElement | null = null;
  private currentPreset: ViewPreset = "full";

  constructor(options: StaticAdapterOptions = {}) {
    this.options = options;
  }

  async mount(context: { host: HTMLElement; assetRoot: string }): Promise<void> {
    this.host = context.host;
    this.host.innerHTML = "";

    const frameEl = document.createElement("div");
    frameEl.className = "ks-static-avatar";
    Object.assign(frameEl.style, {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      borderRadius: "24px",
      background: "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",
      border: "1px solid rgba(32,48,65,0.08)",
    });

    const imageEl = document.createElement("img");
    imageEl.className = "ks-static-avatar-image";
    Object.assign(imageEl.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center bottom",
      transformOrigin: "50% 60%",
      transition: "transform 180ms ease, opacity 180ms ease",
      filter: "drop-shadow(0 24px 36px rgba(90,112,132,0.16))",
    });
    imageEl.alt = this.options.alt || "Avatar";

    const fallbackEl = document.createElement("div");
    fallbackEl.className = "ks-static-avatar-fallback";
    fallbackEl.textContent = this.options.alt || "Avatar";
    Object.assign(fallbackEl.style, {
      position: "absolute",
      inset: "18px",
      display: "grid",
      placeItems: "center",
      borderRadius: "20px",
      color: "rgba(32,48,65,0.72)",
      fontSize: "14px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      border: "1px dashed rgba(32,48,65,0.18)",
      background: "rgba(255,255,255,0.42)",
    });

    const bubbleEl = document.createElement("div");
    bubbleEl.className = "ks-static-avatar-bubble";
    Object.assign(bubbleEl.style, {
      position: "absolute",
      left: "18px",
      right: "18px",
      bottom: "18px",
      padding: "12px 14px",
      borderRadius: "18px",
      background: "rgba(255,255,255,0.84)",
      color: "#203041",
      fontSize: "13px",
      lineHeight: "1.35",
      border: "1px solid rgba(32,48,65,0.08)",
      boxShadow: "0 10px 24px rgba(90,112,132,0.12)",
      backdropFilter: "blur(12px)",
      opacity: "0",
      transform: "translateY(8px)",
      transition: "opacity 140ms ease, transform 140ms ease",
      pointerEvents: "none",
    });

    frameEl.append(imageEl, fallbackEl, bubbleEl);
    this.host.append(frameEl);

    this.frameEl = frameEl;
    this.imageEl = imageEl;
    this.bubbleEl = bubbleEl;
    this.fallbackEl = fallbackEl;

    const imageUrl = this.resolveImageUrl(context.assetRoot);
    if (imageUrl) {
      imageEl.src = imageUrl;
      imageEl.addEventListener("load", () => {
        if (this.fallbackEl) {
          this.fallbackEl.style.display = "none";
        }
      }, { once: true });
      imageEl.addEventListener("error", () => {
        if (this.fallbackEl) {
          this.fallbackEl.style.display = "grid";
        }
      }, { once: true });
    }

    await this.setViewPreset("full");
  }

  async dispose(): Promise<void> {
    if (this.host) {
      this.host.innerHTML = "";
    }
    this.host = null;
    this.frameEl = null;
    this.imageEl = null;
    this.bubbleEl = null;
    this.fallbackEl = null;
  }

  async setState(state: StateV1): Promise<void> {
    if (!this.frameEl) {
      return;
    }
    this.frameEl.dataset.online = state.online === false ? "false" : "true";
    this.frameEl.dataset.busy = state.busy ? "true" : "false";
    this.frameEl.dataset.emotion = String(state.emotion || "");
    this.frameEl.dataset.motion = String(state.motion || "");
    this.frameEl.style.opacity = state.online === false ? "0.76" : "1";
  }

  async setCue(cue: ControlCueV1): Promise<void> {
    if (!this.frameEl) {
      return;
    }
    this.frameEl.dataset.cueEmotion = String(cue.emotion || "");
    this.frameEl.dataset.cueMotion = String(cue.motion || "");
  }

  async setViewPreset(preset: ViewPreset): Promise<void> {
    this.currentPreset = preset;
    const presetMap = this.options.viewPresets || DEFAULT_VIEW_PRESETS;
    const view = presetMap[preset] || presetMap.full || DEFAULT_VIEW_PRESETS.full;
    if (this.imageEl) {
      this.imageEl.style.transform = `translate(${Number(view.x) || 0}px, ${Number(view.y) || 0}px) scale(${Number(view.scale) || 1})`;
    }
    if (this.frameEl) {
      this.frameEl.dataset.preset = preset;
    }
  }

  async showBubble(text: string, options?: { ttlMs?: number; speak?: boolean; typewriter?: boolean }): Promise<void> {
    if (!this.bubbleEl) {
      return;
    }
    const value = String(text || "").trim();
    if (!value) {
      this.bubbleEl.textContent = "";
      this.bubbleEl.style.opacity = "0";
      this.bubbleEl.style.transform = "translateY(8px)";
      return;
    }
    this.bubbleEl.textContent = value;
    this.bubbleEl.style.opacity = "1";
    this.bubbleEl.style.transform = "translateY(0)";
  }

  getCapabilities(): AvatarAdapterCapabilities {
    return staticCapabilities;
  }

  private resolveImageUrl(assetRoot: string): string {
    const candidate = this.options.imageUrl || this.options.fallbackImageUrl || "";
    if (!candidate) {
      return "";
    }
    if (/^(?:https?:)?\/\//.test(candidate) || candidate.startsWith("/")) {
      return candidate;
    }
    const normalizedRoot = assetRoot.replace(/\/+$/, "");
    const normalizedCandidate = candidate.replace(/^\.?\//, "");
    return normalizedRoot ? `${normalizedRoot}/${normalizedCandidate}` : normalizedCandidate;
  }
}

export function createStaticAdapter(options: StaticAdapterOptions = {}): AvatarAdapter {
  return new StaticAvatarAdapter(options);
}

