# ADR-006: Orquestación de skills para diseño y certificación de módulos

- **Estado:** Accepted
- **Fecha de propuesta:** 2026-08-22
- **Fecha de aceptación:** 2026-08-22
- **Aprobación:** explícita del usuario en la tarea de Codex del proyecto
- **Alcance:** módulos reutilizables, catálogo visual y etapa 4

## Contexto

Las skills de diseño pueden mejorar dirección visual, motion, sistemas de tokens y revisión. Sin una secuencia propia también pueden contradecir el stack, aplicar reglas genéricas, añadir dependencias innecesarias o confundir popularidad con evidencia de calidad.

Hier necesita conservar una línea estética exigente y repetible al crear módulos nuevos y al refinar los existentes, sin convertir recomendaciones externas en decisiones técnicas automáticas.

## Decisión

Se crea y versiona `skills/hier-module-designer/` como orquestadora canónica de cualquier trabajo que cree, refine, anime, revise o certifique un módulo.

### Activación obligatoria

Antes de modificar un módulo, el agente debe:

1. leer las fuentes de autoridad del repositorio y los ADR relacionados;
2. leer `skills/hier-module-designer/SKILL.md`;
3. clasificar el trabajo como `create`, `refine` o `certify`;
4. cargar los especialistas que la skill enruta;
5. entregar evidencia de los gates aplicables.

### Especialistas aprobados

- `information-architect`: función, orden y modelo de contenido para módulos nuevos;
- `design-taste-frontend`: dirección visual en todo módulo nuevo o refinado;
- `imagegen`: assets ficticios cuando son necesarios para evaluar composición;
- `ui-design-system`: tokens, themes y contratos visuales compartidos;
- `emil-design-eng`: criterio de microinteracción y motion;
- `motion`: implementación avanzada sólo cuando CSS no basta y el presupuesto lo permite;
- `impeccable`: pasada acotada de pulido después de implementar;
- `frontend-design-review`: revisión final antes del handoff de un candidato o certificado.

No es obligatorio ejecutar todos los especialistas en cada cambio. Sí es obligatorio evaluar su aplicabilidad y registrar por qué se usa u omite cada uno relevante.

### Límites

- La skill de Hier controla la secuencia; la solicitud actual y los ADR controlan el resultado.
- Ninguna skill externa autoriza copiar código o assets, cambiar el stack, instalar hooks, añadir una dependencia, publicar o certificar automáticamente.
- No se actualizan skills externas de forma silenciosa. Una actualización material requiere revisar procedencia, licencia, contenido y compatibilidad.
- No se incorporan colecciones completas por popularidad. Se adopta la menor combinación que produzca una mejora verificable.
- La certificación exige pruebas, inspección visual y aprobación humana según `ADR-004` y el roadmap.

### Investigación de mercado

La evaluación inicial queda en `docs/proposals/design-skill-market-research-2026-08.md`. Las métricas de popularidad se tratan como señales de descubrimiento, no como validación técnica.

## Consecuencias

### Positivas

- El nivel de diseño deja de depender de recordar una lista informal de prompts.
- Brief, implementación, motion, revisión y certificación tienen una secuencia repetible.
- El conocimiento externo complementa el sistema sin gobernarlo.
- La regla queda versionada y puede verificarse mediante pruebas del repositorio.

### Costos y límites

- Crear un módulo exige una pequeña inversión previa en brief y evidencias.
- Algunas tareas requerirán leer varias skills especialistas.
- La calidad visual sigue necesitando juicio humano; la automatización no garantiza gusto.

## Alternativas rechazadas

- Instalar todos los repositorios populares y dejar que se activen a la vez.
- Usar estrellas, instalaciones o votos como criterio único de adopción.
- Mantener el flujo sólo en memoria o en una conversación de Codex.
- Copiar contenido de terceros dentro de la skill propia.

## Condición de revisión

Revisar después de certificar tres módulos con el flujo o si el coste de aplicación supera su mejora observable. Comparar defectos encontrados, rondas de corrección, accesibilidad, consistencia entre themes y tiempo total.

