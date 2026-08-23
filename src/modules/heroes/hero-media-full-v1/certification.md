# Evidencia de certificación — hero-media-full-v1

- **Revisión técnica:** 2026-08-22.
- **Estado resultante:** `candidate`.
- **Contratos:** manifest, schema discriminado imagen/video y fixtures normal/extremo sincronizados.
- **Responsive:** comprobado sin overflow a 360, 390, 768, 1024 y 1440 px en los cuatro themes.
- **Accesibilidad:** axe sin violaciones en el fixture de imagen; overlay, jerarquía, CTA y alt obligatorio revisados.
- **Rendimiento:** 0 kB de JavaScript propio; video nativo con `preload="metadata"`, poster, controles y autoplay silencioso.
- **Visual:** snapshots mobile/desktop revisados en los cuatro themes; fixture extremo revisado en Neutral Light.
- **Hardening de fotografía:** scrim desacoplado de `ink`, puntos focales y zonas seguras registrados para los seis placeholders, y pruebas con imágenes claras, oscuras y de composición irregular.
- **Branch de video:** clip autorizado de Pexels probado en WebM y MP4 a 1280 × 720, 10 segundos, sin audio, con poster, autoplay silencioso, loop, pausa por controles y fallback estático con movimiento reducido.
- **Peso de entrega:** poster 72 kB, MP4 847 kB y WebM 855 kB; ambos videos decodificados de punta a punta y dentro del presupuesto de 1 MB por archivo.
- **Contexto full-page:** snapshots de belleza y restaurante en 390 y 1440 px; el restaurante usa este candidato dentro de la recipe real.
- **Polish y handoff:** pasada con `impeccable` y revisión con `frontend-design-review`; sin hallazgos P0/P1 abiertos.
- **Pendiente:** obtener aprobación humana explícita del resultado visual antes de certificar.

## Decisiones de refinamiento

El overlay usa un token semántico de scrim independiente de la polaridad del theme y sostiene tres posiciones de copy sin multiplicar componentes. En video, el scrim deja pasar la interacción, el copy reserva espacio para la barra nativa y el autoplay sólo opera sin audio y sin movimiento reducido; los controles permanecen disponibles.
