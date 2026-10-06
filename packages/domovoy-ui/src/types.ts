export interface Location {
  id: number;
  parent_id: number | null;
  name: string;
  kind: string;
  notes: string;
  path: string[];
  item_count: number;
}

export interface LocationNode extends Location {
  children: LocationNode[];
}

export interface Item {
  id: number;
  name: string;
  quantity: number | null;
  unit: string;
  quantity_text: string;
  location_id: number | null;
  location_path: string[];
  location_text: string;
  category: string;
  properties: Record<string, string>;
  notes: string;
  source: string;
  updated_at: string;
  last_used_at: string | null;
}

export interface Note {
  id: number;
  title: string;
  body: string;
  tags: string[];
  updated_at: string;
}

export interface Task {
  id: number;
  title: string;
  list: "tasks" | "shopping" | "chores";
  notes: string;
  due_date: string | null;
  recurrence: Record<string, unknown> | null;
  done: boolean;
  done_at: string | null;
}

export interface Reminder {
  id: number;
  text: string;
  kind: "time" | "context";
  due_at: string | null;
  trigger: Record<string, unknown> | null;
  recurrence: Record<string, unknown> | null;
  state: "pending" | "fired" | "done" | "cancelled";
  channel: string;
  recipient: string;
  fired_at: string | null;
}

export interface CalEvent {
  id: string;
  calendar: string;
  ref: string;
  title: string;
  start: string;
  end: string;
  all_day: boolean;
  location: string;
  notes: string;
  recurring: boolean;
  read_only: boolean;
}

export interface CommandRecord {
  id: number;
  ts: string;
  frontend: string;
  text: string;
  interpreter: string | null;
  status: string;
  confidence: number | null;
  reply: string | null;
  error: string | null;
  intents: Array<Record<string, unknown>> | null;
}

export interface CommandReply {
  status: string;
  reply: string;
  command_id: number | null;
  options?: string[];
  questions?: string[];
  undoable?: boolean;
  results: Array<{ ok: boolean; message: string; review_id?: number; retryable?: boolean }>;
  interpreter?: string | null;
  confidence?: number | null;
}

export interface ReviewItem {
  id: number;
  command_id: number | null;
  command_text?: string | null;
  ts: string;
  proposal: Array<Record<string, unknown>>;
  reason: string;
  confidence: number | null;
  status: string;
}

export interface AuditRow {
  id: number;
  ts: string;
  actor: string;
  source: string;
  entity_type: string;
  entity_id: number | null;
  action: string;
  summary: string;
  undoable: boolean;
  command_id: number | null;
}

export interface OutboxRow {
  id: number;
  channel: string;
  recipient: string;
  text: string;
  status: string;
  attempts: number;
  last_error: string | null;
  created_at: string;
  sent_at: string | null;
}

export interface Contact {
  id: number;
  name: string;
  aliases: string[];
  channels: Record<string, { chat_id?: string; service?: string } | undefined>;
  is_self: boolean;
}

export interface Integration {
  name: string;
  status: string;
  detail: string;
  last_ok: string | null;
  last_error: string | null;
  configured: boolean;
}

export interface SearchHit {
  kind: "item" | "location" | "note" | "task" | "event";
  id: number;
  title: string;
  snippet: string;
  score: number;
  matched_by: string[];
}

export interface TodayPayload {
  now: string;
  timezone: string;
  events: CalEvent[];
  warnings: Array<{ source: string; message: string }>;
  reminders: Reminder[];
  tasks: Task[];
  shopping: Task[];
  review_count: number;
  recent: CommandRecord[];
  outbox: Record<string, number>;
}

export type Settings = Record<string, any>;
