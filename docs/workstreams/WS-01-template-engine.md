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
- registry y resolución determinista — completados para trece módulos;
- layout y theme inicial — completados;
- renderer técnico de `demo-nails` y catálogo interno — completados;
- pruebas de ausencia de datos hardcoded — completadas;
- núcleo de 12–15 módulos y certificación — pendientes de etapa 4.
- schema de theme, tres direcciones adicionales y catálogo matricial — completados como fundación de etapa 4 conforme a ADR-004;
- ampliación del núcleo — completada a trece candidatos; seis módulos tienen paquete completo y siete continúan pendientes de certificación formal.

## Evidencia actual

- trece module IDs en allowlist; doce conservan 0 kB de JavaScript propio y el formulario demo tiene un máximo de 5 kB;
- módulos requeridos, opcionales e incompatibilidades manejados explícitamente;
- segundo fixture renderizable sin cambios en componentes compartidos;
- build estático con `noindex`, aviso visible y catálogo interno;
- QA visual manual sin overflow a 360, 768 y 1440 px.
- registry de cuatro themes con tokens de color, tipografía, layout, forma, efectos y movimiento;
- matriz visual de seis módulos por cuatro themes y cinco anchos canónicos;
- matriz tipográfica v1.1 con cuatro voces locales OFL, carga real verificada, contraste AA automatizado y presupuesto de 0 kB de JavaScript preservado.
- manifests, schemas de props, fixtures extremos y 69 snapshots para los tres heroes, dos servicios y formulario demo;
- Playwright ejecuta 40 pruebas y verifica cinco anchos, cuatro themes, fuentes cargadas, axe, áreas táctiles, cadencia de eyebrows, movimiento reducido, video y el formulario sin transmisión de datos;
- auditoría integral y orden de cierre documentados en `docs/AUDIT-2026-08-22.md`.

## Criterios de aceptación

- La misma estructura acepta otro fixture válido sin modificar componentes.
- El resultado funciona en móvil y escritorio.
- Los bloques opcionales fallan o se omiten de forma predecible.
- La IA no decide estructura ni ejecuta código de producción.

## Fuera de alcance

Múltiples templates, editor visual, panel, multi-tenancy y páginas adicionales.

La investigación de referencias puede proponer módulos, pero ningún output externo
entra directamente al registry ni modifica un módulo certificado.
