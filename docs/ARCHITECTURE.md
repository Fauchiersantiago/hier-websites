# Arquitectura técnica vigente

## Estado

Este documento describe únicamente la arquitectura aprobada o necesaria para la
validación. El stack mínimo está aprobado en `ADR-002` y el sistema visual y de
referencias en `ADR-004`; las opciones adicionales de `docs/proposals/` permanecen
no aprobadas.

## Principios aceptados

### Template-first

La estructura, accesibilidad, responsive y comportamiento del sitio son deterministas y reutilizables. La IA puede asistir copy, paleta o alt text, pero sus resultados deben respetar schemas y revisión humana.

### Datos separados de la presentación

La información del negocio ficticio debe vivir en configuración estructurada. El template consume esa configuración sin incorporar datos de cliente directamente en componentes compartidos.

### Themes separados de la industria

Los módulos implementan funciones reutilizables. Los themes expresan atributos de
marca mediante tokens semánticos y no están reservados a una industria. El giro del
negocio puede sugerir un theme, pero no lo selecciona automáticamente.

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
- `src/lab/`: opciones permitidas y presets ficticios del compositor interno.
- `src/primitives/`: piezas de interfaz pequeñas compartidas por módulos.
- `src/lib/`: carga, validación y reglas cruzadas previas al render.
- `sites/demo-nails/`: configuración y contenido del negocio ficticio.
- `schemas/`: contratos de configuración y outputs asistidos por IA.
- `prompts/`: instrucciones versionadas para generación de contenido.
- `scripts/`: operaciones repetibles del flujo técnico.
- `tests/`: contratos, render y gates.

## Contratos implementados

- `site`, `recipe`, `module-manifest` y `asset-manifest` versionados en Zod. Cada imagen o video registra punto focal y zona segura de texto para conservar el encuadre entre módulos y viewports.
- JSON Schemas derivados automáticamente desde Zod.
- Validación del bundle, allowlist de módulos y estado de aprobación de assets.
- Registry de trece módulos; doce conservan 0 kB de JavaScript propio y el formulario demo mantiene un máximo de 5 kB.

La interfaz local del formulario demo y los gates de browser del slice de seis módulos
están implementados. Siguen pendientes los paquetes y la matriz aislada de los otros
siete módulos, Lighthouse CI, la certificación humana y los gates del preview
compartible.

## Slice vertical actual

La recipe `local-service-lead-gen-v1` resuelve diez slots, en orden:

1. `navigation-basic-v1`;
2. `hero-split-image-v1`;
3. `services-grid-v1`;
4. `gallery-editorial-v1`;
5. `reviews-highlight-v1`;
6. `faq-disclosure-v1`;
7. `location-hours-split-v1`;
8. `cta-banner-v1`;
9. `contact-form-demo-v1`;
10. `footer-basic-v1`.

Todos están en estado `candidate`. La ruta `/catalog/` permite inspeccionarlos desde el mismo bundle sin convertirla en una página oficial.

## Compositor interno de recetas

`/lab/` es una herramienta de validación interna para seleccionar un preset ficticio,
paleta, tipografía, asset aprobado y módulos permitidos. Actualiza un preview real y
exporta una configuración reproducible. No permite arrastrar bloques, editar HTML,
persistir clientes, publicar ni introducir module IDs fuera del registry; por tanto no
es el page builder libre rechazado por `ADR-002` ni un panel administrativo de producción.

La jerarquía es task-first: proyecto → identidad visual → asset → hero → servicios →
receta copiable. Las comparaciones extensas permanecen como referencia secundaria en
`/lab/type-color/` y `/lab/heroes/`.

## Sistema visual aprobado

`ADR-004` establece una capa de themes versionados. El catálogo deberá ofrecer una
matriz `módulo × theme × fixture × viewport` para certificar que la misma estructura
mantiene calidad, accesibilidad y responsive bajo direcciones visuales distintas.

Las familias iniciales `neutral-light-v1`, `refined-soft-v1`,
`editorial-sober-v1` y `modern-direct-v1` están implementadas como candidatas. Su
certificación continúa en la etapa 4.

Los tokens de color separan texto normal, superficies inversas y contenido sobre
fotografía. `mediaScrim` nunca se deriva de `ink`: las paletas oscuras pueden usar
texto claro sin convertir el overlay del hero en una capa clara. Contraste de texto
inverso y el baseline sólido del scrim se verifican automáticamente.

## Referencias externas

Una fuente externa se analiza fuera de `src/modules/`, se clasifica por derechos y se
reimplementa con el contrato Astro y los tokens de Hier. Ningún cloner o generador
puede escribir directamente en el registry. Ditto queda limitado a un spike técnico
aislado y autorizado según `ADR-004`.

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
