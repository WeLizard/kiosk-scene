import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { ExtensionRegistry, createExtensionRuntime, type ExtensionRuntime, type MountedView } from "@kiosk-scene/core";
import extension from "../src/index";
import { Backend, nodeFetch, pythonAvailable, startBackend } from "./backend";

/**
 * The UI against the real Domovoy service: what the person types goes through the pages, the extension's providers,
 * HTTP, the language rules, SQLite and the realtime channel, and comes back out on screen.
 */
describe.skipIf(!pythonAvailable)("Domovoy UI ↔ backend", { timeout: 30_000 }, () => {
  let backend: Backend;
  let registry: ExtensionRegistry;
  let runtime: ExtensionRuntime;
  const navigate = vi.fn();
  const originalFetch = globalThis.fetch;
  const mounted: MountedView[] = [];

  beforeAll(async () => {
    backend = await startBackend();
    globalThis.fetch = nodeFetch;
    registry = new ExtensionRegistry();
    await registry.load(extension, { apiBase: backend.url });
    runtime = createExtensionRuntime({ registry, mode: "admin", locale: "ru", config: {}, resolveUrl: (u) => u, navigate });
  }, 30_000);

  afterAll(async () => {
    globalThis.fetch = originalFetch;
    await registry.unload("domovoy");
    await backend?.stop();
  });

  afterEach(() => {
    for (const view of mounted.splice(0)) {
      view.dispose();
    }
    document.body.innerHTML = "";
  });

  async function mount(pageId: string, params: Record<string, unknown> = {}): Promise<HTMLElement> {
    const page = registry.listPages().find((p) => p.id === pageId);
    if (!page) {
      throw new Error(`no page ${pageId}`);
    }
    const host = document.createElement("div");
    document.body.appendChild(host);
    mounted.push(await page.mount(host, params, runtime));
    return host;
  }

  async function say(host: HTMLElement, text: string): Promise<string> {
    const input = host.querySelector<HTMLInputElement>(".dv-command")!;
    input.value = text;
    host.querySelector<HTMLFormElement>(".dv-commandbar")!.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    await vi.waitFor(() => expect(host.querySelector(".dv-reply .ks-badge")).not.toBeNull(), { timeout: 8000 });
    return host.querySelector(".dv-reply")!.textContent ?? "";
  }

  function click(root: ParentNode, label: string | RegExp): void {
    const match = Array.from(root.querySelectorAll<HTMLElement>("button")).find((b) => (typeof label === "string" ? b.textContent?.trim() === label : label.test(b.textContent ?? "")));
    if (!match) {
      throw new Error(`no button ${String(label)} in: ${root.textContent?.slice(0, 300)}`);
    }
    match.click();
  }

  const text = (root: ParentNode): string => root.textContent ?? "";

  it("registers the whole extension: 11 admin sections, kiosk widgets, services", () => {
    const admin = registry.listPages().filter((p) => p.modes.includes("admin")).map((p) => p.id);
    expect(admin).toEqual([
      "domovoy.today", "domovoy.search", "domovoy.inventory", "domovoy.locations", "domovoy.calendar", "domovoy.tasks",
      "domovoy.memory", "domovoy.review", "domovoy.activity", "domovoy.integrations", "domovoy.settings",
    ]);
    expect(registry.listPages().filter((p) => p.modes.includes("kiosk")).map((p) => p.id)).toEqual(["domovoy.today"]);
    expect(registry.listWidgets().map((w) => w.id).sort()).toEqual(["domovoy.command", "domovoy.next-event", "domovoy.shopping", "domovoy.today"]);
    expect(registry.listServices().map((s) => s.id).sort()).toEqual(["domovoy.avatar-sync", "domovoy.mic", "domovoy.notifications"]);
  });

  it("MEMORY: a spoken sentence becomes an item you can search, see in the tree, and correct by hand", async () => {
    const today = await mount("domovoy.today");
    const reply = await say(today, "запомни: девять резисторов 10 кОм лежат в третьей коробке нижнего шкафа");
    expect(reply).toContain("выполнено");
    expect(reply.toLowerCase()).toContain("резистор");
    mounted.pop()!.dispose();

    const inventory = await mount("domovoy.inventory");
    await vi.waitFor(() => expect(text(inventory)).toContain("езистор"), { timeout: 5000 });
    expect(text(inventory)).toMatch(/9/);
    expect(text(inventory).toLowerCase()).toContain("шкаф нижний → коробка 3");
    mounted.pop()!.dispose();

    const search = await mount("domovoy.search");
    const box = search.querySelector<HTMLInputElement>('input[type="search"]')!;
    box.value = "резистор 10 ком";
    box.dispatchEvent(new Event("input", { bubbles: true }));
    await vi.waitFor(() => expect(search.querySelector(".ks-list-click li")).not.toBeNull(), { timeout: 5000 });
    expect(text(search.querySelector(".ks-list-click li")!)).toContain("вещь");
    mounted.pop()!.dispose();

    const locations = await mount("domovoy.locations");
    await vi.waitFor(() => expect(text(locations).toLowerCase()).toContain("шкаф нижний"), { timeout: 5000 });
    mounted.pop()!.dispose();

    // correct it by hand: 9 → 10
    const again = await mount("domovoy.inventory");
    await vi.waitFor(() => expect(again.querySelector("tbody tr")).not.toBeNull(), { timeout: 5000 });
    click(again.querySelector("tbody tr")!, "Изменить");
    const dialog = document.querySelector<HTMLElement>(".ks-dialog")!;
    const quantity = dialog.querySelector<HTMLInputElement>('input[name="quantity"]')!;
    expect(quantity.value).toBe("9");
    quantity.value = "10";
    dialog.querySelector<HTMLFormElement>("form")!.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    await vi.waitFor(() => expect(document.querySelector(".ks-dialog")).toBeNull(), { timeout: 5000 });
    await vi.waitFor(() => expect(text(again.querySelector("tbody tr")!)).toMatch(/10/), { timeout: 5000 });
  });

  it("ASSISTANT: reminder, shopping list and calendar entry from plain sentences, visible on the right pages", async () => {
    const today = await mount("domovoy.today");
    expect(await say(today, "напомни завтра в 9 утра позвонить в банк")).toContain("выполнено");
    expect(await say(today, "добавь в список покупок молоко и хлеб")).toContain("выполнено");
    expect(await say(today, "добавь в календарь врача на завтра в 15:00")).toContain("выполнено");
    await vi.waitFor(() => expect(text(today)).toMatch(/[Пп]озвонить в банк/), { timeout: 8000 });
    expect(text(today)).toMatch(/[Мм]олоко/);
    expect(text(today).toLowerCase()).toContain("врач");
    mounted.pop()!.dispose();

    const tasks = await mount("domovoy.tasks");
    await vi.waitFor(() => expect(text(tasks)).toMatch(/[Пп]озвонить в банк/), { timeout: 5000 });
    const reminderRow = Array.from(tasks.querySelectorAll("li")).find((li) => /[Пп]озвонить в банк/.test(li.textContent ?? ""))!;
    click(reminderRow, "Готово");
    await vi.waitFor(() => expect(text(tasks)).not.toMatch(/[Пп]озвонить в банк/), { timeout: 5000 });
    const milk = Array.from(tasks.querySelectorAll("li")).find((li) => /[Мм]олоко/.test(li.textContent ?? ""))!;
    click(milk, "Куплено");
    await vi.waitFor(() => expect(text(tasks)).not.toMatch(/[Мм]олоко/), { timeout: 5000 });
    mounted.pop()!.dispose();

    const calendar = await mount("domovoy.calendar");
    await vi.waitFor(() => expect(text(calendar).toLowerCase()).toContain("врач"), { timeout: 5000 });
  });

  it("REVIEW: an unsure sentence changes nothing until the person approves — optionally after fixing it", async () => {
    const today = await mount("domovoy.today");
    const reply = await say(today, "мне надо разобрать гараж");
    expect(reply).toContain("на проверке");
    mounted.pop()!.dispose();

    const tasksBefore = await runtime.readData<{ tasks: Array<{ title: string }> }>("domovoy.api", { path: "api/tasks" });
    expect(tasksBefore.ok && tasksBefore.data.tasks.some((t) => /гараж/i.test(t.title))).toBe(false);

    const review = await mount("domovoy.review");
    await vi.waitFor(() => expect(text(review)).toContain("разобрать гараж"), { timeout: 5000 });
    click(review, "Поправить…");
    const dialog = document.querySelector<HTMLElement>(".ks-dialog")!;
    const title = dialog.querySelector<HTMLInputElement>('input[name="title"]')!;
    title.value = "Разобрать кладовку";
    click(dialog, "Применить с правками");
    await vi.waitFor(() => expect(document.querySelector(".ks-dialog")).toBeNull(), { timeout: 5000 });
    const tasksAfter = await runtime.readData<{ tasks: Array<{ title: string }> }>("domovoy.api", { path: "api/tasks" });
    expect(tasksAfter.ok && tasksAfter.data.tasks.map((t) => t.title)).toContain("Разобрать кладовку");
    await vi.waitFor(() => expect(text(review)).toContain("Всё проверено"), { timeout: 5000 });
  });

  it("REALTIME: a change made elsewhere shows up on an open page without any click", async () => {
    const today = await mount("domovoy.today");
    await vi.waitFor(() => expect(today.querySelector(".ks-grid")).not.toBeNull(), { timeout: 5000 });
    expect(text(today)).not.toContain("Проверка реалтайма");
    // "another device" adds a task straight through the API
    const created = await fetch(`${backend.url}api/tasks`, { method: "POST", headers: { "Content-Type": "application/json", "X-Domovoy-Client": "test" }, body: JSON.stringify({ title: "Проверка реалтайма", list: "tasks" }) });
    expect(created.status).toBe(200);
    await vi.waitFor(() => expect(text(today)).toContain("Проверка реалтайма"), { timeout: 6000 });
  });

  it("ACTIVITY: the journal shows what changed and undo takes it back", async () => {
    const activity = await mount("domovoy.activity");
    await vi.waitFor(() => expect(text(activity)).toContain("Проверка реалтайма"), { timeout: 5000 });
    const row = Array.from(activity.querySelectorAll("li")).find((li) => li.textContent?.includes("Проверка реалтайма"))!;
    click(row, "Отменить");
    await vi.waitFor(async () => {
      const r = await runtime.readData<{ tasks: Array<{ title: string }> }>("domovoy.api", { path: "api/tasks" });
      expect(r.ok && r.data.tasks.some((t) => t.title === "Проверка реалтайма")).toBe(false);
    }, { timeout: 5000 });
  });

  it("INTEGRATIONS and SETTINGS render against a fresh install and save without errors", async () => {
    const integrations = await mount("domovoy.integrations");
    await vi.waitFor(() => expect(text(integrations)).toContain("Home Assistant"), { timeout: 5000 });
    expect(text(integrations)).toContain("Голос через колонки");
    // keys for outside clients are not on the page until asked for (and stored service secrets never are)
    expect(text(integrations)).not.toMatch(/[A-Za-z0-9_-]{32,}/);
    expect(text(integrations)).toContain("<секрет Assist");
    const tokenRow = Array.from(integrations.querySelectorAll(".dv-secret-row")).find((r) => r.textContent?.includes("API-токен"))!;
    click(tokenRow, "Показать");
    await vi.waitFor(() => expect(text(tokenRow)).toMatch(/[A-Za-z0-9_-]{30,}/), { timeout: 5000 });
    click(tokenRow, "Показать");
    expect(text(tokenRow)).not.toMatch(/[A-Za-z0-9_-]{30,}/);
    mounted.pop()!.dispose();

    const settings = await mount("domovoy.settings");
    await vi.waitFor(() => expect(text(settings)).toContain("Часовой пояс"), { timeout: 5000 });
    const forms = settings.querySelectorAll("form");
    const general = forms[0];
    const hour = general.querySelector<HTMLInputElement>('input[name="default_reminder_hour"]')!;
    hour.value = "8";
    general.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    await vi.waitFor(async () => {
      const r = await runtime.readData<{ settings: { default_reminder_hour: number } }>("domovoy.api", { path: "api/settings" });
      expect(r.ok && r.data.settings.default_reminder_hour).toBe(8);
    }, { timeout: 5000 });
  });

  it("RESTART: data survives a restart of the service and an open page reconnects by itself", async () => {
    const statuses: string[] = [];
    const stop = runtime.onRealtimeStatus("domovoy.events", (status) => statuses.push(status));
    const today = await mount("domovoy.today");
    await vi.waitFor(() => expect(today.querySelector(".ks-grid")).not.toBeNull(), { timeout: 5000 });
    await vi.waitFor(() => expect(statuses).toContain("live"), { timeout: 5000 });

    await backend.halt();
    await vi.waitFor(() => expect(statuses.some((s) => s === "reconnecting" || s === "offline")).toBe(true), { timeout: 15_000 });
    // while it is down a write is refused with a readable message, not a crash
    const input = today.querySelector<HTMLInputElement>(".dv-command")!;
    input.value = "запомни, что код домофона 4711";
    today.querySelector<HTMLFormElement>(".dv-commandbar")!.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    await vi.waitFor(() => expect(today.querySelector(".dv-reply .ks-error")).not.toBeNull(), { timeout: 8000 });

    await backend.resume();
    const created = await fetch(`${backend.url}api/tasks`, { method: "POST", headers: { "Content-Type": "application/json", "X-Domovoy-Client": "test" }, body: JSON.stringify({ title: "После перезапуска", list: "tasks" }) });
    expect(created.status).toBe(200);
    await vi.waitFor(() => expect(text(today)).toContain("После перезапуска"), { timeout: 20_000 });

    // earlier data is still there (SQLite on disk), and the search index was rebuilt from it
    const inventory = await runtime.readData<{ items: Array<{ name: string; quantity: number }> }>("domovoy.api", { path: "api/items" });
    expect(inventory.ok && inventory.data.items.some((i) => /езистор/.test(i.name) && i.quantity === 10)).toBe(true);
    const hits = await runtime.readData<{ hits: Array<{ kind: string }> }>("domovoy.api", { path: "api/search", query: { q: "резистор" } });
    expect(hits.ok && hits.data.hits.some((h) => h.kind === "item")).toBe(true);
    expect(statuses.at(-1)).toBe("live");
    stop();
  });
});
