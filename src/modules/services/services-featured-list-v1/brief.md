# Brief - services-featured-list-v1

## Función

- **Modo:** `create`.
- **Trabajo de conversión:** recomendar una puerta de entrada sin ocultar el resto de la oferta.
- **Decisión:** entender qué servicio conviene considerar primero y qué alternativas existen.
- **Siguiente paso:** continuar hacia evidencia o contacto dentro de la misma one-page.
- **Posición:** después del hero.

## Contenido y verticales

- Requiere entre 1 y 12 servicios con nombre, descripción y atributos opcionales.
- El primer servicio de la recipe es la recomendación editorial; no se inventa por el componente.
- Es útil cuando el negocio tiene una opción insignia o un servicio inicial claro.
- Debe omitirse si destacar la primera opción podría implicar una recomendación comercial no aprobada.

## Dirección visual

- **Atributos:** claro, decidido y selectivo.
- **Themes:** los cuatro themes registrados.
- **Firma:** una pieza dominante seguida de una lista compacta, sin grid de tarjetas repetidas.
- **Jerarquía:** título, servicio recomendado, explicación y oferta secundaria.
- **Ritmo:** contraste fuerte entre la recomendación y el inventario.
- **Riesgo justificable:** el primer item recibe mucho peso visual; el orden de datos debe revisarse humanamente.
- **Rechazos:** iconos decorativos, precios inventados, carrusel y badges superpuestos.

## Responsive e interacción

- En móvil, la recomendación y la lista se apilan; en desktop comparten el viewport.
- En desktop la recomendación permanece visible mientras la lista completa continúa en el scroll natural de la página.
- No usa animación de entrada ni JavaScript propio.
- **JavaScript:** 0 kB.

## Evidencia

- Fixtures de tres y doce servicios.
- Snapshots a 390 y 1440 px en cuatro themes y overflow en los cinco anchos canónicos.
- Contrato Zod/JSON Schema compartido, Playwright, axe y build.
- Diseño y código originales de Hier.
- Aceptación humana: la recomendación se entiende sin hacer invisible el resto de la oferta.
