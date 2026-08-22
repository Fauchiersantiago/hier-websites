import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { registeredModuleIds } from "../src/renderer/module-definitions";
import { registeredThemeIds } from "../src/themes/theme-registry";

const indexHtml = await readFile(resolve("dist/index.html"), "utf8");
const catalogHtml = await readFile(resolve("dist/catalog/index.html"), "utf8");
const themeCatalogs = await Promise.all(
  registeredThemeIds.map(async (themeId) => ({
    themeId,
    html: await readFile(resolve("dist/catalog", themeId, "index.html"), "utf8"),
  })),
);
const robots = await readFile(resolve("dist/robots.txt"), "utf8");

const assertIncludes = (source: string, expected: string, description: string): void => {
  if (!source.includes(expected)) {
    throw new Error(`Build inválido: falta ${description}`);
  }
};

assertIncludes(
  indexHtml,
  '<meta name="robots" content="noindex, nofollow, noarchive">',
  "meta robots noindex",
);
assertIncludes(indexHtml, "data-concept-notice", "aviso visible de concepto");
assertIncludes(robots, "Disallow: /", "bloqueo global en robots.txt");

for (const moduleId of registeredModuleIds) {
  assertIncludes(indexHtml, `data-module-id="${moduleId}"`, `módulo ${moduleId}`);
  for (const { themeId, html } of themeCatalogs) {
    assertIncludes(html, `data-module-id="${moduleId}"`, `módulo ${moduleId} en ${themeId}`);
  }
}

for (const { themeId, html } of themeCatalogs) {
  assertIncludes(catalogHtml, `/catalog/${themeId}/`, `enlace de catálogo ${themeId}`);
  assertIncludes(html, `data-theme="${themeId}"`, `theme ${themeId}`);
  assertIncludes(
    html,
    '<meta name="robots" content="noindex, nofollow, noarchive">',
    `noindex en ${themeId}`,
  );
}

for (const [label, html] of [
  ["landing", indexHtml],
  ["matriz", catalogHtml],
  ...themeCatalogs.map(({ themeId, html }) => [themeId, html]),
] as const) {
  if (html.includes("<script")) {
    throw new Error(`Build inválido: ${label} no debe incluir JavaScript de cliente`);
  }
}

const heroAssetMatch = indexHtml.match(/<img src="([^"]+)"/);
if (!heroAssetMatch?.[1]) {
  throw new Error("Build inválido: no se encontró el asset local del hero");
}

if (!heroAssetMatch[1].startsWith("data:image/svg+xml")) {
  await access(resolve("dist", heroAssetMatch[1].replace(/^\//, "")));
}

console.log(
  `✓ Build verificado: ${registeredModuleIds.length} módulos × ${registeredThemeIds.length} themes, noindex, asset local o inline y 0 JS de cliente.`,
);
