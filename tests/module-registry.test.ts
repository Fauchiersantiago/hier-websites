import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { siteBundleSchema } from "../schemas/index";
import {
  assertNoIncompatibleModules,
  registeredModuleIds,
  resolveModuleDefinitions,
  type NavigationModuleProps,
} from "../src/renderer/module-definitions";

const readJson = async (filePath: string): Promise<unknown> =>
  JSON.parse(await readFile(filePath, "utf8")) as unknown;

const loadRawBundle = async (): Promise<Record<string, unknown>> => ({
  site: await readJson(resolve("sites/demo-nails/site.json")),
  recipe: await readJson(resolve("sites/demo-nails/recipe.json")),
  assets: await readJson(resolve("sites/demo-nails/assets.json")),
});

const collectSourceFiles = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return collectSourceFiles(path);
      return entry.name.endsWith(".astro") || entry.name.endsWith(".ts") ? [path] : [];
    }),
  );
  return nested.flat();
};

describe("registry determinista", () => {
  it("resuelve exactamente el slice vertical permitido", async () => {
    const bundle = siteBundleSchema.parse(await loadRawBundle());
    const resolved = resolveModuleDefinitions(bundle, {
      "beauty-hero": "/beauty-hero.jpg",
      "beauty-service": "/beauty-service.jpg",
      "beauty-ritual": "/beauty-ritual.jpg",
    });

    expect(resolved.map((module) => module.moduleId)).toEqual(registeredModuleIds);
    expect(resolved.filter((module) => module.jsBudget === "5kb").map((module) => module.moduleId)).toEqual([
      "contact-form-demo-v1",
    ]);
  });

  it("rechaza un module ID que no pertenece a la allowlist", async () => {
    const bundle = siteBundleSchema.parse(await loadRawBundle());
    bundle.site.presentation.modules[1]!.moduleId = "hero-no-registrado-v1";

    expect(() =>
      resolveModuleDefinitions(bundle, { "hero-placeholder": "/fixture.svg" }),
    ).toThrow("Module ID no registrado: hero-no-registrado-v1");
  });

  it("permite omitir slots opcionales y detecta incompatibilidades explícitas", async () => {
    const raw = await loadRawBundle();
    const recipe = raw.recipe as { slots: unknown[] };
    recipe.slots.push({
      slotId: "optional-gallery",
      category: "media",
      required: false,
      minItems: 0,
      maxItems: 1,
      allowedModuleIds: ["gallery-basic-v1"],
    });

    expect(siteBundleSchema.safeParse(raw).success).toBe(true);
    expect(() =>
      assertNoIncompatibleModules(
        ["navigation-basic-v1", "cta-banner-v1"],
        [
          {
            moduleIds: ["navigation-basic-v1", "cta-banner-v1"],
            reason: "Conflicto de prueba",
          },
        ],
      ),
    ).toThrow("Módulos incompatibles");
  });

  it("acepta un segundo fixture sin modificar componentes compartidos", async () => {
    const raw = await loadRawBundle();
    raw.site = await readJson(resolve("tests/fixtures/site-alternate.valid.json"));
    (raw.assets as { siteId: string }).siteId = "demo-alternate";

    const bundle = siteBundleSchema.parse(raw);
    const resolved = resolveModuleDefinitions(bundle, {
      "beauty-hero": "/beauty-hero.jpg",
      "beauty-service": "/beauty-service.jpg",
      "beauty-ritual": "/beauty-ritual.jpg",
    });
    const navigation = resolved.find(
      (module) => module.moduleId === "navigation-basic-v1",
    );

    expect((navigation?.props as NavigationModuleProps).businessName).toBe(
      "Marea Taller Demo",
    );
    expect(resolved).toHaveLength(10);
  });

  it("no contiene datos del negocio ficticio dentro del código compartido", async () => {
    const files = await collectSourceFiles(resolve("src"));
    const source = (await Promise.all(files.map((file) => readFile(file, "utf8")))).join("\n");

    expect(source).not.toContain("Luna Estudio Demo");
    expect(source).not.toContain("+52 55 0000 0000");
    expect(source).not.toContain("hola@luna-demo.example");
    expect(source).not.toContain("Servicio ritual");
  });
});
