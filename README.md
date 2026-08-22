# Hier Auto Websites

Repositorio técnico de Hier Auto Websites: arquitectura, decisiones, código, templates, schemas, prompts, scripts, pruebas y deployment.

## Estado

El proyecto está en **validación técnica y preparación del piloto**.

El entregable inmediato es un flujo demostrable con un template reutilizable, un negocio ficticio de nails y un preview funcional, privado y verificable. Un segundo fixture ficticio de restaurante comprueba que la misma recipe, los mismos módulos y los mismos contratos pueden cambiar de vertical. La automatización completa no forma parte de esta fase.

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
src/modules/           Módulos registrados y reutilizables de la landing
src/renderer/          Registry, resolución determinista y renderer Astro
src/layouts/           Layout base compartido
src/themes/            Schema, registry y tokens visuales sin datos de negocio
sites/demo-nails/      Datos y configuración del negocio ficticio
sites/demo-restaurant/ Segundo fixture visual ficticio de la misma recipe
schemas/               Contratos de datos
prompts/               Prompts versionados y contratos de salida
scripts/               Automatización técnica acotada
skills/                Skills propias y versionadas del flujo de Hier
tests/                 Pruebas y gates de calidad
.github/workflows/     CI y deployment cuando estén aprobados
```

## Ejecución

El stack del piloto está aprobado en `ADR-002-technical-stack.md`. Los contratos, el renderer Astro y el slice vertical de cinco módulos ya son ejecutables. Los módulos permanecen en estado `candidate` hasta completar los gates de la etapa 4.

Requisitos: Node.js 24 LTS y pnpm 11.

```sh
pnpm install
pnpm exec playwright install chromium
pnpm dev
pnpm validate:demo
pnpm test
pnpm test:browser
pnpm typecheck
pnpm schemas:generate
pnpm build
pnpm preview
pnpm check
```

- `validate:demo` carga y valida `site.json`, `recipe.json`, `assets.json` y los archivos referenciados.
- `schemas:generate` deriva JSON Schema desde la fuente canónica Zod.
- `test:browser` verifica responsive, accesibilidad, interacción y snapshots de los módulos en certificación.
- `dev` sirve belleza en `/`, restaurante en `/restaurant/`, la matriz de themes en `/catalog/` y el laboratorio visual en `/lab/`.
- `validate:previews` valida ambos negocios ficticios y sus archivos locales.
- `build` valida los previews, genera el sitio estático y comprueba módulos, `noindex`, assets y presupuesto de JavaScript.
- `check` ejecuta tipos, diagnóstico Astro, pruebas, schemas y build completo.

## Documentos clave

- Alcance: [`docs/PRODUCT_SCOPE.md`](docs/PRODUCT_SCOPE.md)
- Arquitectura vigente: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- Roadmap: [`docs/ROADMAP.md`](docs/ROADMAP.md)
- Workstreams: [`docs/workstreams/`](docs/workstreams/)
- Propuesta técnica v1: [`docs/proposals/Hier_Arquitectura_Tecnica_v1.md`](docs/proposals/Hier_Arquitectura_Tecnica_v1.md)
