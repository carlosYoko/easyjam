---
estimated_steps: 5
estimated_files: 5
skills_used:
  - test
---

# T02: Crear evaluador local y contratos de entrada/salida

**Slice:** S06 — Fuente autorizada y análisis de calidad
**Milestone:** M001

**Status:** Completada el 2026-11-01 tras autorización explícita. CLI/contratos y fallos verificados con 113 tests; sin analizador real ni material aceptado. Evidencia en T02-SUMMARY.md y docs/validation/S06-evaluator.md. T07 permanece pendiente de autorización/evidencia.

## Description

Solo tras T01 documental, revisión de la propuesta de contratos/protocolo y autorización explícita de esta unidad. D014 permite construir contratos/diagnósticos con material aún no aceptado: dobles solo en tests, rechazo explícito de fuente/referencia no acreditadas, sin análisis ni aceptación ficticia. T07 sigue obligatoria antes de T03. Evaluador de experimento local, no API/backend/biblioteca/DB. Dominio no importa motor; script orquesta adaptador mediante contrato pequeño.

## Steps

1. Leer salida T01 y acordar manifest/versionado/unidades y salida original neutral: referencia de fuente/checksum/config/engine y estado por dimensión. Datos no disponibles son desconocidos, no silencio/notas inventadas.
2. Añadir primero pruebas de manifest/salida y fallos, incluyendo permiso/ruta ausente, valores no finitos/negativos, duraciones imposibles y reporte sin aceptación parcial.
3. Implementar contratos/validación y CLI seguro sin shell con datos no confiables; crear `evaluate:s06` con mínimo runtime compatible con Node/TS fijados. No framework genérico ni dependencia sin necesidad.
4. Conectar flujo real de entrada/validación/reporte y error explícito si no hay adaptador real, sin TODO/éxito fingido. Dobles solo en tests, integración motor T03.
5. Probar CLI inválido y checks, registrar configuración/versiones/fase/exit seguro; pedir autorización siguiente.

## Must-Haves

- [x] CLI ejecutable/contrato probado y datos inválidos rechazados.
- [x] Motor ausente/entrada no autorizada no producen transcripción ni aceptación ficticia.
- [x] Base T01/T02 de S01 sin regresiones; sin DB/renderer/backend innecesarios.

## Verification

- `pnpm run lint && pnpm run typecheck && pnpm run test --run && pnpm run build`.
- `pnpm run evaluate:s06 --manifest <manifest-invalido-local> --output <run-local>` falla no cero con código/fase seguros; prueba automatizada para no depender de inspección de texto.
- Confirmar script/dependencias realmente disponibles antes de documentar su ejecución; publicar solo reporte saneado.

## Observability Impact

- Signals added/changed: run ID/fase/fechas/código seguro/versiones, no progreso musical falso.
- How a future agent inspects this: CLI y reporte JSON local versionado.
- Failure state exposed: input inválido, permiso/motor ausente, no salida aceptada; sin tokens/rutas personales en logs versionados.

## Inputs

- `docs/validation/S06-material.md` — investigación T01 y material aún no aceptado; no oráculo de transcripción.
- `.sdd/milestones/M001/slices/S06/tasks/T07-PLAN.md` — puerta obligatoria de material/referencia antes del análisis T03.
- `docs/validation/S06-protocol.md` — evaluación/errores.
- `package.json` — base real/gestor/versiones.
- `tsconfig.json` — integración TS estricta.
- `.sdd/milestones/M001/slices/S06/S06-PLAN.md` — límites.

## Expected Output

- `scripts/evaluate-song.ts` — entrada CLI real.
- `src/application/analysis-evaluation.ts` — contratos/validación/orquestación mínima.
- `tests/unit/analysis-evaluation.test.ts` — contratos/fallos/reporte.
- `package.json` — script nuevo mínimo; lockfile/config solo si necesario y justificado.
