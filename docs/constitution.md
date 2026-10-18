# EasyJam — Constitución del proyecto

**Versión:** 0.3.1  
**Estado:** propuesta para ratificación  
**Fecha:** 18 de octubre de 2026  
**Propósito:** establecer reglas de ingeniería y producto que prevalecen sobre decisiones locales de implementación.

> Documento canónico en `docs/constitution.md`. El proyecto utiliza el flujo nativo de SDD Pi. La constitución no está ratificada globalmente; esto no invalida aprobaciones específicas de producto/stack registradas. D013 aprueba producto, Vue3/TS/backend local mínimo/SQLite, dirección ADR-002 y roadmap S06–S11; siete tablas no obligatorias, mínimo suficiente con KISS/SOLID/YAGNI. Solo formalización/planificación S06, no código. Esto no ratifica globalmente esta constitución ni adopta motor/renderer concretos, y conserva la base S01 válida.

## 1. Misión y prioridades

EasyJam permite añadir canciones a una biblioteca personal, prepararlas mediante análisis real autorizado y conservar transcripción original y arreglo simplificado para practicarlas de principio a fin sin repetir análisis. La práctica muestra **pentagrama y tablatura del mismo arreglo simplificado**, con compases, duraciones, silencios, cursor, desplazamiento automático y navegación por compás/sección, sincronizados con YouTube oficial visible. D012 hace ambos sistemas de notación obligatorios; no se sustituyen por tarjetas. Calidad de guitarra rítmica antes que velocidad: se permite procesamiento mayor que duración, sin deadline musical arbitrario; trabajo durable independiente del navegador con límites operativos justificados, no tiempo real. La primera experiencia se centra en guitarra rítmica y acordes de quinta; otros instrumentos y práctica en grupo son evolución diferida, no abstracciones obligatorias del MVP.

**Condición obligatoria:** cumplimiento de derechos y plataformas; ninguna facilidad técnica, tocabilidad o experiencia justifica extraer audio ni redistribuir arreglos sin autorización.

Orden de prioridades dentro de las opciones que cumplen esa condición:

1. **Correctitud y tocabilidad musical:** ritmo, fundamental, afinación, silencios y transiciones deben ser coherentes.
2. **Experiencia de práctica:** progresión clara, continuidad, legibilidad y control del usuario.
3. **Simplicidad y mantenibilidad:** preferir la solución menor que cumple el objetivo verificable.
4. **Escalabilidad evolutiva:** preparar contratos, no construir infraestructura futura anticipadamente.

## 2. Principios no negociables

### I. Desarrollo guiado por especificaciones (SDD)

- Cada funcionalidad de producto **DEBE** contar antes de implementarse con historia de usuario, alcance, criterios de aceptación comprobables y estados de error.
- Las especificaciones expresan el **qué** y el **por qué**; los planes técnicos y ADR expresan el **cómo**.
- Las modificaciones sustantivas **DEBEN** actualizar su especificación y pruebas antes de considerarse finalizadas.
- El ciclo sigue las fases nativas de la versión instalada de SDD Pi: discusión y confirmación de alcance/requisitos → roadmap del milestone → planificación de slices y tareas → ejecución → verificación y cierre → reevaluación. SDD Pi gestiona sus artefactos y estado; no se usa el flujo de GitHub Spec Kit.
- Una historia no está terminada si su comportamiento contradice los criterios de aceptación, aunque la UI parezca correcta.

### II. Dominio musical independiente de frameworks

- `domain` **NO DEBE** importar Vue, Pinia, YouTube, alphaTab, servicios HTTP ni acceso a almacenamiento.
- Las reglas musicales **DEBEN** expresarse preferentemente como funciones puras y estructuras TypeScript inmutables.
- Los adaptadores integran librerías externas; las dependencias de infraestructura apuntan hacia contratos del núcleo.
- Las unidades se distinguen por responsabilidad: identidad de canción, transcripción original, arreglo derivado, eventos/secciones/digitaciones y alineación con una grabación. El detalle se valida con entradas reales; no lo decide la UI ni una tabla SQL.
- Conservar el resultado original y versionar recetas de arreglo permite regenerar sin reanalizar audio. No exigir multitrack o dificultades futuras hasta existir necesidad.

### III. Reutilizar antes de desarrollar

- Antes de construir utilidades de teoría musical o renderizado, **DEBE** evaluarse una librería existente y documentarse el resultado.
- Evaluar alphaTab prioritariamente para pentagrama+TAB/cursor/scroll/medios externos, sin adoptar hasta demostrar modelo/sync/pausa/buffering/seek y licencia/accesibilidad. No desarrollar renderer propio si biblioteca madura satisface requisitos. Tonal.js sigue candidato de teoría, no selección.
- Motores/preprocesamiento/multipaso se comparan con referencia legítima y baseline, mejora/degradación medible y coste/recursos; no reconstrucción exacta de todos los instrumentos obligatoria ni herramientas extra por intuición.
- La lógica específica propia se limita en principio a **transformación de arreglos, generación de posiciones y selección ergonómica** que las librerías no cubran adecuadamente.
- No se crearán interfaces, patrones o capas sin al menos un caso de uso concreto o una frontera externa que justifique su existencia.

### IV. Comportamiento musical explícito y comprobable

- Toda posición calculada **DEBE** respetar afinación, rango de trastes, cuerdas y digitación válida.
- La conversión a quintas debe conservar la **fundamental seleccionada** y la quinta justa; para acordes especiales o inversiones ambiguas, debe existir una regla documentada o advertencia, nunca una transformación silenciosamente engañosa.
- Los eventos musicales deben conservar **inicio, duración y silencios** en unidades musicales, separadas del reloj del reproductor.
- El optimizador **DEBE** evaluar transiciones de una progresión completa, no solo pares aislados; cualquier ponderación ergonómica debe poder probarse con ejemplos conocidos.
- Un arreglo simplificado **NO DEBE** presentarse como una transcripción fiel del tema original.

### V. Reproductores y proveedores intercambiables

- La capa de aplicación se comunica con el reproductor mediante un contrato propio (`PlayerPort`) y no mediante llamadas directas a la API de YouTube.
- Las vistas no invocan proveedores externos para tomar decisiones musicales.
- La sincronización debe reaccionar correctamente a reproducir, pausar, reanudar, buscar otro instante, terminar y sufrir errores; la precisión real debe medirse en navegadores, no suponerse.
- El reproductor embebido de YouTube **DEBE** permanecer visible y respetar sus reglas vigentes. No se descargará, aislará ni almacenará audio de YouTube para analizarlo.

### VI. Calidad, pruebas y accesibilidad

- Las reglas de dominio nuevas se desarrollan con **TDD o pruebas preparadas junto a la especificación**, usando casos límite y pruebas de regresión.
- La aplicación tendrá pruebas unitarias (dominio), de contrato (adaptadores) y end-to-end de los recorridos críticos; se pueden usar relojes/reproductores simulados.
- Cada cambio que afecte a la experiencia principal debe verificar el tramo correspondiente de **añadir URL cubierta → analizar realmente → guardar → biblioteca → practicar → reiniciar → reabrir sin análisis**; comprobar navegación, pausa y fallos cuando proceda.
- Persistencia y trabajos requieren SQLite real en fichero, constraints/transacciones, pruebas concurrentes y de proceso nuevo; dobles o bases en memoria no sustituyen durabilidad. Reintentos acotados y resultados válidos conservados.
- TypeScript en modo estricto y validación de datos en los límites del sistema son obligatorios.
- Controles operables con teclado, focos visibles, etiquetas accesibles, contrastes legibles y señalización no exclusivamente cromática.

### VII. Privacidad, derechos y seguridad por defecto

- Los arreglos distribuidos y ejemplos de audio requieren una **procedencia y autorización revisadas**; que un vídeo esté disponible en YouTube no otorga derechos sobre su música o transcripción.
- La primera versión no crea cuentas ni solicita datos personales innecesarios. La telemetría, si se incorpora, debe ser mínima y explícita.
- Se validarán identificadores y enlaces de entrada: ningún HTML/JS externo se interpreta como contenido ejecutable.
- Las credenciales de proveedores, si se requieren posteriormente, no se exponen en el bundle del navegador.

### VIII. Complejidad proporcional

- **No** microservicios, CQRS, Event Sourcing ni colas externas sin requisito demostrado.
- D013 aprueba backend local mínimo y SQLite como dirección ADR-002, modelo más simple suficiente sin siete tablas obligatorias. Framework/driver/ejecutor se ajustan por evidencia; no desplegar servicios públicos sin nueva decisión ni añadir capas/colas por previsión.
- No se extraen paquetes compartidos por previsión: únicamente cuando exista al menos un segundo consumidor real o un problema de límites comprobado.

## 3. Estándares de entrega

Una funcionalidad se considera **Done** únicamente cuando:

- [ ] Existe una especificación versionada con criterios de aceptación y casos de error.
- [ ] Existe un plan técnico; si introduce una decisión estructural, se registra o actualiza un ADR.
- [ ] La implementación respeta las reglas de dependencias y modelos existentes.
- [ ] Pasa comprobación de tipos, lint y pruebas automatizadas relevantes.
- [ ] Los cambios musicales incluyen ejemplos reproducibles de entrada/salida y regresiones.
- [ ] El recorrido del usuario se verifica en una prueba de integración o E2E cuando procede.
- [ ] Se revisan accesibilidad, comportamiento al pausar/buscar y condiciones de fallo.
- [ ] Se actualizan documentación y limitaciones visibles para el usuario.
- [ ] Se comprueban obligaciones de licencia, derechos de contenido y reglas de plataforma cuando se añaden fuentes o dependencias.

## 4. Pruebas mínimas del núcleo musical

- Conversión `C → C5` y `Am → A5`; no inferir que la tercera original se preserva.
- Generación de digitaciones para G5 y D5 en afinación estándar con posiciones alternativas reales.
- Rechazo de digitaciones fuera del traste máximo o de una afinación no soportada.
- Optimización global que pueda preferir una posición ligeramente menos cercana ahora para reducir desplazamientos posteriores.
- Respeto de cambios de sección, duración de eventos y silencios.
- Concordancia de resaltado y reloj tras reproducir, pausar, buscar o cambiar de velocidad si el proveedor lo permite.
- Advertencia o tratamiento explícito para símbolos ambiguos (`C/E`, `Cdim`, `Caug`, etc.).

## 5. Gobierno de las decisiones

- **Constitución:** reglas transversales del proyecto; cualquier excepción requiere aprobación y anotación en un ADR o solicitud de cambio.
- **Documento de producto:** misión, personas, alcance, métricas e hitos; no puede contradecir la constitución.
- **Especificación de funcionalidad:** requisitos y criterios de aceptación concretos.
- **ADR:** decisiones técnicas, alternativas, consecuencias, riesgos y condiciones de revisión.
- **Código y tests:** implementan y verifican lo acordado; no sustituyen la especificación.

### Versionado de la constitución

Se usa SemVer documental: **MAJOR** si se elimina o contradice un principio; **MINOR** si se añade una obligación; **PATCH** si se aclara redacción sin cambiar exigencias. Toda modificación incluye fecha, responsable de aprobación y razón del cambio. La propuesta 0.1.0 no equivale a ratificación formal.

## 6. Pendientes de ratificación

1. Aceptar esta constitución como base del repositorio.
2. Confirmar licencias y procedencia de los arreglos musicales de demostración.
3. Realizar prueba técnica de sincronización entre YouTube y el renderizador de tablaturas.
4. Definir la validación con usuarios sin cantidades ni porcentajes prefijados. El alcance confirmado se recoge en `product.md`; la secuencia candidata y sus puertas de aceptación, en `mvp-proposal.md`.

### Registro documental

- 0.3.1 — 18 de octubre de 2026: D013 aprueba producto/dirección ADR-002/roadmap y permite archivo autorizado solo para S06. Siete tablas no obligatorias, simplificación con pruebas; constitución sigue sin ratificación global y ninguna tarea de código se autoriza por esta nota.

- 0.3.0 — 18 de octubre de 2026: propuesta alineada con D012: pentagrama+TAB obligatorios del arreglo, alphaTab prioritario, calidad sobre velocidad y análisis durable independiente del navegador. Requisitos de experiencia confirmados, no ratificación global ni elección del diseño técnico; Vue3/TS/SQLite base propuesta del MVP revisado, preservando S01 existente.

- 0.2.0 — 18 de octubre de 2026: propuesta alineada con D011: biblioteca, original/arreglo separados, SQLite/backend mínimo justificados, pruebas de reinicio y análisis previo. Se retiran obligaciones anticipadas de multitrack. Producto confirmado por el usuario; estas reglas transversales y ADR-002 no quedan ratificados globalmente por ello.

- 0.1.1 — 18 de octubre de 2026: aclaración autorizada por el usuario de derechos y políticas como condición obligatoria y eliminación de metas cuantitativas no acordadas. No implica ratificación global de esta constitución.

---

**Referencias:** [SDD Pi](https://github.com/bhargavvc/SDD) · [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference) · [YouTube Developer Policies](https://developers.google.com/youtube/terms/developer-policies)
