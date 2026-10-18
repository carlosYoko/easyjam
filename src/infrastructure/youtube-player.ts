import type { PlayerPort, PlayerSnapshot, PlayerState } from '../application/player-port';

export interface YouTubeHandle {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  destroy(): void;
}
export interface YouTubeOptions {
  width: number;
  height: number;
  videoId: string;
  playerVars: { origin: string; controls: number; autoplay: number; playsinline: number };
  events: { onReady(): void; onStateChange(event: { data: number }): void; onError(event: { data: number }): void; onAutoplayBlocked(): void };
}
export interface YouTubeApi { Player: new (element: HTMLElement, options: YouTubeOptions) => YouTubeHandle }
type ProviderWindow = Window & { YT?: YouTubeApi; onYouTubeIframeAPIReady?: () => void };

// One owner per page: the API script is requested only after deliberate consent.
export function loadYouTubeApi(): Promise<YouTubeApi> {
  const host = window as ProviderWindow;
  if (host.YT?.Player) return Promise.resolve(host.YT);
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const previous = host.onYouTubeIframeAPIReady;
    const cleanup = () => { clearTimeout(timeout); script.onerror = null; host.onYouTubeIframeAPIReady = previous; };
    const timeout = setTimeout(() => { cleanup(); script.remove(); reject(new Error('API_TIMEOUT')); }, 15000);
    host.onYouTubeIframeAPIReady = () => {
      cleanup();
      if (host.YT?.Player) resolve(host.YT); else reject(new Error('API_UNAVAILABLE'));
    };
    script.onerror = () => { cleanup(); script.remove(); reject(new Error('SCRIPT_LOAD')); };
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.append(script);
  });
}

const states: Record<number, PlayerState> = { [-1]: 'idle', 0: 'ended', 1: 'playing', 2: 'paused', 3: 'buffering', 5: 'idle' };
export function createYouTubePlayer(element: HTMLElement, origin: string, loadApi = loadYouTubeApi): PlayerPort {
  let value: PlayerSnapshot = { ready: false, state: 'loading', seconds: 0, durationSeconds: null, error: null };
  let player: YouTubeHandle | undefined;
  let disposed = false;
  let timer: ReturnType<typeof setInterval> | undefined;
  const started = performance.now();
  const listeners = new Set<(value: PlayerSnapshot) => void>();
  const publish = (patch: Partial<PlayerSnapshot>) => {
    if (disposed) return;
    value = { ...value, ...patch };
    listeners.forEach(listener => listener(value));
  };
  const fail = (code: string, phase: string) => publish({ state: 'error', error: { code, phase, elapsedMs: Math.round(performance.now() - started) } });
  const observe = () => {
    if (!player || disposed || !value.ready || value.error) return;
    try {
      const seconds = player.getCurrentTime();
      const duration = player.getDuration();
      const state = states[player.getPlayerState()];
      if (!Number.isFinite(seconds) || seconds < 0 || !state) { fail('INVALID_SNAPSHOT', 'observe'); return; }
      publish({ seconds, durationSeconds: Number.isFinite(duration) && duration > 0 ? duration : null, state });
    } catch { fail('READ_FAILED', 'observe'); }
  };
  const deadline = setTimeout(() => fail('READY_TIMEOUT', 'ready'), 20000);
  void loadApi().then(api => {
    if (disposed) return;
    player = new api.Player(element, {
      width: 640, height: 390, videoId: 'M7lc1UVf-VE',
      playerVars: { origin, controls: 1, autoplay: 0, playsinline: 1 },
      events: {
        onReady: () => {
          if (disposed || value.error || value.ready) return;
          clearTimeout(deadline);
          publish({ ready: true, state: 'idle' });
          observe();
          if (!disposed && !value.error) timer = setInterval(observe, 200);
        },
        onStateChange: () => observe(),
        onError: event => { clearTimeout(deadline); fail(String(event.data), 'provider'); },
        onAutoplayBlocked: () => fail('PLAY_BLOCKED', 'play'),
      },
    });
  }).catch(() => { clearTimeout(deadline); fail('API_LOAD', 'script'); });
  const command = (action: (handle: YouTubeHandle) => void) => {
    if (disposed) return;
    if (!player || !value.ready) { fail('NOT_READY', 'command'); return; }
    if (value.error) return;
    try { action(player); } catch { fail('COMMAND_FAILED', 'command'); }
  };
  return {
    snapshot: () => value,
    subscribe(listener) { if (!disposed) { listeners.add(listener); listener(value); } return () => listeners.delete(listener); },
    play: () => command(handle => handle.playVideo()),
    pause: () => command(handle => handle.pauseVideo()),
    seekTo(seconds) {
      if (!Number.isFinite(seconds) || seconds < 0) { fail('INVALID_SEEK', 'command'); return; }
      command(handle => handle.seekTo(seconds, true));
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      clearTimeout(deadline); clearInterval(timer); listeners.clear();
      value = { ...value, ready: false, state: 'disposed' };
      player?.destroy();
    },
  };
}
