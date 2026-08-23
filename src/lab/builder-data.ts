import beautyHeroUrl from "../../sites/demo-nails/assets/generated/beauty-hero.jpg?url";
import beautyRitualUrl from "../../sites/demo-nails/assets/generated/beauty-ritual.jpg?url";
import beautyServiceUrl from "../../sites/demo-nails/assets/generated/beauty-service.jpg?url";
import beautyAssetsDocument from "../../sites/demo-nails/assets.json";
import beautySiteDocument from "../../sites/demo-nails/site.json";
import restaurantDishUrl from "../../sites/demo-restaurant/assets/generated/restaurant-dish.jpg?url";
import restaurantHeroUrl from "../../sites/demo-restaurant/assets/generated/restaurant-hero.jpg?url";
import restaurantTableUrl from "../../sites/demo-restaurant/assets/generated/restaurant-table.jpg?url";
import restaurantAssetsDocument from "../../sites/demo-restaurant/assets.json";
import restaurantSiteDocument from "../../sites/demo-restaurant/site.json";
import { assetManifestSchema, siteSchema } from "../../schemas/index";
import type {
  CtaModuleProps,
  FooterModuleProps,
  HeroCompactBannerModuleProps,
  HeroMediaFullModuleProps,
  HeroModuleProps,
  NavigationModuleProps,
  ServicesModuleProps,
} from "../renderer/module-definitions";
import {
  resolveTheme,
  themeCssVariables,
  type ThemeId,
} from "../themes/theme-registry";
import { paletteCandidates, typographySpecimens } from "./design-lab-data";

const dayLabels: Readonly<Record<string, string>> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

const paletteThemeMap: Readonly<Record<string, ThemeId>> = {
  "porcelain-rose": "refined-soft-v1",
  "sage-ritual": "refined-soft-v1",
  "mineral-coast": "editorial-sober-v1",
  "cellar-clay": "editorial-sober-v1",
  "night-brass": "editorial-sober-v1",
  "cobalt-acid": "modern-direct-v1",
  "graphite-citrus": "modern-direct-v1",
  "oxford-ink": "modern-direct-v1",
};

const serializeVariables = (variables: Readonly<Record<string, string>>): string =>
  Object.entries(variables)
    .map(([name, value]) => `${name}:${value}`)
    .join(";");

const paletteColorVariables = (colors: (typeof paletteCandidates)[number]["colors"]) => ({
  "--theme-color-canvas": colors.canvas,
  "--theme-color-surface": colors.surface,
  "--theme-color-surface-strong": colors.surfaceStrong,
  "--theme-color-ink": colors.ink,
  "--theme-color-muted": colors.muted,
  "--theme-color-line": colors.line,
  "--theme-color-accent": colors.accent,
  "--theme-color-accent-strong": colors.accentStrong,
  "--theme-color-accent-soft": colors.accentSoft,
  "--theme-color-signal": colors.signal,
  "--theme-color-on-accent": colors.onAccent,
  "--theme-color-on-signal": colors.onSignal,
  "--theme-color-inverse-surface": colors.inverseSurface,
  "--theme-color-on-inverse": colors.onInverse,
  "--theme-color-on-inverse-muted": colors.onInverseMuted,
  "--theme-color-inverse-line": colors.inverseLine,
  "--theme-color-media-scrim": colors.mediaScrim,
  "--theme-color-on-media": colors.onMedia,
  "--theme-color-focus": colors.focus,
});

export const builderPaletteOptions = paletteCandidates.map((palette) => {
  const themeId = paletteThemeMap[palette.id];
  if (!themeId) throw new Error(`La paleta ${palette.id} no tiene theme estructural`);

  return {
    id: palette.id,
    label: palette.label,
    attributes: palette.attributes,
    swatches: [palette.colors.canvas, palette.colors.accent, palette.colors.signal],
    themeId,
    style: serializeVariables({
      ...themeCssVariables(resolveTheme(themeId)),
      ...paletteColorVariables(palette.colors),
    }),
  };
});

export const builderTypographyOptions = typographySpecimens.map((specimen) => ({
  id: specimen.id,
  label: specimen.label,
  character: specimen.character,
  sampleFamily: specimen.displayFamily,
  style: serializeVariables({
    "--theme-font-display": specimen.displayFamily,
    "--theme-font-body": specimen.bodyFamily,
    "--theme-font-label": specimen.bodyFamily,
    "--theme-font-display-weight": specimen.displayWeight,
    "--theme-font-body-weight": specimen.bodyWeight,
    "--theme-font-label-weight": specimen.labelWeight,
  }),
}));

export const builderHeroOptions = [
  {
    id: "hero-split-image-v1",
    label: "Texto + fotografía",
    description: "Explica la oferta y mantiene la imagen visible.",
  },
  {
    id: "hero-media-full-v1",
    label: "Fotografía completa",
    description: "La imagen domina. También admite video autorizado.",
  },
  {
    id: "hero-compact-banner-v1",
    label: "Banner directo",
    description: "Funciona sin depender de una fotografía fuerte.",
  },
] as const;

export const builderServicesOptions = [
  {
    id: "services-grid-v1",
    label: "Lista editorial",
    description: "Todas las opciones reciben un peso semejante.",
  },
  {
    id: "services-featured-list-v1",
    label: "Servicio destacado",
    description: "La primera opción guía y las demás quedan disponibles.",
  },
] as const;

export interface BuilderPhoto {
  id: string;
  src: string;
  alt: string;
  label: string;
  focalPoint: { x: number; y: number };
  textSafeZone: "start" | "center" | "end";
}

export interface BuilderProject {
  id: string;
  label: string;
  businessName: string;
  photos: BuilderPhoto[];
  defaults: {
    paletteId: string;
    typographyId: string;
    photoId: string;
    heroModuleId: (typeof builderHeroOptions)[number]["id"];
    servicesModuleId: (typeof builderServicesOptions)[number]["id"];
  };
  navigation: NavigationModuleProps;
  splitHero: Omit<HeroModuleProps, "image">;
  mediaHero: Omit<HeroMediaFullModuleProps, "media">;
  compactHero: HeroCompactBannerModuleProps;
  services: ServicesModuleProps;
  cta: CtaModuleProps;
  footer: FooterModuleProps;
}

const createProject = ({
  id,
  label,
  siteDocument,
  assetsDocument,
  assetUrls,
  defaults,
}: {
  id: string;
  label: string;
  siteDocument: unknown;
  assetsDocument: unknown;
  assetUrls: Readonly<Record<string, string>>;
  defaults: BuilderProject["defaults"];
}): BuilderProject => {
  const site = siteSchema.parse(siteDocument);
  const assetManifest = assetManifestSchema.parse(assetsDocument);
  const photos = assetManifest.assets.map((asset, index) => {
    const src = assetUrls[asset.id];
    if (!src) throw new Error(`No existe URL compilable para ${asset.id}`);
    if (!asset.composition) {
      throw new Error(`El asset ${asset.id} no tiene composición visual registrada`);
    }
    return {
      id: asset.id,
      src,
      alt: asset.alt,
      label: `Fotografía ${index + 1}`,
      focalPoint: asset.composition.focalPoint,
      textSafeZone: asset.composition.textSafeZone,
    };
  });
  const address = [
    site.location.addressLine,
    site.location.city,
    site.location.region,
    site.location.postalCode,
  ].join(", ");
  const hours = site.location.hours.map((entry) => ({
    day: dayLabels[entry.day] ?? entry.day,
    value: entry.closed ? "Cerrado" : `${entry.opens}-${entry.closes}`,
  }));
  const heroBase = {
    businessType: site.identity.businessType,
    tagline: site.identity.tagline,
    headline: site.content.headline,
    description: site.content.description,
    cta: site.content.primaryCta,
  };

  return {
    id,
    label,
    businessName: site.identity.businessName,
    photos,
    defaults,
    navigation: {
      businessName: site.identity.businessName,
      links: [
        { href: "#servicios", label: "Servicios" },
        { href: "#siguiente-paso", label: "Contacto" },
      ],
      cta: site.content.primaryCta,
    },
    splitHero: { ...heroBase, sectionId: "inicio", imagePosition: "end" },
    mediaHero: {
      ...heroBase,
      sectionId: "inicio",
      contentPosition: photos.find((photo) => photo.id === defaults.photoId)?.textSafeZone ?? "start",
    },
    compactHero: {
      ...heroBase,
      sectionId: "inicio",
      phone: { display: site.contact.phoneDisplay, href: `tel:${site.contact.phoneE164}` },
      alignment: "start",
    },
    services: { services: site.content.services },
    cta: {
      headline: site.content.closingCta.headline,
      description: site.content.closingCta.description,
      cta: site.content.primaryCta,
      phoneDisplay: site.contact.phoneDisplay,
    },
    footer: {
      businessName: site.identity.businessName,
      businessType: site.identity.businessType,
      address,
      phone: { display: site.contact.phoneDisplay, href: `tel:${site.contact.phoneE164}` },
      email: site.contact.email,
      hours,
      conceptNotice: site.preview.conceptNotice,
    },
  };
};

export const builderProjects: BuilderProject[] = [
  createProject({
    id: "beauty",
    label: "Belleza",
    siteDocument: beautySiteDocument,
    assetsDocument: beautyAssetsDocument,
    assetUrls: {
      "beauty-hero": beautyHeroUrl,
      "beauty-service": beautyServiceUrl,
      "beauty-ritual": beautyRitualUrl,
    },
    defaults: {
      paletteId: "porcelain-rose",
      typographyId: "cormorant-instrument",
      photoId: "beauty-hero",
      heroModuleId: "hero-split-image-v1",
      servicesModuleId: "services-featured-list-v1",
    },
  }),
  createProject({
    id: "restaurant",
    label: "Restaurante",
    siteDocument: restaurantSiteDocument,
    assetsDocument: restaurantAssetsDocument,
    assetUrls: {
      "restaurant-hero": restaurantHeroUrl,
      "restaurant-dish": restaurantDishUrl,
      "restaurant-table": restaurantTableUrl,
    },
    defaults: {
      paletteId: "cellar-clay",
      typographyId: "source-manrope",
      photoId: "restaurant-hero",
      heroModuleId: "hero-media-full-v1",
      servicesModuleId: "services-grid-v1",
    },
  }),
];

export const builderRuntimeData = {
  projects: builderProjects.map(({ id, label, businessName, photos, defaults }) => ({
    id,
    label,
    businessName,
    photos,
    defaults,
  })),
  palettes: builderPaletteOptions,
  typography: builderTypographyOptions,
  heroes: builderHeroOptions,
  services: builderServicesOptions,
};
