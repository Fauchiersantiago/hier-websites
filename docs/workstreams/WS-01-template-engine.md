# WS-01: Motor de template

- **Estado:** Slice vertical mínimo completado; ampliación y certificación pendientes en etapa 4
- **Objetivo:** Renderizar una landing reutilizable desde datos estructurados.

## Alcance de validación

- Un layout de una sola página.
- Bloques deterministas para hero, servicios, ubicación/horarios, CTA, formulario y footer.
- Theme mediante tokens.
- Contenido separado de componentes.
- Etiqueta de concepto no oficial y `noindex`.

## Entregables

- contrato de bloques — completado;
- registry y resolución determinista — completados para cinco módulos;
- layout y theme inicial — completados;
- renderer técnico de `demo-nails` y catálogo interno — completados;
- pruebas de ausencia de datos hardcoded — completadas;
- núcleo de 12–15 módulos y certificación — pendientes de etapa 4.

## Evidencia actual

- cinco module IDs en allowlist con presupuesto de 0 kB de JavaScript cliente;
- módulos requeridos, opcionales e incompatibilidades manejados explícitamente;
- segundo fixture renderizable sin cambios en componentes compartidos;
- build estático con `noindex`, aviso visible y catálogo interno;
- QA visual manual sin overflow a 360, 768 y 1440 px.

## Criterios de aceptación

- La misma estructura acepta otro fixture válido sin modificar componentes.
- El resultado funciona en móvil y escritorio.
- Los bloques opcionales fallan o se omiten de forma predecible.
- La IA no decide estructura ni ejecuta código de producción.

## Fuera de alcance

Múltiples templates, editor visual, panel, multi-tenancy y páginas adicionales.
