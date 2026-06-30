import { z } from "zod";

export const expenseCategoryCreateSchema = z.object({
	categoryName: z.string({error: "Category Name is required"}),
	description: z.string().nullish().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format"),
});


export const expenseCategoryUpdateSchema = expenseCategoryCreateSchema;


