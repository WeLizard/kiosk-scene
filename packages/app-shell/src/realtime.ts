import type { RealtimeMessage, RealtimeSource, RealtimeStatus, Unsubscribe } from "@kiosk-scene/core";
import type { HttpClient } from "./http.js";

export interface LongPollOptions {
  id: string;
  http: HttpClient;
  /** Path of the events endpoint relative to the http client base. */
  path?: string;
  /** Server-side wait; the client aborts at `waitSeconds + graceSeconds`. */
  waitSeconds?: number;
  graceSeconds?: number;
  minBackoffMs?: number;
  maxBackoffMs?: number;
  /** Pause polling while the page is hidden, and resync when it becomes visible again. */
  pauseWhenHidden?: boolean;
  now?: () => number;
  random?: () => number;
}

interface EventsPayload {
  cursor: number;
  reset?: boolean;
  events?: Array<{ seq: number; topic: string; payload?: unknown }>;
}

export const RESYNC_TOPIC = "*";

function isEventsPayload(value: unknown): value is EventsPayload {
  return Boolean(value) && typeof value === "object" && typeof (value as { cursor?: unknown }).cursor === "number";
}

function topicMatches(subscription: string, topic: string): boolean {
  return subscription === RESYNC_TOPIC || topic === subscription || topic.startsWith(`${subscription}.`);
}

/**
 * Cursor-based long-poll realtime source.
 *
 * Why long-poll instead of SSE/WebSocket: it behaves identically behind Home Assistant
 * ingress, nginx and captive proxies, needs no special buffering config, and resuming
 * after a restart is just "give me everything after cursor N".
 *
 * Contract with the server (`GET <path>?since=<cursor>&timeout=<s>`):
 *   → `{ cursor, events: [{ seq, topic, payload }] }`
 *   → `{ cursor, reset: true }` when `since` is unknown to the server (database replaced or restored).
 *
 * Subscribers to topic `*` (or any topic) also receive a synthetic `{ topic: "*", payload: { resync: true } }`
 * after every reconnect, reset, or return from a hidden tab: "you may have missed events – refetch".
 */
export function createLongPollSource(options: LongPollOptions): RealtimeSource & { start(): void } {
  const path = options.path ?? "events";
  const waitSeconds = options.waitSeconds ?? 25;
  const graceMs = (options.graceSeconds ?? 10) * 1000;
  const minBackoff = options.minBackoffMs ?? 1000;
  const maxBackoff = options.maxBackoffMs ?? 30_000;
  const random = options.random ?? Math.random;

  const listeners = new Map<string, Set<(message: RealtimeMessage) => void>>();
  const statusListeners = new Set<(status: RealtimeStatus) => void>();
  let status: RealtimeStatus = "connecting";
  let cursor: number | null = null;
  let running = false;
  let closed = false;
  let failures = 0;
  let controller: AbortController | null = null;
  let wake: (() => void) | null = null;
  let needsResync = false;

  function setStatus(next: RealtimeStatus): void {
    if (status === next) {
      return;
    }
    status = next;
    for (const listener of Array.from(statusListeners)) {
      listener(next);
    }
  }

  function dispatch(message: RealtimeMessage): void {
    for (const [subscription, set] of Array.from(listeners.entries())) {
      if (!topicMatches(subscription, message.topic) && message.topic !== RESYNC_TOPIC) {
        continue;
      }
      for (const listener of Array.from(set)) {
        try {
          listener(message);
        } catch {
          // One faulty subscriber must not stop the others.
        }
      }
    }
  }

  function sleep(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      const done = (): void => {
        clearTimeout(timer);
        wake = null;
        resolve();
      };
      const timer = setTimeout(done, ms);
      wake = done;
    });
  }

  const onVisibility = (): void => {
    if (typeof document === "undefined" || document.hidden) {
      return;
    }
    needsResync = true;
    if (!running && !closed && options.pauseWhenHidden !== false) {
      start();
    }
    wake?.();
    controller?.abort(new DOMException("resume", "AbortError"));
  };

  async function loop(): Promise<void> {
    running = true;
    try {
      while (!closed) {
        if (options.pauseWhenHidden !== false && typeof document !== "undefined" && document.hidden) {
          break;
        }
        controller = new AbortController();
        let timedOut = false;
        const timeout = setTimeout(() => {
          timedOut = true;
          controller?.abort(new DOMException("poll timeout", "TimeoutError"));
        }, waitSeconds * 1000 + graceMs);
        const result = await options.http.request<EventsPayload>(path, {
          query: { since: cursor ?? undefined, timeout: cursor === null ? 0 : waitSeconds },
          signal: controller.signal,
          timeoutMs: waitSeconds * 1000 + graceMs,
        });
        clearTimeout(timeout);
        controller = null;
        if (closed) {
          break;
        }
        // "Aborted" by resume/close is not a failure; the same code produced by our own poll timeout is (a server that
        // accepts the connection and never answers must not look "live" forever).
        if (!result.ok && result.error.code === "aborted" && !timedOut) {
          continue;
        }
        // A 200 that is not an events document (a captive portal's page, an empty body from a proxy) is a failure too:
        // treating it as data would spin in a tight loop reporting "live".
        if (!result.ok || !isEventsPayload(result.data)) {
          failures += 1;
          setStatus(failures >= 3 ? "offline" : "reconnecting");
          const exp = Math.min(maxBackoff, minBackoff * 2 ** Math.min(failures - 1, 10));
          await sleep(exp / 2 + random() * (exp / 2));
          needsResync = true;
          continue;
        }
        const payload = result.data;
        const previous = cursor;
        cursor = typeof payload.cursor === "number" ? payload.cursor : cursor;
        const recovered = failures > 0;
        failures = 0;
        setStatus("live");
        if (payload.reset || needsResync || recovered) {
          if (previous !== null || payload.reset) {
            dispatch({ topic: RESYNC_TOPIC, payload: { resync: true, reset: payload.reset === true }, cursor: cursor ?? undefined });
          }
          needsResync = false;
        }
        for (const event of payload.events ?? []) {
          dispatch({ topic: event.topic, payload: event.payload, cursor: event.seq });
        }
      }
    } finally {
      running = false;
    }
  }

  function start(): void {
    if (running || closed) {
      return;
    }
    if (typeof document !== "undefined" && options.pauseWhenHidden !== false) {
      document.removeEventListener("visibilitychange", onVisibility);
      document.addEventListener("visibilitychange", onVisibility);
    }
    void loop();
  }

  return {
    id: options.id,
    status: () => status,
    start,
    subscribe(topic, listener) {
      let set = listeners.get(topic);
      if (!set) {
        set = new Set();
        listeners.set(topic, set);
      }
      set.add(listener);
      if (!running && !closed) {
        start();
      }
      const unsubscribe: Unsubscribe = () => {
        set?.delete(listener);
        if (set && set.size === 0) {
          listeners.delete(topic);
        }
      };
      return unsubscribe;
    },
    onStatus(listener) {
      statusListeners.add(listener);
      return () => statusListeners.delete(listener);
    },
    close() {
      closed = true;
      controller?.abort(new DOMException("closed", "AbortError"));
      wake?.();
      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", onVisibility);
      }
      listeners.clear();
      statusListeners.clear();
    },
  };
}
