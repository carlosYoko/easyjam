# Desarrollo, Git y calidad

**Estado:** T01 (01c0c7d) y T02 (1b4690d) implementadas/verificadas en `.sdd/worktrees/M001`, con reproductor oficial y guía ficticia, 65 tests y checks locales. No integradas en main. D013 aprueba producto, Vue3/TS/backend local mínimo/SQLite, dirección ADR-002 y S06–S11. Esquema de siete tablas no obligatorio, mínimo suficiente con KISS/SOLID/YAGNI. Solo formalización/planificación S06; plan T01–T06 pendiente de revisión antes de código. T03/T04 suspendidas y fuera de cola, sin auto/cierre/merge/push.

## Ubicación y verificaciones existentes

La aplicación está en el worktree `.sdd/worktrees/M001`, rama `milestone/M001`, no en la raíz main. Desde ese directorio existen `pnpm install --frozen-lockfile`, `pnpm run dev --host 127.0.0.1`, `pnpm run lint`, `pnpm run typecheck`, `pnpm run test --run` y `pnpm run build`. Node 24.18.0/pnpm 12.14.0 y lockfile fijados. Verificado durante T01/T02; una edición documental no acredita nuevas pruebas funcionales.

Aún no existen comandos de backend, DB/migraciones, analizador o tablatura real. No ejecutarlos ni inventarlos en esta propuesta. SQLite de canciones no es `.sdd/sdd.db`. La evidencia técnica está en `docs/validation/` **del worktree**. Error 5 intermitente aceptado en D010, no corregido. Práctica final requiere arreglo real persistido, no fixture.

Con planes/unidades autorizados, los nuevos checks previstos son: pentagrama+TAB coherentes con arreglo, compases/duraciones/rests/ligaduras/transposición/cuerdas/trastes, cursor/scroll alphaTab con pausa/buffering/seek y anclas corregidas/reabiertas; cerrar navegador durante análisis sin cancelarlo; SQLite en fichero/proceso nuevo, deduplicación concurrente, claim/checkpoint/fencing/rollback/crash/retry y contador de analizador sin incremento al practicar/regenerar. Calidad/multipaso con baseline y referencia legítima, sin deadline ligado arbitrariamente a duración. La matriz está en [mvp-proposal.md](mvp-proposal.md); no acredita tests aún pendientes.

## Ciclo de trabajo

1. Consultar constitución, producto, ADR y contexto nativo de SDD disponible.
2. Confirmar requisitos, criterios observables y fallos antes de implementar.
3. Dejar a SDD Pi generar y gestionar milestone → slices → tareas. Una tarea debe caber en una ventana de contexto.
4. Implementar y verificar una capacidad vertical pequeña; mantener especificaciones, pruebas y código alineados.
5. Revisar resultados y UAT; reevaluar el roadmap con evidencia.

No crear manualmente `STATE.md`, base de datos, manifiestos, marcadores de ejecución ni un árbol `specs/` paralelo. No iniciar el motor hasta aprobar el alcance. Tras iniciarlo, SDD gestiona sus commits de tareas y milestones.

## Continuación manual aprobada D013

- Plan detallado: `.sdd/milestones/M001/slices/S06/S06-PLAN.md` y `tasks/T01–T06-PLAN.md`; revisar antes de ejecutar.
- Primera unidad: S06/T01 material/referencia/protocolo documental, sin código ni instalación. Archivo independiente autorizado permitido para prueba, no aceptación URL única.
- Tras autorizar explícitamente solo esa unidad, desde sesión SDD del worktree `.sdd/worktrees/M001`, usar `/sdd dispatch execute`. El comando deriva unidad activa: debe mostrar M001/S06/T01. No acepta un ID arbitrario, por eso se verifican root y worktree; si selecciona otra unidad, detener.
- La fase nativa `executing` significa que existe un plan con tarea pendiente; NO acredita ejecución iniciada ni concede autorización. El gate humano del plan sigue vigente.
- `/sdd dispatch execute` crea sesión de una unidad, no inicia bucle auto. No usar `/sdd auto` ni `/sdd next` como sustitución sin revisar comportamiento de versión. Antes de cada siguiente tarea o slice, revisión y nueva autorización.
- Revisión de alcance mediante appendOverride, mecanismo nativo de `/sdd steer`, con reescritura de documentos. `reassess` exige slice completa; no se simula cierre para usarlo. Historial en M001-ROADMAP-HISTORY.md/S01-REPLAN.md; T01/T02 preservadas, T03/T04 suspendidas/no ejecutadas.
- S06 aún no tiene script evaluate:s06 ni analizador: comandos futuros etiquetados en planes, no disponibles por esta formalización.

## Política Git

- Integración `main`, remoto privado `https://github.com/carlosYoko/easyjam.git`; M001 en `.sdd/worktrees/M001`. No push/merge sin autorización explícita.
- Conventional Commits en inglés: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `perf`. Ejemplo futuro: `test(M001/S03): cover globally optimal fingering paths` (usar el ID real generado).
- Un commit por cambio lógico verificable. Separar funcionalidades independientes y refactorizaciones sin relación. No commits vacíos.
- Revisar `git status`, diff de trabajo y diff staged; añadir rutas explícitas, nunca `git add .` indiscriminadamente.
- Antes del commit: comprobar secretos, archivos ajenos, whitespace y verificaciones aplicables. Los dobles espacios finales de Markdown son saltos de línea deliberados; `.gitattributes` los admite.
- No `reset --hard`, force push, rebase destructivo ni borrados sin autorización. No push automático. Recuperar mediante commits correctivos o revert revisado.
- `push.default=nothing` es una barrera local para el push implícito, no una prohibición técnica de comandos explícitos.
- Worktree por milestone y merge preservando commits individuales. Sin snapshots ni ejecución paralela inicial.
- ZIP original y temporales se conservan localmente sin versionar; documentos canónicos sí se versionan. Credenciales mediante secure_env_collect y archivos ignorados; nunca en navegador, logs, artefactos o commits. No asumir ausencia de configuración: la revisión técnica de YouTube usó configuración segura en el worktree.

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

## Base técnica preservada de T01/T02

Implementada en el worktree, no integrada en main. Versiones fijadas: Node 24.18.0 LTS Krypton, pnpm 12.14.0, Vue 3.5.44, Vite 8.3.4, TypeScript 6.0.3, plugin Vue 6.0.10, Vitest 5.0.5, vue-tsc 3.3.13, ESLint 10.13.0, @eslint/js 10.0.1, eslint-plugin-vue 10.11.1 y typescript-eslint 8.71.2. `packageManager`/lockfile fijan resolución. TS7 excedía el rango `<6.1.0` del tooling, por eso se descartó. Instalación congelada sin cambio de lockfile. `verification_commands` reales existen en preferencias del worktree; no duplicar PREFERENCES.md ni sobreescribir esa configuración con la raíz.

Revisión oficial de material del 18-10-2026: `madeForKids=false`, `embeddable=true`, clave fuera de Vite/Git; no licencia de transcripción. Primer recorrido terminó en error 5; investigación posterior 10/10 ciclos A y 10/10 B sin reproducirlo, causa desconocida/riesgo aceptado D010. Instrumentación temporal retirada. Evidencia original preservada en `docs/validation/S01-material.md` y `S01-youtube-controlled.md` **del worktree**. D013 no convierte ausencia posterior de error en reparación.

T02 usa `selectGuideFrame()` y fixture rotulada, actual/siguiente, silencios, huecos y fin de secuencia. Referencias compás/pulso/duración separadas de `sourceTiming`; no transcripción ni esquema musical definitivo. Sin reloj UI acumulativo. Saltos solo con observación playing/paused: cued/idle requiere reproducir/pausar primero, destino solicitado no confirma llegada, pausa mantiene intención y buffering/error deshabilitan navegación. La fixture termina a 36s, no el vídeo; repetición no implementada. 65 tests históricos (59 guía + 6 contrato), lint/tipos/build y evidencia real en `docs/validation/S01-guide.md` del worktree. Esta formalización no repite ni amplía esas pruebas.

## CI remota no instalada; cadena local existente

Los scripts locales descritos arriba ya existen. E2E integrado y smoke real separado están pendientes; no presentar `test:e2e` como comando disponible. No se autoriza CI externa ni instalar herramientas en la revisión documental.

La base S01 ya fijó versiones y pnpm-lock.yaml; la revisión no reinstala ni cambia dependencias. No editar `verification_commands` ni preferencias de ejecución para promover el roadmap candidato. Los checks nuevos se definirán con los planes aprobados.

CI futura sin secretos ni servicios de pago no acordados. Antes de conectarla, confirmar plataforma y presupuesto; no asumir gratuidad. Checks deterministas y evidencia externa deben distinguirse: un fallo de red no prueba defecto musical ni una fixture acredita viabilidad de YouTube.

## Registro histórico de preparación inicial (anterior a T01/T02)

Se inspeccionó toda la raíz: `AGENTS.md`, ZIP de tres entradas y `.bg-shell/manifest.json` vacío (`[]`). No existía Git, `.sdd`, código ni configuración de aplicación. El ZIP no incluía contenido adicional de Spec Kit. No se creó ni eliminó un directorio `.specify`; se extrajo su única entrada directamente al destino canónico. Se revisaron diffs contra las tres fuentes del ZIP; se conservó el contenido funcional y se corrigieron solo flujo, rutas y la contradicción de aprobación del ADR. No se ejecutaron pruebas de aplicación porque no hay aplicación ni `package.json`.
