import { h, toast } from "@kiosk-scene/app-shell";
import type { HttpClient } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime, ServiceDefinition } from "@kiosk-scene/core";
import { EVENTS_SOURCE_ID } from "./api.js";
import { createMicClient, type MicState } from "./voice/mic.js";

const MIC_LABELS: Record<string, string> = {
  starting: "Запуск микрофона…", listening: "Слушаю: скажите «домовой …»", hearing: "Слышу…", sending: "Разбираю…", muted: "Микрофон выключен",
};

/** Small always-on-screen indicator: the person can always see whether the microphone is listening, and mute it. */
function micIndicator(onToggle: () => void): { el: HTMLElement; render(state: MicState): void } {
  const dot = h("span", { class: "dv-mic-dot", "aria-hidden": "true" });
  const label = h("span", { class: "dv-mic-label" });
  const el = h("button", { class: "dv-mic", type: "button", "aria-live": "polite", title: "Включить или выключить микрофон", dataset: { noSwipe: "true" }, onClick: onToggle }, dot, label);
  return {
    el,
    render(state) {
      el.dataset.state = state.kind;
      el.hidden = state.kind === "off";
      label.textContent = state.kind === "unavailable" ? state.reason : state.kind === "heard" ? state.reply : MIC_LABELS[state.kind] ?? "";
    },
  };
}

export function createServices(http: HttpClient): ServiceDefinition[] {
  return [
    {
      // The scene's avatar reads its state from the Domovoy state provider; a push from the server turns
      // "poll every few seconds" into "react immediately", so the mouth moves in step with the speakers.
      id: "domovoy.avatar-sync",
      title: "Аватар следует за ответами Домового",
      modes: ["kiosk"],
      start(runtime: ExtensionRuntime) {
        return runtime.subscribe(EVENTS_SOURCE_ID, "avatar", () => runtime.refresh());
      },
    },
    {
      id: "domovoy.notifications",
      title: "Уведомления на экране киоска",
      modes: ["kiosk"],
      start(runtime: ExtensionRuntime) {
        return runtime.subscribe(EVENTS_SOURCE_ID, "notification", (message) => {
          const text = (message.payload as { text?: unknown } | undefined)?.text;
          if (typeof text === "string" && text.trim()) {
            toast(text, "info", 12_000);
          }
        });
      },
    },
    {
      // Off unless the deployment asks for it (`config.mic` in extension.json): a kiosk that does not have a
      // microphone, or a secure origin, must not nag or fail.
      id: "domovoy.mic",
      title: "Микрофон киоска",
      modes: ["kiosk"],
      start(runtime: ExtensionRuntime) {
        const wanted = runtime.config.mic;
        if (wanted !== true && !(wanted && typeof wanted === "object")) {
          return () => undefined;
        }
        const room = typeof (wanted as { room?: unknown }).room === "string" ? String((wanted as { room: string }).room) : "";
        const indicator = micIndicator(() => client.setMuted(!client.muted));
        indicator.el.hidden = true;
        document.body.appendChild(indicator.el);
        const client = createMicClient({ http, room, onState: indicator.render });
        void client.start();
        return () => {
          client.stop();
          indicator.el.remove();
        };
      },
    },
  ];
}
