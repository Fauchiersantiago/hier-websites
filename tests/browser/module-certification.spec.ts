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

for (const labPath of ["/lab/", "/lab/type-color/", "/lab/heroes/"] as const) {
  test(`el laboratorio ${labPath} es accesible y responsive`, async ({ page }) => {
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
