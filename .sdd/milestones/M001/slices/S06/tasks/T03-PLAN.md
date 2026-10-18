---
estimated_steps: 5
estimated_files: 6
skills_used:
  - test
---

# T03: Conectar motor maduro y ejecutar línea base real

**Slice:** S06 — Fuente autorizada y análisis de calidad
**Milestone:** M001

## Description

Tras T02 y autorización explícita: convertir evaluador en recorrido real fuente→motor→original. El motor se elige por evidencia T01, no por nombre fijo en una propuesta. Instalar únicamente lo necesario con licencia/versiones/configuración revisadas, sin servicios/costes externos no autorizados.

## Steps

1. Revisar protocolo/material y plataforma; validar versión/compatibilidad/licencia y forma de invocación desde documentación actual, detener si falta permiso/herramienta viable.
2. Implementar adaptador a herramienta(s) madura(s) seleccionada(s) y parser validado del resultado no confiable. No detector/separador propio, ni motor como dependencia de Vue.
3. Integrar CLI y probar salida inválida/error de motor con señales seguras y sin éxito parcial. Proceso externo controlado, recursos/timeout operacional justificados, sin corte por duración de canción.
4. Ejecutar canción completa autorizada, conservar original local y provenance/config/checksum/versiones/tiempos/recursos. Separar calibración de evaluación final; no usar referencia como salida del motor.
5. Registrar baseline/rango de calidad aparente/incertidumbre y fallos; no declarar notación/URL única/renderer/SQLite probados ni continuar automáticamente.

## Must-Haves

- [ ] Salida real de armonía/cambios/tiempos con original neutral y fase/versión trazables.
- [ ] Canción completa real, no solo clip/fixture; falta de capacidades queda explícita.
- [ ] Fallo de motor probado y no convertido en artefacto aceptado.

## Verification

- `pnpm run lint && pnpm run typecheck && pnpm run test --run && pnpm run build`.
- `pnpm run evaluate:s06 --manifest <manifest-local> --output <run-local>` ejecuta herramienta real y conserva evidencia reproducible sin publicar material no permitido.
- Ejecutar caso controlado de fallo y verificar código no cero/fase/error seguro. Motor no viable/material inválido → bloqueo, no tarea completada con fixture.

## Observability Impact

- Signals added/changed: engine/model/config/source checksum, fase, duración/recursos/exit status reales.
- How a future agent inspects this: reporte local y baseline saneado, comando/config versionados.
- Failure state exposed: invocación/salida/validación/cuelgue con código/fase, sin retry infinito o credenciales.

## Inputs

- `docs/validation/S06-material.md` — derechos y grabación.
- `docs/validation/S06-protocol.md` — candidato/runtime/recursos.
- `scripts/evaluate-song.ts` — CLI T02.
- `src/application/analysis-evaluation.ts` — contratos T02.
- `tests/unit/analysis-evaluation.test.ts` — pruebas a ampliar.

## Expected Output

- `src/infrastructure/music-analyzer.ts` — adaptador validado a motor real.
- `scripts/evaluate-song.ts` — composición con motor real.
- `tests/unit/analysis-evaluation.test.ts` — fallos de integración de frontera.
- `docs/validation/S06-baseline.md` — ejecución/método/versiones/recursos/límites, original local referenciado sin secretos.
- `package.json` — cambios solo si hacen falta; lockfile/dependencias fijados sin instalación especulativa.
