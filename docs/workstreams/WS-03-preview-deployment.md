# WS-03: Preview y deployment

- **Estado:** Definición lista; Cloudflare Pages aprobado y configuración pendiente
- **Objetivo:** Compartir un preview funcional sin presentarlo como sitio oficial.

## Entregables

- build reproducible;
- mecanismo de preview;
- `noindex` verificable;
- etiqueta visible de concepto no oficial;
- configuración de secretos fuera de Git;
- checklist de publicación y rollback.

## Criterios de aceptación

- El preview no es indexable.
- No expone secretos ni datos reales sensibles.
- Cada build puede asociarse a una versión del repositorio.
- Las instrucciones de reproducción están en `README.md`.

## Fuera de alcance

Dominio real del cliente, producción oficial, arquitectura multi-tenant y automatización completa.
