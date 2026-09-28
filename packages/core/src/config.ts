import type { AvatarManifestV1, RendererConfigV1, RendererWeatherConfigV1 } from "./contracts.js";
import { deepMergeObject, isObjectRecord, trimText } from "./utils.js";

export const DEFAULT_RENDERER_CONFIG_V1: RendererConfigV1 = {
  version: 1,
  assistant: {
    name: "Assistant",
  },
  links: {},
  avatar: {
    manifestUrl: "./avatar.manifest.json",
  },
  scene: {
    configUrl: "./scene.default.json",
  },
  state: {
    provider: "json",
    stateUrl: "./state.json",
    apiUrl: "",
    haApiFallback: false,
    idleLinesUrl: "./idle-lines.json",
  },
  control: {
    provider: "json",
    controlUrl: "./control.json",
    apiUrl: "",
    entityMapUrl: "",
  },
};

export const DEFAULT_AVATAR_MANIFEST_V1: AvatarManifestV1 = {
  version: 1,
  adapter: "static",
  assetRoot: "./assets",
  runtimeUrl: "",
  entry: "",
  modelUrl: "",
  fallbackPortrait: "",
  motionMapUrl: "",
  expressionMapUrl: "",
  presetThumbs: {},
  viewPresets: {},
  capabilities: {
    supportsEmotion: false,
    supportsMotion: false,
    supportsViewPresets: true,
    supportsLipSync: false,
    supportsPointerFocus: false,
  },
};

function sanitizeWeatherConfig(value: unknown): RendererWeatherConfigV1 | undefined {
  if (!isObjectRecord(value)) {
    return undefined;
  }
  const result: RendererWeatherConfigV1 = {};
  const entity = trimText(value.entity, 255);
  if (entity) {
    result.entity = entity;
  }
  const location = trimText(value.location, 80);
  if (location) {
    result.location = location;
  }
  const source = isObjectRecord(value.openMeteo) ? value.openMeteo : null;
  const latitude = Number(source?.latitude);
  const longitude = Number(source?.longitude);
  if (source && Number.isFinite(latitude) && Number.isFinite(longitude) && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180) {
    result.openMeteo = {
      latitude,
      longitude,
      timezone: trimText(source.timezone, 64) || undefined,
    };
  }
  return Object.keys(result).length ? result : undefined;
}

export function sanitizeRendererConfigV1(value: unknown): RendererConfigV1 {
  const merged = deepMergeObject(DEFAULT_RENDERER_CONFIG_V1, isObjectRecord(value) ? value : {});

  return {
    version: 1,
    assistant: {
      name: trimText(merged.assistant?.name, 40) || DEFAULT_RENDERER_CONFIG_V1.assistant.name,
      locale: trimText(merged.assistant?.locale, 16) || undefined,
    },
    links: isObjectRecord(merged.links)
      ? Object.fromEntries(
        Object.entries(merged.links)
          .map(([key, item]) => [trimText(key, 64), trimText(item, 1024)])
          .filter(([key, item]) => key && item),
      )
      : {},
    weather: sanitizeWeatherConfig(merged.weather),
    avatar: {
      manifestUrl: trimText(merged.avatar?.manifestUrl, 1024) || DEFAULT_RENDERER_CONFIG_V1.avatar.manifestUrl,
    },
    scene: {
      configUrl: trimText(merged.scene?.configUrl, 1024) || DEFAULT_RENDERER_CONFIG_V1.scene.configUrl,
    },
    state: {
      provider: merged.state?.provider === "ha" ? "ha" : "json",
      stateUrl: trimText(merged.state?.stateUrl, 1024) || DEFAULT_RENDERER_CONFIG_V1.state.stateUrl,
      apiUrl: trimText(merged.state?.apiUrl, 1024) || undefined,
      haApiFallback: merged.state?.haApiFallback === true,
      idleLinesUrl: trimText(merged.state?.idleLinesUrl, 1024) || DEFAULT_RENDERER_CONFIG_V1.state.idleLinesUrl,
      entityMapUrl: trimText(merged.state?.entityMapUrl, 1024) || undefined,
    },
    control: {
      provider: merged.control?.provider === "ha" ? "ha" : "json",
      controlUrl: trimText(merged.control?.controlUrl, 1024) || DEFAULT_RENDERER_CONFIG_V1.control.controlUrl,
      apiUrl: trimText(merged.control?.apiUrl, 1024) || undefined,
      entityMapUrl: trimText(merged.control?.entityMapUrl, 1024) || undefined,
    },
  };
}

export function sanitizeAvatarManifestV1(value: unknown): AvatarManifestV1 {
  const merged = deepMergeObject(DEFAULT_AVATAR_MANIFEST_V1, isObjectRecord(value) ? value : {});

  return {
    version: 1,
    name: trimText((merged as { name?: unknown }).name, 120) || "",
    adapter: merged.adapter === "live2d" || merged.adapter === "unity-webgl" ? merged.adapter : "static",
    assetRoot: trimText(merged.assetRoot, 1024) || DEFAULT_AVATAR_MANIFEST_V1.assetRoot,
    runtimeUrl: trimText(merged.runtimeUrl, 1024) || "",
    entry: trimText(merged.entry, 1024) || "",
    modelUrl: trimText(merged.modelUrl, 1024) || "",
    fallbackPortrait: trimText(merged.fallbackPortrait, 1024) || "",
    motionMapUrl: trimText(merged.motionMapUrl, 1024) || "",
    expressionMapUrl: trimText(merged.expressionMapUrl, 1024) || "",
    presetThumbs: isObjectRecord(merged.presetThumbs)
      ? Object.fromEntries(
        Object.entries(merged.presetThumbs)
          .map(([key, item]) => [trimText(key, 32), trimText(item, 1024)])
          .filter(([key, item]) => key && item),
      )
      : {},
    viewPresets: isObjectRecord(merged.viewPresets)
      ? Object.fromEntries(
        Object.entries(merged.viewPresets).filter(([key, item]) => trimText(key, 32) && isObjectRecord(item)),
      )
      : {},
    capabilities: {
      supportsEmotion: merged.capabilities?.supportsEmotion === true,
      supportsMotion: merged.capabilities?.supportsMotion === true,
      supportsViewPresets: merged.capabilities?.supportsViewPresets !== false,
      supportsLipSync: merged.capabilities?.supportsLipSync === true,
      supportsPointerFocus: merged.capabilities?.supportsPointerFocus === true,
    },
  };
}
