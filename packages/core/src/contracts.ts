export type ViewPreset = "full" | "torso" | "head";

export interface RendererConfigV1 {
  version: 1;
  assistant: {
    name: string;
    locale?: string;
  };
  links?: Record<string, string>;
  /** Optional weather sources for the overview page. Nothing is assumed when omitted. */
  weather?: RendererWeatherConfigV1;
  avatar: {
    manifestUrl: string;
  };
  scene: {
    configUrl: string;
  };
  state: {
    provider: "json" | "ha";
    stateUrl: string;
    apiUrl?: string;
    haApiFallback?: boolean;
    idleLinesUrl?: string;
    entityMapUrl?: string;
  };
  control: {
    provider: "json" | "ha";
    controlUrl: string;
    apiUrl?: string;
    entityMapUrl?: string;
  };
}

export interface RendererWeatherConfigV1 {
  /** Home Assistant `weather.*` entity used for current conditions. */
  entity?: string;
  /** Human-readable place name shown under the weather title. */
  location?: string;
  /** Open-Meteo forecast source; `timezone` defaults to `auto`. */
  openMeteo?: {
    latitude: number;
    longitude: number;
    timezone?: string;
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
  name?: string;
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

export interface SceneDisplaySafeAreaPxV1 {
  top: number;
  right: number;
  bottom: number;
  left: number;
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
  /** Extension widget id (namespaced) for cards with `type: "widget"`. */
  widget?: string;
  /** Opaque properties handed to the extension widget. */
  props?: Record<string, unknown>;
  col?: number;
  row?: number;
  w?: number;
  h?: number;
  [key: string]: unknown;
}

export interface ScenePageV1 {
  id: string;
  kind: "overview" | "cards" | "forecast+cards" | "grid" | "app";
  title: string;
  /** Extension page id (namespaced) mounted into the slide when `kind` is `"app"`. */
  app?: string;
  /** Opaque properties handed to the extension page. */
  props?: Record<string, unknown>;
  subtitle?: string;
  slot?: number;
  cardStyle?: "mini" | "full";
  gridColumns?: number;
  gridRows?: number;
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

export interface SceneDisplayConfigV1 {
  version: 1;
  kind: "scene.display";
  rotation: {
    order: string[];
    defaultDwellMs: number;
  };
  display: {
    safeAreaPx: SceneDisplaySafeAreaPxV1;
    layoutPaddingPx: number;
    layoutGapPx: number;
    globalScale: number;
  };
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
