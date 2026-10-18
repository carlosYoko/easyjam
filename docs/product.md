# EasyJam — Visión de producto y alcance del MVP

**Versión:** 0.4.0
**Estado:** producto, dirección ADR-002 y roadmap S06–S11 aprobados en D013. Formalización/planificación S06 autorizadas; ejecución de código pendiente de revisión del plan.
**Actualización:** 18 de octubre de 2026.
**Relacionados:** [propuesta M001](mvp-proposal.md), [dirección arquitectónica](adr/ADR-002.md), [constitución propuesta](constitution.md).

## 1. Producto y valor principal

EasyJam es una biblioteca personal de canciones previamente transcritas para practicar guitarra rítmica mediante **pentagrama y tablatura reales del arreglo simplificado**, sincronizados con YouTube visible. Experiencia visual inspirada en Songsterr, no un visor de tarjetas de acordes. Analizar y preparar ocurre antes de practicar; los resultados se conservan y se reutilizan.

**Criterio de éxito:** «Añado una canción, se analiza una fuente autorizada, se guarda transcripción y arreglo, aparece lista en mi biblioteca y puedo practicarla siguiendo pentagrama y tablatura sincronizados, incluso tras reiniciar, sin repetir análisis».

Público inicial: guitarristas principiantes/intermedios. Precisión suficiente para generar guitarra rítmica simplificada; no reconstrucción exacta de todos los instrumentos de una mezcla, solos o riffs.

## 2. Experiencia principal e historias

### Mi biblioteca

Como guitarrista quiero encontrar mis canciones preparadas sin repetir su procesamiento.

- Sin canciones: estado vacío sencillo con **Añadir canción**.
- Con canciones: listado de todas las canciones guardadas, título, miniatura cuando proceda y estado de preparación.
- Seleccionar una lista abre directamente la práctica. Pendientes/errores explican fase/motivo y acción posible, sin fingir éxito.
- Sin usuarios, estadísticas, favoritos, filtros avanzados o herramientas analíticas.

### Añadir y preparar

Como guitarrista quiero pegar una URL, poder salir y volver cuando el trabajo termine.

1. Validar URL y normalizar ID canónico, sin descargar arbitrariamente la URL.
2. Reutilizar resultados completos o el trabajo existente; dos solicitudes simultáneas no crean otra canción ni otro análisis activo.
3. Registrar trabajo durable y responder sin esperar al análisis. Resolver/validar fuente independiente autorizada y correspondencia con el vídeo antes de analizar.
4. Mostrar exactamente **Pendiente → Analizando → Preparando arreglo → Lista**, o **Error** según resultado. Se puede permanecer pendiente si falta fuente autorizada; explicar ese motivo.
5. El trabajo depende del ejecutor/backend, no de la petición HTTP, pantalla, pestaña, polling ni sesión del navegador. Cerrar/navegar/recargar el navegador no cancela el trabajo.
6. Volver consulta el estado guardado. SQLite conserva original, arreglo, sincronización y estado. Si cae el ejecutor, reconciliar/reintentar desde checkpoint seguro; cerrar backend o apagar equipo NO implica que el cálculo continúe mágicamente.

**Objetivo URL sola:** conservarlo; una URL no da audio analizable ni permisos. Sin resolutor permitido, pendiente con explicación y puerta bloqueada. D013 permite archivo independiente autorizado exclusivamente para la prueba S06, sin acreditar URL única ni introducir carga de archivos/importación en el producto. Los fixtures no sustituyen transcripción real.

### Calidad antes que velocidad

Como guitarrista prefiero esperar una transcripción útil a recibir enseguida una tablatura incorrecta.

Se acepta que analizar tarde lo mismo que la canción o bastante más. No existe SLA de tiempo real ni multiplicador máximo arbitrario respecto a su duración. Priorizar precisión de notas/acordes relevantes para rítmica, cambios armónicos, ritmo, compases/duraciones, silencios/estructura, alineación y tocabilidad.

Evaluar motores existentes y preprocesamiento/multipaso solo si mejoran resultados medibles frente a una línea base sobre el mismo material autorizado. Separar calidad armónica, temporal y del arreglo. No exigir extraer con exactitud toda la mezcla ni inventar notas/rasgueos/silencios desconocidos. Un patrón simplificado derivado debe identificarse como tal; N.C. de un detector no acredita silencio de guitarra.

Los límites de memoria/coste/recursos y la detección de cuelgues siguen siendo necesarios, pero deben justificarse con mediciones y permisos, no cortar un análisis sano por tardar más que la canción. Timeout de red, heartbeat y deadline musical son conceptos distintos. Sin progreso cuantificable mostrar fase, no porcentaje/ETA ficticios.

### Práctica: pentagrama y tablatura

Como guitarrista quiero ver lo que realmente debo tocar y moverme por la música sin perder sincronía.

El visor musical ocupa la mayor parte de la pantalla y muestra simultáneamente:

- Pentagrama y tablatura de guitarra del **mismo arreglo simplificado guardado**.
- Compases, división musical, notas/quintas, duraciones y silencios.
- Cuerdas y números de traste correspondientes a digitaciones elegidas globalmente.
- Cursor visible, desplazamiento automático siguiendo la música y sección actual.
- Navegación a otro compás o sección mediante selección; alternativa accesible de teclado.

YouTube oficial en panel lateral o superior, visible y sin cubrir controles/anuncios, con dimensiones y condiciones aplicables. Play en el reproductor mueve el cursor según su tiempo observado; pausa lo detiene, seek lo recoloca tras observar destino, buffering no produce avance autónomo. Navegar desde notación solicita seek al vídeo y no finge llegada inmediata. Repetición de sección condicionada a utilidad/viabilidad, sin garantía gapless.

Puntos de sincronización guardados relacionan posición musical con esa grabación, permiten corregir desfases y conservan revisiones sin reanalizar audio. Un vídeo con cortes/velocidad distinta puede requerir varias anclas o rechazo. No es obligatorio construir un editor avanzado: el mecanismo mínimo de corrección/validación está pendiente de diseño.

**alphaTab se evalúa primero** para notación, cursor, scroll y medios externos. No adoptar todavía ni desarrollar renderer propio mientras una biblioteca madura cubra las necesidades. Tarjetas de acordes no son alternativa aceptable al visor final.

## 3. Capacidades y aceptación

| ID | Capacidad | Criterio observable |
|---|---|---|
| EJ-001 | Biblioteca | Vacío/Añadir canción; listado de todas, título/miniatura/estado; abrir listas directamente. |
| EJ-002 | URL/identidad | Variantes admitidas → mismo ID sensible a caso; rechazar entradas ambiguas/hosts/esquemas no admitidos sin fetch arbitrario. |
| EJ-003 | Reutilización | Repetir/enviar simultáneamente URL → una canción y como máximo un trabajo activo; resultado completo no vuelve al analizador. |
| EJ-004 | Calidad real autorizada | Fuente/permiso/grabación verificados; medir armonía/notas pertinentes, tiempo, compás, silencios y estructura con referencia legítima. Umbrales pendientes de evidencia/acuerdo, no inventados. |
| EJ-005 | Durabilidad/asíncrono | Cerrar navegador durante análisis no lo cancela; volver muestra fase/resultado real. Reiniciar backend/DB conserva resultados y reconcilia interrupciones. |
| EJ-006 | Original/arreglo | Original separado/inmutable y arreglo/receta versionados; regenerar sin analizador y conservar arreglo válido si falla. |
| EJ-007 | Simplificación | C→C5/Am→A5, progresión, estructura, duraciones y silencios preservados; ambigüedades explícitas, sin convertir indiscriminadamente. |
| EJ-008 | Digitaciones | Seis cuerdas E A D G B E, trastes 0–12 inclusivos, quintas de dos notas como base, alternativas justificadas; optimización global determinista, no greedy local. |
| EJ-009 | Notación/sincronía | Pentagrama+TAB del arreglo, cursor/scroll/sección, play/pausa/buffering/seek y navegación por compás/sección con reloj observado; cero llamadas de análisis al practicar. |
| EJ-010 | Fallos/retry | Fuente ausente, timeout de red, motor detenido/salida inválida, crash, SQL ocupado/sin espacio y proveedor fallido con diagnóstico persistente/recuperación acotada; no ready parcial, datos corruptos o retry infinito. |
| EJ-011 | Accesibilidad | Teclado/foco/etiquetas, legibilidad y selección no solo cromática; cursor sin saturar lector de pantalla, controles oficiales accesibles. |

**Lista** requiere transcripción aceptada + arreglo notacionalmente válido y tocable + sync compatible. JSON o proceso completado no bastan. Una regeneración fallida no destruye la práctica anterior.

## 4. Contrato de producto frente a hipótesis técnicas

**Confirmado:** experiencia anterior, calidad sobre velocidad, trabajo durable independiente del navegador, separación original/arreglo, persistencia/reutilización/deduplicación, YouTube visible y origen autorizado; sin microservicios/infraestructura distribuida.

**Dirección técnica aprobada (D013):** Vue 3 + TypeScript, backend local mínimo, SQLite, módulos desacoplados/adaptadores sustituibles, procesamiento durable y original/arreglo separados. Se conserva Vue/Vite/TS de S01. SQLite sigue sin implementación de canciones. Driver/framework/ejecutor concretos, motor, serialización, alphaTab/versión y ajuste de anclas se eligen con pruebas y planes autorizados. Las siete tablas de ADR-002 son un ejemplo, no obligación: mínimo suficiente con KISS/SOLID/YAGNI e invariantes verificadas. Aceptar arquitectura no adopta cada boceto o librería ni autoriza ejecutar código.

Dominio independiente de SQL/Vue/YouTube/alphaTab/motores. Contratos/adaptadores reales, validación runtime, UNIQUE/transacciones y checkpoints; no repositorio universal especulativo. `.sdd/sdd.db` es del agente, no SQLite de canciones.

## 5. Derechos, privacidad y viabilidad

IFrame reproduce/controla y Data API aporta metadatos, no un endpoint documentado de audio. Insertabilidad o permiso musical no autoriza automáticamente extraer desde YouTube. Validar fuente independiente, permiso de procesamiento/resultados/retención y misma grabación. Metadatos/minis API con refresco/borrado aplicable, separados de datos musicales independientes. No almacenar credenciales/cookies/URLs firmadas en datos/logs ni exponer claves al navegador.

Sin fuente permitida, presentar alternativas e impacto antes de cambiar alcance. Material propio/licenciado para pruebas; una fixture puede probar contratos, nunca acreditar transcripción real. Despliegue local monousuario candidato; no backend público sin nueva decisión/revisión.

## 6. Recorrido principal de aceptación (14 pasos)

1. Abro EasyJam.
2. Veo Mi biblioteca.
3. Añado una canción nueva mediante URL.
4. Se identifica y valida el material.
5. Se procesa una fuente de audio autorizada correspondiente al vídeo.
6. Se genera una transcripción musical real.
7. Se genera el arreglo simplificado en quintas y posiciones globales.
8. Se guardan original, arreglo y alineación en SQLite.
9. La canción aparece Lista.
10. La abro y veo pentagrama y tablatura del arreglo.
11. Pulso Play en YouTube oficial visible.
12. Cursor/scroll siguen la música; pausa/buffering/seek/navegación respetan tiempo observado.
13. Cierro y vuelvo a abrir EasyJam, incluyendo reinicio del proceso de persistencia en prueba operativa.
14. La canción sigue disponible sin volver a transcribir.

Añadir prueba de cerrar navegador mientras se analiza, regresar después; concurrencia, fallos/retry y regeneración sin análisis. No sustituir el recorrido final por mocks o cuatro tarjetas.

## 7. Exclusiones y estado real

Sin autenticación, multiusuario, pagos, estadísticas, favoritos, filtros avanzados, editor completo, catálogo externo avanzado, garantía de cualquier URL/estilo, solos/riffs/afinaciones/dificultades extra, A/B arbitrario ni looping sin huecos garantizado.

T01 01c0c7d/T02 1b4690d existen en `.sdd/worktrees/M001`: PlayerPort, YouTube oficial, reloj observado, navegación de guía **ficticia**, 65 tests y evidencia real. No integrados en main. Error 5 intermitente aceptado en D010, no resuelto. No hay aún biblioteca/backend/SQLite de canciones/analizador/optimizador/partitura real.

D013 aprueba visión, dirección ADR-002 y S06–S11; autoriza formalización/planificación S06 y commits documentales, no código. Plan S06 debe revisarse antes de ejecutar una unidad. T03/T04 y S02–S05 suspendidas y fuera de cola sin fingir completadas; historial/commits conservados. Sin auto, implementación S07–S11, cierre, merge ni push; constitución no ratificada globalmente. Validación con usuarios sigue diferida.
