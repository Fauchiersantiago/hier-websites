# Roadmap técnico

## Norte inmediato

Validar el flujo técnico completo con un template, un negocio ficticio y un preview funcional. El roadmap se organiza por evidencia, no por cantidad de automatización.

## Etapa 0 — Fundaciones del repositorio

**Resultado:** reglas, fuentes de verdad, alcance, arquitectura mínima, ADR y workstreams claros.

**Criterios de salida:**

- estructura inicial versionada;
- `AGENTS.md` y `docs/START_HERE.md` operativos;
- propuestas separadas de decisiones;
- stack y ownership explícitamente marcados como pendientes.

## Etapa 1 — Contratos del demo

**Resultado:** datos ficticios y contratos independientes del framework.

**Entregables:**

- schema de negocio/sitio;
- fixture `demo-nails`;
- manifest de assets ficticios;
- contrato de bloques y contenido;
- pruebas de validación.

**Criterio de salida:** datos válidos e inválidos producen resultados predecibles.

## Etapa 2 — Template y preview funcional

**Prerequisito:** aceptar `ADR-002-technical-stack.md`.

**Resultado:** una landing responsive generada desde los datos del demo.

**Entregables:**

- componentes y layout;
- theme inicial;
- CTA y formulario de demostración;
- `noindex` y etiqueta de concepto no oficial;
- instrucciones locales reproducibles.

## Etapa 3 — QA y preview deployment

**Resultado:** preview verificable y compartible sin tratarse como sitio oficial.

**Entregables:**

- build reproducible;
- pruebas y checks de calidad;
- verificación responsive y accesibilidad;
- enlace privado o controlado;
- registro del tiempo real del flujo.

## Etapa 4 — Dry run del piloto

**Resultado:** ejecución punta a punta con el negocio ficticio.

**Medición mínima:**

- tiempo de adaptación del preview;
- fallos y pasos manuales;
- número de revisiones;
- calidad del resultado;
- decisiones que bloquean un piloto real.

## Después de la validación

Solo después de demostrar el flujo se evaluarán formularios reales, booking, pagos, dominios, automatización de intake, orquestación, múltiples templates y arquitectura multi-tenant.
