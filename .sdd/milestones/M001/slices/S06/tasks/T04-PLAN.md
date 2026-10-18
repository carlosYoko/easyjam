---
estimated_steps: 5
estimated_files: 4
skills_used:
  - test
---

# T04: Medir calidad y comparar una mejora justificada

**Slice:** S06 — Fuente autorizada y análisis de calidad
**Milestone:** M001

## Description

Tras baseline T03 y autorización: establecer evidencia de calidad útil para rítmica; no optimizar latencia ni añadir motores/multipaso por intuición. Acordar criterios antes de evaluación final T05/T06, sin ajustar umbrales para hacer pasar datos ya vistos.

## Steps

1. Revisar original y referencia independiente con incertidumbre; delimitar calibración/evaluación y qué dimensiones no existen en salida.
2. Preparar pruebas/oráculos de cambios/acordes ponderados por tiempo, eventos omitidos/extra, beats/downbeats si hay referencia, error temporal/anclas y manejo de desconocidos.
3. Implementar métricas puras separadas de proveedor, sin agregado que esconda errores; medir baseline frente a referencia real y costes/recursos.
4. Si existe hipótesis útil, comparar UNA técnica madura/preproceso/multipaso contra baseline sobre mismo material/configuración controlada; registrar degradaciones/latencia/mapping. Si no se justifica, documentar por qué se conserva baseline sin complejidad adicional.
5. Proponer criterios numéricos/método justificados por datos de calibración, precisión de referencia y utilidad rítmica; pedir aprobación explícita antes de veredicto/holdout. No declarar aceptada mezcla completa ni silencio por N.C.

## Must-Haves

- [ ] Métricas/referencia independientes, pruebas con errores conocidos y falta de datos visible.
- [ ] Comparación reproducible o justificación explícita para no añadir técnica innecesaria.
- [ ] Criterios pendientes de aprobación identificados; sin ellos no ejecutar veredicto final ni dar go.

## Verification

- `pnpm run test --run && pnpm run typecheck` y ejecución reproducible del evaluador real acordado.
- Inspeccionar resultados por dimensión y muestras de errores; distinguir análisis real, arreglos derivados y correcciones manuales.
- El informe no es prueba de calidad por existir: métricas, fuente, incertidumbre y criterio aprobado deben poder reconstruirse.

## Observability Impact

- Signals added/changed: versión de métricas, referencia/segmentos/configuración, resultados/coste por técnica y campos faltantes.
- How a future agent inspects this: reporte local y S06-quality/protocol.
- Failure state exposed: referencia inválida/incompatible, datos insuficientes y criterio no aprobado, no false pass.

## Inputs

- `docs/validation/S06-protocol.md` — método y segmentos.
- `docs/validation/S06-baseline.md` — resultado real T03.
- `src/application/analysis-evaluation.ts` — original/contratos.
- `src/infrastructure/music-analyzer.ts` — adaptación real para experimento justificado.

## Expected Output

- `src/application/analysis-metrics.ts` — métricas puras/testables.
- `tests/unit/analysis-metrics.test.ts` — oráculos/casos límite.
- `docs/validation/S06-quality.md` — comparación/evidencia/coste/limitaciones.
- `docs/validation/S06-protocol.md` — propuesta/revisión de criterios y puerta de aprobación antes de final.
