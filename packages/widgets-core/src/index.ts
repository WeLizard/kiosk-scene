import type { SceneCardV1 } from "@kiosk-scene/core";
import { trimText } from "@kiosk-scene/core";

export interface WidgetDefinition {
  id: string;
  kind: string;
}

export interface EntityStateLike {
  state?: string;
  last_changed?: string;
  attributes?: Record<string, unknown>;
}

export type EntityStateMap = Record<string, EntityStateLike>;

export interface ResolvedSceneCard {
  caption: string;
  value: string;
  hint: string;
}

export const builtInWidgets: WidgetDefinition[] = [
  { id: "status-card", kind: "status" },
  { id: "weather-overview", kind: "weather" },
  { id: "forecast-strip", kind: "forecast" },
  { id: "entity-summary", kind: "entity-summary" },
];

const FALLBACKS = {
  en: {
    card: "Card", staticCard: "static card", clear: "Clear", pendingTasks: "pending tasks",
    on: "On", off: "Off", deviceState: "device state", batteryLevel: "battery level",
    throughput: "throughput", nextEvent: "next event", percent: "state percentage",
    numeric: "numeric value", entityState: "entity state",
    todoCount: (count: number) => `${count} item${count === 1 ? "" : "s"}`,
    nothingPending: "nothing pending",
  },
  ru: {
    card: "Карточка", staticCard: "статичная карточка", clear: "Нет дел", pendingTasks: "ожидают",
    on: "Вкл", off: "Выкл", deviceState: "состояние устройства", batteryLevel: "заряд",
    throughput: "скорость", nextEvent: "следующее событие", percent: "процент",
    numeric: "число", entityState: "состояние сущности",
    todoCount: (count: number) => `${count} шт.`,
    nothingPending: "ничего не осталось",
  },
} as const;

function fallbacksFor(locale: string) {
  return locale.toLowerCase().startsWith("ru") ? FALLBACKS.ru : FALLBACKS.en;
}

function cardField(card: SceneCardV1, key: string, maxLength = 64): string {
  return trimText((card as Record<string, unknown>)[key], maxLength);
}

function formatNumber(value: unknown, digits = 0, locale = "en-US"): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "";
  }
  return numeric.toLocaleString(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatTime(value: unknown, locale = "en-US"): string {
  const text = trimText(value, 64);
  if (!text) {
    return "";
  }
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) {
    return text;
  }
  return parsed.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function resolveEntity(states: EntityStateMap | null | undefined, entityId: string): EntityStateLike | null {
  if (!states || !entityId) {
    return null;
  }
  return states[entityId] || null;
}

export function resolveSceneCard(
  card: SceneCardV1,
  states: EntityStateMap | null = null,
  locale = "en-US",
): ResolvedSceneCard {
  const labels = fallbacksFor(locale);
  const caption = cardField(card, "caption", 40) || cardField(card, "type", 24) || labels.card;
  const hint = cardField(card, "hint", 72);
  const type = cardField(card, "type", 32).toLowerCase() || "entity";
  const entityId = cardField(card, "entity", 255);
  const stateObj = resolveEntity(states, entityId);
  const secondaryObj = resolveEntity(states, cardField(card, "stateEntity", 255));
  const downObj = resolveEntity(states, cardField(card, "downEntity", 255));
  const upObj = resolveEntity(states, cardField(card, "upEntity", 255));

  if (type === "text" || type === "static" || type === "note") {
    return {
      caption,
      value: cardField(card, "value", 64) || "—",
      hint: hint || labels.staticCard,
    };
  }

  if (type === "todo") {
    const count = Number(stateObj?.state);
    if (!Number.isFinite(count) || count <= 0) {
      return { caption, value: labels.clear, hint: hint || labels.nothingPending };
    }
    return {
      caption,
      value: labels.todoCount(count),
      hint: hint || labels.pendingTasks,
    };
  }

  if (type === "onoff") {
    const isOn = stateObj?.state === "on";
    return {
      caption,
      value: isOn ? (cardField(card, "onText", 48) || labels.on) : (cardField(card, "offText", 48) || labels.off),
      hint: hint || labels.deviceState,
    };
  }

  if (type === "battery") {
    const battery = formatNumber(stateObj?.state, 0, locale);
    return {
      caption,
      value: battery ? `${battery}%` : "—",
      hint: trimText(secondaryObj?.state, 48) || hint || labels.batteryLevel,
    };
  }

  if (type === "network") {
    const down = formatNumber(downObj?.state, 0, locale);
    const up = formatNumber(upObj?.state, 0, locale);
    return {
      caption,
      value: down || up ? `↓ ${down || "0"} · ↑ ${up || "0"}` : "—",
      hint: hint || labels.throughput,
    };
  }

  if (type === "time") {
    return {
      caption,
      value: formatTime(stateObj?.state, locale) || "—",
      hint: hint || labels.nextEvent,
    };
  }

  if (type === "percent") {
    const numeric = formatNumber(stateObj?.state, Number(cardField(card, "digits", 4)) || 0, locale);
    return {
      caption,
      value: numeric ? `${numeric}%` : "—",
      hint: hint || trimText(stateObj?.attributes?.friendly_name, 48) || labels.percent,
    };
  }

  if (type === "number") {
    const digits = Number(cardField(card, "digits", 4)) || 0;
    const numeric = formatNumber(stateObj?.state, digits, locale);
    const unit = cardField(card, "unit", 16) || trimText(stateObj?.attributes?.unit_of_measurement, 16);
    return {
      caption,
      value: numeric ? `${numeric}${unit ? ` ${unit}` : ""}` : "—",
      hint: hint || trimText(stateObj?.attributes?.friendly_name, 48) || labels.numeric,
    };
  }

  return {
    caption,
    value: trimText(stateObj?.state, 64) || cardField(card, "value", 64) || "—",
    hint: hint || trimText(stateObj?.attributes?.friendly_name, 48) || labels.entityState,
  };
}

export function resolveSceneCards(
  cards: SceneCardV1[] | undefined,
  states: EntityStateMap | null = null,
  locale = "en-US",
): ResolvedSceneCard[] {
  return Array.isArray(cards)
    ? cards.map((card) => resolveSceneCard(card, states, locale))
    : [];
}
