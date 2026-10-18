# EasyJam Guitar Practice MVP — Propuesta revisada

**Estado:** propuesta documental aprobada y formalizada como milestone nativo M001 en modo manual. Contexto/roadmap y planes de S01 creados; ninguna tarea ejecutada. S01 requiere autorización explícita antes de T01.
**Actualización:** 18 de octubre de 2026.
**Fuente:** aclaraciones explícitas del usuario durante la discusión del MVP.
**Referencias:** [producto](product.md), [constitución](constitution.md), [ADR-001](adr/ADR-001.md), [desarrollo](development.md).

## 1. Resultado y público objetivo

Un guitarrista principiante o intermedio que conoce mínimamente las quintas puede acompañar una canción completa de principio a fin, siguiendo una guía rítmica sencilla y musicalmente coherente sincronizada con un vídeo de YouTube visible.

La filosofía es: «No necesitas tocar una canción exactamente como el artista original para disfrutar tocándola de principio a fin».

El MVP ofrece un único arreglo de dificultad **fácil**. No adapta dinámicamente la dificultad al usuario. La visión de accesibilidad para cualquier nivel sigue siendo una dirección futura, no una garantía del MVP.

## 2. Decisiones de producto confirmadas

### Imprescindible

- Practicar una canción completa, incluyendo estructura, cambios armónicos, ritmo y silencios.
- Mostrar secciones musicales y qué tocar ahora y a continuación.
- Representar el acompañamiento de guitarra rítmica mediante power chords.
- Seleccionar posiciones considerando la progresión completa, no cada acorde aislado.
- Sincronizar la guía musical con el tiempo real del vídeo.
- Navegar entre secciones.
- Repetir una sección completa cuando las capacidades reales de YouTube lo permitan de forma útil para practicar.
- Usar arreglos de prueba con derechos de uso resueltos y procedencia documentada.
- Aportar evidencia con un vídeo real y permitido antes de considerar completado el MVP.

### Simplificación musical

Simplificar no significa sustituir indiscriminadamente todo por quintas. El arreglo debe conservar un acompañamiento coherente con la armonía, estructura, ritmo y silencios de la canción. Se identifica como arreglo simplificado, no como transcripción fiel.

Si la identidad de una canción depende de riffs que no pueden simplificarse adecuadamente con quintas, se documentará esa limitación y podrá posponerse su incorporación. El MVP no genera riffs ni solos automáticamente.

La comodidad se evalúa sobre la progresión completa. Un mínimo matemático solo lo es respecto al coste declarado; no demuestra por sí solo comodidad para un guitarrista.

### Contenido y validación

Se empieza con **una canción completa**, no solo un fragmento. Esta demuestra el recorrido técnico y funcional. Antes de declarar validado el producto con usuarios, se probarán varias canciones de estilos diferentes. No se fijan todavía cantidades, porcentajes ni metas estadísticas.

La primera experiencia musical usa una canción completa, con varias secciones y suficiente variedad armónica. No necesita catálogo ni campo para pegar URLs. Como excepción técnica previa, S01 usará inicialmente el vídeo oficial de ejemplo `M7lc1UVf-VE`, condicionado a reproducción integrada efectiva, con secuencia ficticia identificada como prueba y no como transcripción. Su objetivo es Chrome/Chromium de escritorio; no acredita coherencia con la música del vídeo. La canción y arreglo reales con derechos resueltos se seleccionarán en S02.

### Derechos y plataformas

El cumplimiento legal y de las condiciones de YouTube es obligatorio, no una prioridad intercambiable por experiencia o funcionalidad. La disponibilidad de un vídeo no concede autorización sobre el arreglo musical.

Se usará el reproductor oficial visible. No se descargará ni extraerá audio incumpliendo sus políticas. Las condiciones vigentes se comprobarán antes de la integración; este documento no acredita una revisión jurídica o técnica del proveedor.

### Fuera del primer MVP

- Generación automática desde cualquier URL y reconocimiento de acordes mediante IA.
- Varias dificultades o adaptación individual.
- Pistas de bajo/solista, modo banda o sincronización entre dispositivos.
- Riffs y solos generados automáticamente.
- Editor A/B arbitrario, metrónomo y cuenta atrás.
- Cambios de tempo si la canción elegida no los requiere.
- Autenticación, cuentas y funcionalidades sociales.

### Restricciones musicales confirmadas

- Guitarra de seis cuerdas, afinación estándar E A D G B E (grave a aguda).
- Quintas de dos notas como forma básica; alternativas solo cuando aporten comodidad y con política explícita y pruebas antes de incorporarlas.
- Rango inicial inclusivo de trastes 0–12; la configuración para el usuario queda fuera del MVP.
- Optimización sobre la progresión completa y resolución determinista de empates.
- Conservación de tiempos, patrones rítmicos y silencios.
- Acordes especiales o ambiguos sin simplificación fiable se señalan para revisión; no se transforman arbitrariamente.

Afinaciones alternativas, preferencias avanzadas y generación asistida quedan para evolución posterior.

## 3. Arquitectura: límites, no ratificación

Se busca una arquitectura modular, desacoplada y comprobable, con reglas de negocio testeables, KISS, YAGNI y reutilización de bibliotecas. Debe poder evolucionar hacia varios arreglos y pistas sin implementar ahora esa complejidad.

La propuesta principal es Vue 3 + Vite + TypeScript, con Clean Architecture ligera y Ports & Adapters únicamente donde aporten valor, Vitest para unitarias y Playwright para E2E. Esto no ratifica ADR-001 en bloque. Tonal.js, alphaTab, contratos concretos de reproductor, representación temporal, algoritmo y pesos ergonómicos siguen abiertos. No se aceptan dependencias ni APIs por aparecer en un boceto. No se crean carpetas, capas, repositorios genéricos o infraestructura anticipada.

El modelo temporal debe representar estructura musical (compases, pulsos y duraciones) y su correspondencia con el tiempo del reproductor, sin acoplar eventos a la API de YouTube. S01 medirá precisión, retraso de seek y retorno de sección en entornos identificados; con esos resultados se propondrán criterios cuantificables para revisión antes de S04. No se fijan tolerancias sin evidencia.

No se introduce backend, base de datos o SSR en esta propuesta: no hay una necesidad demostrada del recorrido inicial. La arquitectura concreta se someterá a aprobación con evidencia.

## 4. Riesgos y puertas de decisión tempranas

| Riesgo | Evidencia necesaria | Momento / consecuencia |
|---|---|---|
| Acceso al tiempo y restricciones de YouTube | Vídeo real: reproducción visible, lectura de tiempo, pausa, seek y errores; registrar entorno y restricciones observadas | S01; si no permite la experiencia, detener la inversión dependiente y revisar la propuesta |
| Sincronía útil y recuperación tras saltos | Medir desfase y recuperación en reproducción, pausa, buffering y seek; contrastar utilidad musical | S01 y reevaluación S04/S05; no prometer precisión ni umbral sin medidas y aprobación |
| Repetición de sección | Retorno al inicio desde el final, varios ciclos, pausa, desactivación y saltos; documentar retrasos y comportamiento real | S01; si no es viable, presentar evidencia y solicitar decisión, no declarar el requisito cumplido ni eliminarlo silenciosamente |
| Disponibilidad y derechos del material | Procedencia/autorización del arreglo y vídeo permitido para inserción | Antes de pruebas con contenido; sin material válido, la prueba real está bloqueada |
| Pérdida de coherencia al simplificar | Revisión del arreglo completo: armonía, ritmo, silencios y partes reconocibles | Selección inicial y S02/S03; posponer canción inadecuada, no inventar riffs |
| Coste ergonómico insuficiente | Casos musicales, alternativas válidas, ejemplo donde greedy pierde y evaluación tocando | S03; revisar coste antes de ampliar el motor |
| Renderizador excesivo o incompatible | Evaluar API, licencia, representación rítmica, silencios y sincronización con el reloj externo | Antes de comprometer S04; alphaTab no es obligatorio |
| Modelo temporal ambiguo | Definir unidades, límites, desfase y fuente autoritativa con la canción elegida | S02/S04; no imponer PPQ, anclas o cambios de tempo sin necesidad |

La [investigación documental realizada](../.sdd/milestones/M001/M001-RESEARCH.md) contrasta documentación oficial y alternativas. No se afirma haber probado en ejecución YouTube, Tonal.js o alphaTab.

## 5. Vertical slices revisadas — candidatas

Orden y responsabilidades aprobados y formalizados en el [roadmap nativo M001](../.sdd/milestones/M001/M001-ROADMAP.md). Esta propuesta conserva la justificación de producto; las dependencias, contratos y tareas operativos se mantienen en los artefactos nativos. Solo S01 tiene tareas.

**Límites de responsabilidad:** S01 prueba viabilidad real con guía mínima, sin construir el reproductor completo; S02 es responsable del arreglo completo y su validación, no del optimizador; S03 implementa simplificación/optimización, no el proveedor; S04 integra las capacidades anteriores en la práctica completa; S05 solo verifica y corrige defectos de integración, sin nuevas funcionalidades significativas. Todas incluyen pruebas pertinentes y decisiones documentadas. Los commits serán atómicos, verificados y trazables a la slice cuando exista su ID nativo.

| Slice | Capacidad demostrable | Riesgo | Depende de |
|---|---|---|---|
| S01 | Seguir una guía mínima con YouTube real y probar navegación/repetición | Alto | — |
| S02 | Abrir la canción completa autorizada y explorar su guía rítmica y secciones | Medio | S01 |
| S03 | Tocar el arreglo en quintas con posiciones optimizadas globalmente | Alto | S02 |
| S04 | Practicar el arreglo completo con tablatura y controles sincronizados | Alto | S01, S02, S03 |
| S05 | Completar el recorrido integrado y documentar evidencia y límites del MVP | Medio | S04 |

### S01 — Prueba vertical mínima con YouTube real

**Demo:** un vídeo real permitido y visible acompaña una guía pequeña de acordes previamente preparados; el usuario reproduce, pausa y salta a una sección. Se prueba la repetición de una sección completa.

**Aceptación verificable:**

- Se usa el reproductor oficial y se obtiene su tiempo de reproducción; la guía selecciona el acorde correspondiente a ese tiempo.
- Pausar detiene el avance de la guía; tras un salto, esta refleja el tiempo realmente alcanzado, no el solicitado sin confirmar.
- Seleccionar una sección navega a su inicio; se documentan precisión y retraso observados.
- Se prueban varios ciclos de repetición, su desactivación y la pausa durante un ciclo. Se registran límites y resultado de viabilidad, sin prometer bucles sin huecos.
- Se registra el comportamiento ante buffering y vídeo no disponible/no insertable; los fallos no generan una guía ficticia.
- Existe un informe reproducible con vídeo, procedencia del material, navegador/dispositivo, pasos, medidas, limitaciones y conclusión sobre continuar.

**Límite:** guía mínima y controles imprescindibles, sin catálogo, motor de optimización ni reproductor completo. La canción final completa no es exigible en esta prueba pequeña. La base ejecutable y las comprobaciones mínimas se crean dentro de esta capacidad, no en una slice de infraestructura separada.

**Puerta:** revisar evidencia y resolver restricciones antes de invertir en funcionalidades complejas. Si el resultado exige cambiar alcance o arquitectura, se solicita aprobación.

### S02 — Canción completa y guía musical válida

**Demo:** abrir un arreglo autorizado completo, ver sus secciones y recorrer acordes, patrones rítmicos y silencios, todavía sin prometer la tablatura final integrada.

**Aceptación verificable:**

- Una canción completa tiene procedencia y autorización registradas, dificultad fácil y afinación explícita.
- Todas sus secciones y eventos se ubican sobre una línea temporal coherente; las partes sin acompañamiento se representan como silencios.
- El usuario puede seleccionar una sección y consultar su contenido y posición en la canción.
- Datos inválidos o incompletos muestran un error útil, sin presentar una interpretación parcial como válida.
- La revisión musical registra por qué el acompañamiento conserva coherencia y qué elementos del original no reproduce.
- Las validaciones cubren duraciones, referencias, límites temporales y datos musicales necesarios. Los cambios de tempo solo se incorporan si el material los necesita.

### S03 — Quintas y comodidad global

**Demo:** visualizar y tocar la secuencia de quintas seleccionada para la canción, con cuerda/traste y alternativas verificables.

**Aceptación verificable:**

- C→C5 y Am→A5 conservan inicio/duración; símbolos especiales o ambiguos siguen una política explícita, no una sustitución silenciosa.
- Las posiciones respetan afinación, rango aprobado y notas de la quinta; posiciones imposibles producen errores específicos.
- La selección considera la progresión completa y es determinista ante empates.
- Tests comparan el resultado con enumeración exhaustiva en secuencias pequeñas e incluyen un caso donde la selección greedy es peor.
- Se comprueba tocando la secuencia y se documentan límites del coste ergonómico. Se decide explícitamente cómo tratar inicio/final y transiciones al repetir una sección.

### S04 — Práctica completa sincronizada

**Demo:** seguir la canción completa mediante tablatura sencilla, ritmo, silencios y secciones, con el vídeo real visible y controles de navegación y repetición de sección según la viabilidad aceptada.

**Aceptación verificable:**

- El renderizador muestra las posiciones decididas por el motor sin recalcular decisiones musicales.
- Reproducir, pausar, reanudar y buscar mantienen sección/evento alineados con el reloj del proveedor; durante silencios no se indica rasguear.
- Saltos repetidos y fin de canción actualizan correctamente guía y controles.
- La repetición se verifica con el arreglo real, incluye desactivación y expone los límites aceptados; una inviabilidad pendiente bloquea esta aceptación.
- Buffering y errores conservan el arreglo y presentan el estado real del reproductor.
- Contratos y recorridos críticos tienen pruebas deterministas con dobles; se repite la medición real de S01 con el renderizador elegido.
- Se comprueban teclado, foco visible, legibilidad e indicadores no basados solo en color.

### S05 — Aceptación integrada del MVP técnico/funcional

**Demo:** abrir el arreglo, reproducir de principio a fin, seguir ritmo/secciones, navegar, repetir y finalizar, sin perder contexto tras un fallo recuperable.

**Aceptación verificable:**

- El recorrido completo se ejerce con vídeo real permitido y canción completa autorizada, no solo con mocks o fragmentos.
- Se revisan las medidas contra los criterios de sincronización acordados a partir de S01 y se documentan los entornos soportados.
- Las pruebas deterministas, comprobación de tipos, lint y build pasan; las comprobaciones externas no se exigen en cada ejecución de CI.
- Se verifican limpieza al salir/reabrir, errores recuperables, navegación por teclado y continuidad de la sesión.
- Se publican limitaciones del arreglo y del reproductor, procedencia y pasos de reproducción de la evidencia.
- No se declara validación del producto con usuarios: requiere posteriormente varias canciones de estilos diferentes y observación real, sin cifras prefijadas.

## 6. Boundary map candidato

- **S01 → S02/S04:** evidencia del proveedor, comportamiento de tiempo/estados/seek/repetición y guía mínima ejecutable. No constituye una API definitiva ni obliga a conservar el prototipo.
- **S02 → S03/S04:** arreglo completo validado, secciones, eventos rítmicos/silencios, afinación y procedencia; semántica temporal definida para el material.
- **S03 → S04:** eventos convertidos y posiciones seleccionadas; restricciones y coste reproducibles, errores musicales explícitos.
- **S01–S04 → S05:** aplicación ensamblada, pruebas deterministas, material autorizado y medidas reales para revalidar el recorrido completo.

Los nombres de archivos, funciones y contratos se fijarán al planificar; no se presentan como código existente.

## 7. Decisiones pendientes de aprobación

1. Plan/criterios y preparación de S01 aprobados; ejecutar T01 requiere la siguiente autorización explícita tras su previsualización nativa.
2. Seleccionar en S02 canción/arreglo/vídeo reales con derechos y embebibilidad comprobados; S01 tiene fijado el ejemplo técnico oficial, cuyo funcionamiento integrado aún debe verificarse. Afinación estándar y trastes 0–12 ya están confirmados.
3. Base de S01 aprobada: Vue 3/Vite/TypeScript estricto/Vitest/Playwright, pnpm y Node LTS compatible. Versiones estables exactas se seleccionan/documentan en T01; bibliotecas/renderizador y sus licencias siguen pendientes. ADR-001 no aceptado en bloque.
4. Definir política de acordes especiales, formas de quintas, octavas, restricciones y criterio ergonómico. La programación dinámica es candidata, no decisión ratificada.
5. Acordar semántica temporal, desfases y contrato de reproducción con evidencia; no adoptar automáticamente ticks, PPQ=960 ni anclas del boceto.
6. Chrome/Chromium escritorio fijado para S01; otros navegadores/móviles posteriores sin impedir su incorporación. Acordar tolerancia de sincronización y retorno aceptable a partir de medidas S01. Si repetir no es viable, el usuario decide cómo revisar el alcance.
7. Definir después una entrada por URL o catálogo si se requiere; no son parte del MVP aprobado.
8. Definir después la validación con usuarios y diversidad de canciones; no confundir cierre técnico con producto validado.
9. Ratificar separadamente constitución y arquitectura, y sincronizar documentos canónicos antes de ejecutar.

## 8. Fuentes documentales y siguiente paso

- `product.md` expresa el alcance de producto; esta propuesta concentra secuencia, límites y aceptación por slice, sin constituir un plan nativo.
- `constitution.md` mantiene su estado de propuesta; derechos y políticas se formulan como condición obligatoria.
- `ADR-001.md` conserva el estado propuesto y remite aquí para la secuencia y restricciones actuales; sus bocetos no son contratos aceptados.
- `development.md` define calidad y Git; A/B arbitrario y cambios de tempo no se convierten en requisitos por aparecer en ejemplos de pruebas.

**Siguiente paso exacto:** previsualizar T01 con el mecanismo nativo `/sdd next --dry-run` y esperar la siguiente autorización explícita de ejecución. Plan/criterios, base técnica y preparación están aprobados; no se autoriza ejecutar todavía. Después de esa nueva autorización, `/sdd next` ejecutará una sola unidad en modo paso a paso. No iniciar `/sdd auto`.

M001 fue generado mediante `sdd_milestone_generate_id`. Contexto, roadmap, contrato y planes usan las plantillas instaladas; decisiones e investigación se registran con herramientas nativas. No se han creado a mano STATE, DB, runtime ni marcadores de ejecución. Investigación documental y propuestas numéricas pendientes de medidas no son evidencia de funcionamiento real.
