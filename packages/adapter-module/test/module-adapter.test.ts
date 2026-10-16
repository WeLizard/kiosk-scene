import { describe, expect, it, vi } from "vitest";
import { sanitizeAvatarManifestV1, type StateV1 } from "@kiosk-scene/core";
import { createModuleAdapter, type AvatarModuleContext } from "@kiosk-scene/adapter-module";

const manifest = sanitizeAvatarManifestV1({
  version: 1,
  adapter: "module",
  assetRoot: "./room/",
  entry: "/scene-packs/demo/room/avatar.js",
  capabilities: { supportsMotion: true, supportsViewPresets: true },
});

const state = (activity: string): StateV1 => ({ version: 1, revision: 1, activity });
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("module avatar adapter", () => {
  it("keeps the module adapter through manifest sanitizing", () => {
    expect(manifest.adapter).toBe("module");
  });

  it("mounts without waiting for the module and replays the latest calls once it is ready", async () => {
    let release: () => void = () => {};
    const gate = new Promise<void>((resolve) => { release = resolve; });
    const controller = { setState: vi.fn(), setViewPreset: vi.fn(), dispose: vi.fn(), capabilities: { supportsPointerFocus: true } };
    let context: AvatarModuleContext | null = null;
    const importModule = vi.fn(async () => ({
      createAvatar: async (ctx: AvatarModuleContext) => { context = ctx; await gate; return controller; },
    }));
    const adapter = createModuleAdapter({ manifest, importModule });
    const host = document.createElement("div");
    await adapter.mount({ host, assetRoot: "./room/" });
    await adapter.setState(state("thinking"));
    await adapter.setState(state("reading"));
    await adapter.setViewPreset("torso");
    expect(controller.setState).not.toHaveBeenCalled();

    release();
    await flush();
    await flush();
    expect(importModule).toHaveBeenCalledWith("http://kiosk.test/scene-packs/demo/room/avatar.js");
    expect(context!.resolveAsset("./room.glb")).toBe("http://kiosk.test/scene-runtime/room/room.glb");
    expect(controller.setState).toHaveBeenCalledTimes(1);
    expect(controller.setState).toHaveBeenCalledWith(state("reading"));
    expect(controller.setViewPreset).toHaveBeenCalledWith("torso");
    expect(adapter.getCapabilities().supportsPointerFocus).toBe(true);
    expect(adapter.getCapabilities().supportsMotion).toBe(true);

    await adapter.dispose();
    expect(controller.dispose).toHaveBeenCalled();
  });

  it("shows its own bubble when the module has none, and survives a module that fails to load", async () => {
    const adapter = createModuleAdapter({ manifest, importModule: async () => { throw new Error("offline"); } });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const host = document.createElement("div");
    await adapter.mount({ host, assetRoot: "./room/" });
    await adapter.showBubble("Привет");
    await flush();
    const bubble = host.querySelector<HTMLElement>(".ks-module-avatar-bubble");
    expect(bubble?.textContent).toBe("Привет");
    expect(host.querySelector<HTMLElement>(".ks-module-avatar")?.dataset.ready).toBe("error");
    warn.mockRestore();
  });
});
