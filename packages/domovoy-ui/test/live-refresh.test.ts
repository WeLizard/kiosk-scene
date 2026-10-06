import { afterEach, describe, expect, it, vi } from "vitest";
import { Disposer, h } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime } from "@kiosk-scene/core";
import { liveRefresh } from "../src/pages/common";

function runtimeWithEvents() {
  const listeners = new Map<string, Array<() => void>>();
  const runtime = {
    subscribe: (_source: string, topic: string, listener: () => void) => {
      listeners.set(topic, [...(listeners.get(topic) ?? []), listener]);
      return () => undefined;
    },
  } as unknown as ExtensionRuntime;
  return { runtime, emit: (topic: string) => (listeners.get(topic) ?? []).forEach((l) => l()) };
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.useRealTimers();
});

describe("liveRefresh", () => {
  it("refreshes (debounced) for the topics it was given, and only those", async () => {
    vi.useFakeTimers();
    const { runtime, emit } = runtimeWithEvents();
    const refresh = vi.fn();
    liveRefresh(runtime, new Disposer(), ["items"], refresh, 100);
    emit("items");
    emit("items");
    emit("calendar");                               // not subscribed
    await vi.advanceTimersByTimeAsync(150);
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("holds a refresh while someone types in a form on the page and runs it once they leave", async () => {
    vi.useFakeTimers();
    const { runtime, emit } = runtimeWithEvents();
    const input = h("input", { type: "text" });
    const save = h("button", { type: "submit" }, "Save");
    const outside = h("button", { type: "button" }, "elsewhere");
    const host = h("div", null, h("form", null, input, save));
    document.body.append(host, outside);
    const refresh = vi.fn();
    liveRefresh(runtime, new Disposer(), ["settings"], refresh, 50, host);

    input.focus();
    emit("settings");
    await vi.advanceTimersByTimeAsync(200);
    expect(refresh).not.toHaveBeenCalled();         // half-typed input is safe

    // Tab to the Save button: still "using the form" — the DOM must not be replaced between mousedown and click
    save.focus();
    input.dispatchEvent(new FocusEvent("focusout", { relatedTarget: save, bubbles: true }));
    await vi.advanceTimersByTimeAsync(400);
    expect(refresh).not.toHaveBeenCalled();

    // focus really leaves the page section: the held refresh runs
    outside.focus();
    save.dispatchEvent(new FocusEvent("focusout", { relatedTarget: outside, bubbles: true }));
    await vi.advanceTimersByTimeAsync(400);
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("stops listening when disposed", async () => {
    vi.useFakeTimers();
    const { runtime, emit } = runtimeWithEvents();
    const refresh = vi.fn();
    const disposer = new Disposer();
    liveRefresh(runtime, disposer, ["items"], refresh, 50);
    emit("items");
    disposer.dispose();
    await vi.advanceTimersByTimeAsync(200);
    expect(refresh).not.toHaveBeenCalled();
  });
});
