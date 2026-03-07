import type { ControlProvider, ControlV1, StateProvider, StateV1 } from "@kiosk-scene/core";
import { DEFAULT_CONTROL_V1, sanitizeControlV1, sanitizeStateV1, trimText } from "@kiosk-scene/core";

export interface JsonProviderOptions<TPayload> {
  url: string;
  fetchImpl?: typeof fetch;
  defaultValue?: TPayload;
  sanitize?: (payload: unknown) => TPayload;
  timestampParam?: string;
}

async function fetchJson<TPayload>(options: JsonProviderOptions<TPayload>): Promise<TPayload> {
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  if (typeof fetchImpl !== "function") {
    throw new Error("Fetch API is not available for JSON provider.");
  }

  const baseUrl = trimText(options.url, 2048);
  if (!baseUrl) {
    throw new Error("JSON provider URL is empty.");
  }

  const url = new URL(baseUrl, typeof window !== "undefined" ? window.location.href : "http://localhost/");
  url.searchParams.set(options.timestampParam || "ts", String(Date.now()));

  try {
    const response = await fetchImpl(url.toString(), {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = await response.json();
    return options.sanitize ? options.sanitize(payload) : (payload as TPayload);
  } catch (error) {
    if (options.defaultValue !== undefined) {
      return options.defaultValue;
    }
    throw error;
  }
}

export function createJsonStateProvider(
  options: JsonProviderOptions<StateV1>,
): StateProvider<StateV1> {
  return {
    id: "json-state",
    async read() {
      const payload = await fetchJson({
        ...options,
        defaultValue: options.defaultValue,
      });
      return sanitizeStateV1(payload);
    },
  };
}

export function createJsonControlProvider(
  options: JsonProviderOptions<ControlV1>,
): ControlProvider<ControlV1> {
  return {
    id: "json-control",
    async read() {
      const payload = await fetchJson({
        ...options,
        defaultValue: options.defaultValue ?? DEFAULT_CONTROL_V1,
      });
      return sanitizeControlV1(payload);
    },
  };
}

export function createJsonLinesProvider(
  options: JsonProviderOptions<string[]>,
): StateProvider<string[]> {
  return {
    id: "json-lines",
    async read() {
      const payload = await fetchJson<string[]>({
        ...options,
        defaultValue: options.defaultValue ?? [],
      });
      return Array.isArray(payload)
        ? payload.map((item) => trimText(item, 220)).filter(Boolean)
        : [];
    },
  };
}
