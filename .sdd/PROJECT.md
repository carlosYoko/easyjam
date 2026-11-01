# Project

## What This Is

EasyJam es una biblioteca de canciones previamente transcritas para practicar guitarra rítmica con pentagrama Y tablatura reales del arreglo simplificado, visualmente inspirados en Songsterr. Se analiza antes de practicar y se conservan original/arreglo/alineación. URL sola es objetivo condicionado a una fuente independiente autorizada correspondiente al vídeo; no está acreditada.

## Core Value

«Añado una canción, se analiza una fuente autorizada, se guarda transcripción y arreglo, aparece lista en mi biblioteca y puedo practicarla siguiendo pentagrama y tablatura sincronizados, incluso tras reiniciar, sin repetir análisis».

## Current State

S01/T01 01c0c7d y S01/T02 1b4690d existen en .sdd/worktrees/M001, rama milestone/M001: PlayerPort, YouTube oficial, reloj observado, navegación de guía ficticia y evidencia real. No integrados en main ni desplegados públicamente. Error 5 intermitente aceptado D010, causa desconocida, no reparado.

S06/T01 completada como investigación documental bajo D014; material/referencia aún no aceptados. S06/T02 autorizada por el usuario y completada el 2026-11-01: evaluador local `pnpm run evaluate:s06`, validación runtime de manifest/original, checksum y reportes seguros. CLI sin adaptador de producción; no genera transcripción ni aceptación musical. D015 registra Node TypeScript nativo y tipos Node solo de desarrollo. Checks lint/tipos/build y 113 tests pasan (65 existentes + 48 nuevos). Evidencia y contrato en docs/validation/S06-evaluator.md del worktree.

No hay aún biblioteca/backend/SQLite de canciones/analizador/optimizador/partitura real. .sdd/sdd.db es del agente, no almacenamiento de producto. alphaTab investigado documentalmente, no instalado/adoptado/probado en EasyJam.

Fuente de verdad: M001-CONTEXT.md, REQUIREMENTS.md y M001-ROADMAP.md; docs/product.md, mvp-proposal.md y ADR-002 explican experiencia/dirección aprobadas en D013. S06→S07→S08→S09→S10→S11 son la cola operativa. En S06 el orden es T01 → T02 → T07 → T03 → T04 → T05 → T06; solo T01/T02 completadas. Revisión acotada T07 autorizada y realizada el 2026-11-01: artefactos locales y hashes reconfirmados, pero tarea BLOQUEADA por referencia temporal/correspondencia/segmentos/herramientas no acreditados (docs/validation/S06-reference.md). T07 sigue sin completar; D016 mantiene Code Monkey para completar referencia independiente, sin sustituir canción ni ejecutar motor. Pistas de tab/score y mastering mono/estéreo documentadas, no referencia aceptada. T03 exige aceptación explícita de material/referencia y autorización propia. S01/T03–T04 y S02–S05 suspendidos/fuera de cola; historia preservada. Sin auto, ejecución de tareas posteriores, cierre de slice/milestone, merge o push autorizados por T02. Estado runtime/DB gestionado por SDD, no editado manualmente.

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

- [ ] M001: EasyJam Guitar Practice MVP — Roadmap S06–S11 aprobado; S06/T01 documental y T02 contratos/CLI completadas. T07 revisada y bloqueada por evidencia insuficiente, no completada. Ninguna slice activa completada.

Sin otros milestones reservados; STATE se reconstruye únicamente mediante rebuildState nativo, sin editar runtime/DB ni marcadores de ejecución.
