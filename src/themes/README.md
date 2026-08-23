# Themes

`theme-registry.ts` es el registro ejecutable de direcciones visuales. Cada entrada se
valida con `schemas/theme.schema.ts` y expone tokens semánticos para color,
tipografía, espaciado, forma, tratamiento de imagen y movimiento.

Themes candidatos y matriz tipográfica adoptada para la etapa 4:

- `neutral-light-v1`: Instrument Sans como baseline cálido y silencioso;
- `refined-soft-v1`: Cormorant Garamond + Instrument Sans para una voz delicada y sensorial;
- `editorial-sober-v1`: Source Serif 4 + Manrope para revista, hospitalidad y autoridad serena;
- `modern-direct-v1`: Archivo como superfamilia contemporánea, compacta y gráfica.

Las cuatro familias son locales, tienen licencia `OFL-1.1` y usan `font-display: swap`
mediante Fontsource. Newsreader y Fraunces permanecen sólo como especímenes del
laboratorio; no forman parte de la matriz adoptada.

Los módulos sólo consumen variables `--theme-*`. Un cambio de industria no autoriza
colores o fuentes hardcoded en los componentes. No guardar assets o identidad real de
clientes sin autorización.
