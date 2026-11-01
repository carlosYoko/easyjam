---
id: T02
parent: S06
milestone: M001
provides:
  - Executable local manifest/checksum CLI with safe failure reports
  - Versioned neutral experiment contracts and untrusted adapter-output validation
  - 48 new contract and real-process CLI tests
key_files:
  - scripts/evaluate-song.ts
  - src/application/analysis-evaluation.ts
  - tests/unit/analysis-evaluation.test.ts
  - tests/unit/analysis-evaluation-cli.test.ts
  - docs/validation/S06-evaluator.md
key_decisions:
  - D015 uses Node native TypeScript and pinned development-only Node declarations
  - No production adapter or musical acceptance in T02; T07 remains mandatory
patterns_established:
  - Runtime validation of unknown input/output, explicit seconds and provenance
  - Test-double completion remains unaccepted; unknown and no-chord are not guitar rests
observability_surfaces:
  - evaluate:s06 JSON stdout and exclusive-create local report
  - Run UUID, timestamps, Node version, hashes, phase and safe error codes
  - docs/validation/S06-evaluator.md operator contract
duration: "Single manual session; active duration not measured"
verification_result: passed
completed_at: 2026-11-01
blocker_discovered: false
---

# T02: Crear evaluador local y contratos de entrada/salida

**Delivered a working local manifest/checksum/diagnostic CLI and neutral experiment boundary, with 113 passing tests and no production analyzer or accepted musical result.**

## What Happened

The user explicitly authorized S06/T02 only. Implementation is in the M001 worktree, separate from Vue/player behavior. The CLI validates required flags, local paths, a bounded JSON manifest, version/units, provenance, rights/reference declarations and recording identity before opening a source. It streams actual SHA-256 and rejects mismatches. Otherwise-valid input reaches ENGINE_UNAVAILABLE: no production adapter or synthetic engine is wired into the CLI. All current CLI runs exit 1 with no original or accepted result.

The application module owns version-1 seconds-based experiment contracts, runtime validation and a small adapter boundary. Neutral output checks input/recording/engine/config consistency, finite ordered intervals and MIDI bounds. Discriminants must be actual strings, never coerced arrays/objects. Harmony/no-chord/unknown and guitar note/rest/unknown are distinct. Guitar polyphony is allowed; rest/unknown cannot overlap other events. Beat/downbeat/meter/sections/alignment remain explicitly unmeasured. This is not the final product score model. Even valid adapter output is completed with accepted:false; only tests inject adapters.

Reports expose UUID, ISO timestamps, phase, safe code, Node version and applicable hashes, not paths, evidence prose, arbitrary engine text or thrown exceptions. Existing output is never overwritten. Report-write failure is exposed on stdout with nonzero exit; parent directories must already exist. Accepted flags refer to a separately reviewed T07 record, not automatic permission proof. T02 neither obtains nor accepts real material/reference, nor opens reference contents. T03 must retain T07 clearance and independently verify referenced artifacts, recording/format/duration and actual engine configuration.

Node 24.18.0 executes erasable TypeScript directly. Pinned @types/node 24.19.2 and transitive undici-types 7.24.6 are development-only; both installed MIT licenses were inspected. Existing runtime/tool versions are unchanged. scripts/**/*.ts is included in strict checking. D015 records this tooling choice. Plans/context/project state and summary are mirrored to the canonical copy; runtime/journal/state files are not manually edited. No T07/later execution, slice/milestone closure, merge or push.

## Verification

Lint, strict types, production build and all 113 tests pass: 65 historical player/guide cases, 32 new contract cases and 16 real Node subprocess/filesystem CLI cases using synthetic bytes only. These are not musical-analysis evidence. No UI code changed, so no new browser/playback verification is claimed. Frozen installation also passes without further lockfile changes.

Initial lint rejected control-character regexes; validation uses character codes. Initial typecheck caught array-row interpretation in a parameterized argument test; named cases resolved it. Final boundary checks also cover nonstring event tags, polyphony and overlapping rest/unknown rejection. Full checks were rerun after code changes. LSP diagnostics was attempted but no TypeScript server is configured; vue-tsc supplies typechecking evidence.

A direct pnpm CLI invocation with a missing local manifest returned expected exit 1 and persisted MANIFEST_UNREADABLE/input, accepted:false, no original; a separate parser assertion passed. The report is local/ignored under .artifacts/s06-t02/. Temporary CLI-test directories are cleaned afterward.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | pnpm run lint | 0 | PASS | Included in 20.4 s final combined run |
| 2 | pnpm run typecheck | 0 | PASS | Included in combined run |
| 3 | pnpm run test --run | 0 | PASS: 113/113, four files | 3.94 s |
| 4 | pnpm run build | 0 | PASS | 185 ms reported by Vite |
| 5 | pnpm install --frozen-lockfile | 0 | PASS: lockfile unchanged | 39 ms reported by pnpm |
| 6 | pnpm run evaluate:s06 --manifest .artifacts/s06-t02/missing-manifest.json --output .artifacts/s06-t02/missing-manifest-report.json | 1 expected | PASS: persisted safe failure, not successful analysis | Not measured |
| 7 | Node parser assertions on direct CLI report | 0 | PASS: code/phase/accepted/no original | Not measured |

## Diagnostics

Start at docs/validation/S06-evaluator.md. Run pnpm run evaluate:s06 from the worktree with both flags and a new output path. Codes distinguish invalid arguments/manifest, pending permission/reference, unreadable source, hash mismatch, missing/failed engine, invalid output and report-write failure. For report-write failure inspect stdout; a complete persisted report is not guaranteed. No retries, fake percentages, durable long-running engine jobs or database were added.

## Deviations

Added a dedicated CLI integration-test file and operator document beyond the five estimated files. Development-only Node declarations and checked scripts implement the plan's minimum-runtime/config allowance without a transpiler/runtime dependency. No material, analyzer, backend, renderer or product scope was added.

## Known Issues

- T07 remains pending: legitimate timed full-song reference, recording correspondence, rights/protocol approval and compatible licensed engine pair are not established.
- Accepted manifest flags are declarations referencing the reviewed gate, not independent verification of permission/reference contents/format/duration.
- Neutral schema v1 leaves beat/downbeat/meter/sections/alignment unmeasured; extend/version with evidence later, never invent observations.
- No production adapter means no transcription/successful musical run yet; intentional T02 scope, not a hidden fallback or TODO.
- Historical S01 intermittent YouTube error 5 remains accepted/unrepaired.

## Files Created/Modified

- scripts/evaluate-song.ts — real CLI, bounded JSON input, streaming checksum and safe failure reports.
- src/application/analysis-evaluation.ts — contracts, runtime gates/output validation and adapter orchestration.
- tests/unit/analysis-evaluation.test.ts — 32 contract cases with labelled doubles.
- tests/unit/analysis-evaluation-cli.test.ts — 16 real-process/filesystem cases using synthetic data.
- package.json, pnpm-lock.yaml, tsconfig.json — script, pinned Node declarations and checked scripts.
- docs/validation/S06-evaluator.md — operator contract, limits, codes and evidence.
- docs/development.md, .sdd/PROJECT.md — current commands/state and next-unit boundary.
- .sdd/DECISIONS.md — D015 minimal tooling choice.
- S06-PLAN.md, S06-CONTEXT.md, tasks/T02-PLAN.md — only T01/T02 completed; mandatory T07 retained.
- tasks/T02-SUMMARY.md — native handoff; no slice/milestone closure.
