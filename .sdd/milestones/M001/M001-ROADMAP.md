# M001: EasyJam Guitar Practice MVP

**Vision:** Acompañar una canción completa con guitarra rítmica fácil, quintas cómodas elegidas globalmente y guía de ritmo/silencios/secciones sincronizada con YouTube real visible.

## Success Criteria

- Principiante/intermedio puede seguir una canción completa autorizada con vídeo permitido, sin catálogo o generación automática.
- Quintas y posiciones respetan seis cuerdas, afinación estándar y trastes 0–12; ambigüedades se señalan y empates son deterministas.
- Pausa, navegación y repetición de sección reflejan el estado/tiempo observado y los límites aceptados.
- Fallos tienen explicación y no borran el arreglo válido ni simulan precisión.

## Key Risks / Unknowns

- Tiempo/saltos/bucles de YouTube no garantizan precisión musical o retorno continuo.
- Derechos, privacidad, identidad y material concreto pendientes.
- Coherencia del arreglo y comodidad no se acreditan solo con un algoritmo.
- Modelo temporal y renderizador aún no elegidos.

## Proof Strategy

- Riesgo externo → S01 con guía mínima real, medición y decisión de viabilidad antes de funcionalidades complejas.
- Contenido/coherencia → S02 con canción completa autorizada y validación musical.
- Coste global → S03 con posiciones reales, comparación exhaustiva pequeña, caso greedy fallido y evaluación tocando.
- Ensamblaje → S04 conecta; S05 repite el recorrido completo real sin añadir funciones.

## Verification Classes

- Contract verification: Vitest/contratos/validación/E2E deterministas; tipos, lint y build (propuesta de herramientas pendiente de aprobación para ejecutar).
- Integration verification: iframe oficial real, guía/tablatura, saltos, pausa, repetición y fallos; red externa fuera de CI determinista.
- Operational verification: desmontaje/reapertura, limpieza de suscripciones/timers, estados de carga/buffering/error.
- UAT / human verification: comodidad tocando, coherencia del arreglo, desfase perceptivo y utilidad del retorno. El agente verifica lo que pueda; hardware inaccesible se declara no probado.

## Milestone Definition of Done

This milestone is complete only when all are true:

- S01–S05 terminadas con evidencia y contratos conectados.
- Entrada real local ejercitada de principio a fin con canción completa/vídeo autorizados.
- Medidas contrastadas con criterios aprobados tras S01; inviabilidad de repetición resuelta con el usuario, no omitida.
- Tests deterministas/tipos/lint/build pasan; derechos, privacidad, accesibilidad y recuperación revisados.
- Ninguna declaración de validación con usuarios basada solo en esta canción.

**Execution gate:** este roadmap no autoriza código ni auto. Detenerse tras planificar S01 y solicitar aprobación explícita antes de T01. No planificar tareas de S02 ni cerrar el milestone.

## Requirement Coverage

- Covers: R001, R002, R003, R004, R005, R006, R007, R008, R009, R010, R011, R012, R013.
- Partially covers: none; R007 sigue condicionado a viabilidad y acuerdo, no validado.
- Leaves for later: R014, R015, R016, R017, R018. Excluye R019, R020.
- Orphan risks: ninguno sin dueño; material/privacidad/entornos en S01, renderer en S04, coste en S03.

| Owner | Requirements | Supporting |
|---|---|---|
| S01 | R001, R002, R010, R012 | S04, S05; S02 para permisos del arreglo |
| S02 | R003, R013 | S01, S03, S04, S05 |
| S03 | R004, R005 | S04, S05 |
| S04 | R006, R007, R008, R011 | S01, S02, S03, S05 |
| S05 | R009 | S01, S02, S03, S04 |

## Slices

- [ ] **S01: YouTube real y guía mínima** `risk:high` `depends:[]`
  > After this: reproducir un vídeo fijo permitido, seguir una guía pequeña y navegar/probar repetición con medidas reales documentadas; no una canción completa optimizada todavía.
- [ ] **S02: Arreglo completo válido** `risk:medium` `depends:[S01]`
  > After this: abrir/explorar la canción completa autorizada con secciones, ritmo y silencios validados, sin prometer aún la tablatura integrada final.
- [ ] **S03: Quintas y optimización global** `risk:high` `depends:[S02]`
  > After this: ver y tocar la secuencia de quintas elegida globalmente, con posiciones válidas y pruebas reproducibles del coste declarado.
- [ ] **S04: Práctica completa integrada** `risk:high` `depends:[S01,S02,S03]`
  > After this: seguir tablatura, ritmo y silencios con vídeo real, saltar y repetir según viabilidad aceptada, con errores y controles accesibles.
- [ ] **S05: Aceptación final del MVP** `risk:medium` `depends:[S04]`
  > After this: recorrido completo real y pruebas de regresión/accesibilidad/recuperación documentados; sin nuevas funcionalidades significativas ni afirmar validación con usuarios.

S02 precede a S03 por dependencia de contenido válido, no por menor riesgo. S05 es la comprobación explícita final del ensamblaje; solo corrige defectos de lo existente.

## Boundary Map

Los nombres siguientes son contratos planificados, no archivos o exports ya existentes. Los de S02–S04 se concretarán al planificar cada slice, actualizando este mapa si la evidencia cambia la frontera.

### S01 → S02

Produces:
- `src/application/player-port.ts` → `PlayerSnapshot`, `PlayerPort`: segundos observados, estados normalizados, play/pause/seek y dispose; no promesa de seek exacto.
- `src/infrastructure/youtube-player.ts` → `createYouTubePlayer()`: adaptador oficial, estados/errores y limpieza.
- `src/application/guide-session.ts` → `selectGuideFrame()`, sesión mínima con secciones temporizadas, silencio y estado de repetición; no modelo definitivo de arreglo.
- `docs/validation/S01-youtube.md` → resultados reales, método, incertidumbre, límites y criterios propuestos; incluye decisión pendiente sobre continuidad.

Consumes:
- nada de slices anteriores; documentos aprobados, material autorizado y propuesta de stack aprobada para ejecución.

### S01 → S04

Produces:
- `PlayerPort`, `PlayerSnapshot`, `createYouTubePlayer()` y evidencia S01 definidos en la frontera S01 → S02; se reutilizan sin duplicar proveedor.

Consumes:
- Documentos aprobados y material mínimo permitido; nada de otras slices.

### S02 → S03

Produces:
- Contrato `Arrangement` validado: identidad/revisión/procedencia, afinación, dificultad fácil, secciones, eventos con inicio/duración musical y ritmo/silencios; relación explícita con fuente multimedia separada.
- Resultado de carga válido/error de validación y material completo autorizado. Unidades y reglas temporales se fijan con la canción, sin API YouTube en dominio.

Consumes:
- S01 → restricciones reales del proveedor y evidencia; no convertir su guía mínima en esquema definitivo por defecto.

### S02 → S04

Produces:
- El mismo contrato `Arrangement`, resultado válido/error y material completo descritos en S02 → S03; estructura musical independiente del proveedor.

Consumes:
- S01 → restricciones reales del proveedor; no reutilizar su guía mínima como esquema definitivo por defecto.

### S03 → S04

Produces:
- Conversión de eventos a quintas con tiempos conservados o error/revisión explícitos.
- Candidatos válidos cuerda/traste y secuencia seleccionada para la progresión completa, coste declarado y desempate determinista.

Consumes:
- S02 → arreglo validado, afinación/eventos/ritmo y límites temporales.

### S04 → S05

Produces:
- Pantalla de práctica completa: proyección tiempo multimedia ↔ posición musical, tablatura de posiciones seleccionadas, sección/evento actual/siguiente, navegación y repetición aceptada.
- Estado visible de carga/buffering/pausa/error, conservación del arreglo y limpieza de la sesión.

Consumes:
- S01 → contrato/adaptador/evidencia; S02 → arreglo válido; S03 → eventos/posiciones. Renderer no decide digitaciones.

### S05 — Final acceptance outputs

Produces:
- Evidencia reproducible del recorrido real completo y matriz de aceptación, pruebas de regresión y revisión de derechos/privacidad/accesibilidad.
- Correcciones de defectos si se detectan; sin nuevas funciones significativas.

Consumes:
- Aplicación integrada S04 y contratos/material/evidencia S01–S03; criterios cuantitativos aprobados a partir de S01.
