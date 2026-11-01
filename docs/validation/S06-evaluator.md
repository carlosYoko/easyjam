# S06 — Local evaluator contracts and diagnostics

Date: 2026-11-01
Status: T02 implemented and locally verified; no production analyzer, accepted material or musical quality result.

## Scope and execution

Run from the M001 worktree with the pinned Node 24.18.0 / pnpm 12.14.0 environment:

```sh
pnpm run evaluate:s06 --manifest <local-manifest.json> --output <new-local-report.json>
```

Both flags are mandatory, may occur in either order and cannot be repeated. Paths must be local filesystem paths, not URLs or UNC paths. Source paths are resolved relative to the manifest's directory, not the invocation directory. The report parent directory must already exist. Each invocation needs a new output path: an existing file is never overwritten. Keep manifests, media and reports outside versioned documents when they contain personal paths or protected material. The evaluator does not fetch URLs, extract YouTube, decode/transcribe music, invoke a shell, install an engine or create a database.

Node runs the CLI's erasable TypeScript directly; there is no new runtime dependency or transpiler. `@types/node` 24.19.2 and its `undici-types` 7.24.6 dependency are development-only, MIT licensed (installed license files inspected). Their peer-resolution updates do not change the existing Vue/Vite/Vitest versions. `scripts/**/*.ts` is included in the strict typecheck.

## Manifest version 1

The complete contract is `AnalysisManifest` in `src/application/analysis-evaluation.ts`. All fields are required and unknown properties are rejected, including in nested objects. The boundary receives `unknown` and validates it at runtime.

| Field | Contract |
| --- | --- |
| `schemaVersion`, `units` | Exactly `1` and `seconds`. Musical ticks and media seconds are not interchangeable. |
| `source` | Local `path`, lowercase 64-hex `sha256`, nonempty `recordingId`, finite positive `durationSeconds`. No arbitrary network input. |
| `clearance` | `status` pending/accepted, a nonempty `evidenceId`, and explicit boolean `analysis`, `transcription`, `derivatives`, `retention` permissions. All permissions must be true and status accepted before source access/analysis. |
| `reference` | pending/accepted `status`, nonempty `id`, lowercase 64-hex `sha256`, same `recordingId` as source, 11-character `youtubeVideoId`. A pending reference blocks processing. |
| `engine` | Nonempty requested `id` and `version`, lowercase 64-hex `configHash`. This describes a requested configuration, not proof an engine is installed. |

A manifest is limited to 64 KiB. The CLI validates its structure and gates, opens a nonempty regular source file and streams its SHA-256. It rejects a mismatch before reaching the engine boundary. It does not establish actual duration/format from metadata in T02; the duration is declared provenance to be independently checked in T07/T03.

**An `accepted` string is not legal or musical proof.** The evidence IDs/hashes must refer to the actual separately reviewed T07 record. This CLI is a local experiment boundary, not a rights-verification authority. T02 does not open or validate reference contents or grant permission based on self-declared flags. The current candidate remains unaccepted; no real-song accepted manifest was produced. Before wiring a production adapter in T03, retain the T07 review and verify the referenced artifacts and actual recording/format/version/configuration. Never promote the synthetic test manifests to accepted material.

## Neutral output boundary

`NeutralOriginal` version 1 is a minimal experiment output, not the product's persisted score/arrangement model. It requires explicit seconds, recording identity, input hash, declared duration and the same engine ID/version/config hash as the validated input.

- Harmony: ordered, nonoverlapping half-open intervals with `chord` + symbol, `no-chord`, or `unknown`.
- Guitar: ordered note/rest/unknown intervals; note MIDI is an integer 0–127. Notes may overlap for polyphony. A rest or unknown interval cannot overlap a note or another rest/unknown interval. Validation is linear in the number of events.
- Starts must be finite and nonnegative; ends finite, after start and within source duration. No negative/zero duration or out-of-order events.
- Missing intervals/empty arrays mean missing evidence, not inferred silence. `no-chord` is not a guitar rest. No chord reduction, rhythm invention, renderer or fingering is performed.
- `unmeasured` explicitly lists `beat`, `downbeat`, `meter`, `sections`, `alignment`. T02 intentionally does not model or claim measurements for those dimensions. A later version must extend this boundary when justified, rather than silently adding properties or pretending musical positions exist.

The application function `evaluateAnalysis` accepts an optional typed adapter. Only tests supply one. Its output is untrusted and validated; thrown details and invalid output are discarded. Even a structurally valid test-double result is `completed` with **`accepted: false`**: contract validity is not musical acceptance. The production CLI supplies no adapter and cannot currently produce a transcription or exit successfully.

## Failure/report contract

The CLI emits one JSON report to stdout and persists the same report when a valid, new output path is available. With invalid arguments no output destination is trusted, so diagnostics are stdout-only. Reports include schema version, run UUID, start/finish ISO timestamps, final phase, Node version, safe error code and `accepted: false`. After a structurally valid manifest is available, provenance includes only hashes: expected/actual input SHA-256 when available, config hash and reference hash. It does not copy source paths, evidence prose, arbitrary requested-engine text, URLs, exceptions or stacks.

| Code | Phase / meaning |
| --- | --- |
| `INVALID_ARGUMENTS` | input: flags/path syntax invalid |
| `MANIFEST_UNREADABLE` | input: missing/unreadable, invalid JSON/UTF-8, non-file or over 64 KiB |
| `INVALID_MANIFEST` | input: contract/version/units/identity/values invalid |
| `PERMISSION_REQUIRED` | input: clearance pending or any required permission false |
| `REFERENCE_REQUIRED` | input: reference pending |
| `SOURCE_UNREADABLE` | input: missing, unreadable, empty or non-file source |
| `CHECKSUM_MISMATCH` | input: streamed bytes differ from declared hash |
| `ENGINE_UNAVAILABLE` | analysis: expected T02 result after otherwise valid input; no production adapter |
| `ENGINE_FAILED` | analysis: adapter rejected; original exception never exposed (tests only in T02) |
| `INVALID_OUTPUT` | validation: adapter returned invalid or inconsistent data (tests only in T02) |
| `REPORT_WRITE_FAILED` | report: output cannot be created, including an already-existing destination; stdout remains the diagnostic surface |

All current CLI runs return exit code 1. No failure report contains `original` or partial accepted output. Output-write failures must be investigated using stdout; a failed write is not evidence of a complete persisted report. No retries, fake percentages or musical progress are introduced. These short T02 runs record final phase/timestamps; durable long-running engine progress/checkpointing is not implemented here.

## Verification evidence

- `pnpm run lint`, `pnpm run typecheck`, `pnpm run test --run`, `pnpm run build`: passed. **113 tests** across four files: 65 existing + 32 contract tests + 16 real subprocess/filesystem CLI tests.
- CLI tests use explicitly synthetic bytes and references, never music or a real engine. They verify gate-before-file-access, checksum mismatch, invalid JSON/size/schema/flags, missing inputs, non-file source, absent engine, report persistence, redaction, existing-output preservation and failed report creation. Temporary test directories are cleaned afterward.
- Direct `pnpm run evaluate:s06` with a missing local manifest exits 1 and produces a parsed `MANIFEST_UNREADABLE` report with `accepted: false` and no `original`. Its report is retained locally under `.artifacts/s06-t02/`, not versioned.
- No UI behavior changed; no browser/music-analysis verification is claimed. T07 remains mandatory and unexecuted before T03; S06 is not closed.
