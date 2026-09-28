import { Disposer, badge, button, confirmDialog, debounce, form, h, openDialog, toast, type Child, type FieldOptions } from "@kiosk-scene/app-shell";
import type { ExtensionError, ExtensionResult, ExtensionRuntime, MountedView } from "@kiosk-scene/core";
import { ACTION_PROVIDER_ID, DATA_PROVIDER_ID, EVENTS_SOURCE_ID } from "../api.js";
import { T, statusLabel, statusTone } from "../i18n.js";

export function read<T>(runtime: ExtensionRuntime, path: string, query?: Record<string, string | number | undefined>, signal?: AbortSignal): Promise<ExtensionResult<T>> {
  return runtime.readData<T>(DATA_PROVIDER_ID, { path, query }, { signal });
}

export function act<T = unknown>(runtime: ExtensionRuntime, name: string, input?: unknown): Promise<ExtensionResult<T>> {
  return runtime.invokeAction<T>(ACTION_PROVIDER_ID, name, input);
}

/** Runs a write, shows the server's message on failure, optionally confirms first, and reports success. */
export async function perform<T = unknown>(
  runtime: ExtensionRuntime,
  name: string,
  input: unknown,
  options: { confirm?: { title: string; message: string; label?: string }; success?: string } = {},
): Promise<ExtensionResult<T>> {
  if (options.confirm) {
    const ok = await confirmDialog({ title: options.confirm.title, message: options.confirm.message, confirmLabel: options.confirm.label ?? T.delete, destructive: true });
    if (!ok) {
      return { ok: false, error: { code: "cancelled", message: "cancelled" } };
    }
  }
  const result = await act<T>(runtime, name, input);
  if (!result.ok) {
    toast(result.error.message, "bad", 7000);
  } else if (options.success) {
    toast(options.success, "good");
  }
  return result;
}

/**
 * Calls `refresh` (debounced) when the server reports changes under any of `topics`, and after every
 * reconnect (resync). This is what keeps a page that stays open from showing stale data.
 *
 * Pass `host` for pages that contain forms: a refresh that arrives while the person is typing in one of
 * them is held back until the field loses focus, so an incoming event never wipes half-typed input.
 */
export function liveRefresh(runtime: ExtensionRuntime, disposer: Disposer, topics: string[], refresh: () => void, waitMs = 250, host?: HTMLElement): void {
  let held = false;
  /** Somebody is in the middle of using a form here: typing in a field, or about to press its button. */
  const busy = (): boolean => {
    const active = document.activeElement;
    if (!host || !active || !host.contains(active)) {
      return false;
    }
    return /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName) || (active.tagName === "BUTTON" && active.closest("form") !== null);
  };
  const run = (): void => {
    if (busy()) {
      held = true;
      return;
    }
    held = false;
    refresh();
  };
  const debounced = debounce(run, waitMs);
  disposer.add(() => debounced.cancel());
  if (host) {
    const onFocusOut = (event: FocusEvent): void => {
      // moving to another control of the same page is still "using the form": wait until focus really leaves
      if (!held || (event.relatedTarget instanceof Node && host.contains(event.relatedTarget))) {
        return;
      }
      window.setTimeout(() => {
        if (held && !busy()) {
          run();
        }
      }, 150);
    };
    host.addEventListener("focusout", onFocusOut);
    disposer.add(() => host.removeEventListener("focusout", onFocusOut));
  }
  // Every subscription also receives the source's "resync" message after a reconnect, so no "*" is needed here
  // (subscribing to "*" would fire on *every* change, defeating the topic filter).
  for (const topic of topics) {
    disposer.add(runtime.subscribe(EVENTS_SOURCE_ID, topic, () => debounced()));
  }
}

/** Runs `rebuild` (which replaces the children of `container`) without losing keyboard focus on a `data-key` control. */
export function keepFocus(container: HTMLElement, rebuild: () => void): void {
  const key = document.activeElement instanceof HTMLElement && container.contains(document.activeElement) ? document.activeElement.dataset.key : undefined;
  rebuild();
  if (key) {
    container.querySelector<HTMLElement>(`[data-key="${CSS.escape(key)}"]`)?.focus();
  }
}

export function view(disposer: Disposer, extra?: () => void): MountedView {
  return {
    dispose() {
      extra?.();
      disposer.dispose();
    },
  };
}

export function card(title: Child, body: Child, actions?: Child): HTMLElement {
  return h("section", { class: "ks-card" }, h("header", null, h("h2", null, title), actions ?? null), body);
}

export function statusBadge(status: string): HTMLElement {
  return badge(statusLabel(status), statusTone(status));
}

export function errorText(error: ExtensionError): string {
  return error.message || error.code;
}

export function listItem(main: Child, sub?: Child, actions?: Child, className = ""): HTMLLIElement {
  return h("li", { class: className }, h("div", { class: "ks-grow" }, h("div", { class: "ks-title" }, main), sub ? h("div", { class: "ks-sub" }, sub) : null), actions ?? null);
}

export function smallButton(label: string, onClick: () => void, variant: "secondary" | "danger" | "primary" | "ghost" = "secondary", title?: string): HTMLButtonElement {
  const el = button(label, { variant, onClick, title });
  el.classList.add("ks-btn-sm");
  return el;
}

export function pageHead(title: string, ...actions: Child[]): HTMLElement {
  return h("div", { class: "ks-row ks-row-spread dv-head" }, h("h2", { class: "dv-page-title" }, title), h("div", { class: "ks-row" }, actions));
}

export function pathText(path: string[]): string {
  return path.join(" → ");
}

export function emptyLine(text = T.empty): HTMLElement {
  return h("p", { class: "ks-muted" }, text);
}

export function formDialog(
  title: string,
  fields: FieldOptions[],
  submit: (values: Record<string, string | boolean>) => Promise<ExtensionResult<unknown>>,
  options: { submitLabel?: string; note?: Child } = {},
): Promise<boolean> {
  const dialog = openDialog(title, (close) => {
    const f = form(fields, {
      submitLabel: options.submitLabel ?? T.save,
      extraActions: [button(T.cancel, { onClick: () => close(false) })],
      onSubmit: async (values, handle) => {
        const result = await submit(values);
        if (result.ok) {
          close(true);
        } else {
          handle.showErrors(result.error);
        }
      },
    });
    return h("div", null, options.note ?? null, f.el);
  });
  return dialog.closed.then((value) => value === true);
}

/** `ключ: значение` per line ⇄ record; what a person can type in a textarea without knowing JSON. */
export function parseProperties(text: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of text.split(/\r?\n/)) {
    const index = line.indexOf(":");
    const key = (index >= 0 ? line.slice(0, index) : line).trim();
    const value = index >= 0 ? line.slice(index + 1).trim() : "";
    if (key) {
      result[key] = value;
    }
  }
  return result;
}

export function formatProperties(properties: Record<string, string> | null | undefined): string {
  return Object.entries(properties ?? {}).map(([k, v]) => `${k}: ${v}`).join("\n");
}

export function parsePath(text: string): string[] {
  return text.split(/→|->|>|\//).map((part) => part.trim()).filter(Boolean);
}

export function toNumber(value: string | boolean | undefined): number | null {
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }
  const n = Number(value.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

/** Loads two resources as one result: the first failure wins. */
export async function both<A, B>(a: Promise<ExtensionResult<A>>, b: Promise<ExtensionResult<B>>): Promise<ExtensionResult<[A, B]>> {
  const [ra, rb] = await Promise.all([a, b]);
  if (!ra.ok) {
    return ra;
  }
  if (!rb.ok) {
    return rb;
  }
  return { ok: true, data: [ra.data, rb.data] };
}
