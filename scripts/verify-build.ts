import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { registeredModuleIds } from "../src/renderer/module-definitions";
import { registeredThemeIds } from "../src/themes/theme-registry";

const indexHtml = await readFile(resolve("dist/index.html"), "utf8");
const restaurantHtml = await readFile(resolve("dist/restaurant/index.html"), "utf8");
const catalogHtml = await readFile(resolve("dist/catalog/index.html"), "utf8");
const siteDocument = JSON.parse(await readFile(resolve("sites/demo-nails/site.json"), "utf8")) as {
  presentation: { modules: Array<{ moduleId: string }> };
};
const selectedModuleIds = siteDocument.presentation.modules.map((module) => module.moduleId);
const isolatedModuleIds = [
  "hero-split-image-v1",
  "hero-media-full-v1",
  "hero-compact-banner-v1",
  "services-grid-v1",
  "services-featured-list-v1",
  "contact-form-demo-v1",
] as const;
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
assertIncludes(restaurantHtml, "data-concept-notice", "aviso visible de concepto en restaurante");
assertIncludes(robots, "Disallow: /", "bloqueo global en robots.txt");

for (const moduleId of selectedModuleIds) {
  assertIncludes(indexHtml, `data-module-id="${moduleId}"`, `módulo ${moduleId}`);
  assertIncludes(restaurantHtml, `data-module-id="${moduleId}"`, `módulo ${moduleId} en restaurante`);
  for (const { themeId, html } of themeCatalogs) {
    assertIncludes(html, `data-module-id="${moduleId}"`, `módulo ${moduleId} en ${themeId}`);
  }
}

for (const moduleId of isolatedModuleIds) {
  for (const themeId of registeredThemeIds) {
    const isolatedHtml = await readFile(
      resolve("dist/catalog", themeId, moduleId, "normal/index.html"),
      "utf8",
    );
    assertIncludes(
      isolatedHtml,
      `data-module-id="${moduleId}"`,
      `preview aislado de ${moduleId} en ${themeId}`,
    );
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

if (catalogHtml.includes("<script")) {
  throw new Error("Build inválido: la matriz no debe incluir JavaScript de cliente");
}

for (const [label, html] of [
  ["beauty", indexHtml],
  ["restaurante", restaurantHtml],
  ...themeCatalogs.map(({ themeId, html }) => [themeId, html]),
] as const) {
  const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((match) => match[1] ?? "");
  if (scripts.length !== 1) {
    throw new Error(`Build inválido: ${label} debe incluir exactamente el script local del formulario demo`);
  }

  const script = scripts[0] ?? "";
  if (Buffer.byteLength(script, "utf8") > 5_000) {
    throw new Error(`Build inválido: el formulario de ${label} supera el presupuesto de 5 kB`);
  }

  if (/fetch\(|XMLHttpRequest|sendBeacon|WebSocket/.test(script)) {
    throw new Error(`Build inválido: el formulario de ${label} intenta transmitir datos`);
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
  `✓ Build verificado: ${registeredModuleIds.length} módulos registrados, ${selectedModuleIds.length} ensamblados × ${registeredThemeIds.length} themes, dos previews noindex, assets locales y formulario demo bajo 5 kB sin red.`,
);
