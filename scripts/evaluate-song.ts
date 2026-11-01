import { createHash, randomUUID } from 'node:crypto';
import { open, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import {
  evaluateAnalysis, failure, inputFailure, isLocalFilePath, requireAnalysisGate, validateManifest,
  type AnalysisManifest, type EvaluationFailure, type EvaluationResult,
} from '../src/application/analysis-evaluation.ts';

const startedAt = new Date().toISOString();
const runId = randomUUID();
const args = process.argv.slice(2);
let output: string | undefined;
let result: EvaluationResult = failure('input', 'INVALID_ARGUMENTS');
let manifest: AnalysisManifest | undefined;
let actualSha256: string | undefined;

async function readManifest(path: string): Promise<unknown> {
  const file = await open(path, 'r');
  try {
    const stat = await file.stat();
    if (!stat.isFile() || stat.size > 65536) throw new Error('MANIFEST_UNREADABLE');
    // Bounded read even if a file grows after stat.
    const bytes = new Uint8Array(65537);
    const { bytesRead } = await file.read(bytes, 0, bytes.length, 0);
    if (bytesRead > 65536) throw new Error('MANIFEST_UNREADABLE');
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes.subarray(0, bytesRead))) as unknown;
  } finally { await file.close(); }
}
async function hashSource(path: string): Promise<string> {
  const file = await open(path, 'r');
  try {
    const stat = await file.stat();
    if (!stat.isFile() || stat.size === 0) throw new Error('SOURCE_UNREADABLE');
    const hash = createHash('sha256');
    for await (const chunk of file.createReadStream({ autoClose: false })) hash.update(chunk);
    return hash.digest('hex');
  } finally { await file.close(); }
}
async function evaluateFile(manifestPath: string): Promise<EvaluationResult> {
  let input: unknown;
  try { input = await readManifest(manifestPath); }
  catch { return failure('input', 'MANIFEST_UNREADABLE'); }
  try { manifest = validateManifest(input); requireAnalysisGate(manifest); }
  catch (error) { return inputFailure(error); }
  try { actualSha256 = await hashSource(resolve(dirname(manifestPath), manifest.source.path)); }
  catch { return failure('input', 'SOURCE_UNREADABLE'); }
  if (actualSha256 !== manifest.source.sha256) return failure('input', 'CHECKSUM_MISMATCH');
  // T02 intentionally has no production adapter. No fixture or synthetic engine is wired here.
  return evaluateAnalysis(manifest);
}

if (args.length === 4) {
  const flags = new Map([[args[0], args[1]], [args[2], args[3]]]);
  const manifestPath = flags.get('--manifest');
  const reportPath = flags.get('--output');
  if (flags.size === 2 && manifestPath && reportPath && isLocalFilePath(manifestPath) && isLocalFilePath(reportPath)) {
    output = resolve(reportPath);
    result = await evaluateFile(resolve(manifestPath));
  }
}
function report(value: EvaluationResult | EvaluationFailure) {
  return JSON.stringify({
    schemaVersion: 1, runId, startedAt, finishedAt: new Date().toISOString(),
    runtime: { node: process.versions.node },
    // Never copy paths, evidence prose, URLs, engine-provided text or thrown details into diagnostics.
    provenance: manifest ? { inputSha256: manifest.source.sha256, actualSha256, configHash: manifest.engine.configHash, referenceSha256: manifest.reference.sha256 } : undefined,
    ...value,
  }, null, 2) + '\n';
}
let serialized = report(result);
if (output) {
  try { await writeFile(output, serialized, { encoding: 'utf8', flag: 'wx', mode: 0o600 }); }
  catch { result = failure('report', 'REPORT_WRITE_FAILED'); serialized = report(result); }
}
process.stdout.write(serialized);
process.exitCode = result.status === 'completed' ? 0 : 1;
