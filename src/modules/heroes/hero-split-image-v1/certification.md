# Evidencia de certificación — hero-split-image-v1

- **Revisión técnica:** 2026-08-22.
- **Estado resultante:** `candidate`, listo para aprobación visual humana.
- **Contratos:** manifest, schema de props Zod/JSON Schema y fixtures normal/extremo sincronizados.
- **Responsive:** comprobado sin overflow a 360, 390, 768, 1024 y 1440 px en los cuatro themes.
- **Accesibilidad:** axe sin violaciones; CTA semántico, foco compartido visible, alt obligatorio y movimiento reducido verificado.
- **Rendimiento:** 0 kB de JavaScript propio; fotografía trazable desde el asset manifest del preview.
- **Visual:** snapshots mobile/desktop revisados en los cuatro themes y fixture extremo revisado en Neutral Light.
- **Polish y handoff:** pasada con `impeccable` y revisión con `frontend-design-review`; sin hallazgos P0/P1 abiertos.
- **Pendiente:** aprobación explícita de una persona antes de cambiar a `certified` y registrar `certifiedAt`.

## Decisiones de refinamiento

Se limitó el tracking negativo desde tokens, se eliminó la duplicación del tagline y se retiró el hover sobre una imagen no interactiva. La jerarquía mantiene una única acción primaria y una firma visual gobernada por theme. La posición inicial o final de la imagen se modela como prop: cambia la composición, no el propósito ni la estructura del módulo.
