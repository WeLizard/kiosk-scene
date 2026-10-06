import { describe, expect, it } from "vitest";
import { ExtensionRegistry, type Extension } from "@kiosk-scene/core";
import { loadExtensions } from "../src/loader";

const extension = (id: string, activate: Extension["activate"] = () => undefined): Extension => ({
  manifest: { id, title: id, version: "1", apiVersion: 1 },
  activate,
});

describe("loadExtensions", () => {
  it("loads what it can and reports what it cannot, never throwing", async () => {
    const registry = new ExtensionRegistry();
    const modules: Record<string, unknown> = {
      "/ok.js": { default: extension("alpha") },
      "/bad-shape.js": { default: { nothing: true } },
      "/wrong-id.js": { default: extension("gamma") },
    };
    const reports = await loadExtensions(
      registry,
      [
        { id: "alpha", moduleUrl: "/ok.js" },
        { id: "beta", moduleUrl: "/missing.js" },
        { id: "delta", moduleUrl: "/bad-shape.js" },
        { id: "epsilon", moduleUrl: "/wrong-id.js" },
      ],
      { importModule: async (url) => (url in modules ? modules[url] : Promise.reject(new Error("404"))) },
    );
    expect(reports.map((r) => [r.id, r.ok])).toEqual([["alpha", true], ["beta", false], ["delta", false], ["epsilon", false]]);
    expect(reports[3].error).toContain("configured as");
    expect(registry.listExtensions().map((m) => m.id)).toEqual(["alpha"]);              // the mismatching one was unloaded again
  });

  it("times out an extension that never finishes importing", async () => {
    const registry = new ExtensionRegistry();
    const reports = await loadExtensions(registry, [{ id: "slow", moduleUrl: "/slow.js" }], { importModule: () => new Promise(() => undefined), timeoutMs: 20 });
    expect(reports[0]).toMatchObject({ id: "slow", ok: false });
    expect(reports[0].error).toContain("timed out");
  });

  it("a failed second attempt never unloads the extension that is already running", async () => {
    const registry = new ExtensionRegistry();
    await loadExtensions(registry, [{ id: "alpha", moduleUrl: "/ok.js" }], { importModule: async () => ({ default: extension("alpha") }) });
    const again = await loadExtensions(registry, [{ id: "alpha", moduleUrl: "/ok.js" }], { importModule: async () => ({ default: extension("alpha") }) });
    expect(again[0].ok).toBe(false);                                                    // "already loaded"
    expect(registry.listExtensions().map((m) => m.id)).toEqual(["alpha"]);              // and the first one is untouched
  });

  it("rolls back what a throwing activate() had registered", async () => {
    const registry = new ExtensionRegistry();
    const reports = await loadExtensions(
      registry,
      [{ id: "half", moduleUrl: "/half.js" }],
      {
        importModule: async () => ({
          default: extension("half", (host) => {
            host.registerWidget({ id: "half.card", title: "c", mount: () => ({ dispose() {} }) });
            throw new Error("boom");
          }),
        }),
      },
    );
    expect(reports[0].ok).toBe(false);
    expect(registry.listWidgets()).toEqual([]);
  });
});
