import { z } from "zod";

export const customerCreateSchema = z.object({
	customerName: z.string({error: "Customer Name is required"}),
	contactEmail: z.email("Invalid email format").nullish().or(z.literal('')),
	contactPhone: z.string().regex(/^[+]?[0-9\s\-()]+$/, "Invalid phone number format").nullish().or(z.literal('')),
	address: z.string().nullish().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format"),
});


export const customerUpdateSchema = customerCreateSchema;

