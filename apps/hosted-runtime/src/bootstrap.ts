import { fetchWithTimeout } from "@kiosk-scene/core";
import { isAbsoluteUrl } from "@kiosk-scene/core";

export interface ExtensionBootstrapEntry {
  id: string;
  moduleUrl: string;
  config?: Record<string, unknown>;
}

export interface SceneHostBootstrap {
  success?: boolean;
  packId?: string;
  entryUrl?: string;
  runtimeBaseUrl?: string;
  sceneEditorUrl?: string;
  sceneEditorFormUrl?: string;
  sceneEditorApiUrl?: string;
  adminUrl?: string;
  extensions?: ExtensionBootstrapEntry[];
  files?: {
    rendererConfigUrl?: string;
    sceneConfigUrl?: string;
    entityMapUrl?: string;
    avatarManifestUrl?: string;
    haStatesUrl?: string;
    avatarCatalogUrl?: string;
    avatarImportUrl?: string;
    avatarPackApiUrl?: string;
  };
  availability?: Record<string, boolean>;
}

export const DEFAULT_BOOTSTRAP_URL = "../scene-api/bootstrap";
const LEGACY_LIVE2D_PREFIX = "/local/live2d/";
const SCENE_LEGACY_LIVE2D_PREFIX = "/scene-legacy/live2d/";

export function isSameOrigin(url: string, base: string = window.location.href): boolean {
  try {
    return new URL(url, base).origin === window.location.origin;
  } catch {
    return false;
  }
}

/**
 * The bootstrap document decides which code the page runs (extension modules are `import()`ed from it), so `?bootstrap=`
 * is honoured only when it points at this same origin. A link that says `?bootstrap=https://elsewhere/…` must not be able
 * to make a kiosk (or an admin page sharing Home Assistant's origin under ingress) execute someone else's script.
 */
export function resolveBootstrapUrl(): string {
  const requested = new URLSearchParams(window.location.search).get("bootstrap");
  if (requested && isSameOrigin(requested)) {
    return requested;
  }
  if (requested) {
    console.warn(`Ignoring ?bootstrap=${requested}: it is not on this origin.`);
  }
  return DEFAULT_BOOTSTRAP_URL;
}

export function resolveIngressRoot(bootstrapUrl: string): string | null {
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

/** Pre-add-on installs stored avatar assets under `/local/live2d/`; the add-on serves them under `/scene-legacy/`. */
export function remapLegacyHostedUrl(value: string, bootstrapUrl: string): string {
  const normalized = String(value || "").trim();
  if (!normalized) {
    return "";
  }
  if (normalized.startsWith(LEGACY_LIVE2D_PREFIX)) {
    return `${SCENE_LEGACY_LIVE2D_PREFIX}${normalized.slice(LEGACY_LIVE2D_PREFIX.length)}`;
  }
  if (isAbsoluteUrl(normalized)) {
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

export function resolveHostedUrl(value: string, bootstrapUrl: string): string {
  const normalized = remapLegacyHostedUrl(String(value || "").trim(), bootstrapUrl);
  if (!normalized) {
    return "";
  }
  if (isAbsoluteUrl(normalized)) {
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

export async function loadBootstrap(url: string): Promise<SceneHostBootstrap> {
  const response = await fetchWithTimeout(fetch, url, { cache: "no-store" });
  let payload: SceneHostBootstrap;
  try {
    payload = await response.json() as SceneHostBootstrap;
  } catch {
    throw new Error(`Failed to load ${url}: HTTP ${response.status} (not JSON)`);
  }
  if (!response.ok || payload.success === false) {
    throw new Error(`Failed to load ${url}: HTTP ${response.status}`);
  }
  return payload;
}

export async function readJson<T>(url: string): Promise<T> {
  const response = await fetchWithTimeout(fetch, url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: HTTP ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export interface RetryOptions {
  /** Called before each wait with the failure and the wait in ms; return false to stop retrying. */
  onRetry?: (error: unknown, attempt: number, waitMs: number) => boolean | void;
  minDelayMs?: number;
  maxDelayMs?: number;
  sleep?: (ms: number) => Promise<void>;
  random?: () => number;
}

/**
 * Runs `boot` until it succeeds. A kiosk that starts while the add-on is still coming up (Home
 * Assistant reboot, add-on restart) must recover on its own instead of sitting on an error page.
 */
export async function retryBoot<T>(boot: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const minDelay = options.minDelayMs ?? 2_000;
  const maxDelay = options.maxDelayMs ?? 30_000;
  const sleep = options.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
  const random = options.random ?? Math.random;
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await boot();
    } catch (error) {
      const base = Math.min(maxDelay, minDelay * 2 ** Math.min(attempt - 1, 10));
      const waitMs = Math.round(base * (0.75 + random() * 0.5));
      if (options.onRetry?.(error, attempt, waitMs) === false) {
        throw error;
      }
      await sleep(waitMs);
    }
  }
}
