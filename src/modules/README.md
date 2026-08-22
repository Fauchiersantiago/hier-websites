# Modules

Biblioteca de módulos Astro referenciados por IDs estables desde el registry.

## Slice vertical de etapa 3

- `navigation-basic-v1`
- `hero-split-image-v1`
- `services-grid-v1`
- `cta-banner-v1`
- `footer-basic-v1`

Estos módulos son `candidate`: prueban el renderer y la separación entre datos y presentación, pero no se consideran `certified` hasta completar los gates de la etapa 4.

## Reglas

- No incluir datos específicos de `demo-nails`.
- No resolver módulos por rutas construidas desde input; usar el mapa explícito del renderer.
- Mantener props derivadas de un bundle validado.
- Registrar toda dependencia, presupuesto de JavaScript y compatibilidad.
- Una variante visual menor se expresa con props o tokens; un nuevo ID requiere diferencia estructural y sus pruebas.
