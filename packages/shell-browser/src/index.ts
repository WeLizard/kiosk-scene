import { createLive2dAdapter } from "@kiosk-scene/adapter-live2d";
import { createStaticAdapter } from "@kiosk-scene/adapter-static";
import {
  buildAssistantPresentationModel,
  createExtensionRuntime,
  createPinnedPageControl,
  createViewPresetControl,
  DEFAULT_CONTROL_V1,
  DEFAULT_STATE_V1,
  mergeControlV1,
  mergeControlCueIntoState,
  nextIdleDelayMs,
  pickIdleLine,
  resolveAdjacentSceneIndex,
  resolveBaseUrl,
  ServiceRunner,
  resolveSceneRuntimeConfig,
  resolveSceneSelection,
  resolveUrlAgainst,
  sanitizeAvatarManifestV1,
  sanitizeRendererConfigV1,
  shouldShowIdleMonologue,
  trimText,
  withTrailingSlash,
  type AssistantPresentationCopy,
  type AssistantPresentationModel,
  type AvatarAdapter,
  type AvatarManifestV1,
  type ControlV1,
  type ExtensionRuntime,
  type MountedView,
  type RendererConfigV1,
  type SceneConfigV1,
  type SceneDisplayConfigV1,
  type ScenePageV1,
  type StateV1,
  type ViewPreset,
} from "@kiosk-scene/core";
import {
  createHomeAssistantStatesReader,
  mapAssistantControlFromHomeAssistant,
  mapAssistantStateFromHomeAssistant,
  type HomeAssistantControlEntityMap,
  type HomeAssistantEntityMap,
  type HomeAssistantStates,
} from "@kiosk-scene/provider-ha";
import { createJsonControlProvider, createJsonLinesProvider, createJsonStateProvider } from "@kiosk-scene/provider-json";
import { escapeHtml } from "./html.js";
import {
  DEFAULT_ICON_FILENAMES,
  DEFAULT_SCENE_SHELL_COPY_EN,
  DEFAULT_SCENE_SHELL_LABELS_EN,
  DEFAULT_SCENE_SHELL_PRESET_LABELS_EN,
  type SceneShellIconUrls,
  type SceneShellLabels,
  type SceneShellOptions,
  type SceneShellPresetLabels,
} from "./shell-types.js";
import {
  renderAppBody,
  renderCardsBody,
  renderGridBody,
  renderOverviewBody,
  slideClassFor,
  type SlideRenderContext,
} from "./slides.js";
import { buildWeatherOverview, DEFAULT_WEATHER_OVERVIEW, mergeWeatherSource, type WeatherOverviewPayload, type WeatherOverviewPatch } from "./weather.js";

export * from "./shell-types.js";
export * from "./weather.js";

interface CarouselDragState {
  pointerId: number;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  locked: boolean;
}

/** One persistent `<section>` per page plus whatever extension views are mounted inside it. */
interface SlideEntry {
  pageId: string;
  kind: ScenePageV1["kind"];
  el: HTMLElement;
  /** Last rendered inner HTML (or app binding) – the slide is only touched when this changes. */
  signature: string;
  views: MountedView[];
  /** Bumped whenever the slide's mounted views are discarded, so late async mounts can bail out. */
  generation: number;
  appPropsKey: string;
}

const EDITABLE_SELECTOR = "input, textarea, select, [contenteditable=''], [contenteditable='true']";

/**
 * Failures that say "the data source is unreachable" (network error, 5xx). A 4xx means the file is
 * simply not configured, which must not flag the whole display as stale.
 */
function isConnectivityFailure(error: unknown): boolean {
  const status = (error as { status?: number } | null)?.status;
  return typeof status !== "number" || status >= 500;
}

export class BrowserSceneShellApp {
  private readonly root: HTMLElement;
  private readonly options: SceneShellOptions;
  private readonly avatarMountEl: HTMLElement;
  private readonly carouselShellEl: HTMLElement;
  private readonly carouselTrackEl: HTMLElement;
  private readonly dotsEl: HTMLElement;
  private readonly staleEl: HTMLElement;
  private readonly presetButtons: HTMLButtonElement[];
  private readonly copy: AssistantPresentationCopy;
  private readonly labels: SceneShellLabels;
  private readonly presetLabels: SceneShellPresetLabels;

  private rendererConfig!: RendererConfigV1;
  private avatarManifest!: AvatarManifestV1;
  private sceneConfig!: SceneConfigV1 | SceneDisplayConfigV1;
  private sceneRuntimeConfig!: SceneDisplayConfigV1;
  private entityMap: HomeAssistantEntityMap | null = null;
  private controlEntityMap: HomeAssistantControlEntityMap | null = null;
  private haStatesReader: ReturnType<typeof createHomeAssistantStatesReader> | null = null;
  private weatherData: WeatherOverviewPayload;
  private hassStates: HomeAssistantStates | null = null;
  private currentState!: StateV1;
  private remoteControl: ControlV1 = DEFAULT_CONTROL_V1;
  private uiControl: ControlV1 = DEFAULT_CONTROL_V1;
  private currentControl: ControlV1 = DEFAULT_CONTROL_V1;
  private idleLines: string[] = [];
  private activeIndex = 0;
  private lastAutoRotateAt = 0;
  private currentIdleLine = "";
  private lastIdleIndex = -1;
  private currentPreset: ViewPreset = "full";
  private idleTimer: number | null = null;
  private avatarAdapter: AvatarAdapter | null = null;
  private refreshIntervalHandle: number | null = null;
  private lastWeatherRefreshAt = 0;
  private orderedPages: ScenePageV1[] = [];
  private carouselDragState: CarouselDragState | null = null;

  // lifecycle
  private disposed = false;
  private initialized = false;
  private inFlightRefresh: Promise<void> | null = null;
  private refreshQueued = false;
  private readonly onVisibilityChange = (): void => {
    if (!document.hidden) {
      void this.refreshWeatherIfStale(0);
      void this.refreshNow();
    }
  };
  private unsubscribeRegistry: (() => void) | null = null;
  private serviceRunner: ServiceRunner | null = null;

  // data health
  private cycleConnectivityFailures = 0;
  private consecutiveFailedCycles = 0;

  // reconcile state
  private readonly slides = new Map<string, SlideEntry>();
  private dotsSignature = "";
  private lastInteractionAt = 0;
  private lastRenderedActiveIndex = -1;
  private extensionRuntime: ExtensionRuntime | null = null;

  constructor(root: HTMLElement, options: SceneShellOptions = {}) {
    this.root = root;
    this.options = options;
    this.copy = {
      ...DEFAULT_SCENE_SHELL_COPY_EN,
      ...(options.copy || {}),
    };
    this.labels = {
      ...DEFAULT_SCENE_SHELL_LABELS_EN,
      ...(options.labels || {}),
    };
    this.presetLabels = {
      ...DEFAULT_SCENE_SHELL_PRESET_LABELS_EN,
      ...(options.presetLabels || {}),
    };
    this.weatherData = buildWeatherOverview(options.defaultWeather);
    this.root.innerHTML = `
      <div class="scene-viewport">
        <div class="layout">
          <section class="panel avatar-panel">
            <div class="avatar-shell">
              <div class="avatar-presets" aria-label="${escapeHtml(this.labels.avatarPresetGroup)}">
                <button class="avatar-preset is-active" type="button" data-avatar-preset="full" title="${escapeHtml(this.presetLabels.full)}" aria-label="${escapeHtml(this.presetLabels.full)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="full">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="torso" title="${escapeHtml(this.presetLabels.torso)}" aria-label="${escapeHtml(this.presetLabels.torso)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="torso">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="head" title="${escapeHtml(this.presetLabels.head)}" aria-label="${escapeHtml(this.presetLabels.head)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="head">
                </button>
              </div>
              <div class="avatar-mount" data-avatar-mount></div>
            </div>
          </section>

          <section class="panel content-panel">
            <div class="carousel-shell" data-carousel-shell tabindex="0" aria-label="${escapeHtml(this.labels.carouselRegion)}">
              <div class="carousel-track" data-carousel-track></div>
              <div class="carousel-dots" data-dots aria-label="${escapeHtml(this.labels.pagesRegion)}"></div>
            </div>
          </section>
        </div>
        <div class="stale-badge" data-stale-badge role="status" aria-live="polite" hidden>${escapeHtml(this.labels.staleNotice)}</div>
      </div>
    `;

    this.avatarMountEl = this.requireEl("[data-avatar-mount]");
    this.carouselShellEl = this.requireEl("[data-carousel-shell]");
    this.carouselTrackEl = this.requireEl("[data-carousel-track]");
    this.dotsEl = this.requireEl("[data-dots]");
    this.staleEl = this.requireEl("[data-stale-badge]");
    this.presetButtons = Array.from(this.root.querySelectorAll<HTMLButtonElement>("[data-avatar-preset]"));
  }

  async init(): Promise<void> {
    if (this.initialized || this.disposed) {
      return;
    }
    this.initialized = true;

    const rendererConfigUrl = resolveUrlAgainst(window.location.href, this.getRendererConfigUrl());
    const rendererConfigBaseUrl = resolveBaseUrl(rendererConfigUrl);
    const rawRendererConfig = sanitizeRendererConfigV1(await this.readJson(rendererConfigUrl));
    const resolveOptional = (value: string | undefined): string | undefined =>
      value ? resolveUrlAgainst(rendererConfigBaseUrl, value) : undefined;
    const resolvedRendererConfig = sanitizeRendererConfigV1({
      ...rawRendererConfig,
      links: Object.fromEntries(
        Object.entries(rawRendererConfig.links || {}).map(([key, value]) => [key, resolveUrlAgainst(rendererConfigBaseUrl, value)]),
      ),
      avatar: {
        ...rawRendererConfig.avatar,
        manifestUrl: resolveUrlAgainst(rendererConfigBaseUrl, rawRendererConfig.avatar.manifestUrl),
      },
      scene: {
        ...rawRendererConfig.scene,
        configUrl: resolveUrlAgainst(rendererConfigBaseUrl, rawRendererConfig.scene.configUrl),
      },
      state: {
        ...rawRendererConfig.state,
        stateUrl: resolveUrlAgainst(rendererConfigBaseUrl, rawRendererConfig.state.stateUrl),
        apiUrl: resolveOptional(rawRendererConfig.state.apiUrl),
        idleLinesUrl: resolveUrlAgainst(
          rendererConfigBaseUrl,
          rawRendererConfig.state.idleLinesUrl || "./idle-lines.json",
        ),
        entityMapUrl: resolveOptional(rawRendererConfig.state.entityMapUrl),
      },
      control: {
        ...rawRendererConfig.control,
        controlUrl: resolveUrlAgainst(rendererConfigBaseUrl, rawRendererConfig.control.controlUrl),
        apiUrl: resolveOptional(rawRendererConfig.control.apiUrl),
        entityMapUrl: resolveOptional(rawRendererConfig.control.entityMapUrl),
      },
    });

    this.rendererConfig = resolvedRendererConfig;
    const manifestUrl = this.rendererConfig.avatar.manifestUrl;
    this.avatarManifest = this.resolveAvatarManifestUrls(
      sanitizeAvatarManifestV1(await this.readJson(manifestUrl)),
      manifestUrl,
    );
    this.sceneConfig = await this.readJson(this.rendererConfig.scene.configUrl);
    this.sceneRuntimeConfig = resolveSceneRuntimeConfig(this.sceneConfig);
    this.entityMap = await this.readEntityMap();
    this.controlEntityMap = await this.readControlEntityMap();
    this.haStatesReader = this.createHaStatesReader();
    this.idleLines = await createJsonLinesProvider({
      url: this.rendererConfig.state.idleLinesUrl || resolveUrlAgainst(rendererConfigBaseUrl, "./idle-lines.json"),
      defaultValue: [],
    }).read();
    this.weatherData = await this.readWeatherData();
    this.lastWeatherRefreshAt = Date.now();
    this.currentState = await this.readAssistantState();
    this.hassStates = await this.readSceneStates();
    this.remoteControl = await this.readRemoteControl();
    this.currentControl = mergeControlV1(this.remoteControl, this.uiControl);

    if (this.options.extensions) {
      this.extensionRuntime = createExtensionRuntime({
        registry: this.options.extensions,
        mode: "kiosk",
        locale: this.rendererConfig.assistant.locale || "en-US",
        resolveUrl: (url) => resolveUrlAgainst(window.location.href, url),
        navigate: (pageId) => this.pinPageById(pageId),
        refresh: () => void this.refreshNow(),
      });
      this.serviceRunner = new ServiceRunner(this.options.extensions, "kiosk", this.extensionRuntime, (id, error) => {
        console.warn(`Extension service ${id} failed`, error);
      });
      this.serviceRunner.start();
      this.unsubscribeRegistry = this.options.extensions.onChange(() => {
        // A late-loading extension may now provide pages/widgets that were showing a placeholder.
        for (const entry of this.slides.values()) {
          entry.signature = "";
        }
        void this.refreshNow();
      });
    }

    if (this.disposed) {
      return;
    }
    this.avatarAdapter = this.createAvatarAdapter();
    await this.avatarAdapter.mount({
      host: this.avatarMountEl,
      assetRoot: this.avatarManifest.assetRoot,
    });

    this.bindPresetControls();
    this.bindCarouselControls();
    this.syncPresetButtonsFromManifest();
    this.lastAutoRotateAt = Date.now();
    await this.refreshNow();

    this.refreshIntervalHandle = window.setInterval(() => {
      if (!document.hidden) {
        void this.refreshNow();
      }
    }, this.options.refreshIntervalMs ?? 3000);

    document.addEventListener("visibilitychange", this.onVisibilityChange);
  }

  async dispose(): Promise<void> {
    if (this.disposed) {
      return;
    }
    this.disposed = true;
    if (this.refreshIntervalHandle) {
      window.clearInterval(this.refreshIntervalHandle);
      this.refreshIntervalHandle = null;
    }
    if (this.idleTimer) {
      window.clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    this.unsubscribeRegistry?.();
    this.unsubscribeRegistry = null;
    this.serviceRunner?.stop();
    this.serviceRunner = null;
    for (const entry of Array.from(this.slides.values())) {
      this.discardSlide(entry);
    }
    this.slides.clear();
    await this.avatarAdapter?.dispose();
    this.avatarAdapter = null;
  }

  /**
   * Refreshes state, control, weather and the carousel. Overlapping calls are coalesced: at most one
   * refresh is running and one more is queued, so a slow network can never stack up requests or let an
   * older response overwrite a newer one.
   */
  refreshNow(): Promise<void> {
    if (this.disposed) {
      return Promise.resolve();
    }
    if (this.inFlightRefresh) {
      this.refreshQueued = true;
      return this.inFlightRefresh;
    }
    this.inFlightRefresh = (async () => {
      try {
        do {
          this.refreshQueued = false;
          try {
            await this.runRefreshCycle();
          } catch (error) {
            console.warn("Scene refresh failed", error);
          }
        } while (this.refreshQueued && !this.disposed);
      } finally {
        this.inFlightRefresh = null;
      }
    })();
    return this.inFlightRefresh;
  }

  private getRendererConfigUrl(): string {
    return trimText(this.options.rendererConfigUrl, 1024) || "./renderer.config.json";
  }

  private getWeatherUrl(): string {
    return trimText(this.options.weatherUrl, 1024) || "./weather.json";
  }

  private bindPresetControls(): void {
    for (const button of this.presetButtons) {
      button.addEventListener("click", () => {
        const preset = button.dataset.avatarPreset as ViewPreset;
        this.uiControl = createViewPresetControl(this.uiControl, preset || "full");
        void this.refreshNow();
      });
    }
  }

  private noteInteraction(): void {
    this.lastInteractionAt = Date.now();
  }

  /** True while somebody is using an interactive slide; auto-rotation must not pull the page away. */
  private isUserInteracting(): boolean {
    const hold = this.options.interactionHoldMs ?? 45_000;
    if (Date.now() - this.lastInteractionAt < hold) {
      return true;
    }
    const focused = document.activeElement;
    return focused instanceof Element && this.carouselShellEl.contains(focused) && focused.matches(EDITABLE_SELECTOR);
  }

  private bindCarouselControls(): void {
    this.carouselShellEl.addEventListener("keydown", (event) => {
      this.noteInteraction();
      // Arrow keys belong to the field when typing (cursor movement, selects, sliders).
      if (event.target instanceof Element && event.target.matches(EDITABLE_SELECTOR)) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        this.stepPage(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        this.stepPage(1);
      }
    });
    this.carouselShellEl.addEventListener("focusin", () => this.noteInteraction());

    this.dotsEl.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-slide-index]") : null;
      if (target) {
        this.noteInteraction();
        this.pinPageByIndex(Number(target.dataset.slideIndex) || 0);
      }
    });

    this.carouselShellEl.addEventListener("pointerdown", (event) => {
      this.noteInteraction();
      if (event.button !== 0 || this.orderedPages.length < 2 || this.isCarouselInteractiveTarget(event.target)) {
        return;
      }
      this.carouselDragState = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        deltaX: 0,
        deltaY: 0,
        locked: false,
      };
      this.carouselShellEl.setPointerCapture?.(event.pointerId);
    });

    this.carouselShellEl.addEventListener("pointermove", (event) => {
      if (!this.carouselDragState || event.pointerId !== this.carouselDragState.pointerId) {
        return;
      }
      this.carouselDragState.deltaX = event.clientX - this.carouselDragState.startX;
      this.carouselDragState.deltaY = event.clientY - this.carouselDragState.startY;

      if (!this.carouselDragState.locked) {
        if (Math.abs(this.carouselDragState.deltaX) < 10) {
          return;
        }
        if (Math.abs(this.carouselDragState.deltaY) > Math.abs(this.carouselDragState.deltaX)) {
          this.clearDragState(event.pointerId, false);
          return;
        }
        this.carouselDragState.locked = true;
        this.carouselShellEl.classList.add("is-dragging");
      }

      event.preventDefault();
      this.updateCarouselPosition({
        instant: true,
        dragOffsetPx: this.carouselDragState.deltaX,
      });
    });

    const finalizePointer = (event: PointerEvent) => {
      if (!this.carouselDragState || event.pointerId !== this.carouselDragState.pointerId) {
        return;
      }

      const { locked, deltaX } = this.carouselDragState;
      const width = this.carouselShellEl.clientWidth || 1;
      const shouldStep = locked && Math.abs(deltaX) >= width * 0.16;
      const direction: 1 | -1 = deltaX < 0 ? 1 : -1;

      this.clearDragState(event.pointerId, false);

      if (shouldStep) {
        this.stepPage(direction);
        return;
      }

      this.updateCarouselPosition();
    };

    this.carouselShellEl.addEventListener("pointerup", finalizePointer);
    this.carouselShellEl.addEventListener("pointercancel", finalizePointer);
    this.carouselShellEl.addEventListener("lostpointercapture", finalizePointer);
  }

  private async refreshWeatherIfStale(maxAgeMs = 10 * 60 * 1000): Promise<void> {
    if (Date.now() - this.lastWeatherRefreshAt < maxAgeMs) {
      return;
    }
    try {
      this.weatherData = await this.readWeatherData();
      this.lastWeatherRefreshAt = Date.now();
    } catch {
      // Weather refresh is best-effort.
    }
  }

  private async runRefreshCycle(): Promise<void> {
    this.cycleConnectivityFailures = 0;
    await this.refreshWeatherIfStale();
    const [state, states, remoteControl] = await Promise.all([
      this.readAssistantState(),
      this.readSceneStates(),
      this.readRemoteControl(this.currentControl),
    ]);
    if (this.disposed) {
      return;
    }
    this.currentState = state;
    this.hassStates = states;
    this.remoteControl = remoteControl;
    this.updateDataHealth();

    this.uiControl = mergeControlV1(DEFAULT_CONTROL_V1, this.uiControl);
    this.currentControl = mergeControlV1(this.remoteControl, this.uiControl);

    const effectiveState = mergeControlCueIntoState(this.currentState, this.currentControl);
    this.syncIdleMonologue(effectiveState);

    const presentation = buildAssistantPresentationModel(effectiveState, {
      idleMonologue: this.currentIdleLine,
      copy: this.copy,
    });

    const runtimeScene = this.sceneRuntimeConfig;
    this.applyDisplayConfig(runtimeScene);
    const orderedPages = runtimeScene.pages;
    if (this.isUserInteracting() && !(this.currentControl.page.mode === "pinned")) {
      this.lastAutoRotateAt = Date.now();
    }
    const selection = resolveSceneSelection({
      control: this.currentControl,
      rotation: runtimeScene.rotation,
      activeIndex: this.activeIndex,
      lastAutoRotateAt: this.lastAutoRotateAt,
      force: false,
      isEligible: (pageId) => orderedPages.some((page) => page.id === pageId),
    });

    this.activeIndex = selection.nextIndex;
    this.lastAutoRotateAt = selection.nextAutoRotateAt;
    this.currentPreset = this.currentControl.viewPreset || this.currentPreset || "full";
    this.updatePresetButtons();

    // The carousel is rendered first and independently: a misbehaving avatar backend must never
    // freeze the information deck.
    this.renderCarousel(orderedPages, presentation);
    await this.pushAvatarState(presentation);
  }

  private async pushAvatarState(presentation: AssistantPresentationModel): Promise<void> {
    const adapter = this.avatarAdapter;
    if (!adapter) {
      return;
    }
    const attempt = async (label: string, run: () => Promise<void>): Promise<void> => {
      try {
        await run();
      } catch (error) {
        console.warn(`Avatar adapter ${label} failed`, error);
      }
    };
    await attempt("setState", () => adapter.setState(presentation.state));
    await attempt("setCue", () => adapter.setCue(this.currentControl.cue));
    await attempt("setViewPreset", () => adapter.setViewPreset(this.currentPreset));
    // An adapter that renders `state.message` itself (Live2D's typewriter/lip-sync) must not get a competing bubble:
    // a bubble with speak:false would override its typewriter. Every other adapter (static portrait, ...) gets the
    // text through the bubble, otherwise the assistant's words would be invisible on the display.
    const hasStateMessage = Boolean(trimText(presentation.state.message, 180));
    const adapterRendersMessage = adapter.getCapabilities().rendersStateMessage === true;
    await attempt("showBubble", () => adapter.showBubble(hasStateMessage && adapterRendersMessage ? "" : presentation.body, {
      ttlMs: 0,
      speak: false,
      typewriter: false,
    }));
  }

  private updateDataHealth(): void {
    if (this.cycleConnectivityFailures > 0) {
      this.consecutiveFailedCycles += 1;
    } else {
      this.consecutiveFailedCycles = 0;
    }
    const stale = this.consecutiveFailedCycles >= (this.options.staleAfterFailures ?? 2);
    this.staleEl.hidden = !stale;
    this.root.dataset.stale = stale ? "true" : "false";
  }

  private recordProviderFailure(error: unknown): void {
    if (isConnectivityFailure(error)) {
      this.cycleConnectivityFailures += 1;
    }
  }

  private renderContext(): SlideRenderContext {
    return {
      labels: this.labels,
      locale: this.rendererConfig.assistant.locale || "en-US",
      assistantName: this.rendererConfig.assistant.name,
      weather: this.weatherData || DEFAULT_WEATHER_OVERVIEW,
      states: this.hassStates,
      iconUrl: (key) => this.resolveIconUrl(key),
    };
  }

  private renderCarousel(pages: ScenePageV1[], presentation: AssistantPresentationModel): void {
    this.orderedPages = pages.slice();
    const context = this.renderContext();
    const seen = new Set<string>();

    pages.forEach((page, index) => {
      seen.add(page.id);
      let entry = this.slides.get(page.id);
      if (entry && entry.kind !== page.kind) {
        this.discardSlide(entry);
        entry.el.remove();
        this.slides.delete(page.id);
        entry = undefined;
      }
      if (!entry) {
        const el = document.createElement("section");
        el.dataset.slideId = page.id;
        el.dataset.scenePageId = page.id;
        entry = { pageId: page.id, kind: page.kind, el, signature: "\u0000", views: [], generation: 0, appPropsKey: "" };
        this.slides.set(page.id, entry);
      }
      entry.el.className = slideClassFor(page);
      entry.el.dataset.slideOrder = String(index);

      if (page.kind === "app") {
        this.syncAppSlide(entry, page);
      } else {
        const body = page.kind === "overview"
          ? renderOverviewBody(context, presentation)
          : page.kind === "grid"
            ? renderGridBody(context, page, index, pages.length)
            : renderCardsBody(context, page, index, pages.length);
        this.applySlideHtml(entry, body, page);
      }
    });

    for (const [pageId, entry] of Array.from(this.slides.entries())) {
      if (!seen.has(pageId)) {
        this.discardSlide(entry);
        entry.el.remove();
        this.slides.delete(pageId);
      }
    }

    // Keep DOM order equal to page order without recreating nodes (moving a node keeps its mounted views).
    pages.forEach((page, index) => {
      const el = this.slides.get(page.id)?.el;
      if (el && this.carouselTrackEl.children[index] !== el) {
        this.carouselTrackEl.insertBefore(el, this.carouselTrackEl.children[index] ?? null);
      }
    });

    this.updateCarouselPosition();
    this.renderDots(pages);
    this.notifyActiveSlide(pages);
  }

  private applySlideHtml(entry: SlideEntry, body: string, page: ScenePageV1): void {
    if (entry.signature === body) {
      return;
    }
    this.disposeViews(entry);
    entry.signature = body;
    entry.el.innerHTML = body;
    for (const slot of Array.from(entry.el.querySelectorAll<HTMLElement>("[data-widget-slot]"))) {
      const cardIndex = Number(slot.dataset.sceneCardIndex);
      const card = page.cards?.[cardIndex];
      void this.mountWidget(entry, slot, trimText(card?.widget, 96), (card?.props ?? {}) as Record<string, unknown>);
    }
  }

  private syncAppSlide(entry: SlideEntry, page: ScenePageV1): void {
    const appId = trimText(page.app, 96);
    const propsKey = JSON.stringify(page.props ?? {});
    const registry = this.options.extensions;
    const definition = appId && registry ? registry.getPage(appId) : null;
    const available = Boolean(definition && definition.modes.includes("kiosk"));
    const signature = `app:${appId}:${available ? "ok" : "missing"}`;

    if (entry.signature === signature) {
      if (entry.appPropsKey !== propsKey) {
        entry.appPropsKey = propsKey;
        for (const view of entry.views) {
          view.update?.((page.props ?? {}) as Record<string, unknown>);
        }
      }
      return;
    }
    this.disposeViews(entry);
    entry.signature = signature;
    entry.appPropsKey = propsKey;

    if (!available || !definition || !this.extensionRuntime) {
      entry.el.innerHTML = `
        <div class="app-slide slide-body">
          <div class="slide-top"><div><h1 class="headline">${escapeHtml(trimText(page.title, 64) || appId)}</h1></div></div>
          <div class="empty">${escapeHtml(this.labels.extensionUnavailable)}${appId ? ` (${escapeHtml(appId)})` : ""}</div>
        </div>`;
      return;
    }

    entry.el.innerHTML = renderAppBody();
    const host = entry.el.querySelector<HTMLElement>("[data-app-host]");
    if (!host) {
      return;
    }
    const generation = entry.generation;
    const runtime = this.extensionRuntime;
    void (async () => {
      try {
        const view = await definition.mount(host, (page.props ?? {}) as Record<string, unknown>, runtime);
        if (entry.generation !== generation || this.disposed) {
          view.dispose();
          return;
        }
        entry.views.push(view);
      } catch (error) {
        if (entry.generation === generation) {
          host.textContent = this.labels.extensionUnavailable;
        }
        console.warn(`Extension page ${appId} failed to mount`, error);
      }
    })();
  }

  private async mountWidget(
    entry: SlideEntry,
    slot: HTMLElement,
    widgetId: string,
    props: Record<string, unknown>,
  ): Promise<void> {
    const definition = widgetId ? this.options.extensions?.getWidget(widgetId) : null;
    if (!definition || !this.extensionRuntime) {
      slot.classList.add("is-unavailable");
      slot.textContent = this.labels.extensionUnavailable;
      return;
    }
    const generation = entry.generation;
    try {
      const view = await definition.mount(slot, props, this.extensionRuntime);
      if (entry.generation !== generation || this.disposed) {
        view.dispose();
        return;
      }
      entry.views.push(view);
    } catch (error) {
      if (entry.generation === generation) {
        slot.classList.add("is-unavailable");
        slot.textContent = this.labels.extensionUnavailable;
      }
      console.warn(`Widget ${widgetId} failed to mount`, error);
    }
  }

  private disposeViews(entry: SlideEntry): void {
    entry.generation += 1;
    for (const view of entry.views.splice(0)) {
      try {
        view.dispose();
      } catch (error) {
        console.warn("Extension view dispose failed", error);
      }
    }
  }

  private discardSlide(entry: SlideEntry): void {
    this.disposeViews(entry);
  }

  private renderDots(pages: ScenePageV1[]): void {
    const signature = pages
      .map((page, index) => `${index}:${page.id}:${trimText(page.title, 40)}`)
      .join("|");
    if (signature !== this.dotsSignature) {
      this.dotsSignature = signature;
      this.dotsEl.innerHTML = pages.map((page, index) => `
      <button
        class="carousel-dot"
        type="button"
        data-slide-index="${index}"
        data-scene-page-id="${escapeHtml(page.id)}"
        aria-label="${escapeHtml(trimText(page.title, 40) || trimText(page.id, 40) || `${this.labels.pageStamp} ${index + 1}`)}"
      ></button>
    `).join("");
    }
    this.updateDotState();
  }

  /** Tells mounted extension views whether their slide is on screen so they can pause background work. */
  private notifyActiveSlide(pages: ScenePageV1[]): void {
    if (this.lastRenderedActiveIndex === this.activeIndex) {
      return;
    }
    this.lastRenderedActiveIndex = this.activeIndex;
    pages.forEach((page, index) => {
      const el = this.slides.get(page.id)?.el;
      if (!el) {
        return;
      }
      const active = index === this.activeIndex;
      el.dataset.active = active ? "true" : "false";
      el.dispatchEvent(new CustomEvent("ks-active-change", { detail: { active } }));
    });
  }

  private resolveIconUrl(key: keyof SceneShellIconUrls): string {
    const explicit = trimText(this.options.iconUrls?.[key], 1024);
    if (explicit) {
      return explicit;
    }
    const base = withTrailingSlash(trimText(this.options.iconBaseUrl, 1024) || "./assets");
    return `${base}${DEFAULT_ICON_FILENAMES[key]}`;
  }

  private applyDisplayConfig(scene: SceneDisplayConfigV1): void {
    const { safeAreaPx, layoutPaddingPx, layoutGapPx, globalScale } = scene.display;
    this.root.style.setProperty("--scene-safe-top", `${safeAreaPx.top}px`);
    this.root.style.setProperty("--scene-safe-right", `${safeAreaPx.right}px`);
    this.root.style.setProperty("--scene-safe-bottom", `${safeAreaPx.bottom}px`);
    this.root.style.setProperty("--scene-safe-left", `${safeAreaPx.left}px`);
    this.root.style.setProperty("--scene-layout-padding", `${layoutPaddingPx}px`);
    this.root.style.setProperty("--scene-layout-gap", `${layoutGapPx}px`);
    this.root.style.setProperty("--scene-global-scale", String(globalScale));
  }

  private updateCarouselPosition(options?: { instant?: boolean; dragOffsetPx?: number }): void {
    const width = this.carouselShellEl.clientWidth || 1;
    const offset = -(this.activeIndex * width) + Math.round(options?.dragOffsetPx || 0);
    this.carouselTrackEl.style.transition = options?.instant ? "none" : "";
    this.carouselTrackEl.style.transform = `translate3d(${offset}px, 0, 0)`;
  }

  private updateDotState(): void {
    for (const dot of Array.from(this.dotsEl.querySelectorAll<HTMLButtonElement>("[data-slide-index]"))) {
      const active = Number(dot.dataset.slideIndex) === this.activeIndex;
      dot.classList.toggle("is-active", active);
      if (active) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    }
  }

  private isCarouselInteractiveTarget(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) {
      return false;
    }
    return Boolean(target.closest("button, a, input, select, textarea, label, [data-no-swipe], [contenteditable]"));
  }

  private clearDragState(pointerId: number, keepCapture: boolean): void {
    if (!keepCapture && this.carouselShellEl.hasPointerCapture?.(pointerId)) {
      this.carouselShellEl.releasePointerCapture(pointerId);
    }
    this.carouselDragState = null;
    this.carouselShellEl.classList.remove("is-dragging");
  }

  private stepPage(direction: 1 | -1): void {
    if (this.orderedPages.length < 2) {
      return;
    }
    const nextIndex = resolveAdjacentSceneIndex(
      this.sceneRuntimeConfig.rotation,
      this.activeIndex,
      direction,
      (pageId) => this.orderedPages.some((page) => page.id === pageId),
    );
    this.pinPageByIndex(nextIndex);
  }

  private pinPageById(pageId: string): void {
    const index = this.orderedPages.findIndex((page) => page.app === pageId || page.id === pageId);
    if (index >= 0) {
      this.pinPageByIndex(index);
    }
  }

  private pinPageByIndex(index: number): void {
    const orderedPages = this.orderedPages.length
      ? this.orderedPages
      : this.sceneRuntimeConfig.pages;
    const target = orderedPages[index];
    if (!target) {
      return;
    }
    const ttlMs = Math.max(18_000, this.sceneRuntimeConfig.rotation.defaultDwellMs * 2);
    this.uiControl = createPinnedPageControl(this.uiControl, target.id, ttlMs);
    this.activeIndex = index;
    this.lastAutoRotateAt = Date.now();
    this.updateCarouselPosition();
    this.updateDotState();
    this.notifyActiveSlide(orderedPages);
    void this.refreshNow();
  }

  private syncIdleMonologue(state: StateV1): void {
    if (!shouldShowIdleMonologue(state)) {
      this.currentIdleLine = "";
      if (this.idleTimer) {
        window.clearTimeout(this.idleTimer);
        this.idleTimer = null;
      }
      return;
    }

    if (!this.currentIdleLine) {
      const next = pickIdleLine(this.idleLines, this.lastIdleIndex);
      this.currentIdleLine = next.line;
      this.lastIdleIndex = next.index;
    }

    if (!this.idleTimer && !this.disposed) {
      this.idleTimer = window.setTimeout(() => {
        this.idleTimer = null;
        const next = pickIdleLine(this.idleLines, this.lastIdleIndex);
        this.currentIdleLine = next.line;
        this.lastIdleIndex = next.index;
        void this.refreshNow();
      }, nextIdleDelayMs(18_000, 18_000));
    }
  }

  private requireEl(selector: string): HTMLElement {
    const element = this.root.querySelector<HTMLElement>(selector);
    if (!element) {
      throw new Error(`Missing element: ${selector}`);
    }
    return element;
  }

  private async readJson<T>(url: string): Promise<T> {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: HTTP ${response.status}`);
    }
    return response.json() as Promise<T>;
  }

  private async readEntityMap(): Promise<HomeAssistantEntityMap | null> {
    if (this.rendererConfig.state.provider !== "ha" || !this.rendererConfig.state.entityMapUrl) {
      return null;
    }
    return this.readJson<HomeAssistantEntityMap>(this.rendererConfig.state.entityMapUrl);
  }

  private async readControlEntityMap(): Promise<HomeAssistantControlEntityMap | null> {
    if (this.rendererConfig.control.provider !== "ha" || !this.rendererConfig.control.entityMapUrl) {
      return null;
    }
    return this.readJson<HomeAssistantControlEntityMap>(this.rendererConfig.control.entityMapUrl);
  }

  private createHaStatesReader(): ReturnType<typeof createHomeAssistantStatesReader> | null {
    if (this.rendererConfig.state.provider !== "ha") {
      return null;
    }
    return createHomeAssistantStatesReader({
      allowApiFallback: this.rendererConfig.state.haApiFallback === true,
      apiUrl: this.rendererConfig.state.apiUrl || this.rendererConfig.control.apiUrl,
      onError: (error) => this.recordProviderFailure(error),
    });
  }

  private async readAssistantState(): Promise<StateV1> {
    const jsonFallback = async (): Promise<StateV1> => createJsonStateProvider({
      url: this.rendererConfig.state.stateUrl,
      defaultValue: this.currentState ?? DEFAULT_STATE_V1,
      onError: (error) => this.recordProviderFailure(error),
    }).read();

    if (this.rendererConfig.state.provider !== "ha" || !this.entityMap || !this.haStatesReader) {
      return jsonFallback();
    }
    const states = await this.haStatesReader.read();
    return mapAssistantStateFromHomeAssistant(
      states || {},
      this.entityMap,
      this.rendererConfig.assistant.name,
    ) || jsonFallback();
  }

  private async readSceneStates(): Promise<HomeAssistantStates | null> {
    if (!this.haStatesReader) {
      return null;
    }
    return this.haStatesReader.read();
  }

  private async readRemoteControl(defaultValue = DEFAULT_CONTROL_V1): Promise<ControlV1> {
    const jsonFallback = async (): Promise<ControlV1> => createJsonControlProvider({
      url: this.rendererConfig.control.controlUrl,
      defaultValue,
      onError: (error) => this.recordProviderFailure(error),
    }).read();

    if (this.rendererConfig.control.provider !== "ha" || !this.controlEntityMap || !this.haStatesReader) {
      return jsonFallback();
    }
    const states = await this.haStatesReader.read();
    return mapAssistantControlFromHomeAssistant(states || {}, this.controlEntityMap) || jsonFallback();
  }

  private async readWeatherData(): Promise<WeatherOverviewPayload> {
    let payload: WeatherOverviewPatch = {
      ...(this.options.defaultWeather || {}),
    };

    try {
      const filePayload = await this.readJson<WeatherOverviewPatch>(this.getWeatherUrl());
      payload = mergeWeatherSource(payload, filePayload);
    } catch {
      // Fallback file is optional.
    }

    if (this.options.weatherReader) {
      try {
        const dynamicPayload = await this.options.weatherReader();
        payload = mergeWeatherSource(payload, dynamicPayload);
      } catch {
        // Dynamic weather is best-effort and should not break the shell.
      }
    }

    try {
      return buildWeatherOverview(payload);
    } catch {
      return buildWeatherOverview(this.options.defaultWeather);
    }
  }

  private resolveAvatarManifestUrls(manifest: AvatarManifestV1, manifestUrl: string): AvatarManifestV1 {
    const manifestBaseUrl = resolveBaseUrl(manifestUrl);
    const assetRoot = resolveUrlAgainst(
      manifestBaseUrl,
      trimText(manifest.assetRoot, 1024) || "./assets",
    );
    const assetBaseUrl = assetRoot ? withTrailingSlash(assetRoot) : manifestBaseUrl;
    const resolveAvatarAssetUrl = (value: string): string => {
      const normalized = trimText(value, 1024);
      return normalized ? resolveUrlAgainst(assetBaseUrl, normalized) : "";
    };
    return {
      ...manifest,
      assetRoot,
      runtimeUrl: resolveUrlAgainst(manifestBaseUrl, manifest.runtimeUrl || ""),
      entry: resolveAvatarAssetUrl(manifest.entry || ""),
      modelUrl: resolveAvatarAssetUrl(manifest.modelUrl || ""),
      fallbackPortrait: resolveAvatarAssetUrl(manifest.fallbackPortrait || ""),
      motionMapUrl: resolveAvatarAssetUrl(manifest.motionMapUrl || ""),
      expressionMapUrl: resolveAvatarAssetUrl(manifest.expressionMapUrl || ""),
      presetThumbs: Object.fromEntries(
        Object.entries(manifest.presetThumbs || {})
          .map(([key, value]) => [key, resolveUrlAgainst(manifestBaseUrl, value)])
          .filter(([, value]) => Boolean(value)),
      ),
    };
  }

  private createAvatarAdapter(): AvatarAdapter {
    const custom = this.options.avatarAdapterFactory?.({
      manifest: this.avatarManifest,
      rendererConfig: this.rendererConfig,
    });
    if (custom) {
      return custom;
    }

    if (this.avatarManifest.adapter === "live2d") {
      return createLive2dAdapter({
        manifest: this.avatarManifest,
        rendererConfig: this.rendererConfig,
      });
    }

    if (this.avatarManifest.adapter === "unity-webgl") {
      throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");
    }

    return createStaticAdapter({
      alt: this.rendererConfig.assistant.name || "Assistant",
      imageUrl: this.avatarManifest.modelUrl || this.avatarManifest.entry || undefined,
      fallbackImageUrl: this.avatarManifest.fallbackPortrait || undefined,
    });
  }

  private syncPresetButtonsFromManifest(): void {
    for (const button of this.presetButtons) {
      const preset = button.dataset.avatarPreset || "";
      const imageEl = button.querySelector<HTMLImageElement>("[data-preset-thumb]");
      const presetThumb = this.avatarManifest.presetThumbs?.[preset];
      button.classList.toggle("is-active", preset === this.currentPreset);
      if (!imageEl) {
        continue;
      }
      if (presetThumb) {
        imageEl.src = presetThumb;
        imageEl.removeAttribute("hidden");
      } else {
        imageEl.src = "";
        imageEl.setAttribute("hidden", "hidden");
      }
    }
  }

  private updatePresetButtons(): void {
    for (const button of this.presetButtons) {
      button.classList.toggle("is-active", button.dataset.avatarPreset === this.currentPreset);
    }
  }
}

export async function bootstrapSceneShellApp(root: HTMLElement, options: SceneShellOptions = {}): Promise<BrowserSceneShellApp> {
  const app = new BrowserSceneShellApp(root, options);
  await app.init();
  return app;
}
