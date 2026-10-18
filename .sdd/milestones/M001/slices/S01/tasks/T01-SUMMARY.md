---
id: T01
parent: S01
milestone: M001
provides:
  - Minimal executable Vue application with deliberate official YouTube playback
  - Provider-independent observed-state PlayerPort and six deterministic contract tests
  - Official material review and sanitized real-provider A/B evidence
key_files:
  - src/App.vue
  - src/application/player-port.ts
  - src/infrastructure/youtube-player.ts
  - tests/unit/player-contract.test.ts
  - docs/validation/S01-material.md
  - docs/validation/S01-youtube-controlled.md
key_decisions:
  - D009
  - D010
patterns_established:
  - Commands never optimistically change observed state or time
  - Unknown duration is null; external errors remain visible
observability_surfaces:
  - UI state/readiness/time and provider error code/phase/elapsed time
  - docs/validation/S01-youtube-controlled-A.json and -B.json
duration: Multiple manual sessions including bounded provider investigation
verification_result: passed
completed_at: 2026-10-18
blocker_discovered: false
---

# T01: Crear la entrada mínima con YouTube real y comprobar material

**Shipped a deliberate-load official YouTube laboratory with observed playback, a typed independent port, reproducible tooling and real-provider evidence.**

## What Happened

Created the approved minimal Vue/Vite/strict TypeScript application, pinned compatible versions and pnpm lockfile, and connected the visible official iframe to PlayerPort. Added load/readiness/provider diagnostics and deterministic contract tests, including a reproduced late-ready-after-timeout regression. Metadata was checked with the official local Data API: fixed video M7lc1UVf-VE is embeddable and not Made for Kids at the recorded review time. No key enters the frontend.

A real pause was followed by intermittent YouTube error 5. The user authorized a bounded investigation and then explicitly accepted the unknown-cause residual risk (D010: «acepto el riesgo, haz t02»). A completed 10/10 controlled cycles; direct official baseline B completed 10/10; both held pause 60 seconds with no onError. A separate final pristine UI smoke advanced 3.94→14.34 seconds, then held 18.40 seconds paused for 85.83 seconds. Temporary instrumentation was removed byte-for-byte. Risk acceptance is not a claim that error 5 was fixed.

## Verification

Fresh final run before closeout: pnpm install --frozen-lockfile, lint, strict vue-tsc, 6/6 Vitest tests, build and git diff --check passed (job bg_3aff6d44). Earlier real browser evidence is retained in the validation report; final five UI assertions passed. Exact-value credential scan covered source, bundle and evidence, no credential found; .env.local is ignored. No CI or future T04 scripts are claimed.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | pnpm install --frozen-lockfile && pnpm run lint && pnpm run typecheck && pnpm run test --run && pnpm run build && git diff --check | 0 | PASS, 6/6 tests | 8.6 s total |
| 2 | Real Chromium A/B controlled protocol | n/a | PASS, 10/10 per variant | See timestamped traces |
| 3 | Pristine UI real-provider smoke and browser_assert | n/a | PASS, 5/5 final assertions | Pause observed for 85.83 s |

## Diagnostics

UI exposes observed state, readiness, seconds/duration and last error code, phase and elapsed milliseconds. Inspect docs/validation/S01-material.md for material/privacy and the original incident; S01-youtube-controlled.md plus its sanitized JSON files describe the bounded protocol and every cycle. No raw session URLs, cookies or credentials are retained. A pilot harness COMMAND_FAILED is explicitly INVALID and excluded from results.

## Deviations

Native execution stopped on provider usage limits; implementation/investigation were completed manually in the existing milestone worktree. Closeout uses native summary storage, doctor/state derivation and SDD Git bridge without starting auto-mode. The extra controlled investigation was explicitly authorized. TypeScript 6.0.3 was selected rather than 7 because of the approved lint peer compatibility range.

## Known Issues

One original YouTube error 5, unknown cause, not reproduced in the controlled series; accepted by the user in D010. One browser/environment and fixed sample only; no universal reliability, musical accuracy, arrangement rights, mobile or public-deployment claim. Actual outgoing Referer was not captured; origin and referrer policy are configured and verified in the DOM. Do not add speculative recovery or silently substitute material. Only T02 is now authorized; no T03/slice/milestone closure, merge or push.

## Files Created/Modified

- package.json, pnpm-lock.yaml, index.html, tsconfig.json, vite.config.ts, eslint.config.js — minimal pinned executable tooling.
- src/main.ts, src/App.vue — actual entry, disclosure, visible official player, controls and diagnostics.
- src/application/player-port.ts, src/infrastructure/youtube-player.ts — decoupled typed contract and official integration.
- tests/unit/player-contract.test.ts — six deterministic tests.
- docs/validation/S01-material.md and S01-youtube-controlled* — reviewed material and sanitized real-provider evidence.
- docs/development.md, .sdd/PREFERENCES.md — real local commands and constraints.
- .sdd/DECISIONS.md, T01-CONTEXT.md, T01-SUMMARY.md — explicit approvals, risk and verified handoff.
