import { describe, expect, it } from "vitest";
import { resolveBaseUrl, resolveIngressRoot, resolveUrlAgainst } from "@kiosk-scene/core";

const INGRESS = "https://ha.example/api/hassio_ingress/abc123/scene-runtime/index.html";
const DIRECT = "http://homeassistant.local:48123/scene-runtime/";

describe("url helpers", () => {
  it("re-anchors root-relative urls under the ingress root", () => {
    expect(resolveIngressRoot(INGRESS)).toBe("https://ha.example/api/hassio_ingress/abc123/");
    expect(resolveUrlAgainst(INGRESS, "/scene-api/bootstrap")).toBe("https://ha.example/api/hassio_ingress/abc123/scene-api/bootstrap");
  });

  it("uses the origin for direct access", () => {
    expect(resolveIngressRoot(DIRECT)).toBe("");
    expect(resolveUrlAgainst(DIRECT, "/scene-api/bootstrap")).toBe("http://homeassistant.local:48123/scene-api/bootstrap");
  });

  it("keeps absolute urls and resolves relative ones", () => {
    expect(resolveUrlAgainst(DIRECT, "https://x.test/a.json")).toBe("https://x.test/a.json");
    expect(resolveUrlAgainst(DIRECT, "//cdn.test/a.js")).toBe("//cdn.test/a.js");
    expect(resolveUrlAgainst(DIRECT, "./assets/a.svg")).toBe("http://homeassistant.local:48123/scene-runtime/assets/a.svg");
    expect(resolveUrlAgainst(DIRECT, "  ")).toBe("");
  });

  it("derives a directory url", () => {
    expect(resolveBaseUrl("http://h/scene-packs/neiri/renderer.json")).toBe("http://h/scene-packs/neiri/");
  });
});
