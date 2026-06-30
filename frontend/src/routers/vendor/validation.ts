import { z } from "zod";

export const vendorCreateSchema = z.object({
	vendorName: z.string({error: "Vendor Name is required"}),
	contactEmail: z.email("Invalid email format").nullish().or(z.literal('')),
	contactPhone: z.string().regex(/^[+]?[0-9\s\-()]+$/, "Invalid phone number format").nullish().or(z.literal('')),
	address: z.string().nullish().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format"),
});


export const vendorUpdateSchema = vendorCreateSchema;

