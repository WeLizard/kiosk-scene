import type { StateV1 } from "./contracts.js";
import { trimText } from "./utils.js";

export function nextIdleDelayMs(minMs = 28_000, jitterMs = 52_000): number {
  return minMs + Math.floor(Math.random() * jitterMs);
}

export function pickIdleLine(lines: string[], lastIndex = -1): { line: string; index: number } {
  const normalizedLines = Array.isArray(lines)
    ? lines.map((item) => trimText(item, 220)).filter(Boolean)
    : [];

  if (!normalizedLines.length) {
    return {
      line: "Waiting for input.",
      index: -1,
    };
  }

  let index = Math.floor(Math.random() * normalizedLines.length);
  if (normalizedLines.length > 1 && index === lastIndex) {
    index = (index + 1) % normalizedLines.length;
  }

  return {
    line: normalizedLines[index],
    index,
  };
}

export function shouldShowIdleMonologue(state: StateV1 | null | undefined): boolean {
  const online = !(state?.online === false);
  const busy = Boolean(state?.busy);
  const hasMessage = Boolean(trimText(state?.message, 180));
  return online && !busy && !hasMessage;
}

