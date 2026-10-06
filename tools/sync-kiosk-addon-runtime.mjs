import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const sourceDir = path.resolve(repoRoot, "apps/hosted-runtime/dist");
const targetDir = path.resolve(
  repoRoot,
  "kiosk_scene",
  "scene-runtime-seed",
);
const sharedDir = path.resolve(
  repoRoot,
  "kiosk_scene",
  "scene-runtime-shared",
);
const defaultWeatherTarget = path.join(targetDir, "weather.json");

if (!fs.existsSync(sourceDir)) {
  console.error(`Hosted runtime build is missing: ${sourceDir}`);
  console.error("Run `pnpm build:hosted` first.");
  process.exit(1);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });
if (fs.existsSync(sharedDir)) {
  fs.cpSync(sharedDir, targetDir, { recursive: true, force: true });
}
// The runtime merges `weather.json` over its placeholder when live sources fail. The demo app ships
// sample readings for its own showcase; the add-on must never inherit them, or a failed fetch would
// display invented weather as if it were real. An empty object means "no fallback data".
fs.writeFileSync(defaultWeatherTarget, "{}\n", "utf8");

// Frontend extensions shipped in the image. `run.sh` copies them next to the runtime and writes each manifest from
// the add-on options; only the built module is committed.
const extensionBuilds = [
  { id: "domovoy", source: path.resolve(repoRoot, "packages/domovoy-ui/dist/domovoy.js"), target: "domovoy.js" },
];
const extensionsSeedDir = path.resolve(repoRoot, "kiosk_scene", "extensions-seed");
for (const extension of extensionBuilds) {
  if (!fs.existsSync(extension.source)) {
    console.error(`Extension build is missing: ${extension.source}`);
    console.error(`Run \`pnpm build:${extension.id}\` first.`);
    process.exit(1);
  }
  const dir = path.join(extensionsSeedDir, extension.id);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(extension.source, path.join(dir, extension.target));
  console.log(`Synced extension ${extension.id} to ${dir}`);
}

console.log(`Synced hosted runtime bundle to ${targetDir}`);
