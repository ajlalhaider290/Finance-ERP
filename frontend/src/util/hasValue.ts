/**
 * Utility to check if a value is considered "filled"
 * @param value - The value to check
 * @param isArray - Whether the value should be treated as an array
 * @returns true if the value is filled, false otherwise
 */
export function hasValue(value: unknown, isArray = false): boolean {
  if (value === undefined || value === null || value === '') return false;
  if (isArray) return Array.isArray(value) && value.length > 0;
  return true;
}