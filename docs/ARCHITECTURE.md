# Arquitectura técnica vigente

## Estado

Este documento describe únicamente la arquitectura aprobada o necesaria para la validación. El stack mínimo del piloto está aprobado en `docs/decisions/ADR-002-technical-stack.md`; las opciones adicionales de `docs/proposals/` permanecen no aprobadas.

## Principios aceptados

### Template-first

La estructura, accesibilidad, responsive y comportamiento del sitio son deterministas y reutilizables. La IA puede asistir copy, paleta o alt text, pero sus resultados deben respetar schemas y revisión humana.

### Datos separados de la presentación

La información del negocio ficticio debe vivir en configuración estructurada. El template consume esa configuración sin incorporar datos de cliente directamente en componentes compartidos.

### Alcance de una landing

El primer renderer produce una landing de una sola página. Rutas adicionales, sitios multi-página y plataformas multiempresa requieren una decisión posterior.

### Preview seguro

Todo preview debe:

- incluir `noindex`;
- indicar que es un concepto no oficial;
- evitar secretos y datos reales sensibles;
- usar assets ficticios, propios o explícitamente autorizados;
- mantener separado cualquier estado de producción.

## Flujo conceptual de la validación

```text
datos ficticios estructurados
          ↓
validación Zod y reglas cruzadas
          ↓
recipe → registry → props tipadas
          ↓
renderer Astro + módulos + theme
          ↓
salida estática con noindex
          ↓
QA automático + revisión humana
```

## Capas del repositorio

- `src/modules/`: implementaciones Astro referenciadas por un module ID estable.
- `src/renderer/module-definitions.ts`: allowlist, metadatos, compatibilidad y transformación determinista de datos a props.
- `src/renderer/site-renderer.astro`: único mapa `module-id → component` y ensamblado de la recipe.
- `src/layouts/base-layout.astro`: documento HTML, metadatos de preview y base accesible.
- `src/themes/`: tokens visuales sin datos de negocio.
- `src/primitives/`: piezas de interfaz pequeñas compartidas por módulos.
- `src/lib/`: carga, validación y reglas cruzadas previas al render.
- `sites/demo-nails/`: configuración y contenido del negocio ficticio.
- `schemas/`: contratos de configuración y outputs asistidos por IA.
- `prompts/`: instrucciones versionadas para generación de contenido.
- `scripts/`: operaciones repetibles del flujo técnico.
- `tests/`: contratos, render y gates.

## Contratos implementados

- `site`, `recipe`, `module-manifest` y `asset-manifest` versionados en Zod.
- JSON Schemas derivados automáticamente desde Zod.
- Validación del bundle, allowlist de módulos y estado de aprobación de assets.
- Registry inicial de cinco módulos con presupuesto de 0 kB de JavaScript cliente.

Siguen pendientes la interfaz del formulario demo, la certificación completa de módulos y los gates de browser del preview compartible.

## Slice vertical actual

La recipe `local-service-lead-gen-v1` resuelve, en orden:

1. `navigation-basic-v1`;
2. `hero-split-image-v1`;
3. `services-grid-v1`;
4. `cta-banner-v1`;
5. `footer-basic-v1`.

Todos están en estado `candidate`. La ruta `/catalog/` permite inspeccionarlos desde el mismo bundle sin convertirla en una página oficial.

## Stack aprobado para el piloto

- Astro 7 con build estático y TypeScript estricto.
- Tailwind CSS 4 con tokens CSS propios.
- Zod 4 como fuente canónica de schemas y JSON Schema derivado.
- Motion opcional por módulo; CSS/Tailwind como base de movimiento.
- Vitest, Playwright, axe-core y Lighthouse CI para los gates.
- Cloudflare Pages para el preview controlado, manteniendo `dist/` portable.

## Decisiones pendientes

- Formularios, antispam, almacenamiento y correo.
- Analítica.
- Booking y pagos.
- Dominio, DNS y ownership.

No introducir implementaciones dependientes de estas decisiones hasta aceptar el ADR correspondiente.
