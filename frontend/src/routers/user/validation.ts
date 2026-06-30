import { z } from "zod";
import { passwordZod } from '@/validation/password';

export const userCreateSchema = z.object({
	email: z.email("Invalid email format"),
	username: z.string({error: "Username is required"}),
	password: passwordZod({ context: 'general', label: "Password" }),
	role: z.enum(["superAdmin", "accountsManager", "accountant", "approver", "employee"]),
	department: z.string().nullish().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format").nullish(),
});


export const userUpdateSchema = userCreateSchema.omit({ password: true }).extend({
	password: passwordZod({ context: 'general', required: false, label: "Password" }).nullish().or(z.literal('')),
});


