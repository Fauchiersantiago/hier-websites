# WS-01: Motor de template

- **Estado:** Definición lista; implementación bloqueada por ADR-002
- **Objetivo:** Renderizar una landing reutilizable desde datos estructurados.

## Alcance de validación

- Un layout de una sola página.
- Bloques deterministas para hero, servicios, ubicación/horarios, CTA, formulario y footer.
- Theme mediante tokens.
- Contenido separado de componentes.
- Etiqueta de concepto no oficial y `noindex`.

## Entregables

- contrato de bloques;
- componentes y layout;
- theme inicial;
- renderer del demo;
- pruebas de ausencia de datos hardcoded del negocio en componentes compartidos.

## Criterios de aceptación

- La misma estructura acepta otro fixture válido sin modificar componentes.
- El resultado funciona en móvil y escritorio.
- Los bloques opcionales fallan o se omiten de forma predecible.
- La IA no decide estructura ni ejecuta código de producción.

## Fuera de alcance

Múltiples templates, editor visual, panel, multi-tenancy y páginas adicionales.
