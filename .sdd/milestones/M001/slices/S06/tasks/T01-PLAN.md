---
estimated_steps: 5
estimated_files: 2
skills_used: []
---

# T01: Investigar material y proponer protocolo de evaluación

**Slice:** S06 — Fuente autorizada y análisis de calidad
**Milestone:** M001

## Description

Unidad documental completada conforme a la separación aprobada por el usuario en D014 (2026-10-31). Entrega investigación verificable, candidato adquirido, limitaciones y protocolo propuesto; **no acredita material/referencia aceptados ni calidad musical**. La obtención y aprobación de referencia completa, correspondencia de grabación y compatibilidad/licencias finales se trasladan a T07, obligatoria antes de T03. La aceptación integrada de S06 no se rebaja. Sin terceros, instalaciones, código de producto ni analizador.

## Steps

1. Revisar D013/D014/OVERRIDES, producto y ADR-002; conservar la prueba histórica M7lc1UVf-VE sin atribuirle evidencia musical nueva.
2. Investigar canciones completas y referencias públicas; documentar derechos, acceso, incertidumbre y rechazos sin extraer YouTube, contactar terceros o contratar servicios.
3. Registrar archivo adquirido independiente, origen, checksum, formato y decodificación local; separar reproducción oficial comprobada de correspondencia musical aún no verificada. Conservar audio y rutas personales fuera del repositorio.
4. Proponer herramientas mínimas con sus huecos de versión/licencia/compatibilidad, inventario local, métricas por dimensión, reproducibilidad y política de calibración/holdout; no inventar tiempos, umbrales ni límites de rendimiento.
5. Presentar hallazgos y protocolo; registrar la separación aprobada y trasladar puertas pendientes a T07. Cerrar únicamente este alcance documental, sin iniciar otra tarea automáticamente.

## Must-Haves

- [x] Investigación de fuentes/referencias y limitaciones documentada; ningún candidato declarado aceptado sin evidencia.
- [x] Archivo independiente/checksum/decodificación y diagnóstico de iframe acreditados, separados de URL única y alineación pendientes.
- [x] Protocolo propuesto distingue armonía/tiempo/compás/rests/secciones/alineación y notación, con referencia independiente y calibración/holdout por concretar en T07.
- [x] Sin implementación de producto, dependencias nuevas, DB, renderer musical ni ejecución de analizador; comprobaciones diagnósticas locales únicamente.
- [x] D014 y T07 conservan obligatoriamente la puerta de material/referencia antes de T03; no se validan requisitos musicales por cerrar T01.

## Verification

- Desde worktree: `node --input-type=module -e "import fs from 'node:fs'; for (const p of ['docs/validation/S06-material.md','docs/validation/S06-protocol.md']) if (!fs.statSync(p).size) process.exit(1)"` y `git diff --check`.
- Comprobar también whitespace/contenido de documentos nuevos aún no seguidos; git diff por sí solo no los inspecciona.
- Revisar procedencia y límites contra evidencia real: hashes locales, Windows MediaEnded, metadatos y observación del iframe. No deducir correspondencia musical de duración/título.
- Confirmar cambios documentales únicamente; sin audio, secretos, .gitignore, código o dependencias. Pruebas funcionales no aplican al cierre documental.

## Inputs

- `docs/product.md` — experiencia y URL única.
- `docs/adr/ADR-002.md` — dirección aprobada.
- `.sdd/DECISIONS.md` — D013 y separación explícita D014.
- `.sdd/OVERRIDES.md` — suspensión histórica y gate manual.
- `.sdd/milestones/M001/slices/S06/S06-PLAN.md` — alcance y puertas de slice.

## Expected Output

- `docs/validation/S06-material.md` — fuentes, evidencia, permisos y límites; material aún no aceptado.
- `docs/validation/S06-protocol.md` — propuesta de evaluación/candidatos/recursos y puerta obligatoria T07 antes del análisis.
