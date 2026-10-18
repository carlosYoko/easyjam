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

No application verification commands are configured yet: there is no
`package.json`. S01 must add real lint, typecheck, test and build commands to
these preferences before any feature work or integration.
