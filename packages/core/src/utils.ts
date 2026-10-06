export function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function trimText(value: unknown, maxLength = 160): string {
  const normalized = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!normalized) {
    return "";
  }
  if (normalized.length <= maxLength) {
    return normalized;
  }
  return `${normalized.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

export function parseIsoTime(value: unknown): number {
  const date = new Date(String(value ?? ""));
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

const UNSAFE_MERGE_KEYS = new Set(["__proto__", "constructor", "prototype"]);

export function deepMergeObject<T>(base: T, override: unknown): T {
  if (!isObjectRecord(base) || !isObjectRecord(override)) {
    return ((override ?? base) as T);
  }
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (UNSAFE_MERGE_KEYS.has(key)) {
      continue;
    }
    if (Array.isArray(value)) {
      result[key] = value.slice();
      continue;
    }
    if (isObjectRecord(value) && isObjectRecord(result[key])) {
      result[key] = deepMergeObject(result[key] as Record<string, unknown>, value);
      continue;
    }
    result[key] = value;
  }
  return result as T;
}

export function normalizeStringList(value: unknown, maxLength = 40): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => trimText(item, maxLength).toLowerCase())
    .filter(Boolean);
}

/**
 * Normalizes a list of identifiers (page ids, extension ids). Unlike
 * `normalizeStringList` this preserves case, because ids are compared verbatim.
 */
export function normalizeIdList(value: unknown, maxLength = 40): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => trimText(item, maxLength))
    .filter(Boolean);
}


/**
 * `fetch` that gives up after `timeoutMs`. A kiosk that sits behind flaky Wi-Fi or a half-open connection would
 * otherwise wait forever on one request — and, because refresh cycles are coalesced, never refresh again. The
 * abort stays armed after the headers arrive, so a body that stalls mid-transfer is cut off too.
 */
export function fetchWithTimeout(
  fetchImpl: typeof fetch,
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = 10_000,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new DOMException("Request timed out", "TimeoutError")), timeoutMs);
  const outer = init.signal;
  if (outer) {
    if (outer.aborted) {
      controller.abort(outer.reason);
    } else {
      outer.addEventListener("abort", () => controller.abort(outer.reason), { once: true });
    }
  }
  return fetchImpl(input, { ...init, signal: controller.signal }).catch((error: unknown) => {
    clearTimeout(timer);
    throw error;
  });
}
