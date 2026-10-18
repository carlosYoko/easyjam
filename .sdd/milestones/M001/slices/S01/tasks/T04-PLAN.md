---
estimated_steps: 6
estimated_files: 7
skills_used:
  - test
  - agent-browser
---

# T04: Verificar el recorrido y documentar medidas reales de viabilidad

**Execution status:** SUSPENDED by D013 scope revision; not executed, not completed. This historical plan is outside the active roadmap. Do not dispatch/resume it. Re-evaluate relevant evidence/tests in S07/S10/S11 under new plans/authorization; preserve this ID and unfinished checkbox.

**Slice:** S01 — YouTube real y guía mínima
**Milestone:** M001

## Description

Depende de T01–T03. Cerrar evidencia mínima real sin ampliar funciones. No convertir muestras de polling o coincidencia con el mismo reloj en precisión audible demostrada. La finalización de esta tarea no autoriza automáticamente S02.

## Steps

1. Revisar implementación y resultados T01–T03; confirmar matriz de navegador/dispositivo con el usuario si falta, distinguiendo emulación de hardware real. Revisar permisos y evidencia antes de grabar/versionar.
2. Implementar E2E determinista con proveedor falso inyectado solo para pruebas: carga, play/pause, guía, silencio, saltos, repetición, cancelación y error; comprobar teclado/foco/estado no solo cromático. No exponer un modo fake como prueba de reproducción real.
3. Configurar smoke real opt-in separado de la suite determinista; vídeo permitido/interacción explícita. Verificar readiness y tiempo observado. Bloqueos de red/proveedor son diagnósticos, no evidencia de éxito.
4. Con app local y proveedor real, registrar reproducción/pausa/seek/ciclos/buffering/desmontaje/reapertura y fallos accesibles. Los errores difíciles de inducir legalmente se cubren con dobles, declarando qué se observó realmente.
5. Medir y registrar: destino vs primer tiempo observado tras seek, tiempo a recuperación de estado/guía, sobrepaso de fin de sección/retorno, selección visual respecto al snapshot y desfase perceptivo mediante referencia independiente cuando sea accesible. Usar reloj monotónico para duraciones locales y segundos del proveedor para posición multimedia. Registrar muestras, método, condiciones de red, frecuencia de consulta, incertidumbre/rango y percentiles solo con muestra suficiente. No descargar audio ni afirmar que pantalla/loopback es una medida acústica independiente. Si no puede medirse una dimensión, declararla no probada y pedir ayuda solo para lo inaccesible.
6. Proponer umbrales numéricos derivados y límites de repetición para aprobación, con conclusión continuar/bloqueado/revisar. Pasar checks y commit atómico S01/T04; detenerse antes de S02 o cualquier cierre automático.

## Must-Haves

- [ ] CI determinista no depende de YouTube; smoke real separado.
- [ ] Evidencia real reproducible de la guía mínima con vídeo permitido, pausa/saltos/repetición y recuperación, no solo mocks.
- [ ] Informe distingue resultado observado, errores simulados, criterio propuesto y criterio aceptado; nunca rellena un resultado no medido.
- [ ] Al menos un diagnóstico de fallo comprobado y desmontaje/reapertura sin duplicados.
- [ ] Cualquier falta de material/hardware/viabilidad o aceptación se registra como bloqueo; no marcar S01 verificada por compilar.
- [ ] No elegir renderer/algoritmo final, no implementar arreglo completo y no avanzar a S02.

## Verification

- `pnpm run lint && pnpm run typecheck && pnpm run test --run && pnpm run build && pnpm run test:e2e`.
- `pnpm run test:youtube` con proveedor real cuando esté disponible; revisar resultados en vez de inferir éxito por arrancar.
- `test -s docs/validation/S01-material.md && test -s docs/validation/S01-youtube.md` más revisión del informe y evidencia enlazada.
- Browser assertions explícitas en la app local para estado, guía, pausa y error. Error de tercero no invalida automáticamente consola de la aplicación; distinguir procedencia.

## Observability Impact

- Signals added/changed: reporte reproducible con pasos/tiempos/errores y conclusión de viabilidad.
- How a future agent inspects this: informe local y suites determinista/opt-in documentadas.
- Failure state exposed: comparación entre funcionamiento de dobles y comportamiento real; dimensiones no medidas y motivos, sin falsa precisión.

## Inputs

- `src/application/player-port.ts` — T01: contrato para doble E2E.
- `src/application/guide-session.ts` — T02/T03: flujo/selección/repetición.
- `src/infrastructure/youtube-player.ts` — T01/T03: proveedor real/diagnóstico.
- `src/App.vue` — entrada real de la demo.
- `docs/validation/S01-material.md` — autorización y condiciones del material.
- `tests/unit/guide-session.test.ts` — regresiones previas.

## Expected Output

- `playwright.config.ts` — suite determinista y smoke opt-in separado.
- `tests/e2e/s01-guide.spec.ts` — recorrido determinista/fallos/teclado.
- `tests/e2e/s01-youtube.smoke.spec.ts` — verificación opt-in real.
- `package.json` — scripts E2E y smoke separado.
- `docs/validation/S01-youtube.md` — medidas/evidencia/límites/criterios propuestos/decisiones pendientes.
- `docs/development.md` — comandos reales, uso de suites y diagnóstico.
- `.sdd/PREFERENCES.md` — añadir comando E2E determinista si existe y se verificó; nunca smoke real en cada gate CI.
