import { z } from "zod";
import { Op } from "sequelize";
import { Vendor } from "../../models/vendor";

export const vendorQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const vendorParamValidator = z.object({
	vendorId: z.uuid("Invalid UUID format"),
});


const _vendorBaseSchema = z.object({
	vendorName: z.string({error: "Vendor Name is required"}),
	contactEmail: z.email("Invalid email format").nullable().optional().or(z.literal('')),
	contactPhone: z.string().regex(/^[+]?[0-9\s\-()]+$/, "Invalid phone number format").nullable().optional().or(z.literal('')),
	address: z.string().nullable().optional().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format"),
});

export const createVendorPayloadValidator = _vendorBaseSchema.refine(async (data) => {
		
  const existingVendor = await Vendor.findOne({
    where: {
    	vendorName: data.vendorName
    },
  });
  return !existingVendor;
}, {
  message: 'This combination of vendorName already exists',
  path: ['vendorName'],
});

export const updateVendorPayloadValidator = (vendorId: string) => _vendorBaseSchema.refine(async (data) => {
		
    const whereClauseVendor: any = {
        vendorName: data.vendorName
    };

    if (vendorId) {
		whereClauseVendor.vendorId = { [Op.ne]: vendorId}
    }

    const existingVendor = await Vendor.findOne({
      where: whereClauseVendor,
    });
    return !existingVendor;
  }, {
    message: 'This combination of vendorName already exists',
    path: ['vendorName'],
  });

