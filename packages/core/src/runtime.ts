import type {
  AvatarAdapterCapabilities,
  ControlCueV1,
  SceneConfigV1,
  StateV1,
  ViewPreset,
} from "./contracts.js";

export interface AvatarAdapterMountContext {
  host: HTMLElement;
  assetRoot: string;
}

export interface AvatarAdapter {
  readonly id: string;
  mount(context: AvatarAdapterMountContext): Promise<void>;
  dispose(): Promise<void>;
  setState(state: StateV1): Promise<void>;
  setCue(cue: ControlCueV1): Promise<void>;
  setViewPreset(preset: ViewPreset): Promise<void>;
  showBubble(text: string, options?: { ttlMs?: number; speak?: boolean; typewriter?: boolean }): Promise<void>;
  getCapabilities(): AvatarAdapterCapabilities;
}

export interface StateProvider<TState = StateV1> {
  readonly id: string;
  read(): Promise<TState>;
}

export interface ControlProvider<TControl = unknown> {
  readonly id: string;
  read(): Promise<TControl>;
}

export interface WidgetModule {
  readonly id: string;
  render(host: HTMLElement, scene: SceneConfigV1): Promise<void>;
}

