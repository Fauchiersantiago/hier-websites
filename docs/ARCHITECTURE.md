# Arquitectura técnica vigente

## Estado

Este documento describe únicamente la arquitectura aprobada o necesaria para la validación. Las opciones concretas de stack viven en `docs/proposals/Hier_Arquitectura_Tecnica_v1.md` y no están aprobadas.

## Principios aceptados

### Template-first

La estructura, accesibilidad, responsive y comportamiento del sitio son deterministas y reutilizables. La IA puede asistir copy, paleta o alt text, pero sus resultados deben respetar schemas y revisión humana.

### Datos separados de la presentación

La información del negocio ficticio debe vivir en configuración estructurada. El template consume esa configuración sin incorporar datos de cliente directamente en componentes compartidos.

### Alcance de una landing

El primer renderer produce una landing de una sola página. Rutas adicionales, sitios multi-página y plataformas multiempresa requieren una decisión posterior.

### Preview seguro

Todo preview debe:

- incluir `noindex`;
- indicar que es un concepto no oficial;
- evitar secretos y datos reales sensibles;
- usar assets ficticios, propios o explícitamente autorizados;
- mantener separado cualquier estado de producción.

## Flujo conceptual de la validación

```text
datos ficticios estructurados
          ↓
validación contra schema
          ↓
template + componentes + theme
          ↓
renderer de landing
          ↓
preview privado con noindex
          ↓
QA automático + revisión humana
```

## Capas del repositorio

- `src/components/`: bloques reutilizables y accesibles.
- `src/layouts/`: composición permitida de la landing.
- `src/themes/`: tokens visuales sin datos de negocio.
- `src/lib/`: carga, validación y transformación determinista.
- `sites/demo-nails/`: configuración y contenido del negocio ficticio.
- `schemas/`: contratos de configuración y outputs asistidos por IA.
- `prompts/`: instrucciones versionadas para generación de contenido.
- `scripts/`: operaciones repetibles del flujo técnico.
- `tests/`: contratos, render y gates.

## Contratos por definir

- Schema mínimo de negocio y sitio.
- Contrato de bloques del template.
- Manifest de assets y permisos.
- Contrato de copy asistido por IA.
- Interfaz de formulario para la demo.
- Criterios técnicos exactos de build, preview y QA.

## Decisiones pendientes

- Framework y sistema de estilos.
- Hosting y previews.
- Formularios, antispam, almacenamiento y correo.
- Analítica.
- Booking y pagos.
- Dominio, DNS y ownership.

No introducir implementaciones dependientes de estas decisiones hasta aceptar el ADR correspondiente.
