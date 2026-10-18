# S01: YouTube real y guía mínima

**Goal:** Resolver pronto la viabilidad real de YouTube mediante una guía mínima de acordes y secciones, sin construir un reproductor completo ni fijar el renderer final.
**Demo:** Desde una página local, cargar deliberadamente un vídeo fijo permitido, reproducir/pausar, seguir la guía basada en su reloj, saltar y activar/desactivar repetición de sección; consultar diagnóstico y medidas reales.

**Execution gate:** Plan/criterios y base ejecutable de S01 aprobados; preparación autorizada, ejecución NO autorizada todavía (D006–D008). Mostrar previsualización nativa y esperar la siguiente autorización explícita para T01. Después, una tarea cada vez; no auto, no S02, no milestone completion.

**Approved test setup:** vídeo inicial oficial `M7lc1UVf-VE`, condicionado a funcionamiento integrado; guía ficticia rotulada como prueba técnica, no transcripción musical. Chrome/Chromium escritorio como objetivo de S01; no compatibilidad multidispositivo completa. Vue 3/Vite/TypeScript estricto/Vitest/Playwright, pnpm y Node LTS compatible aprobados; versiones estables exactas se seleccionan/documentan en T01. La canción y arreglo reales autorizados corresponden a S02.

## Must-Haves

- Vídeo oficial visible con controles y dimensiones conformes, material/permiso documentado, sin catálogo/campo URL ni extracción de audio.
- Guía pequeña preparada: secciones y acordes/silencios con referencias musicales y correspondencia temporal aislada del proveedor. No sustituye el arreglo completo de S02.
- Tiempo observado determina la guía; pausa/buffering no acumulan avance autónomo. Buscar no finge llegada antes de observar reloj/estado.
- Navegación y repetición de sección probadas, incluida pausa/desactivación/saltos; sin garantía de gapless. Si no es viable, registrar bloqueo y pedir decisión.
- Fallos específicos: script/API no lista, autoplay bloqueado, vídeo ausente/no insertable, error 153, buffering y limpieza al desmontar/reabrir.
- Tests deterministas y evidencia real separada con método/entorno/muestras/limitaciones; propuesta numérica de aceptación derivada de medidas, no inventada.
- Términos/privacidad/procedencia y tratamiento del vídeo revisados antes de cargar el proveedor.

## Proof Level

- This slice proves: contract and live integration of a minimal guide, not final assembly of the full arrangement.
- Real runtime required: yes, YouTube real desde HTTP local con vídeo permitido.
- Human/UAT required: evaluación perceptiva de alineación temporal cuando exista referencia independiente accesible; la guía ficticia no permite acreditar utilidad musical ni correspondencia armónica con el audio. El agente realiza comprobaciones accesibles en escritorio Chrome/Chromium. Otros navegadores y hardware móvil quedan fuera de la validación de S01.

## Verification

Comandos planificados: no existen todavía; T01 debe crearlos antes de usarlos como evidencia.

- `pnpm run lint`, `pnpm run typecheck`, `pnpm run test --run`, `pnpm run build`, `pnpm run test:e2e`.
- `tests/unit/player-contract.test.ts`: readiness, estados, comandos, errores y destrucción con dobles tipados.
- `tests/unit/guide-session.test.ts`: selección [inicio, fin), silencio, pausa, seek observado, retorno único por ciclo, desactivar bucle y limpieza con reloj virtual.
- `tests/e2e/s01-guide.spec.ts`: flujo determinista con proveedor falso, etiquetas/teclado, pausa, saltos, repetición y error visible. No conexión real a YouTube en suite CI.
- `tests/e2e/s01-youtube.smoke.spec.ts`: comprobación opt-in con proveedor real, separada mediante `pnpm run test:youtube`; una caída externa no invalida cada CI, pero no acredita integración real.
- `docs/validation/S01-youtube.md`: evidencia real de play/pause/seek/repetición/buffering/reapertura, matriz de entornos, resultados y propuesta de umbrales con incertidumbre. No marcar S01 completa si falta esta evidencia o la viabilidad sigue sin resolver.

## Observability / Diagnostics

- Runtime signals: readiness, estado real, tiempo observado, sección/evento, seek solicitado/observado y ciclo de bucle pendiente/completado.
- Inspection surfaces: panel de diagnóstico pequeño en la página de prueba y reporte local; sin plataforma de telemetría.
- Failure visibility: último error con código/fase/instante relativo, carga bloqueada y estado de reproducción programática. Evitar reintentos silenciosos o infinitos.
- Redaction constraints: no credenciales, cookies, datos personales ni audio/vídeo extraído. Evidencia local mínima; revisar capturas antes de versionar.

## Integration Closure

- Upstream surfaces consumed: docs aprobados y material fijo autorizado; no código previo.
- New wiring introduced in this slice: entrada Vite → página mínima → sesión de guía → PlayerPort → iframe oficial. Los dobles solo en tests, no reemplazan la demo.
- What remains before the milestone is truly usable end-to-end: arreglo completo S02, simplificación/optimización S03, renderer e integración S04 y aceptación final S05.

## Tasks

- [ ] **T01: Crear la entrada mínima con YouTube real y comprobar material** `est:1h`
  - Why: comprobar la reproducción externa antes de construir guía/motor.
  - Files: `package.json`, `src/main.ts`, `src/App.vue`, `src/application/player-port.ts`, `src/infrastructure/youtube-player.ts`, `tests/unit/player-contract.test.ts`, `docs/validation/S01-material.md`
  - Do: previa aprobación, fijar base/gestor/versiones, scripts y tests; documentar permisos/privacidad/vídeo; integrar iframe visible y play/pause/tiempo con límites pequeños. No catálogo/renderizador/optimizador.
  - Verify: `pnpm run lint && pnpm run typecheck && pnpm run test --run && pnpm run build`; reproducción real y estado/tiempo observados.
  - Done when: vídeo permitido realmente reproduce/pausa, reloj consultable y contrato testeado; si falta material, bloqueado sin fixture inventado.
  - Depends on: none; autorización explícita y material/condiciones de carga resueltos.
- [ ] **T02: Conectar guía mínima al reloj observado y navegar secciones** `est:45m`
  - Why: probar la sincronización y seek a través del camino real sin esperar al arreglo completo.
  - Files: `src/application/guide-session.ts`, `src/fixtures/minimal-guide.ts`, `src/App.vue`, `tests/unit/guide-session.test.ts`
  - Do: guía pequeña con silencio y secciones, selección pura y referencia musical/tiempo multimedia separadas; pausa/buffering y llegada observada tras seek.
  - Verify: `pnpm run test --run && pnpm run typecheck && pnpm run build`; comprobar guía y saltos reales desde varios estados.
  - Done when: selección actual/siguiente correcta, pausa sin avance autónomo y navegación basada en observación, no target supuesto.
  - Depends on: T01.
- [ ] **T03: Probar repetición de sección y exponer fallos con limpieza** `est:45m`
  - Why: resolver el segundo riesgo externo y asegurar que un fallo sea diagnosticable.
  - Files: `src/application/guide-session.ts`, `src/infrastructure/youtube-player.ts`, `src/App.vue`, `tests/unit/guide-session.test.ts`, `tests/unit/player-contract.test.ts`
  - Do: toggle de sección completa, evitar seeks duplicados pendientes, pausa/desactivar/saltos; estado error/autoplay/timeout y dispose sin callbacks/timers tardíos.
  - Verify: `pnpm run test --run && pnpm run typecheck && pnpm run build`; probar varios ciclos reales y desmontaje/reapertura.
  - Done when: control de repetición/fallos testeado y comportamiento real registrado, o bloqueo de viabilidad explícito sin prometer éxito.
  - Depends on: T02 y contrato T01.
- [ ] **T04: Verificar el recorrido y documentar medidas reales de viabilidad** `est:1h`
  - Why: separar evidencia de contrato de evidencia real y decidir si se puede continuar.
  - Files: `tests/e2e/s01-guide.spec.ts`, `tests/e2e/s01-youtube.smoke.spec.ts`, `playwright.config.ts`, `docs/validation/S01-youtube.md`, `docs/development.md`
  - Do: E2E falso determinista y smoke real opt-in; medir precisión/latencia/saltos/retorno, accesibilidad básica y diagnóstico; proponer umbrales desde datos, no elegir renderer final.
  - Verify: `pnpm run lint && pnpm run typecheck && pnpm run test --run && pnpm run build && pnpm run test:e2e`; `pnpm run test:youtube` y revisión de evidencia real según disponibilidad.
  - Done when: checks pasan, recorrido real documentado con método/entorno y límites, conclusión de viabilidad y criterios propuestos; pedir decisión si hay bloqueo o cambio de alcance.
  - Depends on: T01, T02, T03.

## Files Likely Touched

- `package.json`, `pnpm-lock.yaml`, `index.html`, `tsconfig.json`, `vite.config.ts`, `eslint.config.js`, `playwright.config.ts`.
- `src/main.ts`, `src/App.vue`, `src/application/player-port.ts`, `src/application/guide-session.ts`, `src/infrastructure/youtube-player.ts`, `src/fixtures/minimal-guide.ts`.
- `tests/unit/player-contract.test.ts`, `tests/unit/guide-session.test.ts`, `tests/e2e/s01-guide.spec.ts`, `tests/e2e/s01-youtube.smoke.spec.ts`.
- `docs/validation/S01-material.md`, `docs/validation/S01-youtube.md`, `docs/development.md`, `.sdd/PREFERENCES.md` (comandos reales tras crearlos).

## Pending Decisions / Stop Conditions

- Antes de T01: nueva autorización de ejecución. Base/gestor, vídeo técnico inicial y escritorio Chromium aprobados (D006–D008); verificar condiciones de carga/privacidad/Made for Kids y reproducción real del ejemplo oficial, sin suponer derechos musicales ni cambiar material si falla. Elegir y documentar versiones estables compatibles y Node LTS en T01, no instalarlos durante la previsualización.
- Renderer, algoritmo y modelo musical definitivo no se deciden en S01. Guía mínima HTML es propuesta local para revisar al autorizar, no adopción de un renderer final.
- Resultado cuantitativo de S01 no es una aceptación automática: proponer umbrales y solicitar acuerdo antes de S04. Inviabilidad que afecte la promesa se eleva al usuario antes de S02.
