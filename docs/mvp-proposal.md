# M001 — EasyJam Guitar Practice MVP (propuesta)

**Estado:** pendiente de discusión, ratificación y generación mediante SDD Pi. No es un roadmap operativo ni reserva un ID. No autoriza implementación.

## Resultado y límites

Un guitarrista practica una canción completa de principio a fin con quintas simplificadas, posiciones cómodas y guía rítmica sincronizada. Una pista principal de guitarra rítmica, afinación estándar, fixtures propios o autorizados con procedencia registrada. Un arreglo completo basta para probar el recorrido técnico; el tamaño del catálogo y el piloto de 5–10 canciones/personas del producto requieren confirmación.

Sin extracción automática desde URLs arbitrarias, descarga de audio, cuentas, backend, base de datos, SSR ni modo banda. YouTube oficial, visible y sin aislar audio. Una URL sin arreglo no dispara transcripción.

## Arquitectura a contrastar con ADR-001

Vue 3 + Vite + TypeScript estricto y Composition API; monolito frontend modular. Estado local por defecto; Pinia y Router solo si aparece necesidad real. Separación ligera dominio/aplicación/infraestructura/presentación por funcionalidades, sin construir carpetas vacías ni todas las capas para cada operación. Dominio independiente de Vue, YouTube y alphaTab; integraciones reemplazables mediante contratos pequeños. Sin repositorios genéricos, factories artificiales ni event bus global.

Conceptos a precisar en el contrato: `Song`, `Arrangement`, `Section`, `Track`, `MusicalEvent`, `Chord`, `Fingering`, `Tuning`, `TempoMap`, `SyncPoint`, `PracticeSession`. Song agrupa arreglos por dificultad e instrumento; pistas y secciones comparten línea temporal musical. No crear entidades por obligación: introducir cada concepto cuando una capacidad lo necesite. El boceto ADR usa `SyncAnchor`, `tuningMidi` y `TempoChange[]`: son representaciones candidatas, no contratos aprobados. Acordar nomenclatura y semántica de anclas antes de convertir ticks/segundos.

Tonal.js y alphaTab siguen en evaluación, no dependencias aceptadas. Evaluar versiones/licencias y adaptar bibliotecas maduras en lugar de construir un motor musical completo. Hacer un spike de riesgo de YouTube/tablatura durante la investigación previa a comprometer S05, sin convertirlo en una funcionalidad adicional ni saltarse aprobaciones.

## Cobertura candidata de requisitos

Estos identificadores son los existentes en producto o etiquetas descriptivas; no se inventan `R###` nativos antes de la discusión.

| Capacidad candidata | Fuente | Slice responsable | Apoyo |
|---|---|---|---|
| Experiencia ejecutable y puertas de calidad | Petición / ADR-001 | S01 | S06 |
| Carga válida, secciones y errores de datos | P0-01/03/04/09, EJ-005 | S02 | S06 |
| Quintas, alternativas y coste global | P0-05/06, EJ-002/003 | S03 | S06 |
| Línea temporal, silencios, tempo y navegación | P0-07/08, EJ-001/004 | S04 | S05/S06 |
| Repetir fragmentos | Petición actual; P1 en producto | S04 | S05/S06 |
| Reproducción visible y tablatura sincronizada | P0-02/07/09, EJ-001/005 | S05 | S06 |
| Canción completa, continuidad y fallos recuperables | Experiencia principal / métricas | S06 | Todas |

La discusión nativa creará el contrato `REQUIREMENTS.md` con IDs, estados, fuente, propietarios y validación. Ningún requisito de esta tabla se considera validado aún.

## Roadmap candidato

| Slice | Capacidad demostrable | Riesgo | Depende de |
|---|---|---|---|
| S01 | Base técnica y primera experiencia ejecutable | Bajo | — |
| S02 | Abrir un arreglo válido y explorar sus secciones | Medio | S01 |
| S03 | Tocar una progresión en quintas con digitaciones globalmente optimizadas | Alto | S02 |
| S04 | Practicar con reloj simulado, navegar y repetir | Alto | S02, S03 |
| S05 | Practicar con YouTube visible y tablatura sincronizada | Alto | S04; evaluación de renderizador |
| S06 | Completar una canción y validar el MVP integrado | Medio | S05 |

### S01 — Base técnica y primera experiencia ejecutable

- **Demo / aceptación:** una página Vue accesible muestra el propósito de EasyJam, arranca localmente y compila; un test smoke verifica el montaje. No catálogo ni reproducción todavía.
- **Pruebas:** smoke de componente y navegador; lint, strict typecheck, tests y build ejecutables; CI mínima sin secretos, sujeta al proveedor confirmado.
- **Tareas candidatas:** scaffold y scripts; primer recorrido/página y smoke; configuración de calidad/CI y comandos reales en preferencias SDD.
- **Entrega:** entorno reproducible y shell de presentación para S02. No imponer biblioteca de estado ni puertos sin consumidor.

### S02 — Modelo de arreglos y visualización de secciones

- **Demo / aceptación:** elegir/abrir fixture autorizado completo, ver título, afinación, secciones ordenadas y eventos rítmicos/silencios; un arreglo inválido no se interpreta parcialmente sin aviso.
- **Pruebas:** límites temporales, duraciones positivas, IDs/referencias, rangos de notas/cuerdas, orden y continuidad; esquema inválido y afinación no soportada; integración de carga y selección en UI.
- **Tareas candidatas:** fixture con procedencia y contrato mínimo; validación/carga; vista de secciones y errores.
- **Entrega a S03/S04:** arreglo validado y eje musical común; contrato de carga, sin proveedor multimedia en el dominio.

### S03 — Quintas y optimización de digitaciones

- **Demo / aceptación:** convertir C/Am a C5/A5 sin alterar tiempos; ver alternativas reales G5/D5 y la secuencia seleccionada para el arreglo; errores explícitos en símbolos ambiguos o posiciones imposibles.
- **Pruebas:** trastes/cuerdas/afinación, solo fundamental y quinta, política de octavas, empates deterministas; comparación exhaustiva de secuencias pequeñas y ejemplo donde greedy falla. Invariantes con entradas generadas deterministas.
- **Tareas candidatas:** evaluar Tonal y fijar política de conversión; generar candidatos y mostrarlos; optimización global y conexión a la progresión visible.
- **Entrega a S04:** eventos transformados y digitaciones seleccionadas. Coste explicable por desplazamientos, cambios de cuerda, aperturas, restricciones y preferencias. La programación dinámica solo garantiza mínimo respecto al coste definido; si el coste requiere historia adicional, ampliar el estado o revisar el algoritmo con evidencia.

### S04 — Sesión y reloj simulado

- **Demo / aceptación:** reproducir/pausar/reanudar una canción simulada, resaltar evento/sección, saltar, terminar y repetir un fragmento sin avanzar en pausa ni destacar acordes durante silencios.
- **Pruebas:** reloj virtual, seek repetido, extremos [inicio, fin), cambio de tempo y anclas; bucle A/B válido/inválido, retorno a A y limpieza de suscripciones. Tolerancia exacta dentro de la resolución musical declarada en el simulador; no extrapolar a YouTube.
- **Tareas candidatas:** semántica temporal y puerto de reproductor falso; controles y cursor; bucles y fallos/limpieza.
- **Entrega a S05:** `PlayerPort` validado por contrato, conversión temporal y estado de sesión, sin reloj UI autoritativo tras seek/pausa.

### S05 — YouTube y tablatura sincronizada

- **Demo / aceptación:** mismo flujo de S04 con iframe oficial visible y tablatura/ritmo; saltar de sección y repetir sin descargar audio. Vídeo bloqueado, buffering o error dejan mensaje y conservan el arreglo.
- **Pruebas:** contrato del adaptador con dobles, montaje/desmontaje, errores y limpieza; E2E falso sigue siendo determinista. Smoke y medición real en escritorio/móvil para play/pause/seek, velocidad si soportada y bucles.
- **Tareas candidatas:** cerrar spike y elección de renderizador; adaptador oficial y visibilidad; conectar tablatura y medir estabilidad.
- **Puerta de riesgo:** no aceptar alphaTab ni prometer precisión antes del spike. Si falla, proponer visualizador más sencillo y revisar ADR/aceptación con el usuario. Acordar una tolerancia numérica real a partir de medidas; no hay SLA aprobado.
- **Entrega a S06:** adaptadores reales intercambiables, evidencia de sincronía y limitaciones publicadas.

### S06 — Flujo completo y validación

- **Demo / aceptación:** abrir arreglo autorizado, convertir, reproducir de principio a fin, seguir ritmo/secciones, saltar, repetir y finalizar; recuperar errores sin perder contexto. Teclado, foco y señales no solo cromáticas comprobados.
- **Pruebas:** E2E crítico con falso más UAT real con YouTube; regresiones de dominio/integración y todas las puertas CI. Verificar de extremo a extremo los contratos producidos por S02→S05, no solo pruebas aisladas.
- **Tareas candidatas:** integración y pruebas del recorrido; errores/accesibilidad; UAT, revisión de derechos y reconciliación de requisitos/evidencias.
- **Cierre:** no declarar Done con scripts ausentes, fallos bloqueantes o contenidos sin permiso. Metas piloto de producto (70 % finalización, 80 % claridad/comodidad) siguen siendo hipótesis hasta confirmar muestra y obtener resultados.

Las tareas candidatas no son planes nativos ejecutables; SDD las dividirá si exceden una ventana de contexto.

## Boundary map propuesto

- **S01 → S02:** shell Vue y scripts reproducibles → carga y vista de arreglo.
- **S02 → S03:** arreglo/eventos validados → conversión, candidatos y secuencia seleccionada.
- **S02 + S03 → S04:** eje musical + eventos/digitaciones → sesión temporal y cursor con reproductor falso.
- **S04 → S05:** contrato de reproductor, sesión y mapeo tiempo↔tick → adaptadores YouTube/tablatura.
- **S01–S05 → S06:** aplicación integrada + fixtures y contratos → evidencia E2E/UAT y cobertura reconciliada.

Nombres de funciones, archivos y APIs concretos se fijarán al planificar las slices, no se presentan aquí como existentes.

## Decisiones pendientes e inconsistencias detectadas

1. Ratificar constitución, producto y ADR-001; asignar responsables. Se corrigió «aprobados como base propuesta» sin aprobar la elección.
2. Resolver bucles: producto los sitúa en P1; la petición actual pide repetir fragmentos en el MVP. Propuesta: promover solo A/B sencillo a S04/S05, manteniendo cuenta atrás/metrónomo fuera. Requiere confirmación y posterior actualización de producto.
3. Acordar tratamiento de cambios de tempo: producto/ADR permiten comenzar con tempo único, pero la petición exige gestionarlos cuando proceda. Propuesta: demostrar al menos un fixture sintético con cambio de tempo y silencios en S04; no ocultar una limitación bajo un esquema que solo declara soportarla.
4. Confirmar instrumentos/tipos: el boceto solo enumera guitarra/bajo aunque la visión admite otros; no cerrar extensibilidad ni implementar multitrack ahora.
5. Precisar `TempoMap`, `SyncPoint` frente a `SyncAnchor`, PPQ, compases, orden de cuerdas, octavas, intervalos, superposiciones, anclas monotónicas y qué fuente es autoritativa al interpolar. PPQ=960 es un ejemplo, no una decisión aprobada.
6. Aprobar política para slash, disminuidos/aumentados, rango de trastes, preferencias ergonómicas y comportamiento del optimizador al repetir secciones/bucles.
7. Resolver derechos de cada fixture y vídeo embebible; validar condiciones vigentes antes de integrar. El ZIP no aporta autorizaciones musicales.
8. Evaluar Tonal/alphaTab, licencias y activos, tamaño del bundle y sincronización real antes de adoptar. No se han instalado ni probado.
9. Acordar catálogo mínimo, navegadores objetivo, precisión observada aceptable y piloto. No prometer extracción de audio ni resultados de usabilidad no medidos.

## Evolución posterior (sin IDs reservados)

Práctica avanzada (afinaciones/preferencias/riffs); generación asistida desde fuentes autorizadas tras investigación; modo banda y pistas sincronizadas. No diseñar backend ni sincronización entre dispositivos hasta justificar esos requisitos.
