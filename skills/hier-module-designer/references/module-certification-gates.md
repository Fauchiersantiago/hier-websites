# Gates de certificación de módulo

Un módulo sólo puede pasar a `certified` cuando cada gate aplicable tiene evidencia. “Se ve bien” no reemplaza la verificación.

## Contrato y procedencia

- [ ] Module ID, categoría, props y compatibilidad están registrados.
- [ ] Manifest, schema y recipe permanecen sincronizados.
- [ ] Existen fixtures normal y extremo, además de estados corto, largo, ausente y máximo cuando aplican.
- [ ] No hay datos de negocio hardcoded en el componente compartido.
- [ ] Código, fuentes, imágenes y referencias tienen origen, permiso y licencia registrados.
- [ ] No se copiaron assets, copy, marcas o expresión protegida de una referencia pública.

## Diseño y responsive

- [ ] La función y jerarquía se entienden sin depender de decoración o movimiento.
- [ ] El módulo tiene una firma visual deliberada y no reproduce un patrón genérico por defecto.
- [ ] Consume tokens semánticos y funciona en todos los themes declarados compatibles.
- [ ] Fue inspeccionado a 360, 390, 768, 1024 y 1440 px.
- [ ] No existe overflow horizontal, texto cortado ni CTA envuelto de forma accidental.
- [ ] Funciona aislado y dentro de la secuencia real de la one-page.
- [ ] Imágenes, si existen, conservan sujeto y composición en los recortes previstos.

## Accesibilidad e interacción

- [ ] HTML semántico, nombres accesibles y orden de lectura son correctos.
- [ ] El flujo funciona con teclado y el foco es visible.
- [ ] Contraste automático y revisión manual cumplen el estándar vigente.
- [ ] Estados hover, focus, active, disabled, error y success aplicables están resueltos.
- [ ] El movimiento tiene propósito, usa propiedades seguras y respeta `prefers-reduced-motion`.
- [ ] Ninguna información imprescindible existe sólo dentro de una animación.

## Rendimiento y comportamiento

- [ ] Presupuesto de JavaScript y assets está declarado y verificado.
- [ ] Imágenes están optimizadas para entrega y sus originales autorizados permanecen trazables.
- [ ] Links, anchors, CTA y formularios demo funcionan sin transmitir datos reales.
- [ ] Pruebas de schemas, registry, browser, accesibilidad y build aplicables están en verde.
- [ ] `noindex` y aviso de concepto se mantienen en cualquier preview.

## Revisión

- [ ] Se completó una pasada de pulido con `impeccable`.
- [ ] Se completó el handoff con `frontend-design-review`.
- [ ] Snapshots desktop y mobile fueron revisados.
- [ ] Una persona aprobó explícitamente el resultado visual.
- [ ] Estado, fecha y evidencia de certificación quedaron registrados.

