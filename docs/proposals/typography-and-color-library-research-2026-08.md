# Investigación de tipografía web y biblioteca de color

- **Estado:** Proposed — investigación; no autoriza dependencias ni cambios de themes
- **Fecha de evaluación:** 2026-08-22
- **ADR aplicable:** `ADR-004-theme-system-and-reference-intake.md`
- **Alcance:** landings one-page de Hier, catálogo visual y futuros themes

## Resumen ejecutivo

Hier necesita más variedad, pero no una colección indiscriminada. La recomendación es
construir una biblioteca curada con:

- un máximo de dos familias tipográficas por theme;
- fuentes variables, open-source y autoalojadas mediante Fontsource;
- ocho direcciones cromáticas propias, descritas por atributos de marca y no por
  industrias;
- contraste medido antes de convertir una paleta en tokens de producción;
- una página interna de comparación antes de aprobar nuevas dependencias o themes.

Las tres familias actuales —Instrument Sans, Newsreader y Cormorant Garamond— siguen
siendo válidas. La primera ola de exploración debería añadir sólo **Fraunces, Source
Serif 4, Archivo y Manrope**. Las demás quedan en reserva para comparar si aportan una
diferencia visible que justifique su peso y mantenimiento.

No se propone comprar tipografías en esta fase. Todas las candidatas de este documento
están publicadas bajo `OFL-1.1`, tienen versión variable en Fontsource y cubren `latin`
o `latin-ext`, incluyendo el repertorio necesario para español.

## Diagnóstico del sistema actual

El registro ya modela familias, procedencia, licencia, pesos y escala tipográfica por
theme. También dispone de doce roles cromáticos semánticos. La base conceptual es
correcta y no necesita otro framework.

Hay dos límites que deben resolverse antes de ampliar el catálogo:

1. `base-layout.astro` importa globalmente las tres familias actuales. Si se agregan
   candidatas de la misma manera, cada landing asumiría el coste de una biblioteca que
   no utiliza.
2. El schema admite hasta tres fuentes por theme. Para el producto se recomienda una
   política más estricta: una familia display y una de texto, o una sola superfamilia.

La solución propuesta es un registro tipográfico separado y carga selectiva por
theme o por build. Una fuente incluida en el catálogo no debe terminar automáticamente
en el bundle del cliente.

## Criterios de selección tipográfica

Cada familia se evalúa con los mismos criterios:

| Criterio | Gate propuesto |
| --- | --- |
| Derechos | Licencia compatible registrada por familia y versión. |
| Idioma | Prueba con `Á É Í Ó Ú Ü Ñ á é í ó ú ü ñ ¿ ¡`, moneda, precios y horarios. |
| Legibilidad | Texto de cuerpo usable desde `16px`; display probado en desktop y mobile. |
| Rendimiento | Fuente variable y sólo subconjuntos, estilos y ejes realmente utilizados. |
| Jerarquía | Diferencia clara entre display, body, labels, CTA, precio y datos operativos. |
| Resistencia | Nombres largos, reseñas, servicios, mayúsculas, números y contenido máximo. |
| Personalidad | Aporta una voz distinguible sin depender del estereotipo de una industria. |
| QA | Sin layout shift apreciable; fallbacks compatibles; Lighthouse y revisión visual. |

Una variable font no es gratis por definición: ejes, itálicas y subconjuntos adicionales
pueden aumentar el archivo. Fontsource permite autoalojar y fijar versiones, pero el
import debe limitarse a lo que usa el theme.

## Catálogo tipográfico recomendado

### Base vigente

| Familia | Función principal | Lectura visual | Decisión actual |
| --- | --- | --- | --- |
| [Instrument Sans](https://fontsource.org/fonts/instrument-sans) | Body, labels y display moderno | limpia, humana y contemporánea | Mantener. Es la sans neutral del sistema. |
| [Newsreader](https://fontsource.org/fonts/newsreader) | Display editorial y texto destacado | serena, culta y cálida | Mantener. Funciona en neutral y editorial. |
| [Cormorant Garamond](https://fontsource.org/fonts/cormorant-garamond) | Display expresivo | refinada, delicada, alto contraste | Mantener sólo en tamaños grandes; vigilar trazos finos. |

### Primera ola para el laboratorio

| Familia | Paquete candidato | Voz y uso | Ventaja | Riesgo a probar |
| --- | --- | --- | --- | --- |
| [Fraunces](https://fontsource.org/fonts/fraunces) | `@fontsource-variable/fraunces` | cálida, táctil y editorial; titulares de gastronomía, wellness o marcas artesanales | Sus ejes ópticos y de expresión permiten crear personalidad sin otra fuente display. | Los extremos “wonky” pueden verse juguetones; comenzar con configuración contenida. |
| [Source Serif 4](https://fontsource.org/fonts/source-serif-4) | `@fontsource-variable/source-serif-4` | sobria, editorial y confiable; hotelería y servicios con contenido | Gran rango de pesos, itálicas y tamaño óptico; más robusta que una serif puramente decorativa. | Puede sentirse institucional si la composición no aporta tensión. |
| [Archivo](https://fontsource.org/fonts/archivo) | `@fontsource-variable/archivo` | directa, funcional y segura; servicios profesionales y locales | El eje de ancho permite resolver display y cuerpo con una sola familia. | Evitar que el resultado parezca una plantilla corporativa genérica. |
| [Manrope](https://fontsource.org/fonts/manrope) | `@fontsource-variable/manrope` | contemporánea, precisa y premium sin lujo obvio | Excelente contraparte de serifs y alternativa más geométrica a Instrument Sans. | No tiene itálica; no usarla donde la voz editorial dependa de ese recurso. |

### Segunda ola, sólo si la comparación demuestra valor

| Familia | Paquete candidato | Voz y uso | Motivo para mantenerla en reserva |
| --- | --- | --- | --- |
| [Bodoni Moda](https://fontsource.org/fonts/bodoni-moda) | `@fontsource-variable/bodoni-moda` | moda, belleza y lujo gráfico | Muy distintiva, pero sus hairlines exigen tamaños grandes, contraste y QA exigente. |
| [Literata](https://fontsource.org/fonts/literata) | `@fontsource-variable/literata` | hospitalidad cálida, narrativa y gastronomía | Aporta lectura prolongada; se solapa parcialmente con Newsreader y Source Serif 4. |
| [Bricolage Grotesque](https://fontsource.org/fonts/bricolage-grotesque) | `@fontsource-variable/bricolage-grotesque` | creativa, inesperada y moderna | Puede elevar marcas expresivas; no dispone de itálica y puede dominar demasiado el contenido. |
| [Figtree](https://fontsource.org/fonts/figtree) | `@fontsource-variable/figtree` | amable, clara y compacta | Body muy flexible, pero debe demostrar una diferencia real frente a Instrument Sans. |
| [Lora](https://fontsource.org/fonts/lora) | `@fontsource-variable/lora` | cercana, artesanal y narrativa | Buena fallback editorial; prioridad menor por solapamiento con otras serifs. |

Metadatos consultados en la API pública de Fontsource el 2026-08-22: todas las
candidatas son variables, versión de paquete `5.3.0`, licencia `OFL-1.1` y contienen
`latin` y/o `latin-ext`. La licencia OFL permite usar, modificar, incrustar y
redistribuir la fuente bajo sus condiciones; el archivo de licencia correspondiente
debe conservarse con la dependencia.

## Combinaciones que merece la pena ver

Estas combinaciones son direcciones de prueba, no reglas por industria:

| Dirección | Display | Body / UI | Sensación buscada |
| --- | --- | --- | --- |
| Refined soft actual | Cormorant Garamond | Instrument Sans | delicadeza editorial y mucho aire |
| Editorial actual | Newsreader | Instrument Sans | revista contemporánea y serenidad |
| Fashion precision | Bodoni Moda | Manrope | contraste alto, lujo gráfico controlado |
| Warm craft | Fraunces | Figtree o Instrument Sans | calidez, oficio y personalidad humana |
| Quiet hospitality | Source Serif 4 | Manrope | sobriedad, confianza y detalle |
| Literary warmth | Literata | Figtree | narrativa cercana y experiencia sensorial |
| Creative modern | Bricolage Grotesque | Figtree | energía controlada y composición expresiva |
| Direct professional | Archivo | Archivo | claridad, densidad y una sola descarga familiar |

No se recomienda crear todas las combinaciones. El laboratorio debe comparar primero
las cuatro de la primera ola contra los themes existentes y descartar lo redundante.

## De dónde escoger color

Las herramientas cumplen papeles diferentes. Ninguna debe convertirse en una fuente
que copie paletas de terceros de forma masiva.

| Fuente | Papel recomendado | Coste/licencia relevante | Decisión |
| --- | --- | --- | --- |
| [Leonardo](https://leonardocolor.io/) / [repositorio](https://github.com/adobe/leonardo) | Generar escalas por contraste y revisar resultados en espacios perceptuales. | Open source, Apache-2.0. | Herramienta principal para convertir semillas en escalas accesibles. No requiere dependencia de producción. |
| [Adobe Color — accesibilidad](https://color.adobe.com/create/color-accessibility) | Explorar armonías, extraer dirección de una imagen y simular deficiencias de visión cromática. | Servicio web de Adobe; revisar términos al momento de uso. | Útil en exploración y QA visual, no como catálogo importable. |
| [Radix Colors](https://www.radix-ui.com/colors/docs/overview/usage) | Referencia de escalas claras, oscuras y alpha con roles previsibles. | MIT. | Referencia de ingeniería; no es necesario instalarla ni adoptar su estética. |
| [Material Color Utilities](https://github.com/material-foundation/material-color-utilities) | Estudiar generación de esquemas por roles y pares `on-*`. | Apache-2.0. | Referencia técnica opcional; no convertir Hier en Material Design. |
| [Realtime Colors](https://www.realtimecolors.com/) | Ver rápidamente una combinación aplicada a una página real y comparar tipografía. | Herramienta web gratuita; revisar términos del sitio si se exportan artefactos. | Muy útil para selección humana temprana. |
| [Coolors](https://coolors.co/) | Exploración rápida y contraste. | Freemium. Sus términos restringen redistribuir compilaciones de paletas y ciertos usos en creadores de templates. | No ingerir ni republicar su biblioteca. Si se usa manualmente, registrar sólo decisiones propias y procedencia. |
| [Open Color](https://github.com/yeun/open-color) | Escalas abiertas para UI y prototipos. | MIT; su propio proyecto desaconseja usarlo como color principal de identidad porque puede cambiar. | Útil como baseline técnico, no como identidad de cliente. |

## Direcciones cromáticas candidatas

Las siguientes semillas fueron compuestas para Hier; no son paletas copiadas de un
catálogo. Cada fila incluye los cinco roles que deciden la lectura principal. El spike
debe derivar `surface`, `surfaceStrong`, `line`, `accentStrong`, `accentSoft`, `signal`
y `focus` antes de registrarla como theme.

| ID de trabajo | Atributos sugeridos | Canvas | Ink | Muted | Accent | On accent | Contraste medido |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `porcelain-rose` | refined, soft | `#F8F3F1` | `#2D2226` | `#74666B` | `#8A3F59` | `#FFFAF8` | ink 13.94:1; muted 4.95:1; CTA 6.91:1 |
| `sage-ritual` | soft, sober | `#173328` | `#F1F5EE` | `#BDC9C0` | `#F0B38E` | `#1D251F` | ink 12.36:1; muted 7.97:1; CTA 8.64:1 |
| `mineral-coast` | editorial, sober | `#F2EFE7` | `#182633` | `#586973` | `#245B73` | `#FFFFFF` | ink 13.40:1; muted 4.96:1; CTA 7.45:1 |
| `cellar-clay` | editorial, refined | `#8B3529` | `#FFF4EC` | `#F0C9BB` | `#F6D1A8` | `#3A1E17` | ink 7.35:1; muted 5.22:1; CTA 10.60:1 |
| `night-brass` | sober, refined | `#141719` | `#F4EFE4` | `#B9B2A7` | `#D0A35A` | `#19130A` | ink 15.70:1; muted 8.56:1; CTA 7.96:1 |
| `cobalt-acid` | modern, energetic | `#F3F4EF` | `#171B22` | `#626873` | `#244DE8` | `#FFFFFF` | ink 15.62:1; muted 5.07:1; CTA 6.36:1 |
| `graphite-citrus` | direct, energetic | `#1B1D1B` | `#F5F2E8` | `#C1C5B9` | `#D7602D` | `#161814` | ink 15.14:1; muted 9.65:1; CTA 4.77:1 |
| `oxford-ink` | direct, sober | `#16243B` | `#F6F1E7` | `#BEC8D7` | `#D2A85B` | `#1C2633` | ink 13.82:1; muted 9.21:1; CTA 6.91:1 |

Los tres contrastes de cada fila se calcularon con la fórmula de luminancia relativa
de WCAG. Superan 4.5:1 para texto normal en las parejas indicadas, pero eso no certifica
la paleta completa: bordes, foco, texto sobre `surface`, estados de error y fotografías
requieren pruebas adicionales. Para texto grande WCAG admite 3:1; Hier conservará
4.5:1 como objetivo por defecto siempre que la expresión visual lo permita.

## Lo que no debe hacer el sistema

- No asignar rosa a belleza, rojo a restaurante o azul a hotel de forma automática.
- No mezclar tres familias para “hacerlo premium”. El refinamiento viene de jerarquía,
  escala, espaciado, composición y uso consistente.
- No importar una familia completa con todos sus ejes, estilos y subsets si el theme
  utiliza una fracción.
- No escoger color mirando sólo un hero. Debe funcionar en CTA, formulario, error,
  ubicación, reseñas, overlays de imagen y estados de foco.
- No adoptar una paleta sólo porque un generador la marca como accesible; la validación
  se hace contra los pares semánticos reales de la landing.
- No copiar ni republicar catálogos externos dentro del “module builder”.

## Flujo propuesto de selección

```text
atributos de marca + assets autorizados
                ↓
2 direcciones de tipografía + 2 de color
                ↓
laboratorio con el mismo contenido y las mismas imágenes
                ↓
mobile + desktop + contenido largo + formulario
                ↓
contraste, peso, layout shift y revisión humana
                ↓
una dirección elegida → tokens completos → candidate theme
```

La comparación debe mantener estructura y contenido constantes. Si cambian layout,
fotos, copy, tipografía y color al mismo tiempo, no se puede saber qué decisión mejoró
el resultado.

## Próximo paso recomendado

Tras aprobación explícita de esta propuesta:

1. refactorizar la carga actual para que cada build use sólo las fuentes de su theme;
2. instalar la primera ola: Fraunces, Source Serif 4, Archivo y Manrope;
3. crear un laboratorio interno de tipografía con texto real en español, precios,
   servicios, reseñas y formulario;
4. crear un laboratorio de color con estas ocho semillas y tokens semánticos completos;
5. comparar y reducir el catálogo: conservar sólo familias y paletas que produzcan una
   diferencia clara y reutilizable;
6. proponer cambios concretos de themes para aceptación, sin alterar silenciosamente
   los cuatro themes actuales.

## Fuentes consultadas

- [Fontsource: introducción y autoalojamiento](https://fontsource.org/docs/getting-started/introduction)
- [Fontsource: variable fonts](https://fontsource.org/docs/getting-started/variable)
- [Google Fonts Developer API y metadatos de ejes](https://developers.google.com/fonts/docs/developer_api)
- [SIL Open Font License en Google Fonts](https://github.com/google/fonts/blob/main/ofl/opensans/OFL.txt)
- [WCAG 2.2 — contraste mínimo](https://www.w3.org/TR/WCAG22/#contrast-minimum)
- [Adobe Leonardo](https://github.com/adobe/leonardo)
- [Radix Colors](https://www.radix-ui.com/colors/docs/overview/usage)
- [Material Color Utilities](https://github.com/material-foundation/material-color-utilities)
- [Adobe Color Accessibility Tools](https://color.adobe.com/create/color-accessibility)
- [Realtime Colors](https://www.realtimecolors.com/)
- [Coolors License](https://coolors.co/license)
- [Open Color](https://github.com/yeun/open-color)
