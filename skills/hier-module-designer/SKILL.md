---
name: hier-module-designer
description: "Crea, refina, anima, revisa o certifica módulos reutilizables de Hier Auto Websites para landings one-page. Úsala ante cualquier módulo nuevo, mejora visual de un módulo existente, variante estructural, cambio de interacción, evaluación de calidad premium o preparación para pasar de candidate a certified."
---

# Hier Module Designer

Orquesta el trabajo de diseño de módulos sin sustituir las decisiones, contratos ni gates del repositorio.

## Preparar el trabajo

1. Localiza el repositorio de Hier y lee `AGENTS.md`, `docs/START_HERE.md`, `docs/SOURCE_OF_TRUTH.md` y los ADR relacionados completos.
2. Confirma que la implementación está autorizada por un ADR `Accepted`. Trata `docs/proposals/` como investigación no aprobada.
3. Inspecciona el registry, schema, theme, módulo, fixture y recipe afectados antes de editar.
4. Clasifica la tarea como `create`, `refine` o `certify`. Si hay más de una, ejecuta en ese orden.

## Cargar las skills especialistas

Lee completamente cada skill que corresponda antes de usarla. La solicitud actual y los ADR prevalecen si una recomendación externa entra en conflicto.

- En `create`, usa `information-architect` para validar función, orden y modelo de contenido; después usa `design-taste-frontend`.
- En todo `create` o `refine`, usa `design-taste-frontend` para fijar una dirección específica y evitar patrones genéricos.
- Usa `imagegen` cuando una fotografía o imagen placeholder sea necesaria para juzgar composición, recorte o dirección de arte.
- Usa `ui-design-system` cuando cambien tokens, themes, contratos visuales, estados o variantes compartidas.
- Usa `emil-design-eng` cuando existan estados interactivos, microinteracciones o decisiones de movimiento.
- Usa `motion` sólo cuando CSS no resuelva de forma suficiente una interacción aprobada y el módulo pueda respetar su presupuesto de JavaScript.
- Después de implementar, usa `impeccable` para una pasada acotada de pulido.
- Antes del handoff de un módulo candidato o certificado, usa `frontend-design-review` como revisión final independiente de la implementación.

No cargues un especialista por ceremonia. Registra por qué aplicó o por qué no aplicó.

## Diseñar antes de editar

Completa el brief de `references/module-design-brief.md`. Debe dejar claro:

- el trabajo de conversión que cumple el módulo;
- qué decisión ayuda a tomar y qué contenido real necesita;
- su firma visual dentro de cada theme compatible;
- comportamiento mobile-first y casos de contenido extremo;
- papel de imágenes y movimiento;
- clichés o soluciones que deben rechazarse.

Una diferencia de color, tipografía, radio o densidad pertenece al theme o a los tokens. Crea un module ID nuevo sólo cuando cambie de forma material la estructura, jerarquía, comportamiento o contrato.

## Construir el candidato

1. Define o actualiza props, manifest, fixtures normal y extremo y compatibilidad antes de pulir la superficie.
2. Mantén datos de negocio fuera del componente compartido.
3. Consume tokens semánticos. No introduzcas valores específicos de una industria en el módulo.
4. Implementa HTML semántico y responsive desde el viewport más estrecho.
5. Si usa imágenes, registra procedencia, permiso, estado, propósito y alt text. Nunca presentes placeholders como evidencia de un negocio real.
6. Diseña una interacción principal con intención. Evita animar cada elemento por defecto.
7. Prefiere CSS para estados y transiciones simples. Si usa Motion, cárgalo sólo en el módulo, respeta `prefers-reduced-motion` y documenta el presupuesto.

## Inspeccionar y corregir

Trabaja en un ciclo acotado: un módulo, una inspección desktop y mobile, una lista priorizada de defectos y una corrección agrupada. Repite una sola confirmación cuando el cambio lo amerite.

Revisa el módulo aislado y dentro de una página real con:

- todos los themes declarados compatibles;
- contenido corto, normal, largo, ausente y máximo;
- anchos 360, 390, 768, 1024 y 1440 px;
- teclado, foco visible, contraste y movimiento reducido;
- imágenes en sus recortes reales;
- relaciones con los módulos anterior y posterior.

## Certificar

Aplica `references/module-certification-gates.md`. No cambies el estado a `certified` si falta evidencia automática, snapshot revisado o aprobación humana.

Las skills pueden proponer y criticar; no pueden por sí solas aprobar claims, derechos de assets, nuevas dependencias, cambios de stack ni publicación.

## Tratar referencias externas

Sigue `ADR-004-theme-system-and-reference-intake.md`. Registra la fuente y separa el patrón funcional de su expresión protegida. No copies código, copy, marcas, fuentes o assets sin autorización compatible. Reimplementa el patrón de forma propia en Astro y con tokens Hier.

## Entregar

Resume:

- module ID y función;
- modo ejecutado y dirección visual;
- skills usadas y justificación de las omitidas;
- themes y fixtures inspeccionados;
- evidencia automática y visual;
- gates pendientes y estado resultante.
