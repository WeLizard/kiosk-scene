#!/usr/bin/env node

import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";

const rootDir = process.cwd();

const validations = [
  ["schemas/renderer.config.schema.json", "apps/demo-generic/public/renderer.config.json"],
  ["schemas/avatar.manifest.schema.json", "apps/demo-generic/public/avatar.manifest.json"],
  ["schemas/scene.schema.json", "apps/demo-generic/public/scene.json"],
  ["schemas/state.schema.json", "apps/demo-generic/public/state.json"],
  ["schemas/control.schema.json", "apps/demo-generic/public/control.json"],
  ["schemas/entity-map.schema.json", "apps/demo-generic/public/entity-map.json"],
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

console.log("All demo config validations passed.");
