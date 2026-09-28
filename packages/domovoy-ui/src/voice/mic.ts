import type { HttpClient } from "@kiosk-scene/app-shell";
import { EnergyVad } from "./vad.js";
import { downsample, encodeWav } from "./wav.js";

export type MicState =
  | { kind: "off" }
  | { kind: "starting" }
  | { kind: "listening" }
  | { kind: "hearing" }
  | { kind: "sending" }
  | { kind: "heard"; reply: string; status: string }
  | { kind: "muted" }
  | { kind: "unavailable"; reason: string };

export interface MicClientOptions {
  http: HttpClient;
  room: string;
  onState(state: MicState): void;
  /** Injected for tests. */
  mediaDevices?: Pick<MediaDevices, "getUserMedia">;
  audioContextFactory?: () => AudioContext;
}

export interface MicClient {
  start(): Promise<void>;
  stop(): void;
  setMuted(muted: boolean): void;
  readonly muted: boolean;
}

interface VoiceReply {
  handled: boolean;
  reason?: string;
  reply?: string;
  status?: string;
}

/** Why a microphone cannot be opened here, in words a person can act on. */
export function micUnavailableReason(): string | null {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
    return window.isSecureContext === false
      ? "Браузер разрешает микрофон только на https:// или localhost. Откройте киоск по HTTPS или добавьте адрес в исключения браузера."
      : "В этом браузере нет доступа к микрофону.";
  }
  return null;
}

/**
 * Listens on the kiosk microphone, cuts speech into utterances, and uploads each one for transcription.
 * The server decides whether it was addressed to Domovoy (trigger word) and answers through the speakers;
 * audio that is not for us is dropped there and never stored. Nothing is recorded while muted or stopped.
 */
export function createMicClient(options: MicClientOptions): MicClient {
  let stream: MediaStream | null = null;
  let context: AudioContext | null = null;
  let processor: ScriptProcessorNode | null = null;
  let source: MediaStreamAudioSourceNode | null = null;
  let vad: EnergyVad | null = null;
  let muted = false;
  let running = false;
  let inFlight = false;
  let resetTimer: number | undefined;

  const emit = (state: MicState): void => options.onState(state);
  const settleTo = (state: MicState, afterMs = 0): void => {
    window.clearTimeout(resetTimer);
    if (afterMs > 0) {
      emit(state);
      resetTimer = window.setTimeout(() => running && !muted && emit({ kind: "listening" }), afterMs);
    } else {
      emit(state);
    }
  };

  const upload = async (samples: Float32Array, rate: number): Promise<void> => {
    if (inFlight) {
      // One upload at a time: the machine may be a small one and the STT server single-threaded. Drop, don't queue.
      return;
    }
    inFlight = true;
    emit({ kind: "sending" });
    try {
      const wav = encodeWav(downsample(samples, rate, 16_000), Math.min(rate, 16_000));
      const result = await options.http.request<VoiceReply>("api/voice/command", {
        method: "POST",
        rawBody: new Blob([wav.buffer as ArrayBuffer], { type: "audio/wav" }),
        headers: { "Content-Type": "audio/wav", "X-Room": options.room },
        timeoutMs: 30_000,
      });
      if (!running) {
        return;
      }
      if (!result.ok) {
        settleTo({ kind: "unavailable", reason: result.error.message }, 6000);
      } else if (result.data.handled && result.data.reply) {
        settleTo({ kind: "heard", reply: result.data.reply, status: result.data.status ?? "" }, 6000);
      } else {
        settleTo({ kind: "listening" });
      }
    } finally {
      inFlight = false;
    }
  };

  return {
    get muted() {
      return muted;
    },
    async start() {
      if (running) {
        return;
      }
      const blocked = micUnavailableReason();
      if (blocked && !options.mediaDevices) {
        emit({ kind: "unavailable", reason: blocked });
        return;
      }
      emit({ kind: "starting" });
      try {
        stream = await (options.mediaDevices ?? navigator.mediaDevices).getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      } catch (error) {
        const name = (error as { name?: string } | null)?.name;
        emit({ kind: "unavailable", reason: name === "NotAllowedError" ? "Доступ к микрофону запрещён в браузере." : name === "NotFoundError" ? "Микрофон не найден." : "Не удалось открыть микрофон." });
        return;
      }
      context = options.audioContextFactory ? options.audioContextFactory() : new AudioContext();
      if (context.state === "suspended") {
        // Autoplay policy: without a kiosk flag the context stays suspended until the first touch.
        const resume = (): void => void context?.resume().catch(() => undefined);
        resume();
        document.addEventListener("pointerdown", resume, { once: true });
      }
      const rate = context.sampleRate;
      vad = new EnergyVad({ sampleRate: rate });
      source = context.createMediaStreamSource(stream);
      processor = context.createScriptProcessor(4096, 1, 1);
      processor.onaudioprocess = (event) => {
        if (muted || !running || !vad) {
          return;
        }
        // The buffer is reused by the browser: copy before keeping it.
        const frame = new Float32Array(event.inputBuffer.getChannelData(0));
        for (const item of vad.push(frame)) {
          if (item.type === "start") {
            emit({ kind: "hearing" });
          } else if (item.type === "discard") {
            emit({ kind: "listening" });
          } else {
            void upload(item.samples, rate);
          }
        }
      };
      source.connect(processor);
      processor.connect(context.destination); // required for the node to run; it outputs silence
      running = true;
      emit({ kind: "listening" });
    },
    stop() {
      running = false;
      window.clearTimeout(resetTimer);
      processor?.disconnect();
      source?.disconnect();
      if (processor) {
        processor.onaudioprocess = null;
      }
      stream?.getTracks().forEach((track) => track.stop());
      void context?.close().catch(() => undefined);
      stream = context = processor = source = null;
      vad = null;
      emit({ kind: "off" });
    },
    setMuted(value) {
      muted = value;
      vad?.reset();
      stream?.getAudioTracks().forEach((track) => {
        track.enabled = !value;
      });
      emit(value ? { kind: "muted" } : running ? { kind: "listening" } : { kind: "off" });
    },
  };
}
