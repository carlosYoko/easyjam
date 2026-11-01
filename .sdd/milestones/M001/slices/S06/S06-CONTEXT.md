# S06: Fuente autorizada y análisis de calidad

**Gathered:** 2026-10-18
**Status:** T01 documental completada bajo separación explícita D014 (2026-10-31). T07 conserva la aceptación de material/referencia como puerta obligatoria antes de T03. T02 autorizada explícitamente y completada el 2026-11-01: contratos/CLI sin motor, 113 tests y lint/tipos/build verificados. Revisión acotada T07 autorizada y realizada el 2026-11-01; BLOQUEADA y sin completar por referencia temporal/correspondencia/segmentos/herramientas no acreditados, según docs/validation/S06-reference.md. T03 y restantes no iniciadas; sin auto, cierre de slice, merge o push. Archivo S06 no acredita URL única.

## Project Description

Primera slice del roadmap revisado M001. Experimento integrado real de audio permitido→motor→original neutral→métricas→candidato notacional/anclas, mediante evaluador local, sin construir biblioteca/backend/SQLite/renderer/optimizador global completos.

## Why This Slice

Mayor riesgo: obtener audio legítimo y transcripción útil/alineada para guitarra rítmica. Calidad antes que velocidad. No construir sistema completo encima de calidad o permisos supuestos.

## User-Visible Outcome

### When this slice is complete, the user can:

Revisar ejecución reproducible de canción completa, original real conservado, calidad y límites por dimensión, candidato notacional y alineación independiente. Decidir go/no-go con criterios acordados, sin confundir archivo S06 con entrada URL sola del producto o candidato JSON con renderer real.

### Entry point / environment

Evaluador CLI local `pnpm run evaluate:s06` disponible en .sdd/worktrees/M001 para validación/diagnóstico; todavía sin adaptador de producción. Node/TS/pnpm de base existente. Archivo independiente permitido, referencia legítima y grabación YouTube correspondiente si disponible. Cerrar navegador no es prueba async de producto en esta slice; eso pertenece S08.

## Completion Class

- Contract complete means: validación manifest/original/métricas/candidato/anclas y diagnósticos, tests/regresiones/typecheck/lint/build.
- Integration complete means: canción completa y motor reales, referencia independiente y calidad/notación/alineación comprobadas, fallo diagnosticado.
- Operational complete means: experimento reproducible con versiones/config/recursos y artefactos locales protegidos; DB/jobs/restart de producto pendientes S08/S11.

## Final Integrated Acceptance

1. Material/permiso/referencia completos acreditados.
2. Comando local ejecuta motor real sobre canción completa y conserva original/versiones/recursos.
3. Métricas independientes de armonía/cambios/tiempos y límites de ritmo/métrica/rests/secciones.
4. Baseline y mejora aislada solo si justificada, sin supuestas mejoras automáticas.
5. Candidato notacional coherente y anclas/identidad de grabación, incertidumbre y pérdidas comprobadas; no renderer/global optimizer pretendidos.
6. Criterios aprobados antes de evaluación final, recorrido/fallo reproducidos, go/no-go revisado. Sin fuente/criterios/calidad suficiente: bloqueada, no cierre ficticio.

## Risks and Unknowns

Code Monkey adquirido/decodificado con fuente oficial y checksum; hoja armónica del artista y reproducción iframe verificadas. No material/referencia completa aceptados ni correspondencia musical acreditada. GAPS presenta referencia alineada prometedora, pero permisos/procedencia no resueltos; el usuario no autoriza contacto externo. No benchmark, motor compatible o umbral aceptados. Armonía no determina rasgueos/rests, N.C. no prueba silencio. Candidato notacional puede requerir datos ausentes. Grabaciones/cortes/velocidad distintos impiden mapear por un offset. Tiempo/coste/recursos y licencias/plataforma por medir; no SLA de duración musical.

## Existing Codebase / Prior Art

PlayerPort/YouTube adapter/guía ficticia T01/T02 y 65 tests en worktree, 01c0c7d/1b4690d. No analizan audio, no son referencia musical. S01/T03/T04 suspendidas y S01 incompleta. Vídeo técnico M7lc1UVf-VE conservado como historia, no audio de prueba musical a extraer.

## Relevant Requirements

D013 → primarios R012/R017; apoyo R002/R003/R013 y aceptación parcial R009. EJ-004 fuente/calidad; EJ-007–009 parcialmente candidatos, no capacidades de práctica completas. R018/URL sola siguen pendientes con archivo. Trazabilidad por tarea en S06-PLAN.md.

## Scope

### In Scope

T01 investigación documental completada; T02 evaluador/contratos completada sin analizador ni material aceptado; T07 aceptación obligatoria de material/referencia y protocolo antes de T03; T03 motor+baseline real; T04 calidad/experimento mínimo y puerta de criterios; T05 notación/alineación candidata; T06 repetir evaluación e informe de decisión. Orden explícito T01 → T02 → T07 → T03 → T04 → T05 → T06, sin renumerar IDs existentes.

### Out of Scope / Non-Goals

Producto upload/import, descarga YouTube, URL arbitraria garantizada, siete tablas/framework de jobs, backend/biblioteca/SQLite, renderer UI alphaTab/cursor/scroll de S07, optimizador global S09, práctica S10, cierre milestone/auto/push. Ninguna tarea se ejecuta antes de revisar plan y autorizar esa unidad.

## Technical Constraints

Preferir herramientas maduras con licencia/versiones/Windows comprobados. No detector/separador propio ni cloud/coste sin permiso. Modelos neutrales/validados, dominio sin proveedor; script orquesta, ningún análisis en Vue. Calidad prioritaria con recursos/cuelgue justificados, sin ratios de duración arbitrarios. Reportes saneados, audio/protegidos/rutas personales/secretos solo locales según permiso.

## Integration Points

Contrato análisis mínimo/evaluador→adaptador motor→original/versiones/checksum; métricas puras/ref independiente→candidato/anclas. Reutilizar reproductor oficial para revisar grabación, no acceder a audio iframe ni generar segundo reloj como prueba de alineación. S07 recibirá evidencia/modelo/candidato, no adopción de librería todavía.

## Open Questions

T01 documenta hallazgos/propuesta; D014 traslada material/referencia y revisión del protocolo a T07 obligatoria antes del análisis. T02 ha preparado contratos y fallos con autorización explícita, sin aceptar candidatos o ejecutar motor. T03/T04 aportarán calibración para umbrales a aprobar antes de T05/T06. Sin evidencia suficiente, T07 bloqueada; S06 conserva todos sus criterios de derechos/calidad. Planes T01–T07 describen las unidades; solo T01 y T02 están cerradas, con evidencia en sus resúmenes. T07 es la siguiente unidad: revisión acotada realizada, tarea bloqueada y puerta no aceptada; T03 sigue prohibida.
