# Brief — contact-form-demo-v1

## Función

- **Modo:** `certify`.
- **Trabajo de conversión:** cerrar la one-page con una vía de consulta de baja fricción que se pueda demostrar sin proveedor ni datos reales.
- **Decisión:** entender qué información se solicita y comprobar el recorrido antes de activar una integración.
- **Siguiente paso:** envío simulado y posibilidad de volver al formulario.
- **Posición:** tramo final, antes del footer.

## Contenido y verticales

- Requiere eyebrow, título, descripción, expectativa de respuesta, nota de privacidad y entre 1 y 12 servicios.
- El fixture normal prueba tres opciones; el extremo prueba copy y selector cercanos al máximo. Los campos editoriales ausentes se rechazan por schema; los errores de usuario los maneja la validación nativa.
- Aporta valor a servicios locales que captan consultas; debe omitirse si el único canal aprobado es teléfono o reserva externa.
- Expectativa de respuesta y política de privacidad necesitan aprobación antes de producción.

## Dirección visual

- **Atributos:** confiable, claro, cuidado y humano.
- **Themes:** los cuatro themes registrados.
- **Firma:** bloque editorial de contexto junto a una superficie de formulario precisa, con éxito autónomo y visible.
- **Jerarquía:** razón para contactar → expectativa → campos → privacidad → acción.
- **Ritmo:** compacto, con espacio suficiente para escaneo y tacto.
- **Riesgo justificable:** éxito ocupa el panel completo para que la transición sea inequívoca.
- **Rechazos:** indicadores de estado falsos, placeholders usados como labels, confirmaciones tipo toast y envío silencioso.

## Responsive e interacción

- En 360–390 px, contexto y formulario se apilan; todos los controles mantienen 44 px o más.
- En desktop, el split mantiene contexto visible junto al formulario.
- Validación nativa, foco al éxito, restauración y foco al primer campo; ningún dato sale de la página.
- Movimiento reducido elimina transiciones no esenciales.
- **JavaScript:** máximo 5 kB inline.

## Evidencia

- Fixtures normal y extremo; snapshots a 390 y 1440 px en cuatro themes; overflow en cinco anchos canónicos.
- Tests de teclado, validación, éxito, reset, ausencia de requests, axe, build y presupuesto.
- Diseño y código originales; no almacena datos.
- Aceptación humana: formulario comprensible, sensación de confianza, foco visible y confirmación imposible de confundir.
