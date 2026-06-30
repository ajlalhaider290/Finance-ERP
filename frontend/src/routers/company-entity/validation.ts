import { z } from "zod";

export const companyEntityCreateSchema = z.object({
	entityName: z.string({error: "Entity Name is required"}),
	currencyCode: z.string({error: "Currency Code is required"}),
});


export const companyEntityUpdateSchema = companyEntityCreateSchema;


