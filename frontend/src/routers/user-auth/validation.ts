import { z } from "zod";
import { passwordZod } from '@/validation/password';

export const loginUserPayloadValidator = z.object({
	email: z.email("Invalid email format"),
	password: passwordZod({ context: 'login', label: "Password" }),
});


export const registerUserPayloadValidator = z.object({
	email: z.email("Invalid email format"),
	username: z.string({error: "Username is required"}),
	password: passwordZod({ context: 'register', label: "Password" }),
	role: z.enum(["superAdmin", "accountsManager", "accountant", "approver", "employee"]),
	department: z.string().nullish().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format").nullish(),
});


export const profileUserPayloadValidator = z.object({
	userId: z.any().optional(),
	email: z.email("Invalid email format"),
	username: z.string({error: "Username is required"}),
	role: z.enum(["superAdmin", "accountsManager", "accountant", "approver", "employee"]),
	department: z.string().nullish().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format").nullish(),
	createdAt: z.any().optional(),
	updatedAt: z.any().optional(),
});


export const changePasswordUserPayloadValidator = z.object({
	currentPassword: z.string().min(1, "Current password is required"),
	newPassword: passwordZod({ context: 'changePassword', label: "Password" }),
	confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
});


export const forgotPasswordUserPayloadValidator = z.object({
	email: z.email("Please enter a valid email address").min(1, "Email is required"),
});


export const resetPasswordUserPayloadValidator = z.object({
	token: z.string().min(1, "Reset token is required"),
	newPassword: passwordZod({ context: 'resetPassword', label: "Password" }),
	confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
});


