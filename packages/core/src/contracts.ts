export type ViewPreset = "full" | "torso" | "head";

export interface RendererConfigV1 {
  version: 1;
  assistant: {
    name: string;
    locale?: string;
  };
  links?: Record<string, string>;
  avatar: {
    manifestUrl: string;
  };
  scene: {
    configUrl: string;
  };
  state: {
    provider: "json" | "ha";
    stateUrl: string;
    haApiFallback?: boolean;
    idleLinesUrl?: string;
    entityMapUrl?: string;
  };
  control: {
    provider: "json";
    controlUrl: string;
  };
}

export interface AvatarAdapterCapabilities {
  supportsEmotion: boolean;
  supportsMotion: boolean;
  supportsViewPresets: boolean;
  supportsLipSync: boolean;
  supportsPointerFocus?: boolean;
}

export interface AvatarManifestV1 {
  version: 1;
  adapter: "live2d" | "unity-webgl" | "static";
  assetRoot: string;
  runtimeUrl?: string;
  entry?: string;
  modelUrl?: string;
  fallbackPortrait?: string;
  motionMapUrl?: string;
  expressionMapUrl?: string;
  presetThumbs?: Record<string, string>;
  viewPresets?: Record<string, Record<string, unknown>>;
  capabilities: AvatarAdapterCapabilities;
}

export interface SceneRotationV1 {
  order: string[];
  defaultDwellSeconds: number;
}

export interface SceneDisplaySafeAreaV1 {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface SceneDisplayV1 {
  safeArea?: SceneDisplaySafeAreaV1;
  layoutPaddingPx?: number;
  layoutGapPx?: number;
  globalScale?: number;
}

export interface SceneAvatarV1 {
  packId?: string | null;
}

export interface SceneCardV1 {
  type?: string;
  entity?: string;
  [key: string]: unknown;
}

export interface ScenePageV1 {
  id: string;
  kind: "overview" | "cards" | "forecast+cards";
  title: string;
  subtitle?: string;
  slot?: number;
  cardStyle?: "mini" | "full";
  stampCaption?: string;
  stampValue?: string;
  cards?: SceneCardV1[];
}

export interface SceneConfigV1 {
  version: 1;
  rotation: SceneRotationV1;
  display?: SceneDisplayV1;
  avatar?: SceneAvatarV1;
  pages: ScenePageV1[];
}

export interface StateV1 {
  version: 1;
  assistant?: string;
  online?: boolean;
  busy?: boolean;
  status?: string;
  message?: string;
  source?: string;
  updatedAt?: string;
  emotion?: string | null;
  activity?: string | null;
  cue?: string | null;
  intensity?: number | null;
  speaking?: boolean;
  // Legacy compatibility bridge for pre-semantic deployments.
  motion?: string | null;
  revision: number;
  event?: string;
  [key: string]: unknown;
}

export interface ControlPageV1 {
  mode: "auto" | "pinned";
  target: string | null;
  until: string | null;
}

export interface ControlCueV1 {
  cue?: string | null;
  emotion: string | null;
  // Legacy compatibility bridge for pre-semantic deployments.
  motion: string | null;
  until: string | null;
}

export interface ControlV1 {
  version: 1;
  revision: number;
  viewPreset?: ViewPreset | null;
  page: ControlPageV1;
  cue: ControlCueV1;
}
