# Themes

`theme-registry.ts` es el registro ejecutable de direcciones visuales. Cada entrada se
valida con `schemas/theme.schema.ts` y expone tokens semánticos para color,
tipografía, espaciado, forma, tratamiento de imagen y movimiento.

Themes candidatos:

- `neutral-light-v1`: baseline cálido;
- `refined-soft-v1`: delicado y sensorial;
- `editorial-sober-v1`: revista y hospitalidad;
- `modern-direct-v1`: contemporáneo y gráfico.

Los módulos sólo consumen variables `--theme-*`. Un cambio de industria no autoriza
colores o fuentes hardcoded en los componentes. No guardar assets o identidad real de
clientes sin autorización.
