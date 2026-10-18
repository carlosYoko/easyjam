---
version: 1
git:
  isolation: worktree
  merge_strategy: merge
  auto_push: false
  push_branches: false
  auto_pr: false
  pre_merge_check: true
  snapshots: false
  manage_gitignore: false
parallel:
  enabled: false
verification_commands:
  - pnpm run lint
  - pnpm run typecheck
  - pnpm run test --run
  - pnpm run build
---

# EasyJam — SDD Pi project preferences

Project-only preferences, validated against SDD Pi 2.42.0.
`PREFERENCES.md` is supported as a legacy fallback; do not create a second
`preferences.md` file. A future canonical rename must be explicit.

`git.commit_docs` is deprecated and discarded by this version, so it is
intentionally omitted. Project documentation and planning artifacts remain
eligible for Git tracking; only runtime artifacts are ignored. The supported
`git.manage_gitignore: false` preserves that policy. SDD also detects tracked
`.sdd` files to protect projects using in-repository state.

T01 provides the local lint, strict typecheck, deterministic unit tests and build
commands configured above. They run inside the milestone worktree. Real YouTube
verification is separate and cannot be replaced by these deterministic checks.
T01 is technically verified; the user accepted the known intermittent risk and
authorized T02 only (D010). The bounded A/B investigation passed 10/10 cycles per
variant without reproducing the initial YouTube error 5; no speculative fix was
introduced. See `docs/validation/S01-youtube-controlled.md`. Do not advance to T03,
complete S01/M001, merge or push without authorization.
