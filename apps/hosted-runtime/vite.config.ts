import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = (name: string, entry = "src/index.ts"): string => path.resolve(__dirname, "../../packages", name, entry);

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@kiosk-scene/core": pkg("core"),
      "@kiosk-scene/adapter-live2d": pkg("adapter-live2d"),
      "@kiosk-scene/provider-ha": pkg("provider-ha"),
      "@kiosk-scene/provider-json": pkg("provider-json"),
      "@kiosk-scene/adapter-static": pkg("adapter-static"),
      "@kiosk-scene/shell-browser": path.resolve(__dirname, "../../packages/shell-browser/src"),
      "@kiosk-scene/widgets-core": pkg("widgets-core"),
      "@kiosk-scene/app-shell/styles": pkg("app-shell", "src/styles.css"),
      "@kiosk-scene/app-shell": pkg("app-shell"),
    }
  },
  build: {
    rollupOptions: {
      // Two entries share one chunk graph: the kiosk display and the desktop/mobile administration shell.
      input: {
        index: path.resolve(__dirname, "index.html"),
        admin: path.resolve(__dirname, "admin.html"),
      },
    },
  },
});
