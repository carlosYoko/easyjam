import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import process from 'node:process';
import { afterEach, describe, expect, it } from 'vitest';
import type { AnalysisManifest } from '../../src/application/analysis-evaluation.ts';

// Real subprocess/filesystem checks; contents are deliberately synthetic, never song media.
const dirs: string[] = [];
afterEach(() => { for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true }); });
function setup() {
  const dir = mkdtempSync(join(tmpdir(), 'easyjam-s06-cli-')); dirs.push(dir);
  const bytes = 'synthetic contract bytes; not audio';
  writeFileSync(join(dir, 'synthetic.bin'), bytes);
  const manifest: AnalysisManifest = {
    schemaVersion: 1, units: 'seconds',
    source: { path: 'synthetic.bin', sha256: createHash('sha256').update(bytes).digest('hex'), recordingId: 'synthetic', durationSeconds: 10 },
    clearance: { status: 'accepted', evidenceId: 'synthetic-review-not-real-clearance', analysis: true, transcription: true, derivatives: true, retention: true },
    reference: { status: 'accepted', id: 'synthetic-reference', sha256: 'b'.repeat(64), recordingId: 'synthetic', youtubeVideoId: 'abcdefghijk' },
    engine: { id: 'not-installed', version: 'test-version', configHash: 'c'.repeat(64) },
  };
  const input = join(dir, 'manifest.json'); const output = join(dir, 'report.json');
  function run(extra?: string[]) {
    writeFileSync(input, JSON.stringify(manifest));
    return invoke(extra ?? ['--manifest', input, '--output', output]);
  }
  return { dir, manifest, input, output, run };
}
function invoke(args: string[]) {
  const child = spawnSync(process.execPath, [resolve('scripts/evaluate-song.ts'), ...args], { encoding: 'utf8', timeout: 10000, shell: false });
  expect(child.error).toBeUndefined(); expect(child.signal).toBeNull();
  expect(child.stderr).toBe('');
  const report = JSON.parse(child.stdout) as Record<string, unknown>;
  expect(child.status).toBe(1); expect(report.accepted).toBe(false); expect(report.status).toBe('error');
  expect(report).not.toHaveProperty('original');
  expect(report.runId).toMatch(/^[a-f0-9-]{36}$/);
  expect(Number.isFinite(Date.parse(String(report.startedAt)))).toBe(true);
  expect(Date.parse(String(report.finishedAt))).toBeGreaterThanOrEqual(Date.parse(String(report.startedAt)));
  expect(report.runtime).toEqual({ node: process.versions.node });
  return report;
}
describe('S06 executable CLI and durable safe failure reports', () => {
  it('streams/checks real file bytes, then reports no production engine with no fake output', () => {
    const f = setup(); const report = f.run();
    expect(report).toMatchObject({ phase: 'analysis', error: { code: 'ENGINE_UNAVAILABLE' }, provenance: { inputSha256: f.manifest.source.sha256, actualSha256: f.manifest.source.sha256, configHash: 'c'.repeat(64) } });
    expect(JSON.parse(readFileSync(f.output, 'utf8'))).toEqual(report);
  });
  it.each(['clearance', 'reference'] as const)('rejects pending %s before opening even a nonexistent source', key => {
    const f = setup(); f.manifest[key].status = 'pending'; f.manifest.source.path = 'missing.bin';
    expect(f.run()).toMatchObject({ phase: 'input', error: { code: key === 'clearance' ? 'PERMISSION_REQUIRED' : 'REFERENCE_REQUIRED' } });
  });
  it('rejects missing source and hash mismatch with distinct errors', () => {
    const missing = setup(); missing.manifest.source.path = 'missing.bin';
    expect(missing.run()).toMatchObject({ phase: 'input', error: { code: 'SOURCE_UNREADABLE' } });
    const wrong = setup(); wrong.manifest.source.sha256 = 'd'.repeat(64);
    expect(wrong.run()).toMatchObject({ phase: 'input', error: { code: 'CHECKSUM_MISMATCH' } });
  });
  it.each(['', '{bad json', ' '.repeat(65537)])('rejects unreadable, malformed or oversized manifest without leaking contents', contents => {
    const f = setup(); writeFileSync(f.input, contents);
    expect(invoke(['--manifest', f.input, '--output', f.output])).toMatchObject({ phase: 'input', error: { code: 'MANIFEST_UNREADABLE' } });
  });
  it('reports a missing manifest and invalid schema safely', () => {
    const f = setup();
    expect(invoke(['--manifest', f.input, '--output', f.output])).toMatchObject({ error: { code: 'MANIFEST_UNREADABLE' } });
    const g = setup(); writeFileSync(g.input, '{}');
    expect(invoke(['--manifest', g.input, '--output', g.output])).toMatchObject({ error: { code: 'INVALID_MANIFEST' } });
  });
  it.each([[], ['--manifest'], ['--manifest', 'x', '--manifest', 'y'], ['--manifest', 'https://example.test/x', '--output', 'report.json'], ['--manifest', 'x', '--output', 'https://example.test/out']].map(args => ({ args })))('rejects malformed arguments $args', ({ args }) => {
    expect(invoke(args)).toMatchObject({ phase: 'input', error: { code: 'INVALID_ARGUMENTS' } });
  });
  it('does not overwrite existing output or turn a failed report write into success', () => {
    const f = setup(); writeFileSync(f.output, 'preserved');
    expect(f.run()).toMatchObject({ phase: 'report', error: { code: 'REPORT_WRITE_FAILED' } });
    expect(readFileSync(f.output, 'utf8')).toBe('preserved');
  });
  it('reports a missing output parent and refuses directory source files', () => {
    const f = setup();
    expect(f.run(['--manifest', f.input, '--output', join(f.dir, 'missing', 'report.json')])).toMatchObject({ phase: 'report', error: { code: 'REPORT_WRITE_FAILED' } });
    const g = setup(); mkdirSync(join(g.dir, 'directory')); g.manifest.source.path = 'directory';
    expect(g.run()).toMatchObject({ error: { code: 'SOURCE_UNREADABLE' } });
  });
  it('redacts personal paths, free text and thrown filesystem details from stdout and persisted diagnostics', () => {
    const f = setup(); f.manifest.clearance.evidenceId = 'sensitive-evidence-text'; f.manifest.engine.id = 'sensitive-engine-text';
    f.manifest.source.path = join(f.dir, 'private-source.bin');
    const report = f.run(); const text = JSON.stringify(report);
    for (const secret of [f.dir, 'private-source', 'sensitive-evidence', 'sensitive-engine', 'ENOENT', 'stack']) expect(text).not.toContain(secret);
    expect(JSON.parse(readFileSync(f.output, 'utf8'))).toEqual(report);
  });
});
