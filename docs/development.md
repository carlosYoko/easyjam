# Desarrollo, Git y calidad

**Estado:** convenciones de preparación autorizadas; herramientas y alcance de producto aún propuestos.

## Ciclo de trabajo

1. Consultar constitución, producto, ADR y contexto nativo de SDD disponible.
2. Confirmar requisitos, criterios observables y fallos antes de implementar.
3. Dejar a SDD Pi generar y gestionar milestone → slices → tareas. Una tarea debe caber en una ventana de contexto.
4. Implementar y verificar una capacidad vertical pequeña; mantener especificaciones, pruebas y código alineados.
5. Revisar resultados y UAT; reevaluar el roadmap con evidencia.

No crear manualmente `STATE.md`, base de datos, manifiestos, marcadores de ejecución ni un árbol `specs/` paralelo. No iniciar el motor hasta aprobar el alcance. Tras iniciarlo, SDD gestiona sus commits de tareas y milestones.

## Política Git

- Rama inicial `main`, sin remoto configurado durante esta preparación.
- Conventional Commits en inglés: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `perf`. Ejemplo futuro: `test(M001/S03): cover globally optimal fingering paths` (usar el ID real generado).
- Un commit por cambio lógico verificable. Separar funcionalidades independientes y refactorizaciones sin relación. No commits vacíos.
- Revisar `git status`, diff de trabajo y diff staged; añadir rutas explícitas, nunca `git add .` indiscriminadamente.
- Antes del commit: comprobar secretos, archivos ajenos, whitespace y verificaciones aplicables. Los dobles espacios finales de Markdown son saltos de línea deliberados; `.gitattributes` los admite.
- No `reset --hard`, force push, rebase destructivo ni borrados sin autorización. No push automático. Recuperar mediante commits correctivos o revert revisado.
- `push.default=nothing` es una barrera local para el push implícito, no una prohibición técnica de comandos explícitos.
- Worktree por milestone y merge preservando commits individuales. Sin snapshots ni ejecución paralela inicial.
- ZIP original y temporales se conservan localmente sin versionar; los documentos canónicos sí se versionan. No hay `.env.example` porque no existe una necesidad de configuración/secretos de aplicación.

## Estrategia de calidad propuesta

| Nivel | Prueba | Evidencia esperada |
|---|---|---|
| Dominio / Vitest | C→C5, Am→A5, símbolos ambiguos, afinación estándar, alternativas G5/D5, límites de trastes y cuerdas, eventos imposibles | Resultados musicales explícitos, errores tipados y regresiones |
| Optimización | Comparar con enumeración exhaustiva en progresiones pequeñas; caso donde greedy pierde; empates estables | Mínimo global para el coste declarado, no una promesa universal de comodidad |
| Invariantes | Posiciones válidas, solo fundamental/quinta, tiempos conservados, determinismo, conversión ticks↔segundos | Casos generados deterministas; añadir librería de propiedades solo si aporta valor |
| Tiempo | Silencios, límites [inicio, fin), cambios de tempo, anclas, pausa, seek, fin, bucles y reloj simulado | Sin red, temporizadores controlados, sin deriva acumulada |
| Adaptadores | Contrato de reproductor, errores de proveedor, carga/validación de arreglos, montaje y limpieza de listeners | Dobles tipados y pruebas de integración de fronteras |
| UI | Secciones, estados vacíos, teclado, foco visible, información no solo cromática | Vue Test Utils cuando haga falta; comprobación humana de legibilidad |
| E2E / Playwright | Abrir arreglo → reproducir → seguir ritmo → saltar → repetir → terminar; fallos recuperables | Recorrido determinista con reproductor falso |
| Integración real | YouTube visible + tablatura, play/pause/seek, buffering y errores en escritorio/móvil | Medidas reales de desviación; smoke separado, no dependencia de CI determinista |

Afinaciones adicionales (p. ej. Drop D) no se incorporan por preparar casos límite: deben rechazarse explícitamente hasta ampliar el alcance aprobado. Congelar la política de acordes slash/disminuidos/aumentados antes de escribir el conversor.

## CI propuesta para S01, no instalada ahora

Una sola cadena reproducible, con versión Node LTS compatible fijada y lockfile del gestor elegido: instalación congelada → lint → typecheck estricto → tests unitarios/integración → build → E2E crítico con reproductor falso. Proponer scripts `lint`, `typecheck`, `test` (no watch), `build` y `test:e2e`.

ESLint y un único criterio de formateo consistente, sin herramientas redundantes. Elegir versiones y gestor en S01 tras aprobar ADR-001. Añadir entonces comandos reales a `verification_commands` de SDD; `pre_merge_check: true` por sí solo no demuestra que se hayan ejecutado tests inexistentes.

CI sin secretos ni servicios de pago. Antes de conectar un proveedor CI, confirmar remoto/plataforma y presupuesto de minutos; no asumir gratuidad. Los checks locales serán los mismos que en CI. Los fallos deterministas bloquearán integración. Una comprobación externa de YouTube será independiente y no bloqueará por fallos de red ajenos.

## Preparación verificada el 18-10-2026

Se inspeccionó toda la raíz: `AGENTS.md`, ZIP de tres entradas y `.bg-shell/manifest.json` vacío (`[]`). No existía Git, `.sdd`, código ni configuración de aplicación. El ZIP no incluía contenido adicional de Spec Kit. No se creó ni eliminó un directorio `.specify`; se extrajo su única entrada directamente al destino canónico. Se revisaron diffs contra las tres fuentes del ZIP; se conservó el contenido funcional y se corrigieron solo flujo, rutas y la contradicción de aprobación del ADR. No se ejecutaron pruebas de aplicación porque no hay aplicación ni `package.json`.
