import { describe, expect, it } from "vitest";

import { themeSchema } from "../schemas/index";
import {
  listThemes,
  registeredThemeIds,
  resolveTheme,
  themeCssVariables,
} from "../src/themes/theme-registry";

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

describe("registro de themes", () => {
  it("registra exactamente las cuatro direcciones aprobadas", () => {
    expect(listThemes().map((theme) => theme.id)).toEqual(registeredThemeIds);
  });

  it("mantiene todas las definiciones conformes al schema", () => {
    for (const theme of listThemes()) {
      expect(themeSchema.safeParse(theme).success, theme.id).toBe(true);
      expect(theme.maturity).toBe("candidate");
    }
  });

  it("produce el contrato completo de CSS variables", () => {
    const variableNames = Object.keys(themeCssVariables(resolveTheme("neutral-light-v1")));

    expect(variableNames.length).toBeGreaterThanOrEqual(50);
    expect(variableNames).toContain("--theme-font-display");
    expect(variableNames).toContain("--theme-body-background");
    expect(variableNames).toContain("--theme-reveal-distance");

    for (const theme of listThemes()) {
      const variables = themeCssVariables(theme);
      expect(Object.keys(variables), theme.id).toEqual(variableNames);
      expect(Object.values(variables).every((value) => value.length > 0), theme.id).toBe(true);
      expect(theme.fonts.every((font) => font.license === "OFL-1.1"), theme.id).toBe(true);
    }
  });

  it("mantiene contraste AA en texto, texto secundario y CTA", () => {
    for (const theme of listThemes()) {
      const { colors } = theme.tokens;

      expect(contrastRatio(colors.ink, colors.canvas), `${theme.id}: texto principal`).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(colors.muted, colors.canvas), `${theme.id}: texto secundario`).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(colors.onAccent, colors.accent), `${theme.id}: CTA`).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(colors.onSignal, colors.signal), `${theme.id}: señal`).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(colors.onInverse, colors.inverseSurface), `${theme.id}: superficie inversa`).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(colors.onInverseMuted, colors.inverseSurface), `${theme.id}: texto inverso secundario`).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(colors.onMedia, colors.mediaScrim), `${theme.id}: texto sobre scrim`).toBeGreaterThanOrEqual(7);
    }
  });

  it("rechaza un theme no registrado antes de renderizar", () => {
    expect(() => resolveTheme("theme-inventado-v1")).toThrow(
      "Theme ID no registrado: theme-inventado-v1",
    );
  });
});
