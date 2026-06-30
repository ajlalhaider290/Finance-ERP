import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { ReimbursementRequest } from '../../models/reimbursement-request';
import { User } from '../../models/user';
import { ExpenseCategory } from '../../models/expense-category';
import { CompanyEntity } from '../../models/company-entity';
import { convertStringFieldsToNumbers } from '../../util/dataTransform';
import { AppError, notFound, badRequest, conflict } from '../../errors';
import {
	AuthenticatedUserContext,
	buildReimbursementAccessWhere,
	canManageReimbursements,
	isApprover,
	isEmployee,
	sanitizeEmployeeReimbursementPayload,
} from './access';


import { ReimbursementRequestPrimaryKeys, CreateReimbursementRequestInput, UpdateReimbursementRequestInput, QueryReimbursementRequestInput } from './types';

export const fetchReimbursementRequestList = async (params: QueryReimbursementRequestInput, user: AuthenticatedUserContext) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;
	const where = buildReimbursementAccessWhere(user);

	const { count, rows } = await ReimbursementRequest.findAndCountAll({
		attributes: [
// employeeId, businessPurpose, expenseDate, categoryId, costCenter, department, currencyCode, amount, taxAmount, totalAmount, status, currentApproverId, paidDate, entityId, createdAt, updatedAt
			'employeeId',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "ReimbursementRequest".employee_id LIMIT 1)'), 'employeeLabel'],
			'businessPurpose',
			'expenseDate',
			'categoryId',
			[Sequelize.literal('(SELECT category_name FROM expense_categories  WHERE expense_categories.category_id = "ReimbursementRequest".category_id LIMIT 1)'), 'categoryLabel'],
			'costCenter',
			'department',
			'currencyCode',
			'amount',
			'taxAmount',
			'totalAmount',
			'status',
			'currentApproverId',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "ReimbursementRequest".current_approver_id LIMIT 1)'), 'approvalsAssignedLabel'],
			'paidDate',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "ReimbursementRequest".entity_id LIMIT 1)'), 'entityLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "ReimbursementRequest"."business_purpose", 'primaryKeys', json_build_object('reimbursementRequestId', "ReimbursementRequest"."reimbursement_request_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		where,
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectReimbursementRequest = async (user: AuthenticatedUserContext) => {
	const where = buildReimbursementAccessWhere(user);

	const results = await ReimbursementRequest.findAll({
		attributes: [
			['reimbursement_request_id', 'value'],
			['business_purpose', 'label'],
		],
		where,
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addReimbursementRequest = async (payload: CreateReimbursementRequestInput, user: AuthenticatedUserContext): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties
	const scopedPayload = isEmployee(user) && !canManageReimbursements(user)
		? sanitizeEmployeeReimbursementPayload(payload, user)
		: payload;

	const reimbursementRequestDefaultPayload = {
			expenseDate: scopedPayload.expenseDate ?? new Date(),
			currencyCode: scopedPayload.currencyCode ?? "USD",
			amount: scopedPayload.amount ?? 0,
			taxAmount: scopedPayload.taxAmount ?? 0,
			totalAmount: scopedPayload.totalAmount ?? "0.00",
			status: scopedPayload.status ?? "draft",
			paidDate: scopedPayload.paidDate ?? null
	};
	const reimbursementRequest = await ReimbursementRequest.create({...scopedPayload, ...reimbursementRequestDefaultPayload}, { transaction: t });

	return reimbursementRequest.get({ plain: true });
	});
};

export const editReimbursementRequest = async (params: ReimbursementRequestPrimaryKeys, user: AuthenticatedUserContext): Promise<ReimbursementRequest> => {
	// Initialize filters and include relationships
	const where = buildReimbursementAccessWhere(user);

	const reimbursementRequest = await ReimbursementRequest.findOne({
		attributes: [
// employeeId, businessPurpose, expenseDate, categoryId, costCenter, department, currencyCode, amount, taxAmount, totalAmount, status, currentApproverId, paidDate, entityId
			'employeeId',
			'businessPurpose',
			'expenseDate',
			'categoryId',
			'costCenter',
			'department',
			'currencyCode',
			'amount',
			'taxAmount',
			'totalAmount',
			'status',
			'currentApproverId',
			'paidDate',
			'entityId',
		],
		where: {
			reimbursementRequestId : params.reimbursementRequestId,
			...where,
		},
		
	});

	if (!reimbursementRequest) {
		throw notFound('ReimbursementRequest', 'INVALID_REIMBURSEMENT_REQUEST_ID');
	}

	const reimbursementRequestData = reimbursementRequest.get({ plain: true });
	return convertStringFieldsToNumbers(reimbursementRequestData, ['amount', 'taxAmount']) as ReimbursementRequest;
};

export const updateReimbursementRequest = async (params: ReimbursementRequestPrimaryKeys, payload: UpdateReimbursementRequestInput, user: AuthenticatedUserContext): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where = isEmployee(user) && !canManageReimbursements(user) && !isApprover(user)
		? { employeeId: user.userId }
		: buildReimbursementAccessWhere(user);
	const reimbursementRequest = await ReimbursementRequest.findOne({
		where: {
			reimbursementRequestId : params.reimbursementRequestId,
			...where,
		},
		transaction: t,
	});

	if (!reimbursementRequest) {
		throw notFound('ReimbursementRequest', 'INVALID_REIMBURSEMENT_REQUEST_ID');
	}

	const scopedPayload = isEmployee(user) && !canManageReimbursements(user)
		? sanitizeEmployeeReimbursementPayload(payload, user)
		: payload;

	await reimbursementRequest.update(scopedPayload, { transaction: t });

	return {
		message: 'ReimbursementRequest updated successfully',
		data: reimbursementRequest.get({ plain: true }),
	};
	});
};

export const getReimbursementRequest = async (params: ReimbursementRequestPrimaryKeys, user: AuthenticatedUserContext): Promise<any> => {
	const include: Includeable[] = [];
	const where = buildReimbursementAccessWhere(user);

	const reimbursementRequest = await ReimbursementRequest.findOne({
		attributes: [
// employeeId, businessPurpose, expenseDate, categoryId, costCenter, department, currencyCode, amount, taxAmount, totalAmount, status, currentApproverId, paidDate, entityId, createdAt, updatedAt
			'employeeId',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "ReimbursementRequest".employee_id LIMIT 1)'), 'employeeLabel'],
			'businessPurpose',
			'expenseDate',
			'categoryId',
			[Sequelize.literal('(SELECT category_name FROM expense_categories  WHERE expense_categories.category_id = "ReimbursementRequest".category_id LIMIT 1)'), 'categoryLabel'],
			'costCenter',
			'department',
			'currencyCode',
			'amount',
			'taxAmount',
			'totalAmount',
			'status',
			'currentApproverId',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "ReimbursementRequest".current_approver_id LIMIT 1)'), 'approvalsAssignedLabel'],
			'paidDate',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "ReimbursementRequest".entity_id LIMIT 1)'), 'entityLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "ReimbursementRequest"."business_purpose", 'primaryKeys', json_build_object('reimbursementRequestId', "ReimbursementRequest"."reimbursement_request_id"::text))`), '_meta'],
		],
		where: {
			reimbursementRequestId : params.reimbursementRequestId,
			...where,
		},
		include: [...include],
		
	});

	if (!reimbursementRequest) {
		throw notFound('ReimbursementRequest', 'INVALID_REIMBURSEMENT_REQUEST_ID');
	}

	return {
		data: reimbursementRequest.get({ plain: true }),
	};
};

export const deleteReimbursementRequest = async (params: ReimbursementRequestPrimaryKeys, user: AuthenticatedUserContext): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where = buildReimbursementAccessWhere(user);
	const reimbursementRequest = await ReimbursementRequest.findOne({
		where: {
			reimbursementRequestId : params.reimbursementRequestId,
			...where,
		},
		transaction: t,
	});

	if (!reimbursementRequest) {
		throw notFound('ReimbursementRequest', 'INVALID_REIMBURSEMENT_REQUEST_ID');
	}

	await reimbursementRequest.destroy({ transaction: t });

	return { messageCode: 'REIMBURSEMENT_REQUEST_DELETED_SUCCESSFULLY',  message: 'reimbursementRequest Deleted Successfully' };
	});
};
