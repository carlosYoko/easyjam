# M001: EasyJam Guitar Practice MVP

**Gathered:** 2026-10-18
**Status:** Ready for planning — manual only; implementation requires explicit user approval.

## Project Description

EasyJam permite acompañar una canción completa de forma accesible y cómoda, no reproducir fielmente la interpretación original. «No necesitas tocar una canción exactamente como el artista original para disfrutar tocándola de principio a fin».

Usuario inicial: principiante/intermedio que conoce mínimamente las quintas. Dificultad única fácil. Simplificar no es sustituir indiscriminadamente todo por quintas: respetar armonía, estructura, ritmo y silencios. Si un riff esencial no admite simplificación coherente, documentar y posponer esa canción.

## Why This Milestone

La frustración con tablaturas complejas y saltos innecesarios por el mástil exige validar la tocabilidad de la progresión completa. La prioridad explícita es no construir gran parte con simuladores para descubrir al final que YouTube no sirve: S01 es pequeña, real y temprana; no un reproductor completo.

## User-Visible Outcome

### When this milestone is complete, the user can:

- Abrir una canción autorizada completa y seguir quintas, ritmo, silencios y secciones con el vídeo real visible.
- Saltar entre secciones, pausar/reanudar, repetir una sección según viabilidad aceptada y terminar sin perder contexto.

### Entry point / environment

- Entry point: SPA local servida por HTTP; comandos exactos se crearán en T01, no existen todavía.
- Environment: navegador real; matriz objetivo pendiente de confirmar antes de medir. Móvil emulado no acredita hardware móvil.
- Live dependencies involved: YouTube IFrame Player API y vídeo fijo permitido; sin backend/cuentas/base de datos.

## Completion Class

- Contract complete means: pruebas musicales, de tiempo, validación de datos, adaptadores y E2E con dobles pasan; tipos/lint/build reproducibles.
- Integration complete means: canción completa y guía/tablatura sincronizada con YouTube real; navegación, repetición y errores ejercitados.
- Operational complete means: carga, pausa, búsqueda, buffering, error y desmontaje/reapertura sin recursos duplicados. No despliegue público o servicios supervisados en este alcance.

## Final Integrated Acceptance

To call this milestone complete, we must prove:

- Abrir arreglo → reproducir → seguir secciones/acordes/ritmo/silencios → saltar → repetir según acuerdo → terminar con un vídeo real permitido.
- Pausa, saltos consecutivos y fallo recuperable no inventan avance ni borran el arreglo válido.
- Medidas reales contrastadas con umbrales propuestos tras S01 y aprobados antes de S04. Mocks no sustituyen esa evidencia.
- S05 solo verifica/corrige defectos del conjunto, sin introducir funcionalidades significativas. No equivale a validar el producto con usuarios.

## Risks and Unknowns

- Seek puede aterrizar en keyframe anterior y cambiar reproducción según estado; el tiempo solicitado no es el observado.
- No existe garantía de repetición musical sin huecos; si no es útil, solicitar decisión de alcance.
- Derechos/material concretos no seleccionados. Embebibilidad no concede derechos del arreglo.
- Referer, privacidad/consentimiento y tratamiento Made for Kids deben resolverse antes de cargar el proveedor; posible procedimiento de metadatos pendiente, sin asumir claves.
- API polling no demuestra latencia audible; separar error de selección, latencia de UI, alineación del arreglo y desfase perceptivo.
- Renderer, unidades musicales definitivas, anclas, coste/algoritmo y matriz de entornos abiertos.

## Existing Codebase / Prior Art

- `docs/product.md` — alcance confirmado; no catálogo ni campo URL.
- `docs/mvp-proposal.md` — secuencia y límites aprobados de S01–S05.
- `docs/constitution.md` — propuesta transversal, no ratificación global.
- `docs/adr/ADR-001.md` — propuesta principal y bocetos, no APIs existentes.
- `docs/development.md` — calidad y commits explícitos; no push.
- `.sdd/PREFERENCES.md` — preferencias preexistentes, worktree por milestone y merge preservando commits; no modificar globales.

No existen src, package.json ni implementación. No se referencian capacidades fantasma como existentes.

> See `.sdd/DECISIONS.md` for all architectural and pattern decisions — it is an append-only register; read it during planning, append to it during execution.

## Relevant Requirements

- R001–R013 — todos mapeados en el roadmap; ninguno validado.
- R014–R018 — evolución posterior sin milestones reservados.
- R019–R020 — exclusiones del alcance.

## Scope

### In Scope

- S01 YouTube real/guía mínima; S02 arreglo completo; S03 conversión/optimización; S04 integración; S05 aceptación final.
- Seis cuerdas, E A D G B E, trastes 0–12, quintas básicas de dos notas, empates deterministas, tiempos/ritmo/silencios conservados.
- Una canción completa con varias secciones y variedad armónica, dificultad fácil; revisar ambigüedades.

### Out of Scope / Non-Goals

- Catálogo, URL arbitraria, IA, riffs/solos automáticos, varias dificultades, bajo/solista, A/B arbitrario, metrónomo/cuenta atrás y afinaciones adicionales.
- Cambios de tempo si la canción no los requiere; cuentas, backend e infraestructura anticipada.
- No ejecutar tareas ni auto con esta aprobación documental; no avanzar a S02 ni cerrar milestone.

## Technical Constraints

- Vue/Vite/TypeScript, Vitest/Playwright y arquitectura ligera siguen como propuesta principal, no ADR ratificado en bloque. Autorizar S01 debe resolver su base ejecutable explícitamente.
- Modelo musical separado de API YouTube; guía mínima no impone el esquema del arreglo completo.
- Evaluar bibliotecas antes de construir motor/renderizador; sin decisiones especulativas.
- Permisos, API oficial visible, tamaño mínimo documentado y controles sin overlays; no descargar/extraer audio.
- Commits atómicos revisados con rutas explícitas; runtime/DB/STATE gestionados por SDD, no escritos a mano.

## Integration Points

- YouTube: reloj en segundos, comandos asíncronos y estados; usar tiempo observado, no reloj UI acumulativo.
- Renderizador futuro: posiciones/eventos ya decididos; alphaTab admite external media en milisegundos, VexFlow es alternativa de notación; ninguna dependencia adoptada.
- SDD: ID generado por herramienta nativa, artefactos con plantillas instaladas y decisiones/research mediante herramientas disponibles; modo manual exclusivamente.

## Open Questions

- Vídeo/arreglo/permiso concretos y revisión de privacidad/metadatos antes de T01 real.
- Navegadores/dispositivos objetivo y disponibilidad de hardware para medidas.
- Umbrales tras S01 y aceptación de límites de repetición.
- Símbolos especiales, formas alternativas, política de octavas/transiciones del bucle, coste y algoritmo antes de S03.
- Renderer y representación temporal definitiva antes de S04, sin acoplar a ejemplos del ADR.
