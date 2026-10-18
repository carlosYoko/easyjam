import type { PlayerPort } from './player-port';

// A technical fixture contract, not the arrangement schema planned for S02.
export interface GuideSection { readonly id: string; readonly name: string }
export type GuideCue = {
  readonly id: string;
  readonly sectionId: string;
  readonly musical: { readonly bar: number; readonly beat: number; readonly durationBeats: number };
} & ({ readonly kind: 'chord'; readonly symbol: string } | { readonly kind: 'rest' });
export interface GuideWindow { readonly id: string; readonly startSeconds: number; readonly endSeconds: number }
export interface TechnicalGuide {
  readonly sections: readonly GuideSection[];
  readonly cues: readonly GuideCue[];
  readonly sourceTiming: {
    readonly sections: readonly GuideWindow[];
    readonly cues: readonly GuideWindow[];
  };
}
export interface GuideFrame {
  readonly status: 'ready' | 'invalid-guide' | 'invalid-time';
  readonly currentSection: GuideSection | null;
  readonly nextSection: GuideSection | null;
  readonly currentCue: GuideCue | null;
  readonly nextCue: GuideCue | null;
}

const record = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const text = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const finite = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
const positive = (value: unknown): value is number => finite(value) && value > 0;
function validWindows(value: unknown, ids: ReadonlySet<string>): value is readonly GuideWindow[] {
  if (!Array.isArray(value) || value.length !== ids.size) return false;
  const seen = new Set<string>();
  let previousEnd = 0;
  for (const window of value) {
    if (!record(window) || !text(window.id) || !ids.has(window.id) || seen.has(window.id)
      || !finite(window.startSeconds) || !finite(window.endSeconds)
      || window.startSeconds < previousEnd || window.endSeconds <= window.startSeconds) return false;
    seen.add(window.id);
    previousEnd = window.endSeconds;
  }
  return true;
}
function validGuide(value: unknown): value is TechnicalGuide {
  if (!record(value) || !Array.isArray(value.sections) || !value.sections.length
    || !Array.isArray(value.cues) || !value.cues.length || !record(value.sourceTiming)) return false;
  const sections = new Set<string>();
  for (const section of value.sections) {
    if (!record(section) || !text(section.id) || !text(section.name) || sections.has(section.id)) return false;
    sections.add(section.id);
  }
  const cues = new Set<string>();
  for (const cue of value.cues) {
    if (!record(cue) || !text(cue.id) || cues.has(cue.id) || !text(cue.sectionId) || !sections.has(cue.sectionId)
      || !record(cue.musical) || !positive(cue.musical.bar) || !Number.isInteger(cue.musical.bar)
      || !positive(cue.musical.beat) || !positive(cue.musical.durationBeats)
      || (cue.kind !== 'rest' && (cue.kind !== 'chord' || !text(cue.symbol)))) return false;
    cues.add(cue.id);
  }
  if (!validWindows(value.sourceTiming.sections, sections) || !validWindows(value.sourceTiming.cues, cues)) return false;
  // Every cue window must be contained in its referenced section. Gaps are allowed.
  for (const window of value.sourceTiming.cues) {
    const cue = value.cues.find(cue => cue.id === window.id);
    const section = value.sourceTiming.sections.find(section => section.id === cue.sectionId);
    if (!section || window.startSeconds < section.startSeconds || window.endSeconds > section.endSeconds) return false;
  }
  return true;
}
const emptyFrame = (status: GuideFrame['status']): GuideFrame => ({ status, currentSection: null, nextSection: null, currentCue: null, nextCue: null });

/** Select only from observed seconds. No clock, requested destination or provider dependency. */
export function selectGuideFrame(guide: unknown, seconds: unknown): GuideFrame {
  if (!validGuide(guide)) return emptyFrame('invalid-guide');
  if (!finite(seconds) || seconds < 0) return emptyFrame('invalid-time');
  const current = (windows: readonly GuideWindow[]) => windows.find(window => seconds >= window.startSeconds && seconds < window.endSeconds)?.id;
  const next = (windows: readonly GuideWindow[]) => windows.find(window => window.startSeconds > seconds)?.id;
  return {
    status: 'ready',
    currentSection: guide.sections.find(section => section.id === current(guide.sourceTiming.sections)) ?? null,
    nextSection: guide.sections.find(section => section.id === next(guide.sourceTiming.sections)) ?? null,
    currentCue: guide.cues.find(cue => cue.id === current(guide.sourceTiming.cues)) ?? null,
    nextCue: guide.cues.find(cue => cue.id === next(guide.sourceTiming.cues)) ?? null,
  };
}

export type GuideNavigation =
  | { readonly status: 'requested'; readonly sectionId: string; readonly targetSeconds: number; readonly preservePause: boolean }
  | { readonly status: 'unavailable'; readonly reason: 'invalid-guide' | 'unknown-section' | 'player-unavailable' | 'unsafe-state' };

/** A request is diagnostic information, never proof of arrival. */
export function requestSectionNavigation(guide: unknown, sectionId: string, player: PlayerPort): GuideNavigation {
  if (!validGuide(guide)) return { status: 'unavailable', reason: 'invalid-guide' };
  const window = guide.sourceTiming.sections.find(section => section.id === sectionId);
  if (!window) return { status: 'unavailable', reason: 'unknown-section' };
  const observed = player.snapshot();
  if (!observed.ready || observed.error) return { status: 'unavailable', reason: 'player-unavailable' };
  // A seek from cued/idle may start playback. Require an observed play/pause first.
  if (observed.state !== 'playing' && observed.state !== 'paused') return { status: 'unavailable', reason: 'unsafe-state' };
  player.seekTo(window.startSeconds);
  if (observed.state === 'paused') player.pause();
  return { status: 'requested', sectionId, targetSeconds: window.startSeconds, preservePause: observed.state === 'paused' };
}
