import { z } from 'zod';

export type PasswordZodContext =
  | 'register'
  | 'login'
  | 'profile'
  | 'changePassword'
  | 'resetPassword'
  | 'general'
  | 'search';

export interface PasswordZodOptions {
  context: PasswordZodContext;
  required?: boolean;
  label?: string;
}

const MIN_LENGTH = 8;
const REQUIRE_UPPERCASE = true;
const REQUIRE_LOWERCASE = true;
const REQUIRE_NUMBERS = true;
const REQUIRE_SPECIAL_CHARS = true;

const STRENGTH_CONTEXTS: ReadonlySet<PasswordZodContext> = new Set([
  'register',
  'changePassword',
  'resetPassword',
  'general',
]);

export function passwordZod(opts: PasswordZodOptions): z.ZodString {
  const { context, required = true, label = 'Password' } = opts;

  let schema = required ? z.string({ error: `${label} is required` }) : z.string();

  if (STRENGTH_CONTEXTS.has(context)) {
    schema = schema.min(MIN_LENGTH, `Password must be at least ${MIN_LENGTH} characters`);
    if (REQUIRE_UPPERCASE) {
      schema = schema.regex(/[A-Z]/, 'Password must contain at least one uppercase letter');
    }
    if (REQUIRE_LOWERCASE) {
      schema = schema.regex(/[a-z]/, 'Password must contain at least one lowercase letter');
    }
    if (REQUIRE_NUMBERS) {
      schema = schema.regex(/[0-9]/, 'Password must contain at least one number');
    }
    if (REQUIRE_SPECIAL_CHARS) {
      schema = schema.regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');
    }
  } else if (context === 'login') {
    schema = schema.min(1, 'Password is required');
  }

  return schema;
}
