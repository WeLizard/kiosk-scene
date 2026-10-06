# Voice: Yandex Stations, Alice, and the kiosk microphone

Domovoy separates **how a sentence gets in** from **how the answer gets out**. Whatever the entrance, the sentence goes
through the same interpreter, validation and review policy ([docs/domovoy.md](./domovoy.md)).

```
 «Алиса, …»  ──►  Alice skill webhook ───────────┐
 «домовой …» ──►  HA conversation trigger ───────┼──►  Domovoy  ──►  answer: speak (Yandex Station via HA)
 kiosk mic   ──►  STT server → transcript ───────┘         │                 · Telegram / HA notification / screen
 typed       ──►  admin UI / kiosk command bar             └──►  avatar: words + mouth on the kiosk display
```

Speech recognition is **not** done by Domovoy for Alice and Home Assistant: those entrances deliver text. Only the kiosk
microphone needs a speech-to-text server.

## Answers: `speak`

Replies and reminders are spoken through the speakers configured in *Integrations → Голос через колонки*. Each speaker
says how it speaks (this is configuration, not code):

* **Яндекс Станция (текст)** — `media_player.play_media` with `media_content_type: text` on the station's
  `media_player` entity (what Yandex Station integrations for Home Assistant use for text-to-speech);
* **tts.speak** — Home Assistant TTS entity + the media player;
* **свой сервис** — any `domain.service` with `{text}` / `{entity_id}` in its data.

The speaker is chosen by where the person is: an explicit room, else the room whose presence entity is active (see
*комнаты*), else the speaker marked "по умолчанию". Quiet hours (default 23:00–07:00) silence speech; a failed
delivery falls back to Telegram or the screen (setting). "Проверить" sends a test phrase.

## Entrance 1 — Home Assistant sentence trigger («домовой …»)

Works with anything that can put a sentence into Home Assistant's conversation (the Assist pipeline, the HA app, a
voice satellite, or a Yandex Station integration that forwards recognised speech to HA).

Integrations → *Доступ, Алиса и Home Assistant* shows a ready YAML: a `rest_command` that posts to
`/frontends/assist` with the secret in `X-Domovoy-Secret`, and an automation with a `conversation` trigger
`домовой {text}`. Domovoy speaks the answer itself (`"speak": true`), so it works the same for text and voice
entrances. Endpoint: `POST /domovoy-api/frontends/assist` `{ "text", "room"?, "speak"?, "conversation_id"? }` →
`{ "reply", "status", "spoken", "response": { "speech": { "plain": { "speech": … } } } }`.

*Not verified here:* how a phrase said to a Yandex Station reaches Home Assistant depends on the integration you use.
The Domovoy side is tested end to end (secret, transcript → reply → speak through a faked HA).

## Entrance 2 — Alice skill («Алиса, …»)

A private skill in Yandex Dialogs whose webhook is `https://<your public host>/domovoy-api/frontends/alice/<secret>`
(the exact path with your secret is shown, on request, in Integrations). The skill protocol is implemented:
`ping`, welcome, follow-ups **without repeating the invocation**, «спасибо / хватит» ends the session, replies are made
TTS-friendly and bounded, and slow processing gets an honest holding reply inside Alice's response budget (2.5 s by
default). The skill can be limited to your Yandex user id (`alice.allowed_user_ids`).

Requirements you must arrange (Domovoy cannot): a **public HTTPS** address with a valid certificate that Yandex can
reach. Expose *only* that one path from your reverse proxy / tunnel — the rest of the API must stay on the LAN.

*Not verified here:* whether "Алиса, домовой" (without «запусти навык») can be made to open the skill through a Yandex
**scenario** on your account. Skills are normally opened with «Алиса, запусти навык Домовой» or «Алиса, попроси Домового
…»; a scenario with the phrase «домовой» that runs that command is the usual way to shorten it. Please try it on your
station; the webhook does not depend on how the skill was opened.

## Entrance 3 — the kiosk microphone

Add-on options: `domovoy_kiosk_mic: true`, `domovoy_kiosk_room: кухня`, and — so the kiosk needs no login —
`domovoy_trusted_networks: [<kiosk IP>]`. In *Integrations → Распознавание речи* point Domovoy at a speech-to-text
server with an OpenAI-compatible `/audio/transcriptions` endpoint, and enable *Настройки → Голос → принимать голосовые
команды с микрофона киоска*.

How it works:

1. The page listens locally. An energy-based detector calibrates on the room's steady noise for a second, then cuts
   **utterances** (start after ~120 ms of clearly louder sound, end after 0.8 s of quiet, 15 s maximum). Sound that
   never pauses (a TV, an appliance) is not sent; it raises the noise floor instead.
2. Each utterance is downsampled to 16 kHz mono WAV and posted to `/domovoy-api/api/voice/command` with the room.
3. The server transcribes it and looks for a **trigger word** («домовой» in any case, editable). Without the trigger
   — and outside the follow-up window opened by the last command in that room (20 s by default) — the transcript is
   dropped: not stored, not logged, nothing shown. Audio itself is never stored.
4. With the trigger, the sentence is interpreted; the answer is spoken by the speakers and shown on the avatar.

A small pill at the bottom-left always shows whether the microphone is listening, hearing, sending or muted, and
tapping it mutes. If the browser refuses the microphone the pill says why.

Constraints to know about:

* browsers only allow microphone access on **HTTPS or `localhost`**. A kiosk on the HA box can open
  `http://localhost:48123/scene/`; a separate kiosk device needs HTTPS in front of the add-on, or a browser flag such as
  Chromium's `--unsafely-treat-insecure-origin-as-secure=http://<ha>:48123` together with
  `--use-fake-ui-for-media-stream` (auto-grants the permission) and
  `--autoplay-policy=no-user-gesture-required` (lets the audio context start unattended). Which flags you can set depends
  on your kiosk runtime;
* the STT server is yours to run. On an Intel N150 without a GPU, pick a small model, measure it, and keep it off the
  critical path: only one heavy job (STT, LLM, embeddings) runs at a time (`ResourceGate(1)`), and a busy server makes
  Domovoy **drop the audio segment** instead of queueing it. If STT is too slow for you, use entrances 1 or 2 — they need
  no STT at all;
* echo: the microphone hears the speakers. The browser's echo cancellation helps, and the follow-up window is opened by
  the trigger word, not by Domovoy's own voice, but a microphone next to a loud speaker will always be the weakest
  entrance.

## Avatar: does it "speak" on the display?

Yes, in the sense the kiosk needs: the avatar has no audio of its own (the voice comes out of the speaker), but it
shows **what is being said and for how long**, and animates its mouth for that time.

* Domovoy publishes `state.v1` at `GET /domovoy-api/api/avatar/state`: `message` (the words), `speaking`, `emotion`,
  `cue` (from the pack's motion map: `reply_soft`, `happy`, `warning`, `think`, `surprise`, `greet`), `intensity`, a
  `revision`. Speaking time is estimated from the text (about 13 characters per second) plus a short linger.
* The kiosk scene reads it with the ordinary JSON state provider. In the pack's `renderer.kiosk-scene.json`:
  ```json
  "state": { "provider": "json", "stateUrl": "../../domovoy-api/api/avatar/state", "idleLinesUrl": "./neiri-idle-lines.json" }
  ```
  (a relative URL works both directly and through ingress). The `domovoy.avatar-sync` service subscribes to the change
  feed and asks the scene to refresh the moment the state changes, so the mouth moves in step with the speaker.
* Only **voice** entrances are mirrored. Text typed in the admin UI is private and never shown on the kiosk.
* Whether a particular avatar model animates its mouth for `speaking: true` depends on the model and its motion map.
  The contract is tested (schema-valid `state.v1`, read by the real JSON provider); how a given Live2D model looks is
  for the owner to judge.
* Only one state provider per pack: switching the pack to Domovoy replaces the previous state source (for example an
  agent that used to write the Neiri state). Decide which one should drive the avatar.
