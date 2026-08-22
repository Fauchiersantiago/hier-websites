import { z } from "zod";

export const CURRENT_SCHEMA_VERSION = "1.0.0" as const;

export const schemaVersionSchema = z.literal(CURRENT_SCHEMA_VERSION, {
  error: `schemaVersion debe ser ${CURRENT_SCHEMA_VERSION}`,
});

export const kebabIdSchema = z
  .string()
  .min(3, "El identificador debe tener al menos 3 caracteres")
  .max(80, "El identificador no puede superar 80 caracteres")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "El identificador debe usar kebab-case en minúsculas",
  );

export const versionedIdSchema = z
  .string()
  .max(90, "El identificador versionado no puede superar 90 caracteres")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*-v[1-9]\d*$/,
    "El identificador debe terminar en una versión, por ejemplo hero-basic-v1",
  );

export const semverSchema = z
  .string()
  .regex(/^\d+\.\d+\.\d+$/, "La versión debe usar SemVer, por ejemplo 1.0.0");

export const localeSchema = z
  .string()
  .regex(/^[a-z]{2}-[A-Z]{2}$/, "El locale debe usar el formato es-MX");

export const isoDateTimeSchema = z.iso.datetime({ offset: true });

export const httpUrlSchema = z
  .url("Debe ser una URL válida")
  .refine(
    (value) => value.startsWith("https://") || value.startsWith("http://"),
    "La URL debe usar http o https",
  );

export const spdxLicenseSchema = z
  .string()
  .regex(
    /^(MIT|Apache-2\.0|MPL-2\.0|CC0-1\.0|CC-BY-4\.0|LicenseRef-[A-Za-z0-9.-]+)$/,
    "La licencia debe usar un identificador SPDX admitido o LicenseRef-*",
  );

export const uniqueValues = <T>(values: T[]): boolean =>
  new Set(values).size === values.length;
