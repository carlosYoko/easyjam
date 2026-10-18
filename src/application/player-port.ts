export type PlayerState = 'loading' | 'idle' | 'playing' | 'paused' | 'buffering' | 'ended' | 'error' | 'disposed';
export interface PlayerSnapshot {
  readonly ready: boolean;
  readonly state: PlayerState;
  readonly seconds: number;
  readonly durationSeconds: number | null;
  readonly error: { readonly code: string; readonly phase: string; readonly elapsedMs: number } | null;
}
export interface PlayerPort {
  snapshot(): PlayerSnapshot;
  play(): void;
  pause(): void;
  seekTo(seconds: number): void;
  subscribe(listener: (snapshot: PlayerSnapshot) => void): () => void;
  dispose(): void;
}
