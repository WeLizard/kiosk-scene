import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const runtimeSeedDir = path.resolve(repoRoot, "kiosk_scene", "scene-runtime-seed");

const requiredFiles = [
  "index.html",
  "avatar.html",
  "weather.json",
  path.join("assets", "vendor", "pixi-legacy.min.js"),
  path.join("assets", "vendor", "live2dcubismcore.min.js"),
  path.join("assets", "vendor", "cubism4.min.js"),
];

if (!fs.existsSync(runtimeSeedDir)) {
  console.error(`Runtime seed is missing: ${runtimeSeedDir}`);
  process.exit(1);
}

const missingFiles = requiredFiles.filter((relativePath) => !fs.existsSync(path.join(runtimeSeedDir, relativePath)));

if (missingFiles.length > 0) {
  console.error("Kiosk add-on runtime seed is incomplete. Missing files:");
  for (const relativePath of missingFiles) {
    console.error(`- ${relativePath}`);
  }
  console.error("Run `pnpm release:kiosk-addon` before shipping the add-on.");
  process.exit(1);
}

const assetsDir = path.join(runtimeSeedDir, "assets");
const assetEntries = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];
const hasRuntimeScript = assetEntries.some((name) => /^index-.*\.js$/.test(name));
const hasRuntimeStyles = assetEntries.some((name) => /^index-.*\.css$/.test(name));

if (!hasRuntimeScript || !hasRuntimeStyles) {
  console.error("Kiosk add-on runtime seed is incomplete. Missing built runtime assets:");
  if (!hasRuntimeScript) {
    console.error("- assets/index-*.js");
  }
  if (!hasRuntimeStyles) {
    console.error("- assets/index-*.css");
  }
  console.error("Run `pnpm release:kiosk-addon` before shipping the add-on.");
  process.exit(1);
}

console.log(`Validated kiosk add-on runtime seed at ${runtimeSeedDir}`);
