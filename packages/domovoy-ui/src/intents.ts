/**
 * What a person needs to see (and fix) in a proposed command. The server re-validates everything it receives;
 * this table only decides which fields are shown and how they are edited.
 */
export type FieldKind = "str" | "num" | "bool" | "list" | "path" | "iso" | "enum" | "json";

export interface IntentField {
  name: string;
  label: string;
  kind: FieldKind;
  options?: string[];
}

export interface IntentSpec {
  title: string;
  fields: IntentField[];
}

const CHANNELS = ["ui", "telegram", "speak", "ha_notify"];
const LISTS = ["tasks", "shopping", "chores"];

export const INTENT_SPECS: Record<string, IntentSpec> = {
  add_item: { title: "Запомнить вещь", fields: [{ name: "name", label: "Название", kind: "str" }, { name: "quantity", label: "Количество", kind: "num" }, { name: "unit", label: "Ед.", kind: "str" }, { name: "location_path", label: "Место (через →)", kind: "path" }, { name: "notes", label: "Заметки", kind: "str" }, { name: "mode", label: "Количество", kind: "enum", options: ["set", "add"] }] },
  place_item: { title: "Положить вещь", fields: [{ name: "name", label: "Название", kind: "str" }, { name: "quantity", label: "Количество", kind: "num" }, { name: "unit", label: "Ед.", kind: "str" }, { name: "location_path", label: "Место (через →)", kind: "path" }] },
  move_item: { title: "Переместить вещь", fields: [{ name: "name", label: "Название", kind: "str" }, { name: "location_path", label: "Новое место (через →)", kind: "path" }, { name: "use_last", label: "Последнюю упомянутую", kind: "bool" }] },
  consume_item: { title: "Списать", fields: [{ name: "name", label: "Название", kind: "str" }, { name: "quantity", label: "Сколько", kind: "num" }, { name: "use_last", label: "Последнюю упомянутую", kind: "bool" }] },
  set_quantity: { title: "Исправить количество", fields: [{ name: "name", label: "Название", kind: "str" }, { name: "quantity", label: "Количество", kind: "num" }, { name: "unit", label: "Ед.", kind: "str" }, { name: "use_last", label: "Последнюю упомянутую", kind: "bool" }] },
  remove_item: { title: "Удалить вещь", fields: [{ name: "name", label: "Название", kind: "str" }, { name: "use_last", label: "Последнюю упомянутую", kind: "bool" }] },
  use_item: { title: "Отметить использование", fields: [{ name: "name", label: "Название", kind: "str" }] },
  find_item: { title: "Найти вещь", fields: [{ name: "query", label: "Что ищем", kind: "str" }] },
  list_location: { title: "Что лежит в месте", fields: [{ name: "location_path", label: "Место (через →)", kind: "path" }] },
  add_note: { title: "Заметка", fields: [{ name: "title", label: "Заголовок", kind: "str" }, { name: "text", label: "Текст", kind: "str" }] },
  query_memory: { title: "Вспомнить", fields: [{ name: "query", label: "Запрос", kind: "str" }] },
  create_reminder: { title: "Напоминание", fields: [{ name: "text", label: "О чём", kind: "str" }, { name: "when", label: "Когда", kind: "iso" }, { name: "channel", label: "Как", kind: "enum", options: CHANNELS }, { name: "recipient", label: "Кому", kind: "str" }, { name: "trigger", label: "Условие", kind: "json" }, { name: "recurrence", label: "Повтор", kind: "json" }] },
  create_event: { title: "Событие в календаре", fields: [{ name: "title", label: "Название", kind: "str" }, { name: "start", label: "Начало", kind: "iso" }, { name: "end", label: "Конец", kind: "iso" }, { name: "location", label: "Где", kind: "str" }] },
  update_event: { title: "Перенести/изменить событие", fields: [{ name: "title", label: "Какое событие", kind: "str" }, { name: "new_title", label: "Новое название", kind: "str" }, { name: "new_start", label: "Новое начало", kind: "iso" }, { name: "new_end", label: "Новый конец", kind: "iso" }] },
  delete_event: { title: "Удалить событие", fields: [{ name: "title", label: "Какое событие", kind: "str" }] },
  query_calendar: { title: "Что в календаре", fields: [{ name: "start", label: "С", kind: "iso" }, { name: "end", label: "По", kind: "iso" }] },
  send_message: { title: "Сообщение", fields: [{ name: "recipient", label: "Кому", kind: "str" }, { name: "text", label: "Текст", kind: "str" }, { name: "channel", label: "Как", kind: "enum", options: CHANNELS }, { name: "when", label: "Когда", kind: "iso" }] },
  add_task: { title: "Задача", fields: [{ name: "title", label: "Название", kind: "str" }, { name: "list", label: "Список", kind: "enum", options: LISTS }, { name: "due_date", label: "Срок (ГГГГ-ММ-ДД)", kind: "str" }] },
  add_shopping: { title: "В список покупок", fields: [{ name: "items", label: "Что купить (через запятую)", kind: "list" }] },
  complete_task: { title: "Отметить задачу", fields: [{ name: "title", label: "Какая", kind: "str" }, { name: "list", label: "Список", kind: "enum", options: LISTS }] },
  query_tasks: { title: "Показать задачи", fields: [{ name: "list", label: "Список", kind: "enum", options: LISTS }] },
  ha_control: { title: "Управление домом", fields: [{ name: "service", label: "Сервис", kind: "str" }, { name: "entity_hint", label: "Устройство", kind: "str" }, { name: "entity_id", label: "entity_id", kind: "str" }, { name: "data", label: "Параметры", kind: "json" }] },
  ha_query: { title: "Состояние устройства", fields: [{ name: "entity_hint", label: "Устройство", kind: "str" }, { name: "entity_id", label: "entity_id", kind: "str" }] },
  clarify: { title: "Вопрос", fields: [{ name: "question", label: "Вопрос", kind: "str" }] },
  undo: { title: "Отмена последнего", fields: [] },
  help: { title: "Справка", fields: [] },
};

export function intentTitle(type: string): string {
  return INTENT_SPECS[type]?.title ?? type;
}

export function fieldText(field: IntentField, value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }
  if (field.kind === "path") {
    return Array.isArray(value) ? value.join(" → ") : String(value);
  }
  if (field.kind === "list") {
    return Array.isArray(value) ? value.join(", ") : String(value);
  }
  if (field.kind === "json") {
    return JSON.stringify(value);
  }
  if (field.kind === "bool") {
    return value ? "да" : "нет";
  }
  return String(value);
}

/** One line for humans: «Запомнить вещь — Название: резистор 10 кОм, Количество: 9, Место: Нижний шкаф → Коробка 3». */
export function describeIntent(intent: Record<string, unknown>, formatIso: (iso: string) => string = (s) => s): string {
  const spec = INTENT_SPECS[String(intent.type)];
  if (!spec) {
    return String(intent.type);
  }
  const parts = spec.fields
    .filter((f) => intent[f.name] !== undefined && intent[f.name] !== null && intent[f.name] !== "" && intent[f.name] !== false)
    .map((f) => `${f.label.replace(/ \(.*\)$/, "")}: ${f.kind === "iso" ? formatIso(String(intent[f.name])) : fieldText(f, intent[f.name])}`);
  return parts.length ? `${spec.title} — ${parts.join("; ")}` : spec.title;
}

/** Rebuilds an intent from edited form text, keeping every field the form does not show (confidence, evidence, ...). */
export function applyEdits(original: Record<string, unknown>, edits: Record<string, string | boolean>, toIso: (local: string) => string): Record<string, unknown> {
  const spec = INTENT_SPECS[String(original.type)];
  const result: Record<string, unknown> = { ...original };
  for (const field of spec?.fields ?? []) {
    if (!(field.name in edits) || field.kind === "json") {
      continue;
    }
    const raw = edits[field.name];
    if (field.kind === "bool") {
      if (raw === true) {
        result[field.name] = true;
      } else {
        delete result[field.name];
      }
      continue;
    }
    const text = String(raw).trim();
    if (!text) {
      delete result[field.name];
    } else if (field.kind === "num") {
      const n = Number(text.replace(",", "."));
      result[field.name] = Number.isFinite(n) ? n : text;
    } else if (field.kind === "path") {
      result[field.name] = text.split(/→|->|>/).map((p) => p.trim()).filter(Boolean);
    } else if (field.kind === "list") {
      result[field.name] = text.split(",").map((p) => p.trim()).filter(Boolean);
    } else if (field.kind === "iso") {
      result[field.name] = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(text) ? toIso(text) : text;
    } else {
      result[field.name] = text;
    }
  }
  return result;
}
