// S06 experiment contracts, not the persisted product transcription model.
export interface AnalysisManifest {
  schemaVersion: 1;
  units: 'seconds';
  source: { path: string; sha256: string; recordingId: string; durationSeconds: number };
  clearance: {
    status: 'pending' | 'accepted'; evidenceId: string;
    analysis: boolean; transcription: boolean; derivatives: boolean; retention: boolean;
  };
  reference: { status: 'pending' | 'accepted'; id: string; sha256: string; recordingId: string; youtubeVideoId: string };
  engine: { id: string; version: string; configHash: string };
}
type Interval = { startSeconds: number; endSeconds: number };
export type HarmonyObservation = Interval & ({ kind: 'chord'; symbol: string } | { kind: 'unknown' | 'no-chord' });
export type GuitarObservation = Interval & ({ kind: 'note'; midi: number } | { kind: 'unknown' | 'rest' });
const unmeasured = ['beat', 'downbeat', 'meter', 'sections', 'alignment'] as const;
export interface NeutralOriginal {
  schemaVersion: 1; units: 'seconds'; recordingId: string; inputSha256: string;
  durationSeconds: number; engine: AnalysisManifest['engine'];
  harmony: HarmonyObservation[]; guitar: GuitarObservation[];
  unmeasured: typeof unmeasured[number][];
}
export type EvaluationPhase = 'input' | 'analysis' | 'validation' | 'report';
export type EvaluationErrorCode =
  | 'INVALID_ARGUMENTS' | 'MANIFEST_UNREADABLE' | 'INVALID_MANIFEST'
  | 'PERMISSION_REQUIRED' | 'REFERENCE_REQUIRED' | 'SOURCE_UNREADABLE' | 'CHECKSUM_MISMATCH'
  | 'ENGINE_UNAVAILABLE' | 'ENGINE_FAILED' | 'INVALID_OUTPUT' | 'REPORT_WRITE_FAILED';
export type EvaluationFailure = { status: 'error'; accepted: false; phase: EvaluationPhase; error: { code: EvaluationErrorCode } };
export type EvaluationResult = EvaluationFailure | { status: 'completed'; accepted: false; phase: 'validation'; original: NeutralOriginal };
export type AnalysisAdapter = (manifest: AnalysisManifest) => Promise<unknown>;

export function failure(phase: EvaluationPhase, code: EvaluationErrorCode): EvaluationFailure {
  return { status: 'error', accepted: false, phase, error: { code } };
}
class ContractError extends Error {
  readonly code: EvaluationErrorCode;
  constructor(code: EvaluationErrorCode) { super(code); this.code = code; }
}
function reject(code: EvaluationErrorCode = 'INVALID_MANIFEST'): never { throw new ContractError(code); }
function record(value: unknown, keys: readonly string[]): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) reject();
  const object = value as Record<string, unknown>;
  if (Object.keys(object).length !== keys.length || keys.some(key => !Object.hasOwn(object, key))) reject();
  return object;
}
function safeText(value: unknown): value is string {
  return typeof value === 'string' && !!value.trim() && value.length <= 4096
    && !Array.from(value).some(char => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127);
}
function text(value: unknown): asserts value is string { if (!safeText(value)) reject(); }
export function isLocalFilePath(value: unknown): value is string {
  return safeText(value) && !/^[\\/]{2}/.test(value)
    && (!/^[a-z][a-z\d+.-]*:/i.test(value) || /^[a-z]:[\\/]/i.test(value));
}
function hash(value: unknown) { if (typeof value !== 'string' || !/^[a-f0-9]{64}$/.test(value)) reject(); }
function positive(value: unknown): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) reject();
}
function status(value: unknown) { if (value !== 'accepted' && value !== 'pending') reject(); }
function engine(value: unknown) {
  const e = record(value, ['id', 'version', 'configHash']); text(e.id); text(e.version); hash(e.configHash);
}

/** Structural validation only. An accepted flag must refer to a separately reviewed T07 record. */
export function validateManifest(input: unknown): AnalysisManifest {
  const m = record(input, ['schemaVersion', 'units', 'source', 'clearance', 'reference', 'engine']);
  if (m.schemaVersion !== 1 || m.units !== 'seconds') reject();
  const s = record(m.source, ['path', 'sha256', 'recordingId', 'durationSeconds']);
  // Local filesystem only; allow Windows drive paths, never URL schemes or UNC/network paths.
  if (!isLocalFilePath(s.path)) reject();
  hash(s.sha256); text(s.recordingId); positive(s.durationSeconds);
  const c = record(m.clearance, ['status', 'evidenceId', 'analysis', 'transcription', 'derivatives', 'retention']);
  status(c.status); text(c.evidenceId);
  for (const key of ['analysis', 'transcription', 'derivatives', 'retention']) if (typeof c[key] !== 'boolean') reject();
  const r = record(m.reference, ['status', 'id', 'sha256', 'recordingId', 'youtubeVideoId']);
  status(r.status); text(r.id); hash(r.sha256); text(r.recordingId);
  if (r.recordingId !== s.recordingId || typeof r.youtubeVideoId !== 'string' || !/^[A-Za-z0-9_-]{11}$/.test(r.youtubeVideoId)) reject();
  engine(m.engine);
  // Return an owned snapshot rather than retaining the caller's mutable input.
  return structuredClone(input) as AnalysisManifest;
}
export function requireAnalysisGate(m: AnalysisManifest): void {
  if (m.clearance.status !== 'accepted' || !m.clearance.analysis || !m.clearance.transcription || !m.clearance.derivatives || !m.clearance.retention) reject('PERMISSION_REQUIRED');
  if (m.reference.status !== 'accepted') reject('REFERENCE_REQUIRED');
}
export function inputFailure(error: unknown): EvaluationFailure {
  return failure('input', error instanceof ContractError ? error.code : 'INVALID_MANIFEST');
}
function observations(value: unknown, duration: number, dimension: 'harmony' | 'guitar') {
  if (!Array.isArray(value)) reject();
  let previousStart = -1;
  let previousEnd = 0;
  let blockedUntil = 0;
  for (const item of value) {
    if (!item || typeof item !== 'object') reject();
    const kind: unknown = (item as Record<string, unknown>).kind;
    const extra = dimension === 'harmony' && kind === 'chord' ? ['symbol'] : dimension === 'guitar' && kind === 'note' ? ['midi'] : [];
    const o = record(item, ['kind', 'startSeconds', 'endSeconds', ...extra]);
    if (typeof kind !== 'string') reject();
    if (dimension === 'harmony' ? !['chord', 'no-chord', 'unknown'].includes(kind) : !['note', 'rest', 'unknown'].includes(kind)) reject();
    if (typeof o.startSeconds !== 'number' || !Number.isFinite(o.startSeconds) || o.startSeconds < 0) reject();
    positive(o.endSeconds);
    if (o.endSeconds <= o.startSeconds || o.endSeconds > duration || o.startSeconds < previousStart) reject();
    // Harmony is a single timeline. Guitar notes may overlap (polyphony), but rests/unknowns may not overlap any event.
    if (dimension === 'harmony' && o.startSeconds < previousEnd) reject();
    if (extra[0] === 'symbol') text(o.symbol);
    if (extra[0] === 'midi' && (typeof o.midi !== 'number' || !Number.isInteger(o.midi) || o.midi < 0 || o.midi > 127)) reject();
    if (dimension === 'guitar') {
      if (o.startSeconds < (kind === 'note' ? blockedUntil : previousEnd)) reject();
      if (kind !== 'note') blockedUntil = o.endSeconds;
    }
    previousStart = o.startSeconds; previousEnd = Math.max(previousEnd, o.endSeconds);
  }
}
/** Missing intervals remain unknown, never inferred rests. N.C. is explicitly not a guitar rest. */
export function validateOriginal(input: unknown, m: AnalysisManifest): NeutralOriginal {
  const o = record(input, ['schemaVersion', 'units', 'recordingId', 'inputSha256', 'durationSeconds', 'engine', 'harmony', 'guitar', 'unmeasured']);
  if (o.schemaVersion !== 1 || o.units !== 'seconds' || o.recordingId !== m.source.recordingId || o.inputSha256 !== m.source.sha256 || o.durationSeconds !== m.source.durationSeconds) reject('INVALID_OUTPUT');
  engine(o.engine);
  const e = o.engine as Record<string, unknown>;
  if (e.id !== m.engine.id || e.version !== m.engine.version || e.configHash !== m.engine.configHash) reject('INVALID_OUTPUT');
  observations(o.harmony, m.source.durationSeconds, 'harmony'); observations(o.guitar, m.source.durationSeconds, 'guitar');
  if (!Array.isArray(o.unmeasured) || o.unmeasured.length !== unmeasured.length || unmeasured.some((d, i) => o.unmeasured instanceof Array && o.unmeasured[i] !== d)) reject('INVALID_OUTPUT');
  return structuredClone(input) as NeutralOriginal;
}
export async function evaluateAnalysis(input: unknown, analyze?: AnalysisAdapter): Promise<EvaluationResult> {
  let m: AnalysisManifest;
  try { m = validateManifest(input); requireAnalysisGate(m); } catch (error) { return inputFailure(error); }
  if (!analyze) return failure('analysis', 'ENGINE_UNAVAILABLE');
  let raw: unknown;
  try { raw = await analyze(structuredClone(m)); } catch { return failure('analysis', 'ENGINE_FAILED'); }
  try { return { status: 'completed', accepted: false, phase: 'validation', original: validateOriginal(raw, m) }; }
  catch { return failure('validation', 'INVALID_OUTPUT'); }
}
