# WS-02: Datos del sitio

- **Estado:** Planned
- **Objetivo:** Definir el contrato mínimo para el negocio ficticio y la landing.

## Entregables

- schema versionado;
- fixture `sites/demo-nails/`;
- ejemplos válidos e inválidos;
- manifest de assets con origen, permiso y aprobación;
- validación y mensajes de error comprensibles.

## Reglas

- No incluir datos personales reales.
- Separar contenido, configuración visual e integraciones.
- Mantener `noindex` activo en preview.
- Representar explícitamente estados de aprobación relevantes.

## Criterios de aceptación

- El fixture válido pasa la validación.
- Campos críticos ausentes fallan antes del render.
- Un asset no aprobado no puede usarse como si fuera de producción.
