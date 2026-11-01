import { describe, expect, it, vi } from 'vitest';
import {
  evaluateAnalysis, validateManifest, validateOriginal,
  type AnalysisManifest,
} from '../../src/application/analysis-evaluation.ts';

// Synthetic contract data only: not an accepted song or a musical reference.
export function manifest(): AnalysisManifest {
  return {
    schemaVersion: 1, units: 'seconds',
    source: { path: 'synthetic.mp3', sha256: 'a'.repeat(64), recordingId: 'synthetic-recording', durationSeconds: 10 },
    clearance: { status: 'accepted', evidenceId: 'synthetic-review', analysis: true, transcription: true, derivatives: true, retention: true },
    reference: { status: 'accepted', id: 'synthetic-reference', sha256: 'b'.repeat(64), recordingId: 'synthetic-recording', youtubeVideoId: 'abcdefghijk' },
    engine: { id: 'test-double', version: '1.0', configHash: 'c'.repeat(64) },
  };
}
function original() {
  const m = manifest();
  return {
    schemaVersion: 1, units: 'seconds', recordingId: m.source.recordingId,
    inputSha256: m.source.sha256, durationSeconds: 10, engine: m.engine,
    harmony: [{ kind: 'chord', startSeconds: 0, endSeconds: 5, symbol: 'C' }, { kind: 'unknown', startSeconds: 5, endSeconds: 10 }],
    guitar: [{ kind: 'note', startSeconds: 0, endSeconds: 1, midi: 60 }, { kind: 'rest', startSeconds: 1, endSeconds: 2 }, { kind: 'unknown', startSeconds: 2, endSeconds: 10 }],
    unmeasured: ['beat', 'downbeat', 'meter', 'sections', 'alignment'],
  };
}
describe('S06 analysis boundary (synthetic contracts, not musical acceptance)', () => {
  it('validates an explicit version, units and provenance without interpreting it as permission proof', () => {
    expect(validateManifest(manifest())).toEqual(manifest());
  });
  it.each([null, [], {}, { ...manifest(), schemaVersion: 2 }, { ...manifest(), units: 'ticks' }])('rejects invalid manifest/version/units: %j', input => {
    expect(() => validateManifest(input)).toThrow();
  });
  it.each([0, -1, NaN, Infinity])('rejects impossible source duration %s', durationSeconds => {
    expect(() => validateManifest({ ...manifest(), source: { ...manifest().source, durationSeconds } })).toThrow();
  });
  it.each(['', 'https://example.test/audio', 'audio\u0000.mp3'])('rejects absent or nonlocal input paths', path => {
    expect(() => validateManifest({ ...manifest(), source: { ...manifest().source, path } })).toThrow();
  });
  it('rejects malformed hashes, unknown fields and mismatched recording identity', () => {
    expect(() => validateManifest({ ...manifest(), secret: 'not-allowed' })).toThrow();
    expect(() => validateManifest({ ...manifest(), source: { ...manifest().source, sha256: 'bad' } })).toThrow();
    expect(() => validateManifest({ ...manifest(), reference: { ...manifest().reference, recordingId: 'other' } })).toThrow();
  });
  it.each(['analysis', 'transcription', 'derivatives', 'retention'] as const)('refuses missing %s clearance before invoking an adapter', async key => {
    const analyze = vi.fn();
    const m = manifest(); m.clearance[key] = false;
    expect(await evaluateAnalysis(m, analyze)).toMatchObject({ status: 'error', accepted: false, phase: 'input', error: { code: 'PERMISSION_REQUIRED' } });
    expect(analyze).not.toHaveBeenCalled();
  });
  it.each(['clearance', 'reference'] as const)('requires the T07 %s gate', async key => {
    const m = manifest(); m[key].status = 'pending';
    const analyze = vi.fn();
    expect(await evaluateAnalysis(m, analyze)).toMatchObject({ accepted: false, phase: 'input', error: { code: key === 'clearance' ? 'PERMISSION_REQUIRED' : 'REFERENCE_REQUIRED' } });
    expect(analyze).not.toHaveBeenCalled();
  });
  it('reports an absent engine explicitly, never a successful empty transcription', async () => {
    expect(await evaluateAnalysis(manifest())).toEqual({ status: 'error', accepted: false, phase: 'analysis', error: { code: 'ENGINE_UNAVAILABLE' } });
  });
  it('validates neutral output while preserving unknown, no-chord and explicit rest as different facts', () => {
    expect(validateOriginal(original(), manifest())).toEqual(original());
    const o = original(); o.harmony = [{ kind: 'no-chord', startSeconds: 0, endSeconds: 10 }];
    expect(validateOriginal(o, manifest()).harmony[0]?.kind).toBe('no-chord');
    expect(validateOriginal(o, manifest()).guitar[1]?.kind).toBe('rest');
  });
  it.each([NaN, Infinity, -1, 0, 11])('rejects invalid event end %s', endSeconds => {
    const o = original(); o.harmony[0]!.endSeconds = endSeconds;
    expect(() => validateOriginal(o, manifest())).toThrow();
  });
  it('rejects out-of-range notes, overlaps, false certainty and inconsistent provenance', () => {
    expect(() => validateOriginal({ ...original(), guitar: [{ kind: 'note', startSeconds: 0, endSeconds: 1, midi: 128 }] }, manifest())).toThrow();
    expect(() => validateOriginal({ ...original(), harmony: [{ kind: 'unknown', startSeconds: 0, endSeconds: 6 }, { kind: 'chord', startSeconds: 5, endSeconds: 10, symbol: 'C' }] }, manifest())).toThrow();
    expect(() => validateOriginal({ ...original(), accepted: true }, manifest())).toThrow();
    for (const patch of [{ inputSha256: 'd'.repeat(64) }, { recordingId: 'other' }, { durationSeconds: 9 }, { engine: { ...manifest().engine, configHash: 'd'.repeat(64) } }, { units: 'ticks' }]) {
      expect(() => validateOriginal({ ...original(), ...patch }, manifest())).toThrow();
    }
  });
  it('rejects coerced event tags rather than treating arrays as valid discriminants', () => {
    for (const dimension of ['harmony', 'guitar']) {
      for (const kind of [['unknown'], ['chord'], ['note'], null, 0, {}]) {
        expect(() => validateOriginal({ ...original(), [dimension]: [{ kind, startSeconds: 0, endSeconds: 1 }] }, manifest())).toThrow();
      }
    }
  });
  it('permits simultaneous notes but rejects a rest or unknown over any sounding note', () => {
    const notes = [{ kind: 'note', startSeconds: 0, endSeconds: 4, midi: 60 }, { kind: 'note', startSeconds: 0, endSeconds: 2, midi: 67 }];
    expect(validateOriginal({ ...original(), guitar: notes }, manifest()).guitar).toEqual(notes);
    for (const kind of ['rest', 'unknown']) {
      expect(() => validateOriginal({ ...original(), guitar: [...notes, { kind, startSeconds: 3, endSeconds: 5 }] }, manifest())).toThrow();
      expect(() => validateOriginal({ ...original(), guitar: [{ kind, startSeconds: 0, endSeconds: 2 }, { kind: 'note', startSeconds: 1, endSeconds: 3, midi: 60 }] }, manifest())).toThrow();
    }
  });
  it('returns validated test-double output as unaccepted, not quality evidence', async () => {
    const analyze = vi.fn().mockResolvedValue(original());
    expect(await evaluateAnalysis(manifest(), analyze)).toMatchObject({ status: 'completed', accepted: false, phase: 'validation', original: original() });
    expect(analyze).toHaveBeenCalledOnce();
  });
  it('discards invalid output and sanitizes thrown adapter details', async () => {
    const invalid = await evaluateAnalysis(manifest(), async () => ({ ...original(), accepted: true }));
    expect(invalid).toEqual({ status: 'error', accepted: false, phase: 'validation', error: { code: 'INVALID_OUTPUT' } });
    const failed = await evaluateAnalysis(manifest(), async () => { throw new Error('secret path/token'); });
    expect(failed).toEqual({ status: 'error', accepted: false, phase: 'analysis', error: { code: 'ENGINE_FAILED' } });
  });
});
