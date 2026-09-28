# Domovoy — local household assistant

Domovoy remembers where things are, keeps the household's calendar, reminders and shopping list, sends messages, and
talks through the Yandex Stations that Home Assistant already controls. It runs entirely on the Home Assistant box
(Beelink Mini S13 / Intel N150 / 16 GB is the reference target), keeps its data in one SQLite file, and works
**without any language model**: a deterministic Russian interpreter handles the phrases people actually say, and an
optional OpenAI-compatible model only fills the gaps — its output is never trusted.

It is an *extension* of KioskScene ([docs/extensions.md](./extensions.md)): the platform packages contain nothing
household-specific.

* backend: `kiosk_scene/domovoy/` (Python standard library only, port 48099, behind nginx at `/domovoy-api/`)
* UI: `packages/domovoy-ui/` → `kiosk_scene/extensions-seed/domovoy/domovoy.js`
* enable it in the add-on options (`domovoy_enabled: true`); data lives in `/config/kiosk-scene/domovoy/`

## What it does

| Area | Examples (typed, spoken, or from Telegram-style front doors) |
| --- | --- |
| Memory / inventory | «Запомни: девять резисторов 10 кОм лежат в третьей коробке нижнего шкафа» · «нет, десять» · «Где программатор, которым я пользовался вчера?» · «Что лежит в нижнем шкафу?» |
| Calendar | «Добавь в календарь стоматолога на следующий четверг в 18:30» · «Что у меня завтра?» · «Перенеси врача на пятницу» |
| Reminders | «Напомни через 20 минут выключить духовку» · «Напомни поменять фильтр, когда вечером буду дома» · «Когда я зайду в мастерскую, напомни забрать штангенциркуль» |
| Tasks / shopping | «Добавь в список покупок молоко и хлеб» · «Мне надо разобрать гараж» (goes to review: it was chatty) |
| Messages | «Отправь Ирине в Telegram, что я задержусь минут на сорок» |
| Home control | «Включи свет на кухне» — only services on an allow-list |

The admin UI has eleven sections: **Today, Search, Inventory, Locations, Calendar, Tasks & reminders, Memory,
Review queue, Activity, Integrations, Settings**. Today also runs as a kiosk page; `domovoy.today`,
`domovoy.next-event`, `domovoy.shopping` and `domovoy.command` are kiosk widgets.

## How a sentence becomes a change

```
text ─► interpreter ─► intents ─► strict validation ─► policy ─► executor ─► audit log + change feed ─► UI
        rules first;    JSON-shaped   allow-listed       confidence   one DB      before/after          long-poll
        LLM optional                  fields only        + source     transaction snapshots
```

1. **Interpreter.** Deterministic rules for Russian (numbers in words, relative dates, «в третьей коробке нижнего
   шкафа» → a path Шкаф нижний → Коробка 3, item phrases with quantity and unit). If rules are unsure *and* a model is
   configured, the model proposes intents as JSON. The model is a suggestion source, not a source of truth.
2. **Validation.** Every intent is rebuilt field by field from an allow-list (types, lengths, ranges, ISO dates).
   Unknown keys are dropped, nonsense is rejected — before anything reaches the database.
3. **Policy.**
   * rules with confidence ≥ 0.8 apply immediately;
   * 0.5–0.8 goes to the **review queue** — nothing is written until a person approves (optionally after fixing the
     fields in the UI);
   * anything a model proposed goes to review, unless the owner enabled `ai.auto_apply` *and* confidence ≥ 0.9;
   * below 0.5 the answer is "say it differently"; missing information becomes a **clarifying question** with numbered
     options that stays pending in the session for 30 minutes («второй», «в шкафу»).
4. **Executor.** Intents run in one transaction each. Every change writes an **audit** row with before/after snapshots;
   `undo` works for any of them (external effects such as a CalDAV event have their own compensating undo).
   Deletes are soft.
5. **Feed.** Each write appends to a change log; the UI's long-poll turns it into live updates.

Corrections in conversation («нет, десять», «не девять, а десять», «нет, в четвёртой коробке») refer to the last thing
that was created or mentioned in that session.

## Search

Hybrid ranking over items, places, notes, tasks and events: SQLite FTS5 (stemmed Russian tokens) + trigram fuzzy
matching (typos) + embeddings, fused with reciprocal-rank fusion. Without an embedding model the built-in hashing
embedder is used and the response says so (`mode: lexical`) — "semantic" is only claimed when a real model answered.
Things get a small prior over places, so «где резистор» finds the resistors before the box they are in.

## Reminders, contexts and delivery

* time reminders, recurrence (daily/weekly/monthly/yearly, weekdays);
* **context** reminders: when a person arrives home (with a time-of-day window), enters a room, or a device changes
  state («когда принтер закончит печать»). Triggers remember the last observed state, so a reminder fires on the
  *transition*, not on every poll;
* delivery goes through a **durable outbox**: at-least-once, retries with backoff (30 s, 2 min, 10 min, 1 h, 6 h),
  survives restarts (`sending` rows are recovered), idempotency keys prevent duplicates, and a failed voice delivery
  can fall back to Telegram or the screen. Quiet hours silence the speakers.

Channels: `speak` (Home Assistant → Yandex Station: `media_player.play_media` with type `text`, or `tts.speak`, or a
custom service — chosen per speaker in Integrations, not in code), `telegram`, `ha_notify`, `ui`.

## Integrations

Everything is optional and shown with an honest status (works / degraded / not answering / not configured) and a
"check" button on the Integrations page.

| Integration | Notes |
| --- | --- |
| Home Assistant | inside the add-on the supervisor token is used automatically; only services on the owner's allow-list can be called; `lock.*`, `alarm_control_panel.*`, `shell_command.*`, `python_script.*`, `hassio.*` and `homeassistant.stop/restart` are refused always |
| Calendar | built-in local calendar; CalDAV (read/create/update/delete, edits patch the VEVENT so attendees and alarms survive); Home Assistant calendars can be read and can receive new events. One source failing shows a warning, never an empty page |
| Telegram | bot token; people link themselves by writing to the bot, the owner attaches the chat to a contact |
| Language model | any OpenAI-compatible server (`/chat/completions`, `/embeddings`), local or cloud; not required |
| Speech to text | any OpenAI-compatible `/audio/transcriptions` server, only for the kiosk microphone |

Secrets (Telegram token, CalDAV password, HA token, LLM key) are **write-only**: the API and UI can set them and see
that they are set, never read them back; they are excluded from exports and live in `secrets.json` (mode 0600).

## Security model

* Requests through **Home Assistant ingress** or from the add-on's own host are trusted (HA already authenticated the
  person). nginx decides this and *always overwrites* the `X-Domovoy-Origin` header, so a client cannot claim it.
* **Other LAN devices** need `Authorization: Bearer <api token>`, unless their address is listed in the add-on option
  `domovoy_trusted_networks` (that is how a kiosk is allowed in without a login prompt). Failed logins are rate-limited
  per real client address.
* Every state-changing request needs the `X-Domovoy-Client` header (or a bearer token): a page on another website cannot
  add it without a CORS preflight, which the server never grants — the CSRF defence. JSON only; bodies are size-limited
  (1 MB JSON, 4 MB audio, 8 MB import).
* `/frontends/alice/<secret>` and `/frontends/assist` carry their own secrets. Keys are shown in Integrations only
  when asked for, and can be rotated.
* All user text is inserted as text nodes, never parsed as HTML.

## Reliability

* SQLite in WAL mode with migrations; consistent online backups every night (7 kept) and on demand; export/import as
  JSON (validated first, safety backup, one transaction — a bad file changes nothing).
* Providers are isolated: a dead CalDAV or Telegram degrades that feature, records the error for the status page, and
  never breaks `/api/today`. Circuit breakers stop hammering a provider that is down.
* Scheduler jobs are isolated from each other; a failing job is logged and retried on the next tick.
* Heavy local work (LLM, STT, embeddings) goes through a single-slot **resource gate**: on a fanless mini PC that also
  runs HA and a WebGL kiosk, a busy model makes callers degrade (send to review, drop the audio segment) instead of
  queueing everything behind it.
* The UI keeps the last good data on screen with a banner if a refresh fails, and recovers by itself after a restart.

## API

REST + JSON under `/domovoy-api/` (`GET /api/state`, `/api/today`, `POST /api/command`, `/api/items`, `/api/locations`,
`/api/notes`, `/api/tasks`, `/api/reminders`, `/api/calendar/*`, `/api/contacts`, `/api/review`, `/api/audit`,
`/api/outbox`, `/api/settings`, `/api/integrations`, `/api/export`, `/api/import`, `/api/backup`, `/api/voice/command`,
`GET /events` for the change feed, `GET /api/avatar/state`). Validation errors are structured:
`{ "error": { "code", "message", "fields": { "name": "Required" } } }`. The route table is in `kiosk_scene/domovoy/api.py`.

## Tests

* `kiosk_scene/tests/domovoy/` — language rules, both end-to-end slices (memory; assistant: calendar / reminders /
  messages / speak) against fake HTTP servers for Telegram, Home Assistant, CalDAV, an LLM and an STT server;
  reliability (restart, outbox, breaker, provider failure); the HTTP API's security and realtime contract.
* `kiosk_scene/tests/test_addon_wiring.py` — the shipped nginx + run.sh + Domovoy, including "a LAN device cannot claim
  to be trusted".
* `packages/domovoy-ui/test/` — every page driven against the real service (`e2e.test.ts`), plus VAD/WAV/microphone.

Run everything with `pnpm test && pnpm test:python`.

## Known limits

* Interpretation is Russian only; the rules cover common phrasings, not free conversation. Unknown sentences get an
  example, not a guess.
* "В следующий четверг" means the Thursday of the *next calendar week*; "в четверг" is the nearest one. The reply
  always states the resolved date so a misunderstanding is visible immediately.
* Recurring CalDAV events are shown (marked ↻) but read-only: change them in the calendar app. Domovoy does not edit
  what it cannot edit safely.
* A language model can only be as good as the one you point it at; Domovoy validates and queues its output but cannot
  make a weak model reliable.
