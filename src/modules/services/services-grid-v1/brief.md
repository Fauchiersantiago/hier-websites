# Brief — services-grid-v1

## Función

- **Modo:** `certify`.
- **Trabajo de conversión:** convertir una oferta abstracta en opciones comparables y fáciles de escanear.
- **Decisión:** identificar rápidamente si el negocio ofrece el servicio buscado.
- **Siguiente paso:** continuar hacia evidencia, dudas o contacto dentro de la misma one-page.
- **Posición:** inmediatamente después del hero.

## Contenido y verticales

- Requiere entre 1 y 12 servicios con nombre, descripción y hasta seis atributos.
- El fixture normal prueba tres opciones; el extremo prueba doce, textos largos y combinaciones de atributos. La ausencia se rechaza por schema.
- Es esencial para casi cualquier servicio local y se omite sólo cuando el negocio realmente vende una única experiencia que el hero ya explica.
- Precios, duración y resultados prometidos necesitan aprobación si se publican como atributos.

## Dirección visual

- **Atributos:** editorial, ordenado, detallista y sereno.
- **Themes:** los cuatro themes registrados.
- **Firma:** índice tipográfico, encabezado sticky en desktop y filas amplias que funcionan como un índice de servicios, no como tarjetas repetidas.
- **Jerarquía:** contexto → título → número de opciones → nombre → descripción → atributos.
- **Ritmo:** generoso en tres servicios y resistente al máximo de doce.
- **Riesgo justificable:** lista vertical extensa en el caso máximo, preferida a ocultar información detrás de carruseles.
- **Rechazos:** grid de cards idénticas, iconos arbitrarios y desplazamiento de texto al hacer hover.

## Responsive e interacción

- En 360–390 px, índice y contenido se apilan sin perder orden; en desktop el índice editorial queda fijo durante el recorrido.
- El hover sólo refuerza la fila en dispositivos con puntero fino; ninguna información depende de él.
- No hay animación de llegada ni JavaScript propio.
- **JavaScript:** 0 kB.

## Evidencia

- Fixtures de tres y doce servicios; snapshots a 390 y 1440 px en cuatro themes; overflow en cinco anchos canónicos.
- Contrato Zod/JSON Schema, Playwright, axe, build y presupuesto 0 kB.
- Diseño y contenido de QA originales.
- Aceptación humana: lectura inmediata, jerarquía consistente y ausencia de monotonía aunque la lista crezca.
