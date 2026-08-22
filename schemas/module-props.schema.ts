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

export const heroSplitImagePropsSchema = z.object({
  businessType: z.string().trim().min(2).max(80),
  tagline: z.string().trim().min(5).max(120),
  headline: z.string().trim().min(10).max(100),
  description: z.string().trim().min(20).max(280),
  cta: z.object({
    label: z.string().trim().min(2).max(40),
    href: ctaHrefSchema,
  }),
  image: z.object({
    src: localAssetPathSchema,
    alt: z.string().trim().min(5).max(180),
  }),
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
export type ServicesGridProps = z.infer<typeof servicesGridPropsSchema>;
export type ContactFormDemoProps = z.infer<typeof contactFormDemoPropsSchema>;
