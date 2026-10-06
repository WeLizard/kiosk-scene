import { sanitizeAvatarManifestV1, type AvatarManifestV1, type RendererWeatherConfigV1 } from "@kiosk-scene/core";
import { readJson, resolveHostedUrl, type SceneHostBootstrap } from "./bootstrap";

interface AvatarCatalogItem {
  id: string;
  name?: string;
  manifestUrl?: string;
  previewUrl?: string;
}

interface AvatarCatalogPayload {
  success?: boolean;
  items?: AvatarCatalogItem[];
}

interface HostedSceneConfig {
  avatar?: {
    packId?: string | null;
  };
}

export interface HostedRendererConfig {
  version?: number;
  assistant?: {
    name?: string;
    locale?: string;
  };
  links?: Record<string, string>;
  weather?: RendererWeatherConfigV1;
  avatar?: {
    manifestUrl?: string;
  };
  scene?: {
    configUrl?: string;
  };
  state?: {
    provider?: "json" | "ha";
    stateUrl?: string;
    apiUrl?: string;
    haApiFallback?: boolean;
    idleLinesUrl?: string;
    entityMapUrl?: string;
  };
  control?: {
    provider?: "json" | "ha";
    controlUrl?: string;
    apiUrl?: string;
    entityMapUrl?: string;
  };
}

/** True when the URL asks for the editor overlay (`?editor=1`). */
export function isEditorMode(): boolean {
  return new URLSearchParams(window.location.search).get("editor") === "1";
}

export function resolveAvatarAdapterOverride(): "static" | "live2d" | null {
  const params = new URLSearchParams(window.location.search);
  const explicit = String(params.get("avatar") || params.get("avatarAdapter") || "").trim().toLowerCase();
  if (explicit === "static" || explicit === "live2d") {
    return explicit;
  }

  if (isEditorMode()) {
    return null;
  }

  const hostname = String(window.location.hostname || "").trim().toLowerCase();
  const isDirectLocalDisplayHost = hostname === "localhost" || hostname === "127.0.0.1";
  const isSceneAddonPort = String(window.location.port || "").trim() === "48123";
  if (isDirectLocalDisplayHost && isSceneAddonPort) {
    return "static";
  }

  return null;
}

function normalizeHostedAvatarManifest(
  manifest: AvatarManifestV1,
  manifestUrl: string,
): AvatarManifestV1 {
  const normalized = sanitizeAvatarManifestV1(manifest);
  const sharedLive2dRuntimeUrl = normalized.adapter === "live2d"
    ? resolveHostedUrl("../../scene-runtime/avatar.html", manifestUrl)
    : "";
  const assetRoot = resolveHostedUrl(String(normalized.assetRoot || "").trim(), manifestUrl);
  const remapHostedAssetValue = (value: string): string => {
    const normalizedValue = String(value || "").trim();
    if (!normalizedValue) {
      return "";
    }
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(normalizedValue) || normalizedValue.startsWith("/")) {
      return resolveHostedUrl(normalizedValue, manifestUrl);
    }
    return normalizedValue;
  };
  const remapManifestValue = (value: string): string => {
    const normalizedValue = String(value || "").trim();
    if (!normalizedValue) {
      return "";
    }
    return resolveHostedUrl(normalizedValue, manifestUrl);
  };
  const presetThumbs = Object.fromEntries(
    Object.entries(normalized.presetThumbs || {})
      .map(([key, value]) => [key, resolveHostedUrl(String(value || ""), manifestUrl)])
      .filter(([, value]) => Boolean(value)),
  );

  const adapterOverride = resolveAvatarAdapterOverride();
  if (adapterOverride === "static" && normalized.adapter === "live2d") {
    const staticImageUrl = remapHostedAssetValue(
      String(normalized.fallbackPortrait || normalized.modelUrl || normalized.entry || "").trim(),
    );
    if (staticImageUrl) {
      return {
        ...normalized,
        adapter: "static",
        runtimeUrl: "",
        entry: staticImageUrl,
        modelUrl: staticImageUrl,
        fallbackPortrait: staticImageUrl,
        motionMapUrl: "",
        capabilities: {
          supportsEmotion: false,
          supportsMotion: false,
          supportsViewPresets: true,
          supportsLipSync: false,
          supportsPointerFocus: false,
        },
        presetThumbs,
      };
    }
  }

  return {
    ...normalized,
    assetRoot,
    runtimeUrl: sharedLive2dRuntimeUrl || resolveHostedUrl(String(normalized.runtimeUrl || "").trim(), manifestUrl),
    entry: remapHostedAssetValue(String(normalized.entry || "").trim()),
    modelUrl: remapHostedAssetValue(String(normalized.modelUrl || "").trim()),
    fallbackPortrait: remapHostedAssetValue(String(normalized.fallbackPortrait || "").trim()),
    motionMapUrl: remapManifestValue(String(normalized.motionMapUrl || "").trim()),
    presetThumbs,
  };
}

function absolutizeRendererConfig(config: HostedRendererConfig, rendererConfigUrl: string): HostedRendererConfig {
  return {
    ...config,
    links: Object.fromEntries(
      Object.entries(config.links || {})
        .map(([key, value]) => [key, resolveHostedUrl(value, rendererConfigUrl)])
        .filter(([, value]) => Boolean(value)),
    ),
    weather: config.weather,
    avatar: {
      manifestUrl: resolveHostedUrl(String(config.avatar?.manifestUrl || "").trim(), rendererConfigUrl),
    },
    scene: {
      configUrl: resolveHostedUrl(String(config.scene?.configUrl || "").trim(), rendererConfigUrl),
    },
    state: {
      provider: config.state?.provider || "json",
      stateUrl: resolveHostedUrl(String(config.state?.stateUrl || "").trim(), rendererConfigUrl),
      apiUrl: resolveHostedUrl(String(config.state?.apiUrl || "").trim(), rendererConfigUrl) || undefined,
      haApiFallback: config.state?.haApiFallback === true,
      idleLinesUrl: resolveHostedUrl(String(config.state?.idleLinesUrl || "").trim(), rendererConfigUrl),
      entityMapUrl: resolveHostedUrl(String(config.state?.entityMapUrl || "").trim(), rendererConfigUrl),
    },
    control: {
      provider: config.control?.provider || "json",
      controlUrl: resolveHostedUrl(String(config.control?.controlUrl || "").trim(), rendererConfigUrl),
      apiUrl: resolveHostedUrl(String(config.control?.apiUrl || "").trim(), rendererConfigUrl) || undefined,
      entityMapUrl: resolveHostedUrl(String(config.control?.entityMapUrl || "").trim(), rendererConfigUrl) || undefined,
    },
  };
}

export async function resolveRuntimeRendererConfigUrl(
  bootstrap: SceneHostBootstrap,
  bootstrapUrl: string,
): Promise<string> {
  const rendererConfigUrl = resolveHostedUrl(
    String(bootstrap.files?.rendererConfigUrl || "").trim(),
    bootstrapUrl,
  );
  if (!rendererConfigUrl) {
    return "";
  }

  const sceneConfigUrl = resolveHostedUrl(
    String(bootstrap.files?.sceneConfigUrl || "").trim(),
    bootstrapUrl,
  );
  const avatarCatalogUrl = resolveHostedUrl(
    String(bootstrap.files?.avatarCatalogUrl || "").trim(),
    bootstrapUrl,
  );
  let selectedAvatarPackId = "";
  if (sceneConfigUrl && avatarCatalogUrl) {
    try {
      const sceneConfig = await readJson<HostedSceneConfig>(sceneConfigUrl);
      selectedAvatarPackId = String(sceneConfig.avatar?.packId || "").trim();
    } catch {
      selectedAvatarPackId = "";
    }
  }

  let selectedAvatarManifestUrl = "";
  if (selectedAvatarPackId && avatarCatalogUrl) {
    try {
      const avatarCatalog = await readJson<AvatarCatalogPayload>(avatarCatalogUrl);
      const selectedAvatar = Array.isArray(avatarCatalog.items)
        ? avatarCatalog.items.find((item) => String(item.id || "").trim() === selectedAvatarPackId)
        : null;
      selectedAvatarManifestUrl = resolveHostedUrl(String(selectedAvatar?.manifestUrl || "").trim(), bootstrapUrl);
    } catch {
      selectedAvatarManifestUrl = "";
    }
  }

  const rendererConfig = absolutizeRendererConfig(
    await readJson<HostedRendererConfig>(rendererConfigUrl),
    rendererConfigUrl,
  );
  if (sceneConfigUrl) {
    rendererConfig.scene = {
      ...(rendererConfig.scene || {}),
      configUrl: sceneConfigUrl,
    };
  }
  const haStatesUrl = resolveHostedUrl(
    String(bootstrap.files?.haStatesUrl || "").trim(),
    bootstrapUrl,
  );
  if (haStatesUrl) {
    rendererConfig.state = {
      ...(rendererConfig.state || {}),
      apiUrl: rendererConfig.state?.apiUrl || haStatesUrl,
    };
    rendererConfig.control = {
      ...(rendererConfig.control || {}),
      apiUrl: rendererConfig.control?.apiUrl || haStatesUrl,
    };
  }
  const activeAvatarManifestUrl = selectedAvatarManifestUrl || String(rendererConfig.avatar?.manifestUrl || "").trim();
  if (!activeAvatarManifestUrl) {
    return URL.createObjectURL(
      new Blob([JSON.stringify(rendererConfig)], { type: "application/json" }),
    );
  }

  const resolvedAvatarManifestUrl = resolveHostedUrl(activeAvatarManifestUrl, bootstrapUrl);
  const normalizedAvatarManifest = normalizeHostedAvatarManifest(
    await readJson<AvatarManifestV1>(resolvedAvatarManifestUrl),
    resolvedAvatarManifestUrl,
  );
  const avatarManifestBlobUrl = URL.createObjectURL(
    new Blob([JSON.stringify(normalizedAvatarManifest)], { type: "application/json" }),
  );

  const overriddenConfig: HostedRendererConfig = {
    ...rendererConfig,
    avatar: {
      manifestUrl: avatarManifestBlobUrl,
    },
  };

  return URL.createObjectURL(
    new Blob([JSON.stringify(overriddenConfig)], { type: "application/json" }),
  );
}

