# Schemas

Contratos Zod versionados para datos de negocio, sitio, recipes, módulos y assets.

Zod es la fuente canónica. `schemas/generated/` contiene JSON Schemas derivados para interoperabilidad; no se editan manualmente.

Contratos vigentes:

- `site.schema.ts`: identidad ficticia, contenido, contacto, ubicación, selección visual y preview.
- `recipe.schema.ts`: slots y módulos permitidos.
- `module-manifest.schema.ts`: contrato de una pieza del catálogo y sus gates.
- `module-props.schema.ts`: contratos ejecutables de props para los módulos en certificación.
- `asset-manifest.schema.ts`: procedencia, permiso, aprobación y alt text.
- `site-bundle.schema.ts`: reglas que cruzan site, recipe y assets antes del render.
- `theme.schema.ts`: metadata, fuentes licenciadas y tokens semánticos de cada theme.

Los JSON Schemas de props usan el ID del módulo como nombre de archivo y se generan junto con los contratos compartidos.

La política de compatibilidad y migración vive en `VERSIONING.md`.
