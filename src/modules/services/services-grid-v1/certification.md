# Evidencia de certificación — services-grid-v1

- **Revisión técnica:** 2026-08-22.
- **Estado resultante:** `candidate`, listo para aprobación visual humana.
- **Contratos:** manifest, schema de props Zod/JSON Schema y fixtures de 3/12 servicios sincronizados.
- **Responsive:** comprobado sin overflow a 360, 390, 768, 1024 y 1440 px en los cuatro themes.
- **Accesibilidad:** axe sin violaciones; lista ordenada semántica y atributos agrupados con nombres accesibles.
- **Rendimiento:** 0 kB de JavaScript propio.
- **Visual:** snapshots mobile/desktop revisados en los cuatro themes; el máximo de doce servicios fue revisado en móvil y desktop.
- **Polish y handoff:** pasada con `impeccable` y revisión con `frontend-design-review`; sin hallazgos P0/P1 abiertos.
- **Pendiente:** aprobación explícita de una persona antes de cambiar a `certified` y registrar `certifiedAt`.

## Decisiones de refinamiento

Se preservó el índice editorial y el encabezado sticky, pero se retiró el desplazamiento del texto al hacer hover. El feedback restante sólo aparece con puntero fino y usa transform/opacity sin mover el layout.
