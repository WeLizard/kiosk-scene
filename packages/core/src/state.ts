import type { StateV1 } from "./contracts.js";
import { isObjectRecord, trimText } from "./utils.js";

export const DEFAULT_STATE_V1: StateV1 = {
  version: 1,
  assistant: "",
  online: true,
  busy: false,
  status: "",
  message: "",
  source: "",
  updatedAt: "",
  emotion: null,
  activity: null,
  cue: null,
  intensity: null,
  speaking: false,
  motion: null,
  revision: 0,
  event: "",
};

export function sanitizeStateV1(value: unknown, defaults: Partial<StateV1> = {}): StateV1 {
  const source = isObjectRecord(value) ? value : {};
  const base: StateV1 = {
    ...DEFAULT_STATE_V1,
    ...defaults,
  };

  return {
    version: 1,
    assistant: trimText(source.assistant ?? base.assistant, 40),
    online: typeof source.online === "boolean" ? source.online : base.online,
    busy: typeof source.busy === "boolean" ? source.busy : base.busy,
    status: trimText(source.status ?? base.status, 255),
    message: trimText(source.message ?? base.message, 255),
    source: trimText(source.source ?? base.source, 64),
    updatedAt: trimText(source.updatedAt ?? base.updatedAt, 64),
    emotion: trimText(source.emotion ?? base.emotion, 32) || null,
    activity: trimText(source.activity ?? base.activity, 32) || null,
    cue: trimText(source.cue ?? base.cue, 32) || null,
    intensity: sanitizeIntensity(source.intensity ?? base.intensity),
    speaking: typeof source.speaking === "boolean" ? source.speaking : Boolean(base.speaking),
    motion: trimText(source.motion ?? base.motion, 32) || null,
    revision: Number.isFinite(Number(source.revision)) ? Math.max(0, Number(source.revision)) : base.revision,
    event: trimText(source.event ?? base.event, 64),
  };
}

function sanitizeIntensity(value: unknown): number | null {
  if (value == null || value === "") {
    return null;
  }
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return null;
  }
  return Math.max(0, Math.min(1, numeric));
}
