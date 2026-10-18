---
estimated_steps: 6
estimated_files: 14
skills_used:
  - frontend-design
  - test
---

# T01: Crear la entrada mínima con YouTube real y comprobar material

**Slice:** S01 — YouTube real y guía mínima
**Milestone:** M001

## Description

Primera reproducción real visible, con pausa y tiempo observado, base ejecutable mínima y prueba de contrato. Plan/criterios y base Vue 3/Vite/TypeScript estricto/Vitest/Playwright/pnpm/Node LTS aprobados específicamente para S01 (D006–D008); NO ejecutar hasta la siguiente autorización explícita. Vídeo inicial M7lc1UVf-VE, condicionado a inserción real, y Chrome/Chromium escritorio. Guía futura ficticia y rotulada, nunca transcripción del vídeo. La estimación incluye pequeños archivos de scaffold/configuración, no catorce módulos funcionales; si no cabe en una ventana, dividir antes de ejecutar y presentar ajuste.

## Steps

1. Confirmar nueva autorización de T01; seleccionar versiones estables compatibles de la base aprobada y Node LTS, documentar versiones exactas y `packageManager` de pnpm. Revisar condiciones de carga/privacidad y procedencia del ejemplo oficial M7lc1UVf-VE; comprobarlo en Chrome/Chromium escritorio. No afirmar permiso para transcribirlo ni que la guía ficticia representa su música. Si falta autorización o no funciona la inserción, detenerse sin sustituir vídeo o material silenciosamente.
2. Crear scaffold mínimo con TypeScript estricto, lint, Vitest y build reproducibles y lockfile. No Router, Pinia, backend o CI externa. Preparar tests del contrato antes/junto a la implementación.
3. Definir límite pequeño `PlayerPort`/`PlayerSnapshot` sin tipos YT: estado normalizado, segundos observados, play/pause/seek, suscripción y dispose. Las órdenes no acreditan éxito hasta observar estado; duración desconocida no es cero musical.
4. Integrar carga oficial con readiness y fallo visible; iframe visible sin overlays ni ocultar controles, HTTP local, origin/Referer correctos e interacción deliberada. No autoplay necesario ni secretos del proveedor en bundle.
5. Exponer play/pause/estado/tiempo y diagnóstico mínimo; verificar contrato con doble tipado, readiness, errores y limpieza. Sin guía rítmica/optimizador aún.
6. Ejecutar checks y comprobar vídeo real en navegador; registrar evidencia material y observación básica sin extraer audio. Añadir a preferencias SDD solo comandos que realmente existen. Revisar diff y commit atómico con referencia S01/T01.

## Must-Haves

- [ ] Página real reproduce/pausa vídeo permitido y muestra reloj observado/estado; un fake no acredita esta verdad.
- [ ] `PlayerPort` y adaptador conectados desde la entrada, sin API YouTube en reglas de dominio.
- [ ] Scripts de calidad reales y test de contrato pasan; fallos de carga/identificación no parecen éxito.
- [ ] Material y obligaciones de carga revisados, con evidencia sin secretos; no depender solo de embebibilidad.
- [ ] Ninguna funcionalidad futura, renderer final o modelo de arreglo completo.

## Verification

- `pnpm run lint && pnpm run typecheck && pnpm run test --run && pnpm run build`.
- Instalación reproducible: `pnpm install --frozen-lockfile` una vez creado el lockfile; documentar versiones elegidas sin inventar resultados antes de ejecutar.
- `tests/unit/player-contract.test.ts`: comandos/estados/readiness/error/dispose con doble sin red.
- Navegador real HTTP: interacción → PLAYING/tiempo creciente → pausa/tiempo detenido. Registrar entorno y estado real; si falla, tarea bloqueada.
- Confirmar controles/tamaño/Referer y que no se enviaron claves ni se añadió contenido sin permiso. No afirmar CI remota instalada.

## Observability Impact

- Signals added/changed: estado/readiness/tiempo observado y último código/fase de error.
- How a future agent inspects this: página mínima y `docs/validation/S01-material.md`.
- Failure state exposed: script/API no lista, reproducción bloqueada o error real; sin log de datos privados.

## Inputs

- `.sdd/milestones/M001/slices/S01/S01-PLAN.md` — ejecución bloqueada hasta aprobación y criterios de slice.
- `.sdd/milestones/M001/M001-RESEARCH.md` — restricciones documentadas, no prueba real.
- `docs/product.md` — alcance confirmado.
- `docs/development.md` — checks y Git.
- `.sdd/PREFERENCES.md` — preferencias preexistentes a preservar.

## Expected Output

- `package.json` — scripts/dependencias mínimas aprobadas.
- `pnpm-lock.yaml` — lockfile de pnpm aprobado; conservar para instalaciones congeladas reproducibles.
- `index.html` — entrada sin suprimir Referer.
- `tsconfig.json` — strict y referencias necesarias.
- `vite.config.ts` — Vue/Vitest mínimos.
- `eslint.config.js` — lint mínimo compatible.
- `src/main.ts` — montaje real.
- `src/App.vue` — página mínima con controles y diagnóstico.
- `src/application/player-port.ts` — `PlayerPort`, `PlayerSnapshot`, estados/errores normalizados.
- `src/infrastructure/youtube-player.ts` — `createYouTubePlayer()` oficial y limpieza.
- `tests/unit/player-contract.test.ts` — prueba determinista del límite/adaptador.
- `docs/validation/S01-material.md` — vídeo fijo, permisos/procedencia, revisión de privacidad/metadatos y observación real básica.
- `docs/development.md` — comandos de uso y limitaciones actuales.
- `.sdd/PREFERENCES.md` — verificación configurada solo con comandos creados.
