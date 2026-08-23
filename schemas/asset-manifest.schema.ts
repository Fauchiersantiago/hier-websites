import { z } from "zod";

import {
  httpUrlSchema,
  isoDateTimeSchema,
  kebabIdSchema,
  schemaVersionSchema,
  spdxLicenseSchema,
  uniqueValues,
} from "./common";

const relativeAssetPathSchema = z
  .string()
  .min(3)
  .max(180)
  .refine(
    (value) =>
      !value.startsWith("/") &&
      !value.includes("\\") &&
      !value.split("/").includes(".."),
    "La ruta del asset debe ser relativa y no puede salir del directorio del sitio",
  );

const visualCompositionSchema = z.object({
  focalPoint: z.object({
    x: z.number().min(0).max(100),
    y: z.number().min(0).max(100),
  }),
  textSafeZone: z.enum(["start", "center", "end"]),
});

const assetSchema = z
  .object({
    id: kebabIdSchema,
    kind: z.enum(["image", "video", "font", "icon"]),
    path: relativeAssetPathSchema,
    source: z.object({
      type: z.enum(["original", "ai", "stock", "client"]),
      url: httpUrlSchema.optional(),
      label: z.string().trim().min(2).max(120),
      license: spdxLicenseSchema,
    }),
    permission: z.object({
      scope: z.enum(["owned", "licensed", "client-authorized", "preview-only"]),
      evidenceRef: z.string().trim().min(3).max(160).optional(),
    }),
    approval: z.object({
      status: z.enum(["pending", "approved-for-preview", "approved-for-production", "rejected"]),
      reviewedAt: isoDateTimeSchema.optional(),
      reviewerRole: z.enum(["internal-review", "client-approver"]).optional(),
    }),
    decorative: z.boolean(),
    alt: z.string().max(180),
    composition: visualCompositionSchema.optional(),
  })
  .superRefine((asset, context) => {
    if (["image", "video"].includes(asset.kind) && !asset.composition) {
      context.addIssue({
        code: "custom",
        path: ["composition"],
        message: "Una imagen o video debe registrar punto focal y zona segura de texto",
      });
    }

    if (["stock", "client"].includes(asset.source.type) && !asset.source.url) {
      context.addIssue({
        code: "custom",
        path: ["source", "url"],
        message: "Un asset stock o de cliente debe registrar su URL de origen",
      });
    }

    if (asset.permission.scope !== "owned" && !asset.permission.evidenceRef) {
      context.addIssue({
        code: "custom",
        path: ["permission", "evidenceRef"],
        message: "Un asset no propio debe registrar evidencia de permiso",
      });
    }

    if (asset.approval.status.startsWith("approved-") && !asset.approval.reviewedAt) {
      context.addIssue({
        code: "custom",
        path: ["approval", "reviewedAt"],
        message: "Un asset aprobado debe registrar cuándo se revisó",
      });
    }

    if (asset.approval.status.startsWith("approved-") && !asset.approval.reviewerRole) {
      context.addIssue({
        code: "custom",
        path: ["approval", "reviewerRole"],
        message: "Un asset aprobado debe registrar el rol de quien lo revisó",
      });
    }

    if (asset.decorative && asset.alt !== "") {
      context.addIssue({
        code: "custom",
        path: ["alt"],
        message: "Un asset decorativo debe tener alt vacío",
      });
    }

    if (!asset.decorative && asset.alt.trim().length < 5) {
      context.addIssue({
        code: "custom",
        path: ["alt"],
        message: "Un asset informativo necesita alt text descriptivo",
      });
    }
  });

export const assetManifestSchema = z
  .object({
    schemaVersion: schemaVersionSchema,
    siteId: kebabIdSchema,
    assets: z.array(assetSchema).max(100),
  })
  .superRefine((manifest, context) => {
    const ids = manifest.assets.map((asset) => asset.id);
    if (!uniqueValues(ids)) {
      context.addIssue({
        code: "custom",
        path: ["assets"],
        message: "Los IDs de assets no pueden repetirse",
      });
    }

    const paths = manifest.assets.map((asset) => asset.path);
    if (!uniqueValues(paths)) {
      context.addIssue({
        code: "custom",
        path: ["assets"],
        message: "Las rutas de assets no pueden repetirse",
      });
    }
  });

export type AssetManifest = z.infer<typeof assetManifestSchema>;
