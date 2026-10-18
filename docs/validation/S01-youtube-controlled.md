# S01 / T01 — Investigación acotada del error intermitente 5

**Fecha:** 2026-10-18  
**Resultado:** 10/10 ciclos válidos en A y 10/10 en B; error 5 no reproducido. Incidente previo conservado, causa desconocida. El usuario aceptó explícitamente el riesgo (D010); el cierre verificado de T01 consta en su resumen nativo. Solo T02 autorizada, no T03 ni cierre de S01/M001.

## Pregunta y límite de la investigación

Comprobar si el error 5 observado después de una pausa reaparece con operaciones repetidas y si diferencia nuestra integración del reproductor oficial mínimo. Ensayo limitado a dos sesiones de escritorio, diez ciclos por variante y una pausa final de 60 segundos por sesión. Sin reintentos, recuperación automática, nuevas dependencias ni cambios funcionales.

No pretende demostrar ausencia universal de fallos ni medir sincronización musical/acústica. El incidente inicial y su secuencia constan en [S01-material.md](S01-material.md).

## Condiciones y protocolo

- Vídeo fijo `M7lc1UVf-VE`; revisión oficial previa: `embeddable=true`, `madeForKids=false`.
- Chrome/Chromium 153.0.0.0, escritorio Windows, viewport 1280×800; HTTP local `http://127.0.0.1:5173/`, Vite 8.3.4. Una variante activa cada vez; sesión de navegador nueva antes de cada ensayo válido.
- Mismo tamaño de iframe 640×390, `origin`, `controls=1`, `autoplay=0`, `playsinline=1`, API oficial y política `strict-origin-when-cross-origin`.
- **A:** aplicación Vue real y su `PlayerPort`/adaptador. La única modificación temporal de fuente exponía el puerto ya existente al controlador local; no cambiaba su comportamiento. También se registraban snapshots del puerto y estados oficiales.
- **B:** `new YT.Player(...)` directo en el mismo contenedor visible; sin crear `PlayerPort`, ejecutar el adaptador ni suscribir estado Vue. Se reutilizó únicamente la carga oficial del script, no la lógica de reproducción. La página conserva el marco visual/disclosure de la aplicación, pero su estado permanece «Sin cargar».
- Instrumentación común: envoltura transparente de los callbacks oficiales, sin reemplazar los métodos del proveedor, y registro de las órdenes emitidas por el controlador del ensayo.
- Cada ciclo: play → observar estado playing y avance mínimo de 0.75 s → pause → observar paused y estabilidad durante 1 s (tolerancia de lectura 0.05 s) → seek al destino → observar llegada mediante getters → resume → observar playing y avance mínimo de 0.75 s.
- Destinos predefinidos, en segundos: `10, 45, 90, 20, 120, 60, 180, 30, 240, 15`; incluyen saltos adelante y atrás, no solo reproducción secuencial.
- Deadline por condición: 15 s. Predicados muestreados cada 100 ms; registro de transiciones cada 200 ms. A conserva además el polling propio de 200 ms. Tolerancia de llegada de seek del ensayo: 2 s, **no un SLA musical**.
- Si aparece error terminal, se registra y se detiene la variante, sin recargar ni reintentar. Tras diez ciclos correctos: pause y observación adicional de 60 s.

## Evidencia saneada conservada

- [S01-youtube-controlled-A.json](S01-youtube-controlled-A.json), captura final `2026-10-18T15:50:30.437Z`.
- [S01-youtube-controlled-B.json](S01-youtube-controlled-B.json), captura final `2026-10-18T15:53:08.738Z`.
- Cada evento tiene `atMs` monotónico relativo al inicio de su variante, ciclo, fase, estado/tiempo oficiales y, en A, snapshot del puerto. Los callbacks se registran antes de delegar al manejador original: un snapshot del puerto en ese instante puede reflejar el estado anterior; no es una mutación optimista ni una contradicción del proveedor.
- Se registran `onReady`, `onStateChange`, `onError`, `onAutoplayBlocked`, órdenes play/pause/seek/resume y transiciones. Las observaciones de avance, pausa y seek son posteriores a las órdenes.
- Los errores legítimamente visibles en la página superior se clasifican como error JavaScript, recurso o rechazo no gestionado, sin mensajes, stacks o URLs arbitrarios. Los arrays del ensayo válido están vacíos.
- **No se accedió al DOM/HTML5 interno del iframe.** Las restricciones same-origin permanecieron intactas; no se presupone visibilidad de errores internos, codecs o mensajes que el proveedor no exponga por su API. Tampoco se exportó un HAR con cookies o URLs firmadas.
- Sin API keys, cookies, tokens, cabeceras, identificadores de sesión, datos personales ni contenido audiovisual. El colector local acepta campos/valores controlados y no imprime el cuerpo de las solicitudes.

## Resultados por ciclo

Todos los pasos play, pause, seek y resume pasaron en cada fila. Las duraciones incluyen esperas deliberadas y cuantización de observación; no son latencias puras de YouTube.

| Ciclo | Destino (s) | A | Duración A (ms) | B | Duración B (ms) |
|---|---:|---|---:|---|---:|
| 1 | 10 | PASS | 3235 | PASS | 3230 |
| 2 | 45 | PASS | 3356 | PASS | 3141 |
| 3 | 90 | PASS | 3341 | PASS | 3256 |
| 4 | 20 | PASS | 3489 | PASS | 3152 |
| 5 | 120 | PASS | 3311 | PASS | 3156 |
| 6 | 60 | PASS | 3400 | PASS | 3062 |
| 7 | 180 | PASS | 3400 | PASS | 3052 |
| 8 | 30 | PASS | 3409 | PASS | 3058 |
| 9 | 240 | PASS | 3387 | PASS | 3136 |
| 10 | 15 | PASS | 3487 | PASS | 3251 |

| Señal | A | B |
|---|---:|---:|
| Ciclos válidos completados | 10/10 | 10/10 |
| `onReady` | 1 | 1 |
| `onError` / error 5 | 0 / 0 | 0 / 0 |
| `onStateChange` | 34 | 34 |
| Eventos de buffering (`data=3`) | 11 | 11 |
| Órdenes registradas | 41 | 41 |
| Errores de página superior observados | 0 | 0 |
| Pausa final estable | 60001 ms | 60002 ms |
| Tiempo antes/después de pausa final | 16.170155 / 16.170155 s | 16.101422 / 16.101422 s |

Las 41 órdenes son las 40 de los diez ciclos más la pausa final. En los registros de esa observación posterior al bucle, `cycle=11` es el valor del contador al salir de los diez ciclos; su fase es `final-pause`, no un undécimo ciclo. Se emitió además una acción inicial de reproducción en la preparación, fuera del cómputo de ciclos; no se utiliza para inflar su número. Hay 153 registros por variante. Las 11 entradas a buffering corresponden al inicio y a los diez saltos, seguidos de reproducción, no a once fallos.

Los getters reportaron exactamente cada destino en la muestra de llegada (`max |tiempo - destino| = 0`); esto no demuestra aterrizaje acústico exacto ni precisión de keyframes. A tardó 3235–3489 ms por ciclo y B 3052–3256 ms. No se atribuye esa diferencia al adaptador como causa probada: intervienen el polling del puerto, la fase de muestreo, buffering y el orden secuencial A→B. No hubo diferencias en errores o resultados funcionales.

## Piloto inválido, separado de los ensayos

Se conserva [S01-youtube-controlled-pilot-invalid.json](S01-youtube-controlled-pilot-invalid.json) para no ocultar una incidencia del arnés. Antes del ensayo válido se intentó envolver métodos del proveedor durante su construcción, antes de readiness. El puerto llegó a `COMMAND_FAILED` al ejecutar la primera orden del ciclo; no apareció `onError(5)`.

Ese piloto no prueba un defecto del producto ni cuenta como uno de los veinte ciclos. Se retiró la envoltura de métodos y se dejó solo el registro de callbacks y órdenes del controlador. Los ensayos válidos se realizaron después, sin cambios funcionales del producto entre A y B y sin reintentos dentro de los ciclos. La atribución del piloto a la instrumentación se sustenta en el punto de envoltura prematuro, el código `COMMAND_FAILED` observado y la desaparición al retirar únicamente esa envoltura; no se equipara al incidente real inicial.

## Interpretación y riesgos que permanecen

**Evidencia:** el incidente previo ocurrió; en los veinte ciclos controlados no volvió a aparecer. Ambas variantes completaron operaciones y pausas prolongadas con las mismas señales de buffering/error. No hay indicios suficientes para justificar una corrección funcional.

**Desconocido:** causa del primer error 5. No se han confirmado ni descartado problemas transitorios del proveedor, red, decoding o automatización. No se conserva diagnóstico HTML5 del primer fallo y no se inventa retrospectivamente.

**Límites:** una versión de navegador y un entorno, dos sesiones secuenciales no aleatorizadas, ciclos correlacionados, vídeo fijo, tramo limitado y condiciones externas no congelables. Cero fallos en esta muestra no estima una tasa universal ni garantiza estabilidad futura. No valida Safari/Firefox/móvil, reproducción completa, sincronía acústica, repetición de secciones, permisos musicales ni despliegue público.

Si reaparece el error: conservar la secuencia de callbacks y la última orden, detener la aceptación del recorrido afectado y comparar con B bajo el mismo protocolo. No añadir recuperación, reintentos ni guardas para ocultarlo. Solo proponer una corrección tras disponer de indicios de causa.

## Retirada y verificación

La instrumentación de fuente se retiró. `src/App.vue` vuelve a ser idéntico byte a byte a la copia anterior al ensayo (SHA-256 `c99afd249150febd7cd2af31e281f621437634ab218c694e0efd1c10b5d1c287`). El adaptador y el contrato no se modificaron. El controlador y colector quedan únicamente en `tmp/t01-controlled-investigation/`, ignorado por Git; no forman parte del producto ni de un commit. Los JSON saneados sí son evidencia durable revisable.

Tras retirar la instrumentación: instalación congelada, lint, TypeScript estricto, **6/6 tests existentes** y build pasan. No se añadieron dependencias ni se alteraron pruebas existentes.

Smoke final sobre el código restaurado, sin cargar el controlador/colector ni exponer el puerto: antes de cargar, cero iframes y cero recursos externos. Los controles reales de la página cargaron el vídeo, alcanzaron `playing` y mostraron avance de **3.94 a 14.34 s**. Tras Pausar: **18.40 s**, estado `paused`; segunda muestra idéntica **85829.9 ms** después, sin alerta. Las variables temporales de instrumentación estaban ausentes. Este smoke no se añade artificialmente a los veinte ciclos controlados.

## Revisión de criterios esenciales de T01

| Criterio del plan | Evidencia / límite |
|---|---|
| Página real reproduce/pausa, reloj observado | A completa diez ciclos contra YouTube real. Smoke final sin instrumentación: 3.94→14.34 s y pausa estable en 18.40 s durante 85.83 s. |
| Puerto desacoplado conectado a entrada | App → `PlayerPort` → adaptador; ningún tipo YT en el contrato. No hay dominio musical añadido. |
| Calidad, contrato y fallos no parecen éxito | Checks pasan; seis tests incluyen errores/readiness/dispose; el error real previo se mostró en UI. |
| Material y obligaciones | API oficial verificada; disclosure, controles visibles, 640×390, origin y política Referer configurados. No se capturó directamente la cabecera saliente y no se afirma lo contrario. No hay clave en bundle/Git. Uso local, no autorización musical o publicación. |
| Sin alcance futuro | Sin guía, renderer, optimizador, recuperación nueva o T02. |

**Decisión del usuario:** «acepto el riesgo, haz t02» (D010). Se acepta T01 con el riesgo conocido documentado tras verificar los criterios técnicos esenciales. El cierre se registra en el resumen nativo de T01. No declarar corregido el error ni validar S01 completa; solo T02 está autorizada.
