import { afterEach, describe, expect, it, vi } from "vitest";
import { ExtensionRegistry, type Extension, type ExtensionHost } from "@kiosk-scene/core";
import { buildRoute, h, mountAdminApp, parseRoute } from "../src/index";

function extension(mount: (el: HTMLElement) => void = () => undefined, disposed = vi.fn()): Extension {
  return {
    manifest: { id: "demo", title: "Demo", version: "1", apiVersion: 1 },
    activate(host: ExtensionHost) {
      for (const [id, order] of [["demo.today", 1], ["demo.search", 2]] as const) {
        host.registerPage({
          id,
          title: id.split(".")[1],
          modes: ["admin"],
          order,
          mount: (el: HTMLElement) => {
            el.replaceChildren(h("p", null, `page ${id}`));
            mount(el);
            return { dispose: disposed };
          },
        });
      }
    },
  };
}

async function settle(): Promise<void> {
  for (let i = 0; i < 5; i += 1) {
    await Promise.resolve();
  }
}

afterEach(() => {
  document.body.innerHTML = "";
  window.location.hash = "";
});

describe("routing helpers", () => {
  it("round-trips ids and params", () => {
    const route = buildRoute("demo.search", { q: "резистор 10 кОм" });
    expect(parseRoute(route)).toEqual({ pageId: "demo.search", params: { q: "резистор 10 кОм" } });
    expect(parseRoute("")).toEqual({ pageId: "", params: {} });
  });
});

describe("mountAdminApp", () => {
  it("shows the first page, navigates by hash and disposes the previous page", async () => {
    const registry = new ExtensionRegistry();
    const disposed = vi.fn();
    await registry.load(extension(undefined, disposed));
    const root = h("div");
    document.body.appendChild(root);
    const app = mountAdminApp(root, { registry, title: "Home" });
    await settle();
    expect(root.textContent).toContain("page demo.today");
    expect(root.querySelector('[aria-current="page"]')?.getAttribute("data-page-id")).toBe("demo.today");

    app.navigate("demo.search");
    await settle();
    expect(root.textContent).toContain("page demo.search");
    expect(disposed).toHaveBeenCalledTimes(1);
    app.dispose();
    expect(disposed).toHaveBeenCalledTimes(2);
  });

  it("isolates a crashing page behind an error boundary with retry", async () => {
    const registry = new ExtensionRegistry();
    let attempts = 0;
    await registry.load({
      manifest: { id: "demo", title: "Demo", version: "1", apiVersion: 1 },
      activate(host: ExtensionHost) {
        host.registerPage({
          id: "demo.flaky",
          title: "Flaky",
          modes: ["admin"],
          mount: (el: HTMLElement) => {
            attempts += 1;
            if (attempts === 1) {
              throw new Error("render exploded");
            }
            el.replaceChildren(h("p", null, "recovered"));
            return { dispose() {} };
          },
        });
      },
    });
    const root = h("div");
    document.body.appendChild(root);
    const app = mountAdminApp(root, { registry });
    await settle();
    expect(root.querySelector('[role="alert"]')?.textContent).toContain("render exploded");
    root.querySelector<HTMLButtonElement>('[role="alert"] button')?.click();
    await settle();
    expect(root.textContent).toContain("recovered");
    app.dispose();
  });

  it("shows an unknown-route message and an empty state without extensions", async () => {
    const empty = new ExtensionRegistry();
    const root = h("div");
    document.body.appendChild(root);
    mountAdminApp(root, { registry: empty }).dispose();

    const registry = new ExtensionRegistry();
    await registry.load(extension());
    const app = mountAdminApp(root, { registry });
    app.navigate("demo.missing");
    await settle();
    expect(root.textContent).toContain("This page does not exist");
    app.dispose();
  });

  it("does not let a slow mount of an old page win over the current one", async () => {
    const registry = new ExtensionRegistry();
    let releaseSlow: () => void = () => undefined;
    const slowDisposed = vi.fn();
    await registry.load({
      manifest: { id: "demo", title: "Demo", version: "1", apiVersion: 1 },
      activate(host: ExtensionHost) {
        host.registerPage({
          id: "demo.slow",
          title: "Slow",
          modes: ["admin"],
          order: 1,
          mount: () => new Promise((resolve) => {
            releaseSlow = () => resolve({ dispose: slowDisposed });
          }),
        });
        host.registerPage({ id: "demo.fast", title: "Fast", modes: ["admin"], order: 2, mount: (el: HTMLElement) => { el.replaceChildren("fast"); return { dispose() {} }; } });
      },
    });
    const root = h("div");
    document.body.appendChild(root);
    const app = mountAdminApp(root, { registry });
    await settle();
    app.navigate("demo.fast");
    await settle();
    releaseSlow();
    await settle();
    expect(slowDisposed).toHaveBeenCalledTimes(1);
    expect(root.textContent).toContain("fast");
    app.dispose();
  });

  it("phone drawer: closed = not focusable, open = focus inside, Escape closes and returns focus", async () => {
    vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({ matches: query.includes("899px"), media: query, addEventListener() {}, removeEventListener() {} }) as unknown as MediaQueryList);
    const registry = new ExtensionRegistry();
    await registry.load(extension());
    const root = h("div");
    document.body.appendChild(root);
    const app = mountAdminApp(root, { registry, title: "Home" });
    await settle();
    const sidebar = root.querySelector<HTMLElement>(".ks-sidebar")!;
    const button = root.querySelector<HTMLButtonElement>(".ks-menu-button")!;
    expect(sidebar.hasAttribute("inert")).toBe(true);
    expect(button.getAttribute("aria-expanded")).toBe("false");

    button.click();
    expect(sidebar.hasAttribute("inert")).toBe(false);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(root.querySelector(".ks-admin")!.getAttribute("data-menu")).toBe("open");
    expect(sidebar.contains(document.activeElement)).toBe(true);

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(root.querySelector(".ks-admin")!.getAttribute("data-menu")).toBe("closed");
    expect(sidebar.hasAttribute("inert")).toBe(true);
    expect(document.activeElement).toBe(button);
    app.dispose();
    vi.restoreAllMocks();
  });
});
