import type { ExtensionError, ExtensionResult } from "@kiosk-scene/core";
import { Disposer, h, replaceChildren, type Child } from "./dom.js";

export type Tone = "neutral" | "good" | "warn" | "bad" | "info";

/** Built-in labels; an extension whose users read another language replaces them once with `setUiStrings`. */
export interface UiStrings {
  retry: string;
  cancel: string;
  confirm: string;
  save: string;
  close: string;
  required: string;
  loading: string;
  nothingHere: string;
  olderData: string;
  renderFailed: string;
}

const DEFAULT_STRINGS: UiStrings = {
  retry: "Retry",
  cancel: "Cancel",
  confirm: "Confirm",
  save: "Save",
  close: "Close",
  required: "Required",
  loading: "Loading…",
  nothingHere: "Nothing here yet",
  olderData: "Showing older data",
  renderFailed: "This view could not be displayed.",
};

let strings: UiStrings = { ...DEFAULT_STRINGS };

export function setUiStrings(patch: Partial<UiStrings>): void {
  strings = { ...strings, ...patch };
}

export function uiStrings(): UiStrings {
  return strings;
}
export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

export interface ButtonOptions {
  variant?: ButtonVariant;
  type?: "button" | "submit";
  disabled?: boolean;
  title?: string;
  onClick?: (event: MouseEvent) => void;
}

export function button(label: Child, options: ButtonOptions = {}): HTMLButtonElement {
  return h(
    "button",
    {
      class: `ks-btn ks-btn-${options.variant ?? "secondary"}`,
      type: options.type ?? "button",
      disabled: options.disabled,
      title: options.title,
      onClick: options.onClick,
    },
    label,
  );
}

export function badge(text: Child, tone: Tone = "neutral"): HTMLSpanElement {
  return h("span", { class: `ks-badge ks-badge-${tone}` }, text);
}

export function emptyState(title: string, hint?: string, action?: HTMLElement): HTMLElement {
  return h("div", { class: "ks-empty" }, h("strong", null, title), hint ? h("p", null, hint) : null, action);
}

export function spinner(label: string = strings.loading): HTMLElement {
  return h("div", { class: "ks-loading", role: "status", aria: { live: "polite" } }, h("span", { class: "ks-spinner", aria: { hidden: true } }), label);
}

export function errorState(error: ExtensionError, onRetry?: () => void): HTMLElement {
  return h(
    "div",
    { class: "ks-error", role: "alert" },
    h("strong", null, error.message),
    error.code ? h("small", null, error.code) : null,
    onRetry && error.retryable !== false ? button(strings.retry, { onClick: onRetry }) : null,
  );
}

export interface FieldOptions {
  name: string;
  label: string;
  type?: "text" | "number" | "date" | "time" | "datetime-local" | "email" | "password" | "url" | "textarea" | "select" | "checkbox";
  value?: string | number | boolean | null;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  options?: Array<{ value: string; label: string }>;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  rows?: number;
  autocomplete?: string;
  wide?: boolean;
}

export interface FieldHandle {
  el: HTMLElement;
  input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  name: string;
  value(): string | boolean;
  setError(message: string | null): void;
}

let fieldCounter = 0;

export function field(options: FieldOptions): FieldHandle {
  const id = `ks-field-${(fieldCounter += 1)}`;
  const type = options.type ?? "text";
  let input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  if (type === "textarea") {
    input = h("textarea", { id, name: options.name, rows: options.rows ?? 3, placeholder: options.placeholder, required: options.required, value: String(options.value ?? "") });
  } else if (type === "select") {
    const select = h(
      "select",
      { id, name: options.name, required: options.required },
      (options.options ?? []).map((item) => h("option", { value: item.value, selected: String(options.value ?? "") === item.value }, item.label)),
    );
    select.value = String(options.value ?? options.options?.[0]?.value ?? "");
    input = select;
  } else if (type === "checkbox") {
    input = h("input", { id, name: options.name, type: "checkbox", checked: options.value === true });
  } else {
    input = h("input", {
      id,
      name: options.name,
      type,
      value: options.value === null || options.value === undefined ? "" : String(options.value),
      placeholder: options.placeholder,
      required: options.required,
      min: options.min,
      max: options.max,
      step: options.step,
      autocomplete: options.autocomplete ?? "off",
    });
  }
  const errorEl = h("small", { class: "ks-field-error", id: `${id}-error`, role: "alert" });
  const label = h("label", { for: id }, options.label, options.required ? h("span", { class: "ks-required", aria: { hidden: true } }, " *") : null);
  const el = h(
    "div",
    { class: `ks-field${type === "checkbox" ? " ks-field-check" : ""}${options.wide ? " ks-field-wide" : ""}` },
    type === "checkbox" ? [input, label] : [label, input],
    options.hint ? h("small", { class: "ks-field-hint" }, options.hint) : null,
    errorEl,
  );
  return {
    el,
    input,
    name: options.name,
    value: () => (type === "checkbox" ? (input as HTMLInputElement).checked : input.value),
    setError(message) {
      errorEl.textContent = message ?? "";
      el.classList.toggle("has-error", Boolean(message));
      if (message) {
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", errorEl.id);
      } else {
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
      }
    },
  };
}

export interface FormHandle {
  el: HTMLFormElement;
  fields: Record<string, FieldHandle>;
  values(): Record<string, string | boolean>;
  showErrors(error: ExtensionError | null): void;
  setBusy(busy: boolean): void;
}

export function form(
  fields: FieldOptions[],
  options: {
    submitLabel?: string;
    onSubmit: (values: Record<string, string | boolean>, handle: FormHandle) => void | Promise<void>;
    extraActions?: HTMLElement[];
  },
): FormHandle {
  const handles = Object.fromEntries(fields.map((item) => [item.name, field(item)])) as Record<string, FieldHandle>;
  const banner = h("div", { class: "ks-form-error", role: "alert", hidden: true });
  const submit = button(options.submitLabel ?? strings.save, { variant: "primary", type: "submit" });
  const el = h("form", { class: "ks-form", novalidate: true }, banner, h("div", { class: "ks-form-grid" }, Object.values(handles).map((item) => item.el)), h("div", { class: "ks-form-actions" }, submit, options.extraActions));
  const handle: FormHandle = {
    el,
    fields: handles,
    values: () => Object.fromEntries(Object.values(handles).map((item) => [item.name, item.value()])),
    showErrors(error) {
      for (const item of Object.values(handles)) {
        item.setError(error?.fields?.[item.name] ?? null);
      }
      const generic = error && (!error.fields || Object.keys(error.fields).length === 0) ? error.message : "";
      banner.textContent = generic;
      banner.hidden = !generic;
    },
    setBusy(busy) {
      submit.disabled = busy;
      el.toggleAttribute("aria-busy", busy);
    },
  };
  el.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;
    for (const item of fields) {
      const value = handles[item.name].value();
      if (item.required && (value === "" || value === false)) {
        handles[item.name].setError(strings.required);
        valid = false;
      } else {
        handles[item.name].setError(null);
      }
    }
    if (!valid) {
      return;
    }
    handle.showErrors(null);
    handle.setBusy(true);
    Promise.resolve(options.onSubmit(handle.values(), handle)).finally(() => handle.setBusy(false));
  });
  return handle;
}

export interface Column<T> {
  key: string;
  header: string;
  render(row: T): Child;
  className?: string;
}

export function table<T>(columns: Column<T>[], rows: T[], empty?: HTMLElement): HTMLElement {
  if (!rows.length) {
    return empty ?? emptyState(strings.nothingHere);
  }
  return h(
    "div",
    { class: "ks-table-wrap" },
    h(
      "table",
      { class: "ks-table" },
      h("thead", null, h("tr", null, columns.map((column) => h("th", { scope: "col", class: column.className }, column.header)))),
      h("tbody", null, rows.map((row) => h("tr", null, columns.map((column) => h("td", { class: column.className, dataset: { label: column.header } }, column.render(row)))))),
    ),
  );
}

/** Open dialogs, oldest first: a confirmation inside another dialog must be the only one Escape closes. */
const dialogStack: HTMLElement[] = [];

export interface DialogHandle {
  el: HTMLElement;
  close(result?: unknown): void;
  closed: Promise<unknown>;
}

/** Modal with focus trap, Escape to close and focus restoration. */
export function openDialog(title: string, body: HTMLElement | ((close: (result?: unknown) => void) => HTMLElement)): DialogHandle {
  const previouslyFocused = document.activeElement as HTMLElement | null;
  let resolveClosed: (value: unknown) => void = () => undefined;
  const closed = new Promise<unknown>((resolve) => {
    resolveClosed = resolve;
  });
  const disposer = new Disposer();
  const close = (result?: unknown): void => {
    if (disposer.isDisposed) {
      return;
    }
    disposer.dispose();
    const at = dialogStack.indexOf(overlay);
    if (at >= 0) {
      dialogStack.splice(at, 1);
    }
    overlay.remove();
    previouslyFocused?.focus?.();
    resolveClosed(result);
  };
  const content = typeof body === "function" ? body(close) : body;
  const titleId = `ks-dialog-title-${(fieldCounter += 1)}`;
  const panel = h(
    "div",
    { class: "ks-dialog", role: "dialog", aria: { modal: true, labelledby: titleId }, tabindex: -1 },
    h("div", { class: "ks-dialog-head" }, h("h2", { id: titleId }, title), button("×", { variant: "ghost", title: strings.close, onClick: () => close(undefined) })),
    h("div", { class: "ks-dialog-body" }, content),
  );
  const overlay = h("div", { class: "ks-overlay" }, panel);
  overlay.addEventListener("mousedown", (event) => {
    if (event.target === overlay) {
      close(undefined);
    }
  });
  const onKey = (event: KeyboardEvent): void => {
    if (dialogStack[dialogStack.length - 1] !== overlay) {
      return; // a dialog opened on top of this one owns the keyboard
    }
    if (event.key === "Escape") {
      event.stopPropagation();
      close(undefined);
      return;
    }
    if (event.key === "Tab") {
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")).filter((node) => !node.hasAttribute("disabled"));
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };
  document.addEventListener("keydown", onKey, true);
  disposer.add(() => document.removeEventListener("keydown", onKey, true));
  document.body.appendChild(overlay);
  dialogStack.push(overlay);
  (panel.querySelector<HTMLElement>("input, select, textarea, button.ks-btn-primary") ?? panel).focus();
  return { el: overlay, close, closed };
}

export function confirmDialog(options: { title: string; message: string; confirmLabel?: string; destructive?: boolean }): Promise<boolean> {
  const handle = openDialog(options.title, (close) =>
    h(
      "div",
      { class: "ks-confirm" },
      h("p", null, options.message),
      h(
        "div",
        { class: "ks-form-actions" },
        button(strings.cancel, { onClick: () => close(false) }),
        button(options.confirmLabel ?? strings.confirm, { variant: options.destructive ? "danger" : "primary", onClick: () => close(true) }),
      ),
    ),
  );
  return handle.closed.then((result) => result === true);
}

let toastRegion: HTMLElement | null = null;

export function toast(message: string, tone: Tone = "neutral", timeoutMs = 4500): void {
  if (!toastRegion || !toastRegion.isConnected) {
    toastRegion = h("div", { class: "ks-toasts", role: "status", aria: { live: "polite" } });
    document.body.appendChild(toastRegion);
  }
  const item = h("div", { class: `ks-toast ks-toast-${tone}` }, message);
  toastRegion.appendChild(item);
  setTimeout(() => item.remove(), timeoutMs);
}

export interface AsyncViewOptions<T> {
  host: HTMLElement;
  load(signal: AbortSignal): Promise<ExtensionResult<T>>;
  render(data: T, refresh: () => void): Child;
  /** Keep the previously rendered data on screen while refreshing (default: true). */
  keepStale?: boolean;
}

export interface AsyncViewHandle {
  refresh(): void;
  dispose(): void;
}

/**
 * Loading/error/data lifecycle for one piece of server data.
 *
 * Guarantees the two things ad-hoc fetching gets wrong: a slow older response can never
 * overwrite a newer one (sequence check + abort), and a failed refresh keeps the last good
 * data visible with an inline error instead of blanking the view.
 */
export function asyncView<T>(options: AsyncViewOptions<T>): AsyncViewHandle {
  let sequence = 0;
  let controller: AbortController | null = null;
  let hasData = false;
  let disposed = false;
  const banner = h("div", { class: "ks-stale-banner", role: "alert", hidden: true });
  const content = h("div", { class: "ks-async-content" });
  replaceChildren(options.host, banner, content);

  const refresh = (): void => {
    if (disposed) {
      return;
    }
    controller?.abort();
    controller = new AbortController();
    const mine = (sequence += 1);
    if (!hasData || options.keepStale === false) {
      replaceChildren(content, spinner());
    }
    void options.load(controller.signal).then((result) => {
      if (disposed || mine !== sequence) {
        return;
      }
      if (result.ok) {
        try {
          const rendered = options.render(result.data, refresh);
          hasData = true;
          banner.hidden = true;
          replaceChildren(content, rendered);
        } catch (error) {
          // Unexpected data must produce a message with a retry, not an endless spinner and an unhandled rejection.
          console.error("View render failed", error);
          replaceChildren(content, errorState({ code: "render_failed", message: strings.renderFailed, retryable: true }, refresh));
        }
        return;
      }
      if (result.error.code === "aborted") {
        return;
      }
      if (hasData) {
        banner.hidden = false;
        replaceChildren(banner, `${strings.olderData} — ${result.error.message} `, button(strings.retry, { variant: "ghost", onClick: refresh }));
      } else {
        replaceChildren(content, errorState(result.error, refresh));
      }
    });
  };

  refresh();
  return {
    refresh,
    dispose() {
      disposed = true;
      controller?.abort();
    },
  };
}
