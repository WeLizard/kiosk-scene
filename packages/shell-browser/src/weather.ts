import { trimText, withTrailingSlash } from "@kiosk-scene/core";
import { createHomeAssistantStatesReader } from "@kiosk-scene/provider-ha";

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

export function buildWeatherOverview(payload?: WeatherOverviewPatch): WeatherOverviewPayload {
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

export function mergeWeatherSource(
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
  apiUrl?: string;
  fetchImpl?: typeof fetch;
}

export function createHomeAssistantWeatherReader(options: HomeAssistantWeatherReaderOptions): () => Promise<WeatherOverviewPatch | null> {
  const locale = trimText(options.locale, 32) || "ru-RU";
  const iconBaseUrl = trimText(options.iconBaseUrl, 1024) || "./assets/icons";
  const statesReader = createHomeAssistantStatesReader({
    allowApiFallback: options.allowApiFallback,
    apiUrl: options.apiUrl,
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
          const localDate = new Date(`${date}T12:00:00`);
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
      title: locale.startsWith("ru") ? "Погода" : "Weather",
      todayCaption: locale.startsWith("ru") ? "Сегодня" : "Today",
      updatedCaption: locale.startsWith("ru") ? "Обновлено" : "Updated",
      forecastTitle: locale.startsWith("ru") ? "Недельный ритм" : "Weekly rhythm",
      todayValue: formatTodayDate(new Date().toISOString(), locale),
      todayLabel: formatTodayLabel(new Date().toISOString(), locale),
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

