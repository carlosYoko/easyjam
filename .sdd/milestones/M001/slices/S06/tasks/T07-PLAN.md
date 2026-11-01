---
estimated_steps: 5
estimated_files: 3
skills_used: []
---

# T07: Acreditar material y referencia independiente antes del análisis

**Slice:** S06 — Fuente autorizada y análisis de calidad
**Milestone:** M001

## Description

Puerta obligatoria separada de T01 por aprobación explícita del usuario en D014. ID añadido sin renumerar T02–T06; se ejecuta antes de T03, no después de T06. El orden operativo es T01 → T02 → T07 → T03 → T04 → T05 → T06, con autorización individual. T02 puede preparar contratos y errores con dobles identificados, no aceptar material ni ejecutar el motor. **Revisión acotada de T07 autorizada y realizada el 2026-11-01; tarea BLOQUEADA, no completada.** Archivo/snapshots locales conservan hashes; referencia temporal completa, correspondencia musical, segmentos y pareja compatible de herramientas siguen sin acreditarse. Puerta explícita en `docs/validation/S06-reference.md`. No se autoriza T03 ni se amplía el alcance por esta revisión. Sin contacto a terceros, costes, extracción YouTube o cambio silencioso de alcance.

## Steps

1. Revisar investigación T01 y fuentes públicas actualizadas. Elegir una canción completa concreta; Code Monkey es candidato, no aceptación. No transferir licencias entre composición, grabación, score, repositorio de software o mirror.
2. Acreditar permisos de análisis, transcripción/derivados y retención local; verificar archivo y hash, duración/decodificación/cobertura completa y disponibilidad. No sustituir por fragmentos o sintetizados sin decisión explícita. Audio y snapshots protegidos permanecen locales.
3. Obtener referencia musical/temporal legítima independiente del motor: autor/método/licencia/revisión, ocurrencias de armonía, compás/beat, ataques/duraciones/rests/secciones y unidades con incertidumbre/cobertura explícitas. Una dimensión ausente es no medible, no aceptada. Si la falta impide el objetivo de S06, bloquear, no reducir criterios unilateralmente.
4. Acreditar la misma grabación/edición YouTube mediante reproducción oficial y landmarks independientes al inicio/medio/final/transiciones; documentar diferencias, cortes/velocidad y error. Congelar referencia y segmentos de calibración/holdout antes del motor. Revisar una pareja mínima host/plugin realmente compatible y sus licencias/versiones/artifactos antes de proponer instalación en T03.
5. Registrar puerta explícita aceptada o bloqueada en S06-reference.md y actualizar material/protocolo. Solicitar revisión de evidencia/protocolo antes de T03. Ni la existencia del fichero, ni T01/T02 completas, ni una orden de reproducción sustituyen la aceptación.

## Must-Haves

- [ ] Canción completa, archivo autorizado independiente y derechos de análisis/derivados/retención acreditados; no prueba ficticia de URL única.
- [ ] Referencia legítima independiente con revisión/incertidumbre, cobertura suficiente y segmentos de calibración/holdout concretos congelados.
- [ ] Identidad/correspondencia musical audio–YouTube verificada con landmarks independientes, no solo título/álbum/duración.
- [ ] Propuesta mínima de host/plugin compatible y licencias/versiones revisadas; sin instalación/ejecución del analizador en esta unidad.
- [ ] Evidencia/protocolo revisados y puerta explícita antes de T03; cualquier falta esencial mantiene T07 bloqueada.

## Verification

- Desde worktree: `node --input-type=module -e "import fs from 'node:fs'; for (const p of ['docs/validation/S06-material.md','docs/validation/S06-protocol.md','docs/validation/S06-reference.md']) if (!fs.statSync(p).size) process.exit(1)"` y `git diff --check`.
- Revisión real de permisos y referencia, validación de archivo/checksum/formato y correspondencia musical; comandos documentales no prueban aceptación.
- Inspeccionar referencia existente con herramientas permitidas, sin usar el motor candidato como oráculo ni instalar/ejecutar analizadores. Probar iframe oficial con aserciones, sin extracción de medios.
- Sin evidencia suficiente: informe de bloqueo, sin resumen exitoso, sin checkbox completada y sin T03. Contactar terceros sigue expresamente no autorizado.

## Inputs

- `docs/validation/S06-material.md` — fuentes, hashes y derechos/correspondencia pendientes.
- `docs/validation/S06-protocol.md` — métricas, referencia, segmentación y herramientas propuestas.
- `.sdd/milestones/M001/slices/S06/tasks/T01-SUMMARY.md` — resultado documental, no aceptación de material.
- `.sdd/DECISIONS.md` — D014 y negativa a contacto externo.
- `.sdd/milestones/M001/slices/S06/S06-PLAN.md` — puerta previa al análisis y criterios integrados conservados.

## Expected Output

- `docs/validation/S06-reference.md` — registro de referencia/grabación/segmentos, evidencias y decisión explícita de puerta; sin audio, secretos o rutas personales.
- `docs/validation/S06-material.md` — aceptación acreditada o bloqueo real actualizado.
- `docs/validation/S06-protocol.md` — material/segmentos/políticas revisados; umbrales finales siguen requiriendo acuerdo tras piloto y antes de holdout.
