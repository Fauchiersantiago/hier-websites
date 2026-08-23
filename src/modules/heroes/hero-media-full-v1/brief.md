# Brief de diseño: hero-media-full-v1

## Función

- **Modo:** `refine` sobre el candidato creado.
- **Trabajo de conversión:** comunicar la atmósfera del negocio antes de explicar detalles.
- **Decisión:** ayudar a confirmar en una mirada si la experiencia encaja con la intención del visitante.
- **Siguiente paso:** una única acción primaria.
- **Posición:** primer bloque de contenido de la one-page.

## Contenido y verticales

- Requiere promesa, descripción breve, CTA y una imagen o video autorizado con poster y descripción.
- Admite texto alineado al inicio, centro o final como variación del mismo contrato.
- Aporta valor cuando hotelería, gastronomía, belleza o espacios físicos tienen media decisiva.
- Debe omitirse cuando el asset es débil, genérico, no autorizado o hace ilegible la promesa.

## Dirección visual

- **Atributos:** inmersivo, seguro y sensorial.
- **Themes:** los cuatro themes registrados.
- **Firma:** un solo plano visual a sangre con copy anclado y scrim calculado para legibilidad.
- **Jerarquía:** tipo de negocio, promesa, contexto y CTA.
- **Ritmo:** una idea dominante dentro del primer viewport.
- **Imagen:** recorte completo con `object-fit`, punto focal y zona segura de texto registrados; nunca se anima al hover.
- **Riesgo justificable:** permitir que la imagen domine sin perder contraste ni acción.
- **Rechazos:** texto flotante sin scrim, autoplay sin pausa, controles ocultos y múltiples mensajes sobre la fotografía.

## Responsive e interacción

- A 360-390 px el copy permanece en el tercio inferior, respeta la zona segura y el CTA queda visible.
- El video usa controles nativos, poster, `playsinline` y no comienza automáticamente.
- Los reveals sólo ordenan la lectura inicial y se eliminan con movimiento reducido.
- **JavaScript:** 0 kB propios.

## Evidencia

- Fixtures normal y extremo, imagen real del preview y clip stock autorizado de 10 segundos en WebM y MP4.
- Snapshots y axe en cuatro themes, cinco anchos, seis fotografías con luminosidad y composición distintas, y una prueba aislada del branch de video en mobile y desktop.
- Aceptación humana: el mensaje debe leerse sin esfuerzo y el asset debe sentirse protagonista, no fondo decorativo.
