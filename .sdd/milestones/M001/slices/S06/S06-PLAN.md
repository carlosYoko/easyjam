# S06: Fuente autorizada y análisis de calidad

**Goal:** Demostrar con canción completa autorizada que un análisis real produce armonía/cambios y tiempos suficientemente útiles para preparar guitarra rítmica, un candidato notacional trazable y alineación con la grabación. Si no es viable, bloquear y pedir decisión con evidencia, sin sustituir salida por fixtures.
**Demo:** Desde un comando local de evaluación (no la futura biblioteca), procesar un manifest de material permitido, ejecutar motor(es) existente(s), validar original neutral, comparar con referencia independiente y producir informe/notación candidata/anclas con errores e incertidumbre explícitos.

**Authorization:** D013 aprueba la dirección; D014 registra la separación explícita aprobada el 2026-10-31: T01 completada solo como investigación documental, referencia/aceptación de material obligatorias en T07 antes de T03. Orden operativo **T01 → T02 → T07 → T03 → T04 → T05 → T06**; IDs existentes conservados. T02 fue autorizada explícitamente el 2026-11-01 y está completada: contratos/CLI local sin adaptador de producción, 113 tests y lint/tipos/build verificados. T07 y restantes requieren revisión y autorización individual; no se han iniciado. Sin contacto a terceros, auto, S07–S11, cierre de slice, merge o push. Archivo independiente permitido solo en S06, no producto de subida ni prueba de URL única. Criterios integrados intactos; sin backend/renderer/optimizador completos aquí.

## Must-Haves

- Canción completa con archivo independiente permitido y procedencia verificable, alcance de permiso de análisis/derivados/retención, misma grabación/edición YouTube o diferencia explícitamente identificada. El vídeo M7lc1UVf-VE sigue siendo prueba técnica histórica, no fuente musical ni reemplazado a escondidas.
- Referencia musical/temporal legítima separada de la salida del motor, revisión/incertidumbre y segmentos de calibración/evaluación identificados; no usar el resultado como su propio oráculo.
- Evaluador real reproducible con manifest validado, checksum/config/versiones/coste/recursos, original conservado y reporte seguro; no audio/red/SQL dentro de Vue ni análisis durante playback.
- Línea base real con herramienta madura y prueba dirigida de mejora si se justifica; no obligar instalar todos los motores ni multipaso cuando no aporta. Calidad > velocidad, límites operativos medidos y no ratio de duración arbitrario.
- Armonía/cambios y tiempo evaluados por separado de beat/downbeat/métrica, notas rítmicas/rests/secciones/alineación; datos faltantes permanecen desconocidos, N.C. no acredita silencio. Patrones de arreglo derivados se etiquetan.
- Candidato notacional neutral con compases/duraciones/alturas/cuerdas-trastes provisionales cuando derivables y anclas/ocurrencias; validar posibilidades y pérdidas, no declarar renderer, digitaciones globales o pentagrama+TAB implementados.
- Informe go/no-go basado en criterios acordados y evidencia de canción completa, limitaciones y objetivo URL única abierto si se usa archivo. Sin aprobación de calidad o material, detener sin fingir aceptación.

## Proof Level

- This slice proves: integration de fuente permitida/analizador real/evaluación musical y candidatos de notación/alineación; no biblioteca/persistencia/práctica final.
- Real runtime required: yes, archivo real y motor real; reproducción oficial visible para contrastar correspondencia cuando exista material autorizado apropiado. No extracción del iframe.
- Human/UAT required: referencia/revisión musical y criterios de utilidad cuando el agente no pueda establecerlos con evidencia; el agente busca material/herramientas y ejecuta todas las comprobaciones accesibles. Sin satisfacción de derechos/criterios, bloqueo.

## Verification

Los comandos base y el CLI de T02 ya existen. La ejecución musical completa, métricas y candidato notacional siguen siendo objetivos de las tareas posteriores autorizadas. Ejecutar desde `.sdd/worktrees/M001`.

- Base existente: `pnpm run lint && pnpm run typecheck && pnpm run test --run && pnpm run build` conserva 65 tests previos y añade contratos/evaluación cuando corresponda.
- T01 documental: `node --input-type=module -e "import fs from 'node:fs'; for (const p of ['docs/validation/S06-material.md','docs/validation/S06-protocol.md']) if (!fs.statSync(p).size) process.exit(1)"`; revisar evidencia, límites y ausencia de secretos. Aceptación de permiso/referencia/edición y segmentos concretos se verifica en T07 antes de T03, no se infiere del cierre documental de T01.
- `tests/unit/analysis-evaluation.test.ts`: manifest/salida no confiable, identidad/unidades,desconocido vs rest, duraciones inválidas, checksum/config, error seguro y sin éxito parcial.
- `tests/unit/analysis-metrics.test.ts`: cambios/time-weighted acordes, beat/downbeat cuando hay referencia, error temporal/alineación y eventos faltantes/extra/inciertos con oráculo independiente.
- `tests/unit/notation-candidate.test.ts`: sumas de compás/duración, alturas y transposición, quintas provisionales etiquetadas, rango y silencio vs desconocido, mapa monótono/ocurrencias/unidades/grabación incompatible.
- Futuro `pnpm run evaluate:s06 --manifest <manifest-local> --output <run-local>`: canción completa, motor/versiones/payload/recursos/métricas/anclas; test de ruta inválida/sin permiso y salida de motor inválida produce código no cero/error seguro, no artefacto aceptado.
- `docs/validation/S06-results.md` registra calibración/criterios aprobados antes del veredicto final, comparación y reproducción/sync independiente. Manifest/referencia/audio locales no se publican sin permiso; resultado local ≠ prueba URL única.
- S06 no se cierra ni se avanza S07 automáticamente. Sin fuente o calidad/notación/alineación suficientes, elevar bloqueo/alternativas y mantener requisitos no validados.

## Observability / Diagnostics

- Runtime signals: run ID, fase real (input/analysis/validation/evaluation), inicio/fin, versiones, tiempo/recursos observados y errores seguros; heartbeat no se presenta como progreso musical.
- Inspection surfaces: manifest y resultado JSON versionados locales; informe resumido saneado en docs/validation. Sin DB de canciones/framework de jobs en S06.
- Failure visibility: fase/código/exit status y ausencia de acceptance=true en fallos; operaciones SQL durables y recuperación de jobs quedan S08.
- Redaction constraints: sin audio protegido, credenciales, cookies, datos personales, URLs firmadas/rutas personales en artefactos versionados; hashes no conceden permisos. No cloud/coste/servicio externo sin autorización explícita.

## Integration Closure

- Upstream surfaces consumed: PlayerPort/YouTube adapter, guía/tiempo observado y evidencia T01/T02; no sustituir esos contratos por bocetos ADR-001 ni editar sus resúmenes.
- New wiring introduced in this slice: entrada local evaluación→manifest autorizado→adaptador analizador real→original neutral→referencia/métricas→candidato notacional/mapa/report. Adaptadores por frontera real, no framework de benchmarks.
- What remains before the milestone is truly usable end-to-end: URL→audio permitido de producto todavía no probado con archivo, renderer/sync S07, biblioteca/SQLite/jobs S08, arreglo global S09, práctica S10 y aceptación S11.

## Tasks

- [x] **T01: Investigar material y proponer protocolo de evaluación** `est:1h`
  - Why: reunir evidencia y un método verificable sin fingir que el material pendiente está aceptado.
  - Files: `docs/validation/S06-material.md`, `docs/validation/S06-protocol.md`.
  - Do: investigar fuentes completas/permisos/referencias, adquirir candidato independiente, registrar checksum/formato/decodificación, comprobar iframe y proponer métricas/herramientas/recursos. Investigación documental completada bajo separación explícita D014; sin análisis ni código de producto.
  - Verify: comando documental indicado arriba, hashes y evidencia real de decodificación/iframe; revisión de límites y ausencia de secretos/código.
  - Done when: hallazgos y propuesta documentados, faltantes trasladados a T07 obligatoria antes de T03. Cerrar T01 no acepta material ni rebaja requisitos de S06.
- [x] **T02: Crear evaluador local y contratos de entrada/salida** `est:1h`
  - Why: hacer reproducible y diagnosticable el experimento sin construir backend/biblioteca.
  - Files: `scripts/evaluate-song.ts`, `src/application/analysis-evaluation.ts`, `tests/unit/analysis-evaluation.test.ts`, `package.json` y configuración mínima si necesaria.
  - Do: manifest/salidas validados, interfaz al adaptador, CLI seguro/error tipado/reporte/checksum/versiones; tests con dobles claramente identificados. Puede preparar contratos con material aún pendiente: nunca aceptarlo, analizarlo o presentarlo como transcripción. T07 debe aceptar material/referencia antes de T03. Script real ejecutable, sin TODOs/success ficticio: motor ausente explícito. No deps/capas/DB innecesarias.
  - Verify: `pnpm run lint && pnpm run typecheck && pnpm run test --run && pnpm run build`; CLI sin permiso/ruta inválida termina no cero y no produce aceptación.
  - Done when: contrato+CLI y diagnósticos probados, base anterior sin regresión; no afirmar transcripción por dobles.
- [ ] **T07: Acreditar material y referencia independiente antes del análisis** `est:2h`
  - Why: conservar íntegra la puerta de material/referencia separada de T01 por D014; se ejecuta antes de T03 pese a su ID, sin renumerar tareas existentes.
  - Files: `docs/validation/S06-reference.md`, `docs/validation/S06-material.md`, `docs/validation/S06-protocol.md`.
  - Do: acreditar canción completa/archivo/permisos, referencia temporal independiente/revisada, landmarks de la misma grabación YouTube y segmentos congelados. Resolver propuesta mínima compatible de herramientas/licencias. Sin terceros, instalaciones ni análisis.
  - Verify: `node --input-type=module -e "import fs from 'node:fs'; for (const p of ['docs/validation/S06-reference.md','docs/validation/S06-material.md','docs/validation/S06-protocol.md']) if (!fs.statSync(p).size) process.exit(1)"`; además revisar evidencia real de derechos/referencia/edición y aprobación de puerta, no solo ficheros existentes.
  - Done when: material/referencia/correspondencia y protocolo revisados y aceptados para analizar. Si falta evidencia esencial, T07 bloqueada y T03 prohibida.
- [ ] **T03: Conectar motor maduro y ejecutar línea base real** `est:2h`
  - Why: demostrar análisis musical efectivo y límites, no solo contratos.
  - Files: `src/infrastructure/music-analyzer.ts`, `scripts/evaluate-song.ts`, `tests/unit/analysis-evaluation.test.ts`, `docs/validation/S06-baseline.md`, manifest de dependencias/lockfile solo si necesario.
  - Do: solo tras T02 y aceptación documentada de T07, seleccionar/instalar mínimo justificado y autorizado en esta unidad, fijar versión/config/forma de invocación, ejecutar canción completa y conservar original local, fases/errores/recursos. Calibración separada de evaluación; no copiar referencia como salida ni cambiar material técnico histórico.
  - Verify: checks locales; futuro `pnpm run evaluate:s06 --manifest <manifest-local> --output <run-local>` y fallo real controlado de motor/entrada.
  - Done when: salida real trazable de armonía/tiempos con incertidumbre, recursos y fallo diagnosticado; incapacidad real se eleva como bloqueo.
- [ ] **T04: Medir calidad y comparar una mejora justificada** `est:2h`
  - Why: decidir utilidad rítmica con evidencia sin confundir acorde correcto con ritmo/rests/secciones correctos.
  - Files: `src/application/analysis-metrics.ts`, `tests/unit/analysis-metrics.test.ts`, `docs/validation/S06-quality.md`, `docs/validation/S06-protocol.md`.
  - Do: métricas por dimensión frente a referencia, degradaciones/incertidumbre, baseline y experimento aislado de preprocessing/multipaso solo con hipótesis útil; si no lo hay justificar baseline sin complejidad extra. Proponer umbrales de utilidad y recursos con mediciones, pedir aprobación antes de veredicto final/holdout; no seleccionar umbrales para hacer pasar mismos datos.
  - Verify: `pnpm run test --run && pnpm run typecheck`; ejecución real reproducible y comparación con tests de errores conocidos.
  - Done when: resultados/criterios propuestos trazables, no cifras inventadas o agregado engañoso; siguiente tarea requiere protocolo/criterios aprobados.
- [ ] **T05: Validar candidato notacional y alineación independiente** `est:1h30m`
  - Why: comprobar que la salida permite preparar compases/notas/quintas/rests y relacionarlos con la grabación, antes de renderer S07.
  - Files: `src/application/notation-candidate.ts`, `tests/unit/notation-candidate.test.ts`, `docs/validation/S06-notation-sync.md`.
  - Do: candidato neutral versionado desde salida real, duraciones/métrica/alturas/transposición/quintas provisorias etiquetadas, sin inventar ataques/rests; anclas por inicio/medio/final/cambios de sección y zonas con discrepancias, incertidumbre/revisión con referencia externa. Correspondencia audio/vídeo sin medir solo el propio reloj que se pretende probar. Sin UI alphaTab, optimizador global, SQLite ni producto upload.
  - Verify: `pnpm run test --run && pnpm run typecheck && pnpm run build`; contrastar candidato completo/referencia y anclas sobre grabación real cuando disponible. Falta de correspondencia/material → bloqueo explícito, no alineación ficticia.
  - Done when: candidato validado y pérdidas/faltantes identificados, posibilidad de notación sustentada y no confundida con renderizado ya probado; alineación medida con criterio acordado.
- [ ] **T06: Repetir evaluación completa y presentar go/no-go** `est:1h`
  - Why: cerrar experimento reproducible y pedir revisión antes de S07, no avanzar por un artefacto existente.
  - Files: `docs/validation/S06-results.md`, `docs/validation/S06-quality.md`, `docs/validation/S06-notation-sync.md` y registros nativos pertinentes al autorizar cierre.
  - Do: con criterios previamente aprobados, repetir recorrido real completo; registrar versiones/tiempo/recursos/calidad/notación/alineación/fallos y URL sola abierta si archivo. Mostrar comando/reproducción/limitaciones y recomendar go/no-go. No implementar funciones pendientes ni crear resumen/checkbox de éxito si falta evidencia.
  - Verify: `pnpm run lint && pnpm run typecheck && pnpm run test --run && pnpm run build`; CLI real repetible, revisión de informes y diagnóstico de fallo seguro.
  - Done when: evidencia completa satisface criterios y usuario revisa S06; si no, slice bloqueada con resultados y siguiente decisión, nunca S07 automática.

## Files Likely Touched

- `docs/validation/S06-material.md`, `S06-protocol.md`, `S06-baseline.md`, `S06-quality.md`, `S06-notation-sync.md`, `S06-results.md` dentro de docs/validation.
- `scripts/evaluate-song.ts`, `src/application/analysis-evaluation.ts`, `src/application/analysis-metrics.ts`, `src/application/notation-candidate.ts`, `src/infrastructure/music-analyzer.ts`.
- `tests/unit/analysis-evaluation.test.ts`, `tests/unit/analysis-metrics.test.ts`, `tests/unit/notation-candidate.test.ts`, configuración/dependencias mínimas justificadas.

## Traceability / Stop Conditions

D013/D014 → R012/R017 (primarios S06), apoyo R002/R003/R013; EJ-004/EJ-007–009 según prueba parcial. T01 investigación/propuesta, T07 puerta material/referencia R012/R017; T02 contratos R013/R017; T03 análisis R017; T04 calidad R017; T05 notación/alineación R002/R003/R013; T06 aceptación parcial R009/R017 sin validar globalmente biblioteca/práctica. Planes detallados en tasks/T01–T07-PLAN.md. T01 documental completa no valida R012/R017 ni acepta fuente/referencia; T03 requiere T07 completada y revisada.

Bloquear ante permiso ausente, grabación distinta sin mapeo acreditado, salida insuficiente o criterios no acordados. No URL arbitraria, extracción de YouTube, prueba ficticia, cambio silencioso de entrada, autorizar costes o exponer backend. Cada tarea debe recibir autorización propia tras revisar el plan; estimaciones son de trabajo de agente, no deadlines del motor ni compromisos de duración.
