# Project

## What This Is

EasyJam es una biblioteca de canciones previamente transcritas para practicar guitarra rítmica con pentagrama Y tablatura reales del arreglo simplificado, visualmente inspirados en Songsterr. Se analiza antes de practicar y se conservan original/arreglo/alineación. URL sola es objetivo condicionado a una fuente independiente autorizada correspondiente al vídeo; no está acreditada.

## Core Value

«Añado una canción, se analiza una fuente autorizada, se guarda transcripción y arreglo, aparece lista en mi biblioteca y puedo practicarla siguiendo pentagrama y tablatura sincronizados, incluso tras reiniciar, sin repetir análisis».

## Current State

T01 01c0c7d y T02 1b4690d existen en .sdd/worktrees/M001, rama milestone/M001: PlayerPort, YouTube oficial, reloj observado, navegación de guía ficticia, 65 tests y evidencia real. No integrados en main ni desplegados públicamente. Error 5 intermitente aceptado D010, causa desconocida, no reparado.

No hay aún biblioteca/backend/SQLite de canciones/analizador/optimizador/partitura real. .sdd/sdd.db es del agente, no almacenamiento de producto. D012 precisa D011 y autoriza solo documentación/investigación: calidad sobre velocidad, proceso durable independiente del navegador, cinco estados y pentagrama+TAB/cursor/scroll/navegación obligatorios. alphaTab investigado documentalmente, no instalado/adoptado/probado en EasyJam.

Fuente de verdad: M001-CONTEXT.md, REQUIREMENTS.md y M001-ROADMAP.md; docs/product.md, mvp-proposal.md y ADR-002 explican experiencia/dirección aprobadas en D013. S06→S07→S08→S09→S10→S11 son la cola operativa; plan S06/T01–T06 preparado para revisión, ninguna ejecutada/autorizada aún. Primera unidad T01 material/protocolo documental. T03/T04 y S02–S05 suspendidos/fuera de cola, S01 no completada; historia preservada. No código, auto, ejecución S07–S11, cierre, merge o push. Native steering registrado en OVERRIDES, estado verificado en ambas copias antes de continuar.

## Architecture / Key Patterns

Base S01 existente: Vue 3/Vite/TS estricto, pnpm/lockfile/Node fijados, Vitest, PlayerPort/adapter oficial y selección [inicio,fin). La guía ficticia no es el modelo definitivo ni transcripción.

Vue3/TypeScript, backend local mínimo, SQLite, módulos/adaptadores sustituibles y procesamiento durable aprobados como dirección inicial ADR-002 por D013. Esquema mínimo suficiente: siete tablas son ejemplo NO obligación; driver/framework/motor/renderer concretos no elegidos. KISS/SOLID/YAGNI, contratos por responsabilidad, no capas por tabla. Archivo independiente autorizado permitido solo para experimento S06, sin acreditar URL única ni producto upload.

Original inmutable, arreglo notacional con receta/posiciones globales y mapa de anclas/ocurrencias versionados. Pentagrama y TAB del mismo arreglo, visor principal y YouTube visible lateral/superior; cursor/scroll por tiempo observado, pausa/buffering sin reloj autónomo. alphaTab primero; no renderer propio si biblioteca madura cubre requisitos.

Calidad rítmica antes que velocidad: análisis puede superar ampliamente duración, sin deadline arbitrario; límites operativos/cuelgue medidos. Trabajo sigue con backend activo aunque cierre navegador, no continúa si equipo/ejecutor apagados; recuperar checkpoints sin duplicación. Notas/acordes/tiempo/silencios/secciones/alineación y tocabilidad evaluados por separado; preprocesamiento/multipaso solo por mejora medible.

Seis cuerdas E A D G B E, trastes 0–12, dificultad fácil, quintas de dos notas, alternativas justificadas, global determinista y ritmo/rests/secciones conservados. Derechos/políticas obligatorios, sin cuentas/multiusuario/pagos/estadísticas/favoritos o infraestructura distribuida. Constitución aún propuesta.

## Capability Contract

See `.sdd/REQUIREMENTS.md` for the explicit capability contract, requirement status, and coverage mapping.

R001–R013/R017/R018 activos, ninguno validado globalmente. R014–R016 diferidos; owners operativos S06–S11 formalizados por D013, no confundir mapped con probado.

## Milestone Sequence

- [ ] M001: EasyJam Guitar Practice MVP — Roadmap S06–S11 aprobado, S06 planificada/pendiente de revisión y autorización de T01. No slice activa completada, ningún código nuevo.

Sin otros milestones reservados; STATE se reconstruye únicamente mediante rebuildState nativo, sin editar runtime/DB ni marcadores de ejecución.
