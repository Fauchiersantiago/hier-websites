# ADR-004: Sistema de themes, catálogo visual e ingreso de referencias

- **Estado:** Accepted
- **Fecha de propuesta:** 2026-08-22
- **Fecha de aceptación:** 2026-08-22
- **Aprobación:** explícita del usuario en la tarea de Codex del proyecto
- **Alcance:** biblioteca modular, etapa 4, dirección visual y mejora continua

## Contexto

La mayoría de los módulos de conversión pueden servir a distintos tipos de negocio,
pero una landing para belleza, hospitalidad o servicios profesionales no debe sentirse
idéntica. La diferenciación visual debe conseguirse sin duplicar componentes por
industria ni introducir estilos específicos de un cliente en el código compartido.

También se necesitan dos capacidades gobernadas:

- evaluar referencias externas que puedan elevar la calidad de los módulos;
- aprender de herramientas y patrones nuevos sin modificar silenciosamente la
  biblioteca certificada.

## Decisión

### Modelo de composición

Una landing se compone mediante:

```text
contenido validado + recipe + módulos + theme + gates de calidad
```

- La `recipe` decide la estructura y el orden permitido.
- Los módulos resuelven funciones reutilizables y no pertenecen a una industria.
- El theme cambia la expresión visual sin cambiar el contrato funcional del módulo.
- Las diferencias estructurales reales justifican un nuevo module ID; las diferencias
  menores se expresan mediante props o tokens.

### Contrato de theme

Cada theme tendrá un ID estable y versionado, estado de madurez y tokens semánticos
para, como mínimo:

- familias, pesos y escala tipográfica por rol;
- colores de canvas, superficies, texto, bordes, acento, señal y estados;
- espaciado, ancho de contenido y densidad;
- radios, bordes y sombras;
- botones, links, inputs y foco;
- duración, easing e intensidad de movimiento;
- criterios de tratamiento de imagen y dirección artística.

Los componentes consumen nombres semánticos; no incorporan colores, fuentes o
decisiones de una industria. Las tipografías y assets deben tener licencia y
procedencia registradas.

La industria puede sugerir un punto de partida, pero la selección final se basa en
atributos de marca como `refined`, `soft`, `editorial`, `sober`, `direct` o
`energetic`. No se infiere automáticamente una estética a partir del giro del negocio.

### Familias iniciales objetivo

- `neutral-light-v1`: baseline técnico existente y compatibilidad del primer slice.
- `refined-soft-v1`: belleza, wellness y marcas que buscan una expresión delicada.
- `editorial-sober-v1`: hospitalidad, gastronomía y marcas de tono sereno.
- `modern-direct-v1`: servicios profesionales y comercios de comunicación directa.

Estos nombres describen direcciones visuales, no exclusividad por industria. Un theme
sólo pasa a `certified` cuando sus tokens, licencias y matriz de módulos superan los
gates correspondientes.

### Catálogo visual y estándar premium

El catálogo interno debe poder revisar:

- un módulo en todos los themes compatibles;
- todos los módulos dentro de un theme;
- fixtures de contenido corto, normal, largo, ausente y máximo;
- viewports soportados;
- estado `candidate`, `certified`, `deprecated` o `rejected`;
- procedencia, licencia, presupuesto de JavaScript y compatibilidad.

La certificación requiere revisión de jerarquía tipográfica, ritmo espacial,
alineación óptica, tratamiento de imagen, estados interactivos, movimiento,
responsive, accesibilidad y rendimiento. Un efecto visual no compensa un fallo de
claridad, accesibilidad o velocidad.

### Ingreso de referencias externas

Una referencia externa no entra directamente en `src/modules/`. Debe seguir este
proceso:

1. registrar URL, sección exacta, fecha, autor o propietario conocido y motivo;
2. clasificar los derechos de uso;
3. capturar o analizar en un workspace temporal y aislado;
4. separar patrón funcional de la expresión protegida de la fuente;
5. eliminar logos, copy, fotografías, ilustraciones, fuentes y assets no autorizados;
6. reimplementar de forma propia en Astro y con los tokens de Hier;
7. documentar procedencia, licencia y transformaciones;
8. ejecutar todos los gates antes de considerar el módulo `candidate` o `certified`.

Clasificación de derechos:

- **A — autorizado:** propio, permiso explícito o licencia compatible; se puede usar
  como base dentro de las condiciones de esa autorización.
- **B — referencia pública sin permiso:** sólo análisis transitorio de patrón, layout,
  ritmo o comportamiento; no se incorporan código, assets ni una copia sustancial.
- **C — restringido:** contenido privado, detrás de autenticación, paywall, medidas de
  acceso o con riesgo claro de suplantación; no se captura.

### Ditto

Ditto se acepta como **candidato para un spike técnico aislado**, no como dependencia
del renderer ni como importador automático. Su licencia MIT cubre el software Ditto;
no concede derechos sobre el código, diseño, contenido, fuentes, marcas o assets del
sitio objetivo.

Reglas adicionales:

- usar sólo una URL y sección aprobadas para cada experimento;
- preferir un sitio propio, autorizado o con licencia compatible;
- mantener el output fuera del repositorio hasta completar revisión de derechos;
- tratar Next.js o Vite generado como evidencia temporal, no como código aceptado;
- portar manualmente el patrón a Astro y al contrato de módulos de Hier;
- no guardar API keys, capturas privadas ni assets de terceros en Git;
- no instalar el servicio, habilitar el MCP ni usar la API alojada sin una evaluación
  técnica y una aprobación explícita del experimento.

### Mejora continua

Se establece una función de investigación de diseño y frontend que puede ejecutarse
de forma periódica o bajo demanda. Sus resultados viven en `docs/proposals/` e
incluyen fuentes, fecha, licencia, utilidad, riesgos, costo y recomendación.

La investigación no puede:

- instalar dependencias o servicios por sí sola;
- modificar módulos `certified` automáticamente;
- introducir assets o código sin procedencia;
- cambiar un ADR o un gate de calidad;
- publicar un preview o sitio de cliente.

Toda adopción sigue el flujo `research → proposal → ADR si aplica → spike aislado →
gates → revisión humana`.

## Consecuencias

### Positivas

- La biblioteca puede atender múltiples verticales sin duplicar estructura.
- Los themes permiten variedad visual conservando contratos y QA compartidos.
- La calidad premium se convierte en un estándar verificable, no en gusto informal.
- Las referencias externas pueden aportar valor sin contaminar procedencia o stack.
- La mejora continua queda separada de los cambios de producción.

### Costos y límites

- Cada módulo debe probarse contra más de un theme y fixture.
- La matriz visual incrementa el trabajo de certificación.
- Adaptar output de herramientas externas a Astro sigue siendo trabajo manual.
- Esta decisión no determina por sí sola que una reproducción sea legal; los derechos
  de cada fuente y asset deben verificarse antes de incorporarlos.

## Alternativas rechazadas

- Un set completo de módulos distinto por industria.
- Elegir theme automáticamente sólo por categoría de negocio.
- Copiar módulos externos de forma pixel-perfect sin autorización.
- Importar directamente código generado por cloners al registry.
- Permitir que un agente actualice producción basándose únicamente en tendencias.

## Condiciones de revisión

Revisar después de probar al menos tres direcciones visuales o si:

- los tokens no permiten diferencias de marca suficientes;
- la matriz hace inviable el objetivo de entrega en una jornada;
- un módulo requiere excepciones frecuentes por industria;
- un spike con Ditto no reduce tiempo o produce riesgos de procedencia difíciles de
  controlar;
- la investigación continua genera más mantenimiento que valor reutilizable.

## Referencias

- <https://www.ditto.site/>
- <https://github.com/ion-design/ditto.site>
- <https://github.com/ion-design/ditto.site/blob/main/docs/RESPONSIBLE_USE.md>

