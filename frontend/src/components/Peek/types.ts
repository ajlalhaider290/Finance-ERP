export type PeekWidth = string;

export function pick<T, K extends keyof T>(obj: T | undefined | null, key?: K): T[K] | undefined {
  if (!obj || !key) return undefined;
  return obj[key];
}

export function toStringValue(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return undefined;
}

export function getInitials(source?: string | null): string {
  if (!source) return '?';
  const parts = source.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}
