import { afterEach, describe, expect, it, vi } from "vitest";
import { ExtensionRegistry } from "@kiosk-scene/core";
import { isSameOrigin, resolveBootstrapUrl, resolveHostedUrl } from "../src/bootstrap";
import { loadBootstrapExtensions } from "../src/kiosk-extensions";

const PAGE = "http://kiosk.test/scene-runtime/index.html";

function setQuery(query: string): void {
  window.history.replaceState(null, "", `${PAGE}${query}`);
}

afterEach(() => {
  setQuery("");
  vi.restoreAllMocks();
});

describe("same-origin rules for what the page is told to run", () => {
  it("accepts only this origin for ?bootstrap=", () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    setQuery("?bootstrap=https://evil.example/b.json");
    expect(resolveBootstrapUrl()).toBe("../scene-api/bootstrap");
    setQuery("?bootstrap=//evil.example/b.json");
    expect(resolveBootstrapUrl()).toBe("../scene-api/bootstrap");
    setQuery("?bootstrap=/scene-api/bootstrap");
    expect(resolveBootstrapUrl()).toBe("/scene-api/bootstrap");
    setQuery("?bootstrap=http://kiosk.test/other/bootstrap.json");
    expect(resolveBootstrapUrl()).toBe("http://kiosk.test/other/bootstrap.json");
    expect(isSameOrigin("javascript:alert(1)")).toBe(false);
  });

  it("never loads an extension whose module or API base is on another origin", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const registry = new ExtensionRegistry();
    const reports = await loadBootstrapExtensions(
      registry,
      {
        success: true,
        extensions: [
          { id: "evil", title: "x", moduleUrl: "https://evil.example/x.js", config: {} },
          { id: "leaky", title: "y", moduleUrl: "/scene-extensions/leaky/y.js", config: { apiBase: "https://evil.example/api/" } },
        ],
      } as never,
      "/scene-api/bootstrap",
    );
    expect(reports.map((r) => [r.id, r.ok])).toEqual([["evil", false], ["leaky", false]]);
    expect(reports.every((r) => r.error?.includes("same origin"))).toBe(true);
  });

  it("resolves root-relative extension URLs under an ingress prefix", () => {
    const bootstrap = "https://ha.local/api/hassio_ingress/TOKEN/scene-api/bootstrap";
    expect(resolveHostedUrl("/domovoy-api/", bootstrap)).toBe("https://ha.local/api/hassio_ingress/TOKEN/domovoy-api/");
    expect(resolveHostedUrl("/scene-extensions/domovoy/domovoy.js?v=1", bootstrap)).toBe("https://ha.local/api/hassio_ingress/TOKEN/scene-extensions/domovoy/domovoy.js?v=1");
  });
});
