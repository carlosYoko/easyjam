# Requirements

This file is the explicit capability and coverage contract for the project.

## Active

### R001 — Reproducir YouTube oficial visible lateral/superior y gobernar cursor/scroll de pentagrama y tablatura del arreglo guardado por tiempo/estado observados; sin avance autónomo en pausa/buffering ni análisis durante práctica.
- Class: integration
- Status: active
- Description: Reproducir YouTube oficial visible lateral/superior y gobernar cursor/scroll de pentagrama y tablatura del arreglo guardado por tiempo/estado observados; sin avance autónomo en pausa/buffering ni análisis durante práctica.
- Why it matters: Prueba pronto la dependencia externa que condiciona toda la experiencia.
- Source: user
- Primary owning slice: M001/S10
- Supporting slices: M001/S07,M001/S09,M001/S11
- Validation: Parcial: T01/T02 en worktree y 65 tests. Pendiente pentagrama+TAB/cursor/scroll reales y alineación acústica; no validación global.
- Notes: D013 aprueba roadmap/visión; D012 exige pentagrama+TAB/cursor/scroll por tiempo observado, sin análisis al practicar. Base T01/T02 parcial preservada, S01 incompleta. Propietario operativo actualizado sin validación global; tareas S10 todavía no autorizadas.

### R002 — Medir selección visual, recuperación tras seek y repetición con vídeo real; proponer umbrales cuantificables a partir de resultados y someterlos a aprobación antes de la integración completa.
- Class: quality-attribute
- Status: active
- Description: Medir selección visual, recuperación tras seek y repetición con vídeo real; proponer umbrales cuantificables a partir de resultados y someterlos a aprobación antes de la integración completa.
- Why it matters: Una llamada de seek no acredita llegada exacta ni sincronía audible.
- Source: user
- Primary owning slice: M001/S07
- Supporting slices: M001/S06,M001/S09,M001/S10,M001/S11
- Validation: mapped
- Notes: D013 formaliza owner S07, no ejecución. Anclas revisionadas/corregibles/grabación/unidades/ocurrencias; prueba pausa/buffering/seek sin optimismo/interpolación libre. Medir independiente del mismo reloj selector; no SLA/gapless. S06/T05 evalúa candidato/audio-vídeo, no renderer.

### R003 — Conservar una transcripción armónica/temporal real de canción completa autorizada y arreglos simplificados derivados/versionados, con ritmo, silencios, secciones y sincronización compatibles; regenerar arreglo sin reanalizar audio.
- Class: core-capability
- Status: active
- Description: Conservar una transcripción armónica/temporal real de canción completa autorizada y arreglos simplificados derivados/versionados, con ritmo, silencios, secciones y sincronización compatibles; regenerar arreglo sin reanalizar audio.
- Why it matters: Permite acompañar de principio a fin sin inventar partes faltantes.
- Source: user
- Primary owning slice: M001/S09
- Supporting slices: M001/S06,M001/S07,M001/S08,M001/S10,M001/S11
- Validation: Pendiente de generación/validación real, persistencia y regeneración sin analizador. No sustituir con fixture o importación manual no aprobada.
- Notes: D013 formaliza owner sin validar; S06/T05 candidato no equivale a arreglo final. Original separado/inmutable, arreglo/receta/notación y sync compatibles; pentagrama+TAB del mismo arreglo con duración/compases/rests/alturas/transposición/cuerdas/trastes. Lista solo completa. Siete tablas no obligatorias.

### R004 — Convertir acordes compatibles a fundamental y quinta justa conservando tiempos y ritmo; señalar símbolos ambiguos sin conversión fiable para revisión.
- Class: core-capability
- Status: active
- Description: Convertir acordes compatibles a fundamental y quinta justa conservando tiempos y ritmo; señalar símbolos ambiguos sin conversión fiable para revisión.
- Why it matters: Simplifica sin presentar transformaciones arbitrarias como musicalmente correctas.
- Source: user
- Primary owning slice: M001/S09
- Supporting slices: M001/S06,M001/S07,M001/S10,M001/S11
- Validation: mapped
- Notes: D013 aprueba dirección/roadmap, no código. C→C5/Am→A5 con políticas de ambigüedad, ritmo/rests/secciones conservados, original y receta separados. Renderer muestra arreglo, no original complejo; regenerar sin analizador. S06 candidato derivado/provisional no es implementación S09.

### R005 — Seleccionar posiciones para toda la progresión en guitarra de seis cuerdas, E A D G B E, trastes 0–12, con quintas de dos notas como base y empates reproducibles.
- Class: differentiator
- Status: active
- Description: Seleccionar posiciones para toda la progresión en guitarra de seis cuerdas, E A D G B E, trastes 0–12, con quintas de dos notas como base y empates reproducibles.
- Why it matters: Evita desplazamientos innecesarios por decisiones aisladas.
- Source: user
- Primary owning slice: M001/S09
- Supporting slices: M001/S07,M001/S10,M001/S11
- Validation: mapped
- Notes: D013 owner aprobado, ejecución S09 no autorizada. D002/D012: alternativas justificadas, coste global explicable, exhaustivo pequeño/greedy/empates/tocabilidad. Posiciones elegidas por dominio y guardadas, no decididas por renderer. Candidato provisional S06 no acredita optimización global.

### R006 — Abrir Lista desde biblioteca en visor principal inspirado visualmente en Songsterr con pentagrama Y tablatura reales del arreglo simplificado: compases/notas/quintas/duraciones/rests/cuerdas/trastes, cursor/scroll automático/sección y navegación por compás/sección sincronizada.
- Class: primary-user-loop
- Status: active
- Description: Abrir Lista desde biblioteca en visor principal inspirado visualmente en Songsterr con pentagrama Y tablatura reales del arreglo simplificado: compases/notas/quintas/duraciones/rests/cuerdas/trastes, cursor/scroll automático/sección y navegación por compás/sección sincronizada.
- Why it matters: Mantiene el contexto durante toda la canción.
- Source: user
- Primary owning slice: M001/S07
- Supporting slices: M001/S06,M001/S09,M001/S10,M001/S11
- Validation: mapped
- Notes: D013 aprueba pentagrama+TAB obligatorios y roadmap; alphaTab prioritario, no adoptado. S07 prueba simultaneidad/modelo/cursor/scroll/medios externos, pausa/buffering/seek/anclas/teclado/vídeo visible; S10 ensamblaje. S06 solo candidato notacional real, no UI renderer. Sin ejecución S07 autorizada.

### R007 — Activar/desactivar repetición de una sección completa respetando pausa y saltos; verificar su utilidad real con YouTube.
- Class: continuity
- Status: active
- Description: Activar/desactivar repetición de una sección completa respetando pausa y saltos; verificar su utilidad real con YouTube.
- Why it matters: Permite practicar una parte sin perder contexto.
- Source: user
- Primary owning slice: M001/S10
- Supporting slices: M001/S07,M001/S11
- Validation: mapped
- Notes: D013 retira T03/T04 antiguas sin completar S01. Repetición se reevalúa en S10 con su propio plan/autorización, condicionada a utilidad/viabilidad; sin A/B arbitrario/gapless. No retomar planes antiguos para cumplir nuevo owner.

### R008 — Mostrar fallos específicos de URL/fuente autorizada, análisis/calidad, persistencia/trabajo y reproducción/sincronización; conservar resultados válidos y ofrecer recuperación explícita acotada.
- Class: failure-visibility
- Status: active
- Description: Mostrar fallos específicos de URL/fuente autorizada, análisis/calidad, persistencia/trabajo y reproducción/sincronización; conservar resultados válidos y ofrecer recuperación explícita acotada.
- Why it matters: Evita guías ficticias o bloqueos sin explicación.
- Source: user
- Primary owning slice: M001/S10
- Supporting slices: M001/S06,M001/S07,M001/S08,M001/S09,M001/S11
- Validation: mapped
- Notes: D013 formaliza owner, no validación. Cinco estados exactos con motivo/fase real; fallo motor/red/SQL/proveedor/restart seguro/retry acotado, conservar resultado válido. Duración mayor que canción no es fallo. S06/T02–T03 prueban diagnóstico del evaluador local, no jobs de producto.

### R009 — Ejercitar los 14 pasos: Mi biblioteca → URL/material permitido → análisis real → arreglo en quintas → SQLite → Lista → pentagrama+TAB → Play YouTube/cursor/scroll → cerrar/reabrir sin transcribir; cerrar navegador durante análisis y comprobar recuperación/deduplicación/fallos.
- Class: launchability
- Status: active
- Description: Ejercitar los 14 pasos: Mi biblioteca → URL/material permitido → análisis real → arreglo en quintas → SQLite → Lista → pentagrama+TAB → Play YouTube/cursor/scroll → cerrar/reabrir sin transcribir; cerrar navegador durante análisis y comprobar recuperación/deduplicación/fallos.
- Why it matters: Pruebas aisladas no demuestran el sistema ensamblado.
- Source: user
- Primary owning slice: M001/S11
- Supporting slices: M001/S06,M001/S07,M001/S08,M001/S09,M001/S10
- Validation: mapped
- Notes: D013 owner S11, aceptación 14 pasos reales y sin nuevas funciones. Cierre navegador durante análisis, DB/fichero/proceso nuevo, contadores sin análisis al practicar/reabrir/regenerar, concurrencia/crash/retry. S06/T06 informa go/no-go parcial, no acepta todo el MVP ni avanza S07.

### R010 — Contar con tipos estrictos, lint, tests unitarios/contratos y E2E deterministas, build y documentación de ejecución reproducibles.
- Class: operability
- Status: active
- Description: Contar con tipos estrictos, lint, tests unitarios/contratos y E2E deterministas, build y documentación de ejecución reproducibles.
- Why it matters: Detecta regresiones sin depender de una red externa en cada CI.
- Source: user
- Primary owning slice: M001/S08
- Supporting slices: M001/S06,M001/S07,M001/S09,M001/S10,M001/S11
- Validation: mapped
- Notes: D013 mantiene Vue/TS/pnpm/Node/lockfile y 65 tests reales T01/T02, sin merge de código. Nuevo owner S08 añade pruebas SQLite/async; cada slice conserva checks. No test:e2e/CI/analizador ya instalados por aprobación documental.

### R011 — Controles con etiquetas, foco visible y teclado; estado/evento actual identificables sin depender exclusivamente de color.
- Class: quality-attribute
- Status: active
- Description: Controles con etiquetas, foco visible y teclado; estado/evento actual identificables sin depender exclusivamente de color.
- Why it matters: La guía debe ser legible y operable durante la práctica.
- Source: user
- Primary owning slice: M001/S10
- Supporting slices: M001/S07,M001/S08,M001/S11
- Validation: mapped
- Notes: D013 owner S10 sin implementación autorizada; biblioteca/cinco estados, notación/navegación por teclado y foco, scroll sin secuestro, cursor no satura lector, no solo color, vídeo sin overlays. alphaTab por sí mismo no acredita accesibilidad.

### R012 — Documentar permisos de fuente/análisis/arreglo y condiciones de YouTube; respetar player oficial visible, identificación/privacidad, metadatos/retención y secretos fuera del cliente.
- Class: compliance/security
- Status: active
- Description: Documentar permisos de fuente/análisis/arreglo y condiciones de YouTube; respetar player oficial visible, identificación/privacidad, metadatos/retención y secretos fuera del cliente.
- Why it matters: Cumplimiento obligatorio incluso sin cuentas; insertar un vídeo no concede derechos sobre su arreglo.
- Source: research
- Primary owning slice: M001/S06
- Supporting slices: M001/S07,M001/S08,M001/S10,M001/S11
- Validation: mapped
- Notes: D013 permite archivo independiente autorizado SOLO para experimento S06, no descarga YouTube ni producto upload. S06/T01 acredita fuente/permiso/grabación/referencia/retención; si falta, bloqueada. URL única sigue abierta. Derechos musicales/acceso plataforma/embeddable distintos; políticas caché API/licencias renderer/motor revisadas por integración.

### R013 — Separar dominio musical, transcripción original, arreglo derivado y mapa de sincronización mediante contratos validados/versionados y adaptadores sustituibles de motor, SQLite, reproducción y renderizado.
- Class: constraint
- Status: active
- Description: Separar dominio musical, transcripción original, arreglo derivado y mapa de sincronización mediante contratos validados/versionados y adaptadores sustituibles de motor, SQLite, reproducción y renderizado.
- Why it matters: Permite evolución sin implementar ahora pistas/dificultades futuras.
- Source: user
- Primary owning slice: M001/S07
- Supporting slices: M001/S06,M001/S08,M001/S09,M001/S10,M001/S11
- Validation: mapped
- Notes: D013 acepta ADR-002 como dirección Vue3/TS/backend mínimo/SQLite/adaptadores, mínimo esquema suficiente (siete tablas no obligatorias). Dominio sin SQL/Vue/YouTube/alphaTab/motor, modelos versionados neutrales. S06/T02 contratos y T05 candidato; S07 concreta notación/renderer, S09 arreglo. KISS/SOLID/YAGNI, no capas por tabla.

### R017 — Generar transcripción musical real previa/asíncrona desde fuente autorizada asociada al vídeo, priorizando calidad de notas/acordes/cambios, ritmo/compases/duraciones, silencios/estructura/alineación útiles para rítmica; no exigir tiempo real o reconstrucción exacta de toda la mezcla.
- Class: core-capability
- Status: active
- Description: Generar transcripción musical real previa/asíncrona desde fuente autorizada asociada al vídeo, priorizando calidad de notas/acordes/cambios, ritmo/compases/duraciones, silencios/estructura/alineación útiles para rítmica; no exigir tiempo real o reconstrucción exacta de toda la mezcla.
- Why it matters: La generación musical real previa es parte central del MVP; no se sustituye por una guía preparada ficticia.
- Source: user
- Primary owning slice: M001/S06
- Supporting slices: M001/S08,M001/S09,M001/S11
- Validation: Pendiente de fuente, análisis real/canción completa, benchmark/revisión/umbrales acordados. Documentación y candidatos no son prueba operativa.
- Notes: D013 owner S06 y plan T01 material/protocolo→T02 evaluador→T03 baseline real→T04 métricas/mejora justificada/criterios a aprobar→T05 candidato notación/alineación→T06 evaluación final/go-no-go. Solo planificación autorizada. Archivo independiente permitido para prueba, URL sola NO acreditada. Calidad antes que tiempo, herramientas maduras/multipaso por evidencia y límites operativos razonables.

### R018 — Mi biblioteca simple con vacío/Añadir canción y listado título/miniatura/estado; URL canónica reutiliza SQLite/resultados o trabajo durable independiente del navegador, sin duplicados concurrentes, con checkpoints/atomicidad/reintentos y reinicio seguro.
- Class: continuity
- Status: active
- Description: Mi biblioteca simple con vacío/Añadir canción y listado título/miniatura/estado; URL canónica reutiliza SQLite/resultados o trabajo durable independiente del navegador, sin duplicados concurrentes, con checkpoints/atomicidad/reintentos y reinicio seguro.
- Why it matters: La biblioteca durable y reutilizable constituye la entrada principal de EasyJam y evita repetir análisis.
- Source: user
- Primary owning slice: M001/S08
- Supporting slices: M001/S06,M001/S09,M001/S10,M001/S11
- Validation: Pendiente SQLite en fichero/proceso nuevo, carrera/claim/checkpoint/crash/retry y prueba real cerrar navegador durante análisis y regresar. .sdd/sdd.db no es DB de canciones.
- Notes: D013 acepta biblioteca/SQLite/async/dedupe y owner S08, no código aún. Estados exactos Pendiente/Analizando/Preparando arreglo/Lista/Error, navegador no ejecuta/cancela job, backend apagado requiere recuperar checkpoints. Modelo más simple suficiente, siete tablas no obligatorias. Archivo S06 no demuestra add-URL único ni biblioteca/SQLite.

## Deferred

### R014 — Observar utilidad, comprensión y comodidad con varias canciones de estilos diferentes y usuarios del público objetivo.
- Class: quality-attribute
- Status: deferred
- Description: Observar utilidad, comprensión y comodidad con varias canciones de estilos diferentes y usuarios del público objetivo.
- Why it matters: Una única canción no acredita utilidad general.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Después del MVP técnico; sin cantidades o porcentajes prefijados.

### R015 — Ampliar arreglos alternativos por nivel, riffs y afinaciones cuando se justifique.
- Class: core-capability
- Status: deferred
- Description: Ampliar arreglos alternativos por nivel, riffs y afinaciones cuando se justifique.
- Why it matters: Conserva la visión de acceso para más niveles y canciones.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: No generar solos/riffs ni soportar afinaciones extra en M001.

### R016 — Mostrar rítmica, solista y bajo sincronizados para varios intérpretes.
- Class: differentiator
- Status: deferred
- Description: Mostrar rítmica, solista y bajo sincronizados para varios intérpretes.
- Why it matters: Evolución hacia la experiencia compartida descrita por el usuario.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Sin milestone reservado; no implementar multitrack o varios dispositivos ahora.

## Out of Scope

### R019 — No descargar/extraer audio sin autorización ni prometer generación automática desde URLs arbitrarias.
- Class: anti-feature
- Status: out-of-scope
- Description: No descargar/extraer audio sin autorización ni prometer generación automática desde URLs arbitrarias.
- Why it matters: Evita incumplimientos y promesas técnicas sin evidencia.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: D011 permite generación real desde fuente autorizada y exige investigar URL sola; no autoriza extracción contraria a condiciones ni cualquier URL. Derechos sobre obra y autorización de acceso a plataforma son separados. Si no hay fuente, bloquear o pedir aprobación de alternativa, nunca generar fixture.

### R020 — Excluir autenticación, multiusuario, pagos, estadísticas e infraestructura innecesaria; no excluir el backend mínimo y SQLite que ahora exige el MVP.
- Class: anti-feature
- Status: out-of-scope
- Description: Excluir autenticación, multiusuario, pagos, estadísticas e infraestructura innecesaria; no excluir el backend mínimo y SQLite que ahora exige el MVP.
- Why it matters: Mantiene el alcance proporcional al recorrido de práctica.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: D011 supera la exclusión previa de backend/DB: persistencia y ejecución son necesidad real. Despliegue local loopback candidato; sin servicios públicos sin autorización, microservicios, colas externas o nube anticipada.

## Traceability

| ID | Class | Status | Primary owner | Supporting | Proof |
|---|---|---|---|---|---|
| R001 | integration | active | M001/S10 | M001/S07,M001/S09,M001/S11 | Parcial: T01/T02 en worktree y 65 tests. Pendiente pentagrama+TAB/cursor/scroll reales y alineación acústica; no validación global. |
| R002 | quality-attribute | active | M001/S07 | M001/S06,M001/S09,M001/S10,M001/S11 | mapped |
| R003 | core-capability | active | M001/S09 | M001/S06,M001/S07,M001/S08,M001/S10,M001/S11 | Pendiente de generación/validación real, persistencia y regeneración sin analizador. No sustituir con fixture o importación manual no aprobada. |
| R004 | core-capability | active | M001/S09 | M001/S06,M001/S07,M001/S10,M001/S11 | mapped |
| R005 | differentiator | active | M001/S09 | M001/S07,M001/S10,M001/S11 | mapped |
| R006 | primary-user-loop | active | M001/S07 | M001/S06,M001/S09,M001/S10,M001/S11 | mapped |
| R007 | continuity | active | M001/S10 | M001/S07,M001/S11 | mapped |
| R008 | failure-visibility | active | M001/S10 | M001/S06,M001/S07,M001/S08,M001/S09,M001/S11 | mapped |
| R009 | launchability | active | M001/S11 | M001/S06,M001/S07,M001/S08,M001/S09,M001/S10 | mapped |
| R010 | operability | active | M001/S08 | M001/S06,M001/S07,M001/S09,M001/S10,M001/S11 | mapped |
| R011 | quality-attribute | active | M001/S10 | M001/S07,M001/S08,M001/S11 | mapped |
| R012 | compliance/security | active | M001/S06 | M001/S07,M001/S08,M001/S10,M001/S11 | mapped |
| R013 | constraint | active | M001/S07 | M001/S06,M001/S08,M001/S09,M001/S10,M001/S11 | mapped |
| R014 | quality-attribute | deferred | none | none | unmapped |
| R015 | core-capability | deferred | none | none | unmapped |
| R016 | differentiator | deferred | none | none | unmapped |
| R017 | core-capability | active | M001/S06 | M001/S08,M001/S09,M001/S11 | Pendiente de fuente, análisis real/canción completa, benchmark/revisión/umbrales acordados. Documentación y candidatos no son prueba operativa. |
| R018 | continuity | active | M001/S08 | M001/S06,M001/S09,M001/S10,M001/S11 | Pendiente SQLite en fichero/proceso nuevo, carrera/claim/checkpoint/crash/retry y prueba real cerrar navegador durante análisis y regresar. .sdd/sdd.db no es DB de canciones. |
| R019 | anti-feature | out-of-scope | none | none | n/a |
| R020 | anti-feature | out-of-scope | none | none | n/a |

## Coverage Summary

- Active requirements: 15
- Mapped to slices: 15
- Validated: 0
- Unmapped active requirements: 0
