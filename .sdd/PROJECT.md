# Project

## What This Is

EasyJam es un proyecto de aplicación web para acompañar canciones completas con guitarra rítmica simplificada, cómoda y sincronizada con YouTube. Actualmente solo existe documentación y planificación; no hay aplicación ni despliegue.

## Core Value

«No necesitas tocar una canción exactamente como el artista original para disfrutar tocándola de principio a fin».

## Current State

Alcance y estructura S01–S05 aprobados. Investigación documental realizada; ninguna prueba de reproducción real ejecutada. M001 se formaliza en modo manual. Ninguna tarea ejecutada ni capacidad validada. La primera tarea de S01 requiere autorización explícita del usuario; no iniciar auto ni avanzar a S02. Material autorizado concreto pendiente.

## Architecture / Key Patterns

Propuesta principal: Vue 3 + Vite + TypeScript estricto, Vitest y Playwright; arquitectura modular, Clean Architecture ligera y puertos/adaptadores solo donde aporten valor. No hay implementación que establezca estos patrones todavía. ADR-001 y constitución no ratificados globalmente. Renderizador, bibliotecas musicales, representación temporal y optimizador siguen abiertos.

Una canción, dificultad fácil, guitarra de seis cuerdas, E A D G B E, trastes 0–12 y quintas de dos notas como base. Sin catálogo, campo URL, backend, cuentas o infraestructura anticipada. Derechos y políticas son condición obligatoria.

## Capability Contract

See `.sdd/REQUIREMENTS.md` for the explicit capability contract, requirement status, and coverage mapping.

## Milestone Sequence

- [ ] M001: EasyJam Guitar Practice MVP — Practicar una canción completa con quintas, posiciones optimizadas y guía sincronizada con un vídeo real permitido.

Las capacidades futuras se conservan como Deferred en REQUIREMENTS.md; no hay otros milestones reservados.
