# Roadmap técnico

## Norte inmediato

Demostrar que Hier Auto Websites puede producir una landing de servicios locales,
completamente responsive y verificable, a partir de módulos reutilizables y datos
estructurados, sin editar el código compartido para cada negocio.

La validación termina con un dry run de `demo-nails`. La meta “ship in one day” se
considera demostrada sólo si el flujo completo cabe en una jornada de ocho horas de
trabajo, incluido QA y preview.

## Estado al 22 de agosto de 2026

| Área | Estado | Evidencia o bloqueo |
| --- | --- | --- |
| Fundaciones del repositorio | Completado | Estructura, reglas, fuentes de verdad, ADR y workstreams versionados. |
| Dirección modular amplia | Propuesta | La investigación completa sigue en `docs/proposals/`; sólo el slice aprobado por este roadmap está implementado. |
| Stack técnico | Completado | `ADR-002` está `Accepted`. |
| Themes y referencias | En progreso | `ADR-004` está `Accepted`; schema, registry y cuatro direcciones visuales están implementados como `candidate`. Falta decisión tipográfica y aprobación humana. |
| Contratos y fixture | Completado | Zod 4 canónico, JSON Schema derivado, bundle y fixtures inválidos verificados. |
| Renderer y módulos | En progreso avanzado | Trece módulos registrados y seis paquetes completos; siete paquetes y la aprobación humana siguen pendientes. |
| Flujo de diseño asistido | Completado | `ADR-006` Accepted, `hier-module-designer` versionada y routing de especialistas protegido por pruebas. |
| Preview compartible | Aprobado, no implementado | Cloudflare Pages está aprobado; faltan CI, Lighthouse CI, acceso privado y trazabilidad a commit. |
| Dominio real | Fuera de alcance | `ADR-003` pendiente; no es necesario para el demo. |

## Principios de ejecución

- Cada etapa debe producir evidencia utilizable por la siguiente.
- No trabajar en paralelo sobre capas cuya decisión base siga pendiente.
- Un módulo sólo puede utilizarse en el demo cuando alcanza estado `certified`.
- El contenido ficticio vive en `sites/demo-nails/`; nunca en componentes compartidos.
- La IA entrega datos estructurados y propuestas, no código libre de producción.
- Las integraciones reales, dominios y automatización se posponen hasta completar el dry run.

## Camino crítico

```text
contratos + fixtures válidos e inválidos
      ↓
registry + renderer mínimo
      ↓
recipe + módulos certificados
      ↓
demo-nails ensamblado
      ↓
QA + preview controlado
      ↓
dry run cronometrado
      ↓
decisión go / adjust / stop
```

## Etapa 0 — Fundaciones

- **Estado:** Completada
- **Workstreams:** todos

### Resultado

Reglas, fuentes de verdad, alcance, arquitectura mínima, ADR y workstreams claros.

### Evidencia existente

- estructura inicial versionada;
- `AGENTS.md` y `docs/START_HERE.md` operativos;
- propuestas separadas de decisiones;
- `ADR-001` Accepted;
- `ADR-002` aceptado y `ADR-003` explícitamente pendiente;
- investigación del sistema modular registrada como propuesta.

## Etapa 1 — Cerrar las decisiones que desbloquean el demo

- **Estado:** Completada
- **Workstreams:** WS-01, WS-02 y WS-03
- **Esfuerzo orientativo:** una sesión de decisión y una actualización documental

### Objetivo

Convertir la investigación técnica en una decisión pequeña y reversible. No decidir servicios que el demo todavía no necesita.

### Decisiones necesarias en ADR-002

- renderer o framework y versión mayor inicial;
- estrategia de estilos;
- runtime y package manager;
- fuente canónica de schemas y validación;
- build estático o dinámico;
- pruebas unitarias y de browser;
- mecanismo de preview;
- comportamiento del formulario ficticio;
- política de versiones y condición de revisión.

### Decisiones que pueden esperar

- dominio real y DNS;
- backend de formularios reales;
- booking, pagos y analítica;
- CMS, base de datos y panel administrativo;
- múltiples templates o multi-tenancy.

### Criterio de salida

`ADR-002` está `Accepted` mediante aprobación explícita del usuario y contiene alternativas, consecuencias, versiones iniciales y condiciones de revisión. Si el preview elegido requiere una decisión operativa de ownership, se crea un ADR acotado distinto de la operación de dominios reales.

## Etapa 2 — Contratos independientes de la presentación

- **Estado:** Completada
- **Workstream principal:** WS-02
- **Esfuerzo orientativo:** 2–3 días de trabajo

### Objetivo

Representar un negocio, una landing, sus módulos y sus assets de forma validable antes de construir la interfaz.

### Entregables

- schema versionado de `site`;
- schema de `module-manifest`;
- schema de `recipe`;
- schema o contrato de `asset-manifest`;
- fixture válido de `demo-nails`;
- al menos un fixture inválido por regla crítica;
- mensajes de error comprensibles;
- contrato de versión y migración de datos.

### Campos críticos del fixture

- identidad ficticia del negocio;
- propuesta de valor y CTA;
- servicios y atributos verificables;
- ubicación y horarios ficticios;
- contacto ficticio;
- estado de preview y `noindex`;
- recipe y theme seleccionados;
- assets con origen, permiso, aprobación y alt text.

### Pruebas obligatorias

- falta de campos críticos;
- URLs, teléfono y horarios inválidos;
- module ID no permitido;
- asset sin aprobación;
- contenido por encima de límites;
- versión de schema incompatible.

### Criterio de salida

El fixture válido pasa; todos los inválidos fallan antes del render con errores accionables. No existe información específica de nails en el contrato compartido.

### Evidencia

- schemas Zod versionados y JSON Schemas derivados;
- bundle válido de `demo-nails` con recipe y asset manifest;
- ocho mutaciones inválidas que cubren todas las reglas críticas;
- validación de archivos de assets y mensajes de error en español;
- pruebas que impiden introducir términos del nicho demo en contratos compartidos.

## Etapa 3 — Registry y renderer mínimo

- **Estado:** Completada
- **Workstreams:** WS-01 y WS-02
- **Esfuerzo orientativo:** 3–4 días

### Objetivo

Demostrar que una recipe resuelve exclusivamente módulos registrados y produce una página estática desde datos válidos.

### Entregables

- registry con allowlist de module IDs;
- resolver determinista `module-id → component`;
- manejo explícito de módulos requeridos, opcionales e incompatibles;
- layout base de una página;
- tokens del primer theme;
- build local reproducible;
- ruta interna de catálogo con fixtures;
- tests del renderer y de ausencia de datos hardcoded.

### Módulos verticales iniciales

Construir primero un slice pequeño que pruebe el flujo:

1. navigation;
2. hero;
3. services;
4. final CTA;
5. footer y aviso de concepto no oficial.

### Criterio de salida

El renderer produce una landing mínima desde un fixture válido, rechaza IDs no registrados y permite cambiar el fixture sin modificar componentes compartidos.

### Evidencia

- allowlist y resolver determinista para cinco module IDs;
- manejo probado de slots requeridos, opcionales e incompatibilidades declaradas;
- layout base y theme `neutral-light-v1` con tipografías OFL;
- landing `demo-nails` y catálogo interno generados por Astro;
- segundo fixture válido que usa los mismos componentes;
- nueve pruebas, typecheck, diagnóstico Astro y build reproducible en verde;
- salida con `noindex`, aviso de concepto, asset local y 0 kB de JavaScript cliente;
- revisión visual sin overflow horizontal a 360, 768 y 1440 px.

## Etapa 4 — Recipe de servicios locales y núcleo certificado

- **Estado:** En progreso
- **Workstream principal:** WS-01
- **Esfuerzo orientativo:** 4–6 días

### Objetivo

Completar la menor biblioteca que permita una landing convincente de servicios locales sin crear una mega colección prematura.

### Fundación visual aprobada

Antes de ampliar el catálogo:

- definir y validar el schema de theme;
- conservar `neutral-light-v1` como baseline;
- implementar `refined-soft-v1`, `editorial-sober-v1` y `modern-direct-v1`;
- ampliar el catálogo a una matriz de módulo, theme, fixture y viewport;
- registrar procedencia y licencias de fuentes, assets y referencias;
- aplicar el flujo de ingreso de referencias de `ADR-004`.
- aplicar `skills/hier-module-designer/` en todo módulo nuevo, refinado o certificado según `ADR-006`.
- usar el catálogo curado de `docs/proposals/design-source-catalog.md` para elegir
  candidatos; la propuesta no autoriza imports masivos ni nuevas dependencias.

### Evidencia de la fundación visual

- schema Zod y JSON Schema derivado para themes, tokens, tipografías y dirección de arte;
- registry ejecutable con `neutral-light-v1`, `refined-soft-v1`, `editorial-sober-v1` y `modern-direct-v1`;
- las cinco piezas del slice vertical disponibles en las cuatro direcciones: 20 combinaciones comparables;
- tipografías locales con licencia OFL registradas junto con su paquete y procedencia, y contraste AA automatizado para texto principal, secundario y CTA;
- QA visual de las cuatro direcciones en escritorio y a 390 px, sin overflow horizontal;
- animaciones de entrada, imagen y estados interactivos realizadas con CSS, con fallback de movimiento reducido;
- build estático verificado con `noindex`; nueve módulos usan 0 kB de JavaScript y el formulario demo conserva un presupuesto máximo de 5 kB.

### Avance del núcleo one-page al 22 de agosto de 2026

- `ADR-005` acepta el límite de una sola página, el formulario como máxima
  integración y el uso gobernado de placeholders generados;
- cinco módulos nuevos en estado `candidate`: galería editorial, reseñas, FAQ,
  ubicación-horarios y formulario demo;
- diez módulos ensamblados por la misma recipe en belleza y restaurante;
- seis fotografías originales generadas en alta resolución, optimizadas para web y
  registradas como `preview-only` con procedencia y alt text;
- formulario local bajo 5 kB, con validación y éxito en memoria, sin transmisión ni
  persistencia;
- schemas, tests y build estático actualizados para ambos previews.

La evidencia anterior inicia el núcleo, pero no sustituye manifests por módulo,
fixtures extremos, Playwright, axe, snapshots ni aprobación humana necesarios para
marcarlo `certified`.

### Hardening visual de etapa 1 — completado el 22 de agosto de 2026

- scrim fotográfico y superficies inversas separados mediante tokens semánticos;
- Cellar Clay y las otras siete paletas del compositor verificadas con hero de fotografía completa;
- punto focal y zona segura de texto registrados para los seis placeholders del piloto;
- restaurante ensamblado con `hero-media-full-v1` para validar el caso a sangre dentro de la one-page;
- CTA final con copy propio en ambos previews, sin repetir la promesa del hero;
- snapshots full-page de belleza y restaurante a 390 y 1440 px, axe, overflow y `noindex` verificados;
- prueba del hero con las seis imágenes claras, oscuras y de composición irregular.

Los módulos y themes continúan en `candidate`. La evidencia no reemplaza la revisión
humana. El branch de video ya está validado con autoplay silencioso, controles,
poster, loop y fallback estático para movimiento reducido.

### Corte de certificación y auditoría — 22 de agosto de 2026

- los tres heroes, los dos módulos de servicios y `contact-form-demo-v1` ya tienen manifest, schema de props, fixtures normal/extremo y preview aislado;
- Playwright comprueba los cinco anchos canónicos en cuatro themes, axe, movimiento reducido, snapshots, video y el flujo local del formulario;
- existen 69 snapshots versionados y 39 pruebas de browser aprobadas tras el primer lote de hardening;
- los seis módulos conservan estado `candidate` porque falta la aprobación visual humana explícita;
- navigation, galería, reseñas, FAQ, ubicación-horarios, CTA y footer siguen pendientes de paquete completo;
- la auditoría integral está registrada en [`AUDIT-2026-08-22.md`](AUDIT-2026-08-22.md).

### Hardening sistémico, lote 1 — completado el 22 de agosto de 2026

- áreas táctiles de links compartidos ampliadas a 44 px y gate Playwright de mínimo 24 × 24 px en ambos previews y cinco anchos;
- cadencia limitada automáticamente a un eyebrow visible por cada tres secciones;
- índices decorativos retirados de servicios, FAQ y ubicación al no representar una secuencia;
- captions de hero split y galería movidos fuera de la fotografía;
- encabezado de galería apilado y aviso de reseñas convertido en texto funcional;
- axe, responsive, movimiento reducido, snapshots y páginas completas revisados sin cambiar el estado `candidate`.

### Compositor práctico y familia de heroes

- compositor interno en `/lab/` para decidir proyecto ficticio, paleta, tipografía, foto, hero y servicios con preview real y `noindex`;
- configuración reproducible en URL y receta copiable, sin drag-and-drop, persistencia ni publicación;
- las comparaciones extensas permanecen como apoyo en `/lab/type-color/` y `/lab/heroes/`;
- primera ola tipográfica aislada al laboratorio: Fraunces, Source Serif 4, Archivo y Manrope;
- ocho paletas candidatas con pares críticos de contraste verificados;
- tres estructuras de hero registradas: split image, full media y compact banner;
- dos estructuras de servicios disponibles: lista editorial y servicio destacado;
- full media comparte contrato para imagen o video y exige controles, poster y procedencia;
- las nuevas estructuras permanecen `candidate` hasta completar snapshots, revisión visual y aprobación humana.

### Catálogo objetivo del piloto

- 1 navigation;
- 2–3 heroes;
- 2 trust/social-proof;
- 2 services;
- 1 gallery;
- 1 process;
- 1 FAQ;
- 1 location-hours;
- 1 final CTA;
- 1 formulario de demostración;
- 1 footer.

Esto representa entre 12 y 15 módulos. Variantes menores deben resolverse mediante props y tokens; sólo una diferencia estructural justifica otro módulo.

### Paquete obligatorio por módulo

- component;
- manifest y schema de props;
- fixture normal y fixture extremo;
- procedencia y licencia;
- pruebas funcionales, responsive y de accesibilidad;
- estado de madurez y fecha de certificación;
- recipes y themes compatibles.

### Gates de certificación

- schema y HTML semántico;
- teclado, foco y accesibilidad automática;
- anchos 360, 390, 768, 1024 y 1440 px;
- contenido corto, largo, ausente y máximo;
- cero overflow horizontal;
- presupuesto de JavaScript;
- imágenes optimizadas y con procedencia;
- snapshots revisados;
- links y CTAs válidos;
- aprobación humana.
- revisión en todos los themes declarados como compatibles.

### Criterio de salida

La recipe `local-service-lead-gen-v1` sólo referencia módulos `certified`, cada módulo
puede verse de forma aislada en el catálogo y al menos tres direcciones visuales han
sido verificadas sin duplicar módulos por industria.

## Etapa 5 — Cerrar `demo-nails` con recipe certificada

- **Estado:** Preview local implementado; cierre bloqueado por la certificación de Etapa 4
- **Workstreams:** WS-01, WS-02 y WS-04
- **Esfuerzo orientativo:** 1–2 días

### Objetivo

Crear el primer sitio exclusivamente mediante datos, recipe, theme y assets ficticios o autorizados.

### Entregables

- contenido completo de `sites/demo-nails/`;
- selección documentada de recipe y módulos;
- theme inicial sin tokens específicos del negocio dentro de componentes;
- formulario con estados de interfaz, sin capturar datos personales reales;
- aviso visible de concepto no oficial;
- `noindex` en todas las rutas del preview;
- build local completo.

### Regla de validación

Registrar cualquier edición fuera de `sites/demo-nails/`. Si terminar el sitio exige cambiar componentes compartidos, clasificar el cambio como:

- defecto del módulo;
- contrato incompleto;
- nueva capacidad reusable;
- personalización fuera del producto.

### Criterio de salida

El sitio está completo y responsive sin datos del negocio hardcoded en `src/` y sin integraciones reales.

## Etapa 6 — QA y preview controlado

- **Estado:** Bloqueada por Etapa 5
- **Workstream principal:** WS-03
- **Esfuerzo orientativo:** 2–3 días

### Objetivo

Hacer el resultado reproducible, auditable y compartible sin tratarlo como un sitio oficial.

### Pipeline mínimo

1. instalar dependencias de forma reproducible;
2. validar schemas;
3. ejecutar typecheck y tests;
4. construir salida estática;
5. probar rutas, links, formulario demo y `noindex`;
6. ejecutar QA responsive y accesibilidad;
7. verificar presupuestos de calidad;
8. publicar preview y asociarlo al commit.

### Gates del preview

- build limpio desde un checkout nuevo;
- ningún secreto en Git o output;
- `noindex` verificable;
- aviso no oficial visible;
- cero links internos rotos;
- cero violaciones automáticas de accesibilidad definidas como bloqueantes;
- cero overflow en viewports soportados;
- rollback o eliminación documentados;
- README con comandos de reproducción.

### Criterio de salida

Existe un preview controlado ligado a un commit, reproducible por otra persona y con una lista de QA aprobada.

## Etapa 7 — Dry run “ship in one day”

- **Estado:** Bloqueada por Etapa 6
- **Workstream principal:** WS-06
- **Duración:** una jornada cronometrada

### Objetivo

Simular una nueva entrega desde cero utilizando únicamente capacidades existentes. Puede reutilizarse el brief ficticio de `demo-nails`, pero debe reiniciarse el reloj desde intake normalizado hasta preview revisado.

### Presupuesto propuesto

| Etapa | Presupuesto |
| --- | ---: |
| Normalizar datos y assets | 90 min |
| Elegir recipe, theme y módulos | 45 min |
| Adaptar contenido | 180 min |
| Build y QA | 90 min |
| Revisión y correcciones | 60 min |
| Margen operativo | 15 min |
| **Total** | **480 min** |

### Instrumentación mínima

- tiempo por etapa;
- archivos modificados fuera del site;
- fallos de schema, build y QA;
- módulos reemplazados;
- pasos manuales;
- iteraciones de contenido;
- defectos detectados después del preview;
- tiempo de corrección.

### Decisión al terminar

- **Go:** ≤8 horas, cero cambios estructurales específicos y todos los gates pasan.
- **Adjust:** supera el presupuesto o necesita cambios reutilizables corregibles.
- **Stop:** requiere personalización estructural frecuente o los gates impiden una entrega viable.

No automatizar el proceso antes de clasificar el resultado.

## Etapa 8 — Preparación de un piloto real

- **Estado:** Condicionada a resultado `Go` o `Adjust` resuelto
- **Workstreams:** WS-03, WS-04 y WS-06

### Objetivo

Cerrar únicamente las capacidades necesarias para un prospecto real, manteniendo Google Drive como fuente de aprobaciones, clientes, pricing, legal y assets.

### Trabajo permitido después del gate

- checklist técnico de intake y aprobación de assets;
- preview por prospecto sin datos sensibles en Git;
- mecanismo aprobado de feedback;
- formulario real sólo si privacidad, retención y proveedor están decididos;
- proceso de handoff, rollback y eliminación;
- instrumentación de tiempos y defectos.

### Trabajo que sigue fuera de alcance

- panel de clientes;
- generación libre de páginas;
- calendario o ecommerce propios;
- multi-tenancy;
- automatización completa;
- dominio oficial sin venta y aprobación.

## Etapa 9 — Crecimiento gobernado de la biblioteca

- **Estado:** Posterior al piloto

### Condición de entrada

Al menos tres entregas completas deben demostrar que el mismo problema reaparece. Una solicitud única no justifica ampliar el producto base.

### Objetivo inicial

- 30 módulos certificados;
- 3 recipes basadas en jobs de conversión;
- 3 themes certificados;
- deprecación y migración documentadas;
- métricas de uso y calidad por módulo.

### Regla de crecimiento

Crear o importar un módulo sólo cuando:

- resuelve una necesidad repetida;
- no puede expresarse con props o tokens existentes;
- tiene licencia y procedencia claras;
- pasa los gates completos;
- tiene owner y reemplazo previsto.

Una biblioteca de cientos de snippets sin certificación no es un activo del producto.

## Secuencia sugerida de cuatro semanas

Esta secuencia es orientativa; describe orden y capacidad, no una fecha contractual.

| Semana | Foco | Evidencia al cierre |
| --- | --- | --- |
| 1 | ADR-002 y contratos | Stack aceptado, schemas y fixtures probados. |
| 2 | Registry, renderer y slice vertical | Landing mínima generada desde datos. |
| 3 | Núcleo de módulos y `demo-nails` | Recipe completa con módulos certificados. |
| 4 | QA, preview y dry run | Preview ligado a commit y decisión go/adjust/stop. |

Si una etapa no cumple su criterio de salida, la siguiente semana se utiliza para reducir alcance o corregir el gate; no se acumula deuda para conservar el calendario.

## Próximas acciones, en orden

1. Cerrar la decisión tipográfica de los cuatro themes y validar las combinaciones en páginas completas.
2. Implementar entrega responsive de imágenes y medirla con Lighthouse.
3. Crear los paquetes de certificación de navigation, galería, reseñas, FAQ, ubicación-horarios, CTA y footer.
4. Ejecutar la matriz completa de trece módulos, cuatro themes, dos fixtures y cinco anchos; revisar los snapshots.
5. Cambiar a `certified` únicamente cada módulo y theme aprobado explícitamente por una persona.
6. Cerrar `demo-nails`, configurar CI y publicar el preview privado ligado al commit.
7. Ejecutar el dry run y tomar la decisión go/adjust/stop antes de crear más módulos.

## Métricas de fase

| Métrica | Objetivo de validación |
| --- | --- |
| Tiempo total de entrega | ≤8 horas de trabajo en el dry run. |
| Cambios específicos en componentes | 0 para adaptar un negocio válido. |
| Module IDs fuera del registry | 0. |
| Módulos no certificados en recipe | 0. |
| Violaciones automáticas bloqueantes de accesibilidad | 0. |
| Overflow en viewports soportados | 0. |
| Links internos rotos | 0. |
| Assets sin procedencia o aprobación | 0. |
| Previews sin `noindex` o aviso no oficial | 0. |
| Pasos manuales sin documentar | 0. |

## Política de revisión del roadmap

Actualizar este documento cuando:

- un ADR cambie de estado;
- una etapa cumpla o falle su criterio de salida;
- el dry run revele un bloqueo estructural;
- cambie el alcance aprobado del piloto.

Los cambios de fechas, prioridades comerciales, clientes, pricing y aprobaciones se gestionan en Google Drive. El repositorio conserva sólo el impacto técnico mínimo.
