import { trimText, type AssistantPresentationModel, type SceneCardV1, type ScenePageV1 } from "@kiosk-scene/core";
import type { HomeAssistantStates } from "@kiosk-scene/provider-ha";
import { resolveSceneCards, type ResolvedSceneCard } from "@kiosk-scene/widgets-core";
import { escapeHtml } from "./html.js";
import type { SceneShellIconUrls, SceneShellLabels } from "./shell-types.js";
import { DEFAULT_WEATHER_OVERVIEW, type WeatherForecastDay, type WeatherOverviewPayload } from "./weather.js";

/**
 * Pure HTML renderers for scene slides. They return only the *inside* of a slide; the shell owns
 * the persistent `<section>` element, so unchanged slides are never torn down and interactive
 * content (extension pages, widgets, focused inputs) survives every refresh cycle.
 */
export interface SlideRenderContext {
  labels: SceneShellLabels;
  locale: string;
  assistantName: string;
  weather: WeatherOverviewPayload;
  states: HomeAssistantStates | null;
  iconUrl(key: keyof SceneShellIconUrls): string;
}

export function slideClassFor(page: ScenePageV1): string {
  if (page.kind === "overview") {
    return "slide slide-overview";
  }
  if (page.kind === "app") {
    return "slide slide-dynamic slide-app";
  }
  return "slide slide-dynamic";
}

function pageTitle(ctx: SlideRenderContext, page: ScenePageV1, index: number): string {
  return trimText(page.title, 64) || trimText(page.id, 64) || `${ctx.labels.pageStamp} ${index + 1}`;
}

export function renderForecastDay(day: WeatherForecastDay): string {
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

export function resolveForecastRange(ctx: SlideRenderContext): string {
  const forecast = ctx.weather.forecast || [];
  if (!forecast.length) {
    return ctx.labels.forecastRangeFallback;
  }
  const first = forecast[0];
  const last = forecast[forecast.length - 1];
  return `${trimText(first.dayNumber, 4)} ${trimText(first.monthShort, 8)} → ${trimText(last.dayNumber, 4)} ${trimText(last.monthShort, 8)}`;
}

export function renderOverviewBody(ctx: SlideRenderContext, presentation: AssistantPresentationModel): string {
  const assistantName = trimText(ctx.assistantName, 40) || "Assistant";
  const weather = ctx.weather || DEFAULT_WEATHER_OVERVIEW;
  const forecastMarkup = weather.forecast.slice(0, 5).map((day) => renderForecastDay(day)).join("");
  const { labels } = ctx;

  return `
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
                <div class="hero-badge"><img class="icon" src="${escapeHtml(ctx.iconUrl("thermometer"))}" alt=""><span>${escapeHtml(weather.badgeSummary)}</span></div>
                <div class="hero-badge"><img class="icon" src="${escapeHtml(ctx.iconUrl("calendarDays"))}" alt=""><span>${escapeHtml(weather.badgeRange)}</span></div>
              </div>
            </div>
            <div class="neiri-card">
              <div class="neiri-top">
                <div class="neiri-caption">
                  <strong>${escapeHtml(presentation.caption)}</strong>
                  <div class="neiri-label">${escapeHtml(presentation.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${escapeHtml(ctx.iconUrl("sparkles"))}" alt="${escapeHtml(assistantName)}"></div>
              </div>
              <div class="neiri-meta">${escapeHtml(presentation.body)}</div>
            </div>
          </div>

          <div class="metrics">
            <div class="metric"><div class="metric-header"><span>${escapeHtml(labels.humidity)}</span><i><img src="${escapeHtml(ctx.iconUrl("droplets"))}" alt=""></i></div><strong>${escapeHtml(weather.metrics.humidity)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${escapeHtml(labels.pressure)}</span><i><img src="${escapeHtml(ctx.iconUrl("gauge"))}" alt=""></i></div><strong>${escapeHtml(weather.metrics.pressure)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${escapeHtml(labels.wind)}</span><i><img src="${escapeHtml(ctx.iconUrl("wind"))}" alt=""></i></div><strong>${escapeHtml(weather.metrics.wind)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${escapeHtml(labels.clouds)}</span><i><img src="${escapeHtml(ctx.iconUrl("cloud"))}" alt=""></i></div><strong>${escapeHtml(weather.metrics.clouds)}</strong></div>
          </div>

          <div class="forecast">
            <div class="forecast-head">
              <h2>${escapeHtml(weather.forecastTitle)}</h2>
              <p></p>
            </div>
            <div class="forecast-grid">${forecastMarkup}</div>
          </div>
        </div>`;
}

function widgetSlot(page: ScenePageV1, card: SceneCardV1, index: number, className: string, style = ""): string {
  const widgetId = trimText(card.widget, 96);
  return `
          <article class="${className} widget-card" ${style ? `style="${style}"` : ""} data-scene-card-index="${index}" data-scene-page-id="${escapeHtml(page.id)}" data-widget-slot data-widget-id="${escapeHtml(widgetId)}"></article>
        `;
}

function isWidgetCard(card: SceneCardV1 | undefined): boolean {
  return card?.type === "widget" && Boolean(trimText(card.widget, 96));
}

function renderCardMarkup(card: ResolvedSceneCard, page: ScenePageV1, index: number, className: string, mini: boolean, style = ""): string {
  const styleAttr = style ? ` style="${style}"` : "";
  if (mini) {
    return `
          <article class="mini-card"${styleAttr} data-scene-card-index="${index}" data-scene-page-id="${escapeHtml(page.id)}">
            <span class="caption">${escapeHtml(card.caption)}</span>
            <strong>${escapeHtml(card.value)}</strong>
          </article>
        `;
  }
  return `
          <article class="${className}"${styleAttr} data-scene-card-index="${index}" data-scene-page-id="${escapeHtml(page.id)}">
            <span class="caption">${escapeHtml(card.caption)}</span>
            <strong>${escapeHtml(card.value)}</strong>
            <small>${escapeHtml(card.hint)}</small>
          </article>
        `;
}

function renderSlideTop(ctx: SlideRenderContext, page: ScenePageV1, index: number, stampCaption: string, stampValue: string): string {
  const title = pageTitle(ctx, page, index);
  const subtitle = trimText(page.subtitle, 140);
  return `
          <div class="slide-top">
            <div>
              <h1 class="headline">${escapeHtml(title)}</h1>
              ${subtitle ? `<p class="subline">${escapeHtml(subtitle)}</p>` : ""}
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${escapeHtml(stampCaption)}</span>
              <span class="value">${escapeHtml(stampValue)}</span>
            </div>
          </div>`;
}

export function renderCardsBody(ctx: SlideRenderContext, page: ScenePageV1, index: number, pageCount: number): string {
  const rawCards = page.cards || [];
  const cards = resolveSceneCards(rawCards, ctx.states, ctx.locale);
  const mini = page.cardStyle === "mini";
  const stampCaption = trimText(page.stampCaption, 24)
    || (page.kind === "forecast+cards" ? ctx.labels.rangeStamp : ctx.labels.pageStamp);
  const stampValue = trimText(page.stampValue, 32)
    || (page.kind === "forecast+cards" ? resolveForecastRange(ctx) : `${index + 1} / ${pageCount}`);
  const cardsHtml = cards
    .map((card, cardIndex) => isWidgetCard(rawCards[cardIndex])
      ? widgetSlot(page, rawCards[cardIndex], cardIndex, mini ? "mini-card" : "home-card")
      : renderCardMarkup(card, page, cardIndex, "home-card", mini))
    .join("");
  const forecastMarkup = page.kind === "forecast+cards"
    ? `<div class="dynamic-forecast-grid">${ctx.weather.forecast.slice(0, 5).map((day) => renderForecastDay(day)).join("")}</div>`
    : "";
  const cardGridClass = mini ? "dynamic-cards-grid is-mini" : "dynamic-cards-grid is-full";

  return `
        <div class="dynamic-slide slide-body" data-dynamic-layout="${escapeHtml(page.kind)}" data-dynamic-card-style="${escapeHtml(page.cardStyle || "full")}">
          ${renderSlideTop(ctx, page, index, stampCaption, stampValue)}
          ${forecastMarkup}
          <div class="${cardGridClass}">
            ${cardsHtml || `<div class="empty">${escapeHtml(ctx.labels.noCardsConfigured)}</div>`}
          </div>
        </div>`;
}

export function renderGridBody(ctx: SlideRenderContext, page: ScenePageV1, index: number, pageCount: number): string {
  const rawCards = page.cards || [];
  const cards = resolveSceneCards(rawCards, ctx.states, ctx.locale);
  const cols = page.gridColumns || 4;
  const rows = page.gridRows || 3;
  const stampCaption = trimText(page.stampCaption, 24) || ctx.labels.pageStamp;
  const stampValue = trimText(page.stampValue, 32) || `${index + 1} / ${pageCount}`;

  const cardsHtml = cards.map((card, cardIndex) => {
    const raw = rawCards[cardIndex] || {};
    const col = Number(raw.col);
    const row = Number(raw.row);
    const w = Math.max(1, Number(raw.w) || 1);
    const h = Math.max(1, Number(raw.h) || 1);
    const hasPosition = Number.isFinite(col) && Number.isFinite(row);
    const gridStyle = hasPosition
      ? `grid-column: ${col + 1} / span ${w}; grid-row: ${row + 1} / span ${h};`
      : "";
    return isWidgetCard(raw)
      ? widgetSlot(page, raw, cardIndex, "grid-card", gridStyle)
      : renderCardMarkup(card, page, cardIndex, "grid-card", false, gridStyle);
  }).join("");

  return `
        <div class="dynamic-slide slide-body" data-dynamic-layout="grid">
          ${renderSlideTop(ctx, page, index, stampCaption, stampValue)}
          <div class="grid-cards-container" style="--grid-cols: ${cols}; --grid-rows: ${rows};">
            ${cardsHtml || `<div class="empty">${escapeHtml(ctx.labels.noCardsConfigured)}</div>`}
          </div>
        </div>`;
}

/** Container for an extension page; the shell mounts the page into `[data-app-host]`. */
export function renderAppBody(): string {
  return `<div class="app-slide slide-body" data-app-host></div>`;
}
