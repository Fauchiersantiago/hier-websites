# Modules

Biblioteca de módulos Astro referenciados por IDs estables desde el registry.

## Núcleo one-page de etapa 4

- `navigation-basic-v1`
- `hero-split-image-v1`
- `services-grid-v1`
- `gallery-editorial-v1`
- `reviews-highlight-v1`
- `faq-disclosure-v1`
- `location-hours-split-v1`
- `cta-banner-v1`
- `contact-form-demo-v1`
- `footer-basic-v1`

Los diez módulos forman la primera landing completa y permanecen en estado `candidate`. `hero-split-image-v1`, `services-grid-v1` y `contact-form-demo-v1` ya cuentan con manifest, contratos, fixtures extremos, Playwright, axe y snapshots revisados; esperan aprobación visual humana para pasar a `certified`. Los siete restantes todavía deben completar ese paquete.

El formulario demo es la única pieza con JavaScript cliente: tiene un presupuesto de
5 kB, usa validación del navegador, simula éxito en memoria y no realiza llamadas de
red. Los otros nueve módulos conservan presupuesto de 0 kB.

## Reglas

- No incluir datos específicos de `demo-nails`.
- No resolver módulos por rutas construidas desde input; usar el mapa explícito del renderer.
- Mantener props derivadas de un bundle validado.
- Registrar toda dependencia, presupuesto de JavaScript y compatibilidad.
- Una variante visual menor se expresa con props o tokens; un nuevo ID requiere diferencia estructural y sus pruebas.
