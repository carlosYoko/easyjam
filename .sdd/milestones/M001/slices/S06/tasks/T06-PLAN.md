---
estimated_steps: 4
estimated_files: 3
skills_used:
  - test
---

# T06: Repetir evaluación completa y presentar go/no-go

**Slice:** S06 — Fuente autorizada y análisis de calidad
**Milestone:** M001

## Description

Solo tras T01–T05/criterios aprobados y autorización de unidad. Revisar evidencia de integración real, no instalar funciones de siguientes slices o cerrar milestone. Cierre de S06 mediante mecanismo nativo y revisión propia, no por disponer de informe.

## Steps

1. Confirmar procedencia/referencia/config/versiones/criterios aprobados antes de evaluación final; revisar riesgos/restricciones vigentes sin retomar planes S01 suspendidos.
2. Repetir canción completa por evaluador real, preservar original/artefactos locales/versiones/tiempo/recursos y comparar contra referencia/criterios fijados; repetir diagnóstico seguro de fallo, no solo happy path.
3. Ejecutar checks/regresiones y consolidar informe de calidad/tiempos/notación/alineación/limitaciones. Marcar por separado fuente de archivo permitido, objetivo URL sola no resuelto, renderer/SQLite/global optimizer pendientes. No transformar corrección manual en supuesto motor preciso.
4. Presentar go/no-go al usuario y propuesta de siguiente paso. Solo con evidencia suficiente y autorización de cierre actualizar resumen/UAT/estado/requisitos usando SDD. Si no cumple, mantener slice bloqueada y pedir decisión; no autoadvance S07 ni validar requisitos globales prematuramente.

## Must-Haves

- [ ] Recorrido real reproducible y fallo seguro contrastados con criterios previamente acordados.
- [ ] Informe saneado con límites y URL única abierta cuando se emplea archivo.
- [ ] Revisión explícita al cierre de slice, sin implementación/auto siguiente slice o false completion.

## Verification

- `pnpm run lint && pnpm run typecheck && pnpm run test --run && pnpm run build`.
- `pnpm run evaluate:s06 --manifest <manifest-local> --output <run-local>` con motor/material reales y protocolo acordado; fallos no producen accepted=true.
- Revisión de trazabilidad fuente/config/original/referencia/métricas/candidato/anclas y diff/secretos. Éxito de comando o existencia de JSON no bastan para go.

## Inputs

- `docs/validation/S06-protocol.md` — criterios aprobados.
- `docs/validation/S06-baseline.md` — motor/run real.
- `docs/validation/S06-quality.md` — mediciones/experimentos.
- `docs/validation/S06-notation-sync.md` — notación y alineación.
- `scripts/evaluate-song.ts` — entrada real.
- `.sdd/milestones/M001/slices/S06/S06-PLAN.md` — objetivo/aceptación y límites.

## Expected Output

- `docs/validation/S06-results.md` — resultado final reproducible, go/no-go y decisión requerida.
- `docs/validation/S06-quality.md` — evaluación final distinguida de calibración.
- `docs/validation/S06-notation-sync.md` — resultados finales/limitaciones, sin declarar renderer o producto terminado.
