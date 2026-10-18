# M001 — Roadmap histórico anterior a D013

**Historical record:** instantánea íntegra del roadmap previo, incluidas sus advertencias/propuestas de entonces. Fuera de cola; no cuenta como completado. El único roadmap operativo es M001-ROADMAP.md. S01/T01–T02 implementadas, S01 incompleta; T03/T04 y S02–S05 suspendidas. Ningún checkbox histórico acredita cierre por el cambio de alcance.

# M001: EasyJam Guitar Practice MVP

## Propuesta vigente D012 — pendiente de aprobación, no ejecutable

**Vision:** Biblioteca personal de canciones analizadas previamente y persistidas, practicables con pentagrama Y tablatura del arreglo simplificado, cursor/scroll gobernados por YouTube oficial visible. Calidad antes que velocidad; trabajo independiente del navegador.

### Success Criteria propuestos

- Cumplir los 14 pasos de M001-CONTEXT.md con canción completa/audio legítimo: URL→análisis real→original+arreglo+anclas guardados→Lista→pentagrama+TAB→Play oficial/cursor→reinicio/reapertura sin analizar.
- Cinco estados visibles: Pendiente, Analizando, Preparando arreglo, Lista, Error; cerrar navegador no cancela ejecutor activo, reinicio backend se recupera desde checkpoint sin duplicados/corrupción.
- Quintas/posiciones globales realmente tocables, compases/ritmo/duraciones/silencios/secciones conservados; original y arreglo separados.
- Navegación por compás/sección, anclas corregibles persistidas y cursor/scroll real: no avance autónomo en pausa/buffering ni salto optimista. Video visible, controles/tamaño/políticas respetados.

### Slices candidatas revisadas (no checkboxes operativos)

| ID | Riesgo | Depende de | Demo verificable |
|---|---|---|---|
| S06: Fuente autorizada y análisis de calidad | alto | Material/método/ejecución aprobados; reutiliza T01/T02 | URL cubierta→audio permitido→análisis real completo y calidad/alineación medidas; baseline y técnicas solo con mejora acreditada. Go/no-go antes del resto. |
| S07: Pentagrama+TAB/alphaTab y sync viable | alto | S06 | Piloto legítimo/revisado→notación del arreglo, cursor/scroll/compás/sección y YouTube visible real; pausa/buffering/seek/anclas y unidades comprobadas. No declarar pipeline/optimizador completos por un piloto. |
| S08: Biblioteca y trabajos durables | alto | S06,S07 | Añadir→trabajo persistido→original real guardado; cerrar navegador/volver, reinicio DB/backend, deduplicación concurrente y retry. Sin arreglo final aún no Lista. |
| S09: Arreglo notacional tocable persistido | alto | S08,S07 | Quintas, ritmo/rests, digitaciones globales, modelo/sync validados y publicación Lista; regeneración sin analizador ni pérdida del original/arreglo válido. |
| S10: Práctica integrada desde biblioteca | alto | S09,S07 | Seleccionar Lista→visor principal pentagrama+TAB→Play oficial→cursor/scroll/navegar→fin; ajustes mínimos de anclas guardados, buffering/errores/limpieza/accesibilidad y repetición condicionada. |
| S11: Aceptación y recuperación integradas | medio | S10 | Recorrido real de 14 pasos, cierre navegador durante análisis, restart/reuso sin motor, carreras/crash/rollback/retry/fallos SQL/proveedor; solo correcciones, sin funciones nuevas. |

### Riesgos, prueba y fronteras propuestos

- Fuente/derechos/calidad → S06: procedencia, transcripción neutral/versionada, referencia permitida, métricas por dimensión y recursos. Sin fuente, detener; no descarga, fixture ni cambio de entrada automático.
- Notación/renderer/interpolación → S07: adaptador al modelo, pentagrama+TAB/cursor/scroll oficiales alphaTab prioritario, pruebas YouTube/PlayerPort existente. Una limitación requiere decisión, no renderer propio o tarjetas por defecto.
- Persistencia/ejecutor → S08: identidad canónica, claim/checkpoint/publicación segura, estados+fase persistidos, resultado leído tras proceso nuevo. Sin microservicios; SQLite/Vue/TS siguen base propuesta del nuevo diseño, sin borrar S01 existente.
- Música/optimización → S09: original aceptado a arreglo neutral/inmutable con posiciones/compases/duración/sync; pruebas global vs exhaustivo pequeño/greedy/empates, receta reproducible.
- Ensamblaje real → S10/S11: práctica solo lectura sin analizador; SQLite/audio/análisis/video/reinicio reales, no dobles como prueba final. Alineación acústica independiente del reloj que selecciona cursor.
- Calidad prioritaria sin deadline ligado a duración. Heartbeat/red/recursos y detección de cuelgue justificados, sin porcentajes inventados o leases usadas para duplicar procesos vivos.

### Cobertura propuesta y aprobación

S06: R017/R012; S07: R002/R006/R013; S08: R018/R010; S09: R003/R004/R005; S10: R001/R006/R007/R008/R011; S11: R009 y aceptación transversal. Apoyos detallados en docs/mvp-proposal.md. R014–R016 diferidos, ningún requisito globalmente validado.

Los owners operativos históricos no se reasignan ni los estados se recalculan por esta propuesta. Tras aprobación formalizar reemplazo mediante SDD, preservar IDs/planes/commits y planificar manualmente una unidad por autorización. No auto, T03/T04, cierre, merge o push. Documentación de detalle: [producto](../../../docs/product.md), [ADR-002](../../../docs/adr/ADR-002.md), [propuesta](../../../docs/mvp-proposal.md). D012 precisa D011 y reemplaza la propuesta candidata previa S06–S10, que nunca se ejecutó.

## Registro histórico de suspensión D011 (previo a D012)

> **SUSPENDIDO POR D011 — registro del roadmap anterior, no cola autorizada.** El alcance vigente es biblioteca persistente con análisis real previo y SQLite, descrito en M001-CONTEXT.md y `docs/product.md`. La propuesta **S06 → S07 → S08 → S09 → S10**, dependencias, pruebas y riesgos está en [`docs/mvp-proposal.md`](../../../docs/mvp-proposal.md); arquitectura/modelo en [`ADR-002`](../../../docs/adr/ADR-002.md), ambos pendientes de aprobación. No se introducen nuevas slices ejecutables ni se reasigna ownership operativo antes de esa decisión.
>
> **Evidencia conservada:** T01 01c0c7d y T02 1b4690d están implementadas/verificadas en el worktree, con guía ficticia, no transcripción. S01 NO está completa. T03/T04 no se ejecutan. No marcar S01–S05 terminadas por cambio de alcance, ni borrar sus planes/IDs. Sin auto, cierre, merge o push.

## Roadmap anterior conservado como historial

Las secciones inferiores describen la propuesta S01–S05 previa y sus fronteras, no el alcance actual ni autorizaciones presentes. Reconciliar mediante SDD después de aprobar el reemplazo; preservar commits/evidencia.

**Vision:** Acompañar una canción completa con guitarra rítmica fácil, quintas cómodas elegidas globalmente y guía de ritmo/silencios/secciones sincronizada con YouTube real visible.

## Success Criteria

- Principiante/intermedio puede seguir una canción completa autorizada con vídeo permitido, sin catálogo o generación automática.
- Quintas y posiciones respetan seis cuerdas, afinación estándar y trastes 0–12; ambigüedades se señalan y empates son deterministas.
- Pausa, navegación y repetición de sección reflejan el estado/tiempo observado y los límites aceptados.
- Fallos tienen explicación y no borran el arreglo válido ni simulan precisión.

## Key Risks / Unknowns

- Tiempo/saltos/bucles de YouTube no garantizan precisión musical o retorno continuo.
- Derechos del arreglo/canción reales pendientes para S02; S01 tiene el ejemplo técnico oficial M7lc1UVf-VE y guía ficticia rotulada. Privacidad, identidad y reproducción integrada requieren comprobación.
- Coherencia del arreglo y comodidad no se acreditan solo con un algoritmo.
- Modelo temporal y renderizador aún no elegidos.

## Proof Strategy

- Riesgo externo → S01 con guía mínima real, medición y decisión de viabilidad antes de funcionalidades complejas.
- Contenido/coherencia → S02 con canción completa autorizada y validación musical.
- Coste global → S03 con posiciones reales, comparación exhaustiva pequeña, caso greedy fallido y evaluación tocando.
- Ensamblaje → S04 conecta; S05 repite el recorrido completo real sin añadir funciones.

## Verification Classes

- Contract verification: Vitest/contratos/validación/E2E deterministas; tipos, lint y build. Herramientas aprobadas para S01 con pnpm/Node LTS; versiones exactas por fijar en T01, ejecución todavía no autorizada.
- Integration verification: iframe oficial real, guía/tablatura, saltos, pausa, repetición y fallos; red externa fuera de CI determinista.
- Operational verification: desmontaje/reapertura, limpieza de suscripciones/timers, estados de carga/buffering/error.
- UAT / human verification: comodidad tocando, coherencia del arreglo, desfase perceptivo y utilidad del retorno. El agente verifica lo que pueda; hardware inaccesible se declara no probado.

## Milestone Definition of Done

This milestone is complete only when all are true:

- S01–S05 terminadas con evidencia y contratos conectados.
- Entrada real local ejercitada de principio a fin con canción completa/vídeo autorizados.
- Medidas contrastadas con criterios aprobados tras S01; inviabilidad de repetición resuelta con el usuario, no omitida.
- Tests deterministas/tipos/lint/build pasan; derechos, privacidad, accesibilidad y recuperación revisados.
- Ninguna declaración de validación con usuarios basada solo en esta canción.

**Execution gate:** este roadmap no autoriza código ni auto. Detenerse tras planificar S01 y solicitar aprobación explícita antes de T01. No planificar tareas de S02 ni cerrar el milestone.

## Requirement Coverage

- Covers: R001, R002, R003, R004, R005, R006, R007, R008, R009, R010, R011, R012, R013.
- Partially covers: none; R007 sigue condicionado a viabilidad y acuerdo, no validado.
- Leaves for later: R014, R015, R016, R017, R018. Excluye R019, R020.
- Orphan risks: ninguno sin dueño; material/privacidad/entornos en S01, renderer en S04, coste en S03.

| Owner | Requirements | Supporting |
|---|---|---|
| S01 | R001, R002, R010, R012 | S04, S05; S02 para permisos del arreglo |
| S02 | R003, R013 | S01, S03, S04, S05 |
| S03 | R004, R005 | S04, S05 |
| S04 | R006, R007, R008, R011 | S01, S02, S03, S05 |
| S05 | R009 | S01, S02, S03, S04 |

## Slices

- [ ] **S01: YouTube real y guía mínima** `risk:high` `depends:[]`
  > After this: reproducir un vídeo fijo permitido, seguir una guía pequeña y navegar/probar repetición con medidas reales documentadas; no una canción completa optimizada todavía.
- [ ] **S02: Arreglo completo válido** `risk:medium` `depends:[S01]`
  > After this: abrir/explorar la canción completa autorizada con secciones, ritmo y silencios validados, sin prometer aún la tablatura integrada final.
- [ ] **S03: Quintas y optimización global** `risk:high` `depends:[S02]`
  > After this: ver y tocar la secuencia de quintas elegida globalmente, con posiciones válidas y pruebas reproducibles del coste declarado.
- [ ] **S04: Práctica completa integrada** `risk:high` `depends:[S01,S02,S03]`
  > After this: seguir tablatura, ritmo y silencios con vídeo real, saltar y repetir según viabilidad aceptada, con errores y controles accesibles.
- [ ] **S05: Aceptación final del MVP** `risk:medium` `depends:[S04]`
  > After this: recorrido completo real y pruebas de regresión/accesibilidad/recuperación documentados; sin nuevas funcionalidades significativas ni afirmar validación con usuarios.

S02 precede a S03 por dependencia de contenido válido, no por menor riesgo. S05 es la comprobación explícita final del ensamblaje; solo corrige defectos de lo existente.

## Boundary Map

Los nombres siguientes son contratos planificados, no archivos o exports ya existentes. Los de S02–S04 se concretarán al planificar cada slice, actualizando este mapa si la evidencia cambia la frontera.

### S01 → S02

Produces:
- `src/application/player-port.ts` → `PlayerSnapshot`, `PlayerPort`: segundos observados, estados normalizados, play/pause/seek y dispose; no promesa de seek exacto.
- `src/infrastructure/youtube-player.ts` → `createYouTubePlayer()`: adaptador oficial, estados/errores y limpieza.
- `src/application/guide-session.ts` → `selectGuideFrame()`, sesión mínima con secciones temporizadas, silencio y estado de repetición; no modelo definitivo de arreglo.
- `docs/validation/S01-youtube.md` → resultados reales, método, incertidumbre, límites y criterios propuestos; incluye decisión pendiente sobre continuidad.

Consumes:
- nada de slices anteriores; documentos aprobados, material autorizado y propuesta de stack aprobada para ejecución.

### S01 → S04

Produces:
- `PlayerPort`, `PlayerSnapshot`, `createYouTubePlayer()` y evidencia S01 definidos en la frontera S01 → S02; se reutilizan sin duplicar proveedor.

Consumes:
- Documentos aprobados y material mínimo permitido; nada de otras slices.

### S02 → S03

Produces:
- Contrato `Arrangement` validado: identidad/revisión/procedencia, afinación, dificultad fácil, secciones, eventos con inicio/duración musical y ritmo/silencios; relación explícita con fuente multimedia separada.
- Resultado de carga válido/error de validación y material completo autorizado. Unidades y reglas temporales se fijan con la canción, sin API YouTube en dominio.

Consumes:
- S01 → restricciones reales del proveedor y evidencia; no convertir su guía mínima en esquema definitivo por defecto.

### S02 → S04

Produces:
- El mismo contrato `Arrangement`, resultado válido/error y material completo descritos en S02 → S03; estructura musical independiente del proveedor.

Consumes:
- S01 → restricciones reales del proveedor; no reutilizar su guía mínima como esquema definitivo por defecto.

### S03 → S04

Produces:
- Conversión de eventos a quintas con tiempos conservados o error/revisión explícitos.
- Candidatos válidos cuerda/traste y secuencia seleccionada para la progresión completa, coste declarado y desempate determinista.

Consumes:
- S02 → arreglo validado, afinación/eventos/ritmo y límites temporales.

### S04 → S05

Produces:
- Pantalla de práctica completa: proyección tiempo multimedia ↔ posición musical, tablatura de posiciones seleccionadas, sección/evento actual/siguiente, navegación y repetición aceptada.
- Estado visible de carga/buffering/pausa/error, conservación del arreglo y limpieza de la sesión.

Consumes:
- S01 → contrato/adaptador/evidencia; S02 → arreglo válido; S03 → eventos/posiciones. Renderer no decide digitaciones.

### S05 — Final acceptance outputs

Produces:
- Evidencia reproducible del recorrido real completo y matriz de aceptación, pruebas de regresión y revisión de derechos/privacidad/accesibilidad.
- Correcciones de defectos si se detectan; sin nuevas funciones significativas.

Consumes:
- Aplicación integrada S04 y contratos/material/evidencia S01–S03; criterios cuantitativos aprobados a partir de S01.
