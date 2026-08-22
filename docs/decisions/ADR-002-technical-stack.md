# ADR-002: Stack técnico del piloto

- **Estado:** Accepted
- **Fecha de propuesta:** 2026-08-20
- **Fecha de aceptación:** 2026-08-22
- **Aprobación:** explícita del usuario en la tarea de Codex del proyecto
- **Alcance:** validación técnica, `demo-nails` y preview controlado

## Contexto

El piloto debe demostrar que Hier puede producir una landing mobile-first de una
sola página a partir de datos estructurados y módulos reutilizables. La solución
necesita ser rápida de construir, portable, accesible, verificable y suficientemente
ligera para no convertir una landing estática en una aplicación innecesaria.

La decisión se limita al camino mínimo que desbloquea contratos, renderer, catálogo,
QA y preview. No aprueba servicios comerciales o integraciones de producción.

## Decisión

### Renderer y lenguaje

- **Astro 7** como renderer, con `output: "static"` y `dist/` portable.
- **TypeScript estricto** para contratos, registry y código compartido.
- Los componentes Astro generan HTML sin runtime de cliente por defecto.
- Una isla de otro framework sólo puede añadirse si un módulo certificado demuestra
  que la necesita; React, Vue o Svelte no forman parte de la base inicial.

### Runtime y package manager

- **Node.js 24 LTS** como runtime de desarrollo y CI.
- **pnpm 11** como package manager.
- `packageManager`, versión de Node y lockfile deben quedar versionados.
- Las instalaciones de CI deben ser reproducibles y rechazar cambios no reflejados
  en el lockfile.

### Estilos y movimiento

- **Tailwind CSS 4** para composición y utilidades, acompañado de tokens CSS propios.
- Los themes se expresan mediante tokens semánticos; no se copian colores o clases
  específicas de un negocio dentro de componentes compartidos.
- CSS y Tailwind resuelven estados, transiciones y microinteracciones simples.
- **Motion 13** es una dependencia opcional por módulo para reveals, stagger,
  scroll o movimiento avanzado. No se carga globalmente.
- Toda animación debe respetar `prefers-reduced-motion`, no contener información
  imprescindible y cumplir el presupuesto de JavaScript del módulo.
- GSAP y otras librerías de animación no forman parte del stack base; requieren una
  necesidad demostrada y una decisión posterior.

### Schemas y contenido

- **Zod 4** es la fuente canónica de schemas ejecutables.
- Los tipos TypeScript se infieren desde Zod.
- Cuando una integración o un output estructurado de IA requiera JSON Schema, éste
  se genera desde Zod; no se mantiene manualmente una segunda definición canónica.
- Un build debe fallar antes de renderizar si datos, recipe, manifest o assets no
  cumplen su contrato.
- Durante el piloto los datos se versionan en el repositorio; no se introduce CMS ni
  base de datos.

### Pruebas y gates

- **Vitest 4** para contratos y lógica determinista.
- **Playwright 1** para browser, viewports, interacción y comparación visual.
- **axe-core 4** como gate automático de accesibilidad, complementado por revisión
  manual de teclado, foco, semántica y contenido.
- **Lighthouse CI 0.15** para presupuestos de rendimiento, accesibilidad, SEO y
  buenas prácticas.
- El catálogo inicial vive en una ruta interna de Astro con fixtures; Storybook no
  se adopta durante el primer slice.

### Preview

- El artefacto canónico es el build estático `dist/`; debe poder servirse localmente
  o migrarse a otro hosting sin modificar el renderer.
- **Cloudflare Pages** es el proveedor inicial del preview compartible del piloto.
- Antes de compartirlo, el preview debe quedar protegido mediante Cloudflare Access
  o un control equivalente, además de `noindex`, `X-Robots-Tag`, exclusión en
  `robots.txt` y un aviso visible de “concepto no oficial”.
- Esta decisión no autoriza dominio real, DNS de cliente, publicación como sitio
  oficial ni servicios pagados.

### Formulario de demostración

- El formulario del preview es local y ficticio: valida la interfaz, muestra un
  estado de éxito y no transmite ni persiste datos.
- No se recopilan datos personales reales durante el demo.
- Worker, Turnstile, email, almacenamiento, retención y consentimiento requieren
  una decisión posterior antes de cualquier formulario real.

## Versiones iniciales

Las versiones mayores aprobadas son Node 24, pnpm 11, Astro 7, Tailwind 4, Zod 4,
Motion 13, Vitest 4, Playwright 1, axe-core 4 y Lighthouse CI 0.15. Al crear el
scaffold se registrarán las versiones exactas compatibles en `package.json` y
`pnpm-lock.yaml`.

Las actualizaciones patch o minor pueden aceptarse si build, schemas y gates pasan.
Una actualización major, un runtime dinámico o una dependencia dominante de UI
requieren revisar este ADR o crear uno nuevo.

## Alternativas consideradas

- **Next.js o React como base:** ofrecen un runtime de aplicación más amplio del que
  requiere una landing estática; se conservan como opción puntual para una isla.
- **SvelteKit como base:** alternativa capaz y ligera, pero no presenta una ventaja
  suficiente sobre Astro para este piloto orientado a contenido estático.
- **HTML/CSS sin framework:** minimiza dependencias, pero aumenta el trabajo para
  registry, assets, composición y crecimiento del catálogo.
- **Page builder visual:** acelera páginas manuales, pero permite estados difíciles
  de validar y contradice el enfoque template-first.
- **JSON Schema como fuente manual:** interoperable, pero duplicaría tipos y
  validación ejecutable; se conserva únicamente como formato derivado.
- **Vercel, Netlify o GitHub Pages:** son opciones portables para el mismo `dist/`;
  Cloudflare Pages se selecciona para el piloto por su preview estático y posibilidad
  de control de acceso, sin acoplar el renderer.
- **Storybook desde el inicio:** útil a mayor escala, pero prematuro antes de probar
  el catálogo Astro con fixtures.

## Consecuencias

### Positivas

- HTML estático por defecto y JavaScript sólo donde exista una necesidad explícita.
- Un único contrato de datos alimenta validación, tipos y outputs estructurados.
- El catálogo puede crecer por módulos auditables sin convertirse en un page builder.
- El build permanece portable y el proveedor de preview puede sustituirse.

### Costos y límites

- Los componentes externos deben adaptarse a Astro y pasar los gates de Hier.
- Tailwind 4 presupone navegadores modernos; un requisito posterior de navegadores
  antiguos obliga a revisar la estrategia.
- Las pruebas automáticas no sustituyen revisión visual ni accesibilidad manual.
- Cloudflare Pages introduce una dependencia operativa para compartir el preview,
  mitigada por conservar `dist/` como artefacto portable.

## Fuera de alcance

- formularios y almacenamiento reales;
- dominio, DNS y ownership;
- analítica, booking y pagos;
- CMS, panel administrativo y cuentas de usuario;
- multi-tenancy y renderer dinámico;
- publicación oficial de un sitio de cliente.

## Condiciones de revisión

Revisar esta decisión si ocurre cualquiera de estas condiciones:

- el dry run no puede completarse en una jornada sin editar código compartido;
- un módulo requerido no puede implementarse de forma accesible o eficiente en Astro;
- el presupuesto de movimiento exige una dependencia global considerable;
- los schemas derivados dejan de representar correctamente una integración necesaria;
- el preview no puede mantenerse privado, portable o sin costo aprobado;
- aparece un requisito real de SSR, autenticación, datos dinámicos o navegadores no
  cubiertos por el baseline actual.

## Referencias

- <https://docs.astro.build/en/concepts/islands/>
- <https://docs.astro.build/en/guides/content-collections/>
- <https://tailwindcss.com/docs/animation>
- <https://zod.dev/json-schema>
- <https://motion.dev/docs>
- <https://playwright.dev/docs/accessibility-testing/>
- <https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/>
