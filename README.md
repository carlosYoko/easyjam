# EasyJam

Aplicación de práctica de guitarra para tocar canciones completas con arreglos rítmicos simplificados, posiciones cómodas y guía sincronizada.

**Estado actual:** preparación documental y de repositorio. No hay aplicación, dependencias instaladas ni funcionalidades implementadas. Producto y arquitectura siguen pendientes de ratificación.

## Documentación

- [Constitución propuesta](docs/constitution.md)
- [Producto y alcance propuesto](docs/product.md)
- [ADR-001: arquitectura propuesta](docs/adr/ADR-001.md)
- [MVP y roadmap candidato](docs/mvp-proposal.md)
- [Desarrollo, Git, testing y CI](docs/development.md)
- [SDD Pi: configuración comprobada y continuación](docs/sdd-setup.md)
- [Instrucciones para agentes](AGENTS.md)

## Base propuesta

Vue 3, Vite, TypeScript estricto y Composition API. Frontend modular con dominio musical independiente y adaptadores en fronteras externas. Sin backend inicial. Tonal.js y alphaTab requieren evaluación; no son elecciones aprobadas.

## Continuar con SDD Pi

Desde la raíz, abrir `sdd` si no hay sesión activa; dentro de SDD Pi:

```text
/sdd discuss
```

Usar `docs/mvp-proposal.md` como entrada, revisar decisiones pendientes y mantener la sesión en discusión. **No confirmar el cierre/escritura del milestone hasta acordar explícitamente las aprobaciones y cómo evitar el autoarranque indicado por el prompt instalado.** No ejecutar `/sdd auto` durante esta preparación.

Solo SDD Pi generará requisitos, contexto, ID y roadmap operativo tras las confirmaciones nativas. No se ha creado estado de ejecución ni reservado M001.

## Seguridad y procedencia

No se configuró remoto ni se hizo push. No se requieren secretos ni `.env.example` todavía. El ZIP original permanece intacto en la raíz, excluido de Git; sus tres documentos están conservados en los destinos canónicos anteriores, con correcciones de rutas/flujo y sin ratificación implícita. No se eliminó trabajo previo.
