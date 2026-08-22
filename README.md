# Hier Auto Websites

Repositorio técnico de Hier Auto Websites: arquitectura, decisiones, código, templates, schemas, prompts, scripts, pruebas y deployment.

## Estado

El proyecto está en **validación técnica y preparación del piloto**.

El entregable inmediato es un flujo demostrable con un template reutilizable, un negocio ficticio de nails y un preview funcional, privado y verificable. La automatización completa no forma parte de esta fase.

## Antes de trabajar

Leer, en este orden:

1. [`AGENTS.md`](AGENTS.md)
2. [`docs/START_HERE.md`](docs/START_HERE.md)
3. [`docs/SOURCE_OF_TRUTH.md`](docs/SOURCE_OF_TRUTH.md)
4. ADR relacionados en [`docs/decisions/`](docs/decisions/)

Las ideas en [`docs/proposals/`](docs/proposals/) no están aprobadas.

## Fuentes oficiales

- Google Drive: negocio, ventas, pricing, legal, finanzas, clientes, aprobaciones y assets.
- Este repositorio: decisiones y activos técnicos.

Consulta la matriz completa en [`docs/SOURCE_OF_TRUTH.md`](docs/SOURCE_OF_TRUTH.md).

## Estructura

```text
docs/                  Documentación, ADR, propuestas y workstreams
src/                   Componentes, layouts, themes y utilidades compartidas
sites/demo-nails/      Datos y configuración del negocio ficticio
schemas/               Contratos de datos
prompts/               Prompts versionados y contratos de salida
scripts/               Automatización técnica acotada
tests/                 Pruebas y gates de calidad
.github/workflows/     CI y deployment cuando estén aprobados
```

## Ejecución

El stack del piloto está aprobado en `ADR-002-technical-stack.md`. Todavía no existe una aplicación ejecutable; los comandos de instalación, desarrollo, pruebas y build se añadirán al crear el scaffold reproducible.

## Documentos clave

- Alcance: [`docs/PRODUCT_SCOPE.md`](docs/PRODUCT_SCOPE.md)
- Arquitectura vigente: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- Roadmap: [`docs/ROADMAP.md`](docs/ROADMAP.md)
- Workstreams: [`docs/workstreams/`](docs/workstreams/)
- Propuesta técnica v1: [`docs/proposals/Hier_Arquitectura_Tecnica_v1.md`](docs/proposals/Hier_Arquitectura_Tecnica_v1.md)
