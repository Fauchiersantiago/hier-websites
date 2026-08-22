# Evidencia de certificación — contact-form-demo-v1

- **Revisión técnica:** 2026-08-22.
- **Estado resultante:** `candidate`, listo para aprobación visual humana.
- **Contratos:** manifest, schema de props Zod/JSON Schema y fixtures normal/extremo sincronizados.
- **Responsive:** comprobado sin overflow a 360, 390, 768, 1024 y 1440 px en los cuatro themes.
- **Accesibilidad:** axe sin violaciones; labels visibles, validación nativa, foco en éxito y restauración al primer campo comprobados.
- **Comportamiento:** envío y reset probados; ninguna request sale de la página y ningún dato se persiste.
- **Rendimiento:** script inline bajo el presupuesto máximo de 5 kB, verificado durante el build.
- **Visual:** snapshots mobile/desktop revisados en los cuatro themes, además de fixture extremo y estado de éxito.
- **Polish y handoff:** pasada con `impeccable` y revisión con `frontend-design-review`; sin hallazgos P0/P1 abiertos.
- **Pendiente:** aprobación explícita de una persona antes de cambiar a `certified` y registrar `certifiedAt`.

## Decisiones de refinamiento

Se reemplazó el indicador circular de disponibilidad —que podía sugerir un estado en vivo— por una regla editorial. Los placeholders reciben contraste explícito y los estados de acción permanecen gobernados por tokens compartidos.
