import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import {
  paletteCandidates,
  typographySpecimens,
} from "../src/lab/design-lab-data";

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
      expect(contrastRatio(colors.onAccent, colors.accent), `${palette.id}: CTA`).toBeGreaterThanOrEqual(4.5);
    }
  });
});
