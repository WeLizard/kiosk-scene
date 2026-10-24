export interface FocusSnapshot {
  id: string;
  selectionStart: number | null;
  selectionEnd: number | null;
  scrollTop: number;
  pageScrollY: number;
}

/**
 * A full re-render replaces the dashboard's DOM. Capture the focused control's identity, caret and scroll
 * before that, so a text field is not destroyed after the first keystroke.
 */
export function captureFocusState(host: HTMLElement): FocusSnapshot {
  const active = document.activeElement;
  const focused = active instanceof HTMLInputElement
    || active instanceof HTMLTextAreaElement
    || active instanceof HTMLSelectElement
    ? active
    : null;
  let selectionStart: number | null = null;
  let selectionEnd: number | null = null;
  if (focused instanceof HTMLInputElement || focused instanceof HTMLTextAreaElement) {
    try {
      selectionStart = focused.selectionStart;
      selectionEnd = focused.selectionEnd;
    } catch {
      // Input types such as number do not expose a text selection.
    }
  }
  return {
    id: focused && host.contains(focused) ? focused.id : "",
    selectionStart,
    selectionEnd,
    scrollTop: host.scrollTop,
    pageScrollY: window.scrollY,
  };
}

export function restoreFocusState(host: HTMLElement, snapshot: FocusSnapshot): void {
  if (snapshot.id) {
    const selector = typeof CSS !== "undefined" && typeof CSS.escape === "function"
      ? `#${CSS.escape(snapshot.id)}`
      : `#${snapshot.id}`;
    const next = host.querySelector<HTMLElement>(selector);
    if (next) {
      next.focus({ preventScroll: true });
      if (snapshot.selectionStart !== null && (next instanceof HTMLInputElement || next instanceof HTMLTextAreaElement)) {
        try {
          next.setSelectionRange(snapshot.selectionStart, snapshot.selectionEnd ?? snapshot.selectionStart);
        } catch {
          // Number inputs reject setSelectionRange; focus is still restored.
        }
      }
    }
  }
  host.scrollTop = snapshot.scrollTop;
  window.scrollTo(0, snapshot.pageScrollY);
}
