import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ExtensionResult } from "@kiosk-scene/core";
import { createLongPollSource } from "../src/realtime";
import type { HttpClient, HttpRequestOptions } from "../src/http";

type Reply = ExtensionResult<unknown> | ((options: HttpRequestOptions) => Promise<ExtensionResult<unknown>>);

function scriptedHttp(replies: Reply[]): HttpClient & { calls: HttpRequestOptions[] } {
  const calls: HttpRequestOptions[] = [];
  return {
    calls,
    url: (path) => path,
    async request(_path, options = {}) {
      calls.push(options);
      const next = replies.shift();
      if (!next) {
        // Park forever (until aborted) like a real long-poll with no events.
        return new Promise<never>((resolve) => {
          options.signal?.addEventListener("abort", () => resolve({ ok: false, error: { code: "aborted", message: "aborted" } } as never));
        });
      }
      return (typeof next === "function" ? next(options) : next) as never;
    },
  };
}

const ok = (data: unknown): ExtensionResult<unknown> => ({ ok: true, data });
const fail = (code = "network"): ExtensionResult<unknown> => ({ ok: false, error: { code, message: code, retryable: true } });

async function flush(times = 6): Promise<void> {
  for (let i = 0; i < times; i += 1) {
    await Promise.resolve();
    await vi.advanceTimersByTimeAsync(0);
  }
}

describe("createLongPollSource", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts from the current cursor, then delivers events by topic prefix", async () => {
    const http = scriptedHttp([
      ok({ cursor: 10, events: [] }),
      ok({ cursor: 12, events: [{ seq: 11, topic: "items.created", payload: { id: 1 } }, { seq: 12, topic: "calendar.changed" }] }),
    ]);
    const source = createLongPollSource({ id: "t", http, pauseWhenHidden: false });
    const items: unknown[] = [];
    const all: string[] = [];
    source.subscribe("items", (message) => items.push(message.payload));
    source.subscribe("*", (message) => all.push(message.topic));
    await flush();
    expect(source.status()).toBe("live");
    expect(http.calls[0].query).toMatchObject({ timeout: 0 });
    expect(http.calls[1].query).toMatchObject({ since: 10, timeout: 25 });
    expect(items).toEqual([{ id: 1 }]);
    expect(all).toEqual(["items.created", "calendar.changed"]);
    source.close();
  });

  it("backs off after failures, reports offline, and asks subscribers to resync on recovery", async () => {
    const http = scriptedHttp([
      ok({ cursor: 5, events: [] }),
      fail(),
      fail(),
      fail(),
      ok({ cursor: 9, events: [] }),
    ]);
    const source = createLongPollSource({ id: "t", http, pauseWhenHidden: false, random: () => 0, minBackoffMs: 100, maxBackoffMs: 400 });
    const statuses: string[] = [];
    const messages: unknown[] = [];
    source.onStatus((status) => statuses.push(status));
    source.subscribe("*", (message) => messages.push(message.payload));
    await flush();
    await vi.advanceTimersByTimeAsync(2000);
    await flush();
    expect(statuses).toContain("reconnecting");
    expect(statuses).toContain("offline");
    expect(source.status()).toBe("live");
    expect(messages).toContainEqual({ resync: true, reset: false });
    source.close();
  });

  it("signals a reset when the server no longer knows the cursor", async () => {
    const http = scriptedHttp([ok({ cursor: 50, events: [] }), ok({ cursor: 3, reset: true })]);
    const source = createLongPollSource({ id: "t", http, pauseWhenHidden: false });
    const messages: Array<{ topic: string; payload: unknown }> = [];
    source.subscribe("items", (message) => messages.push({ topic: message.topic, payload: message.payload }));
    await flush();
    expect(messages).toContainEqual({ topic: "*", payload: { resync: true, reset: true } });
    source.close();
  });

  it("stops polling and drops listeners on close", async () => {
    const http = scriptedHttp([ok({ cursor: 1, events: [] })]);
    const source = createLongPollSource({ id: "t", http, pauseWhenHidden: false });
    const seen = vi.fn();
    source.subscribe("items", seen);
    await flush();
    const before = http.calls.length;
    source.close();
    await vi.advanceTimersByTimeAsync(60_000);
    expect(http.calls.length).toBe(before);
    expect(seen).not.toHaveBeenCalled();
  });

  it("isolates a throwing subscriber", async () => {
    const http = scriptedHttp([ok({ cursor: 1, events: [] }), ok({ cursor: 2, events: [{ seq: 2, topic: "items.x" }] })]);
    const source = createLongPollSource({ id: "t", http, pauseWhenHidden: false });
    const good = vi.fn();
    source.subscribe("items", () => {
      throw new Error("bad subscriber");
    });
    source.subscribe("items", good);
    await flush();
    expect(good).toHaveBeenCalledTimes(1);
    source.close();
  });

  it("treats a 200 that is not an events document as a failure instead of spinning while 'live'", async () => {
    // a captive portal / proxy answering 200 with HTML (surfaced by the HTTP client as { message }) and an empty body (null)
    const junk = [ok({ message: "<html>Sign in to Wi-Fi</html>" }), ok(null), ok("text"), ok({ cursor: "abc" })];
    const http = scriptedHttp([ok({ cursor: 5, events: [] }), ...junk, ok({ cursor: 6, events: [{ seq: 6, topic: "items.x" }] })]);
    const source = createLongPollSource({ id: "t", http, pauseWhenHidden: false, random: () => 0, minBackoffMs: 100, maxBackoffMs: 400 });
    const seen = vi.fn();
    const statuses: string[] = [];
    source.onStatus((status) => statuses.push(status));
    source.subscribe("items", seen);
    await flush();
    // no tight loop: one request per backoff period, not hundreds
    expect(http.calls.length).toBeLessThan(6);
    expect(statuses).toContain("reconnecting");
    await vi.advanceTimersByTimeAsync(5000);
    await flush();
    expect(seen.mock.calls.some(([message]) => message.topic === "items.x")).toBe(true);   // recovers when a real document arrives
    expect(source.status()).toBe("live");
    source.close();
  });

  it("counts its own poll timeout as a failure: a server that never answers is not 'live'", async () => {
    const http = scriptedHttp([ok({ cursor: 1, events: [] })]);                // afterwards every request parks until aborted
    const source = createLongPollSource({ id: "t", http, pauseWhenHidden: false, waitSeconds: 2, graceSeconds: 1, random: () => 0, minBackoffMs: 100 });
    const statuses: string[] = [];
    source.onStatus((status) => statuses.push(status));
    source.subscribe("items", () => undefined);
    await flush();
    expect(source.status()).toBe("live");
    await vi.advanceTimersByTimeAsync(3100);                                   // waitSeconds + grace: our timeout fires
    await flush();
    expect(statuses).toContain("reconnecting");
    await vi.advanceTimersByTimeAsync(30_000);
    await flush();
    expect(source.status()).toBe("offline");
    source.close();
  });
});
