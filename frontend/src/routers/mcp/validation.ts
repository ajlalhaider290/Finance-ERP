import { z } from "zod";

export const mcpTokenRequestValidator = z.object({
	expiryType: z.enum(['preset', 'custom_days', 'custom_datetime']),
	presetDays: z.number().optional(),
	customDays: z.number().min(1).max(365).optional(),
	customDateTime: z.string().optional(),
}).refine((data) => {
	if (data.expiryType === 'preset' && !data.presetDays) return false;
	if (data.expiryType === 'custom_days' && !data.customDays) return false;
	if (data.expiryType === 'custom_datetime' && !data.customDateTime) return false;
	return true;
}, {
	message: "Please provide a valid expiry option",
});
