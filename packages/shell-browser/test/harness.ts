import { vi } from "vitest";

export interface FakeBackend {
  files: Record<string, unknown>;
  /** Per-path override: return a Response, throw, or return undefined to fall through. */
  hooks: Record<string, (() => Response | Promise<Response> | undefined) | undefined>;
  hits: Record<string, number>;
}

export const BASE = "http://kiosk.test/scene-runtime/";

export function defaultFiles(sceneOverrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    "renderer.config.json": {
      version: 1,
      assistant: { name: "Tester", locale: "en-US" },
      avatar: { manifestUrl: "./avatar.manifest.json" },
      scene: { configUrl: "./scene.json" },
      state: { provider: "json", stateUrl: "./state.json", idleLinesUrl: "./idle.json" },
      control: { provider: "json", controlUrl: "./control.json" },
    },
    "avatar.manifest.json": { version: 1, adapter: "static", assetRoot: "./assets", capabilities: {} },
    "scene.json": {
      version: 1,
      rotation: { order: ["cards", "second"], defaultDwellSeconds: 20 },
      pages: [
        { id: "cards", kind: "cards", title: "Cards", cards: [{ type: "text", caption: "Hello", value: "World" }] },
        { id: "second", kind: "cards", title: "Second", cards: [{ type: "text", caption: "B", value: "2" }] },
      ],
      ...sceneOverrides,
    },
    "state.json": { version: 1, online: true, revision: 1, message: "" },
    "control.json": { version: 1, revision: 0, page: { mode: "auto" }, cue: {} },
    "idle.json": ["Idle line"],
    "weather.json": {},
  };
}

/** Installs a `fetch` that serves `files` from BASE; returns handles to steer failures per path. */
export function installFakeFetch(files: Record<string, unknown> = defaultFiles()): FakeBackend {
  const backend: FakeBackend = { files, hooks: {}, hits: {} };
  vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(String(input));
    const name = url.pathname.replace("/scene-runtime/", "");
    backend.hits[name] = (backend.hits[name] ?? 0) + 1;
    const hook = backend.hooks[name]?.();
    if (hook) {
      // Like a real fetch, a hooked (possibly never-answering) request rejects when its signal aborts.
      const signal = init?.signal;
      if (!signal) {
        return hook;
      }
      return Promise.race([
        hook,
        new Promise<Response>((_, reject) => {
          const abort = (): void => reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
          if (signal.aborted) {
            abort();
          } else {
            signal.addEventListener("abort", abort, { once: true });
          }
        }),
      ]);
    }
    if (name in backend.files) {
      return new Response(JSON.stringify(backend.files[name]), { status: 200 });
    }
    return new Response("not found", { status: 404 });
  }));
  return backend;
}

export function mountPoint(): HTMLElement {
  const root = document.createElement("div");
  root.id = "app";
  document.body.appendChild(root);
  return root;
}

export async function settle(times = 10): Promise<void> {
  for (let i = 0; i < times; i += 1) {
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}
