# Workflows

El stack y el mecanismo de preview están aceptados en ADR-002. La implementación de
workflows continúa pendiente de Etapa 6.

El pipeline mínimo deberá usar Node 24 y pnpm 11, instalar con lockfile congelado,
ejecutar `pnpm check`, añadir Lighthouse CI y asociar el preview privado de
Cloudflare Pages al commit verificado.

No guardar secretos ni valores de producción en archivos versionados.
