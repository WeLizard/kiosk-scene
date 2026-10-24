#!/usr/bin/env node

import path from "node:path";
import process from "node:process";
import fs from "node:fs";
import { spawn } from "node:child_process";

const rootDir = process.cwd();
const seed = "kiosk_scene/scene-packs-seed/neiri";

// [schema, file] pairs. Demo data proves the public contracts; the add-on seed pack proves
// that what actually ships to Home Assistant still satisfies the same schemas.
const validations = [
  ["schemas/renderer.config.schema.json", "apps/demo-generic/public/renderer.config.json"],
  ["schemas/avatar.manifest.schema.json", "apps/demo-generic/public/avatar.manifest.json"],
  ["schemas/scene.schema.json", "apps/demo-generic/public/scene.json"],
  ["schemas/state.schema.json", "apps/demo-generic/public/state.json"],
  ["schemas/control.schema.json", "apps/demo-generic/public/control.json"],
  ["schemas/entity-map.schema.json", "apps/demo-generic/public/entity-map.json"],
  ["schemas/renderer.config.schema.json", `${seed}/renderer.kiosk-scene.json`],
  ["schemas/avatar.manifest.schema.json", `${seed}/avatar.manifest.json`],
  ["schemas/scene.schema.json", `${seed}/scene.default.json`],
  ["schemas/state.schema.json", `${seed}/neiri-state.seed.json`],
  ["schemas/control.schema.json", `${seed}/neiri-control.json`],
  ["schemas/entity-map.schema.json", `${seed}/entity-map.json`],
];

async function runValidation([schemaPath, filePath]) {
  await new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        path.join(rootDir, "tools", "validate-config.mjs"),
        "--schema",
        schemaPath,
        "--file",
        filePath,
      ],
      {
        cwd: rootDir,
        stdio: "inherit",
      },
    );

    child.on("exit", (code) => {
      if (code === 0) {
        resolve(undefined);
        return;
      }
      reject(new Error(`Validation failed for ${filePath}`));
    });
    child.on("error", reject);
  });
}

for (const pair of validations) {
  await runValidation(pair);
}

function assertSeedFile(seedDir, reference, label) {
  if (typeof reference !== "string" || !reference.trim()) {
    return;
  }
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/)/i.test(reference)) {
    return;
  }
  const target = path.resolve(seedDir, reference.replace(/^\.\//, ""));
  if (!fs.existsSync(target)) {
    throw new Error(`Seed pack ${label} points at a missing local file: ${reference}`);
  }
}

const seedDir = path.join(rootDir, seed);
const seedRenderer = JSON.parse(fs.readFileSync(path.join(seedDir, "renderer.kiosk-scene.json"), "utf8"));
for (const [label, reference] of Object.entries({
  scene: seedRenderer.scene?.configUrl,
  avatar: seedRenderer.avatar?.manifestUrl,
  state: seedRenderer.state?.stateUrl,
  idle: seedRenderer.state?.idleLinesUrl,
  entities: seedRenderer.state?.entityMapUrl,
  control: seedRenderer.control?.controlUrl,
  controlEntities: seedRenderer.control?.entityMapUrl,
})) {
  assertSeedFile(seedDir, reference, label);
}

const seedAvatar = JSON.parse(fs.readFileSync(path.join(seedDir, "avatar.manifest.json"), "utf8"));
if (seedAvatar.adapter === "static") {
  const image = seedAvatar.entry || seedAvatar.modelUrl || seedAvatar.fallbackPortrait;
  if (!image) {
    throw new Error("Seed static avatar has no entry/modelUrl/fallbackPortrait");
  }
  assertSeedFile(seedDir, image, "avatar image");
}
for (const [label, reference] of Object.entries({
  avatarModel: seedAvatar.modelUrl,
  avatarPortrait: seedAvatar.fallbackPortrait,
  avatarMotionMap: seedAvatar.motionMapUrl,
})) {
  assertSeedFile(seedDir, reference, label);
}

console.log("All demo and add-on seed config validations passed.");
