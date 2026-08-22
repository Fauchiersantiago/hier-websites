import { z } from "zod";

import {
  httpUrlSchema,
  isoDateTimeSchema,
  localeSchema,
  schemaVersionSchema,
  semverSchema,
  spdxLicenseSchema,
  uniqueValues,
  versionedIdSchema,
} from "./common";
import { moduleCategorySchema } from "./recipe.schema";

const qaGateSchema = z.enum([
  "schema",
  "a11y",
  "responsive",
  "visual",
  "performance",
  "links",
  "license",
]);

const allQaGates = qaGateSchema.options;

export const moduleManifestSchema = z
  .object({
    schemaVersion: schemaVersionSchema,
    id: versionedIdSchema,
    version: semverSchema,
    category: moduleCategorySchema,
    status: z.enum(["experimental", "candidate", "certified", "deprecated"]),
    intent: z.object({
      primary: z.enum(["orient", "differentiate", "prove", "explain", "reduce-objection", "convert", "contact"]),
      secondary: z
        .array(z.enum(["orient", "differentiate", "prove", "explain", "reduce-objection", "convert", "contact"]))
        .max(2),
    }),
    media: z.enum(["none", "image", "gallery", "video", "map", "logo-list"]),
    layout: z.enum(["stack", "split", "grid", "carousel", "timeline", "marquee"]),
    density: z.enum(["compact", "standard", "rich"]),
    interaction: z.enum(["static", "disclosure", "carousel", "form", "embed"]),
    jsBudget: z.object({
      tier: z.enum(["0kb", "5kb", "15kb", "exception"]),
      maxBytes: z.number().int().nonnegative().max(100_000),
      justification: z.string().trim().min(10).max(240).optional(),
    }),
    propsSchemaRef: z.string().trim().min(3).max(160),
    fixtures: z.object({
      normal: z.string().trim().min(3).max(160),
      extreme: z.string().trim().min(3).max(160),
    }),
    compatibility: z.object({
      recipeIds: z.array(versionedIdSchema).min(1).max(20),
      themeIds: z.array(versionedIdSchema).min(1).max(20),
      locales: z.array(localeSchema).min(1).max(10),
    }),
    provenance: z.object({
      sourceType: z.enum(["original", "adapted", "vendor", "generated"]),
      sourceUrl: httpUrlSchema.optional(),
      license: spdxLicenseSchema,
      notice: z.string().trim().min(3).max(500),
      importedAt: isoDateTimeSchema.optional(),
    }),
    qa: z.object({
      gatesPassed: z.array(qaGateSchema).max(allQaGates.length),
      certifiedAt: isoDateTimeSchema.optional(),
    }),
    replacementId: versionedIdSchema.optional(),
  })
  .superRefine((manifest, context) => {
    if (manifest.provenance.sourceType !== "original" && !manifest.provenance.sourceUrl) {
      context.addIssue({
        code: "custom",
        path: ["provenance", "sourceUrl"],
        message: "Un módulo externo debe registrar su URL de procedencia",
      });
    }

    if (manifest.jsBudget.tier === "0kb" && manifest.jsBudget.maxBytes !== 0) {
      context.addIssue({
        code: "custom",
        path: ["jsBudget", "maxBytes"],
        message: "El tier 0kb exige maxBytes=0",
      });
    }

    if (manifest.jsBudget.tier === "exception" && !manifest.jsBudget.justification) {
      context.addIssue({
        code: "custom",
        path: ["jsBudget", "justification"],
        message: "Una excepción de JavaScript necesita justificación",
      });
    }

    if (!uniqueValues(manifest.qa.gatesPassed)) {
      context.addIssue({
        code: "custom",
        path: ["qa", "gatesPassed"],
        message: "Los gates de QA no pueden repetirse",
      });
    }

    if (manifest.status === "certified") {
      const missingGates = allQaGates.filter((gate) => !manifest.qa.gatesPassed.includes(gate));
      if (missingGates.length > 0) {
        context.addIssue({
          code: "custom",
          path: ["qa", "gatesPassed"],
          message: `Un módulo certified necesita todos los gates: faltan ${missingGates.join(", ")}`,
        });
      }

      if (!manifest.qa.certifiedAt) {
        context.addIssue({
          code: "custom",
          path: ["qa", "certifiedAt"],
          message: "Un módulo certified necesita fecha de certificación",
        });
      }
    }

    if (manifest.status === "deprecated" && !manifest.replacementId) {
      context.addIssue({
        code: "custom",
        path: ["replacementId"],
        message: "Un módulo deprecated debe indicar su reemplazo",
      });
    }
  });

export type ModuleManifest = z.infer<typeof moduleManifestSchema>;
