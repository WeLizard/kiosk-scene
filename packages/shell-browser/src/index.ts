import { createLive2dAdapter } from "@kiosk-scene/adapter-live2d";
import { createStaticAdapter } from "@kiosk-scene/adapter-static";
import {
  buildAssistantPresentationModel,
  createPinnedPageControl,
  createViewPresetControl,
  DEFAULT_ASSISTANT_PRESENTATION_COPY_EN,
  DEFAULT_CONTROL_V1,
  mergeControlV1,
  mergeControlCueIntoState,
  nextIdleDelayMs,
  normalizeSceneConfig,
  pickIdleLine,
  resolveAdjacentSceneIndex,
  resolveSceneSelection,
  sanitizeAvatarManifestV1,
  sanitizeRendererConfigV1,
  shouldShowIdleMonologue,
  trimText,
  type AssistantPresentationCopy,
  type AssistantPresentationModel,
  type AvatarAdapter,
  type AvatarManifestV1,
  type ControlV1,
  type RendererConfigV1,
  type SceneConfigV1,
  type ScenePageV1,
  type StateV1,
  type ViewPreset,
} from "@kiosk-scene/core";
import {
  createHomeAssistantStateProvider,
  createHomeAssistantStatesReader,
  type HomeAssistantEntityMap,
  type HomeAssistantStates,
} from "@kiosk-scene/provider-ha";
import { createJsonControlProvider, createJsonLinesProvider, createJsonStateProvider } from "@kiosk-scene/provider-json";
import { resolveSceneCards } from "@kiosk-scene/widgets-core";

export interface WeatherForecastDay {
  name: string;
  dayNumber: string;
  monthShort: string;
  note: string;
  max: string;
  min: string;
  icon: string;
}

export interface WeatherOverviewPayload {
  title: string;
  location: string;
  todayCaption: string;
  todayValue: string;
  todayLabel: string;
  updatedCaption: string;
  updatedAt: string;
  temperature: string;
  unit: string;
  condition: string;
  feelsLike: string;
  badgeSummary: string;
  badgeRange: string;
  metrics: {
    humidity: string;
    pressure: string;
    wind: string;
    clouds: string;
  };
  forecastTitle: string;
  forecast: WeatherForecastDay[];
}

export interface WeatherOverviewPatch extends Omit<Partial<WeatherOverviewPayload>, "metrics" | "forecast"> {
  metrics?: Partial<WeatherOverviewPayload["metrics"]>;
  forecast?: WeatherForecastDay[];
}

export interface SceneShellLabels {
  humidity: string;
  pressure: string;
  wind: string;
  clouds: string;
  rangeStamp: string;
  pageStamp: string;
  noCardsConfigured: string;
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
}

export const DEFAULT_SCENE_SHELL_COPY_EN: AssistantPresentationCopy = {
  ...DEFAULT_ASSISTANT_PRESENTATION_COPY_EN,
  offlineLabel: "Offline",
  busyLabel: "Thinking",
  speakingLabel: "Speaking",
  idleLabel: "Waiting",
  technicalHealthyLabel: "Online",
  messageCaption: "Monologue",
  statusCaption: "Status",
  modeCaption: "Mode",
  offlineBody: "The assistant is temporarily unreachable.",
  busyBody: "The assistant is preparing a response.",
  idleBody: "The assistant is nearby and still running in the background.",
};

export const DEFAULT_SCENE_SHELL_LABELS_EN: SceneShellLabels = {
  humidity: "Humidity",
  pressure: "Pressure",
  wind: "Wind",
  clouds: "Clouds",
  rangeStamp: "Range",
  pageStamp: "Page",
  noCardsConfigured: "No cards configured",
};

export const DEFAULT_SCENE_SHELL_PRESET_LABELS_EN: SceneShellPresetLabels = {
  full: "Full avatar view",
  torso: "Torso avatar view",
  head: "Head avatar view",
};

const DEFAULT_ICON_FILENAMES: SceneShellIconUrls = {
  calendarDays: "calendar-days.svg",
  thermometer: "thermometer.svg",
  droplets: "droplets.svg",
  gauge: "gauge.svg",
  wind: "wind.svg",
  cloud: "cloud.svg",
  sparkles: "sparkles.svg",
};

export const DEFAULT_WEATHER_OVERVIEW: WeatherOverviewPayload = {
  title: "Weather",
  location: "Saint Petersburg",
  todayCaption: "Today",
  todayValue: "Today",
  todayLabel: "Wednesday",
  updatedCaption: "Updated",
  updatedAt: "07:20",
  temperature: "3",
  unit: "C",
  condition: "Bright sky with high cloud cover",
  feelsLike: "Feels like 1 C and stays calm through the morning.",
  badgeSummary: "Current snapshot",
  badgeRange: "Today and next 5 days",
  metrics: {
    humidity: "61%",
    pressure: "1017 hPa",
    wind: "12 km/h",
    clouds: "38%",
  },
  forecastTitle: "Weekly rhythm",
  forecast: [
    { name: "thu", dayNumber: "07", monthShort: "mar", note: "partly cloudy", max: "4 C", min: "-1 C", icon: "./assets/cloud-sun.svg" },
    { name: "fri", dayNumber: "08", monthShort: "mar", note: "light rain", max: "5 C", min: "0 C", icon: "./assets/cloud-rain.svg" },
    { name: "sat", dayNumber: "09", monthShort: "mar", note: "clear break", max: "6 C", min: "1 C", icon: "./assets/sun.svg" },
    { name: "sun", dayNumber: "10", monthShort: "mar", note: "steady clouds", max: "4 C", min: "0 C", icon: "./assets/cloud.svg" },
    { name: "mon", dayNumber: "11", monthShort: "mar", note: "soft showers", max: "5 C", min: "2 C", icon: "./assets/cloud-rain.svg" },
  ],
};

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function withTrailingSlash(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

function resolveUrlAgainst(baseUrl: string, candidate: string): string {
  const normalized = trimText(candidate, 1024);
  if (!normalized) {
    return "";
  }
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(normalized) || normalized.startsWith("/")) {
    return normalized;
  }
  return new URL(normalized, baseUrl).toString();
}

function resolveBaseUrl(candidate: string): string {
  return new URL(".", candidate).toString();
}

function resolveAvatarManifestUrls(manifest: AvatarManifestV1, manifestUrl: string): AvatarManifestV1 {
  const manifestBaseUrl = resolveBaseUrl(manifestUrl);
  const assetRoot = resolveUrlAgainst(
    manifestBaseUrl,
    trimText(manifest.assetRoot, 1024) || "./assets",
  );
  return {
    ...manifest,
    assetRoot,
    runtimeUrl: resolveUrlAgainst(manifestBaseUrl, manifest.runtimeUrl || ""),
    presetThumbs: Object.fromEntries(
      Object.entries(manifest.presetThumbs || {})
        .map(([key, value]) => [key, resolveUrlAgainst(manifestBaseUrl, value)])
        .filter(([, value]) => Boolean(value)),
    ),
  };
}

function buildWeatherOverview(payload?: WeatherOverviewPatch): WeatherOverviewPayload {
  return {
    ...DEFAULT_WEATHER_OVERVIEW,
    ...(payload || {}),
    metrics: {
      ...DEFAULT_WEATHER_OVERVIEW.metrics,
      ...(payload?.metrics || {}),
    },
    forecast: Array.isArray(payload?.forecast) && payload.forecast.length
      ? payload.forecast.map((item) => ({ ...item }))
      : DEFAULT_WEATHER_OVERVIEW.forecast.map((item) => ({ ...item })),
  };
}

function mergeWeatherSource(
  base: WeatherOverviewPatch,
  incoming?: WeatherOverviewPatch | null,
): WeatherOverviewPatch {
  if (!incoming) {
    return base;
  }
  return {
    ...base,
    ...incoming,
    metrics: {
      ...(base.metrics || {}),
      ...(incoming.metrics || {}),
    },
    forecast: Array.isArray(incoming.forecast) && incoming.forecast.length
      ? incoming.forecast.map((item) => ({ ...item }))
      : (base.forecast || []),
  };
}

function formatWeatherNumber(value: unknown, digits = 0): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "--";
  }
  const maximumFractionDigits = Math.max(0, digits);
  return numeric.toLocaleString("ru-RU", {
    minimumFractionDigits: digits > 0 ? digits : 0,
    maximumFractionDigits,
  });
}

function formatPressureMmHg(value: unknown, unit: unknown): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "--";
  }
  const normalizedUnit = trimText(unit, 24).toLowerCase();
  if (normalizedUnit === "mmhg" || normalizedUnit === "мм рт. ст.") {
    return `${formatWeatherNumber(numeric)} мм рт. ст.`;
  }
  return `${formatWeatherNumber(numeric * 0.750061683, 0)} мм рт. ст.`;
}

function formatWindMs(value: unknown, unit: unknown): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "--";
  }
  const normalizedUnit = trimText(unit, 24).toLowerCase();
  if (normalizedUnit === "m/s" || normalizedUnit === "м/с") {
    return `${formatWeatherNumber(numeric, 1)} м/с`;
  }
  if (normalizedUnit === "km/h" || normalizedUnit === "км/ч") {
    return `${formatWeatherNumber(numeric / 3.6, 1)} м/с`;
  }
  return `${formatWeatherNumber(numeric, 1)} м/с`;
}

function formatWeatherTime(value: unknown, locale = "ru-RU"): string {
  const date = new Date(String(value || ""));
  if (Number.isNaN(date.getTime())) {
    return "--:--";
  }
  return date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
}

function formatTodayDate(value: unknown, locale = "ru-RU"): string {
  const date = new Date(String(value || ""));
  if (Number.isNaN(date.getTime())) {
    return "--";
  }
  return date.toLocaleDateString(locale, { day: "numeric", month: "long" });
}

function formatTodayLabel(value: unknown, locale = "ru-RU"): string {
  const date = new Date(String(value || ""));
  if (Number.isNaN(date.getTime())) {
    return "--";
  }
  return date.toLocaleDateString(locale, { weekday: "long" });
}

function translateWeatherCondition(condition: unknown, locale = "ru-RU"): string {
  const normalized = trimText(condition, 64).toLowerCase();
  if (!normalized) {
    return locale.startsWith("ru") ? "Неизвестно" : "Unknown";
  }
  if (!locale.startsWith("ru")) {
    return normalized;
  }
  const dictionary: Record<string, string> = {
    "clear-night": "Ясная ночь",
    cloudy: "Облачно",
    exceptional: "Экстремально",
    fog: "Туман",
    hail: "Град",
    lightning: "Гроза",
    "lightning-rainy": "Гроза с дождем",
    partlycloudy: "Переменная облачность",
    pouring: "Ливень",
    rainy: "Дождь",
    snowy: "Снег",
    "snowy-rainy": "Снег с дождем",
    sunny: "Ясно",
    windy: "Ветрено",
    "windy-variant": "Ветрено",
  };
  return dictionary[normalized] || trimText(condition, 64);
}

function translateOpenMeteoCode(code: unknown, locale = "ru-RU"): string {
  const numeric = Number(code);
  if (!Number.isFinite(numeric)) {
    return locale.startsWith("ru") ? "Облачно" : "Cloudy";
  }
  if (!locale.startsWith("ru")) {
    if (numeric === 0) return "Clear";
    if ([1, 2].includes(numeric)) return "Partly cloudy";
    if (numeric === 3) return "Cloudy";
    if ([45, 48].includes(numeric)) return "Fog";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(numeric)) return "Rain";
    if ([71, 73, 75, 77, 85, 86].includes(numeric)) return "Snow";
    if ([95, 96, 99].includes(numeric)) return "Thunderstorm";
    return "Cloudy";
  }
  if (numeric === 0) return "Ясно";
  if ([1, 2].includes(numeric)) return "Переменная облачность";
  if (numeric === 3) return "Пасмурно";
  if ([45, 48].includes(numeric)) return "Туман";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(numeric)) return "Морось";
  if ([71, 73, 75, 77, 85, 86].includes(numeric)) return "Снег";
  if ([95, 96, 99].includes(numeric)) return "Гроза";
  return "Облачно";
}

function weatherIconForCode(code: unknown, iconBaseUrl = "./assets/icons"): string {
  const numeric = Number(code);
  const base = withTrailingSlash(iconBaseUrl);
  if (numeric === 0) return `${base}sun.svg`;
  if ([1, 2].includes(numeric)) return `${base}cloud-sun.svg`;
  if ([3].includes(numeric)) return `${base}cloud.svg`;
  if ([45, 48].includes(numeric)) return `${base}cloud-fog.svg`;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(numeric)) return `${base}cloud-rain.svg`;
  if ([71, 73, 75, 77, 85, 86].includes(numeric)) return `${base}cloud-snow.svg`;
  if ([95, 96, 99].includes(numeric)) return `${base}cloud-lightning.svg`;
  return `${base}cloud.svg`;
}

export interface HomeAssistantWeatherReaderOptions {
  weatherEntity: string;
  openMeteoUrl?: string;
  locale?: string;
  iconBaseUrl?: string;
  allowApiFallback?: boolean;
  fetchImpl?: typeof fetch;
}

export function createHomeAssistantWeatherReader(options: HomeAssistantWeatherReaderOptions): () => Promise<WeatherOverviewPatch | null> {
  const locale = trimText(options.locale, 32) || "ru-RU";
  const iconBaseUrl = trimText(options.iconBaseUrl, 1024) || "./assets/icons";
  const statesReader = createHomeAssistantStatesReader({
    allowApiFallback: options.allowApiFallback,
    fetchImpl: options.fetchImpl,
  });

  return async () => {
    const states = await statesReader.read();
    const fetchImpl = options.fetchImpl ?? globalThis.fetch;
    const weatherState = states?.[options.weatherEntity];

    let openMeteo: any = null;
    const openMeteoUrl = trimText(options.openMeteoUrl, 4096);
    if (openMeteoUrl && typeof fetchImpl === "function") {
      try {
        const response = await fetchImpl(`${openMeteoUrl}${openMeteoUrl.includes("?") ? "&" : "?"}ts=${Date.now()}`, { cache: "no-store" });
        if (response.ok) {
          openMeteo = await response.json();
        }
      } catch {
        openMeteo = null;
      }
    }

    if (!weatherState && !openMeteo?.current) {
      return null;
    }

    const updatedAt = trimText(weatherState?.last_changed, 64)
      || trimText(openMeteo?.current?.time, 64)
      || new Date().toISOString();
    const condition = weatherState
      ? translateWeatherCondition(weatherState.state, locale)
      : translateOpenMeteoCode(openMeteo?.current?.weather_code, locale);
    const forecastAll = Array.isArray(openMeteo?.daily?.time)
      ? openMeteo.daily.time.map((date: string, index: number) => {
          const localDate = new Date(`${date}T12:00:00+03:00`);
          return {
            name: localDate.toLocaleDateString(locale, { weekday: "short" }),
            dayNumber: localDate.toLocaleDateString(locale, { day: "numeric" }),
            monthShort: localDate.toLocaleDateString(locale, { month: "short" }),
            note: trimText(translateOpenMeteoCode(openMeteo.daily.weather_code?.[index], locale), 28),
            max: `${formatWeatherNumber(openMeteo.daily.temperature_2m_max?.[index])}°`,
            min: `${formatWeatherNumber(openMeteo.daily.temperature_2m_min?.[index])}° · ${formatWeatherNumber(openMeteo.daily.precipitation_probability_max?.[index])}%`,
            icon: weatherIconForCode(openMeteo.daily.weather_code?.[index], iconBaseUrl),
          };
        })
      : [];
    const todayForecast = forecastAll[0] || null;
    const upcomingForecast = forecastAll.slice(1, 6);

    return {
      todayValue: formatTodayDate(updatedAt, locale),
      todayLabel: formatTodayLabel(updatedAt, locale),
      updatedAt: formatWeatherTime(updatedAt, locale),
      temperature: formatWeatherNumber(weatherState?.attributes?.temperature ?? openMeteo?.current?.temperature_2m, 1),
      condition,
      feelsLike: `${locale.startsWith("ru") ? "Ощущается как" : "Feels like"} ${formatWeatherNumber(weatherState?.attributes?.apparent_temperature ?? openMeteo?.current?.apparent_temperature ?? weatherState?.attributes?.temperature, 1)}°C`,
      badgeSummary: condition,
      badgeRange: todayForecast ? `${todayForecast.max} / ${formatWeatherNumber(openMeteo?.daily?.temperature_2m_min?.[0])}° ${locale.startsWith("ru") ? "сегодня" : "today"}` : undefined,
      metrics: {
        humidity: `${formatWeatherNumber(weatherState?.attributes?.humidity ?? openMeteo?.current?.relative_humidity_2m)}%`,
        pressure: formatPressureMmHg(weatherState?.attributes?.pressure ?? openMeteo?.current?.surface_pressure, weatherState?.attributes?.pressure_unit ?? "hPa"),
        wind: formatWindMs(weatherState?.attributes?.wind_speed ?? openMeteo?.current?.wind_speed_10m, weatherState?.attributes?.wind_speed_unit ?? "km/h"),
        clouds: `${formatWeatherNumber(weatherState?.attributes?.cloud_coverage ?? openMeteo?.current?.cloud_cover)}%`,
      },
      forecast: upcomingForecast,
    };
  };
}

interface CarouselDragState {
  pointerId: number;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  locked: boolean;
}

export class BrowserSceneShellApp {
  private readonly root: HTMLElement;
  private readonly options: SceneShellOptions;
  private readonly avatarMountEl: HTMLElement;
  private readonly carouselShellEl: HTMLElement;
  private readonly carouselTrackEl: HTMLElement;
  private readonly dotsEl: HTMLElement;
  private readonly presetButtons: HTMLButtonElement[];
  private readonly copy: AssistantPresentationCopy;
  private readonly labels: SceneShellLabels;
  private readonly presetLabels: SceneShellPresetLabels;

  private rendererConfig!: RendererConfigV1;
  private avatarManifest!: AvatarManifestV1;
  private sceneConfig!: SceneConfigV1;
  private entityMap: HomeAssistantEntityMap | null = null;
  private weatherData: WeatherOverviewPayload;
  private hassStates: HomeAssistantStates | null = null;
  private currentState!: StateV1;
  private remoteControl: ControlV1 = DEFAULT_CONTROL_V1;
  private uiControl: ControlV1 = DEFAULT_CONTROL_V1;
  private currentControl: ControlV1 = DEFAULT_CONTROL_V1;
  private idleLines: string[] = [];
  private activeIndex = 0;
  private lastAutoRotateAt = 0;
  private currentIdleLine = "";
  private lastIdleIndex = -1;
  private currentPreset: ViewPreset = "full";
  private idleTimer: number | null = null;
  private avatarAdapter: AvatarAdapter | null = null;
  private refreshIntervalHandle: number | null = null;
  private orderedPages: ScenePageV1[] = [];
  private carouselDragState: CarouselDragState | null = null;

  constructor(root: HTMLElement, options: SceneShellOptions = {}) {
    this.root = root;
    this.options = options;
    this.copy = {
      ...DEFAULT_SCENE_SHELL_COPY_EN,
      ...(options.copy || {}),
    };
    this.labels = {
      ...DEFAULT_SCENE_SHELL_LABELS_EN,
      ...(options.labels || {}),
    };
    this.presetLabels = {
      ...DEFAULT_SCENE_SHELL_PRESET_LABELS_EN,
      ...(options.presetLabels || {}),
    };
    this.weatherData = buildWeatherOverview(options.defaultWeather);
    this.root.innerHTML = `
      <div class="layout">
        <section class="panel avatar-panel">
          <div class="avatar-shell">
            <div class="avatar-presets" aria-label="Avatar view presets">
              <button class="avatar-preset is-active" type="button" data-avatar-preset="full" title="${escapeHtml(this.presetLabels.full)}" aria-label="${escapeHtml(this.presetLabels.full)}">
                <img src="" alt="" aria-hidden="true" data-preset-thumb="full">
              </button>
              <button class="avatar-preset" type="button" data-avatar-preset="torso" title="${escapeHtml(this.presetLabels.torso)}" aria-label="${escapeHtml(this.presetLabels.torso)}">
                <img src="" alt="" aria-hidden="true" data-preset-thumb="torso">
              </button>
              <button class="avatar-preset" type="button" data-avatar-preset="head" title="${escapeHtml(this.presetLabels.head)}" aria-label="${escapeHtml(this.presetLabels.head)}">
                <img src="" alt="" aria-hidden="true" data-preset-thumb="head">
              </button>
            </div>
            <div class="avatar-mount" data-avatar-mount></div>
          </div>
        </section>

        <section class="panel content-panel">
          <div class="carousel-shell" data-carousel-shell tabindex="0" aria-label="Scene carousel">
            <div class="carousel-track" data-carousel-track></div>
            <div class="carousel-dots" data-dots aria-label="Display pages"></div>
          </div>
        </section>
      </div>
    `;

    this.avatarMountEl = this.requireEl("[data-avatar-mount]");
    this.carouselShellEl = this.requireEl("[data-carousel-shell]");
    this.carouselTrackEl = this.requireEl("[data-carousel-track]");
    this.dotsEl = this.requireEl("[data-dots]");
    this.presetButtons = Array.from(this.root.querySelectorAll<HTMLButtonElement>("[data-avatar-preset]"));
  }

  async init(): Promise<void> {
    const rendererConfigUrl = resolveUrlAgainst(window.location.href, this.getRendererConfigUrl());
    const rendererConfigBaseUrl = resolveBaseUrl(rendererConfigUrl);
    const rawRendererConfig = sanitizeRendererConfigV1(await this.readJson(rendererConfigUrl));
    const resolvedRendererConfig = sanitizeRendererConfigV1({
      ...rawRendererConfig,
      links: Object.fromEntries(
        Object.entries(rawRendererConfig.links || {}).map(([key, value]) => [key, resolveUrlAgainst(rendererConfigBaseUrl, value)]),
      ),
      avatar: {
        ...rawRendererConfig.avatar,
        manifestUrl: resolveUrlAgainst(rendererConfigBaseUrl, rawRendererConfig.avatar.manifestUrl),
      },
      scene: {
        ...rawRendererConfig.scene,
        configUrl: resolveUrlAgainst(rendererConfigBaseUrl, rawRendererConfig.scene.configUrl),
      },
      state: {
        ...rawRendererConfig.state,
        stateUrl: resolveUrlAgainst(rendererConfigBaseUrl, rawRendererConfig.state.stateUrl),
        idleLinesUrl: resolveUrlAgainst(
          rendererConfigBaseUrl,
          rawRendererConfig.state.idleLinesUrl || "./idle-lines.json",
        ),
        entityMapUrl: rawRendererConfig.state.entityMapUrl
          ? resolveUrlAgainst(rendererConfigBaseUrl, rawRendererConfig.state.entityMapUrl)
          : undefined,
      },
      control: {
        ...rawRendererConfig.control,
        controlUrl: resolveUrlAgainst(rendererConfigBaseUrl, rawRendererConfig.control.controlUrl),
      },
    });

    this.rendererConfig = resolvedRendererConfig;
    const manifestUrl = this.rendererConfig.avatar.manifestUrl;
    this.avatarManifest = resolveAvatarManifestUrls(
      sanitizeAvatarManifestV1(await this.readJson(manifestUrl)),
      manifestUrl,
    );
    this.sceneConfig = await this.readJson(this.rendererConfig.scene.configUrl);
    this.entityMap = await this.readEntityMap();
    this.idleLines = await createJsonLinesProvider({
      url: this.rendererConfig.state.idleLinesUrl || resolveUrlAgainst(rendererConfigBaseUrl, "./idle-lines.json"),
      defaultValue: [],
    }).read();
    this.weatherData = await this.readWeatherData();
    this.currentState = await this.readAssistantState();
    this.hassStates = await this.readSceneStates();
    this.remoteControl = await createJsonControlProvider({
      url: this.rendererConfig.control.controlUrl,
      defaultValue: DEFAULT_CONTROL_V1,
    }).read();
    this.currentControl = mergeControlV1(this.remoteControl, this.uiControl);

    this.avatarAdapter = this.createAvatarAdapter();
    await this.avatarAdapter.mount({
      host: this.avatarMountEl,
      assetRoot: this.avatarManifest.assetRoot,
    });

    this.bindPresetControls();
    this.bindCarouselControls();
    this.syncPresetButtonsFromManifest();
    this.lastAutoRotateAt = Date.now();
    await this.refresh();

    if (this.refreshIntervalHandle) {
      window.clearInterval(this.refreshIntervalHandle);
    }
    this.refreshIntervalHandle = window.setInterval(() => {
      void this.refresh();
    }, this.options.refreshIntervalMs ?? 3000);
  }

  async dispose(): Promise<void> {
    if (this.refreshIntervalHandle) {
      window.clearInterval(this.refreshIntervalHandle);
      this.refreshIntervalHandle = null;
    }
    if (this.idleTimer) {
      window.clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    await this.avatarAdapter?.dispose();
    this.avatarAdapter = null;
  }

  private getRendererConfigUrl(): string {
    return trimText(this.options.rendererConfigUrl, 1024) || "./renderer.config.json";
  }

  private getWeatherUrl(): string {
    return trimText(this.options.weatherUrl, 1024) || "./weather.json";
  }

  private bindPresetControls(): void {
    for (const button of this.presetButtons) {
      button.addEventListener("click", () => {
        const preset = button.dataset.avatarPreset as ViewPreset;
        this.uiControl = createViewPresetControl(this.uiControl, preset || "full");
        void this.refresh();
      });
    }
  }

  private bindCarouselControls(): void {
    this.carouselShellEl.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        this.stepPage(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        this.stepPage(1);
      }
    });

    this.carouselShellEl.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || this.orderedPages.length < 2 || this.isCarouselInteractiveTarget(event.target)) {
        return;
      }
      this.carouselDragState = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        deltaX: 0,
        deltaY: 0,
        locked: false,
      };
      this.carouselShellEl.setPointerCapture?.(event.pointerId);
    });

    this.carouselShellEl.addEventListener("pointermove", (event) => {
      if (!this.carouselDragState || event.pointerId !== this.carouselDragState.pointerId) {
        return;
      }
      this.carouselDragState.deltaX = event.clientX - this.carouselDragState.startX;
      this.carouselDragState.deltaY = event.clientY - this.carouselDragState.startY;

      if (!this.carouselDragState.locked) {
        if (Math.abs(this.carouselDragState.deltaX) < 10) {
          return;
        }
        if (Math.abs(this.carouselDragState.deltaY) > Math.abs(this.carouselDragState.deltaX)) {
          this.clearDragState(event.pointerId, false);
          return;
        }
        this.carouselDragState.locked = true;
        this.carouselShellEl.classList.add("is-dragging");
      }

      event.preventDefault();
      this.updateCarouselPosition({
        instant: true,
        dragOffsetPx: this.carouselDragState.deltaX,
      });
    });

    const finalizePointer = (event: PointerEvent) => {
      if (!this.carouselDragState || event.pointerId !== this.carouselDragState.pointerId) {
        return;
      }

      const { locked, deltaX } = this.carouselDragState;
      const width = this.carouselShellEl.clientWidth || 1;
      const shouldStep = locked && Math.abs(deltaX) >= width * 0.16;
      const direction: 1 | -1 = deltaX < 0 ? 1 : -1;

      this.clearDragState(event.pointerId, false);

      if (shouldStep) {
        this.stepPage(direction);
        return;
      }

      this.updateCarouselPosition();
    };

    this.carouselShellEl.addEventListener("pointerup", finalizePointer);
    this.carouselShellEl.addEventListener("pointercancel", finalizePointer);
    this.carouselShellEl.addEventListener("lostpointercapture", finalizePointer);
  }

  private async refresh(): Promise<void> {
    this.currentState = await this.readAssistantState();
    this.hassStates = await this.readSceneStates();
    this.remoteControl = await createJsonControlProvider({
      url: this.rendererConfig.control.controlUrl,
      defaultValue: this.currentControl,
    }).read();
    this.uiControl = mergeControlV1(DEFAULT_CONTROL_V1, this.uiControl);
    this.currentControl = mergeControlV1(this.remoteControl, this.uiControl);

    const effectiveState = mergeControlCueIntoState(this.currentState, this.currentControl);
    this.syncIdleMonologue(effectiveState);

    const presentation = buildAssistantPresentationModel(effectiveState, {
      idleMonologue: this.currentIdleLine,
      copy: this.copy,
    });

    const normalizedScene = normalizeSceneConfig(this.sceneConfig, this.sceneConfig);
    const orderedPages = this.getOrderedPages(normalizedScene.pages, normalizedScene.rotation.order);
    const selection = resolveSceneSelection({
      control: this.currentControl,
      rotation: normalizedScene.rotation,
      activeIndex: this.activeIndex,
      lastAutoRotateAt: this.lastAutoRotateAt,
      force: false,
      isEligible: (pageId) => orderedPages.some((page) => page.id === pageId),
    });

    this.activeIndex = selection.nextIndex;
    this.lastAutoRotateAt = selection.nextAutoRotateAt;
    this.currentPreset = this.currentControl.viewPreset || this.currentPreset || "full";
    this.updatePresetButtons();

    if (!this.avatarAdapter) {
      throw new Error("Avatar adapter is not initialized.");
    }

    await this.avatarAdapter.setState(presentation.state);
    await this.avatarAdapter.setCue(this.currentControl.cue);
    await this.avatarAdapter.setViewPreset(this.currentPreset);
    await this.avatarAdapter.showBubble(presentation.body, {
      ttlMs: 0,
      speak: false,
      typewriter: false,
    });

    this.renderCarousel(orderedPages, presentation);
  }

  private renderCarousel(pages: ScenePageV1[], presentation: AssistantPresentationModel): void {
    this.orderedPages = pages.slice();
    this.carouselTrackEl.innerHTML = pages.map((page, index) => {
      if (page.kind === "overview") {
        return this.renderOverviewSlide(presentation, index);
      }
      return this.renderDynamicSlide(page, index, pages.length);
    }).join("");

    this.updateCarouselPosition();

    this.dotsEl.innerHTML = pages.map((page, index) => `
      <button
        class="carousel-dot ${index === this.activeIndex ? "is-active" : ""}"
        type="button"
        data-slide-index="${index}"
        aria-label="${escapeHtml(trimText(page.title, 40) || `Page ${index + 1}`)}"
      ></button>
    `).join("");

    for (const dot of Array.from(this.dotsEl.querySelectorAll<HTMLButtonElement>("[data-slide-index]"))) {
      dot.addEventListener("click", () => {
        this.pinPageByIndex(Number(dot.dataset.slideIndex) || 0);
      }, { once: true });
    }
  }

  private renderOverviewSlide(presentation: AssistantPresentationModel, index: number): string {
    const assistantName = trimText(this.rendererConfig.assistant.name, 40) || "Assistant";
    const weather = this.weatherData || DEFAULT_WEATHER_OVERVIEW;
    const forecastMarkup = weather.forecast.slice(0, 5).map((day) => this.renderForecastDay(day)).join("");

    return `
      <section class="slide slide-overview" data-slide-id="weather" data-slide-order="${index}">
        <div class="weather-panel slide-body">
          <div class="weather-top">
            <div>
              <h1 class="headline">${escapeHtml(weather.title)}</h1>
              <p class="subline">${escapeHtml(weather.location)}</p>
            </div>
            <div class="weather-top-meta">
              <div class="stamp today-card">
                <span class="caption">${escapeHtml(weather.todayCaption)}</span>
                <span class="value">${escapeHtml(weather.todayValue)}</span>
                <span class="meta">${escapeHtml(weather.todayLabel)}</span>
              </div>
              <div class="stamp">
                <span class="caption">${escapeHtml(weather.updatedCaption)}</span>
                <span class="value">${escapeHtml(weather.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div class="current">
            <div class="hero">
              <div class="temp-row">
                <span class="temp">${escapeHtml(weather.temperature)}</span>
                <span class="unit">°${escapeHtml(weather.unit)}</span>
              </div>
              <div class="condition">${escapeHtml(weather.condition)}</div>
              <div class="feels">${escapeHtml(weather.feelsLike)}</div>
              <div class="hero-badges">
                <div class="hero-badge"><img class="icon" src="${escapeHtml(this.resolveIconUrl("thermometer"))}" alt=""><span>${escapeHtml(weather.badgeSummary)}</span></div>
                <div class="hero-badge"><img class="icon" src="${escapeHtml(this.resolveIconUrl("calendarDays"))}" alt=""><span>${escapeHtml(weather.badgeRange)}</span></div>
              </div>
            </div>
            <div class="neiri-card">
              <div class="neiri-top">
                <div class="neiri-caption">
                  <strong>${escapeHtml(presentation.caption)}</strong>
                  <div class="neiri-label">${escapeHtml(presentation.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${escapeHtml(this.resolveIconUrl("sparkles"))}" alt="${escapeHtml(assistantName)}"></div>
              </div>
              <div class="neiri-meta">${escapeHtml(presentation.body)}</div>
            </div>
          </div>

          <div class="metrics">
            <div class="metric"><div class="metric-header"><span>${escapeHtml(this.labels.humidity)}</span><i><img src="${escapeHtml(this.resolveIconUrl("droplets"))}" alt=""></i></div><strong>${escapeHtml(weather.metrics.humidity)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${escapeHtml(this.labels.pressure)}</span><i><img src="${escapeHtml(this.resolveIconUrl("gauge"))}" alt=""></i></div><strong>${escapeHtml(weather.metrics.pressure)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${escapeHtml(this.labels.wind)}</span><i><img src="${escapeHtml(this.resolveIconUrl("wind"))}" alt=""></i></div><strong>${escapeHtml(weather.metrics.wind)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${escapeHtml(this.labels.clouds)}</span><i><img src="${escapeHtml(this.resolveIconUrl("cloud"))}" alt=""></i></div><strong>${escapeHtml(weather.metrics.clouds)}</strong></div>
          </div>

          <div class="forecast">
            <div class="forecast-head">
              <h2>${escapeHtml(weather.forecastTitle)}</h2>
              <p></p>
            </div>
            <div class="forecast-grid">${forecastMarkup}</div>
          </div>
        </div>
      </section>
    `;
  }

  private renderDynamicSlide(page: ScenePageV1, index: number, pageCount: number): string {
    const cards = resolveSceneCards(
      page.cards || [],
      this.hassStates,
      this.rendererConfig.assistant.locale || "en-US",
    );
    const weatherRange = this.resolveForecastRange();
    const stampCaption = trimText(page.stampCaption, 24)
      || (page.kind === "forecast+cards" ? this.labels.rangeStamp : this.labels.pageStamp);
    const stampValue = trimText(page.stampValue, 32)
      || (page.kind === "forecast+cards" ? weatherRange : `${index + 1} / ${pageCount}`);
    const cardsHtml = page.cardStyle === "mini"
      ? cards.map((card) => `
          <article class="mini-card">
            <span class="caption">${escapeHtml(card.caption)}</span>
            <strong>${escapeHtml(card.value)}</strong>
          </article>
        `).join("")
      : cards.map((card) => `
          <article class="home-card">
            <span class="caption">${escapeHtml(card.caption)}</span>
            <strong>${escapeHtml(card.value)}</strong>
            <small>${escapeHtml(card.hint)}</small>
          </article>
        `).join("");
    const forecastMarkup = page.kind === "forecast+cards"
      ? `<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0, 5).map((day) => this.renderForecastDay(day)).join("")}</div>`
      : "";
    const cardGridClass = page.cardStyle === "mini" ? "dynamic-cards-grid is-mini" : "dynamic-cards-grid is-full";

    return `
      <section class="slide slide-dynamic" data-slide-id="${escapeHtml(page.id)}" data-slide-order="${index}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${escapeHtml(page.kind)}" data-dynamic-card-style="${escapeHtml(page.cardStyle || "full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${escapeHtml(trimText(page.title, 64) || "Scene")}</h1>
              <p class="subline">${escapeHtml(trimText(page.subtitle, 140) || "Configured by scene.json")}</p>
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${escapeHtml(stampCaption)}</span>
              <span class="value">${escapeHtml(stampValue)}</span>
            </div>
          </div>
          ${forecastMarkup}
          <div class="${cardGridClass}">
            ${cardsHtml || `<div class="empty">${escapeHtml(this.labels.noCardsConfigured)}</div>`}
          </div>
        </div>
      </section>
    `;
  }

  private renderForecastDay(day: WeatherForecastDay): string {
    return `
      <article class="day">
        <div class="day-head">
          <div class="icon"><img src="${escapeHtml(day.icon)}" alt=""></div>
          <div class="day-date">
            <span class="name">${escapeHtml(day.name)}</span>
            <span class="meta"><span class="day-number">${escapeHtml(day.dayNumber)}</span><span class="day-month">${escapeHtml(day.monthShort)}</span></span>
          </div>
        </div>
        <div class="temps">
          <strong>${escapeHtml(day.max)}</strong>
          <small>${escapeHtml(day.min)}</small>
        </div>
        <div class="day-note">${escapeHtml(day.note)}</div>
      </article>
    `;
  }

  private resolveForecastRange(): string {
    const forecast = this.weatherData.forecast || [];
    if (!forecast.length) {
      return "5 days";
    }
    const first = forecast[0];
    const last = forecast[forecast.length - 1];
    return `${trimText(first.dayNumber, 4)} ${trimText(first.monthShort, 8)} → ${trimText(last.dayNumber, 4)} ${trimText(last.monthShort, 8)}`;
  }

  private resolveIconUrl(key: keyof SceneShellIconUrls): string {
    const explicit = trimText(this.options.iconUrls?.[key], 1024);
    if (explicit) {
      return explicit;
    }
    const base = withTrailingSlash(trimText(this.options.iconBaseUrl, 1024) || "./assets");
    return `${base}${DEFAULT_ICON_FILENAMES[key]}`;
  }

  private getOrderedPages(pages: ScenePageV1[], order: string[]): ScenePageV1[] {
    const ordered = order
      .map((pageId) => pages.find((page) => page.id === pageId))
      .filter(Boolean) as ScenePageV1[];
    const extras = pages.filter((page) => !ordered.some((item) => item.id === page.id));
    return ordered.concat(extras);
  }

  private updateCarouselPosition(options?: { instant?: boolean; dragOffsetPx?: number }): void {
    const width = this.carouselShellEl.clientWidth || 1;
    const offset = -(this.activeIndex * width) + Math.round(options?.dragOffsetPx || 0);
    this.carouselTrackEl.style.transition = options?.instant ? "none" : "";
    this.carouselTrackEl.style.transform = `translate3d(${offset}px, 0, 0)`;
  }

  private updateDotState(): void {
    for (const dot of Array.from(this.dotsEl.querySelectorAll<HTMLButtonElement>("[data-slide-index]"))) {
      dot.classList.toggle("is-active", Number(dot.dataset.slideIndex) === this.activeIndex);
    }
  }

  private isCarouselInteractiveTarget(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) {
      return false;
    }
    return Boolean(target.closest("button, a, input, select, textarea, label"));
  }

  private clearDragState(pointerId: number, keepCapture: boolean): void {
    if (!keepCapture && this.carouselShellEl.hasPointerCapture?.(pointerId)) {
      this.carouselShellEl.releasePointerCapture(pointerId);
    }
    this.carouselDragState = null;
    this.carouselShellEl.classList.remove("is-dragging");
  }

  private stepPage(direction: 1 | -1): void {
    if (this.orderedPages.length < 2) {
      return;
    }
    const normalizedScene = normalizeSceneConfig(this.sceneConfig, this.sceneConfig);
    const nextIndex = resolveAdjacentSceneIndex(
      normalizedScene.rotation,
      this.activeIndex,
      direction,
      (pageId) => this.orderedPages.some((page) => page.id === pageId),
    );
    this.pinPageByIndex(nextIndex);
  }

  private pinPageByIndex(index: number): void {
    const orderedPages = this.orderedPages.length
      ? this.orderedPages
      : this.getOrderedPages(this.sceneConfig.pages || [], this.sceneConfig.rotation?.order || []);
    const target = orderedPages[index];
    if (!target) {
      return;
    }
    const normalizedScene = normalizeSceneConfig(this.sceneConfig, this.sceneConfig);
    const ttlMs = Math.max(18_000, normalizedScene.rotation.defaultDwellMs * 2);
    this.uiControl = createPinnedPageControl(this.uiControl, target.id, ttlMs);
    this.activeIndex = index;
    this.lastAutoRotateAt = Date.now();
    this.updateCarouselPosition();
    this.updateDotState();
    void this.refresh();
  }

  private syncIdleMonologue(state: StateV1): void {
    if (!shouldShowIdleMonologue(state)) {
      this.currentIdleLine = "";
      if (this.idleTimer) {
        window.clearTimeout(this.idleTimer);
        this.idleTimer = null;
      }
      return;
    }

    if (!this.currentIdleLine) {
      const next = pickIdleLine(this.idleLines, this.lastIdleIndex);
      this.currentIdleLine = next.line;
      this.lastIdleIndex = next.index;
    }

    if (this.idleTimer) {
      window.clearTimeout(this.idleTimer);
    }

    this.idleTimer = window.setTimeout(() => {
      const next = pickIdleLine(this.idleLines, this.lastIdleIndex);
      this.currentIdleLine = next.line;
      this.lastIdleIndex = next.index;
      void this.refresh();
    }, nextIdleDelayMs(18_000, 18_000));
  }

  private requireEl(selector: string): HTMLElement {
    const element = this.root.querySelector<HTMLElement>(selector);
    if (!element) {
      throw new Error(`Missing element: ${selector}`);
    }
    return element;
  }

  private async readJson<T>(url: string): Promise<T> {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: HTTP ${response.status}`);
    }
    return response.json() as Promise<T>;
  }

  private async readEntityMap(): Promise<HomeAssistantEntityMap | null> {
    if (this.rendererConfig.state.provider !== "ha" || !this.rendererConfig.state.entityMapUrl) {
      return null;
    }
    return this.readJson<HomeAssistantEntityMap>(this.rendererConfig.state.entityMapUrl);
  }

  private async readAssistantState(): Promise<StateV1> {
    const jsonFallback = async (): Promise<StateV1> => createJsonStateProvider({
      url: this.rendererConfig.state.stateUrl,
      defaultValue: this.currentState,
    }).read();

    if (this.rendererConfig.state.provider !== "ha" || !this.entityMap) {
      return jsonFallback();
    }

    const provider = createHomeAssistantStateProvider({
      assistantName: this.rendererConfig.assistant.name,
      entityMap: this.entityMap,
      allowApiFallback: this.rendererConfig.state.haApiFallback === true,
    });

    return (await provider.read()) || jsonFallback();
  }

  private async readSceneStates(): Promise<HomeAssistantStates | null> {
    if (this.rendererConfig.state.provider !== "ha") {
      return null;
    }
    const reader = createHomeAssistantStatesReader({
      allowApiFallback: this.rendererConfig.state.haApiFallback === true,
    });
    return reader.read();
  }

  private async readWeatherData(): Promise<WeatherOverviewPayload> {
    let payload: WeatherOverviewPatch = {
      ...(this.options.defaultWeather || {}),
    };

    try {
      const filePayload = await this.readJson<WeatherOverviewPatch>(this.getWeatherUrl());
      payload = mergeWeatherSource(payload, filePayload);
    } catch {
      // Fallback file is optional.
    }

    if (this.options.weatherReader) {
      try {
        const dynamicPayload = await this.options.weatherReader();
        payload = mergeWeatherSource(payload, dynamicPayload);
      } catch {
        // Dynamic weather is best-effort and should not break the shell.
      }
    }

    try {
      return buildWeatherOverview(payload);
    } catch {
      return buildWeatherOverview(this.options.defaultWeather);
    }
  }

  private createAvatarAdapter(): AvatarAdapter {
    if (this.avatarManifest.adapter === "live2d") {
      return createLive2dAdapter({
        manifest: this.avatarManifest,
        rendererConfig: this.rendererConfig,
      });
    }

    if (this.avatarManifest.adapter === "unity-webgl") {
      throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");
    }

    return createStaticAdapter({
      alt: this.rendererConfig.assistant.name || "Assistant",
      imageUrl: this.avatarManifest.modelUrl || this.avatarManifest.entry || undefined,
      fallbackImageUrl: this.avatarManifest.fallbackPortrait || undefined,
    });
  }

  private syncPresetButtonsFromManifest(): void {
    for (const button of this.presetButtons) {
      const preset = button.dataset.avatarPreset || "";
      const imageEl = button.querySelector<HTMLImageElement>("[data-preset-thumb]");
      const presetThumb = this.avatarManifest.presetThumbs?.[preset];
      button.classList.toggle("is-active", preset === this.currentPreset);
      if (!imageEl) {
        continue;
      }
      if (presetThumb) {
        imageEl.src = presetThumb;
        imageEl.removeAttribute("hidden");
      } else {
        imageEl.src = "";
        imageEl.setAttribute("hidden", "hidden");
      }
    }
  }

  private updatePresetButtons(): void {
    for (const button of this.presetButtons) {
      button.classList.toggle("is-active", button.dataset.avatarPreset === this.currentPreset);
    }
  }
}

export async function bootstrapSceneShellApp(root: HTMLElement, options: SceneShellOptions = {}): Promise<BrowserSceneShellApp> {
  const app = new BrowserSceneShellApp(root, options);
  await app.init();
  return app;
}
