import { trimText } from "./utils.js";

export interface ParsedCueDirectives {
  text: string;
  emotion: string;
  activity: string;
  cue: string;
  motion: string;
}

export function parseCueDirectives(value: unknown, maxTextLength = 220): ParsedCueDirectives {
  const baseText = trimText(value, Math.max(maxTextLength + 20, maxTextLength));
  const found = {
    emotion: "",
    activity: "",
    cue: "",
    motion: "",
  };

  const cleaned = baseText.replace(/\[(emotion|activity|cue|motion)\s*:\s*([a-z0-9_-]+)\]/gi, (_, kind, cue) => {
    const normalizedKind = trimText(kind, 16).toLowerCase();
    const normalizedCue = trimText(cue, 32).toLowerCase();
    if (
      (
        normalizedKind === "emotion"
        || normalizedKind === "activity"
        || normalizedKind === "cue"
        || normalizedKind === "motion"
      )
      && normalizedCue
    ) {
      found[normalizedKind as keyof typeof found] = normalizedCue;
    }
    return " ";
  });

  return {
    text: trimText(cleaned, maxTextLength),
    emotion: found.emotion,
    activity: found.activity,
    cue: found.cue,
    motion: found.motion,
  };
}
