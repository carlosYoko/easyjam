# M001 — MVP aprobado: biblioteca y práctica de pentagrama + tablatura

**Estado:** visión, dirección arquitectónica ADR-002 y roadmap S06–S11 aprobados por D013. Autorizadas formalización/planificación S06 y commits documentales. Código pendiente de revisión de sus tareas; sin auto, cierre, merge o push.
**Fecha:** 18 de octubre de 2026.
**Fuente de verdad:** [contexto SDD](../.sdd/milestones/M001/M001-CONTEXT.md), [requisitos](../.sdd/REQUIREMENTS.md) y [roadmap aprobado SDD](../.sdd/milestones/M001/M001-ROADMAP.md). [Producto](product.md) y [ADR-002](adr/ADR-002.md) explican experiencia/diseño.

## 1. Experiencia confirmada

Biblioteca simple → añadir URL → validar fuente autorizada correspondiente al vídeo → análisis real asíncrono → preparar arreglo de quintas/posiciones globales → guardar original/arreglo/alineación → Lista → pentagrama Y tablatura → Play en YouTube visible → cursor/scroll sincronizados → cerrar/reabrir sin analizar.

Estados visibles exactos: **Pendiente, Analizando, Preparando arreglo, Lista, Error**. Cerrar/navegar/recargar navegador no cancela trabajo; volver consulta estado durable. Apagar backend/equipo sí puede interrumpirlo y exige reconciliación/checkpoint; no prometer procesamiento sin ejecutor activo.

Notación del arreglo simplificado, no original complejo ni cuatro tarjetas. Visor ocupa área principal; vídeo lateral/superior visible y conforme. Compases/notas/quintas/duraciones/rests/cuerdas/trastes, cursor, scroll y sección; navegación por compás/sección. Tiempo observado gobierna: pausa/buffering congelan avance, seek recoloca solo tras observación. Anclas corregibles persistidas, sin reanalizar para ajustar desfase.

Calidad primero, análisis puede superar ampliamente duración. Evaluar notas/acordes relevantes para rítmica, cambios, beats/compases/duraciones, silencios/secciones/alineación y tocabilidad. No exactitud de toda la mezcla ni deadline musical arbitrario. Límites de red/recursos/cuelgue justificados, sin porcentajes/ETA inventados.

## 2. Aprobado frente a hipótesis

| Tema | Requisito confirmado | Hipótesis o decisión técnica pendiente |
|---|---|---|
| Visor | Pentagrama+TAB reales, arreglo simplificado, cursor/scroll/navegación, mayoría del área | alphaTab candidato prioritario; versión/licencia/assets/adaptación/modelo/interacción/accesibilidad y buffering por probar. |
| Análisis | Previo/asíncrono, calidad sobre tiempo, rítmica útil | Motor/pipeline, calidad alcanzable, recursos, corrección necesaria y umbrales; no un servicio ya seleccionado. |
| Persistencia | Vue 3/TS, backend local mínimo, SQLite, original/arreglo reutilizables, identidad/concurrencia segura aprobados | Driver/modelo físico/ejecutor concretos por validar; siete tablas no obligatorias, escoger mínimo suficiente. |
| Tiempo | YouTube oficial visible manda; anclas corregibles | Cadencia, interpolación interna alphaTab, unidades/ocurrencias, método mínimo de corrección y tolerancias medidas. |
| Fuente | URL sola como objetivo; audio independiente autorizado y misma grabación | Fuente/acuerdo/resolutor y cobertura no acreditados; cambios a subida/importación requieren aprobación. |
| Operación | Trabajo independiente de navegador, estados claros, reinicio/retry sin corrupción/duplicación | Ejecutor administrado y claim/checkpoint/fencing/recuperación; no añadir servicios distribuidos. |

## 3. Primera puerta: audio permitido y calidad demostrable

YouTube Data API aporta metadatos e IFrame reproducción/tiempo, no audio documentado para analizar. III.E.1 prohíbe descargar/importar/cachear audiovisual sin aprobación escrita previa de YouTube; III.D.7 prohíbe APIs no documentadas sin permiso. Insertabilidad, derechos musicales y autorización de acceso a plataforma son distintos. Investigación técnica/contractual, no dictamen jurídico.

| Alternativa | URL sola | Impacto / decisión |
|---|---|---|
| Fuente independiente licenciada con mapping YouTube ID→grabación | Sí para su cobertura | Verificar permiso de análisis/resultados/retención, proveedor/coste y misma edición. No hay proveedor/acuerdo probado. |
| Audio original propio/permitido asociado previamente a ID | Sí para ese repertorio | Prueba legítima y acotada sin extraer YouTube; no cualquier URL. No sustituye análisis por partitura preparada. |
| URL + archivo autorizado del usuario | No | D013 lo permite únicamente para experimento S06; no añadir subida en producto, ni acreditar URL única. Registrar procedencia, grabación y limitación. |
| Partitura autorizada importada | No acredita transcripción real | Puede evaluar renderer, no completar el recorrido solicitado ni sustituir generación sin redefinir alcance. |
| Permisos específicos de plataforma/contenido | Solo si concedidos realmente | No presumir acuerdos ni convertir herramienta de descarga en autorización. |

Recomendación: comprobar primero fuente independiente/propia con mapping para una canción completa. Sin fuente, Pendiente con motivo y bloqueo de análisis; no es MVP completado. Presentar alternativas antes de alterar alcance. No contactar terceros/contratar servicios sin autorización.

## 4. Evaluación técnica pendiente

### Motor y calidad

Comparar candidatos existentes de armonía (Chordino/NNLS Chroma), beats/segmentos (QM Vamp), notas (Basic Pitch, limitación documentada de instrumento individual) como componentes posibles, no selección automática ni solución integrada acreditada.

Referencia autorizada revisada, canción completa y casos límite: armonía/cambios, notas relevantes/octava, métrica/downbeats/duración, silencios vs desconocido, estructura y alineación. Reportar métricas por dimensión y utilidad del arreglo tocado, no una cifra agregada que oculte errores. Proponer umbrales tras medir y acordarlos antes de go/no-go.

Preprocesamiento/multipaso: línea base, hipótesis, mismo material/hardware/versión/configuración, cambio aislado, mejora/degradación medida y coste. Considerar remuestreo/normalización compatibles, separación armónico-percusiva/fuentes o contexto/múltiples pasadas si ayudan; ninguna técnica adoptada. Artefactos/latencias de separación pueden empeorar notas/silencios/alineación; preservar procedencia y mapeo. Calidad prima sobre velocidad, sin obligación de optimizar latencia.

### Modelo y alphaTab

Modelo neutral versionado: compás/métrica/anacrusa si procede, eje musical exacto, tempo, eventos/notas/quintas/rests/duraciones/ligaduras, alturas/octavas y transposición de guitarra, afinación/cuerda/traste, secciones y anclas/ocurrencias. Pentagrama y TAB deben representar las mismas posiciones/eventos del arreglo. No guardar objetos alphaTab como única fuente ni asumir que MIDI resuelve notación/compases/digitación.

Priorizar alphaTab por capacidades documentadas de notación simultánea, cursor/scroll/interacción y medios externos. Validar con piloto legítimo antes del backend completo: conversión, units/ocurrencias/anclas, YouTube real, pausa/buffering, seek sin optimismo/loops de callbacks, scroll/foco y visibilidad del iframe. Conservar PlayerPort; no segundo reloj/sintetizador audible ni copiar literalmente ejemplos con variables inconsistentes. No renderer propio sin justificar insuficiencia de bibliotecas maduras y pedir decisión.

## 5. Trabajo válido y límites preservados

T01 01c0c7d y T02 1b4690d en milestone/M001: Vue/Vite/TS, lockfile/pnpm/Node, PlayerPort, adaptador oficial, reloj observado, navegación y selección [inicio,fin), 65 tests y evidencia real. Guía ficticia técnica, no transcripción real ni modelo definitivo. Error 5 intermitente de causa desconocida aceptado en D010; no resuelto.

S01 NO completa, T03/T04 no ejecutadas. S02–S05 previas suspendidas. Preservar planes/IDs/resúmenes/commits sin cierres ficticios. D013 reemplaza su presencia en la cola operativa por S06–S11 y conserva el roadmap anterior en M001-ROADMAP-HISTORY.md. Ninguna autorización de auto/código. Sin usuarios/pagos/estadísticas/favoritos, microservicios/infraestructura distribuida o editor musical completo.

## 6. Roadmap aprobado S06–S11

D013 aprueba la secuencia; solo S06 se descompone ahora y espera revisión antes de ejecutar. S07–S11 se planificarán/autorizarán al llegar a sus puertas de evidencia.

| Slice | Dependencias | Demostración / puerta |
|---|---|---|
| **S06 — Fuente permitida y análisis orientado a calidad** · alto | Material/método y ejecución explícitamente aprobados; evidencia T01/T02 reutilizada | URL cubierta o archivo independiente autorizado de prueba→fuente verificada→transcripción real completa; distinguir esta segunda ruta de URL única todavía abierta; informe de calidad/ambigüedades/anclas/recursos y comparación de pipeline justificada. No deadline musical arbitrario. Si no sirve o no hay derechos, bloquear y decidir antes de construir biblioteca. |
| **S07 — Pentagrama+TAB y sincronización alphaTab viable** · alto | S06; base T01/T02 | Piloto legítimo/revisado convertido a notación simultánea, duraciones/rests/compases/trastes, cursor+scroll+sección; YouTube visible real y navegación por compás, pausa/buffering/seek/anclas. Prueba de renderer/modelo, no biblioteca ni optimizador global terminados. Elegir/rechazar alphaTab con evidencia; no reemplazar por tarjetas. |
| **S08 — Biblioteca y trabajos durables independientes del navegador** · alto | S06 y S07 aprobadas por evidencia | Vacío→URL→una canción/trabajo persistido→análisis real→checkpoint original. Cerrar navegador y volver conserva/continúa trabajo con backend activo; reiniciar backend reconcilia. Carreras/claim/retry y fases claras. Sin arreglo final aún, NO declarar Lista. Backend/SQLite se entregan dentro de este recorrido, no infraestructura aislada. |
| **S09 — Arreglo notacional tocable y guardado** · alto | S08 y contrato notacional S07 | Derivar quintas, ritmo/rests/secciones y posiciones globales; validar notación/sync, publicar original+arreglo+anclas compatibles, estado Lista. Regenerar receta sin analizador y sin perder arreglo previo ante fallo; preview musical, no solo nombres de acordes. |
| **S10 — Práctica completa desde biblioteca** · alto | S09 y renderer/tiempo S07 | Seleccionar lista→visor principal pentagrama+TAB del arreglo→Play oficial→cursor/scroll→compás/sección→fin/repetición condicionada; ajuste mínimo/anclas persistidas sin análisis, pausa/buffering/seek/fallos/limpieza/accesibilidad. Integra trabajo válido, no ejecuta planes T03/T04 obsoletos. |
| **S11 — Aceptación integrada y recuperación** · medio | S10 | Los 14 pasos de producto con canción completa autorizada, salida del navegador durante análisis, reinicio/reapertura sin analizar, concurrencia, checkpoints/rollback/cancelación/retry y fallos SQL/proveedor. Solo regresiones/correcciones, ninguna función nueva. |

Puertas: aprobación de propuesta ≠ autorización general de código. Planificación manual, una tarea por autorización. Go/no-go con evidencia de fuente/calidad tras S06 y renderer/sync tras S07. Si una prueba invalida el plan, presentar decisión; no seguir dependencias con fixtures. No `/sdd auto`.

### Cobertura aprobada para planificación, no validación

- S06: R017/R012; apoyo R002/R003/R013.
- S07: R002/R006/R013; apoyo R001/R011/R012.
- S08: R018/R010; apoyo R003/R008/R012/R017.
- S09: R003/R004/R005; apoyo R013/R018.
- S10: R001/R006/R007/R008/R011; apoyo R002/R003–R005/R012/R013/R018.
- S11: R009 y aceptación de todos los activos.

R014–R016 diferidos; R019/R020 excluyen fuentes no permitidas/cuentas/infraestructura innecesaria, no los mecanismos justificados. Ningún requisito se valida globalmente por documentación, piloto o base S01.

## 7. Pruebas y aceptación

| Área | Evidencia exigida |
|---|---|
| Calidad | Referencia legítima, canción completa, métricas por armonía/notas rítmicas/cambios/tiempo/métrica/rests/secciones/alineación, revisión de tocabilidad y umbrales acordados; baseline vs técnica con mejora medible. |
| Notación | Pentagrama+TAB iguales al arreglo guardado, compases/duraciones/rests/ligaduras/transposición/cuerdas/trastes; navegación/scroll/cursor reales, sin avance en pausa/buffering. |
| Asíncrono | Crear trabajo y terminar respuesta; cerrar navegador mientras analiza con ejecutor activo, esperar desde otro cliente/prueba de backend y volver a resultado/estado guardado; polling no es ejecutor. |
| SQLite/reinicio | Fichero real, nuevo proceso/conexión/navegador mismo path conserva IDs/versiones/estados, contador del analizador sin incremento al practicar/regenerar. No memoria/localStorage como sustituto. |
| Deduplicación | Variantes URL y peticiones simultáneas desde varias conexiones/procesos → una canción y un trabajo activo; dos claimers, un ganador. |
| Atomicidad/recuperación | Fallos entre escrituras y commit → rollback/no Lista parcial; original guardado permite retry de arreglo sin audio; crash/ejecutor antiguo/fencing/SQLite_BUSY/disco lleno y resultado remoto incierto sin duplicación ciega. |
| Tiempo | Mismo corte/grabación, anclas/unidades/ocurrencias, corrección guardada/reabierta sin análisis, seek externo/desdel visor, pausa/buffering/fin/repetición medida; referencia audible independiente del mismo getCurrentTime. |
| UI/seguridad | Cinco estados y motivos reales, miniatura ausente/TTL, URL inválida/host engañoso/fuente sin permiso, errores seguros, teclado/foco, vídeo visible con tamaño/controles conformes, secretos fuera del browser/logs. |

Dobles para tests deterministas y piloto identificado no acreditan aceptación final. S11 exige audio/análisis/DB/reinicio/reproducción reales. No presentar 50/200 ms de polling como SLA ni fijar precisión sin medir.

## 8. Decisiones pendientes y riesgos

1. Fuente/mapping y permisos, cobertura compatible con URL sola; sin ello, bloqueo o alternativa aprobada.
2. Motor/pipeline, calidad aceptable y cuánto necesita revisión; preprocesamiento/multipaso solo por evidencia, costes/recursos sin sacrificar calidad arbitrariamente.
3. Modelo exacto y serialización, transposición/métrica/duraciones/ocurrencias y adaptador alphaTab; licencia/versión/assets/accesibilidad.
4. Sincronización real: interpolación interna, buffering/seek/keyframes, correcciones mínimas y tolerancias; error 5 sigue abierto.
5. Backend/driver/ejecutor local propuestos, trabajos durables, recuperación de crash/coste remoto incierto y path/backup SQLite; no exponer servicio sin autenticación a Internet.

**Siguiente autorización:** revisar S06-PLAN.md y T01–T06 antes de ejecutar S06/T01. D013 ya aprueba producto/dirección/roadmap, no código ni siete tablas obligatorias. Una unidad cada vez, comprobación al cierre y decisión go/no-go antes de S07. Sin auto ni push.
