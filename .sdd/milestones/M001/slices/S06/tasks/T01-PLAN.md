---
estimated_steps: 5
estimated_files: 2
skills_used: []
---

# T01: Asegurar material autorizado y protocolo de evaluación

**Slice:** S06 — Fuente autorizada y análisis de calidad
**Milestone:** M001

## Description

Primera unidad pendiente de revisión/autorización D013. Solo material/referencia/protocolo, sin código, instalaciones o ejecución de analizador. Puede emplear archivo independiente permitido sin acreditar URL única. Buscar y verificar lo accesible antes de pedir al usuario una decisión que el agente no pueda resolver.

## Steps

1. Revisar D013/OVERRIDES, producto/ADR-002 y S06. Mantener la prueba histórica M7lc1UVf-VE separada del nuevo material musical, sin suplantar evidencia.
2. Localizar canción completa/archivo independiente y referencia legítimos, permiso de análisis/derivados/retención y correspondencia con grabación YouTube. No extraer YouTube, contactar terceros o contratar servicios. Si no existe evidencia suficiente, parar bloqueado.
3. Documentar fuente/autor/licencia/alcance, checksum y disponibilidad; conservar audio/rutas personales solo localmente según permiso. Referencia no derivada del mismo motor, incertidumbre y zonas a revisar.
4. Revisar candidatos maduros/versiones/licencias/Windows/hardware, elegir propuesta mínima para T03, definir métricas por dimensión y segmentación calibración/evaluación, reproducibilidad y recursos razonables sin deadline ligado a canción.
5. Proponer criterios y revisión: después de piloto T03/T04 acordar umbrales antes del veredicto/holdout T05/T06. Presentar protocolo/material para aprobación; no proceder automáticamente.

## Must-Haves

- [ ] Fuente/referencia completas con permisos/correspondencia acreditados o bloqueo real comunicado; sin éxito si falta material.
- [ ] Ruta de archivo de prueba distinguida de URL única pendiente, sin nueva UI de subida.
- [ ] Protocolo reproduce evaluación y diagnóstico, distingue armonía/tiempo/compás/rests/secciones/alineación y notación, con referencia independiente.
- [ ] Ningún código/dependencia/DB/renderer/analizador ejecutado.

## Verification

- Desde worktree: `node --input-type=module -e "import fs from 'node:fs'; for (const p of ['docs/validation/S06-material.md','docs/validation/S06-protocol.md']) if (!fs.statSync(p).size) process.exit(1)"` y `git diff --check`.
- Revisar realmente permiso, acceso y edición; existencia de MD no prueba procedencia. Si esos checks fallan, no completar tarea.
- Confirmar diff limitado a documentación, sin audio/secretos/.gitignore/dependencias. No tests funcionales nuevos por esta unidad documental.

## Inputs

- `docs/product.md` — experiencia/URL única.
- `docs/adr/ADR-002.md` — dirección aceptada, detalle mínimo.
- `.sdd/DECISIONS.md` — D013 autoriza solo planificación actual.
- `.sdd/OVERRIDES.md` — suspensión y gate manual.
- `.sdd/milestones/M001/slices/S06/S06-PLAN.md` — objetivos/criterios/pruebas.

## Expected Output

- `docs/validation/S06-material.md` — fuente/permiso/grabación/referencia verificables y limitación URL.
- `docs/validation/S06-protocol.md` — método/candidatos/recursos/métricas/calibración/evaluación y puerta de criterios.
