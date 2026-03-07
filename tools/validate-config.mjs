#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

async function main() {
  const args = process.argv.slice(2);
  const schemaArgIndex = args.indexOf("--schema");
  const fileArgIndex = args.indexOf("--file");

  if (schemaArgIndex === -1 || fileArgIndex === -1 || !args[schemaArgIndex + 1] || !args[fileArgIndex + 1]) {
    console.error("Usage: node ./tools/validate-config.mjs --schema <schema-path> --file <json-path>");
    process.exit(1);
  }

  const rootDir = process.cwd();
  const schemaPath = path.resolve(rootDir, args[schemaArgIndex + 1]);
  const filePath = path.resolve(rootDir, args[fileArgIndex + 1]);
  const [schemaRaw, fileRaw] = await Promise.all([
    fs.readFile(schemaPath, "utf8"),
    fs.readFile(filePath, "utf8")
  ]);

  const ajv = new Ajv2020({
    allErrors: true,
    strict: false
  });
  addFormats(ajv);
  const schema = JSON.parse(schemaRaw);
  const payload = JSON.parse(fileRaw);
  const validate = ajv.compile(schema);
  const valid = validate(payload);

  if (!valid) {
    console.error(`Validation failed for ${path.relative(rootDir, filePath)}`);
    for (const error of validate.errors ?? []) {
      console.error(`- ${error.instancePath || "/"} ${error.message || "validation error"}`);
    }
    process.exit(1);
  }

  console.log(`Validation passed for ${path.relative(rootDir, filePath)}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
