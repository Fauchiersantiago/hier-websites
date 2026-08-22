# Scripts

Automatización técnica acotada y reproducible para scaffold, validación, build, QA o preview.

No añadir scripts dependientes de proveedores hasta aceptar el ADR correspondiente. Nunca incluir secretos ni operaciones irreversibles por defecto.

Scripts actuales:

- `validate-site.ts`: carga un directorio de sitio y detiene el flujo si su bundle o sus assets son inválidos.
- `generate-json-schemas.ts`: regenera los contratos JSON Schema desde Zod.
