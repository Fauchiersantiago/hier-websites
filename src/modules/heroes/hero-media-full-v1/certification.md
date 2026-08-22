# Evidencia de certificación — hero-media-full-v1

- **Revisión técnica:** 2026-08-22.
- **Estado resultante:** `candidate`.
- **Contratos:** manifest, schema discriminado imagen/video y fixtures normal/extremo sincronizados.
- **Responsive:** comprobado sin overflow a 360, 390, 768, 1024 y 1440 px en los cuatro themes.
- **Accesibilidad:** axe sin violaciones en el fixture de imagen; overlay, jerarquía, CTA y alt obligatorio revisados.
- **Rendimiento:** 0 kB de JavaScript propio; video nativo con `preload="metadata"`, poster, controles y sin autoplay.
- **Visual:** snapshots mobile/desktop revisados en los cuatro themes; fixture extremo revisado en Neutral Light.
- **Polish y handoff:** pasada con `impeccable` y revisión con `frontend-design-review`; sin hallazgos P0/P1 abiertos.
- **Pendiente:** probar visualmente el branch de video con un clip autorizado y obtener aprobación humana antes de certificar.

## Decisiones de refinamiento

El overlay adapta su densidad por theme y sostiene dos posiciones de copy sin multiplicar componentes. El modo video no reproduce automáticamente y conserva controles visibles para que el movimiento nunca sea impuesto.
