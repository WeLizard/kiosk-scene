export interface Live2dMotionDefinition {
  index: number;
  id?: string;
  label?: string;
  durationSec?: number;
  description?: string;
  tags?: string[];
}

export interface Live2dMotionMap {
  motions: Live2dMotionDefinition[];
  semantic: Record<string, number | number[]>;
}

export const DEFAULT_LIVE2D_MOTION_MAP: Live2dMotionMap = {
  motions: [
    {
      index: 0,
      id: "idle",
      label: "Idle",
      durationSec: 10,
      tags: ["idle", "default"],
    },
  ],
  semantic: {
    idle: [0],
  },
};

export function normalizeMotionPool(value: unknown): number[] {
  if (Array.isArray(value)) {
    return value.map((item) => Number(item)).filter((item) => Number.isFinite(item));
  }
  const numeric = Number(value);
  return Number.isFinite(numeric) ? [numeric] : [];
}

export function getMotionDefinition(map: Live2dMotionMap, index: number): Live2dMotionDefinition | null {
  return map.motions.find((item) => Number(item.index) === Number(index)) || null;
}

export function resolveMotionIndex(
  map: Live2dMotionMap,
  target: string | number | null | undefined,
  fallback: string | number | null = "idle",
  cursorState: Map<string, number> = new Map(),
): number {
  if (typeof target === "number" && Number.isFinite(target)) {
    return Number(target);
  }

  if (typeof target === "string") {
    const pool = normalizeMotionPool(map.semantic[target]);
    if (pool.length) {
      const cursor = cursorState.get(target) || 0;
      const nextIndex = pool[cursor % pool.length];
      cursorState.set(target, cursor + 1);
      return nextIndex;
    }
  }

  if (fallback !== null && fallback !== target) {
    return resolveMotionIndex(map, fallback, null, cursorState);
  }

  return 0;
}

