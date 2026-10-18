# S01 — Replan record: approved scope replacement

**Trigger:** explicit user approval D013, not a discovered code blocker and not a completed-slice reassessment.
**Mechanism:** native appendOverride (the implementation behind `/sdd steer`), followed by authorized plan/roadmap rewrite. `dispatch reassess` is inapplicable because no slice is complete; `dispatch replan`'s completed-task blocker premise is not fabricated.

## Preserved work

T01 (01c0c7d) and T02 (1b4690d), original completed-task text/estimates/checkmarks, task plans/contexts/summaries, PlayerPort/official adapter/observed-clock guide and 65-test historical evidence remain. Root stale T01/T02 plan state was synchronized from committed worktree artifacts, not inferred or marked done anew. No code merge or rewrite of commits.

## Incomplete work suspended

S01/T03 and T04 remain unchecked/not executed; explicit SUSPENDED notices added. S01 remains incomplete. Historical S02–S05 had no task plans yet; removed from the operational roadmap without completing them, their IDs/history preserved in M001-ROADMAP-HISTORY.md. Native roadmap parser sees only S06–S11 in M001-ROADMAP.md, so old task plans cannot become its next task.

## Replacement

S06–S11 are the approved roadmap; only S06 is planned now. S06/T01–T06 remain unchecked. Review plan before any code; execute one explicit unit at a time, verify slice then seek approval before next slice. No auto/next loop, S07–S11 implementation, closeout, merge or push. First unit S06/T01 collects authorized material/reference and evaluation protocol; file fallback is permitted for this experiment, not product upload or proof of URL-only.

## Verification

Use native parseRoadmap/parsePlan/deriveState in root and worktree: slices exactly S06–S11, first task S06/T01, no completed active slices/tasks; S01 task statuses true,true,false,false; no S01/M001 summary or false runtime completion created. STATE rebuilt only by native rebuildState. T01/T02 summaries remain byte-identical; application sources/dependencies and .gitignore untouched. Future commands consume OVERRIDES and approved documents.

## Remaining risks

Authorized audio/recording mapping/reference absent, musical quality/thresholds unknown, renderer/sync integration unproved, old error 5 unresolved. Pending source or a file-only successful experiment cannot close URL-only product acceptance. Schema may be simpler than seven-table example as long as requirements/invariants remain verified.
