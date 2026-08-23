# Evidencia de certificación - services-featured-list-v1

- **Revisión técnica:** 2026-08-22.
- **Estado resultante:** `candidate`, listo para aprobación visual humana.
- **Contratos:** manifest, schema de props Zod/JSON Schema y fixtures de 3/12 servicios sincronizados.
- **Responsive:** comprobado sin overflow a 360, 390, 768, 1024 y 1440 px en los cuatro themes.
- **Accesibilidad:** axe sin violaciones; la recomendación y el inventario conservan una jerarquía semántica legible.
- **Rendimiento:** 0 kB de JavaScript propio y scroll natural de la one-page.
- **Visual:** snapshots mobile/desktop revisados en los cuatro themes; el máximo de doce servicios fue revisado en móvil y desktop.
- **Enlaces:** el módulo no genera enlaces ni altera el destino de conversión de la recipe.
- **Procedencia:** diseño, fixtures y código originales de Hier.
- **Pendiente:** aprobación explícita de una persona antes de cambiar a `certified` y registrar `certifiedAt`.

## Decisiones de refinamiento

El primer servicio recibe peso editorial como puerta de entrada, pero el resto permanece visible en el scroll normal. Se descartó un panel con desplazamiento interno porque ocultaba oferta y rompía la lectura continua de la landing one-page.

## Skills aplicadas

- `hier-module-designer`: brief, límites de contenido, procedencia y gates de certificación.
- `information-architect`: orden de decisión orientado a función y conversión.
- `design-taste-frontend` y `ui-design-system`: jerarquía, tokens semánticos y adaptación entre themes.
- `emil-design-eng` e `impeccable`: respuesta visual sobria y pase de polish.
- `frontend-design-review`: revisión final sin hallazgos P0/P1 abiertos.

No se usó generación de imágenes porque el módulo no requiere media y el compositor ya utiliza assets placeholder autorizados. No se añadió Motion porque el estado y el feedback de esta pieza se resuelven con CSS y 0 kB de JavaScript.
