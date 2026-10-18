---
estimated_steps: 5
estimated_files: 5
skills_used:
  - frontend-design
  - test
---

# T03: Probar repetición de sección y exponer fallos con limpieza

**Slice:** S01 — YouTube real y guía mínima
**Milestone:** M001

## Description

Depende de T02 y del contrato T01. Probar repetición de sección completa sin editor A/B; hacer visibles errores y recursos de sesión. No ejecutar sin aprobación correspondiente ni prometer retorno sin huecos.

## Steps

1. Leer la guía/sesión y contrato reales de T01/T02. Precisar comportamiento de activar/desactivar, pausa, fin de vídeo y navegación fuera de la sección; documentarlo junto a tests.
2. Con reloj virtual y doble tipado, probar cruce de frontera, retorno único pendiente y confirmación por observación. Evitar seek en cada tick durante buffering o un seek pendiente; una orden no equivale a llegada.
3. Añadir toggle de repetición de sección completa y estado explícito. Pausa/desactivación cancela retorno pendiente cuando corresponda; saltar a otra sección no arrastra bucle antiguo silenciosamente. Sin UI de extremos arbitrarios.
4. Verificar errores 2/5/100/101/150/153, onAutoplayBlocked y carga sin respuesta, con diagnóstico útil; limpiar timers/listeners/player al desmontar y evitar callbacks tardíos. No suprimir error con reintentos infinitos.
5. Pasar checks y probar varios ciclos reales, pausa, desactivar, saltar y reabrir. Registrar resultados para T04; si no resulta viable, exponer bloqueo antes de ampliar alcance. Commit atómico S01/T03.

## Must-Haves

- [ ] Sección completa se puede activar/desactivar; no editor A/B ni bucle de playlist presentado como sección.
- [ ] Retorno no genera tormenta de seeks; se respeta estado observado y control del usuario.
- [ ] Fallos específicos visibles y arreglo/guía conservado; no se confunde onAutoplayBlocked con onError.
- [ ] Desmontar/reabrir no duplica reproductores, suscripciones o muestreo; callbacks tardíos son inocuos.
- [ ] Pruebas deterministas pasan; restricciones reales se anotan sin acreditar viabilidad inexistente.

## Verification

- `pnpm run test --run && pnpm run typecheck && pnpm run build`.
- Tests de ciclos, seek pendiente, buffering, pausa/desactivación, saltos, fin, error y dispose con reloj virtual.
- Navegador real: varios retornos desde sección elegida, cancelación y reapertura; guardar observaciones para informe T04, sin extraer audio.

## Observability Impact

- Signals added/changed: bucle activo/pendiente, target y tiempo observado, errores por fase/código.
- How a future agent inspects this: panel de diagnóstico y tests de sesión/adaptador.
- Failure state exposed: timeout/error de retorno, autoplay bloqueado o vídeo no insertable; detener acciones automáticas ante fallo, conservar contexto.

## Inputs

- `src/application/guide-session.ts` — T02: selección/sesión y navegación.
- `src/fixtures/minimal-guide.ts` — T02: fronteras de sección.
- `src/application/player-port.ts` — T01: estados/órdenes.
- `src/infrastructure/youtube-player.ts` — T01: proveedor/ciclo de vida.
- `src/App.vue` — T02: pantalla conectada.

## Expected Output

- `src/application/guide-session.ts` — repetición controlada, sin lógica YT.
- `src/infrastructure/youtube-player.ts` — diagnóstico/readiness/errores/dispose robustos.
- `src/App.vue` — toggle y diagnóstico accesibles, sin overlays sobre vídeo.
- `tests/unit/guide-session.test.ts` — fronteras de repetición/estados/regresiones.
- `tests/unit/player-contract.test.ts` — error mapping y limpieza.
