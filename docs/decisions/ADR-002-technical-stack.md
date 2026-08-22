# ADR-002: Stack técnico

- **Estado:** Pending
- **Fecha:** 2026-08-20
- **Bloquea:** Implementación del renderer y deployment

## Contexto

La propuesta técnica v1 recomienda herramientas concretas para framework, estilos, hosting, formularios, correo, almacenamiento, analítica y QA. Esas recomendaciones no han sido aprobadas.

## Decisión pendiente

Seleccionar el stack mínimo para producir y verificar el preview del piloto.

La decisión debe cubrir, como mínimo:

- framework o renderer;
- estrategia de estilos;
- runtime y package manager;
- validación de schemas;
- pruebas;
- build estático o dinámico;
- mecanismo de preview;
- límites de formularios y datos para la demo.

## Criterios

- rapidez de construcción del primer template;
- output mobile-first y accesible;
- separación clara entre template y datos;
- preview con `noindex`;
- bajo costo y portabilidad;
- mantenimiento simple;
- QA automatizable;
- capacidad de evolucionar sin construir prematuramente una plataforma completa.

## Candidatos no aprobados

Consultar `docs/proposals/Hier_Arquitectura_Tecnica_v1.md`. La presencia de una herramienta en esa propuesta no autoriza su instalación ni uso.

## Para aceptar este ADR

Registrar la opción elegida, alternativas consideradas, consecuencias, versión inicial y condiciones de revisión. Requiere aprobación explícita del usuario.
