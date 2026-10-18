# EasyJam — Visión de producto y alcance del MVP

**Versión:** 0.1.0  
**Estado:** alcance del MVP confirmado en discusión; pendiente de validación con usuarios. Planificación por slices: [propuesta revisada](mvp-proposal.md).  
**Fecha:** 18 de octubre de 2026  
**Documentos relacionados:** [constitución](constitution.md), [ADR-001](adr/ADR-001.md).

## 1. Resumen ejecutivo

**EasyJam** es una aplicación web de práctica musical que ayuda a un guitarrista a tocar una canción **de principio a fin** con un arreglo adaptado a su nivel. El primer modo transforma progresiones rítmicas en **power chords** (acordes de quinta), encuentra posiciones cómodas y muestra acordes, ritmo y secciones de la canción sincronizados con un reproductor visible.

**Promesa al usuario:** «Pon tu canción, sigue una guía sencilla y consigue tocarla entera».

**Posicionamiento:** no competir inicialmente por la transcripción más fiel o completa, sino por ofrecer la **versión más tocable** de una canción: comprensible, musicalmente reconocible y sin saltos de mástil innecesarios.

**Visión futura:** una vista compartida con pistas sincronizadas de guitarra rítmica, guitarra solista y bajo, para que varias personas puedan practicar la misma canción juntas, incluso con niveles distintos.

## 2. Problema y oportunidad

Las tablaturas convencionales suelen reflejar técnicas y posiciones difíciles, incluso cuando la armonía puede tocarse con acordes más próximos. Un guitarrista principiante o intermedio puede conocer acordes de quinta y aun así perder el hilo de una canción por cambios de posición, estructuras confusas, ausencia de ritmo o arreglos demasiado fieles al original.

EasyJam resuelve cuatro fricciones:

1. **Complejidad:** reduce la parte de guitarra rítmica a un acompañamiento asequible.
2. **Ergonomía:** elige posiciones considerando toda la progresión, no un acorde aislado.
3. **Continuidad:** comunica de forma visible cuándo empieza la intro, estrofa, estribillo, puente y final.
4. **Sincronía:** muestra qué tocar mientras avanza la música.

La utilidad debe extenderse a pop, rock, punk, metal, indie y otros estilos, aunque la simplificación no represente todos los matices de cada uno.

## 3. Usuarios y trabajo a realizar

### Persona principal — Guitarrista que practica solo

- Nivel: principiante o intermedio, conoce algunas quintas y quiere terminar canciones completas.
- Objetivo: disfrutar tocando junto a la grabación sin detenerse cada pocos compases.
- Necesita: tablaturas legibles, información rítmica, secciones, posibilidad de buscar un punto y posiciones cómodas.
- Criterio de éxito: «He conseguido tocarla entera y reconocía qué parte estaba sonando».

### Persona secundaria — Amigo que organiza una pequeña jam (posterior)

Quiere ver varias líneas instrumentales sincronizadas, asignar rítmica/bajo/solista y escoger dificultades diferentes para cada participante. **No forma parte del primer MVP.**

## 4. Alcance de la primera versión

### Imprescindible (P0)

| ID | Capacidad | Resultado esperado |
|---|---|---|
| P0-01 | Una canción completa con arreglo preparado y autorizado | Abrir la canción inicial; no se requiere catálogo ni entrada de URL. |
| P0-02 | Reproductor de YouTube integrado y visible | Escuchar el vídeo embebido sin ocultarlo ni alterar el contenido. |
| P0-03 | Secciones temporizadas | Mostrar intro, estrofa, estribillo, puente y cierre cuando existan. |
| P0-04 | Arreglo rítmico completo | Cubrir desde el comienzo hasta el final con acordes, patrones y silencios. |
| P0-05 | Conversión a quintas | Simplificar acordes convencionales conservando la fundamental definida. |
| P0-06 | Optimización de digitaciones | Elegir posiciones alcanzables con menor esfuerzo global y mostrar el traste/cuerda. |
| P0-07 | Sincronización visual | Resaltar la sección, compás y evento actuales según el reloj del reproductor. |
| P0-08 | Navegación de práctica | Reproducir, pausar, saltar de sección y repetir una sección completa según viabilidad real de YouTube; sin garantía de bucle sin interrupciones. |
| P0-09 | Errores claros | Explicar si no hay arreglo, el vídeo no permite inserción o falla la sincronización. |

**Alcance musical:** una pista de **guitarra rítmica** por arreglo, afinación estándar (E–A–D–G–B–E), acompañamiento con power chords, patrones rítmicos sencillos y silencios. La intro se cubre como **acompañamiento rítmico simplificado**; no se promete reconstruir su riff original.

**Restricciones confirmadas:** guitarra de seis cuerdas, afinación estándar E–A–D–G–B–E, trastes 0–12 y dificultad fácil única. Quintas de dos notas como forma básica, con alternativas justificadas por comodidad. Los símbolos ambiguos sin conversión fiable se señalan para revisión.

Se comienza con **una canción completa autorizada**, con varias secciones y variedad armónica. Antes de validar el producto con usuarios se probarán varias canciones de estilos distintos, sin cantidades ni porcentajes prefijados.

### Deseable tras el MVP (P1)

- Editor A/B arbitrario y metrónomo/cuenta atrás sin modificar el audio de YouTube; la repetición de sección completa pertenece al MVP, condicionada por viabilidad.
- Preferencia de zona del mástil; perfiles de optimización «menos movimiento» y «equilibrado».
- Afinaciones adicionales, incluido Drop D, previa cobertura con tests musicales.
- Ajuste manual de desfase del arreglo y editor/importador de progresiones temporizadas.
- Riffs sencillos opcionales en partes emblemáticas; cambio de dificultad sobre la misma canción.
- Persistencia local de preferencias, sin cuenta obligatoria.

### Fuera del MVP (visión / hipótesis)

- Pegar **cualquier** enlace de YouTube y obtener automáticamente una transcripción o un arreglo listo para tocar.
- Descargar, separar pistas o analizar directamente el audio servido por YouTube.
- Detección automática de acordes, secciones e instrumentación sin entrada musical autorizada.
- Tabladuras completas nota a nota de solos y técnicas complejas.
- Usuarios, pagos, biblioteca comunitaria y publicación abierta de transcripciones.
- Vista multitrack de bajo/rítmica/solista, jam multiusuario o sincronización entre dispositivos.

**Importante:** el MVP no incluye campo de URL ni catálogo. Si posteriormente se incorpora entrada por URL, solo podrá localizar un arreglo disponible; una URL desconocida no implicará generación automática.

## 5. Experiencia principal de usuario

1. El guitarrista abre la canción inicial con arreglo disponible; no necesita catálogo ni pegar una URL.
2. Ve el vídeo de YouTube **visible**, título, duración, afinación y dificultad del arreglo.
3. Aparece un mapa de secciones. Puede empezar desde el principio o saltar a otra sección.
4. Al reproducir, el sistema resalta en tiempo real el acorde/tablatura, su patrón rítmico y la sección activa.
5. En cada cambio de acorde ve posiciones legibles, sin saltos arbitrarios entre extremos del mástil.
6. La app contempla compases de silencio; no muestra que deba rasguear cuando debe dejar de tocar.
7. Al terminar, puede volver a una sección sin perder contexto.

La interfaz prioriza **una sola pregunta a la vez: qué debo tocar ahora y qué viene después**. Se evita saturar al principiante con notación secundaria o demasiados controles.

## 6. Requisitos funcionales y criterios de aceptación

### EJ-001 — Reproducción y lectura sincronizada (P0)

**Dado** un arreglo válido asociado a un vídeo reproducible, **cuando** el usuario inicia, pausa o busca otro instante, **entonces** sección, compás y evento musical resaltado reflejan ese estado, con sincronización suficientemente estable para seguir el ritmo.

**Escenarios:**

- Al comenzar en `0:00`, aparece la primera sección y el evento que corresponde a ese instante.
- Al buscar el instante de un estribillo, se resalta ese estribillo sin recorrer visualmente los anteriores.
- En pausa, el cursor no continúa avanzando.
- Si el vídeo deja de estar disponible, se muestra una explicación y la app conserva el arreglo.
- Si la fuente y los eventos no están alineados, se señala el problema; el sistema no simula precisión.

### EJ-002 — Conversión de acordes a quintas (P0)

**Dado** un evento de acorde convencional con fundamental inequívoca, **cuando** se solicita una versión sencilla, **entonces** se crea una quinta válida y se preservan inicio/duración. Ejemplos: `C → C5`, `Am → A5`.

**Excepciones:** acordes con bajo alternativo (`C/E`), aumentados, disminuidos o entradas ilegibles requieren política de simplificación documentada, corrección manual o indicación de que no se han convertido de forma fiable. La tercera desaparece intencionadamente.

### EJ-003 — Digitación cómoda (P0)

**Dada** una progresión completa, **cuando** se generan sus digitaciones, **entonces** se comparan posiciones válidas, se minimiza un coste ergonómico global y se respeta afinación y rango de trastes. El resultado explica cuerda/traste y debe ser estable para la misma entrada y preferencias.

**Escenarios:** transiciones G5→D5 y varias progresiones de cuatro u ocho acordes; empates reproducibles; acordes imposibles claramente señalados.

### EJ-004 — Navegación por secciones (P0)

**Dado** un arreglo con intro, estrofa y estribillo, **cuando** se elige una sección, **entonces** el reproductor salta al tiempo de inicio correspondiente y la tablatura refleja ese punto, incluso tras varios saltos consecutivos.

### EJ-005 — Errores y contenidos ausentes (P0)

Una canción sin arreglo disponible, con datos musicales corruptos o con vídeo no insertable muestra un estado específico y una salida útil. Nunca se muestra una tablatura inventada como si procediera del audio.

## 7. Reglas de producto musical

- **Una versión simplificada es un arreglo, no una transcripción literal.** Se identifica claramente su dificultad y procedencia.
- La estructura del tema se compone de **secciones**; los eventos musicales pertenecen a **pistas**. Ambos elementos se ubican sobre una línea temporal musical común.
- El dominio almacena eventos en **pulsos musicales/compases**, duración y mapa de tempo. Un adaptador convierte el reloj musical a tiempo del reproductor, considerando posibles desfases.
- La selección de posiciones considera desplazamiento, cambios de cuerda y extensiones incómodas; su ponderación se valida con guitarristas y pruebas de regresión.
- **Cualquier estilo** significa que admitimos material armónico de distintos géneros, no que garantizamos que las quintas reproduzcan los matices del original.
- Las partes sin acompañamiento rítmico pueden representarse como silencios, no como acordes continuos artificiales.

## 8. Hipótesis, métricas y validación

**Hipótesis H1:** un arreglo rítmico sencillo y sincronizado aumenta la probabilidad de tocar hasta el final.  
**Hipótesis H2:** las digitaciones optimizadas reducen pausas y dificultad percibida.  
**Hipótesis H3:** ver las secciones reduce la pérdida de contexto al practicar.

**Validación pendiente:** observar la práctica con varias canciones de estilos diferentes y participantes del público objetivo, sin fijar todavía tamaño de muestra ni porcentajes. Evaluar finalización, comprensión de secciones/acordes, comodidad de transiciones y fallos bloqueantes. Completar el recorrido técnico con una canción no valida estas hipótesis con usuarios.

La evidencia real con YouTube es obligatoria para cerrar el MVP; no implica depender de servicios externos en cada ejecución de CI.

Registrar aparte la desviación entre el resaltado y el sonido en navegadores reales, incluyendo latencia tras buscar, sin fijar un SLA antes de la prueba técnica.

## 9. Riesgos y decisiones abiertas

| Riesgo | Enfoque inicial |
|---|---|
| Derechos de tablaturas y arreglos | Música propia o contenido con permiso explícito; revisión antes de distribuir cada canción. |
| Restricciones de YouTube | Reproductor visible, API oficial y ningún acceso directo/descarga del audio. |
| Exactitud de la sincronización | Prueba de concepto con varios navegadores, tiempos de búsqueda y latencia real. |
| Complejidad de teoría musical | Evaluar bibliotecas como Tonal.js, sin adoptarlas todavía; casos no compatibles se marcan. |
| Facilidad subjetiva de digitación | Coste explicable + pruebas comparativas con guitarristas reales. |
| Riffs reconocibles que se pierden | Marcar el arreglo como simplificado y añadir riffs opcionales en iteraciones posteriores. |

## 10. Roadmap orientativo por entregables

La estructura S01–S05 aprobada como base y sus criterios de aceptación se mantienen en [mvp-proposal.md](mvp-proposal.md), sin duplicarlos aquí. Comienza con la prueba mínima de YouTube real y termina con validación integrada sin nuevas funcionalidades significativas.

## 11. Decisiones que debe tomar el equipo antes de desarrollar EJ-001

- Elegir las primeras piezas musicales con permiso para distribución de arreglos y reproducción incrustada.
- Validar la compatibilidad concreta de alphaTab o elegir un visualizador más sencillo si el uso de tablaturas no justifica su integración.
- Concretar formas alternativas y política de símbolos especiales; dificultad fácil y trastes 0–12 ya confirmados.
- Definir la validación posterior con usuarios sin cantidades ni porcentajes prefijados, evitando datos personales innecesarios.

---

**Referencias técnicas y de políticas:** [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference) · [Políticas de API YouTube](https://developers.google.com/youtube/terms/developer-policies) · [alphaTab: sincronización externa](https://alphatab.net/docs/guides/audio-video-sync/)
