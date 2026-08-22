import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { z } from "zod";

import {
  assetManifestSchema,
  contactFormDemoPropsSchema,
  heroCompactBannerPropsSchema,
  heroMediaFullPropsSchema,
  heroSplitImagePropsSchema,
  moduleManifestSchema,
  recipeSchema,
  siteBundleSchema,
  siteSchema,
  servicesGridPropsSchema,
  themeSchema,
} from "../schemas/index";

const outputDirectory = resolve("schemas/generated");

const schemas = [
  ["site.schema.json", "https://hier.example/schemas/site.schema.json", siteSchema],
  ["recipe.schema.json", "https://hier.example/schemas/recipe.schema.json", recipeSchema],
  ["theme.schema.json", "https://hier.example/schemas/theme.schema.json", themeSchema],
  [
    "module-manifest.schema.json",
    "https://hier.example/schemas/module-manifest.schema.json",
    moduleManifestSchema,
  ],
  [
    "asset-manifest.schema.json",
    "https://hier.example/schemas/asset-manifest.schema.json",
    assetManifestSchema,
  ],
  [
    "site-bundle.schema.json",
    "https://hier.example/schemas/site-bundle.schema.json",
    siteBundleSchema,
  ],
  [
    "hero-split-image-v1.schema.json",
    "https://hier.example/schemas/hero-split-image-v1.schema.json",
    heroSplitImagePropsSchema,
  ],
  [
    "hero-media-full-v1.schema.json",
    "https://hier.example/schemas/hero-media-full-v1.schema.json",
    heroMediaFullPropsSchema,
  ],
  [
    "hero-compact-banner-v1.schema.json",
    "https://hier.example/schemas/hero-compact-banner-v1.schema.json",
    heroCompactBannerPropsSchema,
  ],
  [
    "services-grid-v1.schema.json",
    "https://hier.example/schemas/services-grid-v1.schema.json",
    servicesGridPropsSchema,
  ],
  [
    "contact-form-demo-v1.schema.json",
    "https://hier.example/schemas/contact-form-demo-v1.schema.json",
    contactFormDemoPropsSchema,
  ],
] as const;

await mkdir(outputDirectory, { recursive: true });

for (const [fileName, id, schema] of schemas) {
  const jsonSchema = z.toJSONSchema(schema, {
    target: "draft-2020-12",
    unrepresentable: "any",
  });

  const document = {
    $id: id,
    ...jsonSchema,
  };

  await writeFile(
    resolve(outputDirectory, fileName),
    `${JSON.stringify(document, null, 2)}\n`,
    "utf8",
  );
}

console.log(`✓ ${schemas.length} JSON Schemas generados desde Zod.`);
