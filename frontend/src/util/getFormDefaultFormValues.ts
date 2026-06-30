// src/lib/getDefaultFormValues.ts
import { z } from 'zod';

/**
 * Generate sensible default values for a Zod schema.
 * - For z.object(): returns an object whose keys are present and filled either by schema defaults (if set)
 *   or by sensible fallbacks ("" / false / 0 / [] / nested object).
 * - For other schemas: if there's a default wrapper, parse(undefined) will return it; otherwise we provide
 *   a fallback for primitives.
 *
 * Limitations:
 * - If you need specialized default generation for unions/enums/literals you can extend the fallback logic.
 * - This attempts to be safe for typical form use-cases.
 */

type ZodAny = z.ZodTypeAny;
type ZodInternals = { _def?: { typeName?: string; innerType?: ZodAny; type?: ZodAny } };

/**
 * Helper function to recursively unwrap ZodOptional, ZodNullable, and ZodNullish
 * and determine the appropriate default value based on the base type and wrappers
 */
function getDefaultValueForField(schema: ZodAny): unknown {
  const internals = schema as unknown as ZodInternals;
  // Check for type name to handle ZodNullish (z.date().nullish())
  const typeName = internals._def?.typeName;

  // Handle ZodNullish (both nullable and optional) - check typeName first
  if (typeName === 'ZodNullish') {
    const inner = (internals._def?.innerType ?? internals._def?.type) as ZodAny;
    // For nullish dates, return undefined (preferred for form initialization)
    if (inner instanceof z.ZodDate) {
      return undefined;
    }
    // For other nullish types, recursively determine default
    const baseDefault = getDefaultValueForField(inner);
    // Prefer undefined over null for form initialization
    return baseDefault === null ? undefined : baseDefault;
  }

  // Handle ZodOptional (z.date().optional())
  if (schema instanceof z.ZodOptional) {
    const inner = (internals._def?.innerType ?? internals._def?.type) as ZodAny;
    // For optional dates, return undefined (field is not required)
    if (inner instanceof z.ZodDate) {
      return undefined;
    }
    // For other optional types, recursively determine default
    const baseDefault = getDefaultValueForField(inner);
    // Optional fields should be undefined, not null
    return baseDefault === null ? undefined : baseDefault;
  }

  // Handle ZodNullable (z.date().nullable())
  if (schema instanceof z.ZodNullable) {
    const inner = (internals._def?.innerType ?? internals._def?.type) as ZodAny;
    // For nullable dates, return null (field can be null)
    if (inner instanceof z.ZodDate) {
      return null;
    }
    // For other nullable types, recursively determine default
    const baseDefault = getDefaultValueForField(inner);
    // If base default is undefined, use null for nullable fields
    if (baseDefault === undefined) {
      // Map undefined base types to null for nullable fields
      if (inner instanceof z.ZodString) return null;
      if (inner instanceof z.ZodNumber) return null;
      if (inner instanceof z.ZodBoolean) return null;
      return null;
    }
    return baseDefault;
  }

  // Handle base types (no wrappers)
  if (schema instanceof z.ZodDate) {
    return undefined; // Required dates start as undefined, user must select
  }
  if (schema instanceof z.ZodString) {
    return '';
  }
  if (schema instanceof z.ZodBoolean) {
    return false;
  }
  if (schema instanceof z.ZodNumber) {
    return undefined; // Required numbers start as undefined, validation will enforce a number
  }
  if (schema instanceof z.ZodArray) {
    return [];
  }
  if (schema instanceof z.ZodObject) {
    return getDefaultFormValues(schema);
  }

  // Fallback for unknown types
  return undefined;
}

export function getDefaultFormValues<T extends ZodAny>(schema: T): z.infer<T> {
  // If it's an object schema -> handle keys recursively
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    // Try to apply any explicit defaults using partial({ deep: true }) so missing required fields are allowed
    let parsedDefaults: Partial<Record<string, unknown>> = {};
    try {
      // partial({ deep: true }) lets parse({}) succeed while still applying any .default() you set on fields
      parsedDefaults = (schema.partial({ deep: true }) as z.ZodObject<z.ZodRawShape>).parse({});
    } catch {
      parsedDefaults = {};
    }

    const result: Record<string, unknown> = {};

    for (const key of Object.keys(shape)) {
      const childSchema = shape[key];

      // If parse produced a defined value (from a .default() on the field), keep it
      if (parsedDefaults && typeof parsedDefaults[key] !== 'undefined') {
        result[key] = parsedDefaults[key];
        continue;
      }

      // Otherwise, use the helper function to determine the default value
      result[key] = getDefaultValueForField(childSchema);
    }

    return result as z.infer<T>;
  }

  // Non-object schemas:
  // If schema wraps a default (z.string().default(...)), parsing `undefined` will return that default.
  try {
    // For primitive schemas with .default(), parse(undefined) returns the default.
    return schema.parse(undefined as unknown) as z.infer<T>;
  } catch {
    // For non-object schemas, use the helper function to determine defaults
    // This ensures consistent handling of optional/nullable/nullish wrappers
    return getDefaultValueForField(schema) as z.infer<T>;
  }
}
