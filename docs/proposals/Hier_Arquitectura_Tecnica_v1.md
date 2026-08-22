# Hier Auto Websites — Arquitectura Técnica v1.0

**Estado:** PROPUESTA PARA VALIDACIÓN — cierra los PENDIENTES de la sección 8 y 14 del Master Context Pack v0.1
**Fecha:** Agosto 2026
**Convención:** se mantiene el sistema DECIDIDO / RECOMENDACIÓN / PENDIENTE del Master Context Pack.

---

## 0. Veredicto sobre el Master Context Pack v0.1

**Fortalezas reales del documento:**
- El sistema de estados (DECIDIDO/ACTUAL/HIPÓTESIS/RECOMENDACIÓN/PENDIENTE) es excelente disciplina y casi nadie lo hace.
- El principio "template-first, AI adapta contenido, estructura determinista" es la decisión arquitectónica más importante y ya está tomada correctamente.
- El límite de 30 minutos por preview y la regla de no comprar dominios antes de la venta protegen el margen.
- El gate del piloto tiene criterios de decisión claros (escalar / revisar mensaje / revisar precio / simplificar).

**Contradicciones y huecos detectados:**

1. **Tensión automatización vs. riesgo #10.** El propio documento lista "Automatizar antes de demostrar demanda" como riesgo, pero el objetivo declarado es "automatizar muchísimo". Resolución: automatización por fases (sección 9 de este documento). En el piloto solo se automatiza lo que reduce el tiempo de preview; todo lo demás espera a la primera venta.
2. **Pricing sin resolver.** $7,000 MXN ≈ $370 USD vs. objetivo de ~$600 USD. Es una diferencia de 60%. La arquitectura de este documento está diseñada para que el costo de infraestructura por sitio sea ~$0/mes, de modo que el margen dependa solo de horas, no de suscripciones. Eso te da espacio para validar ambos precios.
3. **El add-on de booking está subespecificado.** "Integrar herramienta existente del cliente" es correcto como default, pero el modelo que describes (agenda con cobro parcial de anticipo) necesita una herramienta concreta recomendable cuando el cliente no tiene ninguna. Este documento la define (sección 6).
4. **No existe el esquema `business.json`** que todo lo demás necesita (renderer, prompts de AI, intake). Se define en la sección 4.
5. **El flujo de imágenes tiene política (procedencia/permiso) pero no pipeline.** Se define en la sección 5.
6. **"Página adicional por $1,500 MXN" contradice "una sola página".** Menor, pero hay que decidir si el add-on convierte el producto en multi-página (afecta al renderer). Recomendación: la "página adicional" es una segunda landing independiente (mismo template, otra ruta), nunca navegación multi-página.

---

## 1. Principios de arquitectura

1. **Determinista por defecto, AI en los bordes.** La AI genera *contenido* (copy, sugerencia de paleta, alt-text), nunca *estructura ni código en producción*. Todo output de AI pasa por un humano antes de publicarse.
2. **Un sitio = un archivo de configuración.** Todo lo que distingue a un cliente vive en un solo JSON versionado en Git. El template es código compartido.
3. **Costo marginal por sitio ≈ $0.** Hosting estático gratuito, SSL automático, formularios serverless. El único costo variable real es el dominio (lo paga el cliente).
4. **El cliente es dueño de su dominio; Hier es dueño del código y los templates.** Coincide con la RECOMENDACIÓN del MCP sección 11.
5. **Nada se compra ni se publica sin pago y aprobación escrita.** Los gates de dinero están integrados en el pipeline, no son un paso manual "que no se olvide".

---

## 2. Stack definitivo recomendado (cierra el PENDIENTE de sección 8)

| Capa | Herramienta | Por qué | Costo |
|---|---|---|---|
| Framework / renderer | **Astro + Tailwind CSS** (output 100% estático) | Sitios estáticos ultrarrápidos (Lighthouse 95+ sin esfuerzo), componentes reutilizables, cero JS innecesario. Ideal para landings de conversión. | $0 |
| Repositorio | **GitHub privado (monorepo)** | Ya decidido en el MCP. Templates, configs de clientes, prompts y scripts en un solo lugar con historial. | $0 |
| Hosting | **Cloudflare Pages** | Deploy automático desde GitHub, previews por rama, SSL automático, dominios custom ilimitados, CDN global, plan gratuito muy generoso. | $0 |
| DNS | **Cloudflare** (plan free) | DNS + SSL + protección básica en el mismo panel que el hosting. | $0 |
| Dominios `.com` / `.mx` | Cliente compra en **Namecheap o Cloudflare Registrar** (.com) o **Akky** (.mx), con guía paso a paso de Hier; alternativa: Hier compra como agente y transfiere | El cliente es titular desde el día uno → cero fricción de ownership. Hier solo administra el DNS delegándolo a Cloudflare. | ~$250–600 MXN/año (paga cliente) |
| Formulario de contacto | **Cloudflare Worker + Turnstile (antispam) + Resend (email)** | Todo dentro del mismo ecosistema: validación, anti-bot invisible, notificación al negocio por email, copia a hoja de registro. Sin backend que mantener. | $0 (Resend free: 100 emails/día) |
| Almacenamiento de submissions | **Cloudflare D1** (SQLite serverless) o, en el piloto, directo a **Google Sheets vía Apps Script webhook** | Auditoría y retención sin montar base de datos. Para 5–20 sitios, Sheets es suficiente y visible para Bernard. | $0 |
| Analítica | **Plausible** (o Cloudflare Web Analytics para $0 absoluto) | Sin cookies → aviso de privacidad más simple; eventos de conversión (clic en WhatsApp, llamada, submit, booking). | $0–9 USD/mes total (no por sitio) |
| Booking (add-on) | **Cal.com + su app de Stripe** cuando el cliente no tiene herramienta; integrar **Fresha/Booksy** si ya la usa | Ver sección 6. | Plan del cliente |
| Pagos de Hier (B2B) | **Stripe México — Payment Links + Subscriptions** | Links de pago para el 50/50 (tarjeta, OXXO, SPEI); suscripción mensual/anual para Hier Care sin desarrollar nada. Alternativa si las comisiones pesan: Mercado Pago (más confianza local) o SPEI directo con conciliación manual. | ~3.6% + $3 MXN por transacción con tarjeta |
| Copy con AI | **API de Claude o GPT** con prompts versionados en el repo | Recibe `business.json`, devuelve JSON de copy validado contra schema. Prompt por nicho + por template. | Centavos por sitio |
| Imágenes AI | **GPT Image (el generador de ChatGPT)** para fondos/texturas/patrones; **Higgsfield** para micro-video hero (image-to-video) como upsell | Ver sección 5. Higgsfield es principalmente video: anima una foto real del negocio, no la inventa. | Suscripciones ~$20–30 USD/mes c/u, solo cuando se necesiten |
| Tipografías | **Google Fonts / Fontshare, auto-hospedadas vía Fontsource** | Licencias libres para uso comercial, cero riesgo legal, mejor rendimiento y privacidad que cargarlas del CDN de Google. Definir 2 fuentes por template (display + texto). | $0 |
| Fotos stock (relleno) | **Unsplash / Pexels** con registro de origen en el Asset log | Solo para bloques secundarios; nunca como identidad del negocio. | $0 |
| Email operativo | **Google Workspace** (ya existente: studio@santiagofauchier.com) | Intake, aprobaciones, notificaciones. | Ya pagado |
| Automatización de flujo | **GitHub Actions** (build/QA/deploy) desde el día 1; **n8n o Make** para orquestar intake→producción desde la venta #3 en adelante | Ver fases en sección 9. | $0 / ~$10 USD/mes |
| QA automático | **Lighthouse CI + checklist humano** (ya definido en el MCP) | Se ejecuta en cada pull request: performance, accesibilidad, SEO técnico, links rotos. | $0 |
| Uptime (Hier Care) | **UptimeRobot** (free) o Better Stack | Justifica el "monitoreo" prometido en Hier Care con evidencia. | $0 |

**Costo fijo total de infraestructura del piloto: ≈ $0–20 USD/mes.** Esto es deliberado: el gate de eficiencia del piloto mide horas, y el margen no debe erosionarse con SaaS antes de la primera venta.

---

## 3. Arquitectura del repositorio

```
hier-websites/  (GitHub privado)
├── templates/
│   ├── glow/          ← template 1: nails/lashes (luminoso, editorial)
│   ├── ritual/        ← template 2: barbería/tattoo (oscuro, contraste)
│   └── atelier/       ← template 3: neutro premium (fallback multi-nicho)
│       ├── src/components/   (Hero, Servicios, Galería, Ubicación, Horarios, CTA, Formulario, Footer)
│       ├── src/tokens.css    (variables: colores, tipografías, radios, espaciado)
│       └── template.config.json  (bloques disponibles, orden permitido, límites de texto)
├── sites/
│   └── {slug-cliente}/
│       ├── business.json     ← ÚNICA fuente de verdad del cliente
│       ├── copy.json         ← output de AI, editado y aprobado
│       └── assets/           (solo assets ya autorizados, con manifest de origen)
├── prompts/
│   ├── copy/{nicho}.md       (prompt de copy versionado por nicho)
│   ├── palette.md            (sugerencia de paleta desde logo/fotos)
│   └── alt-text.md
├── scripts/
│   ├── new-site.mjs          ("crea preview": scaffolding + copy AI + deploy en 1 comando)
│   ├── qa.mjs                (Lighthouse + links + noindex check)
│   └── launch.mjs            (checklist de lanzamiento: quita noindex, verifica dominio/SSL/analytics)
└── .github/workflows/        (build + QA + deploy a Cloudflare Pages)
```

**Modelo de despliegue (piloto):** un proyecto de Cloudflare Pages por cliente. Previews en `{slug}.preview.hier.studio` con `noindex` + header `X-Robots-Tag` + opcionalmente password. Producción en el dominio del cliente. Cuando pases de ~25 sitios, migrar a un solo Worker multi-tenant que sirve por hostname — pero no antes.

---

## 4. Esquema `business.json` (cierra el PENDIENTE "esquema estructurado")

Este esquema alimenta al renderer, a los prompts de AI y al formulario de intake. Es el contrato central del sistema.

```json
{
  "slug": "nails-studio-roma",
  "estado": "preview | produccion | live | archivado",
  "negocio": {
    "nombre_comercial": "", "categoria": "nails|lashes|brows|barberia|tattoo|...",
    "descripcion_corta": "", "anio_fundacion": null, "idiomas": ["es"]
  },
  "contacto": {
    "whatsapp": "", "telefono": "", "email": "", "direccion": "",
    "google_maps_url": "", "instagram": "", "facebook": "", "tiktok": ""
  },
  "horarios": [{ "dias": "lun-vie", "abre": "10:00", "cierra": "19:00" }],
  "servicios": [{ "nombre": "", "descripcion": "", "precio_desde": null, "destacado": false }],
  "cta": {
    "principal": "whatsapp | llamada | booking | formulario",
    "texto": "", "booking_url": null
  },
  "marca": {
    "logo": null, "paleta": { "primario": "", "fondo": "", "acento": "" },
    "tipografia": { "display": "", "texto": "" }, "tono": "cálido | premium | directo"
  },
  "template": { "id": "glow", "version": "1.2.0", "bloques": ["hero","servicios","galeria","ubicacion","cta","formulario"] },
  "seo": { "titulo": "", "descripcion": "", "noindex": true },
  "integraciones": { "analytics_id": "", "booking": null, "form_endpoint": "" },
  "dominio": { "nombre": null, "titular": "cliente", "registrador": null, "estado": "no_comprado" },
  "aprobaciones": { "assets_confirmados": false, "contenido_aprobado": false, "saldo_pagado": false, "aprobado_para_launch": false },
  "auditoria": [{ "fecha": "", "evento": "", "responsable": "" }]
}
```

Reglas: el renderer **falla el build** si `estado=live` y cualquier aprobación es `false`, o si `noindex=true` en producción con saldo pagado. Los gates dejan de depender de memoria humana.

---

## 5. Pipeline de imágenes y video (cierra el PENDIENTE "flujo de imágenes")

**Jerarquía de fuentes (en orden de preferencia):**
1. **Fotos reales del negocio, autorizadas por escrito** — para negocios locales de belleza, la foto real del local y del trabajo convierte más que cualquier imagen generada. Es el estándar.
2. **Stock (Unsplash/Pexels)** — solo para bloques atmosféricos secundarios (texturas, detalles), nunca para representar el trabajo del negocio. Registrar URL de origen y licencia en `assets/manifest.json`.
3. **AI (GPT Image)** — solo para: fondos abstractos, patrones, iconografía, mockups de la fase de *preview* (donde aún no hay assets autorizados). Marcar `origen: "ai"` en el manifest. Nunca generar personas ni "trabajos" falsos del negocio (riesgo reputacional y de confianza directo).
4. **Higgsfield (upsell de video)** — es una plataforma image-to-video: toma una foto real y genera un clip corto con movimiento de cámara cinematográfico. Uso: micro-video de hero de 3–5 segundos a partir de la mejor foto autorizada del cliente. Se vende como add-on nuevo (sugerido: $1,500–2,500 MXN "Hero en movimiento"). Encaja además con tu trabajo previo de micro video banners.

**Pipeline técnico:**
```
foto original → assets/raw/ (nunca se publica)
  → script de optimización (sharp: resize, crop, WebP/AVIF, 3 tamaños responsive)
  → assets/optimized/ + entrada en manifest.json {origen, permiso, transformación, aprobado}
  → build de Astro consume solo assets con aprobado=true
```

**Regla de la fase especulativa (ya en el MCP, ahora con mecanismo):** durante el preview, el manifest permite `permiso: "preview_only"` — el build de producción rechaza cualquier asset con ese flag.

---

## 6. Booking con cobro de anticipo (el "plus" que se vende aparte)

**DECISIÓN PROPUESTA — dos rutas según el cliente:**

**Ruta A — el cliente ya usa Fresha, Booksy, Calendly, etc. (mayoría en nails/lashes):** se integra su enlace o embed. Es su cuenta, su responsabilidad, su suscripción. Precio: el add-on de integración ya documentado ($3,000 MXN). No cambies esto: pelearte con la herramienta que ya usa el negocio es la forma más rápida de perder la venta.

**Ruta B — el cliente no tiene nada y quiere agenda con anticipo:** **Cal.com + su app de Stripe.** Cal.com permite definir tipos de cita con cobro antes de la reunión vía Stripe: el cliente final elige horario, paga el anticipo (p. ej. $200 MXN que se descuentan del servicio) y la cita se confirma. El dinero va directo a la cuenta Stripe **del negocio, no de Hier** — esto es crítico para no convertirte en intermediario de pagos (carga fiscal, disputas, devoluciones).

Alcance del add-on Ruta B: crear la cuenta a nombre del cliente, configurar 3–5 tipos de servicio con duración y anticipo, conectar su Stripe, embeber el widget en la landing, capacitación de 30 min. La suscripción de Cal.com (si requiere plan de pago para esa función) y la cuenta de Stripe son del cliente, igual que el dominio.

**Anti-scope-creep:** Hier configura, no opera. Cambios de disponibilidad, precios de anticipo y disputas son del cliente (o de Hier Care si los contrata, dentro de los 30 min mensuales).

---

## 7. Pagos de Hier (cómo cobras tú)

1. **Anticipo 50%:** Stripe Payment Link enviado por WhatsApp/email al cerrar la llamada. Acepta tarjeta, y puedes habilitar OXXO y SPEI — OXXO cubre a clientes que operan en efectivo (muy común en el nicho) y SPEI es el método más barato para tickets altos. El webhook de "pago recibido" dispara el intake automáticamente (fase 2) o una notificación a tu email (piloto).
2. **Saldo 50%:** segundo Payment Link; `saldo_pagado=true` en `business.json` es requisito de build para launch.
3. **Hier Care:** Stripe Subscriptions ($700 MXN/mes o $7,000 MXN/año). Cobro automático, aviso de fallo de cobro, y pausa de soporte si hay impago — todo sin desarrollar nada.
4. **Facturación (CFDI):** Stripe no emite CFDI. Opciones: Facturama o el portal del SAT manualmente durante el piloto. **Se mantiene tu PENDIENTE de validar con contador** — esta arquitectura no lo sustituye; solo deja el hueco explícito donde se conecta.
5. **Registro:** cada pago se refleja en el Cash Tracker existente. En fase 2, webhook de Stripe → n8n → fila en el tracker.

---

## 8. Flujo end-to-end con herramientas (versión operativa de tu sección 5)

| # | Etapa | Herramienta | Automatización | Gate |
|---|---|---|---|---|
| 1 | Prospección | Google Maps + Sheets (pipeline existente) | Manual en piloto; scraping asistido en fase 2 | 20 prospectos calificados |
| 2 | Investigación | Plantilla de 15 min → borrador de `business.json` | Script convierte notas → JSON | Datos mínimos completos |
| 3 | Preview | `new-site.mjs`: template + copy AI + deploy a `{slug}.preview.hier.studio` | **Automatizado desde el día 1** (aquí vive el límite de 30 min) | noindex activo, marca "concepto no oficial" |
| 4 | Outreach | WhatsApp/IG/email personalizado con link al preview | Plantillas, nunca envío masivo | Máx. 2 follow-ups |
| 5 | Venta | Llamada + Payment Link (50%) | Link pre-generado por script | **Pago recibido** |
| 6 | Intake | Formulario (Tally o Google Forms) → completa `business.json` + carga de assets a Drive | Webhook llena JSON en fase 2 | Autorización escrita de assets |
| 7 | Producción | Editar `copy.json` + assets aprobados + integraciones vendidas | Build/deploy vía GitHub Actions | 1 ronda consolidada |
| 8 | QA | `qa.mjs` (Lighthouse, links, responsive, noindex, analytics) + checklist humano del SOP | Corre en cada PR | Todo verde + aprobación cliente |
| 9 | Cobro saldo | Payment Link (50%) | Webhook marca `saldo_pagado` | **Pago recibido** |
| 10 | Launch | Cliente compra dominio (guía Hier) → DNS a Cloudflare → `launch.mjs` quita noindex y verifica SSL/analytics/producción | Semi-automatizado | `aprobado_para_launch=true` |
| 11 | Handoff | Doc de accesos (dominio, analytics, booking) desde plantilla | Generado desde `business.json` | Cliente confirma recepción |
| 12 | Hier Care | UptimeRobot + suscripción Stripe + log de cambios menores | Alertas automáticas | ≤30 min/mes |

---

## 9. Automatización por fases (resuelve la tensión con el riesgo #10)

**Fase 0 — Piloto (ahora):** automatiza SOLO el preview (`new-site.mjs` + deploy) y el QA (Lighthouse CI). Todo lo demás manual. Razón: el preview es el único cuello de botella con límite duro (30 min) y el QA es el único paso donde un error daña la reputación. 2–3 días de setup, no más.

**Fase 1 — Después de la venta #1:** Payment Links con webhook→email, intake con formulario que llena el JSON, plantilla de handoff generada.

**Fase 2 — Después de la venta #3 (validado el gate del piloto):** n8n orquestando pago→intake→scaffold→notificaciones; scraping asistido de prospección; dashboard simple de pipeline.

**Fase 3 — 25+ sitios:** Worker multi-tenant, panel interno, posible self-service parcial.

**Regla:** ninguna automatización de fase N se construye antes de cumplir el trigger de la fase. Es la traducción operativa de tu propio riesgo #10.

---

## 10. Seguridad, privacidad y ownership (implementación de tu sección 11)

- **Noindex en previews:** meta + `X-Robots-Tag` + subdominio dedicado excluido en robots.txt. Verificado por `qa.mjs`.
- **Aviso de privacidad:** componente estándar en todos los templates, enlazado desde el formulario; texto base revisable por abogado (tu PENDIENTE legal sigue vivo).
- **Datos de formularios:** retención definida (sugerido: 12 meses), sin datos sensibles, consentimiento explícito en el submit.
- **Ownership documentado:** la sección `dominio` + `integraciones` de `business.json` ES el registro de ownership; el doc de handoff se genera desde ahí.
- **Secretos:** API keys solo en GitHub Secrets / variables de Cloudflare, jamás en el repo ni en Drive (coincide con tu RECOMENDACIÓN de sección 11).

---

## 11. Cambios concretos sugeridos al Master Context Pack

1. Sección 8: reemplazar el PENDIENTE de stack por la tabla de la sección 2 de este documento (como RECOMENDACIÓN hasta que Bernard y tú la aprueben → entonces DECIDIDO).
2. Sección 3 (add-ons): añadir "Hero en movimiento (micro-video AI desde foto real): $1,500–2,500 MXN" y "Booking gestionado Cal.com+Stripe (Ruta B): $3,000–4,000 MXN" como HIPÓTESIS de pricing.
3. Sección 4 (Booking): documentar las dos rutas A/B y la regla "el dinero del anticipo va a la cuenta del negocio, nunca a Hier".
4. Sección 9 (datos): sustituir el modelo conceptual por el schema `business.json` como fuente única (Lead y Experiment se quedan en Sheets; el resto vive en el JSON).
5. Sección 12 (riesgos): añadir "dependencia de plan gratuito de un solo proveedor (Cloudflare)" con mitigación: el output es estático estándar, portable a Netlify/Vercel en horas.
6. Sección 14: marcar como propuestas-de-decisión los puntos stack, booking, procesador de pagos, registrador y proveedor de correo con las recomendaciones de este documento.
7. Aclarar el add-on "página adicional": segunda landing independiente, no sitio multi-página.

---

## 12. Qué queda genuinamente PENDIENTE (no lo resuelve la arquitectura)

- Pricing definitivo MXN vs USD 600 → lo responde el piloto, no un documento.
- Tratamiento fiscal, CFDI, entidad que factura → contador (bloquea el primer cobro formal).
- Contratos, orden de trabajo, autorización de assets → abogado.
- Los 3 templates reales del primer nicho → es la siguiente tarea de construcción (estimado: 2–3 días para el primero, 1 día cada siguiente reutilizando componentes).
- 10 prospectos faltantes de nails/lashes/brows → Bernard.

## 13. Plan de construcción sugerido (2 semanas, compatible con tu piloto)

**Semana 1:** repo + template "glow" completo con tokens → `business.json` schema + `new-site.mjs` → formulario Worker+Turnstile+Resend → 2 sitios de prueba ficticios end-to-end → Lighthouse CI.
**Semana 2:** templates "ritual" y "atelier" (reutilizando componentes) → prompts de copy por nicho, probados con 5 negocios reales del pipeline → Payment Links + suscripción Hier Care en Stripe → `qa.mjs` y `launch.mjs` → dry-run completo del flujo 1→11 con un negocio ficticio, cronometrado contra el límite de 30 min.

Al final de la semana 2 tienes el sistema listo para ejecutar el piloto tal como está definido en el MCP, sin haber automatizado nada que dependa de demanda no demostrada.
