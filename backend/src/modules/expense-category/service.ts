import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { ExpenseCategory } from '../../models/expense-category';
import { CompanyEntity } from '../../models/company-entity';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { ExpenseCategoryPrimaryKeys, CreateExpenseCategoryInput, UpdateExpenseCategoryInput, QueryExpenseCategoryInput } from './types';

export const fetchExpenseCategoryList = async (params: QueryExpenseCategoryInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await ExpenseCategory.findAndCountAll({
		attributes: [
// categoryName, description, entityId, createdAt, updatedAt
			'categoryName',
			'description',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "ExpenseCategory".entity_id LIMIT 1)'), 'expenseCategoriesLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "ExpenseCategory"."category_name", 'primaryKeys', json_build_object('categoryId', "ExpenseCategory"."category_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectExpenseCategory = async () => {

	const results = await ExpenseCategory.findAll({
		attributes: [
			['category_id', 'value'],
			['category_name', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addExpenseCategory = async (payload: CreateExpenseCategoryInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const expenseCategory = await ExpenseCategory.create(payload, { transaction: t });

	return expenseCategory.get({ plain: true });
	});
};

export const editExpenseCategory = async (params: ExpenseCategoryPrimaryKeys): Promise<ExpenseCategory> => {
	// Initialize filters and include relationships
	const where: WhereOptions<ExpenseCategory> & Record<symbol, unknown> = {};

	const expenseCategory = await ExpenseCategory.findOne({
		attributes: [
// categoryName, description, entityId
			'categoryName',
			'description',
			'entityId',
		],
		where: {
			categoryId : params.categoryId,
			...where,
		},
		
	});

	if (!expenseCategory) {
		throw notFound('ExpenseCategory', 'INVALID_EXPENSE_CATEGORY_ID');
	}

	return expenseCategory.get({ plain: true }) as ExpenseCategory;
};

export const updateExpenseCategory = async (params: ExpenseCategoryPrimaryKeys, payload: UpdateExpenseCategoryInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<ExpenseCategory> & Record<symbol, unknown> = {};
	const expenseCategory = await ExpenseCategory.findOne({
		where: {
			categoryId : params.categoryId,
			...where,
		},
		transaction: t,
	});

	if (!expenseCategory) {
		throw notFound('ExpenseCategory', 'INVALID_EXPENSE_CATEGORY_ID');
	}

	await expenseCategory.update(payload, { transaction: t });

	return {
		message: 'ExpenseCategory updated successfully',
		data: expenseCategory.get({ plain: true }),
	};
	});
};

export const getExpenseCategory = async (params: ExpenseCategoryPrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const expenseCategory = await ExpenseCategory.findOne({
		attributes: [
// categoryName, description, entityId, createdAt, updatedAt
			'categoryName',
			'description',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "ExpenseCategory".entity_id LIMIT 1)'), 'expenseCategoriesLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "ExpenseCategory"."category_name", 'primaryKeys', json_build_object('categoryId', "ExpenseCategory"."category_id"::text))`), '_meta'],
		],
		where: {
			categoryId : params.categoryId,
		},
		include: [...include],
		
	});

	if (!expenseCategory) {
		throw notFound('ExpenseCategory', 'INVALID_EXPENSE_CATEGORY_ID');
	}

	return {
		data: expenseCategory.get({ plain: true }),
	};
};

export const deleteExpenseCategory = async (params: ExpenseCategoryPrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<ExpenseCategory> & Record<symbol, unknown> = {};
	const expenseCategory = await ExpenseCategory.findOne({
		where: {
			categoryId : params.categoryId,
			...where,
		},
		transaction: t,
	});

	if (!expenseCategory) {
		throw notFound('ExpenseCategory', 'INVALID_EXPENSE_CATEGORY_ID');
	}

	await expenseCategory.destroy({ transaction: t });

	return { messageCode: 'EXPENSE_CATEGORY_DELETED_SUCCESSFULLY',  message: 'expenseCategory Deleted Successfully' };
	});
};

