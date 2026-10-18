# EasyJam — Agent Instructions

## Context and authority

- Communicate in Spanish. Write code, technical identifiers and commits in English.
- Read `docs/constitution.md`, `docs/product.md`, `docs/adr/ADR-001.md` and relevant `docs/` proposals before planning or architectural decisions.
- Product and architecture documents remain proposals until explicitly approved. Do not implement unapproved functionality.
- Use native SDD Pi, not GitHub Spec Kit. Preserve generated project state; let SDD manage milestones, slices, tasks and execution commits.
- Specify and validate scope, acceptance criteria and error states before implementation. Keep specifications, code and tests synchronized.

## Engineering

- Prefer clear, maintainable code; apply SOLID, DRY, KISS and YAGNI with judgment, not ceremonial layers or speculative abstractions.
- Deliver small, demonstrable vertical slices; verify each capability before calling it done.
- Test business rules and musical behavior, including edge cases and regressions.
- Keep dependencies directed toward the domain; domain rules must not depend on Vue, YouTube, alphaTab or external infrastructure.
- Use typed contracts and runtime validation at boundaries. Prefer pure functions for musical rules and mature libraries over reinvention.
- Proposed baseline: Vue 3 + Vite + strict TypeScript, Composition API, modular frontend and lightweight hexagonal boundaries where justified.
- Use local state by default; add shared state or other dependencies only for a demonstrated need.
- No backend without a real requirement; no premature microservices or complex cloud infrastructure.

## Git and safety

- Follow Conventional Commits in English: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `perf`; include SDD milestone/slice/task references when applicable.
- Make atomic, coherent commits. Do not mix independent features or unrelated refactoring. Never create empty commits or use indiscriminate staging.
- Before each commit, review the diff, stage explicit paths, check for credentials/unrelated files and run applicable checks. Follow `docs/development.md`.
- Never delete existing work, rewrite history destructively or push automatically.
- Do not start `/sdd auto` without explicit authorization. Preparation is not approval to execute the roadmap.
