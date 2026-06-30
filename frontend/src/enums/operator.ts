import { Operator } from "@/types/operator";

/**
 * Operator Enum
 */
export const OperatorEnum = {
  EQ: "eq",
  GT: "gt",
  GTE: "gte",
  LT: "lt",
  LTE: "lte",
  NE: "ne",
} as const;


export const OPERATOR_OPTIONS: { value: Operator; label: string; symbol: string }[] = [
  { value: 'eq', label: 'Equal to (=)', symbol: '=' },
  { value: 'gt', label: 'Greater than (>)', symbol: '>' },
  { value: 'gte', label: 'Greater than or equal (≥)', symbol: '≥' },
  { value: 'lt', label: 'Less than (<)', symbol: '<' },
  { value: 'lte', label: 'Less than or equal (≤)', symbol: '≤' },
  { value: 'ne', label: 'Not equal to (≠)', symbol: '≠' },
];