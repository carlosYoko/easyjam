---
id: T02
parent: S01
milestone: M001
provides:
  - Pure observed-clock guide selection with runtime validation and half-open windows
  - Labelled fictional chords, rests, gaps and current/upcoming sections
  - Non-optimistic section requests through unchanged PlayerPort
key_files:
  - src/application/guide-session.ts
  - src/fixtures/minimal-guide.ts
  - src/App.vue
  - tests/unit/guide-session.test.ts
  - docs/validation/S01-guide.md
key_decisions:
  - D010
patterns_established:
  - Musical references and source-time windows are separate fixture data
  - Requested destinations never select the current cue
  - Block cued/idle seeks rather than assume they preserve non-playing state
observability_surfaces:
  - Current/upcoming cue and section, observed clock, last requested destination
  - Invalid-guide/time diagnostics and existing provider errors
  - docs/validation/S01-guide.md timestamped live evidence
duration: One manual implementation and live verification session
verification_result: passed
completed_at: 2026-10-18
blocker_discovered: false
---

# T02: Conectar guía mínima al reloj observado y navegar secciones

**Connected a labelled fictional guide to the real observed provider clock, with explicit rests/gaps and non-optimistic navigation.**

## What Happened

D010 accepted T01's known risk and authorized T02 only. T01 closed first in 01c0c7d. Added pure selectGuideFrame with runtime validation of unknown data/time, references, musical positions/durations, finite sorted non-overlapping windows and containment. Selection uses [start,end), no accumulated UI clock. Musical references and sourceTiming remain separate, not the final S02 schema.

The actual App consumes this selector and existing PlayerPort snapshots. Persistent exact fictional notice; current/upcoming events and sections independently labelled. Requests expose the target, preserve paused intent with pause after seek, and never mutate selected state optimistically. Only observed playing/paused permit navigation; cued/idle, loading, buffering, ended/error or missing readiness do not. No adapter, contract or dependency changes.

## Verification

Final frozen install, lint, strict vue-tsc, 65/65 tests and build passed (bg_df2787b4), as did git diff --check. Six unchanged T01 tests plus 59 new cases cover valid/invalid inputs, boundaries, gaps/rests and pre/post-request observations.

### Must-Haves Verified

| Criterio del plan | Evidencia |
|---|---|
| Guía actual/siguiente y sección corresponden a segundos observados, incluidos silencios y límites. | Selector usado por App; tests [inicio,fin); reproducción real recorrió silencios, huecos a 12.04/16.04 y fin a 36.05 s. |
| Pausa/buffering no generan avance autónomo; buscar repetidamente no selecciona por target sin observación. | Silencio pausado a 6.50 s durante 23.874 s; cinco saltos pausados alternos y dos en reproducción. Solicitud B/20 visible aún con 6.50/silencio. Buffering observado a 0/C antes de playing 0.02. |
| Guía separada de YT y esquema definitivo del arreglo; datos preparados identificados como tales. | guide-session.ts importa solo tipo PlayerPort; musical y sourceTiming separados; fixture rotulada «Secuencia ficticia de prueba técnica; no transcripción del vídeo». Sin PPQ/arreglo definitivo. |
| Página usa la función testeada y el adaptador real de T01; no solo una vista ficticia. | App computed llama selectGuideFrame con snapshots reales. Controles oficiales ±10 s produjeron 10/G y 0/C aunque el último destino de la app seguía A/0. |

Native pause was also observed at 115.78 s. Native accessible buttons were activated through browser automation, never the HTML5 media element. Final reloaded UI passed keyboard A→B navigation, a temporary in-memory invalid-duration test (alert, selection removed, navigation disabled; 4/4 assertions), immediate restoration and 8/8 final assertions. Exact final DOM check: paused, 20 seconds, B/Am, no alert, fixture restored, no horizontal desktop overflow. No provider error observed; prior risk not claimed fixed.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | pnpm install --frozen-lockfile && pnpm run lint && pnpm run typecheck && pnpm run test --run && pnpm run build && git diff --check | 0 | PASS, 65/65 tests | Not individually isolated |
| 2 | Real Chromium UI/native controls and keyboard | n/a | PASS | Timestamps in S01-guide.md |
| 3 | Invalid fixture injected only in memory, restored | n/a | PASS, 4/4 assertions | No source mutation |
| 4 | Final browser_assert plus exact DOM check | n/a | PASS, 8/8 and invariant check | Final reloaded code |

## Diagnostics

UI current/upcoming cue/section, data-kind rest/chord/gap, state/time and last destination distinguish commands from observations. Invalid guide/time removes fictitious selections. Existing provider errors stay visible. Read docs/validation/S01-guide.md for timestamps, protocol, safety restrictions and harness limitations. No keys, cookies, signed URLs or internal media diagnostics persisted.

## Deviations

Added durable docs/validation/S01-guide.md beyond the four planned code/test files to satisfy the real-evidence step. Cued/idle and buffering navigation deliberately blocked rather than adding T03 recovery. No full arrangement, library, renderer or architecture adoption. Temporary browser observations and in-memory fault were removed/restored and never entered product source.

## Known Issues

Accepted unknown-cause error 5 risk remains. Single desktop Chromium/video; no acoustic accuracy, independent-clock SLA, keyframe or public-deployment claim. Fixture ends at 36 seconds, not the video. Only playing/paused navigation; no loops/recovery/T04 scripts. Early harness-only generic idle wait, unsupported assertion selector and a missed automated click are documented separately from provider outcomes. T03 needs new authorization; no S01/M001 closure, merge or push.

## Files Created/Modified

- src/application/guide-session.ts — pure selector, runtime validation and PlayerPort requests.
- src/fixtures/minimal-guide.ts — two sections, fictional cues/rests and separated timing.
- src/App.vue — actual guide/navigation and diagnostics.
- tests/unit/guide-session.test.ts — 59 cases, six T01 tests unchanged.
- docs/validation/S01-guide.md, docs/development.md — actual evidence and constraints.
- T02-CONTEXT.md, T02-PLAN.md, T02-SUMMARY.md and native parent plan — verified scope/criteria/handoff.
