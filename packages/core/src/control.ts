import type { ControlPageV1, ControlV1, StateV1, ViewPreset } from "./contracts.js";
import { deepMergeObject, isObjectRecord, parseIsoTime, trimText } from "./utils.js";

export const DEFAULT_CONTROL_V1: ControlV1 = {
  version: 1,
  revision: 0,
  viewPreset: null,
  page: {
    mode: "auto",
    target: null,
    until: null,
  },
  cue: {
    cue: null,
    emotion: null,
    motion: null,
    until: null,
  },
};

const VIEW_PRESETS: ViewPreset[] = ["full", "torso", "head"];

export function sanitizeControlV1(control: unknown, now = Date.now()): ControlV1 {
  const merged = deepMergeObject(DEFAULT_CONTROL_V1, isObjectRecord(control) ? control : {});
  const normalized: ControlV1 = {
    version: 1,
    revision: Number.isFinite(Number(merged.revision)) ? Math.max(0, Number(merged.revision)) : 0,
    viewPreset: null,
    page: {
      mode: merged.page?.mode === "pinned" ? "pinned" : "auto",
      target: trimText(merged.page?.target, 40) || null,
      until: trimText(merged.page?.until, 64) || null,
    },
    cue: {
      cue: trimText(merged.cue?.cue, 32) || null,
      emotion: trimText(merged.cue?.emotion, 32) || null,
      motion: trimText(merged.cue?.motion, 32) || null,
      until: trimText(merged.cue?.until, 64) || null,
    },
  };

  const preset = trimText(merged.viewPreset, 16).toLowerCase() as ViewPreset;
  normalized.viewPreset = VIEW_PRESETS.includes(preset) ? preset : null;

  const pageUntil = parseIsoTime(normalized.page.until);
  if (normalized.page.mode === "pinned") {
    if (!normalized.page.target) {
      normalized.page = { mode: "auto", target: null, until: null };
    } else if (normalized.page.until && (!pageUntil || pageUntil <= now)) {
      normalized.page = { mode: "auto", target: null, until: null };
    }
  }

  const cueUntil = parseIsoTime(normalized.cue.until);
  if (normalized.cue.until && (!cueUntil || cueUntil <= now)) {
    normalized.cue = { cue: null, emotion: null, motion: null, until: null };
  }

  return normalized;
}

export function mergeControlV1(base: unknown, override: unknown, now = Date.now()): ControlV1 {
  return sanitizeControlV1(deepMergeObject(
    sanitizeControlV1(base, now),
    isObjectRecord(override) ? override : {},
  ), now);
}

/**
 * Only the fields the display itself changed. A full ControlV1 cannot be used for this: its defaults
 * (`page.mode: "auto"`, null preset/cue) would overwrite a remote pin or cue on every merge.
 */
export interface ControlOverlayV1 {
  viewPreset?: ViewPreset | null;
  page?: ControlPageV1;
}

export function createViewPresetOverlay(viewPreset: ViewPreset | null): ControlOverlayV1 {
  return { viewPreset };
}

export function createPinnedPageOverlay(pageId: string, ttlMs = 30_000, now = Date.now()): ControlOverlayV1 {
  const target = trimText(pageId, 40);
  const until = new Date(now + Math.max(5_000, Number(ttlMs) || 0)).toISOString();

  return {
    page: {
      mode: target ? "pinned" : "auto",
      target: target || null,
      until: target ? until : null,
    },
  };
}

/** Drops an expired local pin while leaving every other overlay field (and the remote control) intact. */
export function expireControlOverlay(overlay: ControlOverlayV1 | null | undefined, now = Date.now()): ControlOverlayV1 {
  const next: ControlOverlayV1 = { ...(overlay || {}) };
  const page = next.page;
  if (page?.mode === "pinned") {
    const pageUntil = parseIsoTime(page.until);
    if (!page.target || (page.until && (!pageUntil || pageUntil <= now))) {
      delete next.page;
    }
  }
  return next;
}

export function createViewPresetControl(
  base: ControlV1,
  viewPreset: ViewPreset | null,
  now = Date.now(),
): ControlV1 {
  return sanitizeControlV1({
    ...base,
    revision: Math.max(0, Number(base?.revision) || 0) + 1,
    viewPreset,
  }, now);
}

export function createPinnedPageControl(
  base: ControlV1,
  pageId: string,
  ttlMs = 30_000,
  now = Date.now(),
): ControlV1 {
  const target = trimText(pageId, 40);
  const until = new Date(now + Math.max(5_000, Number(ttlMs) || 0)).toISOString();

  return sanitizeControlV1({
    ...base,
    revision: Math.max(0, Number(base?.revision) || 0) + 1,
    page: {
      mode: target ? "pinned" : "auto",
      target: target || null,
      until: target ? until : null,
    },
  }, now);
}

export function clearPinnedPageControl(base: ControlV1, now = Date.now()): ControlV1 {
  return sanitizeControlV1({
    ...base,
    revision: Math.max(0, Number(base?.revision) || 0) + 1,
    page: {
      mode: "auto",
      target: null,
      until: null,
    },
  }, now);
}

export function mergeControlCueIntoState<TState extends StateV1>(state: TState, control: ControlV1): TState {
  const nextState = { ...(state || {}) };
  const nextCue = trimText(control?.cue?.cue, 32);
  const nextEmotion = trimText(control?.cue?.emotion, 32);
  const nextMotion = trimText(control?.cue?.motion, 32);
  if (nextCue) {
    nextState.cue = nextCue;
  }
  if (nextEmotion) {
    nextState.emotion = nextEmotion;
  }
  if (nextMotion) {
    nextState.motion = nextMotion;
  }
  return nextState;
}
