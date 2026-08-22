# Fuentes de verdad

## Principio

Cada tipo de información tiene una sola fuente oficial. Los demás sistemas pueden enlazarla o resumir el mínimo necesario, pero no deben mantener copias paralelas que puedan contradecirse.

## Matriz de autoridad

| Información | Fuente oficial | Regla |
| --- | --- | --- |
| Negocio, ventas y pricing | Google Drive | No copiar tablas, pipeline ni tarifas operativas al repositorio. |
| Legal y finanzas | Google Drive | No versionar datos fiscales, contratos firmados ni información sensible en Git. |
| Clientes y aprobaciones | Google Drive | Git puede guardar identificadores técnicos y estados ficticios; no expedientes reales. |
| Assets de clientes | Google Drive | El repositorio solo consume copias autorizadas y registra procedencia/aprobación técnica. |
| Arquitectura técnica | GitHub | Mantener documentos vigentes en `docs/` y decisiones en ADR. |
| Decisiones técnicas | `docs/decisions/` | Solo los ADR con estado `Accepted` son vinculantes. |
| Propuestas técnicas | `docs/proposals/` | Material no aprobado; no autoriza implementación. |
| Código y templates | GitHub | Revisables, probados y versionados. |
| Schemas y prompts | GitHub | Deben evolucionar junto con código y pruebas. |
| Scripts, QA y deployment | GitHub | No almacenar secretos; usar configuración externa cuando se apruebe. |
| Objetivo concreto en ejecución | Tarea de Codex | Contexto temporal, no memoria canónica. |
| Preferencias del usuario | Memoria de Codex | Nunca sustituye ADR, aprobación o fuente oficial. |

## Google Drive oficial

Unidad compartida:

<https://drive.google.com/drive/folders/1cXx82XX9CBrMf6S0wVVUjzwKyPWzszRM>

Estructura observada al iniciar el repositorio:

- `00_BUSINESS OVERVIEW`
- `01_SALES`
- `02_DELIVERY`
- `03_FINANCE`
- `04_CLIENTS`
- `05_TEMPLATES`
- `06_LEGAL & ADMIN`
- `90_ARCHIVE`
- `Hier Auto Websites — Master Context Pack`

## Resolución de conflictos

1. Identificar el tipo de información.
2. Consultar la fuente oficial correspondiente.
3. No editar la fuente secundaria para “resolver” el conflicto.
4. Si la discrepancia afecta una decisión o implementación, detener ese cambio y solicitar validación.
5. Una vez resuelto, actualizar el enlace, ADR o referencia técnica que corresponda.

## Referencia de contexto

El Master Context Pack de Drive es un mapa general en estado borrador para validación. Sus etiquetas `DECIDIDO`, `ACTUAL`, `HIPÓTESIS`, `RECOMENDACIÓN` y `PENDIENTE` deben conservarse al derivar documentación técnica. El documento no aprueba automáticamente las recomendaciones que contiene.
