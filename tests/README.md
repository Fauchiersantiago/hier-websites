# Tests

Pruebas de schemas, fixtures, renderer y gates de preview.

La suite de contratos cubre campos críticos ausentes, URL, teléfono, horarios,
module IDs, aprobación de assets, límites de contenido y versiones incompatibles.
Los casos se declaran en `fixtures/invalid-cases.json` y se aplican sobre el bundle
válido para evitar copias divergentes.

Las pruebas de renderer, `noindex` en HTML, etiqueta visible, enlaces/CTA y responsive
ya se ejecutan con Vitest, Astro y Playwright. La matriz aislada cubre por ahora los
tres heroes, los dos servicios y el formulario demo en cuatro themes, dos fixtures y
cinco anchos. Navigation, galería, reseñas, FAQ, ubicación-horarios, CTA y footer se
incorporarán al completar sus paquetes de certificación.

El check de browser también cubre axe, movimiento reducido, formulario sin
transmisión, autoplay/control del video, laboratorio visual y snapshots full-page.
Lighthouse CI y el gate explícito de tamaño/espaciado táctil continúan pendientes.
