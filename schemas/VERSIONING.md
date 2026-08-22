# Versionado de contratos

## Fuente canónica

Los schemas Zod en este directorio son la única fuente canónica. Los archivos de
`schemas/generated/` son artefactos JSON Schema derivados y no se editan a mano.

## Versión actual

La versión vigente del bundle del piloto es `1.0.0`. Cada documento (`site`,
`recipe`, `module-manifest` y `asset-manifest`) declara `schemaVersion` y la
validación rechaza versiones incompatibles antes del render.

## Política

- **Patch:** aclaraciones o validaciones que no cambian datos válidos existentes.
- **Minor:** campos opcionales o valores compatibles hacia atrás.
- **Major:** campos requeridos, eliminación o cambio de significado, tipos o reglas
  que invaliden fixtures previamente válidos.

Durante el piloto se acepta exactamente `1.0.0`. El primer cambio compatible o
incompatible debe incluir:

1. actualización del schema Zod y del número de versión;
2. fixture anterior y fixture nuevo;
3. función o script de migración explícito;
4. pruebas de migración e idempotencia;
5. regeneración de JSON Schema;
6. nota en el roadmap o ADR si cambia una decisión técnica.

No se corrigen datos silenciosamente durante la carga. Una versión desconocida debe
fallar con un mensaje accionable.
