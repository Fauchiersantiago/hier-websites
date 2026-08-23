import {
  contactFormDemoPropsSchema,
  heroCompactBannerPropsSchema,
  heroMediaFullPropsSchema,
  heroSplitImagePropsSchema,
  servicesGridPropsSchema,
  type SiteBundle,
} from "../../schemas/index";
import type { ZodType } from "zod";

export interface NavigationModuleProps {
  businessName: string;
  links: Array<{ href: string; label: string }>;
  cta: { href: string; label: string };
}

export interface FocalPoint {
  x: number;
  y: number;
}

export interface HeroModuleProps {
  sectionId?: string;
  businessType: string;
  tagline: string;
  headline: string;
  description: string;
  cta: { href: string; label: string };
  image: { src: string; alt: string; focalPoint: FocalPoint };
  imagePosition?: "start" | "end";
}

export interface HeroMediaFullModuleProps {
  sectionId?: string;
  businessType: string;
  tagline: string;
  headline: string;
  description: string;
  cta: { href: string; label: string };
  media:
    | {
        kind: "image";
        src: string;
        alt: string;
        focalPoint: FocalPoint;
        textSafeZone: "start" | "center" | "end";
      }
    | {
        kind: "video";
        poster: string;
        alt: string;
        focalPoint: FocalPoint;
        textSafeZone: "start" | "center" | "end";
        sources: Array<{ src: string; type: "video/mp4" | "video/webm" }>;
      };
  contentPosition?: "start" | "center" | "end";
}

export interface HeroCompactBannerModuleProps {
  sectionId?: string;
  businessType: string;
  tagline: string;
  headline: string;
  description: string;
  cta: { href: string; label: string };
  phone: { display: string; href: string };
  alignment?: "start" | "center";
}

export interface ServicesModuleProps {
  services: SiteBundle["site"]["content"]["services"];
}

export interface GalleryModuleProps {
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{ id: string; src: string; alt: string; caption: string; focalPoint: FocalPoint }>;
}

export interface ReviewsModuleProps {
  eyebrow: string;
  title: string;
  items: SiteBundle["site"]["content"]["reviews"]["items"];
}

export interface FaqModuleProps {
  eyebrow: string;
  title: string;
  items: SiteBundle["site"]["content"]["faq"]["items"];
}

export interface LocationModuleProps {
  address: string;
  mapHref: string;
  phone: { display: string; href: string };
  hours: Array<{ day: string; value: string }>;
}

export interface ContactFormModuleProps {
  eyebrow: string;
  title: string;
  description: string;
  responseTime: string;
  privacyNote: string;
  services: Array<{ id: string; name: string }>;
}

export interface CtaModuleProps {
  headline: string;
  description: string;
  cta: { href: string; label: string };
  phoneDisplay: string;
}

export interface FooterModuleProps {
  businessName: string;
  businessType: string;
  address: string;
  phone: { display: string; href: string };
  email: string;
  hours: Array<{ day: string; value: string }>;
  conceptNotice: string;
}

export type ModuleProps =
  | NavigationModuleProps
  | HeroModuleProps
  | HeroMediaFullModuleProps
  | HeroCompactBannerModuleProps
  | ServicesModuleProps
  | GalleryModuleProps
  | ReviewsModuleProps
  | FaqModuleProps
  | LocationModuleProps
  | CtaModuleProps
  | ContactFormModuleProps
  | FooterModuleProps;

export const registeredModuleIds = [
  "navigation-basic-v1",
  "hero-split-image-v1",
  "hero-media-full-v1",
  "hero-compact-banner-v1",
  "services-grid-v1",
  "services-featured-list-v1",
  "gallery-editorial-v1",
  "reviews-highlight-v1",
  "faq-disclosure-v1",
  "location-hours-split-v1",
  "cta-banner-v1",
  "contact-form-demo-v1",
  "footer-basic-v1",
] as const;

export type RegisteredModuleId = (typeof registeredModuleIds)[number];

interface ModuleContext {
  bundle: SiteBundle;
  assetUrls: Readonly<Record<string, string>>;
}

interface ModuleDefinition {
  slotId: string;
  label: string;
  status: "candidate";
  jsBudget: "0kb" | "5kb";
  propsSchema?: ZodType;
  buildProps: (context: ModuleContext) => ModuleProps;
}

export interface ResolvedModuleDefinition {
  moduleId: RegisteredModuleId;
  slotId: string;
  label: string;
  status: "candidate";
  jsBudget: "0kb" | "5kb";
  props: ModuleProps;
}

export interface IncompatibleModuleSet {
  moduleIds: readonly RegisteredModuleId[];
  reason: string;
}

export const incompatibleModuleSets: readonly IncompatibleModuleSet[] = [];

const dayLabels: Readonly<Record<string, string>> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

const isRegisteredModuleId = (moduleId: string): moduleId is RegisteredModuleId =>
  registeredModuleIds.includes(moduleId as RegisteredModuleId);

type ResolvedHeroImage = HeroModuleProps["image"] & {
  textSafeZone: "start" | "center" | "end";
};

const resolveHeroImage = (
  bundle: SiteBundle,
  assetUrls: Readonly<Record<string, string>>,
): ResolvedHeroImage => {
  const referencedAssets = bundle.site.presentation.assetRefs
    .map((assetId) => bundle.assets.assets.find((asset) => asset.id === assetId))
    .filter((asset) => asset !== undefined);
  const image = referencedAssets.find((asset) => asset.kind === "image");

  if (!image) {
    throw new Error("El hero necesita al menos un asset de imagen aprobado");
  }

  const src = assetUrls[image.id];
  if (!src) {
    throw new Error(`No existe una URL compilable para el asset ${image.id}`);
  }

  if (!image.composition) {
    throw new Error(`El asset ${image.id} no tiene composición visual registrada`);
  }

  return {
    src,
    alt: image.alt,
    focalPoint: image.composition.focalPoint,
    textSafeZone: image.composition.textSafeZone,
  };
};

const resolveHeroMediaImage = (
  bundle: SiteBundle,
  assetUrls: Readonly<Record<string, string>>,
): Extract<HeroMediaFullModuleProps["media"], { kind: "image" }> => {
  const image = resolveHeroImage(bundle, assetUrls);
  return { kind: "image", ...image };
};

const formatAddress = (bundle: SiteBundle): string =>
  [
    bundle.site.location.addressLine,
    bundle.site.location.city,
    bundle.site.location.region,
    bundle.site.location.postalCode,
  ].join(", ");

const formatHours = (bundle: SiteBundle): Array<{ day: string; value: string }> =>
  bundle.site.location.hours.map((entry) => ({
    day: dayLabels[entry.day] ?? entry.day,
    value: entry.closed ? "Cerrado" : `${entry.opens}-${entry.closes}`,
  }));

const resolveGalleryImages = (
  bundle: SiteBundle,
  assetUrls: Readonly<Record<string, string>>,
): GalleryModuleProps["items"] =>
  bundle.site.content.gallery.items.map((item) => {
    const asset = bundle.assets.assets.find((candidate) => candidate.id === item.assetId);
    const src = assetUrls[item.assetId];
    if (!asset || !src) {
      throw new Error(`No existe una imagen compilable para la galería: ${item.assetId}`);
    }
    if (!asset.composition) {
      throw new Error(`La imagen ${item.assetId} no tiene punto focal registrado`);
    }
    return {
      id: item.id,
      src,
      alt: asset.alt,
      caption: item.caption,
      focalPoint: asset.composition.focalPoint,
    };
  });

const moduleDefinitions: Record<RegisteredModuleId, ModuleDefinition> = {
  "navigation-basic-v1": {
    slotId: "navigation",
    label: "Navigation / Basic",
    status: "candidate",
    jsBudget: "0kb",
    buildProps: ({ bundle }) => ({
      businessName: bundle.site.identity.businessName,
      links: [
        { href: "#servicios", label: "Servicios" },
        { href: "#galeria", label: "Galería" },
        { href: "#contacto", label: "Contacto" },
      ],
      cta: bundle.site.content.primaryCta,
    }),
  },
  "hero-split-image-v1": {
    slotId: "hero",
    label: "Hero / Split image",
    status: "candidate",
    jsBudget: "0kb",
    propsSchema: heroSplitImagePropsSchema,
    buildProps: ({ bundle, assetUrls }) => ({
      businessType: bundle.site.identity.businessType,
      tagline: bundle.site.identity.tagline,
      headline: bundle.site.content.headline,
      description: bundle.site.content.description,
      cta: bundle.site.content.primaryCta,
      image: resolveHeroImage(bundle, assetUrls),
    }),
  },
  "hero-media-full-v1": {
    slotId: "hero",
    label: "Hero / Full media",
    status: "candidate",
    jsBudget: "0kb",
    propsSchema: heroMediaFullPropsSchema,
    buildProps: ({ bundle, assetUrls }) => {
      const media = resolveHeroMediaImage(bundle, assetUrls);
      return {
        businessType: bundle.site.identity.businessType,
        tagline: bundle.site.identity.tagline,
        headline: bundle.site.content.headline,
        description: bundle.site.content.description,
        cta: bundle.site.content.primaryCta,
        media,
        contentPosition: media.textSafeZone,
      };
    },
  },
  "hero-compact-banner-v1": {
    slotId: "hero",
    label: "Hero / Compact banner",
    status: "candidate",
    jsBudget: "0kb",
    propsSchema: heroCompactBannerPropsSchema,
    buildProps: ({ bundle }) => ({
      businessType: bundle.site.identity.businessType,
      tagline: bundle.site.identity.tagline,
      headline: bundle.site.content.headline,
      description: bundle.site.content.description,
      cta: bundle.site.content.primaryCta,
      phone: {
        display: bundle.site.contact.phoneDisplay,
        href: `tel:${bundle.site.contact.phoneE164}`,
      },
      alignment: "start",
    }),
  },
  "services-grid-v1": {
    slotId: "services",
    label: "Services / Editorial grid",
    status: "candidate",
    jsBudget: "0kb",
    propsSchema: servicesGridPropsSchema,
    buildProps: ({ bundle }) => ({ services: bundle.site.content.services }),
  },
  "services-featured-list-v1": {
    slotId: "services",
    label: "Services / Featured list",
    status: "candidate",
    jsBudget: "0kb",
    propsSchema: servicesGridPropsSchema,
    buildProps: ({ bundle }) => ({ services: bundle.site.content.services }),
  },
  "gallery-editorial-v1": {
    slotId: "gallery",
    label: "Gallery / Editorial mosaic",
    status: "candidate",
    jsBudget: "0kb",
    buildProps: ({ bundle, assetUrls }) => ({
      eyebrow: bundle.site.content.gallery.eyebrow,
      title: bundle.site.content.gallery.title,
      description: bundle.site.content.gallery.description,
      items: resolveGalleryImages(bundle, assetUrls),
    }),
  },
  "reviews-highlight-v1": {
    slotId: "reviews",
    label: "Reviews / Highlight pair",
    status: "candidate",
    jsBudget: "0kb",
    buildProps: ({ bundle }) => ({
      eyebrow: bundle.site.content.reviews.eyebrow,
      title: bundle.site.content.reviews.title,
      items: bundle.site.content.reviews.items,
    }),
  },
  "faq-disclosure-v1": {
    slotId: "faq",
    label: "FAQ / Native disclosure",
    status: "candidate",
    jsBudget: "0kb",
    buildProps: ({ bundle }) => ({
      eyebrow: bundle.site.content.faq.eyebrow,
      title: bundle.site.content.faq.title,
      items: bundle.site.content.faq.items,
    }),
  },
  "location-hours-split-v1": {
    slotId: "location",
    label: "Location / Hours split",
    status: "candidate",
    jsBudget: "0kb",
    buildProps: ({ bundle }) => {
      const address = formatAddress(bundle);
      return {
        address,
        mapHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
        phone: {
          display: bundle.site.contact.phoneDisplay,
          href: `tel:${bundle.site.contact.phoneE164}`,
        },
        hours: formatHours(bundle),
      };
    },
  },
  "cta-banner-v1": {
    slotId: "final-cta",
    label: "CTA / Statement banner",
    status: "candidate",
    jsBudget: "0kb",
    buildProps: ({ bundle }) => ({
      headline: bundle.site.content.closingCta.headline,
      description: bundle.site.content.closingCta.description,
      cta: bundle.site.content.primaryCta,
      phoneDisplay: bundle.site.contact.phoneDisplay,
    }),
  },
  "contact-form-demo-v1": {
    slotId: "contact-form",
    label: "Contact / Demo form",
    status: "candidate",
    jsBudget: "5kb",
    propsSchema: contactFormDemoPropsSchema,
    buildProps: ({ bundle }) => ({
      eyebrow: bundle.site.content.contactForm.eyebrow,
      title: bundle.site.content.contactForm.title,
      description: bundle.site.content.contactForm.description,
      responseTime: bundle.site.content.contactForm.responseTime,
      privacyNote: bundle.site.content.contactForm.privacyNote,
      services: bundle.site.content.services.map(({ id, name }) => ({ id, name })),
    }),
  },
  "footer-basic-v1": {
    slotId: "footer",
    label: "Footer / Contact ledger",
    status: "candidate",
    jsBudget: "0kb",
    buildProps: ({ bundle }) => ({
      businessName: bundle.site.identity.businessName,
      businessType: bundle.site.identity.businessType,
      address: formatAddress(bundle),
      phone: {
        display: bundle.site.contact.phoneDisplay,
        href: `tel:${bundle.site.contact.phoneE164}`,
      },
      email: bundle.site.contact.email,
      hours: formatHours(bundle),
      conceptNotice: bundle.site.preview.conceptNotice,
    }),
  },
};

export const assertNoIncompatibleModules = (
  moduleIds: readonly RegisteredModuleId[],
  sets: readonly IncompatibleModuleSet[] = incompatibleModuleSets,
): void => {
  for (const set of sets) {
    if (set.moduleIds.every((moduleId) => moduleIds.includes(moduleId))) {
      throw new Error(
        `Módulos incompatibles: ${set.moduleIds.join(", ")}. ${set.reason}`,
      );
    }
  }
};

export const resolveModuleDefinitions = (
  bundle: SiteBundle,
  assetUrls: Readonly<Record<string, string>>,
): ResolvedModuleDefinition[] => {
  const selections = bundle.site.presentation.modules;
  const resolvedIds: RegisteredModuleId[] = [];

  const resolved = selections.map((selection) => {
    if (!isRegisteredModuleId(selection.moduleId)) {
      throw new Error(`Module ID no registrado: ${selection.moduleId}`);
    }

    const definition = moduleDefinitions[selection.moduleId];
    if (definition.slotId !== selection.slotId) {
      throw new Error(
        `El módulo ${selection.moduleId} pertenece al slot ${definition.slotId}, no a ${selection.slotId}`,
      );
    }

    const recipeSlot = bundle.recipe.slots.find((slot) => slot.slotId === selection.slotId);
    if (!recipeSlot) {
      throw new Error(`Slot no registrado en la recipe: ${selection.slotId}`);
    }

    if (!recipeSlot.allowedModuleIds.includes(selection.moduleId)) {
      throw new Error(
        `El módulo ${selection.moduleId} no está permitido por la recipe ${bundle.recipe.id}`,
      );
    }

    resolvedIds.push(selection.moduleId);

    const props = definition.buildProps({ bundle, assetUrls });
    definition.propsSchema?.parse(props);

    return {
      moduleId: selection.moduleId,
      slotId: definition.slotId,
      label: definition.label,
      status: definition.status,
      jsBudget: definition.jsBudget,
      props,
    };
  });

  for (const slot of bundle.recipe.slots) {
    const count = selections.filter((selection) => selection.slotId === slot.slotId).length;
    if (count < slot.minItems || count > slot.maxItems) {
      throw new Error(
        `El slot ${slot.slotId} requiere entre ${slot.minItems} y ${slot.maxItems} módulos; recibió ${count}`,
      );
    }
  }

  assertNoIncompatibleModules(resolvedIds);
  return resolved;
};

export const listRegisteredModules = (): Array<
  Omit<ResolvedModuleDefinition, "props">
> =>
  registeredModuleIds.map((moduleId) => {
    const definition = moduleDefinitions[moduleId];
    return {
      moduleId,
      slotId: definition.slotId,
      label: definition.label,
      status: definition.status,
      jsBudget: definition.jsBudget,
    };
  });
