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
| Dirección modular | Propuesta | Investigación en `docs/proposals/modular-landing-system/`; todavía no aprobada. |
| Stack técnico | Completado | `ADR-002` está `Accepted`. |
| Contratos y fixture | Siguiente | Zod 4 es la fuente canónica; JSON Schema será derivado. |
| Renderer y módulos | Habilitado | Comienza después de los contratos y fixtures mínimos. |
| Preview compartible | Habilitado | Cloudflare Pages aprobado; configuración pendiente hasta completar `demo-nails`. |
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

- **Estado:** Siguiente
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

## Etapa 3 — Registry y renderer mínimo

- **Estado:** Bloqueada por Etapa 2
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

## Etapa 4 — Recipe de servicios locales y núcleo certificado

- **Estado:** Bloqueada por Etapa 3
- **Workstream principal:** WS-01
- **Esfuerzo orientativo:** 4–6 días

### Objetivo

Completar la menor biblioteca que permita una landing convincente de servicios locales sin crear una mega colección prematura.

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

### Criterio de salida

La recipe `local-service-lead-gen-v1` sólo referencia módulos `certified`, y cada módulo puede verse de forma aislada en el catálogo.

## Etapa 5 — Ensamblar `demo-nails`

- **Estado:** Bloqueada por Etapas 2 y 4
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

## Próximas diez acciones, en orden

1. Revisar la propuesta `docs/proposals/modular-landing-system/RESEARCH.md`.
2. Elegir las opciones mínimas que debe registrar `ADR-002`.
3. Obtener aprobación explícita y cambiar `ADR-002` a `Accepted`.
4. Definir schemas de `site`, `module-manifest`, `recipe` y `asset-manifest`.
5. Crear fixtures válidos e inválidos de `demo-nails`.
6. Implementar registry, renderer y el slice de cinco módulos.
7. Completar y certificar la recipe de 12–15 módulos.
8. Ensamblar `demo-nails` sin modificar componentes por negocio.
9. Configurar QA y preview controlado.
10. Ejecutar el dry run y tomar la decisión go/adjust/stop.

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
