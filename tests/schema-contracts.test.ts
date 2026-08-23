import { readFile, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  formatValidationIssues,
  moduleManifestSchema,
  siteBundleSchema,
} from "../schemas/index";
import { loadSiteBundle } from "../src/lib/site-bundle";

type JsonObject = Record<string, unknown>;

type InvalidCase = {
  name: string;
  target: "site" | "recipe" | "assets";
  operation: "set" | "delete";
  path: Array<string | number>;
  value?: unknown;
  expected: string;
};

const readJson = async (filePath: string): Promise<unknown> =>
  JSON.parse(await readFile(filePath, "utf8")) as unknown;

const loadRawBundle = async (): Promise<JsonObject> => ({
  site: await readJson(resolve("sites/demo-nails/site.json")),
  recipe: await readJson(resolve("sites/demo-nails/recipe.json")),
  assets: await readJson(resolve("sites/demo-nails/assets.json")),
});

const mutateAtPath = (
  root: JsonObject,
  path: Array<string | number>,
  operation: "set" | "delete",
  value?: unknown,
): void => {
  let cursor: unknown = root;

  for (const segment of path.slice(0, -1)) {
    if (typeof cursor !== "object" || cursor === null) {
      throw new Error(`No se puede recorrer ${path.join(".")}`);
    }
    cursor = (cursor as Record<string | number, unknown>)[segment];
  }

  const finalSegment = path.at(-1);
  if (finalSegment === undefined || typeof cursor !== "object" || cursor === null) {
    throw new Error(`Ruta de mutación inválida: ${path.join(".")}`);
  }

  if (operation === "delete") {
    if (Array.isArray(cursor) && typeof finalSegment === "number") {
      cursor.splice(finalSegment, 1);
    } else {
      delete (cursor as Record<string | number, unknown>)[finalSegment];
    }
    return;
  }

  (cursor as Record<string | number, unknown>)[finalSegment] = value;
};

describe("contratos de datos", () => {
  it("acepta el bundle ficticio de demo-nails y verifica sus archivos", async () => {
    const bundle = await loadSiteBundle(resolve("sites/demo-nails"));

    expect(bundle.site.siteId).toBe("demo-nails");
    expect(bundle.site.preview.noindex).toBe(true);
    expect(bundle.site.identity.fictional).toBe(true);
  });

  it("acepta el segundo preview y gobierna todos los placeholders generados", async () => {
    const bundles = await Promise.all([
      loadSiteBundle(resolve("sites/demo-nails")),
      loadSiteBundle(resolve("sites/demo-restaurant")),
    ]);

    for (const bundle of bundles) {
      expect(bundle.assets.assets).toHaveLength(3);
      for (const asset of bundle.assets.assets) {
        expect(asset.source.type).toBe("ai");
        expect(asset.permission.scope).toBe("preview-only");
        expect(asset.approval.status).toBe("approved-for-preview");
        expect(asset.composition?.focalPoint.x).toBeGreaterThanOrEqual(0);
        expect(asset.composition?.focalPoint.x).toBeLessThanOrEqual(100);
        expect(asset.composition?.focalPoint.y).toBeGreaterThanOrEqual(0);
        expect(asset.composition?.focalPoint.y).toBeLessThanOrEqual(100);
        expect(["start", "center", "end"]).toContain(asset.composition?.textSafeZone);

        const file = await stat(resolve("sites", bundle.site.siteId, asset.path));
        expect(file.size).toBeLessThan(500_000);
      }
    }
  });

  it("acepta un module-manifest candidate completo", async () => {
    const fixture = await readJson(resolve("tests/fixtures/module-manifest.valid.json"));
    expect(moduleManifestSchema.safeParse(fixture).success).toBe(true);
  });

  it("rechaza cada fixture inválido con un mensaje accionable", async () => {
    const cases = (await readJson(
      resolve("tests/fixtures/invalid-cases.json"),
    )) as InvalidCase[];

    expect(cases.length).toBeGreaterThanOrEqual(8);

    for (const invalidCase of cases) {
      const bundle = structuredClone(await loadRawBundle());
      const target = bundle[invalidCase.target];

      if (typeof target !== "object" || target === null) {
        throw new Error(`Target inválido en fixture: ${invalidCase.name}`);
      }

      mutateAtPath(
        target as JsonObject,
        invalidCase.path,
        invalidCase.operation,
        invalidCase.value,
      );

      const result = siteBundleSchema.safeParse(bundle);
      expect(result.success, invalidCase.name).toBe(false);

      if (!result.success) {
        expect(formatValidationIssues(result.error), invalidCase.name).toContain(
          invalidCase.expected,
        );
      }
    }
  });

  it("mantiene los contratos compartidos libres de términos del nicho demo", async () => {
    const schemaFiles = (await readdir(resolve("schemas"))).filter((name) =>
      name.endsWith(".ts"),
    );
    const source = (
      await Promise.all(
        schemaFiles.map((name) => readFile(resolve("schemas", name), "utf8")),
      )
    ).join("\n");

    expect(source).not.toMatch(/nails|manicure|pedicure/i);
  });
});
