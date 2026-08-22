# Empieza aquí

## Qué es Hier Auto Websites

Hier Auto Websites es un sistema productizado para crear y operar landing pages de alta conversión para comercios locales mediante templates reutilizables y contenido asistido por IA.

La oferta base es una landing mobile-first de una sola página. El sistema no comienza como una agencia de desarrollo personalizado.

## Fase y objetivo actual

**Fase:** validación técnica y preparación del piloto.

**Objetivo inmediato:** demostrar un flujo completo y reproducible con:

- un template reutilizable;
- un negocio ficticio de nails;
- datos estructurados;
- un preview funcional, privado y con `noindex`;
- una ruta de QA verificable.

La automatización completa queda fuera de alcance hasta que el flujo manual asistido demuestre valor y eficiencia.

## Lectura obligatoria

Antes de trabajar:

1. `AGENTS.md`
2. `docs/START_HERE.md`
3. `docs/SOURCE_OF_TRUTH.md`
4. ADR relacionados en `docs/decisions/`
5. Documento de alcance o workstream correspondiente

Consultar `docs/proposals/` solo como material no aprobado.

## Estado de decisiones iniciales

- `ADR-001-template-first.md`: aceptado para la fase actual.
- `ADR-002-technical-stack.md`: pendiente; no autoriza un stack definitivo.
- `ADR-003-domain-ownership.md`: pendiente; no autoriza compras, transferencias ni administración de dominios.

## Mapa del repositorio

- `docs/`: contexto técnico, alcance, roadmap, decisiones, propuestas y workstreams.
- `src/`: componentes, layouts, temas y utilidades compartidas.
- `sites/demo-nails/`: negocio ficticio y configuración del primer preview.
- `schemas/`: contratos de datos y validación.
- `prompts/`: prompts versionados y sus contratos de salida.
- `scripts/`: automatización técnica acotada y repetible.
- `tests/`: pruebas del renderer, schemas y gates.
- `.github/workflows/`: integración continua y deployment, una vez aprobados.

## Criterio de éxito de esta fase

La fase queda demostrada cuando una persona puede partir del template y los datos de `demo-nails`, generar el preview, verificarlo y entender qué pasos siguen siendo manuales, sin depender de decisiones técnicas todavía pendientes.

## Fuente operativa externa

La unidad compartida de Google Drive es la fuente oficial para negocio, ventas, pricing, legal, finanzas, clientes, aprobaciones y assets:

<https://drive.google.com/drive/folders/1cXx82XX9CBrMf6S0wVVUjzwKyPWzszRM>
