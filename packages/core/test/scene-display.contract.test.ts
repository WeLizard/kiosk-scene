import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { resolveSceneRuntimeConfig } from "@kiosk-scene/core";

interface ContractCase {
  name: string;
  input: unknown;
  expected: {
    rotation: { order: string[]; defaultDwellMs: number };
    display: unknown;
    pageIds: string[];
    pages?: Record<string, Record<string, unknown>>;
  };
}

const cases = JSON.parse(
  readFileSync(path.resolve(__dirname, "../../../tests/contracts/scene-display-cases.json"), "utf-8"),
) as ContractCase[];

// The add-on compiles `scene.display.json` in Python (scene_config_service.py) while the
// runtime can also read the raw `scene.default.json` through the TS normalizer. Both must agree.
describe("scene display contract (TS side of the python compiler contract)", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      const scene = resolveSceneRuntimeConfig(testCase.input);
      expect(scene.rotation).toEqual(testCase.expected.rotation);
      expect(scene.display).toEqual(testCase.expected.display);
      expect(scene.pages.map((page) => page.id)).toEqual(testCase.expected.pageIds);
      for (const [pageId, fields] of Object.entries(testCase.expected.pages ?? {})) {
        const page = scene.pages.find((item) => item.id === pageId) as unknown as Record<string, unknown>;
        for (const [key, value] of Object.entries(fields)) {
          expect(page[key], `${pageId}.${key}`).toEqual(value);
        }
      }
    });
  }
});
