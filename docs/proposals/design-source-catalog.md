# Catálogo propuesto de fuentes de diseño y microinteracción

- **Estado:** Proposed — investigación; no autoriza instalaciones ni imports
- **Fecha de evaluación:** 2026-08-22
- **ADR aplicable:** `ADR-004-theme-system-and-reference-intake.md`

## Resumen ejecutivo

Sí conviene incorporar estas fuentes al flujo de trabajo, pero no como una carpeta
gigante de componentes copiados. El valor se divide en cuatro capas distintas:

1. **dirección visual:** prompts, referencias y sistemas que ayudan a definir theme,
   tipografía, ritmo, tratamiento de imagen y movimiento;
2. **estructura:** secciones de marketing que pueden acelerar heroes, servicios,
   FAQ, prueba social, formularios y footers;
3. **microinteracción:** botones, reveals, marquees, accordions y estados que aportan
   pulido sin convertirse en la arquitectura del sitio;
4. **certificación Hier:** schema, tokens, responsive, accesibilidad, rendimiento,
   procedencia y aprobación humana.

La recomendación es usar DesignPrompts y Refero como brújula, Superdesign como fuente
de prompts reutilizables, HyperUI como donante estructural y Uiverse como laboratorio
de microcomponentes. Animate UI, Magic UI y Motion Primitives sirven sobre todo para
estudiar coreografías de movimiento que después se portan selectivamente a Astro.

## Registro inicial de fuentes

| Fuente | Aporta | Licencia o condición observada | Clasificación ADR-004 | Uso recomendado |
| --- | --- | --- | --- | --- |
| [DesignPrompts.dev](https://www.designprompts.dev/) | Sistemas visuales completos con tokens, tipografía, layout, estados, responsive, accesibilidad y motion. | No se localizó una licencia original explícita para reutilizar el texto completo de sus prompts. | B — referencia pública | Extraer atributos y crear una especificación Hier propia; no copiar prompts completos al repo. |
| [Refero Styles](https://styles.refero.design/) | Referencias de sistemas reales, pantallas, colores, tipografía, espaciado y componentes. | Referencia pública; no se verificó una licencia que permita reutilizar código o assets de los productos mostrados. | B — referencia pública | Analizar patrones y dirección; nunca tratar una captura como código autorizado. |
| [Superdesign Prompts](https://github.com/superdesigndev/superdesign-prompts) | Prompts por tipo de página y estilo, previews y datos legibles por máquina. | Código/estructura MIT; contenido de prompts CC0 1.0 según el repositorio. | A — autorizado | Fuente preferida para normalizar briefs de themes y módulos sin depender de su skill o SaaS. |
| [HyperUI Marketing](https://www.hyperui.dev/components/marketing/) | Secciones de marketing en Tailwind: CTAs, FAQ, headers, footers, forms y grids. | MIT. | A — autorizado | Donante estructural prioritario por cercanía a Astro + Tailwind 4; adaptar a tokens y contratos de Hier. |
| [Uiverse](https://uiverse.io/elements) / [Galaxy](https://github.com/uiverse-io/galaxy) | Botones, inputs, cards, toggles, loaders y efectos comunitarios en CSS o Tailwind. | Los elementos se publican bajo MIT. | A — autorizado | Laboratorio de microinteracciones. Seleccionar pieza por pieza; conservar aviso de licencia cuando corresponda y rehacer QA. |
| [Animate UI](https://animate-ui.com/) | Primitivas, botones y efectos animados basados en React, Tailwind y Motion. | El archivo de licencia actual añade Commons Clause a MIT y prohíbe vender o redistribuir los componentes como componentes. | B por ahora | Estudiar comportamiento; hacer una implementación propia en Astro. No importar su registry a la biblioteca pública de módulos. |
| [Magic UI](https://github.com/magicuidesign/magicui) | Patrones animados, marquees, bento, blur/reveal, texto y efectos. | Core open source MIT; existen productos o bloques Pro separados. | A para el core verificado | Portar sólo patrones necesarios; no instalar el stack React/shadcn completo. |
| [Motion Primitives](https://github.com/ibelick/motion-primitives) | Accordions, carousels, in-view, text effects, spotlight, tilt y morphing. | MIT; implementación React + Motion. | A para código con licencia | Usar como referencia técnica de coreografía y estados; portar selectivamente a Astro/Motion. |
| [ThreeUI](https://threeui.com/browse) / [Community](https://github.com/MengTo/threeui) | Landing pages, heroes, shaders, fondos, texto animado y objetos 3D/WebGL. | El catálogo Community, su código y assets propios están publicados bajo MIT; Pro se distribuye por separado. | A para Community verificado | Referencia de alto impacto y posible spike futuro. No instalar React/Three.js ni adoptar un hero 3D antes de medir necesidad y presupuesto. |

La clasificación se verifica de nuevo en la fecha de ingreso de cada pieza. Una
licencia del repositorio de una herramienta no licencia imágenes, fuentes o marcas de
terceros incluidas en un ejemplo.

## Evaluación de los dos ejemplos nuevos

### Animate UI — Liquid Button

El efecto es pertinente como variante premium de CTA: una capa de color llena el
botón al hacer hover, mientras el botón escala levemente. La implementación publicada
usa React, Motion y Tailwind; su documentación recomienda React 19, Motion 12.23 o
superior y Tailwind 4.1 o superior.

No conviene incorporar ese componente directamente porque:

- introduciría una isla React para un efecto que puede resolverse con CSS;
- el proyecto Hier usa Astro estático y sólo permite JavaScript cuando aporta valor;
- la licencia actual tiene una restricción específica sobre redistribuir componentes;
- hover no puede ser el único estado: teclado, touch y `prefers-reduced-motion` deben
  tener un comportamiento equivalente.

El patrón queda registrado únicamente como referencia candidata; el usuario no ha
aprobado construirlo ni convertirlo en prioridad. Si una dirección visual futura lo
necesita, se estudiaría primero una implementación propia con HTML semántico, estados
`hover`, `focus-visible` y `active`, además de fallback sin movimiento.

### Uiverse Elements

Uiverse sí permite seleccionar elementos MIT y adaptarlos. Su volumen es una ventaja
para exploración, no una señal automática de calidad. Cada candidato debe pasar:

- revisión de autor, URL exacta, fecha y licencia;
- simplificación del HTML y CSS;
- sustitución de valores fijos por tokens semánticos;
- contraste, foco, teclado, target táctil y texto accesible;
- prueba de contenido largo y localización;
- revisión de rendimiento, soporte de navegador y reduced motion;
- atribución opcional al creador y aviso MIT obligatorio cuando se copie una porción
  sustancial.

Para el piloto se priorizan botones, inputs, cards y loaders de formulario. Se evitan
custom cursors, scroll-jacking, partículas continuas y efectos que oculten el CTA.

### ThreeUI

ThreeUI es una fuente más especializada: su catálogo observable reúne landing pages,
heroes, Three.js, fondos, botones, texto animado, UI elements, CSS, motion design y
secciones. La edición Community publica el código completo bajo MIT; la edición Pro
mantiene su implementación fuera del paquete público.

Es valiosa para aprender a crear un momento visual distintivo, especialmente en un
hero o fondo. No es adecuada como base de la biblioteca del piloto porque su paquete
es React y muchas piezas usan Three.js, canvas o WebGL. Eso introduciría runtime,
dependencias y coste gráfico donde el baseline actual produce HTML estático con cero
JavaScript cliente. Para Hier se conserva como fuente de inspiración o para un spike
posterior de una sola pieza, nunca como dependencia global.

## Cómo convertir referencias en módulos mejores

```text
necesidad de conversión
        ↓
brief de estructura + theme + movimiento
        ↓
referencias A/B separadas por función
        ↓
prototipo aislado y original en Astro
        ↓
tokens + schema + fixtures + provenance
        ↓
responsive + a11y + performance + visual QA
        ↓
candidate → certified / rejected
```

Los prompts externos no deciden la página completa. Se normalizan a un brief Hier con
campos estables:

- objetivo del módulo y señal de conversión;
- familia visual y atributos de marca;
- jerarquía tipográfica;
- palette y tokens semánticos;
- composición, densidad y tratamiento de imagen;
- estados interactivos;
- intensidad y presupuesto de movimiento;
- anti-patterns y restricciones;
- mobile-first, reduced motion y accesibilidad.

## Cola priorizada para etapa 4

### Estructuras que amplían la cobertura

1. `hero-editorial-split-v1` — hero asimétrico con imagen y jerarquía editorial;
2. `hero-proof-led-v1` — propuesta, prueba y CTA por encima del fold;
3. `services-bento-v1` — servicios con densidad adaptable y una pieza destacada;
4. `trust-logo-strip-v1` — prueba visual con versión estática y marquee opcional;
5. `gallery-reveal-grid-v1` — galería responsive con reveal discreto;
6. `process-sticky-steps-v1` — pasos claros con sticky sólo en desktop;
7. `faq-accordion-v1` — interacción semántica, usable sin JavaScript;
8. `location-hours-split-v1` — ubicación, horarios y CTA local;
9. `lead-form-v1` — estados idle, focus, error, success demo y loading;
10. `cta-editorial-v1` — cierre visual fuerte sin duplicar el contrato del CTA.

### Primitives premium compartidas

- estados premium de CTA gobernados por theme;
- reveal de texto e imagen;
- marquee pausado y accesible;
- border/shine controlado;
- contador sólo cuando exista una métrica real;
- accordion y disclosure;
- feedback de submit y loader.

Un efecto no recibe module ID propio si no cambia la función o estructura del bloque.
Debe ser una variante gobernada por theme o una primitive reusable.

## Presupuesto de movimiento propuesto

- una animación protagonista y una secundaria como máximo en el primer viewport;
- ninguna información depende del movimiento;
- sin scroll-jacking ni custom cursor en el piloto;
- loops continuos sólo si son discretos, pausables y justifican conversión;
- `prefers-reduced-motion` obligatorio;
- CSS antes que JavaScript; Motion sólo cuando la coreografía lo requiere;
- todo módulo declara su JavaScript cliente y su coste medido.

## Recomendación actual

**Proceed con un registro curado, no con imports masivos.** Para la etapa 4, comenzar
con Superdesign + HyperUI + Uiverse y usar DesignPrompts, Refero, Animate UI, Magic UI,
Motion Primitives y ThreeUI como referencias de dirección y comportamiento. No
instalar el skill de Superdesign, React, Three.js, shadcn ni registries externos hasta
que un spike concreto demuestre que ahorran más tiempo del que añaden en dependencias
y QA.
