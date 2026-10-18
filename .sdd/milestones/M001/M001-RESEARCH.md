# M001 — Research

**Date:** 2026-10-18

## Summary

D013 aprueba producto, dirección ADR-002 y S06–S11; permite archivo independiente autorizado exclusivamente para S06 y esquema SQLite menor que siete tablas si cumple requisitos. Solo formalización/planificación y commits documentales autorizados; plan S06/T01–T06 espera revisión antes de código. D012 concreta D011: biblioteca con análisis previo durable, calidad antes que velocidad y pentagrama Y tablatura reales del arreglo simplificado. Esta actualización es documental: sin instalar/adoptar motor, alphaTab, DB de canciones o backend, ni ejecutar benchmark/transcripción/integración nueva. La base T01/T02 sí existe en worktree, commits 01c0c7d/1b4690d, 65 tests y evidencia YouTube/reloj/guía ficticia; no resuelve transcripción/partitura. Error 5 aceptado D010, no reparado.

Documentación alphaTab consultada mediante Context7 /websites/alphatab_net y guía oficial directamente: muestra notación estándar/TAB, cursor/scroll/interacción y medios externos con anclas y tiempo actualizado. Es candidato prioritario, no integración EasyJam validada. No asumir que sus animaciones/interpolación se congelan en buffering de YouTube o que un objeto MIDI basta para notación. Snippets con variables inconsistentes o APIs HTTP espurias se descartan; verificar referencias/tipos de versión elegida antes de implementar.

YouTube IFrame/Data API documentan reproducción/tiempo/metadatos, no fuente analizable de audio. III.E.1 exige aprobación escrita previa para descargar/importar/cachear audiovisual; III.D.7 no permite APIs no documentadas sin permiso. Fuente independiente/mapping/permiso todavía no acreditados; insertabilidad/derechos musicales/autorización de plataforma no equivalentes. URL sola sigue objetivo condicionado; sin fuente, pendiente explícito, bloqueo y alternativas antes de alterar alcance. Investigación no equivale a dictamen jurídico.

## Recommendation

Resolver material/fuente y medir análisis real orientado a rítmica antes del pipeline completo (S06 aprobada para planificación, no ejecución). Probar notación simultánea/modelo y alphaTab/YouTube temprano (S07), no aplazar renderer fundamental hasta después de DB/optimizador. Luego biblioteca/async/SQLite (S08), arreglo notacional global persistido (S09), práctica integrada (S10), aceptación/recuperación real (S11). Roadmap aprobado por D013; revisar plan S06 antes de código. T03/T04 antiguas suspendidas. Archivo de prueba autorizado no cierra URL única.

Calidad primero: permitir análisis bastante mayor que duración; sin deadline ligado a canción. Evaluar recursos/coste/cuelgue de forma justificada, distinguir heartbeat/red/progreso real y no inventar porcentaje/ETA. Una lease vencida no prueba que otro ejecutor pueda empezar sin duplicar cómputo vivo.

## Implementation Landscape

### Key Files

- .sdd/milestones/M001/M001-CONTEXT.md — experiencia confirmada/14 pasos; M001-ROADMAP.md es cola activa S06–S11, M001-ROADMAP-HISTORY.md conserva historial suspendido.
- .sdd/REQUIREMENTS.md y DECISIONS.md — R001–R013/R017/R018 activos, owners S06–S11 formalizados en D013; ninguno validado globalmente.
- docs/product.md — historias/capacidades/estados y aceptación; docs/mvp-proposal.md — dependencias/pruebas/riesgos, refleja SDD sin árbol specs paralelo.
- docs/adr/ADR-002.md — dirección aceptada D013 y detalles revisables; ejemplo SQLite/jobs simplificable, no siete tablas obligatorias. Vue3/TS/backend local mínimo/SQLite aprobados, driver/motor/renderer/serialización por probar, constitución no ratificada globalmente.
- .sdd/worktrees/M001/src/application/player-port.ts y src/infrastructure/youtube-player.ts — snapshot/play/pause/seek/subscribe/dispose y adapter oficial existentes. Sin API de audio.
- .sdd/worktrees/M001/src/application/guide-session.ts — selectGuideFrame/requestSectionNavigation, ventanas [inicio,fin), silencio/gap y reloj observado; no modelo musical definitivo.
- .sdd/worktrees/M001/docs/validation/S01-guide.md y S01-youtube-controlled.md — evidencia existente, no partitura/transcripción real. .sdd/sdd.db es DB del agente, no de canciones.

### Build Order

S06→S07→S08→S09→S10→S11, go/no-go tras material/calidad y renderer/sync; no ejecución autorizada aquí. T01/T02 reutilizadas sin declarar S01 completa. Propuesta de backend local único con ejecutor administrado, no petición HTTP/polling/frontend como dueño del trabajo; cerrar navegador no cancela. Apagar backend/equipo puede interrumpir y requiere checkpoint/reconciliación. Sin microservicios o infraestructura distribuida.

### Verification Approach

Matriz en docs/mvp-proposal.md: referencia musical legítima, pruebas de conversión notacional y anclas/unidades; SQLite en fichero/procesos/conexiones distintos, constraints/carreras/claim/checkpoint/rollback/fencing; cerrar navegador mientras analiza, regresar y reabrir tras restart sin nuevas llamadas al analizador; regeneración/anclas sin audio; publicación Lista solo con original/arreglo/sync compatibles. Contratos deterministas no sustituyen final real de audio/análisis/DB/reinicio/vídeo.

Evaluar calidad por dimensión, no solo un agregado: notas/acordes pertinentes a rítmica y cambios, beats/downbeats/métrica/duraciones, silencio vs desconocido, secciones y alineación; review de arreglo tocado. Proponer umbrales después de medir y acordarlos antes de go/no-go. Contrastar cursor con anclas audibles independientes del propio getCurrentTime; polling no es precisión acústica/SLA.

## Don't Hand-Roll

| Necesidad | Candidato documentado | Límite / experimento pendiente |
|---|---|---|
| Armonía | Chordino/NNLS Chroma | Calidad/licencias/Windows sin probar; acordes no determinan ritmo de guitarra. |
| Beat/estructura | QM Vamp | Beats/bar/segmentación no garantizan métrica/secciones semánticas correctas. |
| Notas | Basic Pitch, README indica Apache-2.0 | Mejor con instrumento individual; no asumir mezcla completa. Pesos/dependencias/licencias y notas rítmicas relevantes por evaluar. |
| Preprocesamiento/multipaso | Herramientas maduras por evaluar | Comparar baseline con remuestreo/normalización, separación armónico-percusiva/fuentes o contexto/pasadas cuando haya hipótesis medible. Artefactos/latencias pueden empeorar resultado. No separador propio ni dependencia adoptada por intuición. |
| Notación/tiempo | alphaTab prioritario | Staff.showStandardNotation/showTablature, cursor, scrollMode/scrollElement e interacción documentados; verificar licencia/assets/modelo/teclado/ciclo de vida antes de adoptar. Alternativa madura solo si insuficiente y con decisión. |
| Persistencia | SQLite/driver maduro por elegir | Un escritor; FK/UNIQUE/transacciones cortas, no cola distribuida reinventada. |

## Constraints

- Modelo neutral/versionado: compases/métrica/anacrusa si procede, ticks PPQ o racionales por elegir, tempo, eventos/notas/quintas/rests/duraciones/ligaduras, alturas/octavas/transposición guitarra, cuerdas/trastes, secciones/ocurrencias/anclas. Misma música simplificada en pentagrama y TAB, no original complejo. Adaptar orden de cuerdas/units, no guardar alphaTab como única fuente.
- AlphaTab guía documenta EnabledExternalMedia/IExternalMediaHandler/updatePosition y sync points; segundos YouTube vs milisegundos alphaTab. Probar cursor/scroll en pausa/buffering/seek/fin y navegación desde compás sin optimismo/bucle de callbacks. PlayerPort existente sigue autoridad; no segundo reloj/sintetizador audible. Ejemplo 50 ms no es SLA.
- Correcciones de sync persistidas con revisión/grabación, no reanalizar audio; cortes/velocidad pueden invalidar un offset. Mecanismo mínimo por aprobar, no editor completo implícito.
- Preprocesamiento: misma referencia/hardware/config/versión, baseline vs técnica aislada, mejora/degradación medible por dimensión y coste/tiempo. Conservar original y transformaciones/mapeos/latencias. No cuantizar borrando silencios/microtiempo; N.C. no prueba silencio de guitarra.
- Internamente estados pending/processing/ready/error + phase; externamente solo Pendiente/Analizando/Preparando arreglo/Lista/Error. Es proyección propuesta, no código existente. Lista exige original aceptado, arreglo notacional válido y sync compatible. Fallo posterior no destruye último arreglo válido.
- SQLite: identity única por vídeo, índice parcial de trabajo activo, claim atómico, checkpoint original, publicación atómica con fencing; motor/red fuera de transacción. Busy/error SQL no implica repetir análisis aceptado. Timeout remoto incierto requiere recuperar job/idempotencia, no retry ciego. No exactly-once físico universal.
- Fuente ausente no se sustituye por fixture/importación; audio permitido, procedencia/retención y correspondencia verificadas. Metadatos API separados, refresco/borrado según III.E.4 (límite general 30 días para datos no autorizados); sin tokens/enlaces firmados en datos/logs.
- YouTube visible con controles/branding y sin overlays; mínimo 200×200, recomendado 480×270 para 16:9. Referer no suprimido, origin no lo sustituye. onAutoplayBlocked distinto de error; estado cued 5 no error 5; duración inicial cero no prueba canción vacía. Seek/bucle de vídeo no garantiza retorno exacto/gapless de sección.

## Open Risks

Fuente/mapping/derechos/cobertura, calidad/corrección necesaria, motor/recursos/coste, serialización/modelo musical y licencia/assets alphaTab, interpolación interna/units/anclas en YouTube, ejecutor Windows/cancelación/reconciliación y SQLite/backup, error 5 desconocido y loops. Sin benchmark nuevo, fuente seleccionada, integración alphaTab ejecutada, validación móvil física o usuarios. Umbrales/método de ajuste y diseño necesitan aprobación.

## Sources

Consulta documental 2026-10-18. Context7 /websites/alphatab_net: búsqueda de notación estándar+TAB, cursor/scroll y medios externos/anclas; corroborada guía principal con lectura directa. No se declara benchmark ni nuevas pruebas reales. Búsqueda web general no disponible en investigación anterior por clave opcional omitida; no se pidió de nuevo ni bloqueó lectura directa.

- [alphaTab Audio & Video Sync](https://www.alphatab.net/docs/guides/audio-video-sync) — guía oficial leída: medios externos/anclas/unidades, integración necesaria, no garantía de buffering EasyJam.
- [Staff](https://www.alphatab.net/docs/reference/types/model/staff), [scrollMode](https://www.alphatab.net/docs/reference/settings/player/scrollmode), [scrollElement](https://www.alphatab.net/docs/reference/settings/player/scrollelement), [enableCursor](https://www.alphatab.net/docs/reference/settings/player/enablecursor), [enableUserInteraction](https://www.alphatab.net/docs/reference/settings/player/enableuserinteraction) — referencias consultadas mediante Context7; no endpoints HTTP reales.
- [Media Sync Editor](https://www.alphatab.net/docs/guides/media-sync-editor) — sync points por compás; evaluar compatibilidad/ocurrencias, no editor adoptado.
- [YouTube Developer Policies](https://developers.google.com/youtube/terms/developer-policies), [videos.list](https://developers.google.com/youtube/v3/docs/videos/list), [IFrame API](https://developers.google.com/youtube/iframe_api_reference), [RMF](https://developers.google.com/youtube/terms/required-minimum-functionality) — fuentes de investigación previa y evidencia T01/T02; no dictamen jurídico ni fuente de audio.
- [Basic Pitch README](https://raw.githubusercontent.com/spotify/basic-pitch/main/README.md), [Chordino](https://www.isophonics.net/nnls-chroma), [QM Vamp](https://www.vamp-plugins.org/plugin-doc/qm-vamp-plugins.html) — candidatos documentales previos, no seleccionados/instalados/probados.
- [SQLite transactions](https://www.sqlite.org/lang_transaction.html), [ON CONFLICT](https://www.sqlite.org/lang_conflict.html) — investigación previa: transacciones/constraints, no migraciones implementadas.
- Plantillas nativas context/research/roadmap y registros de requisitos/decisiones: propuesta no equivale a ejecución.
