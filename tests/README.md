# Tests

Pruebas de schemas, fixtures, renderer y gates de preview.

La suite de contratos cubre campos críticos ausentes, URL, teléfono, horarios,
module IDs, aprobación de assets, límites de contenido y versiones incompatibles.
Los casos se declaran en `fixtures/invalid-cases.json` y se aplican sobre el bundle
válido para evitar copias divergentes.

Las pruebas de renderer, `noindex` en HTML, etiqueta visible, enlaces/CTA y responsive
se incorporan con Astro y Playwright en las siguientes etapas.
