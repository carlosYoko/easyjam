# M001 — Research

**Date:** 2026-10-18

## Summary

Investigación documental, no prueba de ejecución. No hay src, package.json, fixtures musicales ni aplicación en este repositorio. Se revisaron producto, constitución, ADR-001, propuesta de MVP y convenciones; la estructura S01–S05 y el contrato R001–R020 fueron confirmados por el usuario. Ninguna capacidad está validada.

YouTube documenta play/pause, getCurrentTime(), estados y seekTo(). Esto permite intentar la guía mínima real, pero no acredita precisión: seek puede llegar al keyframe anterior y desde cued/unstarted puede iniciar reproducción. Loop de vídeo/playlist no equivale a bucle de sección. El renderer no resuelve estas limitaciones.

## Recommendation

Mantener cinco slices, con S01 pequeña y aislada: vídeo fijo autorizado, guía mínima de acordes/secciones, tiempo observado, saltos, repetición y diagnóstico. No elegir aún renderer ni algoritmo. No usar samples de documentación como evidencia automática de permisos musicales. Resolver material y condiciones de carga antes de ejecutar.

## Implementation Landscape

### Key Files

- `docs/product.md` — alcance confirmado.
- `docs/mvp-proposal.md` — responsabilidades y aceptación S01–S05.
- `docs/constitution.md` — propuesta transversal, no ratificada globalmente.
- `docs/adr/ADR-001.md` — candidatos y bocetos, no APIs existentes.
- `docs/development.md` — checks y Git.
- `.sdd/PREFERENCES.md` — único archivo de preferencias de proyecto preexistente; no duplicar nombre/capitalización.

### Build Order

S01 primero resuelve proveedor real; S02 contenido completo; S03 motor global; S04 integración; S05 aceptación sin nuevas funciones. Solo S01 tiene tareas planificadas. La escritura de planes no autoriza T01, auto ni S02.

### Verification Approach

Vitest para intervalos/selección/repetición/dobles del adaptador, Playwright determinista para el recorrido y errores, tipos/lint/build. Prueba real separada con entrada HTTP local, vídeo permitido, interacción explícita y registro de entorno. Medir target vs tiempo observado, tiempo de recuperación de seek, sobrepaso de fin de sección y retorno, selección UI vs reloj observado y desfase perceptivo independiente. La UI y el mismo getCurrentTime no son referencias independientes del audio. Registrar método, muestras, incertidumbre, rango/percentiles cuando la muestra lo permita; no umbrales arbitrarios. Proponerlos tras medir y pedir aprobación antes de S04.

## Don't Hand-Roll

| Problem | Existing Solution | Why Use It |
|---|---|---|
| Reproducción de YouTube | IFrame Player API oficial | Evita extracción y controles no documentados |
| Tablatura/ritmo final | Evaluar alphaTab y VexFlow | Motores maduros; no reconstruir notación completa |
| Teoría de notas/acordes | Evaluación posterior de biblioteca como Tonal.js | S01 usa acordes preparados y no necesita un motor musical |
| Identidad/estado SDD | Herramienta nativa de ID, herramientas de decisiones/research y plantillas instaladas | No inventar DB/runtime/STATE ni simular ejecución |

## Constraints

- YouTube: viewport mínimo 200×200; 480×270 recomendado para 16:9. Controles/branding visibles, sin overlays que oculten ninguna parte.
- Identificación por HTTP Referer; no suprimirla con no-referrer/noreferrer. Origin es una medida adicional, no sustituto general de Referer en SPA. Probar HTTP local, no file://.
- onAutoplayBlocked es distinto de onError; iniciar por interacción y reflejar estado real, no éxito del comando supuesto.
- Estados oficiales -1/0/1/2/3/5; getDuration puede devolver 0 antes de metadatos. No confundir con canción vacía.
- Errores 2/5/100/101/150/153 requieren diagnóstico explícito. Carga de script sin respuesta debe tener fallo visible y limpieza.
- Políticas III.A exigen revisar términos/privacidad; III.E.4 describe datos enviados incluso al cargar el player y obligaciones Made for Kids. No tener cuentas no elimina estas obligaciones. Procedimiento de verificación de metadatos abierto; si necesita credenciales, usar secure_env_collect solo al necesitarlo, sin exponerlas ni inventar backend.
- No descargar, aislar audio, ocultar anuncios ni usar APIs no documentadas. No acreditar derechos solo por embebibilidad.

## Common Pitfalls

- **Seek solicitado ≠ observado** — seekTo retorna void y puede usar keyframes; medir observación y no mover la guía de forma optimista.
- **Pausa antes de primer play** — buscar desde cued puede disparar reproducción; distinguir estados y probar bloqueo del navegador.
- **Bucle nominal** — loop/setLoop repiten vídeo/playlist; repetición de sección precisa controlar frontera y verificar retorno, buffering y gap. endSeconds de cueVideoById deja de aplicar tras seekTo.
- **Deriva y pestaña oculta** — no acumular reloj UI como autoridad; timers pueden sufrir throttling. Registrar reactivación de pestaña; no prometer background playback.
- **Polling = precisión** — son magnitudes distintas. Ejemplo alphaTab de 50 ms no es SLA.
- **Ejemplos no listos para producción** — ejemplos alphaTab incluyen fragmentos con identificadores inconsistentes; validar APIs/tipos de la versión elegida en vez de copiarlos literalmente.
- **Sincronía circular** — comparar guía con el mismo reloj que la selecciona solo acredita lógica, no alineación audible del vídeo.

## Rendering Alternatives

| Candidate | Evidence | Cost / Pending |
|---|---|---|
| Guía mínima HTML | S01 solo necesita acordes/secciones y estado actual | Propuesta para S01, no renderer final ni motor de tablatura propio |
| alphaTab | Guía oficial de external media, IExternalMediaHandler y updatePosition en milisegundos; sincronización externa desde 1.6; página consultada muestra 1.8.4 | Construir/adaptar modelo y sync points, ciclo de vida y evaluar assets/licencia/bundle; no instalado ni adoptado |
| VexFlow | Tutorial oficial describe motor de notación SVG/Canvas, TabStave/TabNote y duraciones/silencios | Mayor orquestación propia de cursor/layout/tiempo; API/versiones/licencias a fijar al elegir; no instalado ni adoptado |

Context7 produjo un fragmento VexFlow con endpoints HTTP incongruentes; se descartó. Solo se usan sus ejemplos de notación contrastados con el tutorial. No hay un backend VexFlow propuesto.

## Open Risks

- Vídeo/arreglo/permiso y matriz de navegadores/dispositivos no seleccionados. No obtener evidencia móvil real por emular viewport.
- Privacidad/aceptación y procedimiento Made for Kids pueden necesitar revisión antes de cargar vídeo; se incorporaron al contrato con confirmación del usuario.
- Viabilidad de repetición y criterios de sincronía solo podrán decidirse con S01 ejecutada tras aprobación.
- Stack principal sigue propuesto; versión Node/gestor/lockfile deben fijarse al autorizar T01, sin instalar ahora.
- SDD distribuido contiene descripciones históricas contradictorias. Se consultó README real en raíz (pkg/README no existe), plantillas y handlers instalados; next usa step:true y ejecuta una unidad, dry-run solo previsualiza. No se invocaron motores ni comandos de ejecución.

## Sources

- Context7 `/websites/developers_google_youtube`: getCurrentTime, seekTo, estados/errores y requisitos; contrastado con fuente oficial.
- [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference) — operaciones/estados/seek/onAutoplayBlocked/errores.
- [Required Minimum Functionality](https://developers.google.com/youtube/terms/required-minimum-functionality) — Referer, tamaños y overlays.
- [Developer Policies](https://developers.google.com/youtube/terms/developer-policies) — III.A, III.E.1/4, III.F y cumplimiento; lectura de secciones relevantes, no dictamen jurídico.
- Context7 `/websites/alphatab_net` y [Audio & Video Sync](https://www.alphatab.net/docs/guides/audio-video-sync) — integración externa y advertencia seek.
- Context7 `/0xfe/vexflow` y [Tutorial](https://github.com/vexflow/vexflow/wiki/Tutorial) — motor de notación y tablatura, sin tomar snippets HTTP como API real.
- README real de SDD instalado, plantillas context/roadmap/project/requirements/research/plan/task-plan y handlers auto/workflow — flujo nativo y formatos.
- Búsqueda prevista: `site.developers.google.com youtube iframe api seekTo keyframe onAutoplayBlocked error 153 referer minimum player`. No disponible por falta de clave; BRAVE_API_KEY opcional omitida. Se consultaron fuentes oficiales directamente; no se declara búsqueda web exitosa.
