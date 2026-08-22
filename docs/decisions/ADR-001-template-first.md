# ADR-001: Enfoque template-first

- **Estado:** Accepted
- **Fecha:** 2026-08-20
- **Alcance:** Validación técnica y piloto

## Contexto

El producto necesita crear landings consistentes con rapidez y limitar el trabajo especulativo previo a una venta. La fase actual debe demostrar un flujo completo con un único template y un negocio ficticio.

## Decisión

Adoptar un enfoque template-first:

- estructura, responsive, accesibilidad y comportamiento se implementan de forma determinista;
- los datos del negocio se separan del template;
- la IA puede asistir contenido, paleta o alt text mediante contratos definidos;
- todo output asistido requiere validación y revisión humana;
- el primer alcance es una landing de una sola página.

## Consecuencias

- La primera inversión se concentra en contratos, componentes y QA reutilizables.
- No se genera código de producción libremente con IA por cliente.
- El negocio ficticio `demo-nails` será el fixture de referencia.
- El éxito se mide por repetibilidad, calidad y tiempo de adaptación.

## No decidido aquí

- Framework o proveedor de hosting.
- Número final de templates.
- Arquitectura multi-tenant.
- Formularios, booking, pagos o dominios.

## Condición de revisión

Revisar después del dry run del piloto si el enfoque no puede cumplir calidad, flexibilidad o presupuesto de tiempo sin personalización estructural frecuente.
