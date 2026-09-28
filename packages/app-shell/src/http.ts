import type { ExtensionError, ExtensionResult } from "@kiosk-scene/core";

export interface HttpClientOptions {
  /** Base URL (already ingress-resolved), always treated as a directory. */
  baseUrl: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
  /** Returns a bearer token for LAN access, when one is configured. */
  getToken?: () => string | null;
}

export interface HttpRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | boolean | null | undefined>;
  signal?: AbortSignal;
  timeoutMs?: number;
}

export interface HttpClient {
  request<T = unknown>(path: string, options?: HttpRequestOptions): Promise<ExtensionResult<T>>;
  url(path: string, query?: HttpRequestOptions["query"]): string;
}

function withTrailingSlash(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

function errorFromPayload(status: number, payload: unknown): ExtensionError {
  const body = (payload && typeof payload === "object" ? payload : {}) as Record<string, unknown>;
  const nested = (body.error && typeof body.error === "object" ? body.error : null) as Record<string, unknown> | null;
  const source = nested ?? body;
  const message = typeof source.message === "string"
    ? source.message
    : typeof body.error === "string"
      ? body.error
      : `Request failed (HTTP ${status})`;
  const fields = source.fields && typeof source.fields === "object"
    ? Object.fromEntries(Object.entries(source.fields as Record<string, unknown>).map(([k, v]) => [k, String(v)]))
    : undefined;
  return {
    code: typeof source.code === "string" ? source.code : `http_${status}`,
    message,
    fields,
    retryable: status >= 500 || status === 429 || status === 408,
  };
}

/**
 * JSON-over-HTTP client that never throws: failures come back as `{ ok: false, error }`
 * so views can render them instead of crashing. Every request has a hard timeout so a
 * hung connection (sleeping kiosk, flapping Wi-Fi) cannot leave a view loading forever.
 */
export function createHttpClient(options: HttpClientOptions): HttpClient {
  const fetchImpl = options.fetchImpl ?? ((...args: Parameters<typeof fetch>) => globalThis.fetch(...args));
  const base = withTrailingSlash(options.baseUrl);

  function url(path: string, query?: HttpRequestOptions["query"]): string {
    const resolved = new URL(path.replace(/^\/+/, ""), new URL(base, globalThis.location?.href ?? "http://localhost/"));
    for (const [key, value] of Object.entries(query ?? {})) {
      if (value !== null && value !== undefined && value !== "") {
        resolved.searchParams.set(key, String(value));
      }
    }
    return resolved.toString();
  }

  async function request<T>(path: string, request: HttpRequestOptions = {}): Promise<ExtensionResult<T>> {
    const controller = new AbortController();
    const timeoutMs = request.timeoutMs ?? options.timeoutMs ?? 15_000;
    const timer = setTimeout(() => controller.abort(new DOMException("Request timed out", "TimeoutError")), timeoutMs);
    const onAbort = (): void => controller.abort(request.signal?.reason);
    request.signal?.addEventListener("abort", onAbort, { once: true });
    if (request.signal?.aborted) {
      onAbort();
    }
    try {
      const headers: Record<string, string> = { Accept: "application/json" };
      const token = options.getToken?.();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      let body: string | undefined;
      if (request.body !== undefined) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(request.body);
      }
      const response = await fetchImpl(url(path, request.query), {
        method: request.method ?? (body === undefined ? "GET" : "POST"),
        headers,
        body,
        cache: "no-store",
        signal: controller.signal,
      });
      let payload: unknown = null;
      const text = await response.text();
      if (text) {
        try {
          payload = JSON.parse(text);
        } catch {
          payload = { message: text.slice(0, 200) };
        }
      }
      if (!response.ok) {
        return { ok: false, error: errorFromPayload(response.status, payload) };
      }
      return { ok: true, data: payload as T };
    } catch (error) {
      const name = (error as { name?: string } | null)?.name;
      if (request.signal?.aborted) {
        return { ok: false, error: { code: "aborted", message: "Request aborted." } };
      }
      if (name === "TimeoutError" || name === "AbortError") {
        return { ok: false, error: { code: "timeout", message: "The server did not answer in time.", retryable: true } };
      }
      return {
        ok: false,
        error: {
          code: "network",
          message: error instanceof Error && error.message ? error.message : "Network error",
          retryable: true,
        },
      };
    } finally {
      clearTimeout(timer);
      request.signal?.removeEventListener("abort", onAbort);
    }
  }

  return { request, url };
}
