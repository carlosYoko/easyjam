import { afterEach, describe, expect, it, vi } from 'vitest';
import { createYouTubePlayer, type YouTubeHandle, type YouTubeOptions } from '../../src/infrastructure/youtube-player';

function fixture() {
  vi.useFakeTimers();
  let options!: YouTubeOptions;
  let state = -1;
  let seconds = 0;
  const handle: YouTubeHandle = {
    playVideo: vi.fn(), pauseVideo: vi.fn(), seekTo: vi.fn(), destroy: vi.fn(),
    getCurrentTime: () => seconds, getDuration: () => 0, getPlayerState: () => state,
  };
  class Player {
    constructor(_element: HTMLElement, settings: YouTubeOptions) { options = settings; return handle; }
  }
  const port = createYouTubePlayer({} as HTMLElement, 'http://localhost:5173', async () => ({ Player: Player as unknown as new (element: HTMLElement, settings: YouTubeOptions) => YouTubeHandle }));
  return { port, handle, options: () => options, observed: (nextState: number, nextSeconds: number) => { state = nextState; seconds = nextSeconds; options.events.onStateChange({ data: state }); } };
}
afterEach(() => vi.useRealTimers());
describe('PlayerPort via typed YouTube boundary', () => {
  it('waits for readiness and observes state/time rather than assuming command success', async () => {
    const f = fixture(); await Promise.resolve();
    expect(f.port.snapshot().ready).toBe(false);
    f.options().events.onReady();
    expect(f.port.snapshot().durationSeconds).toBeNull();
    f.port.play(); expect(f.handle.playVideo).toHaveBeenCalledOnce();
    expect(f.port.snapshot().state).toBe('idle');
    f.observed(1, 2.5); expect(f.port.snapshot()).toMatchObject({ state: 'playing', seconds: 2.5 });
    f.port.pause(); expect(f.port.snapshot().state).toBe('playing');
    f.observed(2, 3); vi.advanceTimersByTime(600); expect(f.port.snapshot()).toMatchObject({ state: 'paused', seconds: 3 });
    f.port.seekTo(12); expect(f.handle.seekTo).toHaveBeenCalledWith(12, true); expect(f.port.snapshot().seconds).toBe(3);
    f.observed(3, 12); expect(f.port.snapshot().state).toBe('buffering');
    f.observed(0, 12); expect(f.port.snapshot().state).toBe('ended'); f.port.dispose();
  });
  it('reports not-ready commands, provider errors and blocked play', async () => {
    const f = fixture(); await Promise.resolve(); f.port.play();
    expect(f.port.snapshot().error?.code).toBe('NOT_READY'); expect(f.handle.playVideo).not.toHaveBeenCalled();
    f.options().events.onError({ data: 153 }); expect(f.port.snapshot().error).toMatchObject({ code: '153', phase: 'provider' });
    f.options().events.onAutoplayBlocked(); expect(f.port.snapshot().error?.code).toBe('PLAY_BLOCKED'); f.port.dispose();
  });
  it('rejects invalid seek and cleans subscriptions, timers and late callbacks', async () => {
    const f = fixture(); await Promise.resolve(); f.options().events.onReady();
    const listener = vi.fn(); const unsubscribe = f.port.subscribe(listener); unsubscribe();
    f.port.seekTo(NaN); expect(f.port.snapshot().error?.code).toBe('INVALID_SEEK');
    const calls = listener.mock.calls.length; f.port.dispose(); f.port.dispose();
    f.observed(1, 99); vi.advanceTimersByTime(30000); f.port.play();
    expect(listener).toHaveBeenCalledTimes(calls); expect(f.handle.destroy).toHaveBeenCalledOnce();
    expect(f.port.snapshot().state).toBe('disposed'); expect(vi.getTimerCount()).toBe(0);
  });
  it('exposes load failure and readiness timeout', async () => {
    vi.useFakeTimers();
    const port = createYouTubePlayer({} as HTMLElement, 'http://localhost', () => Promise.reject(new Error('offline')));
    await Promise.resolve(); await Promise.resolve();
    expect(port.snapshot().error).toMatchObject({ code: 'API_LOAD', phase: 'script' }); port.dispose();
    const f = fixture(); await Promise.resolve(); vi.advanceTimersByTime(20000);
    expect(f.port.snapshot().error?.code).toBe('READY_TIMEOUT'); f.port.dispose();
  });
  it('keeps a readiness timeout terminal when provider callbacks arrive late', async () => {
    const f = fixture(); await Promise.resolve();
    vi.advanceTimersByTime(20000);
    expect(f.port.snapshot()).toMatchObject({ state: 'error', ready: false });
    f.options().events.onReady();
    f.observed(1, 4);
    expect(f.port.snapshot()).toMatchObject({ state: 'error', ready: false, error: { code: 'READY_TIMEOUT' } });
    expect(vi.getTimerCount()).toBe(0);
    f.port.dispose();
  });
  it('does not construct a player after disposal while loading', async () => {
    const f = fixture(); f.port.dispose(); await Promise.resolve(); expect(f.options()).toBeUndefined();
  });
});
