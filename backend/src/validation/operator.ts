import { OperatorEnum } from "../enums/operator";
import { Operator } from "../types/operator";
import z from "zod";

/** Zod schema for validation */
export const OperatorSchema = z.enum([
  OperatorEnum.EQ,
  OperatorEnum.GT,
  OperatorEnum.GTE,
  OperatorEnum.LT,
  OperatorEnum.LTE,
  OperatorEnum.NE,
]);

// Optional: array of values if you want iteration support
export const OperatorValues: Operator[] = Object.values(OperatorEnum);