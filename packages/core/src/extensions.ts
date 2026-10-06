/**
 * Generic extension model.
 *
 * KioskScene knows nothing about what an extension does. An extension contributes:
 *
 *  - data providers      – read-side integrations (`read(params)`),
 *  - action providers    – write-side integrations (`invoke(action, input)`),
 *  - widgets             – small interactive/live cards placed on scene pages (`type: "widget"`),
 *  - pages               – full application pages (kiosk `kind: "app"` slides and admin routes),
 *  - realtime sources    – push/poll channels that tell pages what changed.
 *
 * Everything an extension registers is owned by the extension id, so unloading or
 * replacing an extension removes exactly its contributions.
 */

export const EXTENSION_API_VERSION = 1;

export type ExtensionMode = "kiosk" | "admin";
export type Unsubscribe = () => void;

export interface ExtensionManifest {
  /** Stable lowercase id, e.g. `domovoy`. Contribution ids are namespaced `<id>.<name>`. */
  id: string;
  title: string;
  version: string;
  apiVersion: typeof EXTENSION_API_VERSION;
}

/** Structured, user-presentable failure. Providers never throw across the boundary. */
export interface ExtensionError {
  code: string;
  message: string;
  /** Field-level validation problems, keyed by input field. */
  fields?: Record<string, string>;
  retryable?: boolean;
}

export type ExtensionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ExtensionError };

export interface ProviderCallContext {
  signal?: AbortSignal;
}

export interface DataProvider<TParams = unknown, TData = unknown> {
  readonly id: string;
  read(params: TParams, context?: ProviderCallContext): Promise<ExtensionResult<TData>>;
}

export interface ActionDescriptor {
  id: string;
  title: string;
  /** Destructive actions must be confirmed by the UI before invocation. */
  destructive?: boolean;
}

export interface ActionProvider {
  readonly id: string;
  describe(): ActionDescriptor[];
  invoke<TResult = unknown>(
    action: string,
    input: unknown,
    context?: ProviderCallContext,
  ): Promise<ExtensionResult<TResult>>;
}

export type RealtimeStatus = "connecting" | "live" | "reconnecting" | "offline";

export interface RealtimeMessage {
  topic: string;
  payload?: unknown;
  /** Monotonic cursor assigned by the source, used to resume after a reconnect. */
  cursor?: number;
}

export interface RealtimeSource {
  readonly id: string;
  status(): RealtimeStatus;
  subscribe(topic: string, listener: (message: RealtimeMessage) => void): Unsubscribe;
  onStatus(listener: (status: RealtimeStatus) => void): Unsubscribe;
  close(): void;
}

/** Everything a page or widget receives from the host. */
export interface ExtensionRuntime {
  mode: ExtensionMode;
  locale: string;
  /** Resolves a possibly root-relative URL against the ingress-aware base. */
  resolveUrl(url: string): string;
  readData<T = unknown>(providerId: string, params?: unknown, context?: ProviderCallContext): Promise<ExtensionResult<T>>;
  invokeAction<T = unknown>(providerId: string, action: string, input?: unknown, context?: ProviderCallContext): Promise<ExtensionResult<T>>;
  subscribe(sourceId: string, topic: string, listener: (message: RealtimeMessage) => void): Unsubscribe;
  onRealtimeStatus(sourceId: string, listener: (status: RealtimeStatus) => void): Unsubscribe;
  /** Navigate the host (admin router / kiosk carousel) to a registered page. */
  navigate(pageId: string, params?: Record<string, string>): void;
  /** Ask the host to re-read its data sources now (the kiosk scene refreshes state/control immediately). */
  refresh(): void;
  /** Extension-scoped configuration from `extension.json`. */
  config: Record<string, unknown>;
}

export interface MountedView {
  /** Called when the host has new props/params for a view that stays mounted. */
  update?(props: Record<string, unknown>): void;
  dispose(): void;
}

export interface WidgetDefinition {
  /** Card `widget` value, namespaced: `domovoy.today`. */
  id: string;
  title: string;
  mount(host: HTMLElement, props: Record<string, unknown>, runtime: ExtensionRuntime): MountedView | Promise<MountedView>;
}

export interface PageDefinition {
  /** Namespaced: `domovoy.search`. */
  id: string;
  title: string;
  /** Short symbol (emoji or 1–2 letters) shown in navigation. */
  icon?: string;
  modes: ExtensionMode[];
  /** Ordering inside navigation; lower first. */
  order?: number;
  /** Optional grouping label in navigation. */
  group?: string;
  mount(host: HTMLElement, params: Record<string, unknown>, runtime: ExtensionRuntime): MountedView | Promise<MountedView>;
}

/**
 * A background service: runs while the host is up, without owning any UI (keeps a realtime subscription alive,
 * mirrors external state into the scene, ...). `start` returns its stop function.
 */
export interface ServiceDefinition {
  /** Namespaced: `domovoy.avatar-sync`. */
  id: string;
  title: string;
  modes: ExtensionMode[];
  start(runtime: ExtensionRuntime): Unsubscribe | Promise<Unsubscribe>;
}

export interface ExtensionHost {
  readonly extensionId: string;
  registerDataProvider(provider: DataProvider): void;
  registerActionProvider(provider: ActionProvider): void;
  registerWidget(widget: WidgetDefinition): void;
  registerPage(page: PageDefinition): void;
  registerRealtimeSource(source: RealtimeSource): void;
  registerService(service: ServiceDefinition): void;
  config: Record<string, unknown>;
}

export interface Extension {
  manifest: ExtensionManifest;
  activate(host: ExtensionHost): void | Promise<void>;
  deactivate?(): void | Promise<void>;
}

const ID_PATTERN = /^[a-z][a-z0-9-]{1,31}$/;
const CONTRIBUTION_PATTERN = /^[a-z][a-z0-9-]{1,31}\.[a-z0-9][a-z0-9._-]{0,63}$/;

export class ExtensionRegistryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExtensionRegistryError";
  }
}

interface Owned<T> {
  owner: string;
  value: T;
}

type RegistryListener = () => void;

export function isValidExtensionId(id: string): boolean {
  return ID_PATTERN.test(id);
}

/** Validates an extension module's default export at the trust boundary. */
export function assertExtension(candidate: unknown): Extension {
  const value = candidate as Partial<Extension> | null;
  if (!value || typeof value !== "object" || typeof value.activate !== "function") {
    throw new ExtensionRegistryError("Extension module must export an object with activate().");
  }
  const manifest = value.manifest;
  if (!manifest || typeof manifest !== "object") {
    throw new ExtensionRegistryError("Extension is missing its manifest.");
  }
  if (!isValidExtensionId(String(manifest.id ?? ""))) {
    throw new ExtensionRegistryError(`Invalid extension id: ${String(manifest.id)}`);
  }
  if (manifest.apiVersion !== EXTENSION_API_VERSION) {
    throw new ExtensionRegistryError(
      `Extension ${manifest.id} targets API v${String(manifest.apiVersion)}, host supports v${EXTENSION_API_VERSION}.`,
    );
  }
  return value as Extension;
}

export class ExtensionRegistry {
  private readonly extensions = new Map<string, Extension>();
  private readonly dataProviders = new Map<string, Owned<DataProvider>>();
  private readonly actionProviders = new Map<string, Owned<ActionProvider>>();
  private readonly widgets = new Map<string, Owned<WidgetDefinition>>();
  private readonly pages = new Map<string, Owned<PageDefinition>>();
  private readonly realtimeSources = new Map<string, Owned<RealtimeSource>>();
  private readonly services = new Map<string, Owned<ServiceDefinition>>();
  private readonly listeners = new Set<RegistryListener>();

  /**
   * Activates an extension. If activation throws, everything it registered so far is
   * rolled back so a broken extension can never leave half a UI behind.
   */
  async load(candidate: unknown, config: Record<string, unknown> = {}): Promise<Extension> {
    const extension = assertExtension(candidate);
    const id = extension.manifest.id;
    if (this.extensions.has(id)) {
      throw new ExtensionRegistryError(`Extension already loaded: ${id}`);
    }
    this.extensions.set(id, extension);
    try {
      await extension.activate(this.createHost(id, config));
    } catch (error) {
      this.removeContributions(id);
      this.extensions.delete(id);
      throw error;
    }
    this.emit();
    return extension;
  }

  async unload(id: string): Promise<void> {
    const extension = this.extensions.get(id);
    if (!extension) {
      return;
    }
    try {
      await extension.deactivate?.();
    } finally {
      this.removeContributions(id);
      this.extensions.delete(id);
      this.emit();
    }
  }

  listExtensions(): ExtensionManifest[] {
    return Array.from(this.extensions.values()).map((extension) => extension.manifest);
  }

  getDataProvider(id: string): DataProvider | null {
    return this.dataProviders.get(id)?.value ?? null;
  }

  getActionProvider(id: string): ActionProvider | null {
    return this.actionProviders.get(id)?.value ?? null;
  }

  getWidget(id: string): WidgetDefinition | null {
    return this.widgets.get(id)?.value ?? null;
  }

  getPage(id: string): PageDefinition | null {
    return this.pages.get(id)?.value ?? null;
  }

  getRealtimeSource(id: string): RealtimeSource | null {
    return this.realtimeSources.get(id)?.value ?? null;
  }

  ownerOf(contributionId: string): string | null {
    return (
      this.pages.get(contributionId)?.owner
      ?? this.widgets.get(contributionId)?.owner
      ?? this.dataProviders.get(contributionId)?.owner
      ?? this.actionProviders.get(contributionId)?.owner
      ?? this.realtimeSources.get(contributionId)?.owner
      ?? null
    );
  }

  listPages(mode?: ExtensionMode): PageDefinition[] {
    return Array.from(this.pages.values())
      .map((entry) => entry.value)
      .filter((page) => !mode || page.modes.includes(mode))
      .sort((left, right) => (left.order ?? 100) - (right.order ?? 100) || left.title.localeCompare(right.title));
  }

  listServices(mode?: ExtensionMode): ServiceDefinition[] {
    return Array.from(this.services.values())
      .map((entry) => entry.value)
      .filter((service) => !mode || service.modes.includes(mode));
  }

  listRealtimeSources(): RealtimeSource[] {
    return Array.from(this.realtimeSources.values()).map((entry) => entry.value);
  }

  listWidgets(): WidgetDefinition[] {
    return Array.from(this.widgets.values()).map((entry) => entry.value);
  }

  /** Subscribe to registry changes (extension loaded/unloaded). */
  onChange(listener: RegistryListener): Unsubscribe {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit(): void {
    for (const listener of Array.from(this.listeners)) {
      try {
        listener();
      } catch {
        // A faulty listener must not break registry consumers.
      }
    }
  }

  private createHost(extensionId: string, config: Record<string, unknown>): ExtensionHost {
    const claim = <T extends { id: string }>(
      store: Map<string, Owned<T>>,
      kind: string,
      value: T,
    ): void => {
      if (!CONTRIBUTION_PATTERN.test(value.id) || !value.id.startsWith(`${extensionId}.`)) {
        throw new ExtensionRegistryError(
          `${kind} id "${value.id}" must be namespaced as "${extensionId}.<name>".`,
        );
      }
      if (store.has(value.id)) {
        throw new ExtensionRegistryError(`${kind} already registered: ${value.id}`);
      }
      store.set(value.id, { owner: extensionId, value });
    };

    return {
      extensionId,
      config,
      registerDataProvider: (provider) => claim(this.dataProviders, "Data provider", provider),
      registerActionProvider: (provider) => claim(this.actionProviders, "Action provider", provider),
      registerWidget: (widget) => claim(this.widgets, "Widget", widget),
      registerPage: (page) => {
        if (!Array.isArray(page.modes) || !page.modes.length) {
          throw new ExtensionRegistryError(`Page ${page.id} must declare at least one mode.`);
        }
        claim(this.pages, "Page", page);
      },
      registerRealtimeSource: (source) => claim(this.realtimeSources, "Realtime source", source),
      registerService: (service) => {
        if (!Array.isArray(service.modes) || !service.modes.length) {
          throw new ExtensionRegistryError(`Service ${service.id} must declare at least one mode.`);
        }
        claim(this.services, "Service", service);
      },
    };
  }

  private removeContributions(extensionId: string): void {
    const stores: Array<Map<string, Owned<unknown>>> = [
      this.dataProviders,
      this.actionProviders,
      this.widgets,
      this.pages,
      this.services,
    ] as Array<Map<string, Owned<unknown>>>;
    for (const store of stores) {
      for (const [key, entry] of Array.from(store.entries())) {
        if (entry.owner === extensionId) {
          store.delete(key);
        }
      }
    }
    for (const [key, entry] of Array.from(this.realtimeSources.entries())) {
      if (entry.owner === extensionId) {
        try {
          entry.value.close();
        } finally {
          this.realtimeSources.delete(key);
        }
      }
    }
  }
}

/** Builds the runtime object handed to widgets/pages from a registry. */
export function createExtensionRuntime(options: {
  registry: ExtensionRegistry;
  mode: ExtensionMode;
  locale?: string;
  config?: Record<string, unknown>;
  resolveUrl?: (url: string) => string;
  navigate?: (pageId: string, params?: Record<string, string>) => void;
  refresh?: () => void;
}): ExtensionRuntime {
  const { registry } = options;
  const missing = <T>(kind: string, id: string): ExtensionResult<T> => ({
    ok: false,
    error: { code: "provider_missing", message: `${kind} "${id}" is not available.` },
  });
  const guard = async <T>(run: () => Promise<ExtensionResult<T>>): Promise<ExtensionResult<T>> => {
    try {
      return await run();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return { ok: false, error: { code: "aborted", message: "Request aborted." } };
      }
      return {
        ok: false,
        error: {
          code: "provider_failure",
          message: error instanceof Error ? error.message : String(error),
          retryable: true,
        },
      };
    }
  };

  return {
    mode: options.mode,
    locale: options.locale || "en-US",
    config: options.config ?? {},
    resolveUrl: options.resolveUrl ?? ((url) => url),
    readData: <T>(providerId: string, params?: unknown, context?: ProviderCallContext) => {
      const provider = registry.getDataProvider(providerId);
      return provider
        ? guard(() => provider.read(params, context) as Promise<ExtensionResult<T>>)
        : Promise.resolve(missing<T>("Data provider", providerId));
    },
    invokeAction: <T>(providerId: string, action: string, input?: unknown, context?: ProviderCallContext) => {
      const provider = registry.getActionProvider(providerId);
      return provider
        ? guard(() => provider.invoke<T>(action, input, context))
        : Promise.resolve(missing<T>("Action provider", providerId));
    },
    subscribe: (sourceId, topic, listener) => {
      const source = registry.getRealtimeSource(sourceId);
      return source ? source.subscribe(topic, listener) : () => undefined;
    },
    onRealtimeStatus: (sourceId, listener) => {
      const source = registry.getRealtimeSource(sourceId);
      if (!source) {
        listener("offline");
        return () => undefined;
      }
      listener(source.status());
      return source.onStatus(listener);
    },
    navigate: options.navigate ?? (() => undefined),
    refresh: options.refresh ?? (() => undefined),
  };
}

/**
 * Runs the background services of `mode` and keeps them in sync with the registry (extensions may load late).
 * A service that throws on start is skipped and reported; it never stops the others or the host.
 */
export class ServiceRunner {
  private readonly running = new Map<string, Unsubscribe>();
  private readonly starting = new Set<string>();
  private unsubscribe: Unsubscribe | null = null;
  private stopped = false;

  constructor(
    private readonly registry: ExtensionRegistry,
    private readonly mode: ExtensionMode,
    private readonly runtime: ExtensionRuntime,
    private readonly onError: (id: string, error: unknown) => void = () => undefined,
  ) {}

  start(): void {
    this.unsubscribe = this.registry.onChange(() => this.sync());
    this.sync();
  }

  stop(): void {
    this.stopped = true;
    this.unsubscribe?.();
    this.unsubscribe = null;
    for (const stop of Array.from(this.running.values())) {
      try {
        stop();
      } catch (error) {
        this.onError("stop", error);
      }
    }
    this.running.clear();
  }

  private sync(): void {
    const wanted = new Map(this.registry.listServices(this.mode).map((service) => [service.id, service]));
    for (const [id, stop] of Array.from(this.running.entries())) {
      if (!wanted.has(id)) {
        this.running.delete(id);
        try {
          stop();
        } catch (error) {
          this.onError(id, error);
        }
      }
    }
    for (const [id, service] of wanted) {
      if (this.running.has(id) || this.starting.has(id)) {
        continue;
      }
      this.starting.add(id);
      void Promise.resolve()
        .then(() => service.start(this.runtime))
        .then((stop) => {
          this.starting.delete(id);
          if (this.stopped || !this.registry.listServices(this.mode).some((item) => item.id === id)) {
            stop();
            return;
          }
          this.running.set(id, stop);
        })
        .catch((error) => {
          this.starting.delete(id);
          this.onError(id, error);
        });
    }
  }
}
