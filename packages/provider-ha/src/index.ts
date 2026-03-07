import type { StateProvider, StateV1 } from "@kiosk-scene/core";
import { sanitizeStateV1, trimText } from "@kiosk-scene/core";

export interface HomeAssistantEntityMap {
  online: string;
  busy: string;
  status: string;
  message: string;
  source: string;
  updatedAt: string;
  emotion?: string;
  activity?: string;
  cue?: string;
  speaking?: string;
  intensity?: string;
  motion?: string;
  revision: string;
}

export interface HomeAssistantStateEntity {
  entity_id?: string;
  state?: string;
  last_changed?: string;
  attributes?: Record<string, unknown>;
}

export type HomeAssistantStates = Record<string, HomeAssistantStateEntity>;

export interface HomeAssistantStateProviderOptions {
  assistantName?: string;
  entityMap: HomeAssistantEntityMap;
  fetchImpl?: typeof fetch;
  allowApiFallback?: boolean;
  apiUrl?: string;
  cacheTtlMs?: number;
  authCooldownMs?: number;
  readToken?: () => string;
}

export interface HomeAssistantStatesReaderOptions {
  fetchImpl?: typeof fetch;
  allowApiFallback?: boolean;
  apiUrl?: string;
  cacheTtlMs?: number;
  authCooldownMs?: number;
  readToken?: () => string;
}

interface HomeAssistantRoot {
  hass?: {
    states?: HomeAssistantStates;
  };
}

interface BrowserDocumentContext {
  document?: Document;
}

function getBrowserContexts(): BrowserDocumentContext[] {
  if (typeof window === "undefined") {
    return [];
  }
  return [window, window.parent, window.top].filter(Boolean) as BrowserDocumentContext[];
}

export function getHomeAssistantHandle(): HomeAssistantRoot["hass"] | null {
  for (const context of getBrowserContexts()) {
    try {
      const root = context?.document?.querySelector("home-assistant") as HomeAssistantRoot | null;
      const hass = root?.hass;
      if (hass?.states) {
        return hass;
      }
    } catch {
      continue;
    }
  }
  return null;
}

export function readHomeAssistantTokenFromLocalStorage(): string {
  if (typeof window === "undefined" || !window.localStorage) {
    return "";
  }
  try {
    const raw = window.localStorage.getItem("hassTokens");
    if (!raw) {
      return "";
    }
    const parsed = JSON.parse(raw) as { access_token?: string } | null;
    return trimText(parsed?.access_token, 4096);
  } catch {
    return "";
  }
}

export function normalizeHomeAssistantStates(payload: unknown): HomeAssistantStates | null {
  if (!Array.isArray(payload)) {
    return null;
  }
  const next: HomeAssistantStates = {};
  for (const item of payload) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const entityId = trimText((item as HomeAssistantStateEntity).entity_id, 255);
    if (!entityId) {
      continue;
    }
    next[entityId] = item as HomeAssistantStateEntity;
  }
  return next;
}

export function mapAssistantStateFromHomeAssistant(
  states: HomeAssistantStates,
  entityMap: HomeAssistantEntityMap,
  assistantName = "Assistant",
): StateV1 | null {
  const statusEntity = states[entityMap.status];
  const messageEntity = states[entityMap.message];
  const onlineEntity = states[entityMap.online];
  const busyEntity = states[entityMap.busy];
  const sourceEntity = states[entityMap.source];
  const updatedAtEntity = states[entityMap.updatedAt];
  const emotionEntity = entityMap.emotion ? states[entityMap.emotion] : null;
  const activityEntity = entityMap.activity ? states[entityMap.activity] : null;
  const cueEntity = entityMap.cue ? states[entityMap.cue] : null;
  const speakingEntity = entityMap.speaking ? states[entityMap.speaking] : null;
  const intensityEntity = entityMap.intensity ? states[entityMap.intensity] : null;
  const motionEntity = entityMap.motion ? states[entityMap.motion] : null;
  const revisionEntity = states[entityMap.revision];

  if (!statusEntity && !messageEntity && !onlineEntity && !busyEntity) {
    return null;
  }

  const status = trimText(statusEntity?.state, 72);
  const message = trimText(messageEntity?.state, 220);
  const updatedAt = trimText(updatedAtEntity?.state, 64);
  const online = parseHomeAssistantBoolean(onlineEntity, true);
  const busy = parseHomeAssistantBoolean(busyEntity, false);
  const explicitActivity = trimText(activityEntity?.state, 32) || "";
  const explicitSpeaking = parseHomeAssistantBoolean(speakingEntity);
  const speaking = explicitSpeaking ?? explicitActivity === "speaking";
  const derivedActivity = explicitActivity
    || (!online ? "offline" : speaking ? "speaking" : busy ? "thinking" : "idle");

  return sanitizeStateV1({
    version: 1,
    assistant: trimText(assistantName, 40) || "Assistant",
    online,
    busy,
    status: status && status !== "unknown" && status !== "unavailable" ? status : "",
    message: message && message !== "unknown" && message !== "unavailable" ? message : "",
    source: trimText(sourceEntity?.state, 64) || "ha",
    updatedAt: updatedAt && updatedAt !== "unknown" && updatedAt !== "unavailable"
      ? updatedAt
      : statusEntity?.last_changed || new Date().toISOString(),
    emotion: trimText(emotionEntity?.state, 32) || null,
    activity: derivedActivity || null,
    cue: trimText(cueEntity?.state, 32) || null,
    intensity: parseHomeAssistantNumber(intensityEntity),
    speaking,
    motion: trimText(motionEntity?.state, 32) || null,
    revision: Number(revisionEntity?.state) || 0,
  });
}

function parseHomeAssistantBoolean(entity: HomeAssistantStateEntity | null | undefined, fallback?: boolean): boolean | undefined {
  const normalized = trimText(entity?.state, 16).toLowerCase();
  if (!normalized) {
    return fallback;
  }
  if (["on", "true", "yes", "open", "home", "1"].includes(normalized)) {
    return true;
  }
  if (["off", "false", "no", "closed", "not_home", "0"].includes(normalized)) {
    return false;
  }
  return fallback;
}

function parseHomeAssistantNumber(entity: HomeAssistantStateEntity | null | undefined): number | null {
  const normalized = trimText(entity?.state, 32);
  if (!normalized) {
    return null;
  }
  const numeric = Number(normalized);
  if (!Number.isFinite(numeric)) {
    return null;
  }
  return Math.max(0, Math.min(1, numeric));
}

export function createHomeAssistantStateProvider(
  options: HomeAssistantStateProviderOptions,
): StateProvider<StateV1 | null> {
  const statesReader = createHomeAssistantStatesReader(options);

  return {
    id: "ha-state",
    async read() {
      const states = await statesReader.read();
      if (!states) {
        return null;
      }
      return mapAssistantStateFromHomeAssistant(
        states,
        options.entityMap,
        options.assistantName,
      );
    },
  };
}

export function createHomeAssistantStatesReader(
  options: HomeAssistantStatesReaderOptions = {},
): StateProvider<HomeAssistantStates | null> {
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const cacheTtlMs = Math.max(500, options.cacheTtlMs ?? 2500);
  const authCooldownMs = Math.max(60_000, options.authCooldownMs ?? 10 * 60 * 1000);

  let cache: HomeAssistantStates | null = null;
  let cacheAt = 0;
  let inFlight: Promise<HomeAssistantStates | null> | null = null;
  let cooldownUntil = 0;

  async function getStates(): Promise<HomeAssistantStates | null> {
    const hass = getHomeAssistantHandle();
    if (hass?.states) {
      return hass.states;
    }

    const now = Date.now();
    if (cache && now - cacheAt < cacheTtlMs) {
      return cache;
    }
    if (!options.allowApiFallback || typeof fetchImpl !== "function") {
      return cache;
    }
    if (now < cooldownUntil) {
      return cache;
    }
    if (inFlight) {
      return inFlight;
    }

    const token = trimText(options.readToken?.() ?? readHomeAssistantTokenFromLocalStorage(), 4096);
    if (!token) {
      return cache;
    }

    inFlight = fetchImpl(options.apiUrl || "/api/states", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = new Error(`HA states HTTP ${response.status}`) as Error & { status?: number };
          error.status = response.status;
          throw error;
        }
        return response.json();
      })
      .then((payload) => {
        const normalized = normalizeHomeAssistantStates(payload);
        if (normalized) {
          cache = normalized;
          cacheAt = Date.now();
        }
        return normalized || cache;
      })
      .catch((error: Error & { status?: number }) => {
        if (error?.status === 401 || error?.status === 403) {
          cooldownUntil = Date.now() + authCooldownMs;
        }
        return cache;
      })
      .finally(() => {
        inFlight = null;
      });

    return inFlight;
  }

  return {
    id: "ha-states",
    async read() {
      return getStates();
    },
  };
}
