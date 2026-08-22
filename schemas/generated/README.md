# JSON Schemas derivados

Este directorio se genera desde los schemas Zod mediante:

```sh
pnpm schemas:generate
```

No editar los archivos `*.schema.json` manualmente. Algunas reglas que cruzan
`site`, `recipe` y `assets` sólo pueden expresarse en la validación ejecutable de
Zod; `site-bundle.schema.json` sirve como contrato interoperable, no como sustituto
de `siteBundleSchema`.
