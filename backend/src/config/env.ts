import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables once, early
dotenv.config();

const EnvSchema = z.object({
  // General
  PORT: z.coerce.number().default(8000),
  ENVIRONMENT: z.enum(['development', 'test', 'production']).default('development'),

  // Database
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_PORT: z.coerce.number(),
  DB_HOST: z.string(),
  DB_SSL: z.enum(['true', 'false']).default('false'),
  DB_TIMEZONE: z.string().default('+00:00'),

  // JWT
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters'),
  JWT_EXPIRATION: z.string().default('360000'),
  REFRESH_TOKEN_SECRET: z.string().min(16, 'REFRESH_TOKEN_SECRET must be at least 16 characters'),
  REFRESH_TOKEN_EXPIRATION: z.string().default('6047998'),

  // SMTP
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_SECURE: z.enum(['true', 'false']).default('false'),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_SENDER: z.string(),

  // Password
  PASSWORD_SALT_ROUNDS: z.coerce.number().default(10),

  // Frontend
  FRONTEND_URL: z.url().default('http://localhost:3000/'),

  // Support agent
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default('gemini-2.5-flash-lite'),

  // MCP
  MCP_SERVER_URL: z.url().default('http://localhost:3000'),

  // Logging
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  // CORS
  CORS_ORIGINS: z.string().default('http://localhost:3000'),

  SYNC_DB: z.enum(['true', 'false']).default('false'),


  // Timezone
  TZ: z.string().default('UTC'),
});

export type AppEnv = z.infer<typeof EnvSchema>;

export const env: AppEnv = EnvSchema.parse(process.env);
