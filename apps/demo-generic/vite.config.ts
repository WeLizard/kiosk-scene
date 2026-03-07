import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@kiosk-scene/core": path.resolve(__dirname, "../../packages/core/src/index.ts"),
      "@kiosk-scene/adapter-live2d": path.resolve(__dirname, "../../packages/adapter-live2d/src/index.ts"),
      "@kiosk-scene/provider-ha": path.resolve(__dirname, "../../packages/provider-ha/src/index.ts"),
      "@kiosk-scene/provider-json": path.resolve(__dirname, "../../packages/provider-json/src/index.ts"),
      "@kiosk-scene/adapter-static": path.resolve(__dirname, "../../packages/adapter-static/src/index.ts"),
      "@kiosk-scene/shell-browser": path.resolve(__dirname, "../../packages/shell-browser/src"),
      "@kiosk-scene/widgets-core": path.resolve(__dirname, "../../packages/widgets-core/src/index.ts"),
    },
  },
});
