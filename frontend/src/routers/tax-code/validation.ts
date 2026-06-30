import { z } from "zod";

export const taxCodeCreateSchema = z.object({
	taxCodeName: z.string({error: "Tax Code Name is required"}),
	rate: z.number({error: "Rate is required"}),
	description: z.string().nullish().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format"),
	isActive: z.boolean().refine(val => val === true || val === false, "Must be active or inactive"),
});


export const taxCodeUpdateSchema = taxCodeCreateSchema;


