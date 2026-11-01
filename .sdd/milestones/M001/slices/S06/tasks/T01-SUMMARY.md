---
id: T01
parent: S06
milestone: M001
provides:
  - Evidence-backed material research and draft evaluation protocol
  - Explicit user-approved split preserving the mandatory T07 pre-analysis gate
key_files:
  - docs/validation/S06-material.md
  - docs/validation/S06-protocol.md
  - .sdd/milestones/M001/slices/S06/tasks/T07-PLAN.md
  - .sdd/milestones/M001/slices/S06/S06-PLAN.md
key_decisions:
  - D014 closes documentary T01 only and requires T07 acceptance before T03
  - No third-party contact authorized
patterns_established:
  - Distinguish acquired media and observed iframe playback from musical-reference acceptance
  - Missing musical evidence remains an explicit gate rather than an invented oracle
observability_surfaces:
  - S06-material.md evidence and unresolved gate inventory
  - Local browser timeline s06-t01-official-embed-check.json
  - T07 plan and T03 explicit reference prerequisite
duration: "Multiple manual sessions; active work time not measured"
verification_result: passed
completed_at: 2026-10-31
blocker_discovered: false
---

# T01: Investigar material y proponer protocolo de evaluación

**Delivered source/rights research, a decoded independent candidate, official iframe playback evidence and a draft evaluation protocol; the user explicitly moved unresolved material/reference acceptance to mandatory T07.**

## What Happened

The original T01 could not satisfy its full material gate: Code Monkey's acquired first-party chord sheet is untimed, and musical correspondence between the local recording and YouTube was not established. The user explicitly approved separating documentary research from reference acquisition/acceptance, after declining third-party contact. Native decision D014 records this change. This completion is for the revised documentary scope only, not retroactive acceptance of the original material contract or any musical requirement.

Code Monkey was downloaded from Jonathan Coulton's official player, not YouTube, and retained outside the repository. The report records 4,319,316 bytes, SHA-256, native metadata (189.3093877 seconds, 44.1 kHz, stereo), and successful muted Windows MediaPlayer playback to MediaEnded. Artist FAQ and a track-specific FMA entry support CC BY-NC 3.0 noncommercial reuse; commercial clearance and full reference reuse are not claimed. Source chart and FAQ snapshots have separate local hashes.

A clearly labelled temporary browser DOM on the existing local Vite origin displayed the official AEBld6I_AKs iframe without modifying application sources or historical M7lc1UVf-VE metadata/guide. Official controls showed progressing playback and a displayed duration of 3:10. This resolves playback for the session, not listening-derived landmarks, mastering identity or alignment. No YouTube media was extracted.

Other public sources were investigated. GAPS is a stronger annotated full-guitar candidate but has unresolved license/provenance scope across publisher/Zenodo/Hugging Face sources; GOAT full access requires a request. No third party was contacted and neither candidate was accepted. The protocol separately reports harmony, transitions, attacks/durations, beat/downbeat/meter, rests, sections, alignment and notation; missing evidence remains not measurable. No concrete musical split or acceptance threshold was invented. Hardware inventory is recorded, not a benchmark. Chordino win32 versus Sonic Annotator 1.7 win64 remains an unverified tool-pair compatibility gate.

T07 was added without renumbering existing tasks. Explicit order: T01 → T02 → T07 → T03 → T04 → T05 → T06. T02 can prepare contracts/diagnostics after separate authorization, without analyzing or accepting material. T03 explicitly depends on T07's accepted reference/material/protocol record. All integrated S06 criteria remain intact. Plans/context/research and D014 were synchronized between canonical .sdd and the milestone worktree; source-validation documents remain in .sdd/worktrees/M001/docs/validation.

## Verification

Document checks and plan-consistency checks pass. Both plans contain seven unique task IDs in the approved order and only T01 checked complete. T03 requires docs/validation/S06-reference.md and T07 explicitly. Material/protocol documents distinguish D014 documentary completion from pending material acceptance. Git whitespace checks passed; new-file content/whitespace checks and acquired-asset hashes were also checked separately because git diff does not inspect untracked files.

Existing Windows decoding reached MediaEnded without MediaFailed/timeout. Final official-iframe browser assertions passed 3/3 for the candidate link, displayed duration and observed elapsed-time label. Earlier auto-hidden-control selector timeout/button-visibility failure is disclosed in S06-material.md, not represented as a musical/playback failure or erased. Browser and local server were closed afterward. A delayed server alert subsequently had no registered active process.

No source code, dependency, DB, score renderer, analyzer or functional tests were changed or run for this documentary task. No commit, merge, push, S06 closure or later task execution occurred.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | Native Windows MediaPlayer muted decode/playback to MediaEnded | 0 | PASS: local decode, not musical correspondence | 192.9 s |
| 2 | Node acquired MP3/chart/FAQ SHA-256 checks against report | 0 | PASS: 3 local checksums | Not measured |
| 3 | Browser assertions: candidate watch link, duration 3:10, elapsed 1:26 | N/A | PASS: 3/3 assertions | Not measured |
| 4 | Node nonempty/content/whitespace checks for authored documents | 0 | PASS: documentary outputs | Not measured |
| 5 | Node checks for both plan copies: T01,T02,T07,T03,T04,T05,T06; only T01 complete; T03 reference prerequisite | 0 | PASS: explicit order and mandatory gate | Not measured |
| 6 | git diff --check; git -C .sdd/worktrees/M001 diff --check | 0 | PASS: tracked whitespace | Not measured |

## Diagnostics

Start from worktree docs/validation/S06-material.md and S06-protocol.md. The material gate remains blocked and is owned by T07, whose plan describes evidence required to clear it. Code Monkey and source snapshots are temporary local files; recheck availability/hash before reuse. The local browser timeline is not versioned media or a musical reference. Do not substitute a fresh dynamic HTML page for the frozen snapshot hash. Candidate-specific API metadata/compliance review is distinct from the iframe diagnostic.

## Deviations

Explicit user-approved D014 replanning: original T01 material/reference acceptance was separated into T07, with no waiver of S06 acceptance or pre-analysis rights/reference requirements. Closing T01 therefore does not prove that a usable full-song reference has been obtained. No external contact is permitted. T02 and T07 are planned, not authorized by this closure.

## Known Issues

- Complete legitimate timed/performed reference, independent audio–YouTube musical landmarks, concrete calibration/holdout split and actual protocol/material approval remain pending in T07.
- A compatible licensed host/plugin artifact pair is not selected or locally validated.
- Noncommercial reuse does not establish commercial product clearance; score/reference rights remain scoped and uncertain.
- URL-only acquisition remains unresolved; no upload UI was introduced.
- Existing historical S01/T03–T04 remain suspended; runtime/journal files and local browser artifacts are unrelated unstaged state.

## Files Created/Modified

- `docs/validation/S06-material.md` — candidate acquisition/rights/hash/decoding/iframe evidence, GAPS/GOAT findings and unresolved T07 gate.
- `docs/validation/S06-protocol.md` — draft per-dimension evaluation, reproducibility, tool/hardware review and pre-analysis gate.
- `.sdd/DECISIONS.md` — native D014 user-approved separation, mirrored to the worktree.
- `.sdd/milestones/M001/slices/S06/S06-PLAN.md` — only T01 complete, T07 added and explicit pre-analysis order.
- `.sdd/milestones/M001/slices/S06/S06-CONTEXT.md` — current scope, evidence and remaining acceptance gate.
- `.sdd/milestones/M001/slices/S06/tasks/T01-PLAN.md` — revised documentary scope and satisfied must-haves.
- `.sdd/milestones/M001/slices/S06/tasks/T02-PLAN.md` — contracts-only authorization boundary with material still unaccepted.
- `.sdd/milestones/M001/slices/S06/tasks/T03-PLAN.md` — mandatory T07/reference input before analysis.
- `.sdd/milestones/M001/slices/S06/tasks/T07-PLAN.md` — reference/material/recording/protocol acceptance gate, not executed.
- `.sdd/milestones/M001/slices/S06/tasks/T01-RESEARCH.md` — current research and handoff reflecting D014.
- `.sdd/milestones/M001/slices/S06/tasks/T01-SUMMARY.md` — native task closure for documentary scope only.
