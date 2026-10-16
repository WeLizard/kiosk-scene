import type {
  AvatarAdapter,
  AvatarAdapterCapabilities,
  AvatarManifestV1,
  ControlCueV1,
  StateV1,
  ViewPreset,
} from "@kiosk-scene/core";

/**
 * Avatar adapter for runtimes that an instance pack ships as an ES module (`manifest.entry`): a 3D room, a
 * three.js or Babylon character, anything that renders into a host element. The engine stays free of the pack's
 * code and assets; it only imports the module and forwards state, cues, view presets and bubbles to it.
 *
 * The module exports `createAvatar(context)`, which returns (or resolves to) an {@link AvatarModuleController}.
 * Loading runs in the background, so a heavy runtime never holds up the dashboard; the latest state, cue, preset and
 * bubble are replayed once it is ready. If the module fails to load, the fallback portrait (or the name) is shown.
 */
export interface AvatarModuleContext {
  host: HTMLElement;
  /** Absolute asset root of the pack, with a trailing slash. */
  assetRoot: string;
  /** Resolves a pack-relative path against the asset root. */
  resolveAsset(path: string): string;
  manifest: AvatarManifestV1;
}

export interface AvatarModuleController {
  setState?(state: StateV1): void | Promise<void>;
  setCue?(cue: ControlCueV1): void | Promise<void>;
  setViewPreset?(preset: ViewPreset): void | Promise<void>;
  /** Optional: when missing, the adapter shows the text in its own bubble over the module's canvas. */
  showBubble?(text: string, options?: { ttlMs?: number; speak?: boolean; typewriter?: boolean }): void | Promise<void>;
  dispose?(): void | Promise<void>;
  capabilities?: Partial<AvatarAdapterCapabilities>;
}

export interface AvatarModule {
  createAvatar(context: AvatarModuleContext): AvatarModuleController | Promise<AvatarModuleController>;
}

export interface ModuleAdapterOptions {
  manifest: AvatarManifestV1;
  /** Display name for the placeholder shown while loading or after a failure. */
  alt?: string;
  /** Test seam: replaces the dynamic `import()` of the entry URL. */
  importModule?: (url: string) => Promise<unknown>;
}

const BUBBLE_STYLE: Partial<CSSStyleDeclaration> = {
  position: "absolute",
  left: "18px",
  right: "18px",
  bottom: "18px",
  padding: "12px 14px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.86)",
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
  zIndex: "2",
};

function absoluteUrl(value: string): string {
  try {
    return new URL(value, document.baseURI).href;
  } catch {
    return value;
  }
}

class ModuleAvatarAdapter implements AvatarAdapter {
  readonly id = "module";

  private readonly options: ModuleAdapterOptions;
  private frameEl: HTMLDivElement | null = null;
  private stageEl: HTMLDivElement | null = null;
  private placeholderEl: HTMLDivElement | null = null;
  private bubbleEl: HTMLDivElement | null = null;
  private controller: AvatarModuleController | null = null;
  private disposed = false;
  private pending: {
    state?: StateV1;
    cue?: ControlCueV1;
    preset?: ViewPreset;
    bubble?: [string, { ttlMs?: number; speak?: boolean; typewriter?: boolean } | undefined];
  } = {};

  constructor(options: ModuleAdapterOptions) {
    this.options = options;
  }

  async mount(context: { host: HTMLElement; assetRoot: string }): Promise<void> {
    const host = context.host;
    host.innerHTML = "";
    const frameEl = document.createElement("div");
    frameEl.className = "ks-module-avatar";
    Object.assign(frameEl.style, { position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: "24px" });
    const stageEl = document.createElement("div");
    stageEl.className = "ks-module-avatar-stage";
    Object.assign(stageEl.style, { position: "absolute", inset: "0" });
    const placeholderEl = document.createElement("div");
    placeholderEl.className = "ks-module-avatar-placeholder";
    placeholderEl.textContent = this.options.alt || this.options.manifest.name || "Avatar";
    Object.assign(placeholderEl.style, {
      position: "absolute",
      inset: "18px",
      display: "grid",
      placeItems: "center",
      borderRadius: "20px",
      color: "rgba(32,48,65,0.6)",
      fontSize: "14px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      backgroundPosition: "center bottom",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      transition: "opacity 300ms ease",
      pointerEvents: "none",
    });
    const bubbleEl = document.createElement("div");
    bubbleEl.className = "ks-module-avatar-bubble";
    Object.assign(bubbleEl.style, BUBBLE_STYLE);
    frameEl.append(stageEl, placeholderEl, bubbleEl);
    host.append(frameEl);
    this.frameEl = frameEl;
    this.stageEl = stageEl;
    this.placeholderEl = placeholderEl;
    this.bubbleEl = bubbleEl;

    // The manifest's own root wins: an app may hand this adapter a different manifest than the shell loaded.
    const assetRoot = absoluteUrl((this.options.manifest.assetRoot || context.assetRoot).replace(/\/*$/, "/"));
    // Loading is deliberately not awaited: the shell mounts the avatar before its first refresh.
    void this.load(assetRoot);
  }

  private async load(assetRoot: string): Promise<void> {
    const manifest = this.options.manifest;
    const entry = manifest.entry || "";
    const frameEl = this.frameEl;
    try {
      if (!entry) {
        throw new Error("Avatar manifest has no `entry` module.");
      }
      const url = absoluteUrl(entry);
      const importer = this.options.importModule || ((u: string) => import(/* @vite-ignore */ u));
      const mod = (await importer(url)) as Partial<AvatarModule>;
      if (typeof mod?.createAvatar !== "function") {
        throw new Error(`Avatar module ${url} does not export createAvatar().`);
      }
      const controller = await mod.createAvatar({
        host: this.stageEl as HTMLElement,
        assetRoot,
        resolveAsset: (path: string) => new URL(path.replace(/^\.?\//, ""), assetRoot).href,
        manifest,
      });
      if (this.disposed) {
        await controller?.dispose?.();
        return;
      }
      this.controller = controller;
      if (this.placeholderEl) {
        this.placeholderEl.style.opacity = "0";
      }
      if (frameEl) {
        frameEl.dataset.ready = "true";
      }
      await this.flush();
    } catch (error) {
      console.warn("Avatar module failed to load", error);
      if (frameEl) {
        frameEl.dataset.ready = "error";
      }
      if (this.placeholderEl && manifest.fallbackPortrait) {
        this.placeholderEl.textContent = "";
        this.placeholderEl.style.backgroundImage = `url("${absoluteUrl(manifest.fallbackPortrait)}")`;
      }
    }
  }

  private async flush(): Promise<void> {
    const { state, cue, preset, bubble } = this.pending;
    this.pending = {};
    if (state) await this.setState(state);
    if (cue) await this.setCue(cue);
    if (preset) await this.setViewPreset(preset);
    if (bubble) await this.showBubble(bubble[0], bubble[1]);
  }

  async dispose(): Promise<void> {
    this.disposed = true;
    const controller = this.controller;
    this.controller = null;
    await controller?.dispose?.();
    this.frameEl?.remove();
    this.frameEl = null;
    this.stageEl = null;
    this.placeholderEl = null;
    this.bubbleEl = null;
  }

  async setState(state: StateV1): Promise<void> {
    if (this.frameEl) {
      this.frameEl.dataset.online = state.online === false ? "false" : "true";
    }
    if (!this.controller) {
      this.pending.state = state;
      return;
    }
    await this.controller.setState?.(state);
  }

  async setCue(cue: ControlCueV1): Promise<void> {
    if (!this.controller) {
      this.pending.cue = cue;
      return;
    }
    await this.controller.setCue?.(cue);
  }

  async setViewPreset(preset: ViewPreset): Promise<void> {
    if (this.frameEl) {
      this.frameEl.dataset.preset = preset;
    }
    if (!this.controller) {
      this.pending.preset = preset;
      return;
    }
    await this.controller.setViewPreset?.(preset);
  }

  async showBubble(text: string, options?: { ttlMs?: number; speak?: boolean; typewriter?: boolean }): Promise<void> {
    if (this.controller?.showBubble) {
      await this.controller.showBubble(text, options);
      return;
    }
    if (!this.controller) {
      this.pending.bubble = [text, options];
    }
    if (!this.bubbleEl) {
      return;
    }
    const value = String(text || "").trim();
    this.bubbleEl.textContent = value;
    this.bubbleEl.style.opacity = value ? "1" : "0";
    this.bubbleEl.style.transform = value ? "translateY(0)" : "translateY(8px)";
  }

  getCapabilities(): AvatarAdapterCapabilities {
    return {
      ...this.options.manifest.capabilities,
      ...(this.controller?.capabilities || {}),
    };
  }
}

export function createModuleAdapter(options: ModuleAdapterOptions): AvatarAdapter {
  return new ModuleAvatarAdapter(options);
}
