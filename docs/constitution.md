# EasyJam — Constitución del proyecto

**Versión:** 0.1.0  
**Estado:** propuesta para ratificación  
**Fecha:** 18 de octubre de 2026  
**Propósito:** establecer reglas de ingeniería y producto que prevalecen sobre decisiones locales de implementación.

> Documento canónico en `docs/constitution.md`. El proyecto utiliza el flujo nativo de SDD Pi. Mientras no se ratifique, todas las decisiones se consideran propuestas.

## 1. Misión y prioridades

EasyJam permite que una persona toque una canción completa, desde la introducción hasta el final, siguiendo un arreglo **simplificado, rítmico y sincronizado** con una fuente de reproducción autorizada. La primera experiencia se centra en guitarra rítmica y acordes de quinta; el modelo debe admitir en el futuro guitarra solista, bajo y práctica en grupo.

Orden de prioridades cuando exista conflicto:

1. **Correctitud y tocabilidad musical:** ritmo, fundamental, afinación, silencios y transiciones deben ser coherentes.
2. **Experiencia de práctica:** progresión clara, continuidad, legibilidad y control del usuario.
3. **Cumplimiento de derechos y plataformas:** ninguna facilidad técnica justifica extraer audio ni redistribuir arreglos sin autorización.
4. **Simplicidad y mantenibilidad:** preferir la solución menor que cumple el objetivo verificable.
5. **Escalabilidad evolutiva:** preparar contratos, no construir infraestructura futura anticipadamente.

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
- Las unidades fundamentales del modelo son **Song, Arrangement, Section, Track, MusicalEvent, Fingering** y un mapa de tempo/sincronización; no componentes visuales.
- El arreglo debe permitir varias pistas y niveles de dificultad aunque el MVP muestre únicamente la rítmica.

### III. Reutilizar antes de desarrollar

- Antes de construir utilidades de teoría musical o renderizado, **DEBE** evaluarse una librería existente y documentarse el resultado.
- Se propondrá Tonal.js para notas/acordes y se evaluará alphaTab para tablaturas, **sin dar su idoneidad por demostrada** antes de un prototipo técnico.
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
- Cada cambio que afecte a la experiencia principal debe verificar el recorrido **abrir arreglo → reproducir → seguir sección/acordes → saltar → terminar**.
- TypeScript en modo estricto y validación de datos en los límites del sistema son obligatorios.
- Controles operables con teclado, focos visibles, etiquetas accesibles, contrastes legibles y señalización no exclusivamente cromática.

### VII. Privacidad, derechos y seguridad por defecto

- Los arreglos distribuidos y ejemplos de audio requieren una **procedencia y autorización revisadas**; que un vídeo esté disponible en YouTube no otorga derechos sobre su música o transcripción.
- La primera versión no crea cuentas ni solicita datos personales innecesarios. La telemetría, si se incorpora, debe ser mínima y explícita.
- Se validarán identificadores y enlaces de entrada: ningún HTML/JS externo se interpreta como contenido ejecutable.
- Las credenciales de proveedores, si se requieren posteriormente, no se exponen en el bundle del navegador.

### VIII. Complejidad proporcional

- **No** microservicios, CQRS, Event Sourcing, colas ni backend hasta que un caso de uso y sus requisitos los justifiquen.
- Primero un monolito frontend modular; separar servicios de red y persistencia solo cuando aparezcan necesidades reales.
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
4. Aprobar objetivos cuantitativos iniciales descritos en `product.md`.

---

**Referencias:** [SDD Pi](https://github.com/bhargavvc/SDD) · [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference) · [YouTube Developer Policies](https://developers.google.com/youtube/terms/developer-policies)
