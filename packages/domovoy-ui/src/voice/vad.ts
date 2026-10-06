/**
 * Energy-based voice activity detector.
 *
 * Deliberately simple: it only has to decide "someone started/stopped talking" so that whole utterances (not a
 * constant stream) go to the speech-to-text server. Everything after that — was it addressed to Domovoy? — is
 * decided on the server from the transcript (trigger word), so a wrong guess here costs one short upload.
 * It adapts to the room's noise floor, so a fridge hum or a TV does not keep it open forever.
 */
export interface VadOptions {
  sampleRate: number;
  /** Absolute floor: below this RMS nothing counts as speech. */
  minRms?: number;
  /** Speech must be this many times louder than the tracked noise floor. */
  ratio?: number;
  /** Consecutive loud audio needed to start an utterance. */
  startMs?: number;
  /** Silence that ends an utterance. */
  hangoverMs?: number;
  /** Audio kept from before the start, so the first syllable is not clipped. */
  prerollMs?: number;
  /** Hard cap: an utterance that never pauses this long is not a command (see `discard: continuous`). */
  maxMs?: number;
  /** Utterances shorter than this are discarded (clicks, door slams). */
  minMs?: number;
  /** Listen this long at start-up to learn the room's steady noise (fridge, fan) before anything can trigger. */
  calibrateMs?: number;
}

export type VadEvent =
  | { type: "start" }
  | { type: "end"; samples: Float32Array; durationMs: number }
  /** `short`: a click or a bump. `continuous`: never went quiet (TV, appliance) — not a command; the floor is raised. */
  | { type: "discard"; reason: "short" | "continuous" };

export function rms(frame: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < frame.length; i += 1) {
    sum += frame[i] * frame[i];
  }
  return Math.sqrt(sum / Math.max(1, frame.length));
}

export class EnergyVad {
  private readonly o: Required<VadOptions>;
  private noise = 0.005;
  private calibrated: boolean;
  private calibMs = 0;
  private calibSum = 0;
  private calibFrames = 0;
  private state: "idle" | "speech" = "idle";
  private loudMs = 0;
  private quietMs = 0;
  private preroll: Float32Array[] = [];
  private prerollSamples = 0;
  private chunks: Float32Array[] = [];
  private samples = 0;

  constructor(options: VadOptions) {
    this.calibrated = (options.calibrateMs ?? 1000) <= 0;
    this.o = { minRms: 0.012, ratio: 3, startMs: 120, hangoverMs: 800, prerollMs: 300, maxMs: 15_000, minMs: 350, calibrateMs: 1000, ...options };
  }

  get speaking(): boolean {
    return this.state === "speech";
  }

  get noiseFloor(): number {
    return this.noise;
  }

  reset(): void {
    this.state = "idle";
    this.loudMs = 0;
    this.quietMs = 0;
    this.preroll = [];
    this.prerollSamples = 0;
    this.chunks = [];
    this.samples = 0;
  }

  /** Feed consecutive frames; returns the events this frame caused (usually none). */
  push(frame: Float32Array): VadEvent[] {
    const events: VadEvent[] = [];
    const ms = (frame.length / this.o.sampleRate) * 1000;
    const level = rms(frame);
    const threshold = Math.max(this.o.minRms, this.noise * this.o.ratio);
    const loud = level >= threshold;

    if (this.state === "idle") {
      if (!this.calibrated) {
        this.calibSum += level;
        this.calibFrames += 1;
        this.calibMs += ms;
        if (this.calibMs >= this.o.calibrateMs) {
          this.noise = Math.max(0.002, this.calibSum / this.calibFrames);
          this.calibrated = true;
        }
        this.keepPreroll(frame);
        return events;
      }
      // Track the noise floor only while nobody is speaking (slowly up, quickly down).
      this.noise = level < this.noise ? this.noise * 0.9 + level * 0.1 : this.noise * 0.995 + level * 0.005;
      this.keepPreroll(frame);
      this.loudMs = loud ? this.loudMs + ms : 0;
      if (this.loudMs >= this.o.startMs) {
        this.state = "speech";
        this.quietMs = 0;
        this.chunks = [...this.preroll];
        this.samples = this.prerollSamples;
        this.preroll = [];
        this.prerollSamples = 0;
        events.push({ type: "start" });
      }
      return events;
    }

    this.chunks.push(frame);
    this.samples += frame.length;
    this.quietMs = loud ? 0 : this.quietMs + ms;
    const durationMs = (this.samples / this.o.sampleRate) * 1000;
    const timedOut = durationMs >= this.o.maxMs && this.quietMs < this.o.hangoverMs;
    if (this.quietMs >= this.o.hangoverMs || timedOut) {
      const speechMs = durationMs - this.quietMs;
      const samples = this.collect();
      const meanLevel = rms(samples);
      this.reset();
      if (timedOut) {
        // Nobody talks for the whole limit without a breath: this is a TV or a machine. Learn it, don't send it.
        this.noise = Math.max(this.noise, meanLevel);
        events.push({ type: "discard", reason: "continuous" });
      } else {
        events.push(speechMs < this.o.minMs ? { type: "discard", reason: "short" } : { type: "end", samples, durationMs });
      }
    }
    return events;
  }

  private keepPreroll(frame: Float32Array): void {
    this.preroll.push(frame);
    this.prerollSamples += frame.length;
    const limit = (this.o.prerollMs / 1000) * this.o.sampleRate;
    while (this.preroll.length > 1 && this.prerollSamples - this.preroll[0].length >= limit) {
      this.prerollSamples -= this.preroll[0].length;
      this.preroll.shift();
    }
  }

  private collect(): Float32Array {
    const out = new Float32Array(this.samples);
    let offset = 0;
    for (const chunk of this.chunks) {
      out.set(chunk, offset);
      offset += chunk.length;
    }
    return out;
  }
}
