import { describe, expect, it, vi } from "vitest";
import {
  ExtensionRegistry,
  ExtensionRegistryError,
  createExtensionRuntime,
  type Extension,
  type RealtimeSource,
} from "@kiosk-scene/core";

function makeExtension(id: string, activate: Extension["activate"]): Extension {
  return { manifest: { id, title: id, version: "1.0.0", apiVersion: 1 }, activate };
}

function fakeSource(id: string): RealtimeSource & { closed: boolean } {
  return {
    id,
    closed: false,
    status: () => "live",
    subscribe: () => () => undefined,
    onStatus: () => () => undefined,
    close() {
      this.closed = true;
    },
  };
}

describe("ExtensionRegistry", () => {
  it("registers namespaced contributions and lists pages per mode in order", async () => {
    const registry = new ExtensionRegistry();
    await registry.load(makeExtension("demo", (host) => {
      host.registerPage({ id: "demo.b", title: "B", modes: ["admin"], order: 2, mount: () => ({ dispose() {} }) });
      host.registerPage({ id: "demo.a", title: "A", modes: ["admin", "kiosk"], order: 1, mount: () => ({ dispose() {} }) });
      host.registerPage({ id: "demo.k", title: "K", modes: ["kiosk"], order: 0, mount: () => ({ dispose() {} }) });
      host.registerWidget({ id: "demo.w", title: "W", mount: () => ({ dispose() {} }) });
    }));
    expect(registry.listPages("admin").map((page) => page.id)).toEqual(["demo.a", "demo.b"]);
    expect(registry.listPages("kiosk").map((page) => page.id)).toEqual(["demo.k", "demo.a"]);
    expect(registry.getWidget("demo.w")?.title).toBe("W");
    expect(registry.ownerOf("demo.a")).toBe("demo");
  });

  it("rejects contributions outside the extension namespace", async () => {
    const registry = new ExtensionRegistry();
    await expect(registry.load(makeExtension("demo", (host) => {
      host.registerWidget({ id: "other.w", title: "W", mount: () => ({ dispose() {} }) });
    }))).rejects.toBeInstanceOf(ExtensionRegistryError);
    expect(registry.listExtensions()).toEqual([]);
  });

  it("rolls back everything a failing extension registered", async () => {
    const registry = new ExtensionRegistry();
    const source = fakeSource("demo.rt");
    await expect(registry.load(makeExtension("demo", (host) => {
      host.registerPage({ id: "demo.p", title: "P", modes: ["admin"], mount: () => ({ dispose() {} }) });
      host.registerRealtimeSource(source);
      throw new Error("boom");
    }))).rejects.toThrow("boom");
    expect(registry.getPage("demo.p")).toBeNull();
    expect(registry.getRealtimeSource("demo.rt")).toBeNull();
    expect(source.closed).toBe(true);
    // The id is free again.
    await registry.load(makeExtension("demo", () => undefined));
    expect(registry.listExtensions()).toHaveLength(1);
  });

  it("prevents duplicate ids and unloads cleanly", async () => {
    const registry = new ExtensionRegistry();
    const source = fakeSource("demo.rt");
    const deactivate = vi.fn();
    const extension = makeExtension("demo", (host) => {
      host.registerPage({ id: "demo.p", title: "P", modes: ["admin"], mount: () => ({ dispose() {} }) });
      host.registerRealtimeSource(source);
    });
    extension.deactivate = deactivate;
    await registry.load(extension);
    await expect(registry.load(extension)).rejects.toBeInstanceOf(ExtensionRegistryError);
    await registry.unload("demo");
    expect(deactivate).toHaveBeenCalled();
    expect(registry.getPage("demo.p")).toBeNull();
    expect(source.closed).toBe(true);
  });

  it("validates extension modules at the trust boundary", async () => {
    const registry = new ExtensionRegistry();
    await expect(registry.load(null)).rejects.toBeInstanceOf(ExtensionRegistryError);
    await expect(registry.load({ manifest: { id: "Bad Id", apiVersion: 1 }, activate() {} })).rejects.toBeInstanceOf(ExtensionRegistryError);
    await expect(registry.load({ manifest: { id: "demo", apiVersion: 99 }, activate() {} })).rejects.toBeInstanceOf(ExtensionRegistryError);
  });

  it("notifies listeners when extensions load", async () => {
    const registry = new ExtensionRegistry();
    const listener = vi.fn();
    registry.onChange(listener);
    await registry.load(makeExtension("demo", () => undefined));
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe("createExtensionRuntime", () => {
  it("turns provider failures and missing providers into structured errors", async () => {
    const registry = new ExtensionRegistry();
    await registry.load(makeExtension("demo", (host) => {
      host.registerDataProvider({
        id: "demo.data",
        read: async () => {
          throw new Error("backend down");
        },
      });
      host.registerActionProvider({
        id: "demo.act",
        describe: () => [],
        invoke: async (_action, input) => ({ ok: true, data: input as never }),
      });
    }));
    const runtime = createExtensionRuntime({ registry, mode: "admin" });
    const failed = await runtime.readData("demo.data");
    expect(failed).toEqual({ ok: false, error: { code: "provider_failure", message: "backend down", retryable: true } });
    const missing = await runtime.readData("demo.nope");
    expect(missing.ok).toBe(false);
    const ok = await runtime.invokeAction("demo.act", "echo", { a: 1 });
    expect(ok).toEqual({ ok: true, data: { a: 1 } });
  });

  it("reports offline for an unknown realtime source", () => {
    const registry = new ExtensionRegistry();
    const runtime = createExtensionRuntime({ registry, mode: "kiosk" });
    const seen: string[] = [];
    runtime.onRealtimeStatus("x.y", (status) => seen.push(status));
    expect(seen).toEqual(["offline"]);
  });
});

describe("services", () => {
  it("runs background services per mode, follows late-loading extensions and stops them", async () => {
    const { ServiceRunner } = await import("@kiosk-scene/core");
    const registry = new ExtensionRegistry();
    const runtime = createExtensionRuntime({ registry, mode: "kiosk" });
    const started: string[] = [];
    const stopped: string[] = [];
    const errors: string[] = [];
    const runner = new ServiceRunner(registry, "kiosk", runtime, (id) => errors.push(id));
    runner.start();
    await registry.load(makeExtension("demo", (host) => {
      host.registerService({ id: "demo.sync", title: "Sync", modes: ["kiosk"], start: () => { started.push("sync"); return () => stopped.push("sync"); } });
      host.registerService({ id: "demo.admin-only", title: "Admin", modes: ["admin"], start: () => { started.push("admin"); return () => undefined; } });
      host.registerService({ id: "demo.broken", title: "Broken", modes: ["kiosk"], start: () => { throw new Error("nope"); } });
    }));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(started).toEqual(["sync"]);
    expect(errors).toEqual(["demo.broken"]);
    await registry.unload("demo");
    expect(stopped).toEqual(["sync"]);
    await registry.load(makeExtension("later", (host) => {
      host.registerService({ id: "later.svc", title: "Later", modes: ["kiosk"], start: () => { started.push("later"); return () => stopped.push("later"); } });
    }));
    await new Promise((resolve) => setTimeout(resolve, 0));
    runner.stop();
    expect(started).toEqual(["sync", "later"]);
    expect(stopped).toEqual(["sync", "later"]);
  });

  it("exposes refresh() to views", () => {
    const registry = new ExtensionRegistry();
    const refresh = vi.fn();
    createExtensionRuntime({ registry, mode: "kiosk", refresh }).refresh();
    expect(refresh).toHaveBeenCalledTimes(1);
  });
});
