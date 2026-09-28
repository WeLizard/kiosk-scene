import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const dir = path.dirname(fileURLToPath(import.meta.url));
const pkg = (name: string, entry = "src/index.ts"): string => path.resolve(dir, "../", name, entry);

// The extension ships as ONE self-contained ES module. The host loads it with `import(url)`; it registers pages,
// widgets and services through the extension API and shares no runtime state with the host bundle.
export default defineConfig({
  resolve: {
    alias: {
      "@kiosk-scene/core": pkg("core"),
      "@kiosk-scene/app-shell/kit-css": pkg("app-shell", "src/kit-css.ts"),
      "@kiosk-scene/app-shell": pkg("app-shell"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2022",
    lib: { entry: path.resolve(dir, "src/index.ts"), formats: ["es"], fileName: () => "domovoy.js" },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
