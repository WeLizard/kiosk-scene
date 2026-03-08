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

if (!fs.existsSync(sourceDir)) {
  console.error(`Hosted runtime build is missing: ${sourceDir}`);
  console.error("Run `pnpm build:hosted` first.");
  process.exit(1);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });

console.log(`Synced hosted runtime bundle to ${targetDir}`);
