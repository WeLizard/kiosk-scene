import type { ControlV1 } from "./contracts.js";

export interface SceneRotationRuntime {
  order: string[];
  defaultDwellMs: number;
}

export interface SceneSelectionInput {
  control: ControlV1;
  rotation: SceneRotationRuntime;
  activeIndex: number;
  lastAutoRotateAt: number;
  now?: number;
  force?: boolean;
  isEligible(pageId: string): boolean;
}

export interface SceneSelectionOutput {
  nextIndex: number;
  nextAutoRotateAt: number;
  pinnedKey: string;
}

function pageIdForIndex(rotation: SceneRotationRuntime, index: number): string {
  return rotation.order[index] || rotation.order[0] || "";
}

export function pageIndexForId(rotation: SceneRotationRuntime, pageId: string): number {
  const index = rotation.order.findIndex((item) => item === pageId);
  return index >= 0 ? index : 0;
}

export function resolveAdjacentSceneIndex(
  rotation: SceneRotationRuntime,
  activeIndex: number,
  direction: 1 | -1,
  isEligible: (pageId: string) => boolean,
): number {
  const order = Array.isArray(rotation.order) ? rotation.order : [];
  if (!order.length) {
    return 0;
  }

  const normalizedIndex = Math.max(0, Math.min(activeIndex, order.length - 1));
  for (let offset = 1; offset <= order.length; offset += 1) {
    const candidateIndex = (normalizedIndex + (offset * direction) + order.length) % order.length;
    if (isEligible(order[candidateIndex])) {
      return candidateIndex;
    }
  }

  return normalizedIndex;
}

export function resolveSceneSelection(input: SceneSelectionInput): SceneSelectionOutput {
  const now = input.now ?? Date.now();
  const order = Array.isArray(input.rotation.order) && input.rotation.order.length
    ? input.rotation.order
    : [];
  const dwellMs = Math.max(5_000, Number(input.rotation.defaultDwellMs) || 18_000);

  if (!order.length) {
    return {
      nextIndex: 0,
      nextAutoRotateAt: now,
      pinnedKey: "",
    };
  }

  const page = input.control.page;
  if (page.mode === "pinned" && page.target) {
    return {
      nextIndex: pageIndexForId(input.rotation, page.target),
      nextAutoRotateAt: now,
      pinnedKey: `${page.target}:${page.until || ""}`,
    };
  }

  if (input.force) {
    const currentPage = pageIdForIndex(input.rotation, input.activeIndex);
    const forcedIndex = input.isEligible(currentPage)
      ? input.activeIndex
      : Math.max(0, order.findIndex((item) => input.isEligible(item)));
    return {
      nextIndex: forcedIndex,
      nextAutoRotateAt: now,
      pinnedKey: "",
    };
  }

  if (now - input.lastAutoRotateAt < dwellMs) {
    return {
      nextIndex: input.activeIndex,
      nextAutoRotateAt: input.lastAutoRotateAt,
      pinnedKey: "",
    };
  }

  let nextIndex = input.activeIndex;
  for (let offset = 1; offset <= order.length; offset += 1) {
    const candidateIndex = (input.activeIndex + offset) % order.length;
    if (input.isEligible(order[candidateIndex])) {
      nextIndex = candidateIndex;
      break;
    }
  }

  return {
    nextIndex,
    nextAutoRotateAt: now,
    pinnedKey: "",
  };
}
