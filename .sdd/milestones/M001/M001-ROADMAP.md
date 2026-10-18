# M001: EasyJam Guitar Practice MVP

**Vision:** Mi biblioteca persistente de canciones analizadas previamente y práctica de guitarra rítmica en pentagrama Y tablatura del arreglo simplificado, con cursor/scroll sincronizados con YouTube oficial visible.

**Approval / execution gate:** D013 aprueba producto, dirección ADR-002 y S06–S11. Solo formalización/planificación S06 autorizadas; revisar sus tareas antes de código. Ejecución manual, una unidad autorizada cada vez; no auto, implementación S07–S11, cierre, merge o push. Siete tablas no obligatorias: mínimo modelo suficiente, KISS/SOLID/YAGNI.

## Success Criteria

- Mi biblioteca vacía permite añadir URL; lista canciones/estados y reutiliza procesadas sin duplicados concurrentes.
- Fuente independiente autorizada, correspondiente al vídeo, produce transcripción real previa; original/arreglo/alineación separados, conservados en SQLite tras reiniciar.
- Pendiente / Analizando / Preparando arreglo / Lista / Error son observables; cerrar navegador no cancela ejecutor activo, backend interrumpido se recupera de forma segura.
- Lista abre pentagrama+TAB del arreglo guardado, con compases/duraciones/silencios/cuerdas/trastes/secciones; quintas de dos notas y posiciones globales deterministas en E A D G B E, trastes 0–12.
- YouTube visible gobierna cursor/scroll/navegación por tiempo observado; pausa/buffering sin avance artificial, seek sin llegada optimista, anclas corregibles guardadas.
- Práctica, reapertura, regeneración y ajuste de anclas no vuelven al analizador; calidad antes que velocidad dentro de recursos razonables.

## Key Risks / Unknowns

- URL sola no tiene resolutor de audio permitido acreditado. D013 permite archivo independiente autorizado SOLO en S06; no satisface URL única ni introduce subida en producto.
- Armonía/tiempo/compases/silencios/estructura/alineación musical pueden ser insuficientes; no asumir mezcla completa reconstruible o N.C.=silencio.
- Modelo notacional/alphaTab y sync externo pueden no cubrir pausa/buffering/seek/unidades/ocurrencias/accesibilidad. Error 5 intermitente sigue sin causa resuelta.
- SQLite/ejecutor: contención, crash, resultado remoto incierto, publicación parcial y retry duplicado; esquema físico/driver por elegir.

## Proof Strategy

- Fuente/calidad → S06 con canción completa autorizada, baseline real, referencia independiente, métricas por dimensión, candidato notacional/anclas y go/no-go. Informe debe separar archivo permitido vs URL sola.
- Renderer/sync → S07 con piloto legítimo pentagrama+TAB, cursor/scroll y vídeo real, pausa/buffering/seek/anclas. Evaluar alphaTab primero, no renderer propio por defecto.
- Persistencia/async → S08 con recorrido añadir/trabajo/original en fichero y backend real, cerrar navegador, carreras/claim/reinicio/checkpoint.
- Música global → S09 con arreglo tocable, validación notacional, comparación exhaustiva pequeña/greedy/empates y regeneración sin analizador.
- Ensamblaje → S10/S11 con práctica desde biblioteca y los 14 pasos reales, fallos/recuperación/reinicio sin análisis.

## Verification Classes

- Contract verification: Vitest/reglas/contratos/validación/URL/notación/anclas, types/lint/build; fixtures solo en pruebas deterministas, no para acreditar transcripción.
- Integration verification: fuente y motor reales, piloto renderer y YouTube visibles, arreglo/persistencia/práctica conectados.
- Operational verification: fichero/proceso nuevo, navegador cerrado durante análisis, concorrencia/checkpoints/rollback/crash/retry/contención, cero nuevas llamadas de análisis al reutilizar.
- UAT / human verification: calidad musical/tocabilidad y referencia audible independiente con incertidumbre explícita; no validar hardware/usuarios inaccesibles por emulación.

## Milestone Definition of Done

This milestone is complete only when all are true:

- S06–S11 terminadas con evidencia y contratos conectados; documentación no equivale a aceptación.
- Recorrido de 14 pasos de M001-CONTEXT.md ejercitado con fuente/análisis/SQLite/vídeo/reinicio reales.
- URL única demostrada dentro de cobertura explícita o cambio de alcance aprobado por el usuario. Archivo S06 no cierra este requisito.
- Calidad/alineación acordadas y útiles, original/arreglo/sync válidos, publicación/reintentos seguros; cero análisis al practicar/reabrir/regenerar.
- Tipos/lint/tests/build y pruebas de fallo/accesibilidad/licencias/privacidad aplicables pasan; repetición resuelta según utilidad/viabilidad sin prometer gapless.

## Requirement Coverage

- Covers: R001, R002, R003, R004, R005, R006, R007, R008, R009, R010, R011, R012, R013, R017, R018.
- Partially covers: R017/R018 y flujo URL permanecen no acreditados si S06 usa archivo; no confundir cobertura de plan con validación.
- Leaves for later: R014, R015, R016. R019/R020 siguen exclusiones.
- Orphan risks: ninguno sin dueño planificado; fuentes/calidad S06, renderer/sync S07, SQLite S08, arreglo S09, ensamblaje S10/S11.

| Primary owner | Requirements | Supporting slices |
|---|---|---|
| S06 | R012, R017 | S07,S08,S10,S11 |
| S07 | R002, R006, R013 | S06,S09,S10,S11 |
| S08 | R010, R018 | S06,S09,S10,S11 |
| S09 | R003, R004, R005 | S06,S07,S08,S10,S11 |
| S10 | R001, R007, R008, R011 | S07,S08,S09,S11 |
| S11 | R009 | S06,S07,S08,S09,S10 |

## Slices

- [ ] **S06: Fuente autorizada y análisis de calidad** `risk:high` `depends:[]`
  > After this: ejecutar análisis real completo de audio permitido, medir armonía/tiempo/alineación y producir candidato notacional trazable; archivo permitido solo demuestra viabilidad musical, no URL única, biblioteca o renderer final.
- [ ] **S07: Pentagrama y tablatura con sincronización viable** `risk:high` `depends:[S06]`
  > After this: piloto legítimo en pentagrama+TAB simultáneos con cursor/scroll, YouTube visible y navegación/pausa/buffering/seek/anclas probados, evaluando alphaTab prioritariamente.
- [ ] **S08: Biblioteca y preparación durable** `risk:high` `depends:[S06,S07]`
  > After this: añadir/reutilizar URL cubierta, persistir trabajo/original real en SQLite y volver tras cerrar navegador/reiniciar sin duplicación; sin arreglo final aún no Lista.
- [ ] **S09: Arreglo notacional tocable persistido** `risk:high` `depends:[S07,S08]`
  > After this: publicar Lista con original/arreglo/sync compatibles, quintas y digitaciones globales; regenerar sin analizador conservando resultado válido previo.
- [ ] **S10: Práctica completa desde biblioteca** `risk:high` `depends:[S07,S09]`
  > After this: abrir Lista y practicar desde principio a fin con pentagrama+TAB/cursor/scroll/vídeo/navegación/anclas persistidas, fallos y teclado sin reanalizar.
- [ ] **S11: Aceptación integrada y recuperación** `risk:medium` `depends:[S10]`
  > After this: recorrido real de 14 pasos y matriz de concurrencia/cierre/reinicio/fallos/reuso acreditados; solo correcciones, sin nuevas funciones.

## Boundary Map

Nombres de salida propuestos, no APIs adoptadas; ajustar tras evidencia sin capas especulativas.

### S06 → S07, S08, S09

Produces:
- Manifest de fuente/permiso/grabación/checksum y referencia autorizada; análisis neutral versionado original sin inventar datos desconocidos.
- Informe reproducible de motor/configuración/recursos/calidad, candidato notacional y mapa audio↔grabación con incertidumbre; go/no-go y limitación URL explícitos.

Consumes:
- PlayerPort/adapter y evidencia T01/T02 existentes; archivo independiente permitido por D013, no audio extraído de YouTube ni guía ficticia como referencia real.

### S07 → S09, S10

Produces:
- Contrato notacional validado, adaptador de renderer elegido con prueba, conversión de unidades/ocurrencias/anclas y navegación por tiempo observado.

Consumes:
- S06 original/referencia/notación candidata; PlayerPort y vídeo visible existentes.

### S08 → S09, S10, S11

Produces:
- Operaciones add-or-get/claim/checkpoint/read/retry/publicación transaccional y estado durable sobre esquema SQLite mínimo suficiente. Cierre navegador/restart/concurrencia reales.

Consumes:
- Fuente/analizador original S06 y requisitos de modelo S07; no siete tablas obligatorias ni microservicios.

### S09 → S10, S11

Produces:
- Arreglo notacional/versionado con posiciones globales/receta y sync compatible guardados, validación y regeneración sin análisis; Lista solo completa.

Consumes:
- Original S06/S08, contratos S07 y almacenamiento S08.

### S10 → S11

Produces:
- Biblioteca→práctica conectada con renderer/YouTube/cursor/scroll/anclas/errores/teclado y repetición condicionada; reproducción de lectura sin analizador.

Consumes:
- S07 renderer/sync, S08 biblioteca/SQLite/jobs, S09 arreglo y base T01/T02.

### S11 — Final acceptance outputs

Produces:
- Evidencia reproducible integrada/operativa con fallos y cierre/reinicio/reuso, limitaciones y verificaciones finales; ninguna nueva función.

Consumes:
- Entrypoint real S10, datos/fuentes/contratos S06–S09 y criterios aprobados.

## Preserved History / Manual Gates

[M001-ROADMAP-HISTORY.md](M001-ROADMAP-HISTORY.md) conserva roadmap previo. S01 incompleta, T01/T02 implementadas (01c0c7d/1b4690d), T03/T04 suspendidas/no ejecutadas; S02–S05 retiradas de cola y no completadas. IDs nunca se reutilizan. Planes/resúmenes originales conservados; no checkbox ficticio para desbloquear S06.

Revisión nativa: override de usuario mediante appendOverride, el mismo mecanismo de `/sdd steer`, y reescritura documental. `/sdd dispatch reassess` requiere slice completada; no se falsifica una. Derivar/verificar estado en main y worktree y reconstruir STATE únicamente con herramientas nativas. No `/sdd next`/auto: en esta instalación se usa `/sdd dispatch execute` solo tras autorizar la unidad seleccionada; no inicia bucle de milestone.
