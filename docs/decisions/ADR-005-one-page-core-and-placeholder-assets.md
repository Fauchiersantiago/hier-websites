# ADR-005: Núcleo one-page y assets visuales de demostración

- **Estado:** Accepted
- **Fecha de propuesta:** 2026-08-22
- **Fecha de aceptación:** 2026-08-22
- **Aprobación:** explícita del usuario en la tarea de Codex del proyecto
- **Alcance:** recipe de servicios locales, previews ficticios y módulos de etapa 4

## Contexto

Hier necesita demostrar una landing completa y convincente sin convertir el piloto en
un servicio de desarrollo personalizado. La oferta base debe poder explicar el
negocio, mostrar evidencia visual, resolver objeciones y conducir a contacto dentro
de una sola página.

El piloto también necesita imágenes suficientemente cuidadas para evaluar el sistema
visual antes de recibir assets de un cliente. Esas imágenes no deben confundirse con
evidencia de un negocio real ni convertirse en una dependencia difícil de reemplazar.

## Decisión

### Alcance de producto

- Cada entrega de la oferta base es una landing de una sola página.
- La navegación interna utiliza anchors a secciones de esa misma página.
- La integración máxima del producto base es un formulario de contacto.
- Durante el piloto el formulario sólo demuestra interfaz, validación y estados; no
  transmite ni persiste datos personales.
- Booking, pedidos, pagos, ecommerce, paneles, cuentas y calendarios propios quedan
  fuera de alcance. Pueden mostrarse enlaces externos aprobados, pero no se construye
  la integración dentro del template.

### Núcleo funcional aprobado

Además de navigation, hero, services, CTA y footer, la primera recipe completa añade:

1. galería editorial;
2. reseñas o prueba social;
3. preguntas frecuentes;
4. ubicación y horarios;
5. formulario de contacto de demostración.

`process` y `trust facts` permanecen como candidatos condicionales. Sólo se añaden
cuando el negocio necesita explicar un proceso o una credencial que no pueda
comunicarse con los módulos anteriores.

### Imágenes de demostración

- Se permiten imágenes originales generadas con IA para previews ficticios.
- Cada imagen debe registrar proveedor, propósito, procedencia, permiso, estado de
  aprobación y alt text en el manifest de assets.
- Las imágenes generadas se tratan como placeholders de preview, nunca como prueba de
  instalaciones, platos, personal, resultados o clientes reales.
- El preview mantiene `noindex`, aviso visible de concepto ficticio y contenido que no
  atribuye las imágenes a un comercio existente.
- Los assets del cliente sólo reemplazan placeholders después de registrar origen,
  autorización y aprobación.
- Los módulos consumen referencias de assets; no codifican fotografías específicas.

### Calidad visual y rendimiento

- La dirección artística se expresa mediante themes y composición, no duplicando
  módulos por vertical.
- Cada imagen se compone para su función —hero, galería o detalle— y debe responder
  correctamente a recortes móviles y de escritorio.
- El build debe optimizar formatos y dimensiones de entrega sin eliminar el original
  de alta resolución registrado para el preview.
- El formulario puede usar una mejora progresiva mínima para su estado local, con un
  presupuesto explícito y sin llamadas de red.

## Consecuencias

### Positivas

- El demo puede sentirse cercano a un sitio terminado sin esperar assets de cliente.
- Belleza, gastronomía y otros verticales comparten contratos y QA.
- El alcance comercial permanece simple y repetible.
- Las fotografías se pueden sustituir sin reescribir componentes.

### Costos y límites

- Los placeholders no validan la calidad o disponibilidad de assets reales.
- Una reseña ficticia no puede presentarse como testimonio verificable.
- El formulario del piloto no genera leads reales.
- Las imágenes necesitan revisión visual, de rendimiento y de accesibilidad antes de
  entrar en una recipe certificada.

## Alternativas rechazadas

- Crear una colección de módulos completamente distinta por industria.
- Copiar fotos o reseñas públicas sin permiso sólo porque aparecen en Google.
- Incorporar booking, pedidos o pagos a la oferta base.
- Construir varias páginas para resolver información que cabe en la landing.
- Evaluar el diseño únicamente con bloques grises o placeholders abstractos.

## Condiciones de revisión

Revisar esta decisión si el dry run demuestra que:

- cinco módulos adicionales impiden entregar en una jornada;
- el formulario real exige un proveedor, privacidad o retención no decididos;
- una vertical necesita una estructura que no pueda resolverse con la recipe;
- el costo de generar, revisar y optimizar placeholders supera su valor de validación.

