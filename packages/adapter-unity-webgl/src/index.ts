import type { AvatarAdapter, AvatarAdapterCapabilities } from "@kiosk-scene/core";

export const unityWebglCapabilities: AvatarAdapterCapabilities = {
  supportsEmotion: true,
  supportsMotion: true,
  supportsViewPresets: true,
  supportsLipSync: false,
  supportsPointerFocus: true,
};

export function createUnityWebglAdapter(): AvatarAdapter {
  throw new Error("Unity WebGL adapter is not implemented yet. Keep this adapter Chromium-first and document iframe limitations.");
}

