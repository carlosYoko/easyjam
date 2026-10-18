# Desarrollo, Git y calidad

**Estado:** base local de S01 y revisión técnica de material verificadas; riesgo intermitente de T01 aceptado explícitamente por el usuario (D010) tras el ensayo acotado 10/10 por variante. T02 está autorizada; T03–T04 no. ADR-001 y arquitectura musical siguen propuestos.

## Ciclo de trabajo

1. Consultar constitución, producto, ADR y contexto nativo de SDD disponible.
2. Confirmar requisitos, criterios observables y fallos antes de implementar.
3. Dejar a SDD Pi generar y gestionar milestone → slices → tareas. Una tarea debe caber en una ventana de contexto.
4. Implementar y verificar una capacidad vertical pequeña; mantener especificaciones, pruebas y código alineados.
5. Revisar resultados y UAT; reevaluar el roadmap con evidencia.

No crear manualmente `STATE.md`, base de datos, manifiestos, marcadores de ejecución ni un árbol `specs/` paralelo. No iniciar el motor hasta aprobar el alcance. Tras iniciarlo, SDD gestiona sus commits de tareas y milestones.

## Política Git

- Rama de integración `main`; remoto privado `https://github.com/carlosYoko/easyjam.git`. El trabajo de M001 vive en el worktree `.sdd/worktrees/M001`, rama `milestone/M001`; no hacer push sin autorización.
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
| Tiempo | Silencios, límites [inicio, fin), pausa, seek, fin y repetición de sección; cambios de tempo solo si la canción los requiere; anclas según modelo aprobado | Sin red, temporizadores controlados; no convierte A/B arbitrario en alcance |
| Adaptadores | Contrato de reproductor, errores de proveedor, carga/validación de arreglos, montaje y limpieza de listeners | Dobles tipados y pruebas de integración de fronteras |
| UI | Secciones, estados vacíos, teclado, foco visible, información no solo cromática | Vue Test Utils cuando haga falta; comprobación humana de legibilidad |
| E2E / Playwright | Abrir arreglo → reproducir → seguir ritmo → saltar → repetir → terminar; fallos recuperables | Recorrido determinista con reproductor falso |
| Integración real | YouTube visible + tablatura, play/pause/seek, buffering y errores en escritorio/móvil | Medidas reales de desviación; smoke separado, no dependencia de CI determinista |

Afinaciones adicionales (p. ej. Drop D) no se incorporan por preparar casos límite: deben rechazarse explícitamente hasta ampliar el alcance aprobado. Congelar la política de acordes slash/disminuidos/aumentados antes de escribir el conversor.

## Base ejecutable local de S01

Ejecutar desde el worktree `.sdd/worktrees/M001`, no desde la raíz de integración:

```bash
pnpm install --frozen-lockfile
pnpm run dev --host 127.0.0.1
pnpm run lint
pnpm run typecheck
pnpm run test --run
pnpm run build
```

Versiones exactas: Node.js 24.18.0 LTS (Krypton), pnpm 12.14.0,
Vue 3.5.44, Vite 8.3.4, TypeScript 6.0.3, plugin Vue 6.0.10,
Vitest 5.0.5, vue-tsc 3.3.13, ESLint 10.13.0, @eslint/js 10.0.1,
eslint-plugin-vue 10.11.1 y typescript-eslint 8.71.2.
`packageManager` fija pnpm y `pnpm-lock.yaml` fija la resolución.
TypeScript 7 no se seleccionó porque queda fuera del rango `<6.1.0`
aceptado por typescript-eslint 8.71.2. Node LTS se contrastó con el índice
de distribuciones oficial; versiones y peers, con el registro npm.

Los cuatro comandos de calidad existen y se verifican localmente. La instalación
congelada no modifica el lockfile. No hay CI remota, Router, Pinia, backend,
bibliotecas musicales ni renderer. Playwright está aprobado para S01, pero los
scripts `test:e2e`/`test:youtube` y sus suites corresponden a T04 y no existen aún.
La comprobación inicial en Chromium se realizó con las herramientas de navegador.

**Revisión y riesgo aceptado:** la consulta oficial de Made for Kids del
18-10-2026 resolvió `false` y confirmó `embeddable=true`. La clave local no entra
en Vite ni Git. Un primer recorrido terminó con error 5; la investigación acotada
posterior completó 10/10 ciclos en A y 10/10 en B sin reproducirlo. Se conserva como
incidente intermitente de causa desconocida, sin parche ni recuperación añadidos.
Véanse [material](validation/S01-material.md) e [informe del ensayo](validation/S01-youtube-controlled.md).
La instrumentación temporal se retiró. El usuario aceptó el riesgo y autorizó
solo T02 (D010); el cierre verificado de T01 consta en su resumen nativo. No declarar
corregido el incidente ni avanzar a T03 sin nueva autorización.

## CI propuesta para S01, no instalada ahora

Una sola cadena reproducible, con versión Node LTS compatible fijada y lockfile del gestor elegido: instalación congelada → lint → typecheck estricto → tests unitarios/integración → build → E2E crítico con reproductor falso. Proponer scripts `lint`, `typecheck`, `test` (no watch), `build` y `test:e2e`.

ESLint mantiene un único criterio de estilo, sin herramientas redundantes. La base de S01 y versiones fijadas arriba están autorizadas sin ratificar todo ADR-001. Se conserva `pnpm-lock.yaml`; los comandos locales reales se han incorporado a `verification_commands` del worktree. La ejecución de T01 fue autorizada por D009; D010 acepta el riesgo documentado tras verificarla y autoriza solo T02. T03–T04 no tienen autorización implícita.

CI sin secretos ni servicios de pago. Antes de conectar un proveedor CI, confirmar remoto/plataforma y presupuesto de minutos; no asumir gratuidad. Los checks locales serán los mismos que en CI. Los fallos deterministas bloquearán integración. Una comprobación externa de YouTube será independiente y no bloqueará por fallos de red ajenos.

## Preparación verificada el 18-10-2026

Se inspeccionó toda la raíz: `AGENTS.md`, ZIP de tres entradas y `.bg-shell/manifest.json` vacío (`[]`). No existía Git, `.sdd`, código ni configuración de aplicación. El ZIP no incluía contenido adicional de Spec Kit. No se creó ni eliminó un directorio `.specify`; se extrajo su única entrada directamente al destino canónico. Se revisaron diffs contra las tres fuentes del ZIP; se conservó el contenido funcional y se corrigieron solo flujo, rutas y la contradicción de aprobación del ADR. No se ejecutaron pruebas de aplicación porque no hay aplicación ni `package.json`.
