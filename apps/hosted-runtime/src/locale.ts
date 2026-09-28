import {
  DEFAULT_SCENE_SHELL_COPY_EN,
  DEFAULT_SCENE_SHELL_LABELS_EN,
  DEFAULT_SCENE_SHELL_PRESET_LABELS_EN,
  type SceneShellLabels,
  type WeatherOverviewPayload,
} from "@kiosk-scene/shell-browser";
import type { AssistantPresentationCopy } from "@kiosk-scene/core";

export type UiLang = "ru" | "en";

export function resolveUiLang(): UiLang {
  const locale = String(navigator.language || "").toLowerCase();
  return locale.startsWith("ru") ? "ru" : "en";
}

/** Presentation copy with the assistant's name substituted; no instance name is baked into the runtime. */
export function buildPresentationCopy(lang: UiLang, assistantName: string): AssistantPresentationCopy {
  const name = assistantName.trim() || (lang === "ru" ? "Ассистент" : "The assistant");
  if (lang === "en") {
    return {
      ...DEFAULT_SCENE_SHELL_COPY_EN,
      offlineBody: `${name} is temporarily unreachable.`,
      busyBody: `${name} is preparing a response.`,
      idleBody: `${name} is nearby and still running in the background.`,
    };
  }
  return {
    ...DEFAULT_SCENE_SHELL_COPY_EN,
    offlineLabel: "Не в сети",
    busyLabel: "Думаю",
    speakingLabel: "Отвечаю",
    idleLabel: "Жду",
    technicalHealthyLabel: "Онлайн",
    messageCaption: "Монолог",
    statusCaption: "Статус",
    modeCaption: "Режим",
    offlineBody: `Связь с ${name} временно недоступна.`,
    busyBody: `${name} готовит ответ.`,
    idleBody: `${name} рядом и продолжает работать в фоне.`,
  };
}

export function buildLabels(lang: UiLang): SceneShellLabels {
  if (lang === "en") {
    return { ...DEFAULT_SCENE_SHELL_LABELS_EN };
  }
  return {
    ...DEFAULT_SCENE_SHELL_LABELS_EN,
    humidity: "Влажность",
    pressure: "Давление",
    wind: "Ветер",
    clouds: "Облачность",
    rangeStamp: "Период",
    pageStamp: "Страница",
    noCardsConfigured: "Карточки ещё не настроены",
    avatarPresetGroup: "Варианты ракурса аватара",
    carouselRegion: "Карусель сцены",
    pagesRegion: "Переключение страниц",
    forecastRangeFallback: "Прогноз на несколько дней",
    staleNotice: "Нет связи — данные могут быть устаревшими",
    extensionUnavailable: "Эта страница недоступна",
  };
}

export function buildPresetLabels(lang: UiLang) {
  if (lang === "en") {
    return { ...DEFAULT_SCENE_SHELL_PRESET_LABELS_EN };
  }
  return {
    ...DEFAULT_SCENE_SHELL_PRESET_LABELS_EN,
    full: "Полный рост",
    torso: "Голова и туловище",
    head: "Только лицо",
  };
}

/**
 * Neutral weather placeholder shown until a live source answers. It deliberately contains no
 * invented readings — only "—" and the *current* date, so a failed fetch can never look like real data.
 */
export function buildWeatherPlaceholder(lang: UiLang, location = "", now = new Date()): Partial<WeatherOverviewPayload> {
  const locale = lang === "ru" ? "ru-RU" : "en-US";
  const dash = "—";
  return {
    title: lang === "ru" ? "Погода" : "Weather",
    location,
    todayCaption: lang === "ru" ? "Сегодня" : "Today",
    todayValue: now.toLocaleDateString(locale, { day: "numeric", month: "long" }),
    todayLabel: now.toLocaleDateString(locale, { weekday: "long" }),
    updatedCaption: lang === "ru" ? "Обновлено" : "Updated",
    updatedAt: dash,
    temperature: dash,
    unit: "C",
    condition: lang === "ru" ? "Нет данных" : "No data",
    feelsLike: "",
    badgeSummary: lang === "ru" ? "Нет данных" : "No data",
    badgeRange: dash,
    metrics: { humidity: dash, pressure: dash, wind: dash, clouds: dash },
    forecastTitle: lang === "ru" ? "Недельный ритм" : "Weekly rhythm",
    forecast: [],
  };
}
