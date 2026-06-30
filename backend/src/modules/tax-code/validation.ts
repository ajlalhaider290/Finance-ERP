import { z } from "zod";
import { Op } from "sequelize";
import { TaxCode } from "../../models/tax-code";

export const taxCodeQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const taxCodeParamValidator = z.object({
	taxCodeId: z.uuid("Invalid UUID format"),
});


const _taxCodeBaseSchema = z.object({
	taxCodeName: z.string({error: "Tax Code Name is required"}),
	rate: z.coerce.number({error: "Rate is required"}),
	description: z.string().nullable().optional().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format"),
	isActive: z.coerce.boolean().refine(val => val === true || val === false, "Must be active or inactive"),
});

export const createTaxCodePayloadValidator = _taxCodeBaseSchema.refine(async (data) => {
		
  const existingTaxCode = await TaxCode.findOne({
    where: {
    	taxCodeName: data.taxCodeName
    },
  });
  return !existingTaxCode;
}, {
  message: 'This combination of taxCodeName already exists',
  path: ['taxCodeName'],
});

export const updateTaxCodePayloadValidator = (taxCodeId: string) => _taxCodeBaseSchema.refine(async (data) => {
		
    const whereClauseTaxCode: any = {
        taxCodeName: data.taxCodeName
    };

    if (taxCodeId) {
		whereClauseTaxCode.taxCodeId = { [Op.ne]: taxCodeId}
    }

    const existingTaxCode = await TaxCode.findOne({
      where: whereClauseTaxCode,
    });
    return !existingTaxCode;
  }, {
    message: 'This combination of taxCodeName already exists',
    path: ['taxCodeName'],
  });


