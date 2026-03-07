import type { StateV1 } from "./contracts.js";
import { parseCueDirectives } from "./directives.js";
import { sanitizeStateV1 } from "./state.js";
import { trimText } from "./utils.js";

export interface AssistantPresentationCopy {
  offlineLabel: string;
  busyLabel: string;
  speakingLabel: string;
  idleLabel: string;
  technicalHealthyLabel: string;
  messageCaption: string;
  statusCaption: string;
  modeCaption: string;
  offlineBody: string;
  busyBody: string;
  idleBody: string;
}

export interface AssistantPresentationModel {
  state: StateV1;
  hasTechnicalFailure: boolean;
  caption: string;
  label: string;
  body: string;
  bodyKey: string;
}

export const DEFAULT_ASSISTANT_PRESENTATION_COPY_EN: AssistantPresentationCopy = {
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

const TECHNICAL_ERROR_HINTS = [
  "provider",
  "model provider",
  "gateway",
  "forbidden",
  "unauthorized",
  "rate limit",
  "too many requests",
  "quota",
  "service unavailable",
  "timed out",
  "timeout",
  "context length",
  "провайдер",
  "модель",
  "модели",
  "шлюз",
  "доступ запрещ",
  "слишком много запросов",
  "квота",
  "таймаут",
  "недоступен сервис",
];

export function isTechnicalAssistantErrorText(value: unknown): boolean {
  const normalized = trimText(value, 280).toLowerCase();
  if (!normalized) {
    return false;
  }
  if (/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(normalized)) {
    return true;
  }
  return TECHNICAL_ERROR_HINTS.some((token) => normalized.includes(token));
}

export function sanitizeAssistantRuntimeState(
  state: unknown,
  options?: { healthyStatus?: string },
): { state: StateV1; hasTechnicalFailure: boolean } {
  const source = sanitizeStateV1(state);
  const status = trimText(source.status, 72);
  const message = trimText(source.message, 220);
  const online = !(source.online === false);
  const hasTechnicalFailure =
    online &&
    (isTechnicalAssistantErrorText(status) || isTechnicalAssistantErrorText(message));

  if (!hasTechnicalFailure) {
    return {
      state: source,
      hasTechnicalFailure: false,
    };
  }

  const emotion = trimText(source.emotion, 32).toLowerCase();
  const motion = trimText(source.motion, 32).toLowerCase();

  return {
    state: {
      ...source,
      busy: false,
      status: trimText(options?.healthyStatus, 72),
      message: "",
      emotion: emotion === "error" ? "calm" : emotion || null,
      activity: trimText(source.activity, 32).toLowerCase() === "error"
        ? "idle"
        : (trimText(source.activity, 32) || null),
      cue: trimText(source.cue, 32) || null,
      intensity: source.intensity ?? null,
      speaking: false,
      motion: motion === "error" ? "idle_soft" : motion || null,
    },
    hasTechnicalFailure: true,
  };
}

export function buildAssistantPresentationModel(
  state: unknown,
  options?: {
    idleMonologue?: string;
    copy?: AssistantPresentationCopy;
  },
): AssistantPresentationModel {
  const copy = options?.copy ?? DEFAULT_ASSISTANT_PRESENTATION_COPY_EN;
  const stateWithDirectives = sanitizeStateV1(state);
  const directiveState = parseCueDirectives(stateWithDirectives.message, 220);
  const normalized = sanitizeAssistantRuntimeState({
    ...stateWithDirectives,
    message: directiveState.text,
    emotion: trimText(stateWithDirectives.emotion, 32) || directiveState.emotion || null,
    activity: trimText(stateWithDirectives.activity, 32) || directiveState.activity || null,
    cue: trimText(stateWithDirectives.cue, 32) || directiveState.cue || null,
    motion: trimText(stateWithDirectives.motion, 32) || directiveState.motion || null,
  }, {
    healthyStatus: copy.technicalHealthyLabel,
  });
  const forwardedState = normalized.state;
  const message = trimText(forwardedState.message, 180);
  const activity = trimText(forwardedState.activity, 32).toLowerCase();
  const online = !(forwardedState.online === false) && activity !== "offline";
  const busy = Boolean(forwardedState.busy) || activity === "thinking" || activity === "busy" || activity === "acting";
  const speaking = forwardedState.speaking === true || activity === "speaking";

  const label = !online
    ? copy.offlineLabel
    : busy
      ? copy.busyLabel
      : (message || speaking)
        ? copy.speakingLabel
        : (normalized.hasTechnicalFailure ? copy.technicalHealthyLabel : copy.idleLabel);

  const caption = message
    ? copy.messageCaption
    : (normalized.hasTechnicalFailure ? copy.statusCaption : copy.modeCaption);

  const body = message
    ? message
    : !online
      ? copy.offlineBody
      : busy
        ? copy.busyBody
        : trimText(options?.idleMonologue, 220) || copy.idleBody;

  return {
    state: forwardedState,
    hasTechnicalFailure: normalized.hasTechnicalFailure,
    caption,
    label,
    body,
    bodyKey: [caption, label, body].join(":"),
  };
}
