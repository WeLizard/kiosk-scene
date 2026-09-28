import { describe, expect, it, vi } from "vitest";
import type { HttpClient } from "@kiosk-scene/app-shell";
import { EnergyVad, type VadEvent } from "../src/voice/vad";
import { downsample, encodeWav } from "../src/voice/wav";
import { createMicClient, type MicState } from "../src/voice/mic";

const RATE = 16_000;
const FRAME = 1600; // 100 ms

function frame(amplitude: number, noiseSeed = 1): Float32Array {
  const out = new Float32Array(FRAME);
  let x = noiseSeed;
  for (let i = 0; i < FRAME; i += 1) {
    // deterministic pseudo-noise around the amplitude so RMS is stable
    x = (x * 16807) % 2147483647;
    out[i] = amplitude * (i % 2 === 0 ? 1 : -1) * (0.9 + (x % 100) / 500);
  }
  return out;
}

function run(vad: EnergyVad, plan: Array<[number, number]>): VadEvent[] {
  const events: VadEvent[] = [];
  for (const [amplitude, frames] of plan) {
    for (let i = 0; i < frames; i += 1) {
      events.push(...vad.push(frame(amplitude, i + 7)));
    }
  }
  return events;
}

describe("EnergyVad", () => {
  it("emits one utterance for speech between silences, with the pre-roll included", () => {
    const vad = new EnergyVad({ sampleRate: RATE });
    const events = run(vad, [[0.002, 15], [0.2, 12], [0.002, 12]]);
    expect(events.map((e) => e.type)).toEqual(["start", "end"]);
    const end = events[1] as Extract<VadEvent, { type: "end" }>;
    // 1.2 s of speech + 0.8 s hangover + up to 0.3 s pre-roll (in whole frames)
    expect(end.durationMs).toBeGreaterThanOrEqual(1200);
    expect(end.durationMs).toBeLessThanOrEqual(2600);
    expect(end.samples.length).toBeGreaterThan(RATE);
  });

  it("ignores a single click and discards a short bump", () => {
    const vad = new EnergyVad({ sampleRate: RATE });
    expect(run(vad, [[0.002, 15], [0.4, 1], [0.002, 15]])).toEqual([]);
    const events = run(vad, [[0.2, 2], [0.002, 12]]);
    expect(events.map((e) => e.type)).toEqual(["start", "discard"]);
  });

  it("learns steady background noise during calibration and does not trigger on it", () => {
    const vad = new EnergyVad({ sampleRate: RATE });
    const events = run(vad, [[0.03, 60]]); // a loud fan from the very first second
    expect(events).toEqual([]);
    expect(vad.noiseFloor).toBeGreaterThan(0.02);
    // but real speech well above the fan still gets through
    const spoken = run(vad, [[0.4, 10], [0.03, 12]]);
    expect(spoken.map((e) => e.type)).toEqual(["start", "end"]);
  });

  it("gives up on audio that never pauses (a TV) instead of sending it, and raises the floor", () => {
    const vad = new EnergyVad({ sampleRate: RATE, maxMs: 3000 });
    const events = run(vad, [[0.002, 15], [0.15, 45]]);
    expect(events.map((e) => e.type)).toEqual(["start", "discard"]);
    expect((events[1] as { reason: string }).reason).toBe("continuous");
    expect(vad.noiseFloor).toBeGreaterThan(0.1);
    // the same TV again no longer triggers
    expect(run(vad, [[0.15, 30]])).toEqual([]);
  });
});

describe("wav", () => {
  it("writes a valid mono 16-bit PCM header and clamps samples", () => {
    const wav = encodeWav(new Float32Array([0, 0.5, -0.5, 2, -2]), 16_000);
    const view = new DataView(wav.buffer);
    expect(String.fromCharCode(...wav.slice(0, 4))).toBe("RIFF");
    expect(String.fromCharCode(...wav.slice(8, 12))).toBe("WAVE");
    expect(view.getUint16(22, true)).toBe(1);
    expect(view.getUint32(24, true)).toBe(16_000);
    expect(view.getUint16(34, true)).toBe(16);
    expect(view.getUint32(40, true)).toBe(10);
    expect(wav.length).toBe(54);
    expect(view.getInt16(44 + 6, true)).toBe(0x7fff);
    expect(view.getInt16(44 + 8, true)).toBe(-0x8000);
  });

  it("downsamples 48 kHz to 16 kHz by averaging and keeps the duration", () => {
    const input = new Float32Array(4800).fill(0.25);
    const out = downsample(input, 48_000, 16_000);
    expect(out.length).toBe(1600);
    expect(out[10]).toBeCloseTo(0.25, 5);
    expect(downsample(input, 16_000, 16_000)).toBe(input);
  });
});

describe("createMicClient", () => {
  function setup(response: { ok: boolean; data?: unknown; error?: { code: string; message: string } }) {
    const states: MicState[] = [];
    const requests: Array<{ path: string; headers?: Record<string, string>; raw?: unknown }> = [];
    const http = {
      request: vi.fn(async (path: string, options: { headers?: Record<string, string>; rawBody?: unknown }) => {
        requests.push({ path, headers: options.headers, raw: options.rawBody });
        return response;
      }),
      url: (p: string) => p,
    } as unknown as HttpClient;
    let onAudio: ((event: { inputBuffer: { getChannelData(i: number): Float32Array } }) => void) | null = null;
    const track = { enabled: true, stop: vi.fn() };
    const stream = { getTracks: () => [track], getAudioTracks: () => [track] } as unknown as MediaStream;
    const processor = {
      connect: vi.fn(),
      disconnect: vi.fn(),
      set onaudioprocess(fn: typeof onAudio) {
        onAudio = fn;
      },
    };
    const context = {
      sampleRate: RATE,
      state: "running",
      destination: {},
      createMediaStreamSource: () => ({ connect: vi.fn(), disconnect: vi.fn() }),
      createScriptProcessor: () => processor,
      close: vi.fn(async () => undefined),
      resume: vi.fn(async () => undefined),
    } as unknown as AudioContext;
    const client = createMicClient({
      http,
      room: "кухня",
      onState: (s) => states.push(s),
      mediaDevices: { getUserMedia: vi.fn(async () => stream) },
      audioContextFactory: () => context,
    });
    const feed = (amplitude: number, frames: number): void => {
      for (let i = 0; i < frames; i += 1) {
        onAudio?.({ inputBuffer: { getChannelData: () => frame(amplitude, i + 3) } });
      }
    };
    return { client, states, requests, feed, track };
  }

  it("uploads one utterance as WAV with the room, and shows the answer", async () => {
    const { client, states, requests, feed } = setup({ ok: true, data: { handled: true, reply: "Слушаю.", status: "listening" } });
    await client.start();
    feed(0.002, 15);
    feed(0.2, 12);
    feed(0.002, 12);
    await vi.waitFor(() => expect(states.some((s) => s.kind === "heard")).toBe(true));
    expect(requests).toHaveLength(1);
    expect(requests[0].path).toBe("api/voice/command");
    expect(requests[0].headers).toMatchObject({ "Content-Type": "audio/wav", "X-Room": "кухня" });
    expect((requests[0].raw as Blob).type).toBe("audio/wav");
    expect(states.map((s) => s.kind)).toEqual(expect.arrayContaining(["starting", "listening", "hearing", "sending", "heard"]));
    client.stop();
  });

  it("sends nothing while muted and reports an unhandled (not addressed) segment as plain listening", async () => {
    const { client, states, requests, feed, track } = setup({ ok: true, data: { handled: false, reason: "no_trigger" } });
    await client.start();
    client.setMuted(true);
    expect(track.enabled).toBe(false);
    feed(0.002, 15);
    feed(0.3, 12);
    feed(0.002, 12);
    expect(requests).toHaveLength(0);
    expect(states.at(-1)?.kind).toBe("muted");
    client.setMuted(false);
    feed(0.002, 15);
    feed(0.3, 12);
    feed(0.002, 12);
    await vi.waitFor(() => expect(requests).toHaveLength(1));
    await vi.waitFor(() => expect(states.at(-1)?.kind).toBe("listening"));
    client.stop();
  });

  it("reports why the microphone is unavailable instead of failing silently", async () => {
    const states: MicState[] = [];
    const client = createMicClient({
      http: {} as HttpClient,
      room: "",
      onState: (s) => states.push(s),
      mediaDevices: { getUserMedia: vi.fn(async () => { throw Object.assign(new Error("denied"), { name: "NotAllowedError" }); }) },
    });
    await client.start();
    expect(states.at(-1)).toEqual({ kind: "unavailable", reason: "Доступ к микрофону запрещён в браузере." });
  });

  it("surfaces a server error without stopping to listen", async () => {
    const { client, states, feed } = setup({ ok: false, error: { code: "http_503", message: "Распознавание занято" } });
    await client.start();
    feed(0.002, 15);
    feed(0.3, 12);
    feed(0.002, 12);
    await vi.waitFor(() => expect(states.some((s) => s.kind === "unavailable")).toBe(true));
    client.stop();
  });
});
