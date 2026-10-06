import { describe, expect, it } from "vitest";
import {
  deepMergeObject,
  resolveSceneRuntimeConfig,
  resolveSceneSelection,
  sanitizeControlV1,
  createPinnedPageControl,
  DEFAULT_CONTROL_V1,
} from "@kiosk-scene/core";

const baseDisplay = {
  safeAreaPx: { top: 0, right: 0, bottom: 0, left: 0 },
  layoutPaddingPx: 16,
  layoutGapPx: 16,
  globalScale: 1,
};

describe("scene runtime config", () => {
  it("keeps rotation order for pages whose ids contain uppercase letters", () => {
    const config = resolveSceneRuntimeConfig({
      version: 1,
      kind: "scene.display",
      rotation: { order: ["Weather", "Home", "week"], defaultDwellMs: 18_000 },
      display: baseDisplay,
      pages: [
        { id: "week", kind: "cards", title: "Week" },
        { id: "Home", kind: "cards", title: "Home" },
        { id: "Weather", kind: "overview", title: "Weather" },
      ],
    });
    expect(config.rotation.order).toEqual(["Weather", "Home", "week"]);
    expect(config.pages.map((page) => page.id)).toEqual(["Weather", "Home", "week"]);
  });

  it("pins an uppercase page id to the right index", () => {
    const config = resolveSceneRuntimeConfig({
      version: 1,
      kind: "scene.display",
      rotation: { order: ["a", "Home"], defaultDwellMs: 18_000 },
      display: baseDisplay,
      pages: [
        { id: "a", kind: "cards", title: "A" },
        { id: "Home", kind: "cards", title: "Home" },
      ],
    });
    const control = createPinnedPageControl(DEFAULT_CONTROL_V1, "Home", 60_000);
    expect(control.page.target).toBe("Home");
    const selection = resolveSceneSelection({
      control,
      rotation: config.rotation,
      activeIndex: 0,
      lastAutoRotateAt: 0,
      isEligible: () => true,
    });
    expect(selection.nextIndex).toBe(1);
  });

  it("does not let __proto__ keys poison merged objects", () => {
    const payload = JSON.parse('{"__proto__": {"polluted": true}, "x": 1}');
    const merged = deepMergeObject({ a: 1 } as Record<string, unknown>, payload);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
    expect(Object.getPrototypeOf(merged)).toBe(Object.prototype);
    expect((merged as Record<string, unknown>).polluted).toBeUndefined();
    expect((merged as Record<string, unknown>).x).toBe(1);
  });

  it("expires pinned pages and cues", () => {
    const now = Date.now();
    const control = sanitizeControlV1({
      page: { mode: "pinned", target: "home", until: new Date(now - 1000).toISOString() },
      cue: { cue: "greet", until: new Date(now - 1000).toISOString() },
    }, now);
    expect(control.page.mode).toBe("auto");
    expect(control.cue.cue).toBeNull();
  });
});

describe("renderer config weather block", () => {
  it("keeps a valid weather config and drops garbage", async () => {
    const { sanitizeRendererConfigV1 } = await import("@kiosk-scene/core");
    const good = sanitizeRendererConfigV1({
      weather: { entity: "weather.home", location: "Sofia", openMeteo: { latitude: 42.7, longitude: 23.3 } },
    });
    expect(good.weather).toEqual({ entity: "weather.home", location: "Sofia", openMeteo: { latitude: 42.7, longitude: 23.3, timezone: undefined } });
    expect(sanitizeRendererConfigV1({ weather: { openMeteo: { latitude: 999, longitude: 1 } } }).weather).toBeUndefined();
    expect(sanitizeRendererConfigV1({}).weather).toBeUndefined();
  });
});
