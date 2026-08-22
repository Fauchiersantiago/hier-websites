import { access, readFile } from "node:fs/promises";
import { isAbsolute, resolve, sep } from "node:path";

import {
  formatValidationIssues,
  siteBundleSchema,
  type SiteBundle,
} from "../../schemas/index";

export class SiteBundleValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SiteBundleValidationError";
  }
}

const readJson = async (filePath: string): Promise<unknown> => {
  try {
    return JSON.parse(await readFile(filePath, "utf8")) as unknown;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new SiteBundleValidationError(`No se pudo leer ${filePath}: ${reason}`);
  }
};

export const loadSiteBundle = async (siteDirectory: string): Promise<SiteBundle> => {
  const root = resolve(siteDirectory);

  const [site, recipe, assets] = await Promise.all([
    readJson(resolve(root, "site.json")),
    readJson(resolve(root, "recipe.json")),
    readJson(resolve(root, "assets.json")),
  ]);

  const parsed = siteBundleSchema.safeParse({ site, recipe, assets });
  if (!parsed.success) {
    throw new SiteBundleValidationError(formatValidationIssues(parsed.error));
  }

  await Promise.all(
    parsed.data.assets.assets.map(async (asset) => {
      if (isAbsolute(asset.path)) {
        throw new SiteBundleValidationError(
          `assets.${asset.id}.path: la ruta debe ser relativa al sitio`,
        );
      }

      const assetPath = resolve(root, asset.path);
      if (!assetPath.startsWith(`${root}${sep}`)) {
        throw new SiteBundleValidationError(
          `assets.${asset.id}.path: la ruta intenta salir del directorio del sitio`,
        );
      }

      try {
        await access(assetPath);
      } catch {
        throw new SiteBundleValidationError(
          `assets.${asset.id}.path: no existe el archivo ${asset.path}`,
        );
      }
    }),
  );

  return parsed.data;
};
