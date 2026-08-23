import { z } from "zod";

import { kebabIdSchema, uniqueValues } from "./common";
import { ctaHrefSchema, serviceSchema } from "./site.schema";

const localAssetPathSchema = z
  .string()
  .trim()
  .min(3)
  .max(240)
  .refine(
    (value) => value.startsWith("/") || /^https?:\/\//.test(value),
    "La imagen debe usar una ruta local absoluta o una URL http(s)",
  );

const heroBasePropsSchema = z.object({
  sectionId: kebabIdSchema.optional(),
  businessType: z.string().trim().min(2).max(80),
  tagline: z.string().trim().min(5).max(120),
  headline: z.string().trim().min(10).max(100),
  description: z.string().trim().min(20).max(280),
  cta: z.object({
    label: z.string().trim().min(2).max(40),
    href: ctaHrefSchema,
  }),
});

const heroImageSchema = z.object({
  src: localAssetPathSchema,
  alt: z.string().trim().min(5).max(180),
  focalPoint: z.object({
    x: z.number().min(0).max(100),
    y: z.number().min(0).max(100),
  }),
  textSafeZone: z.enum(["start", "center", "end"]),
});

export const heroSplitImagePropsSchema = heroBasePropsSchema.extend({
  image: heroImageSchema.omit({ textSafeZone: true }),
  imagePosition: z.enum(["start", "end"]).default("end"),
});

export const heroMediaFullPropsSchema = heroBasePropsSchema.extend({
  media: z.discriminatedUnion("kind", [
    heroImageSchema.extend({ kind: z.literal("image") }),
    z.object({
      kind: z.literal("video"),
      poster: localAssetPathSchema,
      alt: z.string().trim().min(5).max(180),
      focalPoint: z.object({
        x: z.number().min(0).max(100),
        y: z.number().min(0).max(100),
      }),
      textSafeZone: z.enum(["start", "center", "end"]),
      sources: z
        .array(
          z.object({
            src: localAssetPathSchema,
            type: z.enum(["video/mp4", "video/webm"]),
          }),
        )
        .min(1)
        .max(2),
    }),
  ]),
  contentPosition: z.enum(["start", "center", "end"]).default("start"),
});

export const heroCompactBannerPropsSchema = heroBasePropsSchema.extend({
  phone: z.object({
    display: z.string().trim().min(8).max(30),
    href: z.string().startsWith("tel:").max(40),
  }),
  alignment: z.enum(["start", "center"]).default("start"),
});

export const servicesGridPropsSchema = z.object({
  services: z.array(serviceSchema).min(1).max(12),
});

export const contactFormDemoPropsSchema = z
  .object({
    eyebrow: z.string().trim().min(2).max(40),
    title: z.string().trim().min(5).max(90),
    description: z.string().trim().min(20).max(240),
    responseTime: z.string().trim().min(5).max(100),
    privacyNote: z.string().trim().min(15).max(220),
    services: z
      .array(
        z.object({
          id: kebabIdSchema,
          name: z.string().trim().min(2).max(70),
        }),
      )
      .min(1)
      .max(12),
  })
  .superRefine((props, context) => {
    if (!uniqueValues(props.services.map((service) => service.id))) {
      context.addIssue({
        code: "custom",
        path: ["services"],
        message: "Los IDs de servicio no pueden repetirse",
      });
    }
  });

export type HeroSplitImageProps = z.infer<typeof heroSplitImagePropsSchema>;
export type HeroMediaFullProps = z.infer<typeof heroMediaFullPropsSchema>;
export type HeroCompactBannerProps = z.infer<typeof heroCompactBannerPropsSchema>;
export type ServicesGridProps = z.infer<typeof servicesGridPropsSchema>;
export type ContactFormDemoProps = z.infer<typeof contactFormDemoPropsSchema>;
