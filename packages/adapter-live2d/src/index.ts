import type { AvatarAdapterCapabilities } from "@kiosk-scene/core";
export * from "./iframe-adapter.js";
export * from "./motion-map.js";
export * from "./view-presets.js";

export const live2dCapabilities: AvatarAdapterCapabilities = {
  supportsEmotion: true,
  supportsMotion: true,
  supportsViewPresets: true,
  supportsLipSync: true,
  supportsPointerFocus: true,
};
