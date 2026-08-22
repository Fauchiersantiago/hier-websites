import { z } from "zod";

import { assetManifestSchema } from "./asset-manifest.schema";
import { recipeSchema } from "./recipe.schema";
import { siteSchema } from "./site.schema";

export const siteBundleSchema = z
  .object({
    site: siteSchema,
    recipe: recipeSchema,
    assets: assetManifestSchema,
  })
  .superRefine(({ site, recipe, assets }, context) => {
    if (site.presentation.recipeId !== recipe.id) {
      context.addIssue({
        code: "custom",
        path: ["site", "presentation", "recipeId"],
        message: `La configuración solicita ${site.presentation.recipeId}, pero la recipe cargada es ${recipe.id}`,
      });
    }

    if (!recipe.allowedThemeIds.includes(site.presentation.themeId)) {
      context.addIssue({
        code: "custom",
        path: ["site", "presentation", "themeId"],
        message: `El theme ${site.presentation.themeId} no está permitido por la recipe`,
      });
    }

    if (site.siteId !== assets.siteId) {
      context.addIssue({
        code: "custom",
        path: ["assets", "siteId"],
        message: `El manifest de assets pertenece a ${assets.siteId}, no a ${site.siteId}`,
      });
    }

    if (site.presentation.modules.length > recipe.maxTotalModules) {
      context.addIssue({
        code: "custom",
        path: ["site", "presentation", "modules"],
        message: `La recipe permite como máximo ${recipe.maxTotalModules} módulos`,
      });
    }

    recipe.slots.forEach((slot) => {
      const selections = site.presentation.modules.filter(
        (selection) => selection.slotId === slot.slotId,
      );

      if (selections.length < slot.minItems) {
        context.addIssue({
          code: "custom",
          path: ["site", "presentation", "modules"],
          message: `El slot ${slot.slotId} necesita al menos ${slot.minItems} módulo(s)`,
        });
      }

      if (selections.length > slot.maxItems) {
        context.addIssue({
          code: "custom",
          path: ["site", "presentation", "modules"],
          message: `El slot ${slot.slotId} admite como máximo ${slot.maxItems} módulo(s)`,
        });
      }
    });

    site.presentation.modules.forEach((selection, index) => {
      const slot = recipe.slots.find((candidate) => candidate.slotId === selection.slotId);

      if (!slot) {
        context.addIssue({
          code: "custom",
          path: ["site", "presentation", "modules", index, "slotId"],
          message: `El slot ${selection.slotId} no existe en la recipe`,
        });
        return;
      }

      if (!slot.allowedModuleIds.includes(selection.moduleId)) {
        context.addIssue({
          code: "custom",
          path: ["site", "presentation", "modules", index, "moduleId"],
          message: `El módulo ${selection.moduleId} no está permitido en el slot ${selection.slotId}`,
        });
      }
    });

    const assetsById = new Map(assets.assets.map((asset) => [asset.id, asset]));
    site.presentation.assetRefs.forEach((assetId, index) => {
      const asset = assetsById.get(assetId);

      if (!asset) {
        context.addIssue({
          code: "custom",
          path: ["site", "presentation", "assetRefs", index],
          message: `El asset ${assetId} no existe en el manifest`,
        });
        return;
      }

      const isApprovedForPreview = [
        "approved-for-preview",
        "approved-for-production",
      ].includes(asset.approval.status);

      if (site.siteState === "preview-ready" && !isApprovedForPreview) {
        context.addIssue({
          code: "custom",
          path: ["assets", "assets", assets.assets.indexOf(asset), "approval", "status"],
          message: `El asset ${assetId} no está aprobado para preview`,
        });
      }

      if (site.siteState === "approved" && asset.approval.status !== "approved-for-production") {
        context.addIssue({
          code: "custom",
          path: ["assets", "assets", assets.assets.indexOf(asset), "approval", "status"],
          message: `El asset ${assetId} no está aprobado para producción`,
        });
      }
    });
  });

export type SiteBundle = z.infer<typeof siteBundleSchema>;

export const formatValidationIssues = (error: z.ZodError): string =>
  error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "bundle";
      return `${path}: ${issue.message}`;
    })
    .join("\n");
