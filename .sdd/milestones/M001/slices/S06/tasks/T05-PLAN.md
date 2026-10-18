---
estimated_steps: 5
estimated_files: 3
skills_used:
  - test
---

# T05: Validar candidato notacional y alineación independiente

**Slice:** S06 — Fuente autorizada y análisis de calidad
**Milestone:** M001

## Description

Tras T04, criterios/material aprobados y autorización de unidad. Probar suficiencia y pérdidas de datos para futura partitura/TAB y su correspondencia con vídeo, no implementar renderer S07 o optimizador S09. Distinguir contenido detectado, derivado para arreglo y corregido/revisado.

## Steps

1. Revisar original real/calidad y definir mínimo candidato neutral versionado, unidades exactas/compases/métrica/duraciones/alturas/transposición/cuerdas-trastes provisionales solo si derivables, incertidumbre y secciones.
2. Escribir pruebas: suma de duración por compás, rest vs desconocido, eventos cruzando barra, alturas/quintas/rango, anclas monótonas/unidades/ocurrencias/grabación incompatible.
3. Producir candidato desde análisis real sin inventar rasgueos/rests ni copiar referencia como salida; marcar arreglos de prueba derivados, digitaciones provisionales sin afirmar optimización global. Datos insuficientes bloquean posibilidad notacional declarada.
4. Contrastar audio/vídeo de misma grabación con referencia audible/temporal independiente, no solo getCurrentTime; revisar inicio/medio/final/secciones y discrepancias, varias anclas si necesario, incertidumbre/error/criterios acordados. Vídeo oficial visible y política T01; no cambiar el ejemplo histórico ni extraer audio.
5. Documentar posibilidades y pérdidas para alphaTab S07; candidato válido no significa pentagrama/TAB/cursor/scroll renderizados. Falta de grabación/correspondencia o datos esenciales → bloqueo explícito.

## Must-Haves

- [ ] Modelo notacional candidato real coherente y trazable, sin rest/nota inventados o afirmación de renderer/global optimizer existentes.
- [ ] Referencia independiente y mapa compatible con grabación, anclas/errores/unidades medidos y limitaciones declaradas.
- [ ] No UI/SQLite/producto upload/capas extra ni adopción alphaTab por documentación.

## Verification

- `pnpm run test --run && pnpm run typecheck && pnpm run build`.
- Inspeccionar candidato de canción completa y contrastar con referencia/criterios; pruebas conocidas de compás/rango/unidades/mapa no sustituyen evidencia real.
- Verificar fuente/vídeo visibles/legítimos y contraste temporal independiente en entorno disponible; si no verificable, no declarar alineación demostrada.

## Observability Impact

- Signals added/changed: validación/campos desconocidos, revisión de candidato/anclas y error por segmento con incertidumbre.
- How a future agent inspects this: JSON local candidato/mapa y S06-notation-sync.
- Failure state exposed: duración/rango/units/recording incompatibles o capacidad notacional no demostrada.

## Inputs

- `src/application/analysis-evaluation.ts` — original real.
- `src/application/analysis-metrics.ts` — comparación/ref T04.
- `docs/validation/S06-quality.md` — evidencia y criterios aprobados.
- `docs/validation/S06-material.md` — grabación/permiso/referencia.
- `src/application/player-port.ts` — reproducción/tiempo existentes, no contrato nuevo.

## Expected Output

- `src/application/notation-candidate.ts` — validación/conversión mínima y anclas candidatas.
- `tests/unit/notation-candidate.test.ts` — invariantes/casos negativos.
- `docs/validation/S06-notation-sync.md` — evidencia real y límite renderer/global optimizer/URL única.
