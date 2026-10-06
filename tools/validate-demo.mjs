#!/usr/bin/env node

import path from "node:path";
import process from "node:process";
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

console.log("All demo and add-on seed config validations passed.");
