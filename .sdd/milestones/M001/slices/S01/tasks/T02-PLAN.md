---
estimated_steps: 5
estimated_files: 4
skills_used:
  - frontend-design
  - test
---

# T02: Conectar guía mínima al reloj observado y navegar secciones

**Slice:** S01 — YouTube real y guía mínima
**Milestone:** M001

## Description

Depende de T01: reutiliza su contrato/adaptador/entrada. Mostrar acorde y sección actuales/siguientes y silencios con datos mínimos preparados, sin implementar el esquema completo de S02. La aprobación documental no autoriza esta tarea.

## Steps

1. Leer resumen/evidencia de T01 y su contrato real; si cambió la frontera, actualizar plan/mapa antes de seguir.
2. Preparar guía ficticia pequeña con al menos dos secciones, acordes y silencio; rotular de forma persistente «Secuencia ficticia de prueba técnica; no transcripción del vídeo». Separar referencia musical (compás/pulso/duración) de correspondencia a segundos en la fuente concreta. No evaluar coherencia armónica con el audio del ejemplo ni imponer ticks/PPQ/anclas como esquema definitivo.
3. Desarrollar `selectGuideFrame()` pura con pruebas de intervalos [inicio, fin), tiempo finito/no negativo, límites y datos inválidos; huecos no se muestran como rasgueo.
4. Conectar snapshots y controles de sección; usar tiempo observado, no avanzar por acumulación UI. Preservar pausa y reflejar buffering; no asumir que seek desde cued es inocuo. Observar cambios hechos en controles nativos del iframe.
5. Verificar tests/checks y reproducir/pausar/buscar realmente desde distintos estados, anotando restricciones para T04. Commit atómico S01/T02.

## Must-Haves

- [ ] Guía actual/siguiente y sección corresponden a segundos observados, incluidos silencios y límites.
- [ ] Pausa/buffering no generan avance autónomo; buscar repetidamente no selecciona por target sin observación.
- [ ] Guía separada de YT y esquema definitivo del arreglo; datos preparados identificados como tales.
- [ ] Página usa la función testeada y el adaptador real de T01; no solo una vista ficticia.

## Verification

- `pnpm run test --run && pnpm run typecheck && pnpm run build`.
- `tests/unit/guide-session.test.ts`: límites, silencio, input inválido, pause/buffering, snapshots anteriores/posteriores a seek.
- Navegador con vídeo permitido: play/pause, salto adelante/atrás y desde pausa; comparar selección con reloj observado y anotar limitaciones, sin declarar precisión audible todavía.

## Observability Impact

- Signals added/changed: sección/evento actual, tiempo observado y destino solicitado de navegación.
- How a future agent inspects this: diagnóstico de página y tests de selección.
- Failure state exposed: guía inválida o tiempo no utilizable, sin acorde ficticio ni movimiento optimista.

## Inputs

- `src/application/player-port.ts` — T01: snapshots/órdenes.
- `src/infrastructure/youtube-player.ts` — T01: proveedor real.
- `src/App.vue` — T01: entrada/controles.
- `docs/validation/S01-material.md` — material de prueba aprobado y límites de uso.

## Expected Output

- `src/application/guide-session.ts` — `selectGuideFrame()` y sesión mínima desacoplada.
- `src/fixtures/minimal-guide.ts` — secciones, acordes/silencio y correspondencia temporal de prueba.
- `src/App.vue` — guía y navegación conectadas al proveedor.
- `tests/unit/guide-session.test.ts` — reglas/intervalos y comportamiento con snapshots.
