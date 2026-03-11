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
const defaultWeatherSource = path.resolve(
  repoRoot,
  "apps",
  "demo-generic",
  "public",
  "weather.json",
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
if (fs.existsSync(defaultWeatherSource)) {
  fs.cpSync(defaultWeatherSource, defaultWeatherTarget, { force: true });
}

console.log(`Synced hosted runtime bundle to ${targetDir}`);
