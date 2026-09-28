import path from "node:path";
import { defineConfig } from "vitest/config";

const pkg = (name: string): string => path.resolve(__dirname, "packages", name, "src/index.ts");

export default defineConfig({
  resolve: {
    alias: {
      "@kiosk-scene/core": pkg("core"),
      "@kiosk-scene/adapter-live2d": pkg("adapter-live2d"),
      "@kiosk-scene/adapter-static": pkg("adapter-static"),
      "@kiosk-scene/adapter-unity-webgl": pkg("adapter-unity-webgl"),
      "@kiosk-scene/provider-ha": pkg("provider-ha"),
      "@kiosk-scene/provider-json": pkg("provider-json"),
      "@kiosk-scene/widgets-core": pkg("widgets-core"),
      "@kiosk-scene/app-shell": pkg("app-shell"),
      "@kiosk-scene/domovoy-ui": pkg("domovoy-ui"),
      "@kiosk-scene/shell-browser/styles": path.resolve(__dirname, "packages/shell-browser/src/styles.css"),
      "@kiosk-scene/shell-browser": path.resolve(__dirname, "packages/shell-browser/src/index.ts"),
    },
  },
  test: {
    environment: "happy-dom",
    environmentOptions: { happyDOM: { url: "http://kiosk.test/scene-runtime/index.html" } },
    include: ["packages/*/test/**/*.test.ts", "apps/*/test/**/*.test.ts"],
    css: false,
  },
});
