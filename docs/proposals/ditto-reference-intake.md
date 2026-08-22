# Evaluación de Ditto para ingreso de referencias

- **Estado:** Proposed — investigación; no autoriza instalación, API, MCP ni importación
- **Fecha de evaluación:** 2026-08-22
- **Herramienta:** [Ditto](https://www.ditto.site/)
- **Repositorio:** [ion-design/ditto.site](https://github.com/ion-design/ditto.site)

## Resumen ejecutivo

Ditto puede ser útil como acelerador para estudiar y reconstruir una sección cuando
la fuente es propia, está autorizada o tiene una licencia compatible. No debe usarse
como una máquina para convertir cualquier módulo atractivo de Internet en propiedad
de Hier.

La recomendación es hacer un único spike con una referencia autorizada. El output se
mantiene en un sandbox temporal, se analiza y después se reimplementa manualmente
como un módulo Astro original. No se recomienda incorporarlo todavía como dependencia
del repositorio ni conectar su API o MCP.

## Qué hace realmente

Según su documentación oficial, Ditto:

- captura lo renderizado por el navegador, incluyendo DOM, estilos computados,
  layout, assets, fuentes, metadatos e interacciones observables;
- normaliza esa captura y genera un proyecto determinista;
- produce Next.js o Vite React, TypeScript y Tailwind 4 o CSS;
- intenta extraer secciones, componentes, tokens, contenido, responsive y movimiento;
- ofrece CLI local, API REST alojada y un servidor MCP;
- publica el código de la herramienta bajo licencia MIT.

No reconstruye lógica privada, autenticación, pagos, personalización ni JavaScript
arbitrario de terceros. Su propia metodología recomienda validar el resultado con
builds, browser tests y comparaciones visuales.

Fuentes: [sitio oficial](https://www.ditto.site/),
[README](https://github.com/ion-design/ditto.site) y
[metodología](https://github.com/ion-design/ditto.site/blob/main/docs/METHODOLOGY.md).

## Encaje con Hier

### A favor

- Tailwind 4 y TypeScript están cerca del stack aprobado.
- La extracción determinista es más auditable que pedir a un modelo que adivine una
  interfaz desde una descripción.
- Puede revelar tokens, breakpoints y estados difíciles de medir manualmente.
- El proyecto es open source y MIT; un spike local no requiere comprar software.

### En contra

- No genera Astro, por lo que el output no puede entrar directamente en el renderer.
- Puede copiar assets, fuentes y expresiones visuales que Hier no tiene derecho a usar.
- Código limpio y alta fidelidad no equivalen a accesibilidad, licencia ni adecuación
  al producto.
- El API alojado requiere una key secreta y transmite la URL objetivo a un tercero.
- Ejecutar el pipeline local añade Playwright, Chromium y un stack separado que no
  conviene convertir en dependencia del producto antes de demostrar valor.

## Punto legal y de procedencia

La licencia MIT de Ditto permite usar y modificar Ditto. No licencia el sitio que se
captura. La guía oficial de uso responsable exige tener derecho a inspeccionar,
copiar, transformar y operar el contenido objetivo, además de respetar copyright,
marcas, robots, límites y términos del sitio.

Una página pública no equivale a permiso para republicar su diseño, código o assets.
Para una fuente pública no autorizada, el uso aceptable para Hier es investigación
transitoria: identificar el patrón y crear una solución suficientemente distinta,
sin copy, logos, imágenes, fuentes, ilustraciones ni una reproducción sustancial.

Fuente: [Responsible Use de Ditto](https://github.com/ion-design/ditto.site/blob/main/docs/RESPONSIBLE_USE.md).

## Flujo recomendado para un módulo

```text
URL + sección exacta
        ↓
clasificación de derechos A / B / C
        ↓
captura aislada y temporal
        ↓
análisis de patrón, tokens y comportamiento
        ↓
eliminación de identidad y assets ajenos
        ↓
reimplementación propia en Astro
        ↓
manifest + procedencia + fixtures + gates
        ↓
revisión humana → candidate / rejected
```

Ditto no escribe en `src/modules/`. El paso de reimplementación debe conservar la
función útil y cambiar la expresión visual para adaptarla a Hier y al theme objetivo.

## Spike propuesto

Usar una sola sección de un sitio propio, autorizado o con licencia compatible y
medir:

- tiempo de captura;
- fidelidad útil para entender layout y estados;
- tiempo de conversión a Astro;
- cantidad de código y assets que deben descartarse;
- diferencias responsive;
- accesibilidad del resultado;
- JavaScript y dependencias introducidas;
- claridad de procedencia del módulo final.

### Criterio `Go`

Reduce de forma material el tiempo de análisis y permite producir un módulo Astro
propio, trazable y certificable sin incorporar assets o dependencias no aprobados.

### Criterio `Adjust`

Es útil para medir o documentar referencias, pero el output de código requiere más
limpieza de la que ahorra.

### Criterio `Stop`

La conversión a Astro, los riesgos de procedencia o el mantenimiento superan el valor
obtenido frente a captura visual y reimplementación manual.

## Recomendación actual

**Proceed sólo con un spike autorizado y aislado.** No instalar Ditto dentro de Hier,
no conectar el MCP y no solicitar API key hasta elegir la referencia de prueba y
aprobar explícitamente ese experimento.

