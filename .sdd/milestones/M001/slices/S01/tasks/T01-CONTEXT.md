# M001/S01/T01: Crear la entrada mínima con YouTube real y comprobar material

**Gathered:** 2026-10-18
**Status:** Verified and accepted with known risk by the user (D010); see T01-SUMMARY.md. T02 only authorized.

## Project Description

D009 authorized T01; D010 accepts its documented intermittent YouTube error 5 risk after the bounded A/B investigation and authorizes T02 only. No T03, slice/milestone completion, merge or push.

## Why This Milestone

Prove real-provider feasibility before a guide or musical engine.

## User-Visible Outcome

### When this milestone is complete, the user can:

- Deliberately load the reviewed official sample, play/pause and see observed state/time and failures.

### Entry point / environment

- Entry point: .sdd/worktrees/M001; pnpm run dev --host 127.0.0.1 --port 5173 --strictPort.
- Environment: Windows desktop, Chromium 153, Node 24.18.0 LTS, pnpm 12.14.0.
- Live dependencies involved: fixed official YouTube video M7lc1UVf-VE; separate local Data API metadata review.

## Completion Class

- Contract: frozen install, lint, types, six deterministic tests and build pass.
- Integration: 10/10 cycles A and B, 60-second pause each; final pristine UI smoke passed with 85.83-second pause.
- Operational: original error exposed, not suppressed; residual risk explicitly accepted rather than claimed fixed.

## Final Integrated Acceptance

See T01-SUMMARY.md and docs/validation/S01-youtube-controlled.md for actual commands, timestamps and all criteria. User acceptance: «acepto el riesgo, haz t02».

## Risks and Unknowns

- Original provider error 5 remains unknown-cause and may recur. No speculative recovery or automatic retry.
- One browser/environment/video; no acoustic precision, mobile, universal reliability or musical rights claims.
- Official metadata reviewed on 2026-10-18: embeddable=true, madeForKids=false. Recheck before future reuse/distribution under policy refresh limits.
- Credential only in ignored worktree .env.local; no VITE prefix, logs, URLs, Git or bundle. Never read it into tool output.
- Temporary instrumentation is removed; ignored tmp/t01-controlled-investigation holds local diagnostic tools/backup, not commit material. Raw .sdd/journal must not be staged.
- Original headless usage-limit failure did not itself complete the task. Native summary/doctor/state derivation and SDD Git bridge handle verified manual closeout without auto.
- Preserve ignored tmp/t01-root-install-recovery; actual app only in worktree.

## Existing Codebase / Prior Art

- src/application/player-port.ts and src/infrastructure/youtube-player.ts — independent contract/official adapter.
- docs/validation/S01-material.md — fixed-video review, privacy and original incident.
- docs/validation/S01-youtube-controlled.md plus A/B JSON and invalid pilot — controlled evidence.
- T01-SUMMARY.md — verified handoff to T02.

> See .sdd/DECISIONS.md, D006–D010.

## Relevant Requirements

- R008, R010, R012, R013: partial slice evidence; no whole requirement promoted to validated.

## Scope

### In Scope

- T01 closeout then only the approved T02 plan.

### Out of Scope / Non-Goals

- T03, whole-slice/milestone acceptance, renderer, optimizer, merge or push.

## Technical Constraints

- Keep provider contract unchanged unless evidence requires it. T02 uses observed seconds only, with explicit fictional guide label.
- No manual runtime/STATE/completion database construction; use native summary storage and derivation.

## Integration Points

- Private GitHub main/origin last verified at 97244ff; no new push authorized.

## Open Questions

- None blocking T02. If error 5 recurs, retain official event/last-command evidence before a causal correction.
