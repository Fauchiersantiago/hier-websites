import type { SiteBundle } from "../../schemas/index";

export interface NavigationModuleProps {
  businessName: string;
  links: Array<{ href: string; label: string }>;
  cta: { href: string; label: string };
}

export interface HeroModuleProps {
  businessType: string;
  tagline: string;
  headline: string;
  description: string;
  cta: { href: string; label: string };
  image: { src: string; alt: string };
}

export interface ServicesModuleProps {
  services: SiteBundle["site"]["content"]["services"];
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
  | ServicesModuleProps
  | CtaModuleProps
  | FooterModuleProps;

export const registeredModuleIds = [
  "navigation-basic-v1",
  "hero-split-image-v1",
  "services-grid-v1",
  "cta-banner-v1",
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
  jsBudget: "0kb";
  buildProps: (context: ModuleContext) => ModuleProps;
}

export interface ResolvedModuleDefinition {
  moduleId: RegisteredModuleId;
  slotId: string;
  label: string;
  status: "candidate";
  jsBudget: "0kb";
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

const resolveHeroImage = (
  bundle: SiteBundle,
  assetUrls: Readonly<Record<string, string>>,
): HeroModuleProps["image"] => {
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

  return { src, alt: image.alt };
};

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
    buildProps: ({ bundle, assetUrls }) => ({
      businessType: bundle.site.identity.businessType,
      tagline: bundle.site.identity.tagline,
      headline: bundle.site.content.headline,
      description: bundle.site.content.description,
      cta: bundle.site.content.primaryCta,
      image: resolveHeroImage(bundle, assetUrls),
    }),
  },
  "services-grid-v1": {
    slotId: "services",
    label: "Services / Editorial grid",
    status: "candidate",
    jsBudget: "0kb",
    buildProps: ({ bundle }) => ({ services: bundle.site.content.services }),
  },
  "cta-banner-v1": {
    slotId: "final-cta",
    label: "CTA / Statement banner",
    status: "candidate",
    jsBudget: "0kb",
    buildProps: ({ bundle }) => ({
      headline: bundle.site.identity.tagline,
      description: bundle.site.content.description,
      cta: bundle.site.content.primaryCta,
      phoneDisplay: bundle.site.contact.phoneDisplay,
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
      address: [
        bundle.site.location.addressLine,
        bundle.site.location.city,
        bundle.site.location.region,
        bundle.site.location.postalCode,
      ].join(", "),
      phone: {
        display: bundle.site.contact.phoneDisplay,
        href: `tel:${bundle.site.contact.phoneE164}`,
      },
      email: bundle.site.contact.email,
      hours: bundle.site.location.hours.map((entry) => ({
        day: dayLabels[entry.day] ?? entry.day,
        value: entry.closed ? "Cerrado" : `${entry.opens}–${entry.closes}`,
      })),
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

    return {
      moduleId: selection.moduleId,
      slotId: definition.slotId,
      label: definition.label,
      status: definition.status,
      jsBudget: definition.jsBudget,
      props: definition.buildProps({ bundle, assetUrls }),
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
