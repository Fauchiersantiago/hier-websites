# Especificación de navegación del catálogo modular

## Tesis de IA

Los operadores piensan en objetos reutilizables —modules, recipes, themes y sites—.
El catálogo se organiza por esos objetos para encontrar una pieza estable con
rapidez; la intención, industria y estilo se mantienen como filtros contextuales.

## Principio organizador

**Object-first.** Las categorías describen qué es la pieza. Las acciones como
previsualizar, certificar, deprecar o ensamblar aparecen dentro de cada objeto.

## Navegación global propuesta

| Label | Destino | Quién lo usa | Motivo |
| --- | --- | --- | --- |
| Primitives | Fundamentos de UI | Ingeniería y diseño | Dependencias básicas compartidas. |
| Modules | Secciones de landing | Operaciones, diseño e ingeniería | Unidad principal de selección y certificación. |
| Recipes | Composiciones permitidas | Operaciones y producto | Convierten módulos en flujos de conversión coherentes. |
| Themes | Tokens visuales | Diseño e ingeniería | Cambian apariencia sin duplicar módulos. |
| Sites | Configuraciones y builds | Operaciones y QA | Contexto de cada demo o cliente. |

## Navegación local

- **Modules:** side navigation por categoría estable; filtros para facets.
- **Recipes:** tabs `Overview`, `Slots`, `Compatibility`, `Reference builds`.
- **Themes:** tabs `Tokens`, `Coverage`, `Reference builds`.
- **Sites:** tabs `Data`, `Recipe`, `Assets`, `Build`, `QA`.
- **Module detail:** tabs `Preview`, `Contract`, `Compatibility`, `QA`, `Provenance`.

## Navegación contextual

- La acción primaria de un módulo candidate es `Run certification`.
- La acción primaria de un módulo certified es `Use in recipe`.
- `Deprecate` y cambios de licencia viven en un menú de riesgo con confirmación.
- Las recipes enlazan a sus módulos permitidos; los módulos muestran recipes
  compatibles sin crear una segunda ruta de ownership.

## Naming

- Navegación y entidades en sustantivos: `Modules`, `Recipes`, `Themes`, `Sites`.
- Acciones en verbos: `Preview`, `Certify`, `Deprecate`, `Build`.
- IDs en inglés, `kebab-case` y sin industria: `hero-split-image-v1`.
- Labels visibles en español claro cuando la interfaz interna esté en español.
- No usar `block`, `section` y `module` como sinónimos: la unidad pública es `module`.
- No usar `template` para recipes. Un template es el sistema completo; una recipe es
  una composición permitida.

## Wayfinding

- El título de detalle comienza por el nombre humano del objeto y muestra su ID.
- Breadcrumbs sólo en detalles: `Modules / Heroes / Split image v1`.
- Estado y última certificación siempre visibles.
- Todo objeto deprecated muestra reemplazo; nunca existe una categoría `Other`.

## Roles propuestos

- **Operator:** selecciona recipes, modules y themes certificados; edita site data.
- **Designer:** crea candidates y revisa cobertura visual.
- **Engineer:** mantiene contratos, renderer, pruebas y dependencias.
- **Approver:** certifica, depreca y aprueba cambios de licencia.

Los permisos son una propuesta para gobernanza; no implican construir cuentas o un
panel en la fase piloto.

## Rutas internas de catálogo

```text
/catalog/modules/
/catalog/modules/{module-id}/
/catalog/recipes/
/catalog/recipes/{recipe-id}/
/catalog/themes/
/catalog/themes/{theme-id}/
/catalog/sites/{site-id}/
```

El catálogo debe llevar `noindex` y quedar fuera del build público de cada site.
