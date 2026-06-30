import { z } from "zod";
import { Op } from "sequelize";
import { ExpenseCategory } from "../../models/expense-category";

export const expenseCategoryQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const expenseCategoryParamValidator = z.object({
	categoryId: z.uuid("Invalid UUID format"),
});


const _expenseCategoryBaseSchema = z.object({
	categoryName: z.string({error: "Category Name is required"}),
	description: z.string().nullable().optional().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format"),
});

export const createExpenseCategoryPayloadValidator = _expenseCategoryBaseSchema.refine(async (data) => {
		
  const existingExpenseCategory = await ExpenseCategory.findOne({
    where: {
    	categoryName: data.categoryName
    },
  });
  return !existingExpenseCategory;
}, {
  message: 'This combination of categoryName already exists',
  path: ['categoryName'],
});

export const updateExpenseCategoryPayloadValidator = (categoryId: string) => _expenseCategoryBaseSchema.refine(async (data) => {
		
    const whereClauseExpenseCategory: any = {
        categoryName: data.categoryName
    };

    if (categoryId) {
		whereClauseExpenseCategory.categoryId = { [Op.ne]: categoryId}
    }

    const existingExpenseCategory = await ExpenseCategory.findOne({
      where: whereClauseExpenseCategory,
    });
    return !existingExpenseCategory;
  }, {
    message: 'This combination of categoryName already exists',
    path: ['categoryName'],
  });


