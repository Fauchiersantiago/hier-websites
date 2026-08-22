# ADR-003: Ownership y operación de dominios

- **Estado:** Pending
- **Fecha:** 2026-08-20
- **Bloquea:** Compra, transferencia o conexión de dominios reales

## Contexto

Está decidido que el dominio y las suscripciones externas se pagan aparte y no deben comprarse antes de la venta y la aprobación del cliente. También debe quedar documentado quién es propietario del dominio, hosting, analítica y cuentas externas.

Sigue pendiente definir el modelo operativo de titularidad, administración, registrador, DNS, renovaciones y transferencia.

## Decisión pendiente

Definir:

- quién figura como titular;
- quién compra y renueva;
- qué acceso conserva Hier;
- cómo se delega DNS;
- cómo se documenta aprobación;
- cómo se realiza handoff o transferencia;
- qué sucede ante impago o terminación.

## Restricciones vigentes

- No comprar un dominio antes de la venta y aprobación.
- No usar el dominio como mecanismo de dependencia.
- No almacenar credenciales en Git.
- No ejecutar operaciones reales de dominio durante la validación técnica.

## Propuesta relacionada

La preferencia por titularidad del cliente y proveedores concretos aparece en `docs/proposals/Hier_Arquitectura_Tecnica_v1.md`; permanece no aprobada.

## Para aceptar este ADR

La decisión debe alinearse con documentos comerciales y legales de Google Drive y contar con aprobación explícita. La revisión profesional legal permanece fuera del repositorio técnico.
