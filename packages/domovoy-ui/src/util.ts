/** Time helpers. The household's timezone is the *server's*, not necessarily the browser's. */

let serverTimezone = "";

export function setServerTimezone(tz: string): void {
  serverTimezone = tz;
}

export function timezone(): string {
  return serverTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function partsIn(date: Date, tz: string): Record<string, string> {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  return Object.fromEntries(formatter.formatToParts(date).map((p) => [p.type, p.value]));
}

/** `2026-10-08T18:30` typed by the user, interpreted in `tz`, as a UTC ISO string. */
export function zonedToIso(local: string, tz = timezone()): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(local);
  if (!m) {
    throw new Error(`Invalid local time: ${local}`);
  }
  const [y, mo, d, h, mi] = m.slice(1).map(Number);
  const asUtc = Date.UTC(y, mo - 1, d, h, mi);
  let guess = asUtc;
  for (let i = 0; i < 2; i += 1) {
    const p = partsIn(new Date(guess), tz);
    const shown = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute));
    guess += asUtc - shown;
  }
  return new Date(guess).toISOString().replace(/\.\d{3}Z$/, "Z");
}

/** UTC ISO → `YYYY-MM-DDTHH:mm` in `tz`, for `<input type="datetime-local">`. */
export function isoToLocalInput(iso: string, tz = timezone()): string {
  const p = partsIn(new Date(iso), tz);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

export function isoToDateInput(iso: string, tz = timezone()): string {
  return isoToLocalInput(iso, tz).slice(0, 10);
}

export function formatDateTime(iso: string | null | undefined, tz = timezone()): string {
  if (!iso) {
    return "—";
  }
  return new Intl.DateTimeFormat("ru-RU", { timeZone: tz, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

export function formatTime(iso: string, tz = timezone()): string {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: tz, hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

export function formatDay(iso: string, tz = timezone()): string {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: tz, weekday: "long", day: "numeric", month: "long" }).format(new Date(iso));
}

export function dayKey(iso: string, tz = timezone()): string {
  return isoToLocalInput(iso, tz).slice(0, 10);
}

export function relative(iso: string, now = Date.now()): string {
  const diff = new Date(iso).getTime() - now;
  const abs = Math.abs(diff);
  const minutes = Math.round(abs / 60_000);
  const text = minutes < 1 ? "сейчас" : minutes < 60 ? `${minutes} мин` : minutes < 48 * 60 ? `${Math.round(minutes / 60)} ч` : `${Math.round(minutes / 1440)} дн`;
  return minutes < 1 ? text : diff < 0 ? `${text} назад` : `через ${text}`;
}

export function describeTrigger(trigger: Record<string, any> | null): string {
  if (!trigger) {
    return "";
  }
  const window = trigger.window ? ` (${trigger.window.from}–${trigger.window.to})` : "";
  if (trigger.type === "presence") {
    return `когда буду дома${window}`;
  }
  if (trigger.type === "room") {
    return `когда зайду: ${trigger.place}${window}`;
  }
  if (trigger.type === "state") {
    return `когда ${trigger.entity_id} ${trigger.from ? `перестанет быть «${trigger.from}»` : `станет «${trigger.to}»`}`;
  }
  return "по условию";
}

export function describeRecurrence(rule: Record<string, any> | null): string {
  if (!rule) {
    return "";
  }
  const names = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const every = rule.interval > 1 ? `каждые ${rule.interval} ` : "каждый ";
  if (rule.freq === "weekly" && rule.byweekday?.length) {
    return `по ${rule.byweekday.map((d: number) => names[d]).join(", ")}`;
  }
  return { daily: `${every}день`, weekly: `${every}неделю`, monthly: `${every}месяц`, yearly: `${every}год` }[rule.freq as string] ?? "повторяется";
}

export function fmtQuantity(quantity: number | null | undefined, unit = ""): string {
  if (quantity === null || quantity === undefined) {
    return "";
  }
  const number = Number.isInteger(quantity) ? String(quantity) : String(Math.round(quantity * 1000) / 1000);
  return `${number} ${unit}`.trim();
}
