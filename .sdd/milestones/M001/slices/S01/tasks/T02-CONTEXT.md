# M001/S01/T02: Conectar guía mínima al reloj observado y navegar secciones

**Gathered:** 2026-10-18
**Status:** Implemented and verified; see T02-SUMMARY.md. T03 NOT authorized.

## Project Description

D010 accepts T01's documented intermittent error 5 risk and authorizes only T02. T01 closed first in 01c0c7d. T02 uses its unchanged PlayerPort and official adapter; no auto-mode started.

## Why This Milestone

Prove observed-clock guide selection before defining a complete authorized arrangement in S02.

## User-Visible Outcome

### When this milestone is complete, the user can:

- See fictional current/upcoming chords, rests and sections from observed seconds.
- Navigate during observed play/pause, including keyboard, without selecting unobserved targets.

### Entry point / environment

- Entry point: .sdd/worktrees/M001; pnpm run dev --host 127.0.0.1 --port 5173 --strictPort.
- Environment: Chromium 153 desktop, 1280×800; fixed M7lc1UVf-VE.
- Live dependencies involved: visible official iframe; no application key/backend.

## Completion Class

- Contract: 65/65 tests (59 guide, six unchanged T01), lint, strict types, frozen install and build PASS.
- Integration: real repeated paused/playing seeks, native controls, natural rest/gap/end transitions and keyboard navigation verified.
- Operational: temporary in-memory invalid duration produced alert, no current selection and disabled navigation; restored immediately. Provider errors remain visible.

## Final Integrated Acceptance

- All four plan criteria have explicit evidence in T02-SUMMARY.md; detailed real observations in docs/validation/S01-guide.md.
- Exact persistent fictional notice; musical references separate from source windows; [start,end), explicit rests and gaps.
- No accumulated UI clock, provider/contract modifications or automatic recovery. Requested destination stays separate from observed current selection.
- Final reloaded UI: paused, 20 seconds, B/Am, no alert; 8/8 final assertions and exact invariant check.

## Risks and Unknowns

- Accepted unknown-cause error 5 may recur; not observed in T02 and not claimed fixed.
- One browser/environment/video; no independent acoustic SLA, keyframe precision, mobile, full song/arrangement rights or public deployment claim.
- Cued/idle seek may play: require playing/paused; disable during buffering/loading/error/ended. Recovery/repetition are T03, not implemented here.
- Fixture ends at 36 seconds, not video end. Report separates harness-only selector/click failures from provider behavior.
- Credential only in ignored .env.local; never echo/stage/bundle it. No cookies, raw session URLs or HTML5 media-element access in evidence.

## Existing Codebase / Prior Art

- src/application/guide-session.ts — pure selection/validation and requests.
- src/fixtures/minimal-guide.ts — technical-only data, not final S02 schema.
- src/App.vue — observed snapshots, guide, controls and diagnostics.
- tests/unit/guide-session.test.ts — 59 tests.
- docs/validation/S01-guide.md — dated evidence and limitations.

> See .sdd/DECISIONS.md, D010.

## Relevant Requirements

- R008/R010/R012/R013: partial S01 evidence only; no whole requirement promoted to validated.

## Scope

### In Scope

- T02 only, four code/test files plus durable evidence and native handoff.

### Out of Scope / Non-Goals

- No T03, loops/recovery, musical engine/renderer, whole-slice acceptance, merge or push.

## Technical Constraints

- Existing dependencies/lockfile unchanged. Vue computed uses snapshots, no local accumulated clock. No LSP; strict vue-tsc verified.
- Native summary storage, doctor/state derivation and staged SDD Git bridge; no fabricated runtime/STATE/database files.

## Integration Points

- App consumes tested guide-session functions and unchanged real T01 adapter.

## Open Questions

- None blocking this task. T03 remains behind explicit user authorization; review its plan before execution.
