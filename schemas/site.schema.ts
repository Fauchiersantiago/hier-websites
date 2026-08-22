import { z } from "zod";

import {
  kebabIdSchema,
  localeSchema,
  schemaVersionSchema,
  uniqueValues,
  versionedIdSchema,
} from "./common";

const ctaHrefSchema = z.string().superRefine((value, context) => {
  let parsed: URL;

  try {
    parsed = new URL(value);
  } catch {
    context.addIssue({
      code: "custom",
      message: "El CTA debe contener una URL válida",
    });
    return;
  }

  if (!["https:", "http:", "tel:", "mailto:"].includes(parsed.protocol)) {
    context.addIssue({
      code: "custom",
      message: "El CTA sólo admite https, http, tel o mailto",
    });
  }
});

const serviceSchema = z.object({
  id: kebabIdSchema,
  name: z.string().trim().min(2, "El servicio necesita nombre").max(70),
  description: z
    .string()
    .trim()
    .min(10, "La descripción del servicio es demasiado corta")
    .max(240, "La descripción del servicio no puede superar 240 caracteres"),
  attributes: z.array(z.string().trim().min(2).max(60)).max(6).default([]),
});

const daySchema = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

const timeSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "La hora debe usar formato HH:mm de 24 horas");

const openHoursSchema = z
  .object({
    day: daySchema,
    closed: z.literal(false),
    opens: timeSchema,
    closes: timeSchema,
  })
  .refine(({ opens, closes }) => opens < closes, {
    message: "La hora de cierre debe ser posterior a la apertura",
    path: ["closes"],
  });

const closedHoursSchema = z.object({
  day: daySchema,
  closed: z.literal(true),
});

export const siteSchema = z
  .object({
    schemaVersion: schemaVersionSchema,
    siteId: kebabIdSchema,
    siteState: z.enum(["draft", "valid", "preview-ready", "approved", "archived"]),
    locale: localeSchema,
    identity: z.object({
      businessName: z
        .string()
        .trim()
        .min(2, "businessName es obligatorio")
        .max(80, "businessName no puede superar 80 caracteres"),
      businessType: z.string().trim().min(2).max(80),
      tagline: z.string().trim().min(5).max(120),
      fictional: z.literal(true, {
        error: "El fixture del piloto debe estar marcado como ficticio",
      }),
    }),
    content: z.object({
      headline: z.string().trim().min(10).max(100),
      description: z
        .string()
        .trim()
        .min(20)
        .max(280, "La descripción principal no puede superar 280 caracteres"),
      primaryCta: z.object({
        label: z.string().trim().min(2).max(40),
        href: ctaHrefSchema,
      }),
      services: z
        .array(serviceSchema)
        .min(1, "Debe existir al menos un servicio")
        .max(12, "No se admiten más de 12 servicios"),
    }),
    contact: z.object({
      phoneE164: z
        .string()
        .regex(/^\+[1-9]\d{7,14}$/, "El teléfono debe usar formato E.164, por ejemplo +525500000000"),
      phoneDisplay: z.string().trim().min(8).max(30),
      email: z.email("El email de contacto no es válido"),
      website: z.url("El sitio web debe ser una URL válida"),
    }),
    location: z.object({
      addressLine: z.string().trim().min(5).max(120),
      city: z.string().trim().min(2).max(80),
      region: z.string().trim().min(2).max(80),
      postalCode: z.string().trim().min(3).max(12),
      countryCode: z.string().regex(/^[A-Z]{2}$/, "countryCode debe usar ISO 3166-1 alpha-2"),
      hours: z
        .array(z.discriminatedUnion("closed", [openHoursSchema, closedHoursSchema]))
        .min(1)
        .max(7),
    }),
    presentation: z.object({
      recipeId: versionedIdSchema,
      themeId: versionedIdSchema,
      modules: z
        .array(
          z.object({
            slotId: kebabIdSchema,
            moduleId: versionedIdSchema,
          }),
        )
        .min(1)
        .max(30),
      assetRefs: z.array(kebabIdSchema).max(50),
    }),
    preview: z.object({
      noindex: z.boolean(),
      conceptNotice: z.string().trim().min(10).max(140),
    }),
  })
  .superRefine((site, context) => {
    if (site.siteState === "preview-ready" && !site.preview.noindex) {
      context.addIssue({
        code: "custom",
        path: ["preview", "noindex"],
        message: "Un sitio preview-ready debe mantener noindex=true",
      });
    }

    const serviceIds = site.content.services.map((service) => service.id);
    if (!uniqueValues(serviceIds)) {
      context.addIssue({
        code: "custom",
        path: ["content", "services"],
        message: "Los IDs de servicios no pueden repetirse",
      });
    }

    const days = site.location.hours.map((entry) => entry.day);
    if (!uniqueValues(days)) {
      context.addIssue({
        code: "custom",
        path: ["location", "hours"],
        message: "No puede repetirse un día en los horarios",
      });
    }

    const slots = site.presentation.modules.map((module) => module.slotId);
    if (!uniqueValues(slots)) {
      context.addIssue({
        code: "custom",
        path: ["presentation", "modules"],
        message: "Cada slot sólo puede seleccionarse una vez en el piloto",
      });
    }

    if (!uniqueValues(site.presentation.assetRefs)) {
      context.addIssue({
        code: "custom",
        path: ["presentation", "assetRefs"],
        message: "Las referencias de assets no pueden repetirse",
      });
    }
  });

export type Site = z.infer<typeof siteSchema>;
