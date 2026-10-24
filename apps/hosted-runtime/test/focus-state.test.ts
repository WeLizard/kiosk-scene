import { afterEach, describe, expect, it, vi } from "vitest";
import { captureFocusState, restoreFocusState } from "../src/focus-state";

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("editor focus preservation", () => {
  it("restores the field, caret and selection after the dashboard is re-rendered", () => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    const host = document.createElement("div");
    document.body.appendChild(host);
    host.innerHTML = `<input id="page-field-title" value="Hello">`;
    const input = host.querySelector("input") as HTMLInputElement;
    input.focus();
    input.setSelectionRange(2, 4);

    const snapshot = captureFocusState(host);
    host.innerHTML = `<input id="page-field-title" value="Hello">`;
    restoreFocusState(host, snapshot);

    const next = host.querySelector("input") as HTMLInputElement;
    expect(document.activeElement).toBe(next);
    expect(next.selectionStart).toBe(2);
    expect(next.selectionEnd).toBe(4);
  });

  it("does not pull focus back when the active element is outside the dashboard", () => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    const host = document.createElement("div");
    const outside = document.createElement("button");
    document.body.append(host, outside);
    outside.focus();

    restoreFocusState(host, captureFocusState(host));

    expect(document.activeElement).toBe(outside);
  });
});
