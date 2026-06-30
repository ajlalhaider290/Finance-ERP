import { z } from "zod";
import { Op } from "sequelize";
import { CompanyEntity } from "../../models/company-entity";

export const companyEntityQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const companyEntityParamValidator = z.object({
	entityId: z.uuid("Invalid UUID format"),
});


const _companyEntityBaseSchema = z.object({
	entityName: z.string({error: "Entity Name is required"}),
	currencyCode: z.string({error: "Currency Code is required"}),
});

export const createCompanyEntityPayloadValidator = _companyEntityBaseSchema.refine(async (data) => {
		
  const existingCompanyEntity = await CompanyEntity.findOne({
    where: {
    	entityName: data.entityName
    },
  });
  return !existingCompanyEntity;
}, {
  message: 'This combination of entityName already exists',
  path: ['entityName'],
});

export const updateCompanyEntityPayloadValidator = (entityId: string) => _companyEntityBaseSchema.refine(async (data) => {
		
    const whereClauseCompanyEntity: any = {
        entityName: data.entityName
    };

    if (entityId) {
		whereClauseCompanyEntity.entityId = { [Op.ne]: entityId}
    }

    const existingCompanyEntity = await CompanyEntity.findOne({
      where: whereClauseCompanyEntity,
    });
    return !existingCompanyEntity;
  }, {
    message: 'This combination of entityName already exists',
    path: ['entityName'],
  });


