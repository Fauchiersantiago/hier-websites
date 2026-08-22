import { resolve } from "node:path";

import {
  loadSiteBundle,
  SiteBundleValidationError,
} from "../src/lib/site-bundle";

const directory = process.argv[2];

if (!directory) {
  console.error("Uso: pnpm validate:demo o tsx scripts/validate-site.ts <directorio-del-sitio>");
  process.exitCode = 1;
} else {
  try {
    const bundle = await loadSiteBundle(resolve(directory));
    console.log(
      `✓ ${bundle.site.siteId} válido con schema ${bundle.site.schemaVersion}, ${bundle.site.presentation.modules.length} módulos y ${bundle.assets.assets.length} asset(s).`,
    );
  } catch (error) {
    if (error instanceof SiteBundleValidationError) {
      console.error(`✗ El sitio no es válido:\n${error.message}`);
    } else {
      console.error(error);
    }
    process.exitCode = 1;
  }
}
