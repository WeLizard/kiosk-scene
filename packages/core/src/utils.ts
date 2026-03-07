export function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function trimText(value: unknown, maxLength = 160): string {
  const normalized = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!normalized) {
    return "";
  }
  if (normalized.length <= maxLength) {
    return normalized;
  }
  return `${normalized.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

export function parseIsoTime(value: unknown): number {
  const date = new Date(String(value ?? ""));
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

export function deepMergeObject<T>(base: T, override: unknown): T {
  if (!isObjectRecord(base) || !isObjectRecord(override)) {
    return ((override ?? base) as T);
  }
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (Array.isArray(value)) {
      result[key] = value.slice();
      continue;
    }
    if (isObjectRecord(value) && isObjectRecord(result[key])) {
      result[key] = deepMergeObject(result[key] as Record<string, unknown>, value);
      continue;
    }
    result[key] = value;
  }
  return result as T;
}

export function normalizeStringList(value: unknown, maxLength = 40): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => trimText(item, maxLength).toLowerCase())
    .filter(Boolean);
}

