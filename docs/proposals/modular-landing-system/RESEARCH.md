# Investigación: sistema modular de landings listas en un día

- **Estado:** Proposed
- **Fecha de corte:** 2026-08-22
- **Audiencia:** técnica y producto
- **Decisiones relacionadas:** `ADR-001` Accepted; `ADR-002` Pending; `ADR-003` Pending

> Este documento no aprueba un stack ni autoriza instalaciones. Su función es
> convertir la investigación en una opción concreta que pueda evaluarse para
> `ADR-002`.

## Resumen técnico

La dirección recomendada es construir un **compilador restringido de landing
pages**, no un page builder abierto. El operador selecciona una receta y módulos
certificados; introduce contenido estructurado; el sistema valida los contratos,
renderiza una página estática y ejecuta gates de QA. La IA puede proponer copy,
clasificaciones y combinaciones, pero no puede generar componentes arbitrarios ni
saltar el registro.

La biblioteca grande debe ser un resultado acumulativo, no el punto de partida.
Para validar el modelo conviene comenzar con una receta de servicios locales, entre
12 y 15 módulos certificados y el negocio ficticio `demo-nails`. Cada módulo debe
incluir schema, fixture, procedencia, licencia y pruebas. Sólo después de demostrar
una entrega reproducible en una jornada se amplía el catálogo.

La mejor candidata para someter a aprobación en `ADR-002` es una salida estática con
Astro, TypeScript estricto y Tailwind CSS v4, con el mínimo JavaScript posible.
Astro está orientado a sitios de contenido, permite componentes `.astro`, genera
HTML estático y ofrece colecciones con schema y validación. Tailwind v4 compila las
clases usadas a CSS estático y no agrega runtime. Ninguna de estas herramientas se
instala hasta aceptar el ADR. [Astro](https://github.com/withastro/astro),
[content collections](https://docs.astro.build/en/guides/content-collections/),
[Tailwind CSS](https://tailwindcss.com/docs/installation/tailwind-cli)

## Pregunta y criterio de decisión

La pregunta no es “¿qué librería contiene más componentes?”, sino “¿qué combinación
permite producir landings de comercios locales en un día sin perder control legal,
visual, responsive, de accesibilidad y rendimiento?”.

Los candidatos se evaluaron con estos criterios, en este orden:

1. licencia clara y compatible con uso comercial;
2. composición por secciones, no por páginas monolíticas;
3. HTML estático o JavaScript progresivo;
4. accesibilidad y responsive verificables;
5. facilidad de adaptar tokens y contenido;
6. madurez, mantenimiento y claridad del código;
7. compatibilidad con un flujo determinista y testeable.

La popularidad sólo se utilizó como señal secundaria. Una licencia ausente o ambigua
descarta la copia directa aunque el resultado visual sea atractivo.

## Hallazgos en GitLab

La oferta pública encontrada en GitLab es útil como laboratorio, pero no como base
única del producto. Los repositorios más cercanos al caso tienen pocos commits,
pocas adopciones o carecen de licencia explícita.

| Recurso | Hallazgo verificable | Uso recomendado |
| --- | --- | --- |
| [GitLab Astro + Tailwind template](https://gitlab.com/gitlab-org/project-templates/astro-tailwind) | Starter oficial y mínimo; la raíz observada no contiene `LICENSE`. | Referencia de arranque y CI, no copiar código hasta aclarar licencia. |
| [PeakAstro](https://gitlab.com/astro-workshop/peakastro) | [MIT](https://gitlab.com/astro-workshop/peakastro/-/blob/main/LICENSE); separa `Hero`, `TrustedBy`, `IndustrySection`, CTA, header y footer, pero es nuevo y tiene pocos commits. | Extraer patrones después de revisión, no adoptar como framework. |
| [OhioCleanAirFrontend](https://gitlab.com/DisabledCoder/OhioCleanAirFrontend) | [MIT](https://gitlab.com/DisabledCoder/OhioCleanAirFrontend/-/blob/main/LICENSE); incluye landmarks, foco, skip link y varios componentes Astro. | Referencia prioritaria de accesibilidad; validar sus afirmaciones con pruebas propias. |
| [PineUI](https://gitlab.com/pineui/pineui) | CSS puro y componentes separados; no se encontró licencia en la raíz. | No reutilizar código; sólo observar la separación de base, componentes y themes. |

Conclusión de GitLab: conservar `PeakAstro` y `OhioCleanAirFrontend` como fuentes de
patrones auditables. Tratar el resto como referencia hasta que haya licencia clara.
Los repositorios anónimos que anuncian cientos o miles de landings sin historial,
tests ni procedencia no deben entrar al catálogo.

## Bibliotecas abiertas y páginas libres

### Candidatos de primera línea

| Recurso | Licencia / forma | Fortalezas | Límite para Hier | Veredicto |
| --- | --- | --- | --- | --- |
| [HyperUI](https://github.com/markmead/hyperui) | MIT; snippets HTML para copiar. | Secciones de marketing, sin package runtime y fácil adaptación a Astro. | Cada snippet necesita revisión semántica, de foco, imágenes y responsive. | Fuente principal de patrones, mediante importación controlada. |
| [Flowbite](https://flowbite.com/docs/getting-started/license/) | Código liberado bajo MIT; documentación CC BY 3.0; Pro tiene licencia propia. | Cobertura amplia de navegación, formularios, acordeones, galerías y CTAs. | El JavaScript y las variantes Pro no deben entrar por accidente. | Usar sólo el core MIT y preferir HTML/CSS para módulos estáticos. |
| [AstroWind](https://github.com/arthelokyo/astrowind) | MIT; Astro + Tailwind, salida estática y poco JavaScript. | Buen referente de layout, SEO, imágenes, tokens y widgets separados. | Tiene más alcance que el piloto y no debe convertirse en una dependencia arquitectónica. | Estudiar y adaptar patrones; no hacer fork completo. |
| [daisyUI](https://github.com/saadeghi/daisyui) | MIT; plugin de componentes y themes para Tailwind. | Tokens y prototipos veloces; base amplia y mantenida. | Su API visual puede homogeneizar las páginas y acoplar el catálogo al plugin. | Útil como referencia de themes; no elegirlo como lenguaje del registro inicial. |

### Candidatos con cautela

| Recurso | Riesgo | Decisión propuesta |
| --- | --- | --- |
| [Preline](https://github.com/htmlstreamofficial/preline) | Combina MIT con una “Fair Use License”, distingue contenido gratuito y Pro, e incluye plugins JavaScript. | No importar bloques hasta registrar exactamente qué archivo y licencia aplican. |
| [shadcn/ui registry](https://ui.shadcn.com/docs/registry/getting-started) | Su catálogo de UI se concentra en otros runtimes, aunque el concepto de registry es independiente del framework. | Adoptar la idea de manifest, archivos, dependencias y variables; no adoptar su runtime React. |
| Templates completos de terceros | Arrastran decisiones, assets y dependencias no necesarias. | Extraer patrones puntuales; nunca usar un template completo como “módulo”. |

La licencia MIT permite uso, modificación y distribución con conservación del aviso;
esto no autoriza logos, marcas, fotos ni contenido de demostración. Por eso el
registro debe documentar código y assets por separado.

## Arquitectura propuesta: piezas certificadas, no libertad total

### Modelo mental

Las unidades del sistema son objetos estables:

- **Primitive:** botón, enlace, icono, container, heading y controles básicos.
- **Module:** sección autónoma de una landing, por ejemplo un hero o una galería.
- **Recipe:** orden permitido de módulos para un objetivo de conversión.
- **Theme:** tokens de color, tipografía, espaciado, radios y elevación.
- **Site data:** contenido y configuración de un negocio.
- **Asset:** archivo con origen, permiso, estado y texto alternativo.
- **Build:** resultado inmutable de una combinación válida.

La IA principal de la biblioteca será **object-first**: el operador busca módulos por
su función estable y usa facets para intención, densidad, media, interactividad y
estado. Industria y estilo son filtros, no carpetas principales; esto evita duplicar
el mismo hero en “nails”, “spa” y “barber”. La especificación completa está en
[`NAVIGATION.md`](NAVIGATION.md), [`SITEMAP.mmd`](SITEMAP.mmd) y
[`TAXONOMY.csv`](TAXONOMY.csv).

### Estructura objetivo, todavía no aprobada

```text
src/
  primitives/
  modules/
    heroes/
      hero-split-image-v1/
        component.astro
        manifest.ts
        fixture.json
        provenance.json
        module.spec.ts
  recipes/
    local-service-lead-gen-v1.ts
  renderer/
  themes/
sites/
  demo-nails/
    site.json
    recipe.json
    assets.json
schemas/
  site.schema.*
  module-manifest.schema.*
  recipe.schema.*
```

La estructura se inspira en los registries que definen items, archivos,
dependencias y variables, pero se limita a secciones Astro. El renderer mantiene un
mapa explícito `module-id → component`; no evalúa rutas arbitrarias ni código
generado. El modelo de registry de shadcn confirma que los items pueden declarar
archivos, dependencias y variables en un contrato validable.
[Registry item](https://ui.shadcn.com/docs/registry/registry-item-json)

### Contrato mínimo de un módulo

Cada módulo debe declarar, como mínimo:

- `id`, versión semántica, categoría y estado;
- schema exacto de props y límites de longitud;
- slots de contenido permitidos;
- primitive y module dependencies;
- capacidades: media, formulario, mapa, interacción y JS requerido;
- breakpoints y fixtures obligatorios;
- procedencia, licencia SPDX y aviso que debe conservarse;
- compatibilidad con recipes y themes;
- fecha, responsable y resultado de la última certificación.

Los estados son:

- `experimental`: explorable, nunca disponible para un sitio;
- `candidate`: contrato completo, pendiente de todos los gates;
- `certified`: utilizable por una recipe de producción o preview;
- `deprecated`: sólo para builds existentes, con reemplazo indicado.

### Contrato de una recipe

Una recipe no es una página copiada; es una gramática de conversión. Por ejemplo,
`local-service-lead-gen-v1` puede exigir:

1. un `navigation` y un `hero`;
2. uno o dos módulos de `trust`;
3. uno o dos módulos de `services`;
4. opcionalmente `gallery`, `process`, `pricing` o `team`;
5. `faq` si existen objeciones verificables;
6. `location-hours` y un CTA final;
7. exactamente un footer y, para previews, un aviso no oficial.

La recipe también define incompatibilidades: no dos heroes, no dos CTAs sticky, no
carousel sin controles, no mapa remoto sin consentimiento y no formulario real en
la demo.

## Stack candidato para ADR-002

| Capa | Candidato | Razón | Condición |
| --- | --- | --- | --- |
| Renderer | Astro, build estático | Componentes orientados a contenido y HTML ligero; MIT. | Aprobar versión mayor y política de actualización. |
| Lenguaje | TypeScript estricto | Contratos y registry tipados. | Cero `any` en contratos públicos. |
| Estilos | Tailwind CSS v4 + tokens CSS propios | Velocidad y CSS sin runtime; temas desacoplados del negocio. | Prohibir clases construidas dinámicamente que el scanner no detecte. |
| Validación | Schemas en build, integrados con TypeScript | La generación falla antes del preview si el contenido no cumple. | Elegir una única fuente canónica para evitar duplicar Zod y JSON Schema. |
| QA de browser | Playwright + axe-core | Flujos, viewports, screenshots y problemas automatizables de accesibilidad. | Complementar con revisión manual; Playwright advierte que la automatización no cubre toda la accesibilidad. |
| Calidad web | Lighthouse CI | Presupuestos de rendimiento, accesibilidad, SEO y regresiones. | Guardar resultados localmente o en CI privado; no usar upload público temporal. |
| Catálogo | Ruta Astro interna `/catalog` con fixtures | Evita introducir Storybook antes de comprobar que aporta valor al runtime Astro. | `noindex`; fuera de builds de clientes. |
| Preview | Proveedor pendiente | El renderer debe producir `dist/` portable. | Elegir en ADR-002/003 antes de configurar Cloudflare, Netlify o Vercel. |

Astro recomienda colecciones de build para contenido relativamente estático y permite
schemas para type safety y validación. Playwright ofrece comparación visual por
snapshots, pero exige un entorno consistente; su guía de accesibilidad indica que
los tests automáticos deben combinarse con revisión manual.
[Astro content collections](https://docs.astro.build/en/guides/content-collections/),
[Playwright visual comparisons](https://playwright.dev/docs/test-snapshots),
[Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing),
[Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### Alternativas descartadas para el piloto

- React/Next como base: añade runtime y superficie que una landing estática no
  necesita; se reevalúa sólo si un módulo aprobado lo exige.
- Un page builder visual: permite estados imposibles de certificar y contradice
  template-first.
- Un CMS o base de datos: prematuro para `demo-nails`; datos versionados son
  suficientes.
- Una biblioteca UI como dependencia dominante: agiliza botones, pero no resuelve
  composición, procedencia, contenido ni QA de secciones.
- Storybook desde el día uno: excelente taller de componentes, pero primero debe
  demostrarse que maneja el catálogo Astro sin adaptar la arquitectura a la
  herramienta. [Storybook](https://github.com/storybookjs/storybook)

## Gates para que un módulo sea “certified”

Un módulo no se certifica por verse bien en desktop. Debe pasar:

1. schema válido y fixtures válidos/inválidos probados;
2. HTML semántico, orden de headings y landmarks correctos;
3. teclado y foco visibles en todos los estados interactivos;
4. axe sin violaciones automáticas en fixtures soportados;
5. 360, 390, 768, 1024 y 1440 px sin overflow horizontal;
6. contenido extremo: textos largos, elementos ausentes y listas máximas;
7. snapshot visual estable y revisión humana de cambios;
8. presupuesto de JS por módulo y cero JS para secciones estáticas;
9. imágenes con dimensiones, optimización, alt y procedencia;
10. links, CTA, teléfono y WhatsApp normalizados;
11. compatibilidad con los themes certificados;
12. licencia y aviso de terceros registrados;
13. preview con `noindex` y aviso de concepto no oficial;
14. aprobación humana final.

`axe-core` es abierto bajo MPL-2.0 y automatiza errores comunes, pero no reemplaza
evaluación manual. Lighthouse CI permite impedir regresiones y presupuestar scripts e
imágenes. [axe-core](https://github.com/dequelabs/axe-core),
[Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## Flujo operativo objetivo: ship en una jornada

El objetivo de una jornada se valida con tiempo observado, no con una promesa. El
dry run de `demo-nails` debe registrar:

| Etapa | Salida | Presupuesto de trabajo propuesto |
| --- | --- | --- |
| Intake normalizado | `site.json` y `assets.json` válidos | 60–90 min |
| Selección | recipe, theme y variantes | 30–45 min |
| Adaptación | copy, assets y orden dentro de límites | 120–180 min |
| Build y QA | build, tests, responsive, a11y y links | 60–90 min |
| Revisión | preview y lista de cambios | 45–60 min |

Estos tiempos son hipótesis operativas. El criterio de éxito del piloto es completar
el flujo en ocho horas de trabajo sin editar componentes compartidos. Si es
necesario cambiar un módulo para terminar el demo, el sistema aún no está listo para
prometer entrega en un día.

## Skills de Codex y herramientas a instalar

El inventario oficial consultado proviene de
[`openai/skills`](https://github.com/openai/skills/tree/main/skills/.curated). No se
instaló nada durante esta investigación.

### Ya disponibles y útiles

- `frontend-design` y `design-taste-frontend`: construcción de páginas con criterio
  visual, sin convertir el resultado en una plantilla genérica.
- `ui-design-system`: tokens y consistencia de componentes.
- `frontend-design-review` e `impeccable`: revisión y pulido antes de certificar.
- `information-architect`: taxonomía y navegación del catálogo; fue utilizado para
  los documentos anexos de esta propuesta.
- `figma-use` y `figma-generate-design`: útiles cuando exista una referencia o
  sistema de diseño aprobado.

### Instalar después de aceptar el stack

1. [`playwright`](https://raw.githubusercontent.com/openai/skills/main/skills/.curated/playwright/SKILL.md): operar un navegador real, tomar snapshots y depurar flujos.
2. [`security-best-practices`](https://raw.githubusercontent.com/openai/skills/main/skills/.curated/security-best-practices/SKILL.md): revisión segura de JavaScript/TypeScript cuando exista código.
3. [`security-threat-model`](https://raw.githubusercontent.com/openai/skills/main/skills/.curated/security-threat-model/SKILL.md): usar cuando se incorporen forms, servicios externos o deployment; no aporta valor antes de que existan fronteras reales.
4. Una sola skill de deployment —`cloudflare-deploy`, `vercel-deploy` o equivalente—
   después de aceptar proveedor y ownership. No instalar varias por adelantado.

### No instalar ahora

- skills de “landing generator” de procedencia desconocida;
- skills duplicadas de diseño que cambien criterios entre ejecuciones;
- skills de proveedor antes de la decisión de hosting;
- skills de componentes que copien bloques sin conservar licencia y procedencia.

## Plan de ataque

### Hito 1 — Decidir el núcleo

- revisar esta propuesta;
- aceptar o corregir en `ADR-002` renderer, estilos, runtime, schema y QA;
- resolver en `ADR-003` owner y proveedor del preview;
- sólo entonces instalar dependencias y skills aprobadas.

**Salida:** ADR aceptados y una lista de versiones iniciales.

### Hito 2 — Contratos antes de componentes

- definir `site`, `asset`, `module-manifest` y `recipe`;
- crear fixtures válidos e inválidos de `demo-nails`;
- implementar el registry y resolver módulos sólo por IDs permitidos;
- definir tokens del primer theme.

**Salida:** la configuración falla de forma clara antes de renderizar.

### Hito 3 — Núcleo certificado

- crear 12–15 módulos para la recipe de servicios locales;
- priorizar hero, confianza, servicios, galería, proceso, FAQ, ubicación, CTA,
  formulario demo y footer;
- añadir catálogo interno y gates por módulo;
- adaptar patrones externos sólo a través del flujo de procedencia.

**Salida:** todos los módulos están `certified`; ninguno depende de datos nails.

### Hito 4 — Dry run `demo-nails`

- ensamblar exclusivamente con recipe, theme y datos;
- generar build estático con `noindex` y aviso no oficial;
- ejecutar QA automatizado y manual;
- medir el tiempo total y registrar cada edición fuera de `sites/demo-nails`.

**Salida:** preview funcional y evidencia de si puede entregarse en una jornada.

### Hito 5 — Crecimiento gobernado

- añadir un módulo sólo cuando cubra una necesidad repetida o sustituya uno débil;
- objetivo posterior: 30 módulos certificados y tres recipes, no cientos de snippets;
- medir tasa de reutilización, fallos por módulo y tiempo de adaptación;
- deprecar módulos con migración y reemplazo claros.

## Riesgos y controles

| Riesgo | Control propuesto |
| --- | --- |
| “Frankenstein UI” por mezclar fuentes | Tokens propios, primitives compartidas y revisión visual del conjunto. |
| Licencias o assets contaminados | `provenance.json`, SPDX, aviso conservado y separación código/assets. |
| Biblioteca enorme imposible de mantener | Estados de madurez, owner, fecha de certificación y límite de catálogo activo. |
| IA produce combinaciones inválidas | Salida JSON, schema estricto, allowlist de module IDs y recipes cerradas. |
| Responsive sólo funciona con fixture ideal | Fixtures extremos y pruebas en cinco anchos. |
| Accesibilidad “aprobada” sólo por automatización | Axe como gate más revisión manual de teclado, foco, lectura y contraste. |
| Dependencia fuerte de un proveedor | Build estático portable y adapter/deploy fuera del renderer. |
| Cambio de licencia upstream | Versionar fuente, commit/tag, licencia y fecha de importación; no actualizar automáticamente. |

## Límites y preguntas por resolver

- La investigación es de escritorio; no se ejecutaron ni auditaron los repositorios
  de terceros como dependencias del proyecto.
- Las licencias identificadas no sustituyen asesoría legal para redistribuir una
  biblioteca comercial de módulos.
- Falta decidir la fuente canónica de schemas para TypeScript y JSON.
- Falta comparar hosting con los requisitos reales de privacidad del preview.
- “Ship in one day” sigue siendo una hipótesis hasta medir el dry run.
- Se interpretó “módulos jerez” como **módulos hero**. Si el término significaba otra
  categoría, debe corregirse antes de cerrar la taxonomía.

## Recomendación para decisión

Aceptar como dirección —no todavía como implementación— el compilador restringido,
el registro de módulos certificado y la recipe `local-service-lead-gen-v1`. Llevar a
`ADR-002` el stack candidato Astro + TypeScript + Tailwind v4 + validación en build +
Playwright/axe + Lighthouse CI. Posponer cualquier mega biblioteca, proveedor de
preview o integración real de formularios hasta que `demo-nails` demuestre el flujo.
