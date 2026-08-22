# Research de skills de diseño para Hier — agosto de 2026

- **Estado:** Research; las decisiones adoptadas viven en `ADR-006`
- **Corte de métricas:** 22 de agosto de 2026
- **Alcance:** repositorios públicos, adopción en Skills.sh, licencias, actividad y conversaciones públicas de Reddit

## Pregunta

¿Qué skills públicas pueden elevar la calidad de módulos one-page de Hier y cómo deben integrarse sin diluir el stack, la procedencia ni los gates del producto?

No existe un rating canónico y comparable entre skills. Para evitar un ranking engañoso se usaron cinco señales: ajuste al caso de Hier, adopción, mantenimiento, licencia/procedencia y disciplina de alcance. Stars, installs y votos cambian y pueden ser manipulados; sólo sirven como señales de descubrimiento.

## Muestra con mayor señal

| Repositorio / skill | Señal pública al corte | Licencia | Ajuste a Hier | Decisión |
| --- | ---: | --- | --- | --- |
| [Anthropic `frontend-design`](https://github.com/anthropics/skills) | ~171k stars; ~803k installs de la skill | Mixta por skill; revisar archivo concreto | Alto para dirección visual; amplio | Referencia fuerte, pero el flujo de Hier usa especialistas más acotados ya disponibles. |
| [Leonxlnx `design-taste-frontend`](https://github.com/Leonxlnx/taste-skill) | ~79k stars; ~382k installs | MIT | Muy alto: landing pages y anti-slop | Adoptado para todo `create` y `refine`; no importar reglas de GSAP que contradigan ADR-002. |
| [pbakaus `impeccable`](https://github.com/pbakaus/impeccable) | ~61k stars; ~242k installs de la skill | Apache-2.0 | Muy alto para crítica y polish | Adoptado como pasada acotada posterior a implementación. No instalar hooks ni aceptar cambios de stack implícitos. |
| [emilkowalski `skills`](https://github.com/emilkowalski/skills) | ~31.6k stars; ~222k installs de `emil-design-eng` | MIT | Muy alto para motion y microdetalle | Adoptado para criterio de interacción; `motion` se implementa sólo cuando CSS no basta. |
| [NextLevelBuilder `ui-ux-pro-max`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | ~119k stars; ~324k installs | MIT | Medio-alto como base consultable | Útil para explorar paletas, tipografía y patrones. No se vuelve autoridad de implementación ni se añade al camino obligatorio: es demasiado amplio y no modela el stack Astro de Hier como primera clase. |
| [jakubkrehel `better-interface`](https://github.com/jakubkrehel/skills) | ~4.1k stars; ~8.1k installs | MIT | Alto para revisión disciplinada | Watchlist. Su enfoque de evidencia es bueno, pero hoy se solapa con `impeccable`, accesibilidad y `frontend-design-review`. Reevaluar tras tres certificaciones. |
| [`interface-design`](https://github.com/Dammyjay93/interface-design) | Fuerte conversación puntual en Reddit | Revisar antes de uso | Bajo para la oferta base | No adoptar: su propio alcance excluye landing pages y marketing; puede servir en futuro para herramientas internas. |
| [awesome-ux-skills](https://github.com/tommyjepsen/awesome-ux-skills) | ~165 stars | Revisar cada skill | Medio como catálogo | Sólo discovery. No instalar el conjunto completo ni asumir calidad uniforme. |

Fuentes de installs: [Anthropic](https://skills.sh/anthropics/skills/frontend-design), [taste-skill](https://skills.sh/leonxlnx/taste-skill/design-taste-frontend), [Impeccable](https://skills.sh/pbakaus/impeccable/impeccable), [Emil Kowalski](https://skills.sh/emilkowalski/skills), [UI/UX Pro Max](https://skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max) y [better-interface](https://skills.sh/jakubkrehel/skills/better-interface).

### Puntaje interno de ajuste

Para tomar la decisión se ponderó: ajuste a landings Hier 35%, compatibilidad con Astro/ADR 20%, procedencia y licencia 15%, mantenimiento 15% y evidencia pública 15%. Es una evaluación de Hier, no un rating externo.

| Candidato | Puntaje Hier / 100 | Lectura |
| --- | ---: | --- |
| `impeccable` | 92 | Excelente para el pase de polish; no debe dirigir arquitectura. |
| `design-taste-frontend` | 91 | Mejor ajuste directo a landing pages; requiere filtrar reglas incompatibles con el stack. |
| `emil-design-eng` | 89 | Especialista fuerte y acotado para motion y microdetalle. |
| Anthropic `frontend-design` | 84 | Base oficial con alta señal, pero más amplia y solapada. |
| `better-interface` | 78 | Buen reviewer basado en evidencia; todavía joven y redundante para el piloto. |
| `ui-ux-pro-max` | 75 | Gran catálogo de consulta; demasiada amplitud para gobernar implementación. |
| `interface-design` | 56 | Buena conversación comunitaria, pero scope explícitamente desalineado con marketing. |

## Qué dicen las conversaciones de vibe coding

La evidencia de Reddit es anecdótica, pero los patrones se repiten:

- [`interface-design` en r/vibecoding](https://www.reddit.com/r/vibecoding/comments/1r1vhee/i_condensed_years_of_design_experience_into_a/) recibió mucha atención y reportes positivos sobre elevar el baseline, pero el propio autor admite que todavía necesita dirección; otros comentarios señalan flujos confusos y resultados que aún parecen generados por IA.
- En hilos sobre [integrar una UI de calidad](https://www.reddit.com/r/vibecoding/comments/1vfdig1/), [generar UI que se vea bien](https://www.reddit.com/r/vibecoding/comments/1rmuylp/) y [reconstruir un frontend](https://www.reddit.com/r/vibecoding/comments/1u2s4hc/), la recomendación recurrente es definir el lenguaje visual antes de construir, establecer tokens, trabajar un componente por vez y cerrar un loop de screenshot → defecto → corrección.
- Las recomendaciones comunitarias de skills como `frontend-design` o `impeccable` son útiles como señal, pero no sustituyen ejemplos reales, QA ni una revisión humana.

## GitLab

La búsqueda en el [topic público `skills` de GitLab](https://gitlab.com/explore/projects/topics/skills) encontró repositorios recientes de diseño, pero sin una señal de adopción comparable a los líderes de GitHub/Skills.sh. No se encontró un candidato de landing-page design con mejor ajuste y madurez que el conjunto seleccionado.

Sí apareció una validación arquitectónica útil: la [documentación oficial de GitLab sobre Agent Skills](https://docs.gitlab.com/user/duo_agent_platform/customize/agent_skills/) define skills de proyecto bajo `skills/<skill-name>/SKILL.md` y permite que prevalezcan sobre versiones personales. Esto coincide con mantener la skill canónica dentro del repositorio de Hier.

## Riesgo de adoptar por popularidad

El paper [SWE-Skills-Bench](https://arxiv.org/abs/2603.15401) evaluó 49 skills públicas en tareas de ingeniería: 39 no mejoraron el pass rate y la ganancia media fue 1.2%; varias empeoraron por incompatibilidad de versión o contexto. No evalúa específicamente gusto visual, pero confirma el riesgo de instalar skills amplias sin ajuste y pruebas propias.

Por eso Hier no adopta un “mega pack”. Usa skills pequeñas para funciones definidas y conserva sus contratos como árbitro.

## Arquitectura recomendada

```text
brief y función
  → information-architect (módulo nuevo)
  → design-taste-frontend
  → imagegen / ui-design-system según necesidad
  → emil-design-eng → motion sólo si CSS no basta
  → implementación Astro + tokens Hier
  → impeccable
  → frontend-design-review
  → pruebas + snapshots + aprobación humana
```

`hier-module-designer` es la capa que decide la secuencia y evita conflictos. No copia instrucciones de terceros: conserva enlaces conceptuales y orquesta las skills instaladas.

## Recomendación de adopción

### Adoptar ahora

- `hier-module-designer` como skill propia y canónica.
- `design-taste-frontend`, `impeccable` y `frontend-design-review` para todo create/refine/handoff.
- `information-architect`, `imagegen`, `ui-design-system`, `emil-design-eng` y `motion` mediante criterios explícitos.

### No instalar ahora

- Ningún bundle adicional. Los especialistas ya disponibles cubren el camino crítico y una instalación masiva aumentaría conflicto, tokens y riesgo de supply chain.
- `ui-ux-pro-max` se mantiene como herramienta de consulta opcional, no como regla de build.
- `better-interface` se mantiene en watchlist hasta tener datos de tres módulos certificados.

## Cómo medir si funciona

Durante las próximas tres certificaciones registrar:

1. tiempo desde brief hasta candidato;
2. número de rondas visuales;
3. defectos responsive y de accesibilidad detectados antes del handoff;
4. consistencia entre cuatro themes;
5. cambios solicitados por aprobación humana;
6. dependencias, JS o excepciones evitadas.

La skill se conserva o ajusta por esta evidencia, no por popularidad externa.
