# S01 / T01 — Material, condiciones de carga y evidencia

**Fecha:** 2026-10-18  
**Estado:** revisión técnica de material resuelta; ensayo controlado posterior 10/10 en A y 10/10 en B sin reproducir el error 5 inicial. Riesgo aceptado explícitamente por el usuario (D010); cierre verificado de T01 en su resumen nativo. Solo T02 autorizada. No autoriza T03 ni un despliegue público.

## Fuente y alcance

- Vídeo fijo: `M7lc1UVf-VE`, incluido literalmente por Google en el ejemplo «Getting started» de la [IFrame Player API](https://developers.google.com/youtube/iframe_api_reference).
- Se utiliza exclusivamente el reproductor oficial visible. No se descarga, aísla, almacena ni analiza el contenido audiovisual.
- Su inclusión en el ejemplo y su capacidad de inserción no conceden licencia de transcripción, arreglo, redistribución ni derechos musicales. No existe arreglo en T01; S02 requiere canción y arreglo autorizados.
- No se ha sustituido el material aprobado.

## Revisión oficial de metadatos

Se consultaron las [Developer Policies](https://developers.google.com/youtube/terms/developer-policies), especialmente III.E.4.i/j, y la [guía Made for Kids](https://developers.google.com/youtube/data/guides/made_for_kids_status).

Consulta realizada el **2026-10-18T15:26:14.830Z** desde Node local mediante HTTPS a `www.googleapis.com/youtube/v3/videos`, con `part=id,status`, `id=M7lc1UVf-VE` y campos `items(id,status(madeForKids,embeddable))`. Autenticación en cabecera, sin clave en URL, salida, informe o frontend. Resultado HTTP **200**, un elemento con el ID esperado:

| Campo | Resultado observado |
|---|---|
| `status.embeddable` | `true` |
| `status.madeForKids` | `false` |

Estos son resultados fechados de la API oficial, no una inferencia del título ni scraping. La barrera local `reviewedMadeForKids` se actualizó con el valor verificado `false`. El resultado se aplica solo al ID fijo y a esta prueba; no permite cargar material arbitrario ni supone cumplimiento legal general. Reconsultar si cambia el material o antes de reutilizar la revisión en una nueva validación/distribución; no asumir que los metadatos permanecen inmutables ni reutilizarlos más allá del plazo de actualización de las políticas.

`YOUTUBE_DATA_API_KEY` se recogió con el formulario seguro y permanece únicamente en `.env.local`, excluido de Git. No tiene prefijo `VITE_`. La comprobación del bundle de producción examinó sus tres archivos sin encontrar el valor de la credencial. No se almacena la respuesta completa ni datos de cuentas.

## Privacidad y presentación

- La aplicación no solicita cuentas, OAuth, datos personales, analítica propia ni almacenamiento de reproducción. El estado observado solo vive en memoria.
- Antes de cargar, informa de la conexión con YouTube/Google, IP/datos del navegador y posibles cookies; enlaza condiciones de YouTube y privacidad de Google.
- Carga deliberada; sin iframe, miniatura, preconnect ni script YouTube al abrir. `autoplay=0`; reproducir requiere otra acción.
- HTTP local, `origin` explícito, política `strict-origin-when-cross-origin`. No `no-referrer`, `noreferrer`, extracción ni alteración del reproductor.
- Iframe observado de 640×390 CSS px, controles oficiales y sin overlays: supera 200×200 y la recomendación 480×270. Política de iframe verificada en DOM; no se inspeccionó directamente la cabecera Referer saliente y no se afirma que lo haya sido.
- Esta revisión habilita únicamente el laboratorio local. Antes de publicar hacen falta términos/privacidad propios, revisión del público objetivo y de las obligaciones aplicables. No es una certificación jurídica. Un resultado `madeForKids=false` no demuestra que la propia aplicación no se dirija a menores.

## Incidente previo: primer recorrido real tras la revisión

Entorno: Windows 10 x64 reportado por el navegador, Chromium/Chrome 153.0.0.0, viewport 1280×800, Vite 8.3.4 en `http://127.0.0.1:5173/`, worktree M001. No es una prueba en hardware móvil ni matriz Firefox/Safari.

Método: herramientas de navegador contra la aplicación y el proveedor reales, sin mocks ni rutas de YouTube interceptadas por el agente. Estado y tiempo proceden de los getters oficiales mediante el adaptador. No se midió alineación acústica independiente.

| Instante UTC | Acción / resultado observado |
|---|---|
| 15:26:46.373 | Antes de cargar: cero iframes, cero recursos externos, botón habilitado. |
| Después de cargar deliberadamente | Iframe oficial con ID esperado, `origin` local, `controls=1`, `autoplay=0`, `playsinline=1`, `enablejsapi=1`; API alcanzó `idle`. |
| 15:27:15.742 | Tras pulsar Reproducir: `playing`, 8.03 s. |
| 15:27:32.197 | `playing`, 24.44 s; avance de tiempo verificado explícitamente. |
| 15:27:43.580 | Tras pulsar Pausar: `paused`, 28.56 s; reloj local de muestra 62122.4 ms. |
| Posteriormente | La comprobación de pausa estable falló: el tiempo seguía en 28.56 s pero el estado había pasado a `error`. |
| Diagnóstico posterior | `Error 5`, fase `provider`, `elapsedMs=57578`; iframe aún visible y aviso de error expuesto. No se acredita estabilidad de pausa. |

La API de YouTube utiliza el código 5 para un fallo relacionado con el reproductor HTML5; este código no identifica por sí solo la causa raíz. En los registros también aparecieron solicitudes de telemetría/subtítulos del proveedor abortadas. No se ha demostrado relación causal ni se han atribuido a la red, la aplicación, codecs o automatización sin investigación. No se han conservado URLs firmadas ni parámetros de sesión en este documento.

**Resultado de aquel primer recorrido: NO aceptado.** El diagnóstico de error se expuso correctamente; sus cinco aserciones finales no eran cinco comprobaciones de reproducción exitosa. El usuario autorizó después una investigación acotada. El [informe controlado](S01-youtube-controlled.md) conserva sus 20 ciclos y el piloto inválido por separado: 10/10 con el adaptador y 10/10 con el reproductor mínimo, sin nuevo error 5 y con una pausa final de 60 s por variante. Se propone aceptar T01 con riesgo conocido, no declarar corregido el incidente ni mantener un bloqueo indefinido sin evidencia nueva.

Límites de esta primera observación: sin precisión musical, sincronización acústica independiente, seek real, repetición, duración completa ni auditoría exhaustiva de accesibilidad. El ensayo posterior sí observa seek a diez destinos por variante; no demuestra precisión acústica. El polling de 200 ms no es un SLA. Sin garantía gapless ni autorización de transcripción.

## Pruebas deterministas y diagnóstico

`tests/unit/player-contract.test.ts` comprueba comandos frente a estado observado, readiness, duración desconocida, pausa, seek sin llegada optimista, buffering/fin, errores, timeout, suscripción y dispose. Incluye la regresión reproducida y corregida de `onReady` tardío tras timeout.

Tras actualizar la revisión: `pnpm install --frozen-lockfile`, lint, vue-tsc estricto, **6/6 tests** y build pasan. Las pruebas no consultan red ni reemplazan el recorrido fallido. El archivo local de credenciales está ignorado y el bundle no contiene la clave.

## Estado de ejecución nativa

El proceso nativo inicial se detuvo por límite de uso del proveedor; su salida `complete` no significó T01 completada. Después se completaron las verificaciones y la investigación acotada; el usuario aceptó explícitamente el riesgo intermitente (D010). El resumen nativo de T01 registra su cierre verificado. T02 autorizada, sin T03 ni cierre de S01/M001 ni merge/push.
