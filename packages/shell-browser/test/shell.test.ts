import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ExtensionRegistry, type AvatarAdapter, type ExtensionHost } from "@kiosk-scene/core";
import { BrowserSceneShellApp } from "../src/index";
import { BASE, defaultFiles, installFakeFetch, mountPoint, settle } from "./harness";

let shell: BrowserSceneShellApp | null = null;

async function start(options: ConstructorParameters<typeof BrowserSceneShellApp>[1] = {}) {
  const root = mountPoint();
  shell = new BrowserSceneShellApp(root, { rendererConfigUrl: `${BASE}renderer.config.json`, refreshIntervalMs: 60_000, ...options });
  await shell.init();
  await settle();
  return { root, shell };
}

beforeEach(() => {
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
});

afterEach(async () => {
  await shell?.dispose();
  shell = null;
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("scene shell rendering", () => {
  it("renders pages and does not tear down unchanged slides on refresh", async () => {
    installFakeFetch();
    const { root, shell } = await start();
    const slide = root.querySelector('[data-slide-id="cards"]') as HTMLElement;
    const card = slide.querySelector(".home-card, .mini-card") as HTMLElement;
    expect(slide).not.toBeNull();
    expect(card.textContent).toContain("Hello");

    await shell.refreshNow();
    await shell.refreshNow();
    expect(root.querySelector('[data-slide-id="cards"]')).toBe(slide);
    expect(slide.querySelector(".home-card, .mini-card")).toBe(card);
  });

  it("re-renders only the slide whose data changed", async () => {
    const backend = installFakeFetch(defaultFiles({
      rotation: { order: ["weather", "cards"], defaultDwellSeconds: 20 },
      pages: [
        { id: "weather", kind: "overview", title: "Weather" },
        { id: "cards", kind: "cards", title: "Cards", cards: [{ type: "text", caption: "Hello", value: "World" }] },
      ],
    }));
    const { root, shell } = await start();
    const overview = root.querySelector('[data-slide-id="weather"]') as HTMLElement;
    const cards = root.querySelector('[data-slide-id="cards"]') as HTMLElement;
    const cardsChild = cards.firstElementChild;
    const overviewChild = overview.firstElementChild;

    backend.files["state.json"] = { version: 1, online: true, revision: 2, message: "Dinner is ready" };
    await shell.refreshNow();

    expect(overview.textContent).toContain("Dinner is ready");
    expect(overview.firstElementChild).not.toBe(overviewChild);
    expect(cards.firstElementChild).toBe(cardsChild);
  });
});

describe("refresh lifecycle", () => {
  it("coalesces overlapping refreshes instead of stacking requests", async () => {
    const backend = installFakeFetch();
    const { shell } = await start();
    backend.hits = {};
    let release: () => void = () => undefined;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    backend.hooks["state.json"] = () => {
      // Only the first request is held open; later ones (if any) would pass straight through.
      backend.hooks["state.json"] = undefined;
      return gate.then(() => new Response(JSON.stringify({ version: 1, revision: 9 }), { status: 200 }));
    };
    const calls = Array.from({ length: 8 }, () => shell.refreshNow());
    await settle(3);
    release();
    await Promise.all(calls);
    await settle();
    // One in-flight cycle plus at most one queued follow-up, never eight.
    expect(backend.hits["state.json"]).toBeLessThanOrEqual(2);
    expect(backend.hits["state.json"]).toBeGreaterThanOrEqual(1);
  });

  it("removes its document listener and stops refreshing after dispose", async () => {
    const backend = installFakeFetch();
    const addSpy = vi.spyOn(document, "addEventListener");
    const removeSpy = vi.spyOn(document, "removeEventListener");
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
    const { shell } = await start({ refreshIntervalMs: 100 });
    const added = addSpy.mock.calls.filter(([type]) => type === "visibilitychange").length;
    expect(added).toBe(1);
    await shell.dispose();
    expect(removeSpy.mock.calls.filter(([type]) => type === "visibilitychange")).toHaveLength(1);
    backend.hits = {};
    await vi.advanceTimersByTimeAsync(1000);
    expect(backend.hits["state.json"] ?? 0).toBe(0);
    vi.useRealTimers();
  });

  it("marks the display stale after repeated connectivity failures and recovers", async () => {
    const backend = installFakeFetch();
    const { root, shell } = await start({ staleAfterFailures: 2 });
    const badge = root.querySelector("[data-stale-badge]") as HTMLElement;
    expect(badge.hidden).toBe(true);

    backend.hooks["state.json"] = () => {
      throw new TypeError("Failed to fetch");
    };
    await shell.refreshNow();
    expect(badge.hidden).toBe(true);
    await shell.refreshNow();
    expect(badge.hidden).toBe(false);
    expect(root.dataset.stale).toBe("true");

    backend.hooks["state.json"] = undefined;
    await shell.refreshNow();
    expect(badge.hidden).toBe(true);
    expect(root.dataset.stale).toBe("false");
  });

  it("does not report stale when an optional file is simply missing (4xx)", async () => {
    const files = defaultFiles();
    delete files["control.json"];
    installFakeFetch(files);
    const { root, shell } = await start({ staleAfterFailures: 1 });
    await shell.refreshNow();
    await shell.refreshNow();
    expect(root.dataset.stale).toBe("false");
  });

  it("keeps rendering the carousel when the avatar adapter throws", async () => {
    installFakeFetch();
    const broken: AvatarAdapter = {
      id: "broken",
      mount: async () => undefined,
      dispose: async () => undefined,
      setState: async () => {
        throw new Error("iframe gone");
      },
      setCue: async () => undefined,
      setViewPreset: async () => undefined,
      showBubble: async () => undefined,
      getCapabilities: () => ({ supportsEmotion: false, supportsMotion: false, supportsViewPresets: false, supportsLipSync: false }),
    };
    const { root, shell } = await start({ avatarAdapterFactory: () => broken });
    await shell.refreshNow();
    expect(root.querySelectorAll("[data-scene-page-id].slide").length).toBe(2);
  });

  it("init is idempotent", async () => {
    const backend = installFakeFetch();
    const { shell } = await start();
    const hits = backend.hits["renderer.config.json"];
    await shell.init();
    expect(backend.hits["renderer.config.json"]).toBe(hits);
  });
});

describe("auto rotation vs user interaction", () => {
  it("does not rotate away while a field inside the carousel has focus", async () => {
    installFakeFetch(defaultFiles({ rotation: { order: ["cards", "second"], defaultDwellSeconds: 5 } }));
    vi.useFakeTimers({ toFake: ["Date"] });
    const { root, shell } = await start({ interactionHoldMs: 45_000 });
    const active = (): number => Number((root.querySelector(".carousel-dot.is-active") as HTMLElement).dataset.slideIndex);
    expect(active()).toBe(0);

    const input = document.createElement("input");
    root.querySelector('[data-slide-id="cards"]')!.appendChild(input);
    input.focus();
    vi.setSystemTime(Date.now() + 30_000);
    await shell.refreshNow();
    expect(active()).toBe(0);

    input.remove();
    (document.activeElement as HTMLElement | null)?.blur?.();
    vi.setSystemTime(Date.now() + 120_000);
    await shell.refreshNow();
    expect(active()).toBe(1);
    vi.useRealTimers();
  });
});

describe("extension pages and widgets", () => {
  function registryWith(activate: (host: ExtensionHost) => void): ExtensionRegistry {
    const registry = new ExtensionRegistry();
    void registry.load({ manifest: { id: "demo", title: "Demo", version: "1", apiVersion: 1 }, activate });
    return registry;
  }

  it("mounts an app page once, keeps it across refreshes, and disposes it with the shell", async () => {
    installFakeFetch(defaultFiles({
      rotation: { order: ["today", "cards"], defaultDwellSeconds: 20 },
      pages: [
        { id: "today", kind: "app", title: "Today", app: "demo.today", props: { compact: true } },
        { id: "cards", kind: "cards", title: "Cards", cards: [] },
      ],
    }));
    const mounted = vi.fn();
    const disposed = vi.fn();
    const updated = vi.fn();
    const registry = registryWith((host) => {
      host.registerPage({
        id: "demo.today",
        title: "Today",
        modes: ["kiosk", "admin"],
        mount: (el, params) => {
          mounted(params);
          el.appendChild(Object.assign(document.createElement("input"), { id: "typed" }));
          return { update: updated, dispose: disposed };
        },
      });
    });
    await settle();
    const { root, shell } = await start({ extensions: registry });
    await settle();
    expect(mounted).toHaveBeenCalledTimes(1);
    expect(mounted).toHaveBeenCalledWith({ compact: true });
    const input = root.querySelector("#typed") as HTMLInputElement;
    input.value = "half-typed";

    for (let i = 0; i < 3; i += 1) {
      await shell.refreshNow();
    }
    expect(mounted).toHaveBeenCalledTimes(1);
    expect(root.querySelector("#typed")).toBe(input);
    expect(input.value).toBe("half-typed");

    await shell.dispose();
    expect(disposed).toHaveBeenCalledTimes(1);
  });

  it("shows a placeholder for an unavailable app page and upgrades when the extension loads later", async () => {
    installFakeFetch(defaultFiles({
      rotation: { order: ["today"], defaultDwellSeconds: 20 },
      pages: [{ id: "today", kind: "app", title: "Today", app: "demo.today" }],
    }));
    const registry = new ExtensionRegistry();
    const { root } = await start({ extensions: registry });
    expect(root.querySelector('[data-slide-id="today"]')!.textContent).toContain("not available");

    await registry.load({
      manifest: { id: "demo", title: "Demo", version: "1", apiVersion: 1 },
      activate(host: ExtensionHost) {
        host.registerPage({
          id: "demo.today",
          title: "Today",
          modes: ["kiosk"],
          mount: (el) => {
            el.textContent = "live page";
            return { dispose() {} };
          },
        });
      },
    });
    await settle();
    expect(root.querySelector('[data-slide-id="today"]')!.textContent).toContain("live page");
  });

  it("mounts widget cards into their slots and remounts only when the slide markup changes", async () => {
    installFakeFetch(defaultFiles({
      pages: [
        { id: "cards", kind: "cards", title: "Cards", cards: [{ type: "widget", widget: "demo.clock", props: { tz: "UTC" } }, { type: "text", caption: "T", value: "v" }] },
        { id: "second", kind: "cards", title: "Second", cards: [] },
      ],
    }));
    const mounts: unknown[] = [];
    const registry = registryWith((host) => {
      host.registerWidget({
        id: "demo.clock",
        title: "Clock",
        mount: (el, props) => {
          mounts.push(props);
          el.textContent = "12:00";
          return { dispose() {} };
        },
      });
    });
    await settle();
    const { root, shell } = await start({ extensions: registry });
    await settle();
    expect(mounts).toEqual([{ tz: "UTC" }]);
    expect(root.querySelector("[data-widget-slot]")!.textContent).toBe("12:00");
    await shell.refreshNow();
    await shell.refreshNow();
    expect(mounts).toHaveLength(1);
  });

  it("does not let a failing extension page break other slides", async () => {
    installFakeFetch(defaultFiles({
      rotation: { order: ["today", "cards"], defaultDwellSeconds: 20 },
      pages: [
        { id: "today", kind: "app", title: "Today", app: "demo.today" },
        { id: "cards", kind: "cards", title: "Cards", cards: [{ type: "text", caption: "Hello", value: "World" }] },
      ],
    }));
    const registry = registryWith((host) => {
      host.registerPage({ id: "demo.today", title: "Today", modes: ["kiosk"], mount: () => Promise.reject(new Error("no backend")) });
    });
    await settle();
    const { root } = await start({ extensions: registry });
    await settle();
    expect(root.querySelector('[data-slide-id="today"]')!.textContent).toContain("not available");
    expect(root.querySelector('[data-slide-id="cards"]')!.textContent).toContain("Hello");
  });
});
