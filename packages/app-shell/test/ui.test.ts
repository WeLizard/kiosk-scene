import { afterEach, describe, expect, it, vi } from "vitest";
import { asyncView, confirmDialog, createHttpClient, form, h, openDialog } from "../src/index";

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("h()", () => {
  it("renders user text as text, never as markup", () => {
    const node = h("div", null, '<img src=x onerror="alert(1)">');
    expect(node.querySelector("img")).toBeNull();
    expect(node.textContent).toBe('<img src=x onerror="alert(1)">');
  });
});

describe("form()", () => {
  it("blocks submit on missing required fields and reports server field errors", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const handle = form(
      [{ name: "title", label: "Title", required: true }, { name: "note", label: "Note" }],
      { onSubmit },
    );
    document.body.appendChild(handle.el);
    handle.el.dispatchEvent(new Event("submit", { cancelable: true }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(handle.fields.title.el.classList.contains("has-error")).toBe(true);

    (handle.fields.title.input as HTMLInputElement).value = "Filters";
    handle.el.dispatchEvent(new Event("submit", { cancelable: true }));
    expect(onSubmit).toHaveBeenCalledWith({ title: "Filters", note: "" }, handle);

    handle.showErrors({ code: "invalid", message: "bad", fields: { note: "Too long" } });
    expect(handle.fields.note.el.textContent).toContain("Too long");
  });
});

describe("dialogs", () => {
  it("closes on Escape and restores focus", async () => {
    const trigger = h("button", null, "open");
    document.body.appendChild(trigger);
    trigger.focus();
    const dialog = openDialog("Title", h("p", null, "Body"));
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await dialog.closed;
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("confirmDialog resolves true only on explicit confirm", async () => {
    const pending = confirmDialog({ title: "Delete?", message: "Sure?", confirmLabel: "Delete", destructive: true });
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".ks-dialog button"));
    buttons.find((item) => item.textContent === "Delete")?.click();
    await expect(pending).resolves.toBe(true);
    const second = confirmDialog({ title: "Delete?", message: "Sure?" });
    Array.from(document.querySelectorAll<HTMLButtonElement>(".ks-dialog button")).find((item) => item.textContent === "Cancel")?.click();
    await expect(second).resolves.toBe(false);
  });
});

describe("asyncView()", () => {
  it("ignores a slow older response that arrives after a newer one", async () => {
    const host = h("div");
    let resolveFirst: (value: unknown) => void = () => undefined;
    const responses = [
      new Promise((resolve) => {
        resolveFirst = resolve;
      }),
      Promise.resolve({ ok: true, data: "new" }),
    ];
    let call = 0;
    const view = asyncView<string>({
      host,
      load: () => responses[call++] as never,
      render: (data) => h("span", null, data),
    });
    view.refresh();
    await Promise.resolve();
    await Promise.resolve();
    expect(host.textContent).toContain("new");
    resolveFirst({ ok: true, data: "OLD" });
    await Promise.resolve();
    await Promise.resolve();
    expect(host.textContent).toContain("new");
    expect(host.textContent).not.toContain("OLD");
    view.dispose();
  });

  it("keeps last good data visible when a refresh fails", async () => {
    const host = h("div");
    const results = [
      { ok: true, data: "good" },
      { ok: false, error: { code: "network", message: "offline", retryable: true } },
    ];
    let call = 0;
    const view = asyncView<string>({ host, load: async () => results[call++] as never, render: (data) => h("span", null, data) });
    await Promise.resolve();
    await Promise.resolve();
    expect(host.textContent).toContain("good");
    view.refresh();
    await Promise.resolve();
    await Promise.resolve();
    expect(host.textContent).toContain("good");
    expect(host.querySelector(".ks-stale-banner")?.hasAttribute("hidden")).toBe(false);
    expect(host.textContent).toContain("offline");
    view.dispose();
  });
});

describe("createHttpClient()", () => {
  it("normalizes error payloads and never throws", async () => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ error: { code: "invalid", message: "Bad input", fields: { name: "Required" } } }), { status: 422 }))
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValueOnce(new Response(JSON.stringify({ items: [] }), { status: 200 }));
    const client = createHttpClient({ baseUrl: "http://x.test/api/", fetchImpl: fetchImpl as never });
    const invalid = await client.request("items", { method: "POST", body: { name: "" } });
    expect(invalid).toEqual({ ok: false, error: { code: "invalid", message: "Bad input", fields: { name: "Required" }, retryable: false } });
    const network = await client.request("items");
    expect(network.ok).toBe(false);
    if (!network.ok) {
      expect(network.error.code).toBe("network");
    }
    const good = await client.request("items", { query: { q: "фильтр", empty: "" } });
    expect(good).toEqual({ ok: true, data: { items: [] } });
    expect(String(fetchImpl.mock.calls[2][0])).toBe(`http://x.test/api/items?q=${encodeURIComponent("фильтр")}`);
  });

  it("adds the bearer token and times out hung requests", async () => {
    vi.useFakeTimers();
    const fetchImpl = vi.fn((_url: string, init: RequestInit) => new Promise((_resolve, reject) => {
      init.signal?.addEventListener("abort", () => reject(init.signal?.reason));
    }));
    const client = createHttpClient({ baseUrl: "http://x.test/", fetchImpl: fetchImpl as never, timeoutMs: 1000, getToken: () => "secret" });
    const pending = client.request("slow");
    await vi.advanceTimersByTimeAsync(1500);
    const result = await pending;
    expect(result).toMatchObject({ ok: false, error: { code: "timeout" } });
    expect((fetchImpl.mock.calls[0][1] as RequestInit).headers).toMatchObject({ Authorization: "Bearer secret" });
    vi.useRealTimers();
  });
});

describe("asyncView() with unexpected data", () => {
  it("shows an error with a retry when render() throws, instead of spinning forever", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const host = h("div");
    document.body.appendChild(host);
    let attempts = 0;
    const view = asyncView<{ rows: string[] }>({
      host,
      load: async () => ({ ok: true, data: (attempts += 1) === 1 ? ({} as { rows: string[] }) : { rows: ["a"] } }),
      render: (data) => h("ul", null, data.rows.map((row) => h("li", null, row))),     // first payload has no `rows`
    });
    await vi.waitFor(() => expect(host.querySelector(".ks-error")).not.toBeNull());
    expect(host.querySelector(".ks-spinner")).toBeNull();
    (host.querySelector(".ks-error button") as HTMLButtonElement).click();
    await vi.waitFor(() => expect(host.querySelector("li")?.textContent).toBe("a"));
    view.dispose();
  });
});

describe("stacked dialogs", () => {
  it("Escape closes only the top-most dialog (a confirm inside another dialog)", async () => {
    const outer = openDialog("Item", h("p", null, "details"));
    const asked = confirmDialog({ title: "Delete?", message: "sure?" });
    expect(document.querySelectorAll(".ks-dialog")).toHaveLength(2);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(await asked).toBe(false);
    expect(document.querySelectorAll(".ks-dialog")).toHaveLength(1);                   // the outer one is still open
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await outer.closed;
    expect(document.querySelectorAll(".ks-dialog")).toHaveLength(0);
  });
});
