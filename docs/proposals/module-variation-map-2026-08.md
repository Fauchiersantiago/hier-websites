# Mapa de familias y variaciones de módulos

- **Estado:** Mixed; la familia de heroes indicada como `candidate` está implementada. El resto continúa `proposed`.
- **Fecha:** 2026-08-22
- **ADR aplicables:** ADR-004, ADR-005 y ADR-006

## Tesis de arquitectura de información

La biblioteca se organiza por el trabajo que el visitante intenta completar: orientarse,
comparar, confiar, resolver una duda o contactar. Una diferencia estructural obtiene
un module ID; una diferencia de posición, densidad, media o alineación permanece como
prop; color, tipografía, forma y ritmo pertenecen al theme.

## Familia hero implementada

| Module ID | Trabajo principal | Estructura | Variaciones gobernadas | Estado |
| --- | --- | --- | --- | --- |
| `hero-split-image-v1` | entender oferta y carácter | copy e imagen en columnas | imagen al inicio o al final | candidate |
| `hero-media-full-v1` | sentir el espacio o producto | media a sangre con copy superpuesto | imagen o video; copy inicial o centrado | candidate |
| `hero-compact-banner-v1` | comprender y actuar sin depender de media | superficie cromática y acciones | alineación inicial o centrada | candidate |

El modo video exige MP4 o WebM autorizado, poster, descripción y controles. No usa
autoplay por defecto y no añade JavaScript propio.

## Mapa de expansión

| Familia | Módulo base | Variaciones que son props/theme | Estructura nueva que sí merece otro ID | Prioridad |
| --- | --- | --- | --- | --- |
| Navigation | `navigation-basic-v1` | sticky, transparente/sólida y énfasis de CTA | `navigation-overlay-v1` sólo si full-media necesita un orden de foco distinto | P1 |
| Services | `services-grid-v1` | densidad, destacado y presencia de atributos | `service-menu-detailed-v1` para precio, duración y resultado; `services-featured-media-v1` cuando la imagen decide | P0 |
| Trust | `reviews-highlight-v1` | una o dos citas, tono y ritmo | `trust-facts-strip-v1` para hechos verificables; `reviews-media-v1` cuando existe foto autorizada | P0 |
| Media | `gallery-editorial-v1` | proporción y orden de recortes | `short-video-reel-v1`; `before-after-results-v1` con consentimiento y reglas propias | P1 |
| Process | por construir | orientación de pasos y densidad | `process-steps-v1` porque necesita un contrato de secuencia real | P0 |
| FAQ | `faq-disclosure-v1` | una o dos columnas en desktop | otro ID sólo si aparece búsqueda o agrupación funcional, fuera del piloto | P2 |
| Location | `location-hours-split-v1` | posición de horarios y CTA | `locations-finder-v1` sólo para múltiples ubicaciones | P2 |
| Conversion | `cta-banner-v1` | alineación, densidad y tratamiento cromático | `mobile-action-bar-v1` por comportamiento sticky; `announcement-offer-bar-v1` para vigencia y caducidad | P1 |
| Contact | `contact-form-demo-v1` | campos opcionales permitidos por schema | nuevo ID sólo cuando exista un backend aprobado o una consulta especializada | fuera del piloto |
| Footer | `footer-basic-v1` | densidad y navegación permitida | ninguno por ahora | P2 |

## Próxima ola recomendada

1. `service-menu-detailed-v1`: mejora la decisión porque añade precio/rango,
   duración y resultado esperado sin forzar el grid genérico.
2. `trust-facts-strip-v1`: permite comunicar hechos verificables sin inventar
   métricas ni depender de testimonios.
3. `process-steps-v1`: explica qué sucede en la primera visita y reduce ansiedad.
4. Variación de `gallery-editorial-v1`: probar un modo full-bleed y un modo
   secuencia, primero como props; crear ID nuevo sólo si cambia el contrato.
5. `mobile-action-bar-v1`: evaluar después de confirmar que el CTA principal se
   pierde en páginas largas y que no compite con el formulario.

## Reglas del laboratorio

- Comparar una variable a la vez con contenido e imagen constantes.
- Mostrar componentes reales, no screenshots falsos.
- Mantener el chrome del laboratorio fuera de la superficie del módulo.
- No convertir cada mock en un module ID.
- Una variación sólo avanza cuando mejora comprensión, prueba o conversión.
- La aprobación visual humana sigue siendo necesaria para `certified`.

## Registro de skills de esta iteración

| Especialista | Uso |
| --- | --- |
| `information-architect` | Definió la organización task-first y la frontera entre familia, estructura y prop. |
| `design-taste-frontend` | Fijó la dirección del laboratorio y evitó heroes centrados, grids repetidos y media decorativa como defaults. |
| `ui-design-system` | Separó decisiones de theme, variantes compartidas y nuevos module IDs. |
| `emil-design-eng` | Limitó motion a reveals CSS y feedback de press; video con controles y sin autoplay. |
| `imagegen` | Omitida: los assets generados existentes son suficientes para evaluar recortes y composición. |
| `motion` | Omitida: CSS resuelve la interacción aprobada con 0 kB de JavaScript. |
| `impeccable` | Se aplicará después de la primera inspección visual. |
| `frontend-design-review` | Se aplicará antes del handoff; no autoriza certificación humana. |
