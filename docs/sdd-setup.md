# Preparación de SDD Pi

**Versión comprobada:** 2.42.0 instalada globalmente. No se modificaron preferencias globales.

## Fuentes locales consultadas

El directorio `pkg/` es un shim y no contiene el README indicado por el contexto inicial del agente. Se consultaron íntegramente el README real en la raíz del paquete, `dist/resources/SDD-WORKFLOW.md`, la referencia instalada `~/.sdd/agent/extensions/sdd/docs/preferences-reference.md` y el prompt nativo `prompts/discuss.md`. Se contrastaron las discrepancias con el cargador `preferences.js`, el validador `preferences-validation.js` y el bootstrap `gitignore.js` instalados.

La documentación distribuida contiene descripciones históricas contradictorias (rama por slice/squash frente a worktree por milestone y almacenamiento externo). Para esta preparación prevalecen las opciones verificadas con el cargador y validador de 2.42.0; no se copiaron instrucciones destructivas de ejemplos.

## Preferencias aplicadas

Único archivo de proyecto: [`.sdd/PREFERENCES.md`](../.sdd/PREFERENCES.md), con YAML frontmatter `version: 1`.

| Preferencia | Valor | Compatibilidad |
|---|---|---|
| `git.isolation` | `worktree` | Soportada |
| `git.merge_strategy` | `merge` | Conserva commits individuales |
| `git.auto_push` | `false` | Soportada |
| `git.push_branches` | `false` | Soportada |
| `git.auto_pr` | `false` | Soportada |
| `git.pre_merge_check` | `true` | Soportada; comandos reales pendientes de S01 |
| `git.snapshots` | `false` | Soportada |
| `git.manage_gitignore` | `false` | Evita que el bootstrap ignore toda la documentación SDD |
| `parallel.enabled` | `false` | Sin ejecución paralela inicial |
| `git.commit_docs` | **No aplicada** | Retirada; el validador la descarta y avisa |

El nombre canónico actual es `preferences.md`; `PREFERENCES.md` es un fallback heredado reconocido por el cargador y el bootstrap. Se usa el solicitado por el usuario, sin duplicados (importante en sistemas sensibles a mayúsculas). No crear luego otro archivo con distinta capitalización sin una migración explícita.

### Documentación SDD y almacenamiento

2.42.0 favorece almacenamiento de estado externo y puede usar un enlace `.sdd`. Su código también conserva compatibilidad con proyectos que ya tienen archivos `.sdd` versionados: `hasGitTrackedSddFiles` evita añadir la exclusión global y protege esa modalidad. Aquí se versionan las preferencias antes de inicializar el flujo y se mantiene `.sdd` como directorio local. No se pretende reactivar el retirado `commit_docs`.

Solo se ignoran runtime, bases de datos, sesiones, worktrees, métricas, informes regenerables y credenciales del navegador. Requisitos, decisiones, contextos, roadmaps y planes que produzca SDD quedan elegibles para versionado. Verificar este comportamiento tras inicializar: si la herramienta propone migrar a almacenamiento externo o ignorar todo `.sdd`, detenerse y revisar la compatibilidad antes de aceptar; no forzar una migración ni inventar estado.

## Resultado de validación real

El parser y validador instalados aceptan el frontmatter del proyecto **sin errores ni avisos**. La carga efectiva confirma los ocho valores Git soportados indicados arriba y `parallel.enabled: false`. En Windows, el cargador informa la ruta canónica en minúsculas aunque el nombre versionado sea `PREFERENCES.md`.

La carga global sí produce avisos: el archivo preexistente `~/.sdd/preferences.md` contiene numerosos campos YAML vacíos (`null`), que el validador rechaza (por ejemplo `mode`, presupuesto y opciones Git/paralelas). No son credenciales ausentes ni errores del archivo de proyecto. Se conservaron intactas esas preferencias globales; sus valores válidos heredados incluyen `token_profile: quality` y `context_selection: smart`. Las opciones locales relevantes están verificadas y prevalecen. Limpiar los placeholders globales queda fuera del alcance autorizado.

## Punto de parada y siguiente acción

No se crearon `PROJECT.md`, `REQUIREMENTS.md`, `STATE.md`, milestones, IDs, roadmaps operativos, manifiestos ni decisiones aprobadas. [La propuesta de M001](mvp-proposal.md) es material de entrada, no estado del motor.

Dentro de la sesión SDD Pi, ejecutar:

```text
/sdd discuss
```

Si se abre desde una terminal nueva, iniciar primero `sdd` desde la raíz del repositorio. En la discusión solicitar: «Lee docs/ y prepara EasyJam Guitar Practice MVP a partir de docs/mvp-proposal.md. Solo discusión y propuesta: no ratifiques decisiones, no finalices la generación del milestone ni inicies ejecución sin mi aprobación».

La discusión nativa requiere reflexión, investigación, confirmación de profundidad, contrato de requisitos y vista previa del roadmap. Antes de escribir un milestone, SDD debe generar el ID con `sdd_milestone_generate_id`; M001 aquí es solo el nombre solicitado, no una reserva. La preferencia global de IDs no fue modificada.

**Precaución:** el prompt distribuido de discusión indica que finalizar la escritura puede arrancar auto automáticamente. No confirmar el cierre/escritura hasta revisar las propuestas y acordar explícitamente el modo de continuación. Esta preparación se detiene antes de ese punto y no invoca comandos de ejecución ni headless.
