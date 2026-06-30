import { z } from 'zod';
import logger from '../logger';

// ============================================
// Type Definitions
// ============================================

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type WebhookAuth =
  | { type: 'none' }
  | { type: 'basic'; username: string; password: string }
  | { type: 'bearer'; token: string }
  | { type: 'custom'; headerName: string; headerValue: string };

export type FieldType = 'string' | 'boolean' | 'number' | 'object' | 'array';

export interface ObjectMapField {
  type: FieldType;
  map: string; // Dot notation path e.g., "payment.completed"
}

export interface ObjectMap {
  [outputField: string]: ObjectMapField;
}

export interface WebhookRequestConfig {
  url: string;
  method: HttpMethod;
  auth?: WebhookAuth;
  headers?: Record<string, string>;
  cookies?: Record<string, string>;
  body?: Record<string, unknown> | unknown[];
  queryParams?: Record<string, string | number | boolean>;
  timeout?: number;
  retry?: {
    count: number;
    backoffMs?: number;
    backoffMultiplier?: number;
  };
}

export type ResponseType = 'json' | 'text';

export interface WebhookResponseConfig<T = unknown> {
  responseType?: ResponseType;
  objectMap?: ObjectMap;
  schema?: z.ZodSchema<T>;
}

export type WebhookErrorCode =
  | 'NETWORK_ERROR'
  | 'TIMEOUT_ERROR'
  | 'HTTP_ERROR'
  | 'PARSE_ERROR'
  | 'VALIDATION_ERROR'
  | 'TRANSFORM_ERROR';

export interface WebhookError {
  code: WebhookErrorCode;
  message: string;
  statusCode?: number;
  details?: unknown;
  retryCount?: number;
}

export type WebhookResult<T> =
  | { success: true; data: T; statusCode: number; headers: Record<string, string> }
  | { success: false; error: WebhookError };

// ============================================
// Constants
// ============================================

const DEFAULT_TIMEOUT = 30000;
const DEFAULT_RETRY_BACKOFF = 1000;
const DEFAULT_BACKOFF_MULTIPLIER = 2;
const RETRYABLE_STATUS_CODES = [500, 502, 503, 504];

// ============================================
// Utility Functions
// ============================================

function buildAuthHeaders(auth: WebhookAuth | undefined): Record<string, string> {
  if (!auth || auth.type === 'none') {
    return {};
  }

  switch (auth.type) {
    case 'basic': {
      const credentials = Buffer.from(`${auth.username}:${auth.password}`).toString('base64');
      return { Authorization: `Basic ${credentials}` };
    }
    case 'bearer': {
      return { Authorization: `Bearer ${auth.token}` };
    }
    case 'custom': {
      return { [auth.headerName]: auth.headerValue };
    }
    default: {
      const _exhaustive: never = auth;
      return _exhaustive;
    }
  }
}

function buildUrl(
  baseUrl: string,
  queryParams?: Record<string, string | number | boolean>
): string {
  if (!queryParams || Object.keys(queryParams).length === 0) {
    return baseUrl;
  }

  const url = new URL(baseUrl);
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  return url.toString();
}

function getNestedValue(obj: unknown, path: string): unknown {
  if (!obj || typeof obj !== 'object') {
    return undefined;
  }

  const parts = path.split('.');
  let current: unknown = obj;

  for (const part of parts) {
    if (current === null || current === undefined) {
      return undefined;
    }
    if (typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

function transformResponse(data: unknown, objectMap: ObjectMap): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [outputKey, config] of Object.entries(objectMap)) {
    const rawValue = getNestedValue(data, config.map);

    switch (config.type) {
      case 'string':
        result[outputKey] = rawValue != null ? String(rawValue) : undefined;
        break;
      case 'number':
        result[outputKey] = rawValue != null ? Number(rawValue) : undefined;
        break;
      case 'boolean':
        result[outputKey] = rawValue != null ? Boolean(rawValue) : undefined;
        break;
      case 'object':
      case 'array':
        result[outputKey] = rawValue;
        break;
      default:
        result[outputKey] = rawValue;
    }
  }

  return result;
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

function calculateBackoff(attempt: number, baseMs: number, multiplier: number): number {
  const exponentialDelay = baseMs * Math.pow(multiplier, attempt);
  const jitter = Math.random() * 0.3 * exponentialDelay;
  return Math.floor(exponentialDelay + jitter);
}

function shouldRetry(
  error: unknown,
  statusCode: number | undefined,
  attempt: number,
  maxRetries: number
): boolean {
  if (attempt >= maxRetries) {
    return false;
  }

  if (
    error instanceof Error &&
    (error.name === 'AbortError' ||
      error.name === 'TypeError' ||
      error.message.includes('network') ||
      error.message.includes('fetch'))
  ) {
    return true;
  }

  if (statusCode && RETRYABLE_STATUS_CODES.includes(statusCode)) {
    return true;
  }

  return false;
}

// ============================================
// WebhookClient Class
// ============================================

export class WebhookClient {
  private config: WebhookRequestConfig;

  constructor(config: WebhookRequestConfig) {
    this.config = config;
  }

  async execute<T>(responseConfig?: WebhookResponseConfig<T>): Promise<WebhookResult<T>> {
    const {
      url,
      method,
      auth,
      headers = {},
      cookies,
      body,
      queryParams,
      timeout = DEFAULT_TIMEOUT,
      retry = { count: 0 },
    } = this.config;

    const maxRetries = retry.count;
    const backoffMs = retry.backoffMs ?? DEFAULT_RETRY_BACKOFF;
    const multiplier = retry.backoffMultiplier ?? DEFAULT_BACKOFF_MULTIPLIER;

    let lastError: WebhookError | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      if (attempt > 0) {
        const delay = calculateBackoff(attempt - 1, backoffMs, multiplier);
        logger.info({ attempt, delay, url }, 'Webhook retry with backoff');
        await sleep(delay);
      }

      const result = await this.fetchWithRetry<T>(
        url,
        method,
        auth,
        headers,
        cookies,
        body,
        queryParams,
        timeout,
        responseConfig
      );

      if (result.success) {
        return result;
      }

      lastError = result.error;

      if (!shouldRetry(result.error.details, result.error.statusCode, attempt, maxRetries)) {
        break;
      }
    }

    return {
      success: false,
      error: {
        ...lastError!,
        retryCount: maxRetries,
      },
    };
  }

  private async fetchWithRetry<T>(
    url: string,
    method: HttpMethod,
    auth: WebhookAuth | undefined,
    headers: Record<string, string>,
    cookies: Record<string, string> | undefined,
    body: Record<string, unknown> | unknown[] | undefined,
    queryParams: Record<string, string | number | boolean> | undefined,
    timeout: number,
    responseConfig?: WebhookResponseConfig<T>
  ): Promise<WebhookResult<T>> {
    const fullUrl = buildUrl(url, queryParams);

    const authHeaders = buildAuthHeaders(auth);
    const cookieHeader: Record<string, string> = cookies
      ? {
          Cookie: Object.entries(cookies)
            .map(([k, v]) => `${k}=${v}`)
            .join('; '),
        }
      : {};

    const allHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
      ...authHeaders,
      ...cookieHeader,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const fetchOptions: RequestInit = {
      method,
      headers: allHeaders,
      signal: controller.signal,
      ...(body && method !== 'GET' ? { body: JSON.stringify(body) } : {}),
    };

    try {
      logger.debug({ url: fullUrl, method }, 'Webhook request initiated');

      const response = await fetch(fullUrl, fetchOptions);
      clearTimeout(timeoutId);

      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        logger.warn(
          { statusCode: response.status, url: fullUrl, errorBody },
          'Webhook received non-OK response'
        );

        return {
          success: false,
          error: {
            code: 'HTTP_ERROR',
            message: `HTTP ${response.status}: ${response.statusText}`,
            statusCode: response.status,
            details: errorBody,
          },
        };
      }

      return await this.parseResponse<T>(response, responseHeaders, responseConfig);
    } catch (err) {
      clearTimeout(timeoutId);

      if (err instanceof Error && err.name === 'AbortError') {
        logger.error({ url: fullUrl, timeout }, 'Webhook request timed out');
        return {
          success: false,
          error: {
            code: 'TIMEOUT_ERROR',
            message: `Request timed out after ${timeout}ms`,
            details: err,
          },
        };
      }

      logger.error({ err, url: fullUrl }, 'Webhook network error');
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: err instanceof Error ? err.message : 'Network error',
          details: err,
        },
      };
    }
  }

  private async parseResponse<T>(
    response: Response,
    responseHeaders: Record<string, string>,
    responseConfig?: WebhookResponseConfig<T>
  ): Promise<WebhookResult<T>> {
    const responseType = responseConfig?.responseType ?? 'json';

    try {
      let data: unknown;

      if (responseType === 'json') {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (responseConfig?.objectMap && typeof data === 'object' && data !== null) {
        data = transformResponse(data, responseConfig.objectMap);
      }

      if (responseConfig?.schema) {
        const parseResult = responseConfig.schema.safeParse(data);

        if (!parseResult.success) {
          logger.warn({ errors: parseResult.error.issues }, 'Webhook response validation failed');
          return {
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Response validation failed',
              statusCode: response.status,
              details: parseResult.error.issues,
            },
          };
        }

        data = parseResult.data;
      }

      return {
        success: true,
        data: data as T,
        statusCode: response.status,
        headers: responseHeaders,
      };
    } catch (err) {
      logger.error({ err }, 'Webhook response parse error');
      return {
        success: false,
        error: {
          code: 'PARSE_ERROR',
          message: 'Failed to parse response',
          statusCode: response.status,
          details: err,
        },
      };
    }
  }
}

// ============================================
// Factory Function
// ============================================

/**
 * Execute a webhook request with full configuration
 *
 * @example
 * // Basic GET request
 * const result = await webhookRequest({
 *   url: 'https://api.example.com/data',
 *   method: 'GET'
 * });
 *
 * @example
 * // POST with auth, retry, and validation
 * const result = await webhookRequest({
 *   url: 'https://api.example.com/orders',
 *   method: 'POST',
 *   auth: { type: 'bearer', token: 'xxx' },
 *   body: { productId: '123' },
 *   retry: { count: 3 }
 * }, {
 *   schema: z.object({ id: z.string(), status: z.string() }),
 *   objectMap: { orderId: { type: 'string', map: 'data.id' } }
 * });
 *
 * if (result.success) {
 *   console.log(result.data);
 * } else {
 *   console.error(result.error.code, result.error.message);
 * }
 */
export async function webhookRequest<T = unknown>(
  requestConfig: WebhookRequestConfig,
  responseConfig?: WebhookResponseConfig<T>
): Promise<WebhookResult<T>> {
  const client = new WebhookClient(requestConfig);
  return client.execute<T>(responseConfig);
}
