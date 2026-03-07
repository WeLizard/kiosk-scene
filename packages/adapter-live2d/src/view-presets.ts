export interface Live2dViewPreset {
  scale: number;
  x: number;
  y: number;
}

export type Live2dViewPresetMap = Record<string, Live2dViewPreset>;

export const DEFAULT_LIVE2D_VIEW_PRESETS: Live2dViewPresetMap = {
  full: { scale: 1, x: 0, y: 0 },
  torso: { scale: 2.15, x: 0, y: 91 },
  head: { scale: 3.1, x: 0, y: 65 },
};

export function resolveLive2dViewPreset(
  presets: Live2dViewPresetMap,
  presetName: string | null | undefined,
): Live2dViewPreset {
  const key = typeof presetName === "string" && presetName in presets ? presetName : "full";
  return presets[key] || DEFAULT_LIVE2D_VIEW_PRESETS.full;
}

