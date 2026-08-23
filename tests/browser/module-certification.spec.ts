import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const themes = [
  "neutral-light-v1",
  "refined-soft-v1",
  "editorial-sober-v1",
  "modern-direct-v1",
] as const;

const modules = [
  "hero-split-image-v1",
  "hero-media-full-v1",
  "hero-compact-banner-v1",
  "services-grid-v1",
  "services-featured-list-v1",
  "contact-form-demo-v1",
] as const;

const viewportWidths = [360, 390, 768, 1024, 1440] as const;

const moduleUrl = (theme: string, moduleId: string, fixture: "normal" | "extreme") =>
  `/catalog/${theme}/${moduleId}/${fixture}/`;

for (const theme of themes) {
  for (const moduleId of modules) {
    test(`${moduleId} funciona y conserva calidad en ${theme}`, async ({ page }) => {
      for (const fixture of ["normal", "extreme"] as const) {
        for (const width of viewportWidths) {
          await page.setViewportSize({ width, height: 1000 });
          await page.goto(moduleUrl(theme, moduleId, fixture));

          const module = page.locator(`[data-module-id="${moduleId}"]`);
          await expect(module).toBeVisible();

          const overflow = await page.evaluate(() => ({
            clientWidth: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
          }));
          expect(overflow.scrollWidth, `${fixture} desborda a ${width}px`).toBeLessThanOrEqual(
            overflow.clientWidth,
          );
        }
      }

      await page.setViewportSize({ width: 390, height: 1000 });
      await page.goto(moduleUrl(theme, moduleId, "normal"));

      const accessibility = await new AxeBuilder({ page })
        .include(`[data-module-id="${moduleId}"]`)
        .analyze();
      expect(accessibility.violations).toEqual([]);

      await expect(page.locator(`[data-module-id="${moduleId}"]`)).toHaveScreenshot(
        `${theme}-${moduleId}-mobile.png`,
        { animations: "disabled" },
      );

      await page.setViewportSize({ width: 1440, height: 1100 });
      await page.goto(moduleUrl(theme, moduleId, "normal"));
      await expect(page.locator(`[data-module-id="${moduleId}"]`)).toHaveScreenshot(
        `${theme}-${moduleId}-desktop.png`,
        { animations: "disabled" },
      );

      if (theme === "neutral-light-v1") {
        await page.setViewportSize({ width: 390, height: 1000 });
        await page.goto(moduleUrl(theme, moduleId, "extreme"));
        await expect(page.locator(`[data-module-id="${moduleId}"]`)).toHaveScreenshot(
          `${theme}-${moduleId}-extreme-mobile.png`,
          { animations: "disabled" },
        );

        await page.setViewportSize({ width: 1440, height: 1100 });
        await page.goto(moduleUrl(theme, moduleId, "extreme"));
        await expect(page.locator(`[data-module-id="${moduleId}"]`)).toHaveScreenshot(
          `${theme}-${moduleId}-extreme-desktop.png`,
          { animations: "disabled" },
        );
      }
    });
  }
}

test("el formulario valida, confirma, restaura el foco y no transmite datos", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto(moduleUrl("neutral-light-v1", "contact-form-demo-v1", "normal"));

  const form = page.locator("[data-demo-contact-form]");
  const success = page.locator("[data-demo-contact-success]");

  await form.getByRole("button", { name: "Probar envío" }).click();
  await expect(form).toBeVisible();
  await expect(success).toBeHidden();

  await form.getByLabel("Nombre ficticio").fill("Persona Demo");
  await form.getByLabel("Email de prueba").fill("persona@example.com");
  await form.getByLabel("¿Qué te interesa?").selectOption("manicure-ritual");
  await form.getByLabel("Mensaje ficticio").fill("Quisiera conocer la disponibilidad de esta semana.");

  const transmittedRequests: string[] = [];
  page.on("request", (request) => transmittedRequests.push(request.url()));
  await form.getByRole("button", { name: "Probar envío" }).click();

  await expect(success).toBeVisible();
  await expect(success).toBeFocused();
  expect(transmittedRequests).toEqual([]);
  await expect(page.locator("[data-module-id='contact-form-demo-v1']")).toHaveScreenshot(
    "contact-form-demo-v1-success-mobile.png",
    { animations: "disabled" },
  );

  await success.getByRole("button", { name: "Volver al formulario" }).click();
  await expect(form).toBeVisible();
  await expect(form.getByLabel("Nombre ficticio")).toBeFocused();
  await expect(form.getByLabel("Nombre ficticio")).toHaveValue("");
});

test("el movimiento reducido mantiene el contenido visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(moduleUrl("refined-soft-v1", "hero-split-image-v1", "normal"));

  await expect(page.locator("[data-module-id='hero-split-image-v1']")).toBeVisible();
  const duration = await page.locator(".reveal").first().evaluate((element) =>
    getComputedStyle(element).animationDuration,
  );
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.00001);
});

for (const labPath of [
  "/lab/",
  "/lab/preview/",
  "/lab/type-color/",
  "/lab/heroes/",
  "/lab/video/",
] as const) {
  test(`el laboratorio ${labPath} es accesible y responsive`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const width of [390, 1440] as const) {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(labPath);

      await expect(page.locator("main")).toBeVisible();
      const overflow = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(overflow.scrollWidth, `${labPath} desborda a ${width}px`).toBeLessThanOrEqual(
        overflow.clientWidth,
      );

      const accessibility = await new AxeBuilder({ page }).include("main").analyze();
      expect(accessibility.violations).toEqual([]);
    }
  });
}

test("el hero de video carga formatos optimizados y conserva el control del visitante", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const viewport of [
    { name: "mobile", width: 390, height: 1000 },
    { name: "desktop", width: 1440, height: 1100 },
  ] as const) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/lab/video/");

    const hero = page.locator("[data-module-id='hero-media-full-v1']");
    const video = hero.locator("[data-hero-video]");
    const sources = video.locator("source");

    await expect(hero).toBeVisible();
    await expect(video).toHaveAttribute("controls", "");
    await expect(video).not.toHaveAttribute("autoplay", /.*/);
    await expect(video).toHaveAttribute("preload", "metadata");
    await expect(video).toHaveAttribute("poster", /restaurant-plating-poster/);
    await expect(sources).toHaveCount(2);
    await expect(sources.nth(0)).toHaveAttribute("type", "video/webm");
    await expect(sources.nth(1)).toHaveAttribute("type", "video/mp4");
    await video.focus();
    await expect(video).toBeFocused();

    await expect
      .poll(() => video.evaluate((element) => (element as HTMLVideoElement).readyState))
      .toBeGreaterThanOrEqual(1);
    const duration = await video.evaluate((element) => (element as HTMLVideoElement).duration);
    expect(duration).toBeGreaterThanOrEqual(9.9);
    expect(duration).toBeLessThanOrEqual(10.1);

    await video.evaluate(async (element) => {
      const media = element as HTMLVideoElement;
      await media.play();
      await new Promise((resolve) => window.setTimeout(resolve, 350));
      media.pause();
    });
    await expect
      .poll(() => video.evaluate((element) => (element as HTMLVideoElement).currentTime))
      .toBeGreaterThan(0);

    await video.evaluate((element) => {
      const media = element as HTMLVideoElement;
      media.currentTime = 0;
      media.load();
    });

    const accessibility = await new AxeBuilder({ page })
      .include("[data-module-id='hero-media-full-v1']")
      .analyze();
    expect(accessibility.violations).toEqual([]);
    await page.mouse.move(0, 0);
    await expect(hero).toHaveScreenshot(`restaurant-video-hero-${viewport.name}.png`, {
      animations: "disabled",
    });
  }
});

test("el compositor aplica defaults por proyecto y cambia módulos reales", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/lab/");

  const preview = page.frameLocator("#builder-preview");
  await expect(preview.locator("[data-module-id='hero-split-image-v1']")).toBeVisible();
  await expect(preview.locator("[data-module-id='services-featured-list-v1']")).toBeVisible();

  await page.locator('input[name="project"][value="restaurant"]').check();
  await expect(page.locator("#selection-summary")).toContainText("Cellar Clay");
  await expect(preview.locator("[data-module-id='hero-media-full-v1']")).toBeVisible();
  await expect(preview.locator("[data-module-id='services-grid-v1']")).toBeVisible();

  await page.locator('input[name="hero"][value="hero-compact-banner-v1"]').check();
  await expect(preview.locator("[data-module-id='hero-compact-banner-v1']")).toBeVisible();

  await page.locator('input[name="viewport"][value="mobile"]').check({ force: true });
  await expect.poll(() =>
    page.locator("#builder-preview").evaluate((element) => element.getBoundingClientRect().width),
  ).toBeLessThanOrEqual(390);

  await page.getByRole("button", { name: "Copiar receta" }).click();
  await expect(page.getByRole("button", { name: "Receta copiada" })).toBeVisible();
});

test("las paletas del compositor conservan accesibilidad en una configuración aplicada", async ({ page }) => {
  const paletteIds = [
    "porcelain-rose",
    "sage-ritual",
    "mineral-coast",
    "cellar-clay",
    "night-brass",
    "cobalt-acid",
    "graphite-citrus",
    "oxford-ink",
  ] as const;

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 1000 });

  for (const paletteId of paletteIds) {
    await page.goto(`/lab/preview/?project=restaurant&palette=${paletteId}&hero=hero-media-full-v1`);
    await expect(page.locator("[data-module-id='hero-media-full-v1']")).toBeVisible();
    const accessibility = await new AxeBuilder({ page }).include("main").analyze();
    expect(accessibility.violations, paletteId).toEqual([]);
    if (paletteId === "cellar-clay") {
      await expect(page.locator("[data-module-id='hero-media-full-v1']")).toHaveScreenshot(
        "cellar-clay-hero-media-full-mobile.png",
        { animations: "disabled" },
      );
    }
  }

  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/lab/preview/?project=restaurant&palette=cellar-clay&hero=hero-media-full-v1");
  await expect(page.locator("[data-module-id='hero-media-full-v1']")).toHaveScreenshot(
    "cellar-clay-hero-media-full-desktop.png",
    { animations: "disabled" },
  );
});

test("los heroes fotográficos conservan foco y legibilidad con imágenes claras, oscuras e irregulares", async ({ page }) => {
  const scenarios = [
    { project: "beauty", photo: "beauty-hero" },
    { project: "beauty", photo: "beauty-service" },
    { project: "beauty", photo: "beauty-ritual" },
    { project: "restaurant", photo: "restaurant-hero" },
    { project: "restaurant", photo: "restaurant-dish" },
    { project: "restaurant", photo: "restaurant-table" },
  ] as const;

  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const scenario of scenarios) {
    for (const width of [390, 1440] as const) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(
        `/lab/preview/?project=${scenario.project}&photo=${scenario.photo}&hero=hero-media-full-v1`,
      );

      const hero = page.locator("[data-module-id='hero-media-full-v1']");
      const image = hero.locator("[data-builder-photo]");
      await expect(hero).toBeVisible();
      await expect(image).toBeVisible();
      await expect(image).toHaveAttribute("style", /object-position:/);

      const overflow = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(overflow.scrollWidth, `${scenario.photo} desborda a ${width}px`).toBeLessThanOrEqual(
        overflow.clientWidth,
      );
    }

    const accessibility = await new AxeBuilder({ page })
      .include("[data-module-id='hero-media-full-v1']")
      .analyze();
    expect(accessibility.violations, scenario.photo).toEqual([]);
  }
});

for (const preview of [
  { name: "beauty", path: "/" },
  { name: "restaurant", path: "/restaurant/" },
] as const) {
  test(`el preview completo de ${preview.name} conserva composición, accesibilidad y noindex`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });

    for (const viewport of [
      { name: "mobile", width: 390, height: 1000 },
      { name: "desktop", width: 1440, height: 1100 },
    ] as const) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(preview.path);

      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      await expect(page.locator("[data-concept-notice]")).toBeVisible();
      await expect(page.locator("[data-module-id='cta-banner-v1'] h2")).not.toHaveText(
        await page.locator("h1").innerText(),
      );

      const overflow = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(overflow.scrollWidth, `${preview.name} desborda en ${viewport.name}`).toBeLessThanOrEqual(
        overflow.clientWidth,
      );

      const accessibility = await new AxeBuilder({ page }).include("main").analyze();
      expect(accessibility.violations, `${preview.name}-${viewport.name}`).toEqual([]);
      await expect(page).toHaveScreenshot(`${preview.name}-full-page-${viewport.name}.png`, {
        animations: "disabled",
        fullPage: true,
      });
    }
  });
}
