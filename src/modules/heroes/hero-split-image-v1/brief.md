# Brief — hero-split-image-v1

## Función

- **Modo:** `certify`.
- **Trabajo de conversión:** presentar la promesa, el carácter del negocio y una acción primaria sin demorar la comprensión.
- **Decisión:** confirmar en segundos si la oferta y el tono encajan con la intención del visitante.
- **Siguiente paso:** CTA de contacto o reserva.
- **Posición:** primera sección de contenido de la one-page.

## Contenido y verticales

- Requiere tipo de negocio, tagline, headline, descripción, CTA y una imagen autorizada con alt descriptivo.
- El fixture normal prueba contenido editorial realista; el extremo lleva cada campo cerca de su máximo. Los campos son obligatorios: el estado ausente se rechaza por schema.
- Aporta valor a belleza, hospitality, restaurante y servicios locales con fotografía propia o autorizada; debe omitirse si no existe una imagen suficientemente buena.
- Claims y fotografía final requieren aprobación del cliente.

## Dirección visual

- **Atributos:** claro, sensorial, confiable y editorial.
- **Themes:** los cuatro themes registrados.
- **Firma:** tensión entre titular de gran escala, imagen inclinada o geométrica y caption flotante que contiene la promesa secundaria.
- **Jerarquía:** tipo de negocio → promesa → contexto → CTA; el tagline aparece una sola vez.
- **Ritmo:** aire amplio, split equilibrado y lectura compacta en móvil.
- **Imagen:** recorte gobernado por theme, sin hover falso sobre contenido no interactivo.
- **Riesgo justificable:** proporción tipográfica amplia sin sacrificar legibilidad ni provocar overflow.
- **Rechazos:** hero genérico centrado, gradientes decorativos por defecto, tarjetas flotantes sin función y movimiento ornamental.

## Responsive e interacción

- En 360–390 px, copy e imagen se apilan y el CTA conserva al menos 44 px de alto.
- Desde desktop, usa dos columnas con sujeto visual completo y caption legible.
- La única interacción es el CTA; el reveal orienta la secuencia de lectura y desaparece con movimiento reducido.
- **JavaScript:** 0 kB.

## Evidencia

- Fixtures normal y extremo; snapshots a 390 y 1440 px en cuatro themes; overflow probado a 360, 390, 768, 1024 y 1440 px.
- Contrato Zod/JSON Schema, Playwright, axe, build y presupuesto 0 kB.
- Código original; la procedencia de cada imagen vive en el asset manifest del sitio.
- Aceptación humana: promesa legible en una mirada, fotografía protagonista sin parecer plantilla genérica y CTA inequívoco.
