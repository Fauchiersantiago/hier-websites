import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import {
  paletteCandidates,
  typographySpecimens,
} from "../src/lab/design-lab-data";
import {
  builderHeroOptions,
  builderPaletteOptions,
  builderProjects,
  builderServicesOptions,
  builderTypographyOptions,
} from "../src/lab/builder-data";

const relativeLuminance = (hex: string) => {
  const channels = hex
    .match(/[a-f\d]{2}/gi)
    ?.map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );

  if (!channels || channels.length !== 3) throw new Error(`Color hexadecimal inválido: ${hex}`);
  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
};

const contrastRatio = (foreground: string, background: string) => {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
};

describe("laboratorio visual", () => {
  it("mantiene IDs únicos y todas las fuentes candidatas instaladas", async () => {
    expect(new Set(typographySpecimens.map((item) => item.id)).size).toBe(
      typographySpecimens.length,
    );

    const packageJson = JSON.parse(await readFile("package.json", "utf8")) as {
      dependencies: Record<string, string>;
    };

    for (const specimen of typographySpecimens) {
      for (const packageName of specimen.packageNames) {
        expect(packageJson.dependencies[packageName], packageName).toBeDefined();
      }
    }
  });

  it("mantiene AA en los pares de color críticos", () => {
    expect(new Set(paletteCandidates.map((item) => item.id)).size).toBe(
      paletteCandidates.length,
    );

    for (const palette of paletteCandidates) {
      const { colors } = palette;
      expect(contrastRatio(colors.ink, colors.canvas), `${palette.id}: ink`).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(colors.muted, colors.canvas), `${palette.id}: muted`).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(colors.surface, colors.ink), `${palette.id}: footer`).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(colors.onAccent, colors.accent), `${palette.id}: CTA`).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(colors.onSignal, colors.signal), `${palette.id}: señal`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("mantiene defaults válidos para cada proyecto del compositor", () => {
    for (const project of builderProjects) {
      expect(builderPaletteOptions.some((item) => item.id === project.defaults.paletteId)).toBe(true);
      expect(builderTypographyOptions.some((item) => item.id === project.defaults.typographyId)).toBe(true);
      expect(builderHeroOptions.some((item) => item.id === project.defaults.heroModuleId)).toBe(true);
      expect(builderServicesOptions.some((item) => item.id === project.defaults.servicesModuleId)).toBe(true);
      expect(project.photos.some((item) => item.id === project.defaults.photoId)).toBe(true);
    }
  });

  it("serializa tokens completos para aplicar color y tipografía al preview", () => {
    for (const palette of builderPaletteOptions) {
      expect(palette.style).toContain("--theme-color-canvas:");
      expect(palette.style).toContain("--theme-color-on-media:");
      expect(palette.style).toContain("--radius-medium:");
    }
    for (const typography of builderTypographyOptions) {
      expect(typography.style).toContain("--theme-font-display:");
      expect(typography.style).toContain("--theme-font-body:");
    }
  });
});
