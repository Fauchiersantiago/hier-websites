import { z } from "zod";

import {
  localeSchema,
  schemaVersionSchema,
  semverSchema,
  uniqueValues,
  versionedIdSchema,
  kebabIdSchema,
} from "./common";

export const moduleCategorySchema = z.enum([
  "navigation",
  "heroes",
  "trust",
  "services",
  "media",
  "decision-support",
  "conversion",
  "contact",
  "footer",
]);

const recipeSlotSchema = z
  .object({
    slotId: kebabIdSchema,
    category: moduleCategorySchema,
    required: z.boolean(),
    minItems: z.number().int().min(0).max(5),
    maxItems: z.number().int().min(1).max(5),
    allowedModuleIds: z.array(versionedIdSchema).min(1).max(20),
  })
  .refine(({ minItems, maxItems }) => minItems <= maxItems, {
    path: ["maxItems"],
    message: "maxItems debe ser mayor o igual que minItems",
  });

export const recipeSchema = z
  .object({
    schemaVersion: schemaVersionSchema,
    id: versionedIdSchema,
    version: semverSchema,
    locale: localeSchema,
    allowedThemeIds: z.array(versionedIdSchema).min(1).max(20),
    slots: z.array(recipeSlotSchema).min(1).max(30),
    maxTotalModules: z.number().int().min(1).max(30),
  })
  .superRefine((recipe, context) => {
    const slotIds = recipe.slots.map((slot) => slot.slotId);
    if (!uniqueValues(slotIds)) {
      context.addIssue({
        code: "custom",
        path: ["slots"],
        message: "Los slotId de una recipe no pueden repetirse",
      });
    }

    if (!uniqueValues(recipe.allowedThemeIds)) {
      context.addIssue({
        code: "custom",
        path: ["allowedThemeIds"],
        message: "Los themes permitidos no pueden repetirse",
      });
    }

    recipe.slots.forEach((slot, index) => {
      if (!uniqueValues(slot.allowedModuleIds)) {
        context.addIssue({
          code: "custom",
          path: ["slots", index, "allowedModuleIds"],
          message: "Los módulos permitidos de un slot no pueden repetirse",
        });
      }

      if (slot.required && slot.minItems === 0) {
        context.addIssue({
          code: "custom",
          path: ["slots", index, "minItems"],
          message: "Un slot requerido debe exigir al menos un módulo",
        });
      }
    });
  });

export type Recipe = z.infer<typeof recipeSchema>;
