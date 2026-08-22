import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  contactFormDemoPropsSchema,
  heroSplitImagePropsSchema,
  moduleManifestSchema,
  servicesGridPropsSchema,
} from "../schemas/index";

const modules = [
  {
    directory: "src/modules/heroes/hero-split-image-v1",
    schema: heroSplitImagePropsSchema,
  },
  {
    directory: "src/modules/services/services-grid-v1",
    schema: servicesGridPropsSchema,
  },
  {
    directory: "src/modules/contact/contact-form-demo-v1",
    schema: contactFormDemoPropsSchema,
  },
] as const;

const readJson = async (filePath: string): Promise<unknown> =>
  JSON.parse(await readFile(resolve(filePath), "utf8")) as unknown;

describe("evidencia de certificación de módulos", () => {
  for (const module of modules) {
    it(`valida manifest y fixtures de ${module.directory}`, async () => {
      const manifest = moduleManifestSchema.parse(
        await readJson(`${module.directory}/manifest.json`),
      );

      expect(manifest.status).toBe("candidate");
      await access(resolve(manifest.propsSchemaRef));

      const normal = await readJson(manifest.fixtures.normal);
      const extreme = await readJson(manifest.fixtures.extreme);

      expect(module.schema.safeParse(normal).success).toBe(true);
      expect(module.schema.safeParse(extreme).success).toBe(true);
    });
  }

  it("rechaza props incompletas antes de renderizar", () => {
    expect(heroSplitImagePropsSchema.safeParse({ headline: "Sin contexto" }).success).toBe(false);
    expect(servicesGridPropsSchema.safeParse({ services: [] }).success).toBe(false);
    expect(contactFormDemoPropsSchema.safeParse({ services: [] }).success).toBe(false);
  });
});
