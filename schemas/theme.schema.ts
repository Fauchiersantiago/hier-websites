import { z } from "zod";

import {
  httpUrlSchema,
  schemaVersionSchema,
  semverSchema,
  spdxLicenseSchema,
  uniqueValues,
  versionedIdSchema,
} from "./common";

const cssValueSchema = z.string().trim().min(1).max(320);

export const themeMaturitySchema = z.enum([
  "candidate",
  "certified",
  "deprecated",
  "rejected",
]);

export const themeAttributeSchema = z.enum([
  "neutral",
  "refined",
  "soft",
  "editorial",
  "sober",
  "modern",
  "direct",
  "energetic",
]);

const fontReferenceSchema = z.object({
  family: z.string().trim().min(2).max(80),
  packageName: z.string().trim().min(2).max(120),
  sourceUrl: httpUrlSchema,
  license: spdxLicenseSchema,
});

export const themeTokensSchema = z.object({
  colors: z.object({
    canvas: cssValueSchema,
    surface: cssValueSchema,
    surfaceStrong: cssValueSchema,
    ink: cssValueSchema,
    muted: cssValueSchema,
    line: cssValueSchema,
    accent: cssValueSchema,
    accentStrong: cssValueSchema,
    accentSoft: cssValueSchema,
    signal: cssValueSchema,
    onAccent: cssValueSchema,
    onSignal: cssValueSchema,
    inverseSurface: cssValueSchema,
    onInverse: cssValueSchema,
    onInverseMuted: cssValueSchema,
    inverseLine: cssValueSchema,
    mediaScrim: cssValueSchema,
    onMedia: cssValueSchema,
    focus: cssValueSchema,
  }),
  typography: z.object({
    displayFamily: cssValueSchema,
    bodyFamily: cssValueSchema,
    labelFamily: cssValueSchema,
    displayWeight: cssValueSchema,
    bodyWeight: cssValueSchema,
    labelWeight: cssValueSchema,
    heroSize: cssValueSchema,
    heroLineHeight: cssValueSchema,
    heroTracking: cssValueSchema,
    sectionSize: cssValueSchema,
    sectionLineHeight: cssValueSchema,
    sectionTracking: cssValueSchema,
    bodyTracking: cssValueSchema,
    labelTracking: cssValueSchema,
  }),
  layout: z.object({
    sectionSpace: cssValueSchema,
    gutter: cssValueSchema,
    container: cssValueSchema,
    navHeight: cssValueSchema,
    contentDensity: z.enum(["airy", "balanced", "compact"]),
  }),
  shape: z.object({
    radiusSmall: cssValueSchema,
    radiusMedium: cssValueSchema,
    radiusLarge: cssValueSchema,
    radiusButton: cssValueSchema,
    radiusChip: cssValueSchema,
    borderWidth: cssValueSchema,
  }),
  effects: z.object({
    shadowLift: cssValueSchema,
    buttonShadow: cssValueSchema,
    bodyBackground: cssValueSchema,
    bodyBackgroundSize: cssValueSchema,
    imageFilter: cssValueSchema,
    imageRotate: cssValueSchema,
    imageAspect: cssValueSchema,
    imageOverlay: cssValueSchema,
  }),
  motion: z.object({
    fast: cssValueSchema,
    default: cssValueSchema,
    slow: cssValueSchema,
    easing: cssValueSchema,
    revealDistance: cssValueSchema,
    hoverLift: cssValueSchema,
    intensity: z.enum(["restrained", "expressive", "energetic"]),
  }),
});

export const themeSchema = z
  .object({
    schemaVersion: schemaVersionSchema,
    id: versionedIdSchema,
    version: semverSchema,
    label: z.string().trim().min(3).max(80),
    description: z.string().trim().min(20).max(320),
    maturity: themeMaturitySchema,
    attributes: z.array(themeAttributeSchema).min(1).max(6),
    fonts: z.array(fontReferenceSchema).min(1).max(3),
    artDirection: z.object({
      signature: z.string().trim().min(10).max(180),
      imageTreatment: z.string().trim().min(10).max(180),
      motionCharacter: z.string().trim().min(10).max(180),
    }),
    tokens: themeTokensSchema,
  })
  .superRefine((theme, context) => {
    if (!uniqueValues(theme.attributes)) {
      context.addIssue({
        code: "custom",
        path: ["attributes"],
        message: "Los atributos del theme no pueden repetirse",
      });
    }

    const fontPackages = theme.fonts.map((font) => font.packageName);
    if (!uniqueValues(fontPackages)) {
      context.addIssue({
        code: "custom",
        path: ["fonts"],
        message: "Las fuentes del theme no pueden repetirse",
      });
    }
  });

export const themeRegistrySchema = z
  .array(themeSchema)
  .min(1)
  .max(30)
  .refine((themes) => uniqueValues(themes.map((theme) => theme.id)), {
    message: "Los theme IDs del registro no pueden repetirse",
  });

export type Theme = z.infer<typeof themeSchema>;
export type ThemeTokens = z.infer<typeof themeTokensSchema>;
