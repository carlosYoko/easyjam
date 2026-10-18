# Requirements

This file is the explicit capability and coverage contract for the project.

Contrato confirmado por el usuario en la formalización manual de M001, 2026-10-18. Active no significa validado. La investigación documental no sustituye evidencia de ejecución.

## Active

### R001 — Reproducción oficial visible y guía mínima sobre reloj real
- Class: integration
- Status: active
- Description: El usuario reproduce y pausa un vídeo fijo permitido en el reproductor oficial visible y sigue una guía mínima basada en el tiempo observado del proveedor.
- Why it matters: Prueba pronto la dependencia externa que condiciona toda la experiencia.
- Source: user
- Primary owning slice: M001/S01
- Supporting slices: M001/S04, M001/S05
- Validation: mapped
- Notes: Sin catálogo ni entrada de URL. No acreditar reproducción con mocks.

### R002 — Medición de sincronía, saltos y retorno de sección
- Class: quality-attribute
- Status: active
- Description: Medir selección visual, recuperación tras seek y repetición con vídeo real; proponer umbrales cuantificables a partir de resultados y someterlos a aprobación antes de la integración completa.
- Why it matters: Una llamada de seek no acredita llegada exacta ni sincronía audible.
- Source: user
- Primary owning slice: M001/S01
- Supporting slices: M001/S04, M001/S05
- Validation: mapped
- Notes: No tolerancias arbitrarias. Registrar método, muestras, entorno, incertidumbre y límites; sin promesa de bucle continuo.

### R003 — Arreglo completo autorizado, estructurado y validado
- Class: core-capability
- Status: active
- Description: Abrir una canción completa con varias secciones, variedad armónica, dificultad fácil y eventos de ritmo/silencios válidos, con procedencia y derechos resueltos.
- Why it matters: Permite acompañar de principio a fin sin inventar partes faltantes.
- Source: user
- Primary owning slice: M001/S02
- Supporting slices: M001/S04, M001/S05
- Validation: mapped
- Notes: Material concreto pendiente. Si depende de riffs no representables coherentemente, documentar limitación y posponer incorporación.

### R004 — Conversión fiable a quintas y revisión de ambigüedades
- Class: core-capability
- Status: active
- Description: Convertir acordes compatibles a fundamental y quinta justa conservando tiempos y ritmo; señalar símbolos ambiguos sin conversión fiable para revisión.
- Why it matters: Simplifica sin presentar transformaciones arbitrarias como musicalmente correctas.
- Source: user
- Primary owning slice: M001/S03
- Supporting slices: M001/S04, M001/S05
- Validation: mapped
- Notes: C→C5 y Am→A5; no se conserva la tercera. Política concreta de símbolos pendiente.

### R005 — Posiciones válidas y optimización global determinista
- Class: differentiator
- Status: active
- Description: Seleccionar posiciones para toda la progresión en guitarra de seis cuerdas, E A D G B E, trastes 0–12, con quintas de dos notas como base y empates reproducibles.
- Why it matters: Evita desplazamientos innecesarios por decisiones aisladas.
- Source: user
- Primary owning slice: M001/S03
- Supporting slices: M001/S04, M001/S05
- Validation: mapped
- Notes: Alternativas justificadas por comodidad, con política y tests. Coste/algoritmo pendientes; mínimo matemático no equivale a comodidad universal.

### R006 — Práctica con tablatura, ritmo, silencios y navegación
- Class: primary-user-loop
- Status: active
- Description: Seguir qué tocar ahora y después, sección/compás/evento, con tablatura sencilla y saltos entre secciones ligados al tiempo real del vídeo.
- Why it matters: Mantiene el contexto durante toda la canción.
- Source: user
- Primary owning slice: M001/S04
- Supporting slices: M001/S01, M001/S02, M001/S03, M001/S05
- Validation: mapped
- Notes: No indicar rasgueo en silencios; no avanzar autónomamente durante pausa o buffering.

### R007 — Repetición de sección completa condicionada a viabilidad
- Class: continuity
- Status: active
- Description: Activar/desactivar repetición de una sección completa respetando pausa y saltos; verificar su utilidad real con YouTube.
- Why it matters: Permite practicar una parte sin perder contexto.
- Source: user
- Primary owning slice: M001/S04
- Supporting slices: M001/S01, M001/S05
- Validation: mapped
- Notes: S01 prueba viabilidad. No editor A/B ni garantía sin interrupciones. Si no es viable, pedir decisión de alcance; no eliminar silenciosamente ni declarar validado.

### R008 — Fallos visibles y recuperación sin perder el arreglo
- Class: failure-visibility
- Status: active
- Description: Mostrar fallos específicos de datos, carga, proveedor y sincronización, conservando el contexto válido y ofreciendo una salida útil.
- Why it matters: Evita guías ficticias o bloqueos sin explicación.
- Source: user
- Primary owning slice: M001/S04
- Supporting slices: M001/S01, M001/S02, M001/S05
- Validation: mapped
- Notes: Incluir bloqueo de reproducción programática, buffering, no insertable y error de identificación; limpiar recursos al desmontar.

### R009 — Recorrido completo real y evidencia de aceptación
- Class: launchability
- Status: active
- Description: Ejercitar abrir arreglo → reproducir → seguir → saltar → repetir según viabilidad aceptada → terminar, con canción completa y vídeo real permitido.
- Why it matters: Pruebas aisladas no demuestran el sistema ensamblado.
- Source: user
- Primary owning slice: M001/S05
- Supporting slices: M001/S01, M001/S02, M001/S03, M001/S04
- Validation: mapped
- Notes: S05 verifica y corrige defectos, sin nuevas funcionalidades significativas. No implica validación con usuarios.

### R010 — Calidad reproducible y pruebas independientes de YouTube en CI
- Class: operability
- Status: active
- Description: Contar con tipos estrictos, lint, tests unitarios/contratos y E2E deterministas, build y documentación de ejecución reproducibles.
- Why it matters: Detecta regresiones sin depender de una red externa en cada CI.
- Source: user
- Primary owning slice: M001/S01
- Supporting slices: M001/S02, M001/S03, M001/S04, M001/S05
- Validation: mapped
- Notes: No hay scripts ni package.json todavía. Instalarlos solo al ejecutar tarea autorizada. CI remota/proveedor no aprobados.

### R011 — Interfaz operable con teclado y lectura no solo cromática
- Class: quality-attribute
- Status: active
- Description: Controles con etiquetas, foco visible y teclado; estado/evento actual identificables sin depender exclusivamente de color.
- Why it matters: La guía debe ser legible y operable durante la práctica.
- Source: user
- Primary owning slice: M001/S04
- Supporting slices: M001/S01, M001/S05
- Validation: mapped
- Notes: S01 aplica lo pertinente a su guía mínima; S05 revalida el conjunto.

### R012 — Derechos, identificación, visibilidad y privacidad del proveedor
- Class: compliance/security
- Status: active
- Description: Documentar permisos, respetar identidad Referer, visibilidad/tamaño/controles y revisar avisos, aceptación de privacidad y tratamiento del vídeo antes de cargar el proveedor.
- Why it matters: Cumplimiento obligatorio incluso sin cuentas; insertar un vídeo no concede derechos sobre su arreglo.
- Source: research
- Primary owning slice: M001/S01
- Supporting slices: M001/S02, M001/S05
- Validation: mapped
- Notes: Concreción confirmada por el usuario tras investigación; política de YouTube III.A y III.E.4, RMF. No extraer audio ni tapar anuncios/controles. Made for Kids y posible verificación de metadatos requieren resolver el procedimiento sin asumir credenciales o backend. Revisión técnica no equivale a asesoría jurídica.

### R013 — Reglas musicales separadas del proveedor y de la presentación
- Class: constraint
- Status: active
- Description: Representar estructura musical y correspondencia al tiempo multimedia sin dependencias de API YouTube o UI en las reglas; usar límites pequeños y testeables.
- Why it matters: Permite evolución sin implementar ahora pistas/dificultades futuras.
- Source: user
- Primary owning slice: M001/S02
- Supporting slices: M001/S01, M001/S03, M001/S04
- Validation: mapped
- Notes: Modelo temporal definitivo abierto. Propuesta principal Vue/Vite/TypeScript, Vitest/Playwright; ADR-001 no ratificado globalmente. Sin sobreingeniería.

## Validated

Ninguno: no hay código ni pruebas de ejecución.

## Deferred

### R014 — Validación con usuarios y varias canciones/estilos
- Class: quality-attribute
- Status: deferred
- Description: Observar utilidad, comprensión y comodidad con varias canciones de estilos diferentes y usuarios del público objetivo.
- Why it matters: Una única canción no acredita utilidad general.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Después del MVP técnico; sin cantidades o porcentajes prefijados.

### R015 — Dificultades, riffs simplificados y afinaciones adicionales
- Class: core-capability
- Status: deferred
- Description: Ampliar arreglos alternativos por nivel, riffs y afinaciones cuando se justifique.
- Why it matters: Conserva la visión de acceso para más niveles y canciones.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: No generar solos/riffs ni soportar afinaciones extra en M001.

### R016 — Varias pistas instrumentales para tocar juntos
- Class: differentiator
- Status: deferred
- Description: Mostrar rítmica, solista y bajo sincronizados para varios intérpretes.
- Why it matters: Evolución hacia la experiencia compartida descrita por el usuario.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Sin milestone reservado; no implementar multitrack o varios dispositivos ahora.

### R017 — Generación asistida desde fuentes autorizadas
- Class: core-capability
- Status: deferred
- Description: Investigar generación de arreglos y revisión humana desde entradas autorizadas.
- Why it matters: Podría ampliar el repertorio sin preparación completamente manual.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Sujeto a viabilidad y derechos, no promesa para cualquier URL.

### R018 — Catálogo, entrada por URL y práctica avanzada
- Class: continuity
- Status: deferred
- Description: Añadir selección de repertorio, búsqueda por URL, A/B arbitrario, metrónomo y preferencias cuando haya necesidad.
- Why it matters: Amplía la práctica posterior sin inflar el recorrido inicial.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: No forman parte del MVP; repetición de sección completa sí pertenece a R007.

## Out of Scope

### R019 — Extracción no autorizada o generación desde cualquier URL
- Class: anti-feature
- Status: out-of-scope
- Description: No descargar/extraer audio sin autorización ni prometer generación automática desde URLs arbitrarias.
- Why it matters: Evita incumplimientos y promesas técnicas sin evidencia.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: Generación desde fuentes autorizadas se conserva en R017; no se excluye toda investigación futura.

### R020 — Cuentas, funciones sociales e infraestructura sin necesidad
- Class: anti-feature
- Status: out-of-scope
- Description: No introducir cuentas, backend, base de datos ni infraestructura no justificada en M001.
- Why it matters: Mantiene el alcance proporcional al recorrido de práctica.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: Restricción del MVP, no prohibición universal para versiones futuras.

## Traceability

| ID | Class | Status | Primary owner | Supporting | Proof |
|---|---|---|---|---|---|
| R001 | integration | active | M001/S01 | S04, S05 | mapped |
| R002 | quality-attribute | active | M001/S01 | S04, S05 | mapped |
| R003 | core-capability | active | M001/S02 | S04, S05 | mapped |
| R004 | core-capability | active | M001/S03 | S04, S05 | mapped |
| R005 | differentiator | active | M001/S03 | S04, S05 | mapped |
| R006 | primary-user-loop | active | M001/S04 | S01, S02, S03, S05 | mapped |
| R007 | continuity | active | M001/S04 | S01, S05 | mapped |
| R008 | failure-visibility | active | M001/S04 | S01, S02, S05 | mapped |
| R009 | launchability | active | M001/S05 | S01, S02, S03, S04 | mapped |
| R010 | operability | active | M001/S01 | S02, S03, S04, S05 | mapped |
| R011 | quality-attribute | active | M001/S04 | S01, S05 | mapped |
| R012 | compliance/security | active | M001/S01 | S02, S05 | mapped |
| R013 | constraint | active | M001/S02 | S01, S03, S04 | mapped |
| R014 | quality-attribute | deferred | none | none | unmapped |
| R015 | core-capability | deferred | none | none | unmapped |
| R016 | differentiator | deferred | none | none | unmapped |
| R017 | core-capability | deferred | none | none | unmapped |
| R018 | continuity | deferred | none | none | unmapped |
| R019 | anti-feature | out-of-scope | none | none | n/a |
| R020 | anti-feature | out-of-scope | none | none | n/a |

## Coverage Summary

- Active requirements: 13
- Mapped to slices: 13
- Validated: 0
- Unmapped active requirements: 0
