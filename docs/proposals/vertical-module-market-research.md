# Investigación de mercado para módulos por vertical

- **Estado:** Proposed — investigación; no autoriza implementación
- **Fecha de corte:** 2026-08-22
- **Verticales estudiadas:** hotelería, belleza/wellness y restaurantes
- **ADR aplicables:** `ADR-001-template-first.md` y `ADR-004-theme-system-and-reference-intake.md`
- **Inventario derivado:** `module-market-taxonomy.csv`

## Resumen ejecutivo

La biblioteca no debe organizarse como tres colecciones aisladas llamadas “hotel”,
“salón” y “restaurante”. El modelo con mejor capacidad de reutilización es:

```text
trabajo del visitante + contrato funcional + recipe vertical + theme + media aprobada
```

Los visitantes de los tres verticales intentan completar los mismos cinco trabajos:

1. entender rápidamente qué es el negocio y para quién es;
2. evaluar la oferta, el precio o el valor;
3. comprobar calidad y reducir riesgo;
4. reservar, ordenar, llamar o pedir información;
5. confirmar ubicación, horario, políticas y siguiente paso.

La estructura común puede resolver navegación, hero, prueba, galería, proceso, FAQ,
ubicación, CTA y footer. Sin embargo, el objeto principal que el usuario compara sí
cambia y necesita contratos distintos:

- un hotel vende noches en habitaciones con capacidad, camas, amenities, tarifa y
  disponibilidad;
- un negocio de belleza vende tiempo y resultado mediante servicios con precio,
  duración, especialista y políticas;
- un restaurante vende una experiencia, comida o conveniencia mediante menús,
  categorías, precios, información dietaria, reservas y pedidos.

Por eso la recomendación es un **núcleo compartido**, **recipes orientativas por
modelo de negocio** y un conjunto pequeño de **módulos de oferta especializados**.
No se recomienda hacer que `services-grid-v1` represente también habitaciones y
platos: produciría un contrato genérico difícil de validar y una interfaz menos útil.

## Tesis de arquitectura de información

Los usuarios piensan primero en la tarea que quieren completar —elegir, confiar,
reservar u ordenar— y después en el tipo de negocio. La biblioteca se organiza por
trabajo de conversión; cada recipe vertical selecciona los contratos que responden a
las preguntas reales de ese mercado y mantiene el theme como una decisión de marca,
no como una inferencia automática de industria.

El principio principal es **task-first**. La industria funciona como compatibilidad de
recipe y no como la carpeta primaria del componente.

## Método y límites

La investigación triangula cuatro tipos de señal:

1. reportes y datos de plataformas con volumen de transacciones o encuestas;
2. estudios académicos y guías de Google, W3C, web.dev y Baymard;
3. inventario de sitios operativos con marcas reconocibles;
4. conversaciones de Reddit para detectar fricción y lenguaje espontáneo.

Las cifras de proveedores se tratan como evidencia interesada y los casos publicados
por agencias como resultados auto-reportados, no como experimentos independientes.
Reddit aporta observaciones cualitativas, no representatividad estadística.

La mayoría de las fuentes cuantitativas disponibles cubre Estados Unidos o mercados
internacionales en inglés. Antes de certificar recipes comerciales se debe validar
el resultado con negocios y clientes del mercado geográfico elegido por Hier.

## Señales transversales del mercado

### La landing es una capa de decisión y conversión local

Google expone como información decisiva de un negocio local horarios, dirección,
reseñas, fotos, videos y opciones de servicio; además mide llamadas y solicitudes de
direcciones como acciones locales. Esto respalda que ubicación, horario, contacto y
media auténtica sean parte del núcleo, no contenido secundario.

Fuente: [Google Ads Help — About Local Ads](https://support.google.com/google-ads/answer/3246303?hl=en).

### La integración de la acción importa más que una animación llamativa

La evidencia de los tres verticales converge en la misma fricción: el usuario pierde
intención cuando debe buscar el CTA, iniciar sesión sólo para consultar información,
repetir datos o saltar a una experiencia lenta e inconsistente. Hier debe presentar
la información de decisión antes del handoff y enlazar al proveedor operativo con
una acción clara. El piloto no debe construir un booking engine, POS ni ecommerce.

### La prueba debe ser específica

Una calificación genérica aporta menos que evidencia relacionada con la decisión:
foto real de la habitación, resultado antes/después, plato y descripción, reseña con
contexto, certificación o política relevante. Los módulos de prueba deben aceptar
fuente, fecha, alcance y evidencia; no deben fabricar métricas ni testimonios.

## Hotel: qué necesita el visitante

### Evidencia

- SiteMinder analizó más de 125 millones de reservas de 44,500 hoteles en 2024. Los
  sitios de hotel generaron un valor medio de USD 519 por reserva, más de 60% por
  encima del valor vía OTA, y el reporte insiste en una experiencia de reserva fácil,
  pagos fluidos y seguridad. [SiteMinder Hotel Booking Trends 2025](https://www.siteminder.com/news/siteminder-hotel-booking-trends-2025/).
- Un estudio reciente relaciona calidad funcional del sitio, engagement, reseñas y
  credibilidad percibida con intención de reserva. [Journal of Hospitality and Tourism Technology](https://www.sciencedirect.com/org/science/article/abs/pii/S1756669X2500002X).
- Un caso auto-reportado de O’Rourke/Safara atribuye el avance de 1.33% a 3.65% y
  luego casi 7% de conversión a integrar disponibilidad, precio, tipo de habitación,
  capacidad, camas, amenities y accesibilidad en la experiencia visible. Debe
  interpretarse como evidencia de proveedor, no causalidad independiente.
  [Ashore Resort case study](https://www.orourkehospitality.com/results/guest-experience-design-increases-direct-bookings/).
- The Hoxton mantiene `Find a Room` como acción global y organiza la experiencia
  alrededor de habitaciones, restaurantes, ofertas, reuniones, eventos, agenda y
  preguntas frecuentes. [The Hoxton](https://thehoxton.com/).

### Señal de Reddit

Los hilos revisados repiten dos extremos: viajeros dispuestos a reservar directo y
usuarios que vuelven a una OTA cuando el proceso directo es lento o falla. También
aparecen como criterios recurrentes precio, ubicación, amenities relevantes, fotos
de cada habitación y reseñas recientes.

- [Fricción al reservar directamente](https://www.reddit.com/r/hotels/comments/1o7ojrp/why_is_booking_directly_through_hotel_websites_so/)
- [Qué importa en una landing de hotel](https://www.reddit.com/r/askhotels/comments/1pbjbaj/why_are_most_hotel_landing_pages_look_the_same/)
- [Cómo eligen hoteles los viajeros](https://www.reddit.com/r/travel/comments/186t3xb/how_do_you_choose_your_hotels/)

### Trabajos prioritarios

1. comprobar fechas o encontrar el acceso a disponibilidad sin buscarlo;
2. comparar habitaciones con fotos, precio orientativo, capacidad y features;
3. entender ubicación y relación con el destino;
4. verificar amenities, políticas y accesibilidad relevantes;
5. comprobar valor de reservar directo, ofertas y confianza;
6. descubrir experiencias, gastronomía o eventos que elevan la estancia.

### Recipe propuesta: `hotel-direct-booking-v1`

```text
navigation + booking action
→ hero media + ubicación + promesa
→ booking entry / availability handoff
→ room showcase
→ amenities
→ gallery
→ experiences / dining / offers
→ reviews
→ location + neighborhood
→ FAQ / policies
→ final booking CTA
→ footer
```

Eventos, bodas, spa, restaurante y múltiples propiedades son extensiones
condicionales. No todo hotel necesita todas.

## Belleza y wellness: qué necesita el cliente

### Evidencia

- Zenoti encuestó a más de 1,400 consumidores en 2025 sobre comportamiento de
  reserva, gasto, lealtad y experiencia. Su benchmark reporta que 80% de clientes de
  salón y spa quiere reservar por móvil y que los negocios de mayor facturación
  presentan una tasa de reserva online 61% mayor que el promedio.
  [Zenoti Consumer Survey](https://www.zenoti.com/resources/salon-and-spa-consumer-survey-results) y
  [Zenoti industry benchmarks](https://www.zenoti.com/thecheckin/beauty-wellness-industry-statistics-2025).
- Una investigación anterior de Phorest, útil como señal direccional, encontró que
  ubicación/contacto/horarios encabezaban las necesidades (56%), seguidos por
  servicios y precios (40%). También destacó reseñas (46%), antes/después (36%),
  reserva online (32%) y explicaciones de tratamientos (29%).
  [Phorest salon website research](https://www.phorest.com/us/blog/customers-tell-us-what-they-want-to-see-salon-website/).
- Heyday muestra un patrón operativo actual: oferta inicial, reserva persistente,
  servicios, método, especialistas, prueba cuantificada, transformaciones, reseñas,
  membresía y selector de ubicación. Usa una animación para explicar progreso, no
  para sustituir información crítica. [Heyday Skincare](https://www.heydayskincare.com/).
- Un caso auto-reportado de Terris atribuye 180% más consultas en tres meses a un
  rediseño con reserva integrada, WhatsApp, prueba y posicionamiento premium. La cifra
  no cuenta con validación independiente.
  [Perfect Style Salon case study](https://terris.sg/portfolio/perfect-style-salon).

### Señal de Reddit

Propietarios y profesionales enfatizan que el sitio debe explicar y generar confianza
mientras el software especializado gestiona agenda, pagos, recordatorios y políticas.
Entre clientes y dueños se repiten servicios con precios o rangos, trabajo real,
ubicación, horas, reseñas, FAQ y un botón de reserva evidente. También aparece rechazo
a crear otra cuenta sólo para reservar.

- [Web para estilista independiente](https://www.reddit.com/r/smallbusiness/comments/1ujptd3/what_is_the_best_website_builder_for_independent/)
- [Booking para spa y fricción de cuentas](https://www.reddit.com/r/smallbusiness/comments/192l3wi/booking_system_for_a_spa/)
- [Qué debe resolver una web de salón](https://www.reddit.com/r/smallbusiness/comments/1upnr1r/best_web_hosting_for_small_business_what_would/)

### Trabajos prioritarios

1. comprender servicios, precio/rango, duración y resultado esperado;
2. ver prueba visual auténtica del trabajo;
3. elegir especialista cuando esa elección afecta el servicio;
4. reservar desde móvil, incluyendo fuera del horario del negocio;
5. conocer preparación, cuidado posterior, cancelación y tardanza;
6. confirmar ubicación, horario y forma de contacto;
7. evaluar membresía, paquete, primera visita u oferta cuando exista.

### Recipe propuesta: `beauty-appointment-v1`

```text
navigation + book action
→ hero image / short controlled media
→ detailed service menu
→ trust facts
→ before & after / portfolio
→ process / what to expect
→ reviews
→ team / specialists (conditional)
→ FAQ + policies
→ location + hours
→ final booking CTA
→ footer
```

Para un profesional independiente, equipo y membresía pueden omitirse. Para medspa,
credenciales, seguridad, elegibilidad y consulta previa suben a prioridad crítica.
## Restaurantes: qué necesita el comensal

### Evidencia

- Toast realizó una encuesta ciega a 850 adultos de Estados Unidos en julio de 2025.
  El 65% dijo ir directamente al sitio del restaurante para reservar; 44% encuentra
  menos atractivo el restaurante o abandona cuando reservar es difícil; 45% valora
  una waitlist online. [Toast reservation research](https://pos.toasttab.com/blog/data/restaurant-wait-times-and-reservations-data).
- La National Restaurant Association reportó en 2025 que casi 75% del tráfico de
  restaurantes ocurre fuera del local y que 57% de los adultos había usado pedido
  móvil recientemente. Esto hace que “reservar” no sea el único CTA: según el modelo
  del restaurante puede dominar `Order`, `Pickup` o `Delivery`.
  [2025 Off-Premises Restaurant Trends](https://restaurant.org/research-and-media/media/press-releases/from-trend-to-transformation-off-premises-dining-now-essential-for-restaurant-consumers%2C-operators/).
- Eleven Madison Park prioriza experiencia, modalidades del menú, precio, duración,
  reserva, ubicación, horarios y una FAQ profunda. Dishoom separa cafés, menús,
  reserva, walk-ins y grupos/eventos. Sweetgreen comienza el flujo por ubicación y
  restricciones dietarias. Estos sitios confirman que “restaurante” contiene modelos
  de conversión diferentes.
  [Eleven Madison Park](https://www.elevenmadisonpark.com/ourrestaurant),
  [Dishoom](https://www.dishoom.com/reservations/) y
  [Sweetgreen ordering](https://order-green.sweetgreen.com/).

### Señal de Reddit

La petición más consistente no es una animación: es un menú legible y actual, con
precios, descripciones e información dietaria, sin obligar al visitante a iniciar un
pedido o crear cuenta sólo para consultarlo. Dueños señalan el costo operativo de
mantener precios duplicados, por lo que el contrato debe contemplar fuente y fecha de
actualización o integración futura con POS.

- [“Please post a menu on your website”](https://www.reddit.com/r/restaurantowners/comments/1dxvokp/)
- [Qué busca un dueño/comensal en una sola página](https://www.reddit.com/r/restaurateur/comments/ccc7me/)
- [Debate sobre valor del sitio y menú](https://www.reddit.com/r/restaurantowners/comments/1phkdnc/websites_are_they_worth_it/)

### Trabajos prioritarios

1. ver el menú real, precio, descripción y restricciones relevantes;
2. saber si puede reservar, entrar sin reserva, pedir, recoger o recibir entrega;
3. confirmar ubicación, horario actual y canales de contacto;
4. ver comida y ambiente auténticos;
5. entender especiales, happy hour o eventos vigentes;
6. comprobar reputación, premios o posicionamiento;
7. resolver grupos, private dining y catering cuando aportan ingresos.

### Recipes propuestas

`restaurant-reservation-v1` para full service y fine dining:

```text
navigation + reserve action
→ atmospheric hero
→ menu / dining formats
→ food + space gallery
→ reviews / awards
→ reservation handoff + waitlist note
→ private dining / events (conditional)
→ location + hours
→ FAQ / policies
→ final reservation CTA
→ footer
```

`restaurant-ordering-v1` para quick service, café y takeout:

```text
navigation + order action
→ product-led hero / current offer
→ HTML menu
→ order / pickup / delivery choices
→ popular items + authentic media
→ proof
→ location + hours
→ catering / loyalty / gift (conditional)
→ footer
```

## Taxonomía funcional recomendada

| Familia | Pregunta que responde | Componentes compartidos | Contratos especializados |
| --- | --- | --- | --- |
| Orientación | ¿Qué es, dónde está y qué hago aquí? | navigation, hero, announcement | booking entry, order/reserve split |
| Oferta | ¿Qué puedo comprar o reservar? | services, experience cards | rooms, detailed services, menu sections |
| Valor | ¿Por qué elegirlo? | features, trust facts, offers | amenities, inclusions, dietary signals |
| Prueba | ¿Es tan bueno como dice? | reviews, metrics, press/awards | before/after, room-specific proof |
| Media | ¿Cómo se ve o se siente? | gallery, controlled video | treatment results, room tours, dishes |
| Claridad | ¿Qué ocurrirá y qué debo saber? | process, FAQ, policies | check-in, salon prep, dining rules |
| Local | ¿Cuándo y cómo llego? | location, hours, directions | neighborhood guide, multi-location selector |
| Conversión | ¿Cómo completo la acción? | CTA, inquiry form, mobile action | booking, reservation, ordering handoff |
| Retención | ¿Cómo vuelvo o gasto más? | offer, signup | membership, loyalty, gift, package |

Esta taxonomía evita directorios como `modules/hotel/` llenos de duplicados. Un módulo
compartido declara compatibilidad; sólo el objeto de negocio estructuralmente distinto
obtiene un contrato y module ID especializado.

## Qué construir primero

### P0 — Completar el núcleo certificable del piloto

Conservar los cinco módulos existentes y añadir siete piezas de alta reutilización:

1. `trust-facts-strip-v1`;
2. `reviews-highlight-v1`;
3. `gallery-editorial-v1`;
4. `process-steps-v1`;
5. `faq-disclosure-v1`;
6. `location-hours-split-v1`;
7. `lead-form-demo-v1`.

Esto completa 12 módulos y permite terminar `demo-nails` sin anticipar booking real,
POS o ecommerce. También crea la base compartida necesaria para evaluar verticales.

### P1 — Validar la diferenciación de oferta

Después del dry run del piloto, prototipar un módulo por contrato estructural:

1. `room-showcase-grid-v1` para hotel;
2. `service-menu-detailed-v1` para belleza;
3. `menu-sections-v1` para restaurante;
4. `amenities-feature-grid-v1`;
5. `before-after-results-v1`;
6. `reservation-order-split-v1`;
7. `mobile-action-bar-v1`;
8. `experience-card-grid-v1`.

La prueba de esta ola no es visual solamente: cada módulo debe demostrar que reduce
una pregunta o un paso real del visitante.

### P2 — Sólo cuando el modelo de negocio lo exija

- `events-catering-inquiry-v1`;
- `team-experts-v1`;
- `membership-gift-v1`;
- `neighborhood-guide-v1`;
- `locations-finder-v1`;
- `short-video-reel-v1`;
- `announcement-offer-bar-v1`.

## Política propuesta para foto, video y banners

### Foto

- Es el default del piloto: rápida, controlable y útil en los tres verticales.
- Cada imagen debe responder una pregunta de decisión, no rellenar espacio.
- Hoteles: habitación específica, baño, espacios y contexto de ubicación.
- Belleza: trabajo real, antes/después autorizado, profesional y local.
- Restaurante: platos reales, escala, ambiente y modalidad de servicio.

### Video

- Se usa sólo cuando comunica algo que una imagen no puede: atmósfera, recorrido,
  proceso o transformación temporal.
- Un hero puede aceptar poster estático y video ambiental corto, silencioso,
  optimizado y no esencial; el contenido crítico permanece en HTML.
- El video informativo necesita controles, captions y alternativa adecuada.
- Todo video queda detrás de un presupuesto medido de carga y un gate específico.

web.dev advierte que la compresión y estrategia de carga del video pueden afectar
LCP y tiempos de carga. W3C exige que el movimiento no esencial pueda evitarse y que
la media operable tenga controles apropiados.

- [web.dev — Video performance](https://web.dev/learn/performance/video-performance)
- [W3C — Animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)
- [W3C — Media accessibility requirements](https://www.w3.org/WAI/PF/media-a11y-reqs/)

### Banner animado

- No se adopta un hero carousel automático como patrón base.
- Una oferta temporal puede usar una barra estática o un marquee discreto, pausado y
  redundante; nunca es la única ruta al contenido.
- En móvil no se autorrota contenido promocional.
- Una galería puede ser manual y usar miniaturas o controles visibles.

Baymard reporta problemas de usabilidad en 46% de los carousels auditados y considera
que una sección estática más simple puede rendir igual con menos riesgo.
[Baymard — Homepage carousel UX](https://baymard.com/blog/homepage-carousel).

### Movimiento premium

El movimiento debe crear jerarquía y continuidad, no ruido:

- una animación protagonista y una secundaria como máximo en el primer viewport;
- reveals ligados al ritmo de lectura, no a cada elemento;
- feedback rápido en botones, formularios y selección;
- nada de scroll-jacking, cursor custom o loops decorativos dominantes;
- `prefers-reduced-motion` y pausa cuando exista movimiento continuo;
- CSS primero; Motion sólo si una coreografía certificada lo necesita.

## Patrones que no conviene convertir en módulos

- hero carousel autoplay;
- feed social en vivo como sustituto de una galería curada;
- review feed sin procedencia, moderación ni fallback;
- mapa pesado embebido cuando un bloque estático y `Cómo llegar` resuelven la tarea;
- custom booking engine, POS, ecommerce o calendario propio durante el piloto;
- video genérico de stock usado para simular calidad;
- banner continuo con información esencial;
- un único “mega módulo de cards” para servicios, habitaciones y platos.

## Validación recomendada antes de certificar recipes

1. entrevistar 5–8 clientes o compradores por vertical objetivo;
2. entrevistar al menos 5 operadores por vertical y separar negocio independiente de
   multi-location;
3. probar 8–12 tareas en un tree test sin diseño visual;
4. registrar primer clic, tiempo, dudas y contenido ausente;
5. probar una landing corta y una extensa contra el mismo objetivo;
6. medir CTA principal, llamada, direcciones, handoff a booking/order y abandono;
7. revisar resultados por modelo de negocio, no sólo por industria.

Tareas mínimas de prueba:

- “Encuentra el precio y capacidad de una habitación y empieza a reservar”.
- “Comprueba cuánto dura un servicio y qué política aplica antes de reservar”.
- “Encuentra un plato compatible con una restricción y decide cómo pedirlo”.
- “Confirma si el negocio está abierto y cómo llegar”.
- “Encuentra prueba suficiente para confiar sin salir del sitio”.

## Recomendación

**Proceed con núcleo compartido + recipes + contratos verticales pequeños.** La próxima
implementación debería completar P0. P1 debe comenzar sólo después del dry run y con
un fixture ficticio por vertical; no hace falta crear tres templates ni una biblioteca
gigante antes de validar el flujo.

Esta propuesta necesita aprobación explícita antes de cambiar el roadmap, los schemas
de oferta o el registry de módulos.
