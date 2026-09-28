import {
  DEFAULT_ASSISTANT_PRESENTATION_COPY_EN,
  type AssistantPresentationCopy,
  type AvatarAdapter,
  type AvatarManifestV1,
  type ExtensionRegistry,
  type RendererConfigV1,
} from "@kiosk-scene/core";
import type { WeatherOverviewPatch, WeatherOverviewPayload } from "./weather.js";

export interface SceneShellLabels {
  humidity: string;
  pressure: string;
  wind: string;
  clouds: string;
  rangeStamp: string;
  pageStamp: string;
  noCardsConfigured: string;
  avatarPresetGroup: string;
  carouselRegion: string;
  pagesRegion: string;
  forecastRangeFallback: string;
  /** Shown while the display cannot reach its data sources. */
  staleNotice: string;
  /** Shown in a slide whose extension page/widget is not available. */
  extensionUnavailable: string;
}

export interface SceneShellIconUrls {
  calendarDays: string;
  thermometer: string;
  droplets: string;
  gauge: string;
  wind: string;
  cloud: string;
  sparkles: string;
}

export interface SceneShellPresetLabels {
  full: string;
  torso: string;
  head: string;
}

export interface AvatarAdapterFactoryContext {
  manifest: AvatarManifestV1;
  rendererConfig: RendererConfigV1;
}

export interface SceneShellOptions {
  rendererConfigUrl?: string;
  weatherUrl?: string;
  weatherReader?: () => Promise<WeatherOverviewPatch | null>;
  refreshIntervalMs?: number;
  iconBaseUrl?: string;
  copy?: Partial<AssistantPresentationCopy>;
  labels?: Partial<SceneShellLabels>;
  iconUrls?: Partial<SceneShellIconUrls>;
  presetLabels?: Partial<SceneShellPresetLabels>;
  defaultWeather?: Partial<WeatherOverviewPayload>;
  /** Extension registry that provides `kind: "app"` pages and `type: "widget"` cards. */
  extensions?: ExtensionRegistry;
  /** Return an adapter to override the manifest-driven default; return `null` to use the default. */
  avatarAdapterFactory?: (context: AvatarAdapterFactoryContext) => AvatarAdapter | null;
  /** Consecutive failing refresh cycles before the display marks its data as stale. Default 2. */
  staleAfterFailures?: number;
  /** After a touch/key/focus inside the carousel, auto-rotation pauses this long. Default 45 s. */
  interactionHoldMs?: number;
}

export const DEFAULT_SCENE_SHELL_COPY_EN: AssistantPresentationCopy = {
  ...DEFAULT_ASSISTANT_PRESENTATION_COPY_EN,
};

export const DEFAULT_SCENE_SHELL_LABELS_EN: SceneShellLabels = {
  humidity: "Humidity",
  pressure: "Pressure",
  wind: "Wind",
  clouds: "Clouds",
  rangeStamp: "Range",
  pageStamp: "Page",
  noCardsConfigured: "No cards configured",
  avatarPresetGroup: "Avatar view presets",
  carouselRegion: "Scene carousel",
  pagesRegion: "Display pages",
  forecastRangeFallback: "Five-day forecast",
  staleNotice: "No connection — data may be outdated",
  extensionUnavailable: "This page is not available",
};

export const DEFAULT_SCENE_SHELL_PRESET_LABELS_EN: SceneShellPresetLabels = {
  full: "Full avatar view",
  torso: "Torso avatar view",
  head: "Head avatar view",
};

export const DEFAULT_ICON_FILENAMES: SceneShellIconUrls = {
  calendarDays: "calendar-days.svg",
  thermometer: "thermometer.svg",
  droplets: "droplets.svg",
  gauge: "gauge.svg",
  wind: "wind.svg",
  cloud: "cloud.svg",
  sparkles: "sparkles.svg",
};
