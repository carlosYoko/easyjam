# S01 / T02 — Guía ficticia y navegación con reloj observado

**Fecha:** 2026-10-18  
**Resultado:** criterios de T02 verificados; 65/65 tests totales (59 nuevos, 6 de T01). Solo T02 autorizada por D010; no T03 ni cierre de S01/M001.

## Material, entorno y método

Se conserva `M7lc1UVf-VE` y la revisión oficial fechada de [S01-material.md](S01-material.md). Chromium 153.0.0.0, Windows escritorio, viewport 1280×800, Vite en `http://127.0.0.1:5173/`, iframe oficial visible 640×390. Sin mocks/rutas interceptadas en el recorrido del proveedor, sin extraer audio, sin acceder al elemento HTML5 interno.

Rótulo persistente: **«Secuencia ficticia de prueba técnica; no transcripción del vídeo»**. Los acordes, silencios y referencias de compás/pulso/duración están inventados; no se evalúa correspondencia armónica con el audio. `sourceTiming` contiene por separado ventanas preparadas en segundos, no un esquema definitivo de arreglo ni conversión PPQ/tempo.

Observaciones recogidas del DOM de la propia aplicación: estado, reloj mostrado, sección/evento actual/siguiente y destino solicitado. Durante parte del recorrido se usó un MutationObserver temporal de esa UI para registrar cambios; no se añadió instrumentación a los archivos del producto. Se registraron exclusivamente esos campos y timestamps. No HAR, cookies, claves, tokens, mensajes arbitrarios, URLs firmadas ni datos de cuenta.

## Fixture y semántica

- Sección A: `[0,16)`, C `[0,6)`, silencio `[6,8)`, G `[8,12)`; `[12,16)` sin evento preparado.
- `[16,20)`: hueco entre secciones, sin acorde ni sección actual.
- Sección B: `[20,36)`, Am `[20,26)`, silencio `[26,30)`, F `[30,36)`.
- Desde 36 s: fin de secuencia técnica, no fin del vídeo; sin acorde/sección inventados.
- Todos los límites son `[inicio, fin)`. El silencio explícito y la ausencia de evento son estados distintos; ninguno indica rasguear.
- La próxima sección y el próximo evento se etiquetan por separado: un evento siguiente puede seguir perteneciendo a la sección actual.

## Evidencia real seleccionada

Las cifras son las lecturas de UI redondeadas a dos decimales, no una medición acústica ni una promesa de aterrizaje exacto.

| Instante UTC | Acción / observación | Estado, tiempo y guía |
|---|---|---|
| Antes de cargar | Sin recursos externos ni iframe; navegación deshabilitada | Rótulo visible, sin selección musical ficticia |
| 16:14:27.312 | API lista, idle/cued | 0 s, A / C; saltos deshabilitados |
| 16:14:44.316 | Reproducir hasta primer silencio y pausar | paused, 6.50 s, A / Silencio, siguiente G |
| 16:15:08.190 | Segunda muestra sin órdenes | paused, mismos 6.50 s y silencio: 23.874 s de estabilidad |
| 16:15:20.218 | Solicitud B / 20 s ya visible | Todavía paused, 6.50 s, A / Silencio: sin selección optimista |
| 16:15:34.371 | Llegada observada a B | paused, 20 s, B / Am |
| 16:16:20–16:16:26 | Cuatro saltos alternos adicionales A→B→A→B | Llegadas 0 / C y 20 / Am, todas en pausa; cinco saltos pausados contando el inicial |
| 16:16:41.528 | En reproducción, solicitar A | El destino es 0 s, pero selección aún B / Am con 20.02 s |
| 16:16:42.599 | Tras observar A / C, solicitar B | playing, 0.28 s, A / C; destino 20 s aún no selecciona B |
| 16:16:49.106 | Reproducción tras salto a B | playing, 26.20 s, B / Silencio, siguiente F |
| 16:18:31.768 | Activar control oficial de pausa | paused, 115.78 s, sin evento preparado; el vídeo ha superado la fixture |
| 16:19:13.246 | Tras volver a A, control oficial +10 s | paused, 10 s, A / G; diagnóstico de última solicitud de aplicación sigue en A / 0 s |
| 16:19:35.859 | Control oficial −10 s | paused, 0 s, A / C |
| 16:20:09.223 | Reanudar desde A | buffering, 0 s, A / C; no avance autónomo de la guía |
| 16:20:09.508 | Proveedor vuelve a reproducir | playing, 0.02 s, A / C |
| 16:20:16.366 | Cambio natural de evento | 6.06 s, silencio A |
| 16:20:18.350 | Cambio natural | 8.04 s, G |
| 16:20:22.351 | Hueco dentro de A | 12.04 s, A / sin evento preparado |
| 16:20:26.350 | Hueco entre secciones | 16.04 s, sin sección/evento actual; próxima B / Am |
| 16:20:30.357 | Entrada natural en B | 20.05 s, B / Am |
| 16:20:36.357 | Silencio natural B | 26.05 s, B / Silencio |
| 16:20:40.358 | Cambio natural | 30.05 s, B / F |
| 16:20:46.358 | Final de fixture | 36.05 s, sin evento ni sección actual/siguiente |
| 16:21:01.801 | Pausa posterior | paused, 44.95 s, sin evento preparado |

Los controles nativos se localizaron por sus etiquetas accesibles en el iframe oficial y se activaron mediante automatización sobre sus botones, no sobre el elemento de vídeo. Los intentos iniciales de clic en el centro y tecla `k` no activaron pausa en esta UI del proveedor; no se contabilizan como pausas exitosas. No se incorporó ninguna dependencia del DOM de YouTube al código de EasyJam.

## Versión final, teclado y fallo visible

Después de aclarar las etiquetas de próximo evento/sección se recargó la página completa, sin conservar el observador anterior. Play/pause funcionaron; salto a B observado en pausa a 20 s con Am. Después, Shift+Tab/Enter y Tab/Enter navegaron A→B conservando pausa. No se requiere ratón para los botones propios; foco visible y selección también mediante `aria-current`, no solo color. Esto no es una auditoría completa WCAG/T04.

Se probó además el diagnóstico real de guía inválida: mediante importación del módulo local servido por Vite se puso temporalmente una duración musical en cero **solo en memoria del navegador**. Se observó alerta, retirada de acorde actual y navegación deshabilitada: 4/4 aserciones. Se restauró inmediatamente el valor; volvió Am con el mismo reloj pausado de 20 s. Los archivos de fixture nunca se modificaron para este experimento.

Dos limitaciones del arnés se distinguieron del producto: una espera genérica por «idle» coincidía con la nota explicativa antes de readiness; se sustituyó por espera sobre el diagnóstico. Además `:text-is` funciona en las esperas Playwright, pero no en el motor de `browser_assert`; las aserciones se repitieron con CSS estándar y lectura explícita de los campos. Un clic automatizado del smoke no llegó a emitir destino (continuaba en 0.17 s, sin aviso ni solicitud); la acción localizada por nombre sí emitió B y se observó su llegada. No se atribuyen esas comprobaciones instrumentales a error 5 ni se ocultan con parches.

## Calidad y límites

Instalación congelada, lint, `vue-tsc --noEmit`, **65/65 tests**, build y `git diff --check` pasan sobre la versión final. Las aserciones finales del navegador pasaron **8/8**; una comprobación adicional leyó exactamente `paused`, 20 s, B / Am, sin alerta, duración de fixture restaurada a 3 y sin overflow horizontal en escritorio. Se conserva el contrato/adaptador de T01 sin cambios y sus seis tests; 59 tests nuevos cubren ventanas, rest/gap, referencias inválidas, datos desconocidos, duración/posición, orden/solapamientos, límites, tiempo inválido y navegación antes/después de observaciones.

No hubo error de proveedor observado en T02. El riesgo intermitente aceptado en D010 sigue vigente, no corregido. Los errores/inputs inválidos no generan un acorde ficticio. No hay reloj local acumulativo, autoplay nuevo, reintentos, loops, guía completa, renderer ni optimizador.

Restricción deliberada: solo navegar desde `playing` o `paused` observado. `idle/cued`, loading, buffering, ended, error o falta de readiness no emiten seek; primero hay que reproducir/pausar. Se envía pause tras el seek cuando la observación anterior estaba pausada, sin declarar conservación hasta observarla. La disponibilidad de navegación durante buffering y la recuperación completa se revisarán en T03; no se implementan anticipadamente.

Los cambios naturales observados a 6.06/8.04/etc. son muestras del mismo reloj usado para seleccionar. No demuestran retraso respecto al sonido, independencia de relojes, frecuencia universal de acierto, precisión de keyframes o sincronización musical. Pendientes de T04: prueba E2E determinista y smoke opt-in como scripts, matriz de entornos, medidas temporales independientes y accesibilidad integrada. No cerrar S01 ni avanzar a T03 por estos resultados.
