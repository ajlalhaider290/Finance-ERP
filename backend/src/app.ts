import express, {Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { env } from './config/env';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { prefixRoutes } from './util/routeConfig';
import { defaultRoutes } from './config/routes/defaultRoutes';
import { mcpRouter } from './config/routes/mcpRoutes';
import { QueryTypes } from 'sequelize';
import { sequelize } from './config/db';


import { errorHandler } from './middleware/errorHandler';
import { setupSwagger } from './config/swagger';

import { mcpAuthRouter } from '@modelcontextprotocol/sdk/server/auth/router.js';
import { mcpOAuthProvider } from './mcp/oauth/provider';
import { handleOAuthConsent, handleConsentInfo } from './mcp/oauth/consent-handler';
import { validateAccessToken } from './helper/auth';
import logger from './logger';


// Set process timezone early before any date operations
if (env.TZ) {
  process.env.TZ = env.TZ;
}



const app: Express = express();

// Core middlewares
app.use(express.json({ limit: '256kb' }));
app.use(express.urlencoded({ extended: true, limit: '256kb' }));

// CORS configuration
const corsOrigins = env.CORS_ORIGINS.split(',').map(origin => origin.trim());
app.use(cors({
  origin: corsOrigins
}));

app.use(helmet());
app.use(morgan(env.ENVIRONMENT === 'production' ? 'combined' : 'dev'));

// Rate limiting with burst protection
// Burst limiter: max 50 requests per 10-second window (prevents sudden spikes)
const burstLimiter = new RateLimiterMemory({
  points: 50,
  duration: 10,
});

// Sustained limiter: max 500 requests per 60-second window (overall rate cap)
const sustainedLimiter = new RateLimiterMemory({
  points: 500,
  duration: 60,
});

app.use(async (req: Request, res: Response, next: Function) => {
  try {
    const key = req.ip ?? 'unknown';
    await burstLimiter.consume(key);
    await sustainedLimiter.consume(key);
    next();
  } catch {
    res.status(429).json({ message: 'Too many requests, please try again later.' });
  }
});

// Static files
app.use('/public', express.static(path.join(__dirname, 'public'), {
  setHeaders: (res: Response) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
  },
}));

// Health check
app.get('/health', async (_req: Request, res: Response) => {
  // get timezone form database
const dbTimeZone = await sequelize.query("SELECT current_setting('timezone') as timezone", {
  type: QueryTypes.SELECT,
});

  // Format date in the configured timezone
  const now = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Format local time in ISO-like format (YYYY-MM-DDTHH:mm:ss)
  const localTimeISO = now.toLocaleString('sv-SE', { 
    timeZone: timeZone 
  }).replace(' ', 'T');

  res.json({ 
    status: 'OK', 
    utcTime: now.toISOString(), // UTC time (ISO format)
    localTime: localTimeISO, // Local time in configured timezone (ISO-like format)
    timestamp: Date.now(), 
    envTimeZone: env.TZ,
    appTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    processTimeZone: process.env.TZ,
    database: 'POSTGRESQL', 
    dbTimeZone: (dbTimeZone[0] as { timezone: string }).timezone
  });
});

// Register default routes
    defaultRoutes.forEach(routeConfig => {
      const configuredRouters = prefixRoutes(routeConfig);
      configuredRouters.forEach(router => {
        app.use(routeConfig.path, router);
      });
    });

// MCP OAuth 2.0 authorization endpoints (must be at app root)
// Handles: /authorize, /token, /register, /.well-known/oauth-authorization-server
const mcpServerUrl = new URL(env.MCP_SERVER_URL);
logger.info(`[MCP OAuth] Server URL: ${mcpServerUrl.href}`);

app.use(
  mcpAuthRouter({
    provider: mcpOAuthProvider,
    issuerUrl: mcpServerUrl,
    baseUrl: mcpServerUrl,
    resourceServerUrl: new URL('/mcp', mcpServerUrl),
    scopesSupported: ['mcp:tools'],
  }),
);

// Fallback: serve protected resource metadata at base path too
// (Claude.ai requests /.well-known/oauth-protected-resource without /mcp suffix)
app.get('/.well-known/oauth-protected-resource', (_req: Request, res: Response) => {
  const serverUrl = env.MCP_SERVER_URL;
  res.json({
    resource: new URL('/mcp', serverUrl).href,
    authorization_servers: [serverUrl],
    scopes_supported: ['mcp:tools'],
  });
});

// OAuth consent endpoints (JWT-protected, called by React frontend)
app.get('/oauth/consent-info', validateAccessToken, handleConsentInfo);
app.post('/oauth/consent', validateAccessToken, handleOAuthConsent);

// Register MCP routes
app.use('/mcp', mcpRouter);
// Setup Swagger docs
setupSwagger(app);

// Global error handler – always last middleware before server.listen
app.use(errorHandler);

export { app };