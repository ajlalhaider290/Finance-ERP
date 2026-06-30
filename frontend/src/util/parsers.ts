import { createParser } from 'nuqs';
import { Operator } from '@/types/operator';

/**
 * Custom parser for Operator type
 * Parses URL query parameters to Operator union type ("eq" | "gt" | "gte" | "lt" | "lte" | "ne")
 */
export const parseAsOperator = createParser({
  parse: (value) => {
    if (value === 'eq' || value === 'gt' || value === 'gte' || value === 'lt' || value === 'lte' || value === 'ne') {
      return value as Operator;
    }
    return null;
  },
  serialize: (value) => value ?? '',
});
