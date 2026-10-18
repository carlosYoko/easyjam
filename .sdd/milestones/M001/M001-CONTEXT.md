# M001: EasyJam Guitar Practice MVP

**Gathered:** 2026-10-18
**Status:** Producto, ADR-002 como dirección inicial y roadmap S06–S11 aprobados por D013. Formalización/planificación S06, no ejecución de código. Manual, una unidad autorizada por vez.

## Project Description

Dos pantallas: Mi biblioteca (vacío/Añadir URL, listado simple/estados/reutilización) y práctica (pentagrama+TAB del arreglo simplificado, cursor/scroll/compases/secciones/duraciones/rests/navegación y vídeo YouTube oficial visible). Transcribir previamente y conservar original/arreglo/alineación en SQLite; practicar/reabrir/regenerar no reanaliza audio.

Guitarra rítmica fácil/principiante-intermedio, seis cuerdas E A D G B E, trastes 0–12 inclusivos, quintas de dos notas con alternativas justificadas y digitaciones globales deterministas. Ritmo/rests/progresión/secciones conservados; no reconstrucción exacta de todos los instrumentos/solos/riffs.

## Why This Milestone

Cerrar recorrido reutilizable de preparación musical real y práctica, retirando planes obsoletos sin perder base T01/T02. Fuente/calidad y renderer/sync se prueban temprano antes de infraestructura/pipeline completos.

## User-Visible Outcome

### When this milestone is complete, the user can:

- Ver Mi biblioteca, añadir URL cubierta, detectar/reutilizar procesadas y abrir listas directamente.
- Observar exactamente Pendiente / Analizando / Preparando arreglo / Lista / Error y motivo/fase reales. Cerrar navegador no cancela ejecutor activo; apagar backend/equipo puede interrumpirlo y exige reconciliación.
- Practicar pentagrama Y tablatura del mismo arreglo guardado, cursor/scroll/sección y navegación por compás/sección; pausa/buffering sin avance autónomo, seek observado/anclas corregibles persistidas.
- Reiniciar/reabrir con misma biblioteca/artefactos, sin análisis; regeneración o ajuste sync tampoco analiza ni destruye arreglo válido previo.

### Entry point / environment

- Entry point: futura Mi biblioteca HTTP local; la base actual está en .sdd/worktrees/M001, no integrada en main.
- Environment: Chrome/Chromium escritorio, local monousuario/loopback; sin backend público sin otra decisión.
- Live dependencies involved: YouTube oficial, futura SQLite en fichero/motor/fuente permitida. AlphaTab prioritario, no adoptado. .sdd/sdd.db pertenece al agente.

## Completion Class

- Contract complete means: identidad/URL, reglas musicales/notacionales/anclas, versiones y fronteras runtime validadas y testeadas.
- Integration complete means: fuente/analizador reales→original→arreglo global→SQLite/biblioteca→pentagrama+TAB/YouTube/cursor/scroll conectados.
- Operational complete means: navegador cerrado durante análisis, proceso nuevo/SQLite/reinicio, concurrencia/claim/checkpoint/rollback/fencing/retry sin corrupción ni análisis repetido al reutilizar.

## Final Integrated Acceptance

To call this milestone complete, we must prove:

1. Abro EasyJam.
2. Veo Mi biblioteca.
3. Añado canción nueva por URL.
4. Se identifica/valida material.
5. Se procesa fuente autorizada correspondiente al vídeo.
6. Se genera transcripción musical real útil para rítmica.
7. Se genera arreglo simplificado en quintas y posiciones globales.
8. Se guarda original/arreglo/alineación en SQLite.
9. La canción aparece Lista.
10. Abro y veo pentagrama Y tablatura del arreglo simplificado.
11. Pulso Play en YouTube oficial visible.
12. Cursor/scroll siguen reloj observado; pausa/buffering/seek/navegación correctos.
13. Cierro/reabro, incluyendo nuevo proceso backend/DB en prueba operativa.
14. La canción sigue disponible sin volver a transcribir.

Además cerrar navegador durante análisis, volver a estado/resultado; carreras/crash/rollback/retry y regeneración/anclas sin motor. Audio/análisis/DB/vídeo/reinicio reales, no fixtures/dobles como aceptación final. Lista exige original aceptado/arreglo/sync válidos.

## Risks and Unknowns

- Fuente/resolutor/cobertura/permiso para URL sola no acreditados. D013 autoriza archivo independiente permitido solo en experimento S06. No implica producto upload ni resolver requisito URL única, que debe demostrarse o cambiarse explícitamente antes de aceptación final.
- Calidad antes que velocidad; puede tardar mucho más que canción, recursos/cuelgue justificados y heartbeat/red/progreso distintos. Métricas/umbrales con referencia/calibración/acuerdo antes de veredicto final; armonía no prueba ritmo/rests/secciones, N.C. no prueba silencio.
- Modelo/serialización/transposición/anclas/ocurrencias y alphaTab/units/buffering/seek/accesibilidad/licencia/assets no probados. Alineación independiente del mismo reloj selector, no SLA/gapless por polling.
- Error 5 intermitente aceptado D010 sigue abierto. Backend/driver/motor/recursos/recuperación de ejecución incierta por decidir con evidencia.

## Existing Codebase / Prior Art

T01 01c0c7d/T02 1b4690d en worktree milestone/M001: Vue/Vite/TS, versiones/lockfile, PlayerPort/adapter oficial, reloj observado/selección [inicio,fin)/navegación de guía ficticia, 65 tests y evidencia real. No son transcripción/renderer. src/application/player-port.ts, src/infrastructure/youtube-player.ts, src/application/guide-session.ts y docs/validation/S01-guide.md/S01-youtube-controlled.md se reutilizan; no cambiar resúmenes completados. S01 no completada.

> See `.sdd/DECISIONS.md` for all architectural and pattern decisions — it is an append-only register; read it during planning, append to it during execution.

## Relevant Requirements

R001–R013/R017/R018 activos, ninguno validado globalmente; owners actualizados al roadmap D013. R014–R016 diferidos, R019/R020 exclusiones. S06: R012/R017 primarios, apoya R002/R003/R013. T01 material/protocolo; T02 contratos; T03 baseline real; T04 métricas/calidad; T05 notación/alineación; T06 evaluación/go-no-go. Scope de archivo no cierra URL única ni requisitos globales.

## Scope

### In Scope

Biblioteca/URL, análisis previo real/durable, SQLite/reuso/dedupe, original/arreglo/sync separados, quintas/optimización global, pentagrama+TAB/cursor/scroll/navegación/YouTube visible/anclas corregibles, errores/recuperación y repetición condicionada. Ahora solo formalizar y planificar S06; archivo permitido para prueba, calidad antes de rapidez.

### Out of Scope / Non-Goals

Cuentas/multiusuario/pagos/estadísticas/favoritos/filtros/editor completo, microservicios/colas externas, cualquier URL o mezcla garantizada, solos/riffs/afinaciones/dificultades extra, A/B arbitrario/gapless garantizado. Sin código todavía, auto/milestone completo, implementación S07–S11, cierre, merge/push o .gitignore ajeno.

## Technical Constraints

D013 aprueba Vue3/TS, backend local mínimo, SQLite, módulos/adaptadores sustituibles, original/arreglo separados y procesamiento durable. ADR-002 es dirección inicial ajustable por pruebas, NO obligación de siete tablas: mínimo suficiente, KISS/SOLID/YAGNI. Driver/framework/motor/renderer/serialización se fijan con evidencia/autorización.

Dominio independiente de Vue/SQL/YouTube/alphaTab/motor, puertos/validación por frontera real, sin repositorio universal/capas especulativas. Modelo notacional neutral/versionado; renderer muestra arreglo sin decidir digitaciones. alphaTab primero, no renderer propio si biblioteca madura sirve.

## Integration Points

Fuente/analizador sustituibles→original; generación→arreglo/receta/posiciones; almacenamiento/jobs→estado/checkpoints/publicación seguros; renderer→notación; PlayerPort→tiempo observado/anclas/cursor. Red/motor fuera de transacciones, práctica de lectura sin análisis. Conservar base técnica y evidencia sin merge automático.

## Open Questions

Fuente/mapping/cobertura URL, material/referencia autorizados, métricas/criterios/recursos y motor/pipeline, modelo exacto y alphaTab, backend/driver/ejecutor/path/backup. T01 busca/verifica material/protocolo sin código, no exige al usuario trabajo que agente pueda hacer. Falta de fuente bloquea, no produce fixture.

Native steering: appendOverride implementa `/sdd steer`; nuevo roadmap activo S06–S11, anterior preservado M001-ROADMAP-HISTORY.md. S01/T03–T04 y S02–S05 explícitamente suspendidas, no completadas. Replan documentado en S01-REPLAN.md; no inventar completed-slice/blocker para invocar reassess/replan automáticos. Ambas copias deben derivar S06/T01; reconstrucción STATE solo nativa. Revisión del plan antes de ejecutar una unidad mediante `/sdd dispatch execute`; nunca `/sdd auto`/next loop sin autorización.
