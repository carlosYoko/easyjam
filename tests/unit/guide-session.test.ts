import { describe, expect, it, vi } from 'vitest';
import { requestSectionNavigation, selectGuideFrame } from '../../src/application/guide-session';
import type { PlayerPort, PlayerSnapshot, PlayerState } from '../../src/application/player-port';
import { minimalGuide, technicalGuideNotice } from '../../src/fixtures/minimal-guide';

function fixture() {
  let value: PlayerSnapshot = { ready: true, state: 'paused', seconds: 3, durationSeconds: 1344, error: null };
  const port: PlayerPort = {
    snapshot: () => value, play: vi.fn(), pause: vi.fn(), seekTo: vi.fn(), dispose: vi.fn(),
    subscribe: listener => { listener(value); return () => {}; },
  };
  return { port, observe: (patch: Partial<PlayerSnapshot>) => { value = { ...value, ...patch }; } };
}

describe('selectGuideFrame: a fictional fixture selected from observed seconds', () => {
  it('permanently labels the fixture and separates musical references from source seconds', () => {
    expect(technicalGuideNotice).toBe('Secuencia ficticia de prueba técnica; no transcripción del vídeo');
    expect(minimalGuide.cues[0].musical).toEqual({ bar: 1, beat: 1, durationBeats: 3 });
    expect(minimalGuide.sourceTiming.cues[0]).toEqual({ id: 'c', startSeconds: 0, endSeconds: 6 });
  });
  it.each([
    [0, 'a', 'c'], [5.999, 'a', 'c'], [6, 'a', 'rest-a'], [7.999, 'a', 'rest-a'],
    [8, 'a', 'g'], [11.999, 'a', 'g'], [12, 'a', null], [15.999, 'a', null],
    [16, null, null], [19.999, null, null], [20, 'b', 'am'], [26, 'b', 'rest-b'],
    [30, 'b', 'f'], [35.999, 'b', 'f'], [36, null, null], [1344, null, null],
  ])('uses [start,end) at %s seconds, section=%s cue=%s', (seconds, sectionId, cueId) => {
    const frame = selectGuideFrame(minimalGuide, seconds);
    expect(frame.status).toBe('ready');
    expect(frame.currentSection?.id ?? null).toBe(sectionId);
    expect(frame.currentCue?.id ?? null).toBe(cueId);
  });
  it('distinguishes explicit rest from a gap and finds upcoming cue/section across gaps', () => {
    expect(selectGuideFrame(minimalGuide, 6).currentCue?.kind).toBe('rest');
    expect(selectGuideFrame(minimalGuide, 12)).toMatchObject({ currentCue: null, currentSection: { id: 'a' }, nextCue: { id: 'am' }, nextSection: { id: 'b' } });
    expect(selectGuideFrame(minimalGuide, 16)).toMatchObject({ currentCue: null, currentSection: null, nextCue: { id: 'am' }, nextSection: { id: 'b' } });
    expect(selectGuideFrame(minimalGuide, 0).nextCue?.id).toBe('rest-a');
    expect(selectGuideFrame(minimalGuide, 6).nextCue?.id).toBe('g');
    expect(selectGuideFrame(minimalGuide, 30)).toMatchObject({ nextCue: null, nextSection: null });
    expect(selectGuideFrame(minimalGuide, 36)).toMatchObject({ currentCue: null, nextCue: null });
  });
  it.each([NaN, Infinity, -Infinity, -1, null, undefined, '6', {}, true])('rejects unusable time %s without inventing a cue', seconds => {
    expect(selectGuideFrame(minimalGuide, seconds)).toEqual({ status: 'invalid-time', currentCue: null, nextCue: null, currentSection: null, nextSection: null });
  });
  const source = minimalGuide.sourceTiming;
  it.each([
    ['null', null], ['empty', {}], ['empty sections', { ...minimalGuide, sections: [] }],
    ['duplicate section', { ...minimalGuide, sections: [...minimalGuide.sections, minimalGuide.sections[0]] }],
    ['blank name', { ...minimalGuide, sections: [{ id: 'a', name: ' ' }, minimalGuide.sections[1]] }],
    ['duplicate cue', { ...minimalGuide, cues: [...minimalGuide.cues, minimalGuide.cues[0]] }],
    ['missing section reference', { ...minimalGuide, cues: minimalGuide.cues.map(cue => ({ ...cue, sectionId: 'missing' })) }],
    ['empty chord', { ...minimalGuide, cues: minimalGuide.cues.map(cue => cue.kind === 'chord' ? { ...cue, symbol: '' } : cue) }],
    ['unsupported kind', { ...minimalGuide, cues: minimalGuide.cues.map(cue => ({ ...cue, kind: 'note' })) }],
    ['invalid musical duration', { ...minimalGuide, cues: minimalGuide.cues.map(cue => ({ ...cue, musical: { ...cue.musical, durationBeats: 0 } })) }],
    ['invalid bar', { ...minimalGuide, cues: minimalGuide.cues.map(cue => ({ ...cue, musical: { ...cue.musical, bar: 1.5 } })) }],
    ['invalid beat', { ...minimalGuide, cues: minimalGuide.cues.map(cue => ({ ...cue, musical: { ...cue.musical, beat: NaN } })) }],
    ['missing mapping', { ...minimalGuide, sourceTiming: { ...source, cues: source.cues.slice(1) } }],
    ['dangling mapping', { ...minimalGuide, sourceTiming: { ...source, cues: source.cues.map(window => ({ ...window, id: 'missing' })) } }],
    ['duplicate mapping', { ...minimalGuide, sourceTiming: { ...source, cues: source.cues.map(window => ({ ...window, id: 'c' })) } }],
    ['negative start', { ...minimalGuide, sourceTiming: { ...source, cues: source.cues.map(window => ({ ...window, startSeconds: -1 })) } }],
    ['infinite end', { ...minimalGuide, sourceTiming: { ...source, cues: source.cues.map(window => ({ ...window, endSeconds: Infinity })) } }],
    ['zero duration', { ...minimalGuide, sourceTiming: { ...source, cues: source.cues.map(window => ({ ...window, endSeconds: window.startSeconds })) } }],
    ['overlap', { ...minimalGuide, sourceTiming: { ...source, cues: source.cues.map(window => ({ ...window, endSeconds: 100 })) } }],
    ['unsorted', { ...minimalGuide, sourceTiming: { ...source, cues: [...source.cues].reverse() } }],
    ['outside section', { ...minimalGuide, sourceTiming: { ...source, sections: [{ id: 'a', startSeconds: 0, endSeconds: 10 }, source.sections[1]] } }],
    ['section overlap', { ...minimalGuide, sourceTiming: { ...source, sections: [{ id: 'a', startSeconds: 0, endSeconds: 25 }, source.sections[1]] } }],
  ])('rejects invalid fixture: %s', (_name, guide) => {
    expect(selectGuideFrame(guide, 0)).toEqual({ status: 'invalid-guide', currentCue: null, nextCue: null, currentSection: null, nextSection: null });
  });
});

describe('section navigation uses the port, not optimistic selection', () => {
  it('keeps paused intent, waits for observations and supports repeated forward/backward requests', () => {
    const f = fixture();
    const before = JSON.stringify(minimalGuide);
    expect(requestSectionNavigation(minimalGuide, 'b', f.port)).toEqual({ status: 'requested', sectionId: 'b', targetSeconds: 20, preservePause: true });
    expect(f.port.seekTo).toHaveBeenCalledWith(20);
    expect(f.port.pause).toHaveBeenCalledOnce();
    expect(f.port.play).not.toHaveBeenCalled();
    expect(selectGuideFrame(minimalGuide, f.port.snapshot().seconds).currentCue?.id).toBe('c');
    f.observe({ state: 'buffering', seconds: 3 });
    expect(selectGuideFrame(minimalGuide, f.port.snapshot().seconds).currentCue?.id).toBe('c');
    f.observe({ state: 'paused', seconds: 20 });
    expect(selectGuideFrame(minimalGuide, f.port.snapshot().seconds).currentCue?.id).toBe('am');
    requestSectionNavigation(minimalGuide, 'a', f.port);
    expect(selectGuideFrame(minimalGuide, f.port.snapshot().seconds).currentCue?.id).toBe('am');
    f.observe({ seconds: 0 });
    expect(selectGuideFrame(minimalGuide, f.port.snapshot().seconds).currentCue?.id).toBe('c');
    expect(JSON.stringify(minimalGuide)).toBe(before);
  });
  it('does not synthesize progress during pause or buffering', () => {
    const f = fixture();
    for (const state of ['paused', 'buffering'] as const) {
      f.observe({ state, seconds: 6 });
      for (let i = 0; i < 100; i++) expect(selectGuideFrame(minimalGuide, f.port.snapshot().seconds).currentCue?.kind).toBe('rest');
    }
  });
  it('does not pause or issue play when navigating during observed playback', () => {
    const f = fixture(); f.observe({ state: 'playing' });
    expect(requestSectionNavigation(minimalGuide, 'b', f.port)).toMatchObject({ status: 'requested', preservePause: false });
    expect(f.port.seekTo).toHaveBeenCalledExactlyOnceWith(20);
    expect(f.port.pause).not.toHaveBeenCalled(); expect(f.port.play).not.toHaveBeenCalled();
  });
  it.each<PlayerState>(['idle', 'loading', 'buffering', 'ended', 'error', 'disposed'])('refuses a seek from %s, including cued/idle', state => {
    const f = fixture(); f.observe({ state });
    expect(requestSectionNavigation(minimalGuide, 'b', f.port)).toMatchObject({ status: 'unavailable', reason: 'unsafe-state' });
    expect(f.port.seekTo).not.toHaveBeenCalled();
  });
  it('rejects missing readiness, provider error, unknown section and invalid data without commands', () => {
    const f = fixture(); f.observe({ ready: false });
    expect(requestSectionNavigation(minimalGuide, 'a', f.port)).toMatchObject({ reason: 'player-unavailable' });
    f.observe({ ready: true, error: { code: '5', phase: 'provider', elapsedMs: 1 } });
    expect(requestSectionNavigation(minimalGuide, 'a', f.port)).toMatchObject({ reason: 'player-unavailable' });
    expect(requestSectionNavigation(minimalGuide, 'unknown', f.port)).toMatchObject({ reason: 'unknown-section' });
    expect(requestSectionNavigation({}, 'a', f.port)).toMatchObject({ reason: 'invalid-guide' });
    expect(f.port.seekTo).not.toHaveBeenCalled(); expect(f.port.pause).not.toHaveBeenCalled();
  });
});
