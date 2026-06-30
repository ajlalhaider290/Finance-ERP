import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { ReimbursementStatusHistory } from '../../models/reimbursement-status-history';
import { ReimbursementRequest } from '../../models/reimbursement-request';
import { User } from '../../models/user';
import { AppError, notFound, badRequest, conflict } from '../../errors';
import { AuthenticatedUserContext, buildReimbursementAccessWhere, canManageReimbursements, isEmployee } from '../reimbursement-request/access';


import { ReimbursementStatusHistoryPrimaryKeys, CreateReimbursementStatusHistoryInput, UpdateReimbursementStatusHistoryInput, QueryReimbursementStatusHistoryInput } from './types';

const getParentRequestAccessInclude = (user: AuthenticatedUserContext): Includeable => ({
	model: ReimbursementRequest,
	as: 'statusHistory',
	attributes: [],
	required: true,
	where: buildReimbursementAccessWhere(user),
});

const assertParentRequestIsAccessible = async (reimbursementRequestId: string, user: AuthenticatedUserContext, transaction?: any) => {
	const parentRequest = await ReimbursementRequest.findOne({
		where: {
			reimbursementRequestId,
			...buildReimbursementAccessWhere(user),
		},
		transaction,
	});

	if (!parentRequest) {
		throw notFound('ReimbursementRequest', 'INVALID_REIMBURSEMENT_REQUEST_ID');
	}
};

export const fetchReimbursementStatusHistoryList = async (params: QueryReimbursementStatusHistoryInput, user: AuthenticatedUserContext) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await ReimbursementStatusHistory.findAndCountAll({
		attributes: [
// reimbursementRequestId, oldStatus, newStatus, changedById, changeDate, userComment
			'reimbursementRequestId',
			[Sequelize.literal('(SELECT business_purpose FROM reimbursement_requests  WHERE reimbursement_requests.reimbursement_request_id = "ReimbursementStatusHistory".reimbursement_request_id LIMIT 1)'), 'statusHistoryLabel'],
			'oldStatus',
			'newStatus',
			'changedBy',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "ReimbursementStatusHistory".changed_by LIMIT 1)'), 'statusChangesMadeLabel'],
			'changeDate',
			'userComment',
			[Sequelize.literal(`json_build_object('label', "ReimbursementStatusHistory"."old_status", 'primaryKeys', json_build_object('statusHistoryId', "ReimbursementStatusHistory"."status_history_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		include: [getParentRequestAccessInclude(user)],
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectReimbursementStatusHistory = async (user: AuthenticatedUserContext) => {

	const results = await ReimbursementStatusHistory.findAll({
		attributes: [
			['status_history_id', 'value'],
			['old_status', 'label'],
		],
		include: [getParentRequestAccessInclude(user)],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addReimbursementStatusHistory = async (payload: CreateReimbursementStatusHistoryInput, user: AuthenticatedUserContext): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties
	await assertParentRequestIsAccessible(payload.reimbursementRequestId, user, t);
	const scopedPayload = isEmployee(user) && !canManageReimbursements(user)
		? { ...payload, changedBy: user.userId }
		: payload;

	const reimbursementStatusHistory = await ReimbursementStatusHistory.create(scopedPayload, { transaction: t });

	return reimbursementStatusHistory.get({ plain: true });
	});
};

export const editReimbursementStatusHistory = async (params: ReimbursementStatusHistoryPrimaryKeys, user: AuthenticatedUserContext): Promise<ReimbursementStatusHistory> => {
	// Initialize filters and include relationships
	const where: WhereOptions<ReimbursementStatusHistory> & Record<symbol, unknown> = {};

	const reimbursementStatusHistory = await ReimbursementStatusHistory.findOne({
		attributes: [
// reimbursementRequestId, oldStatus, newStatus, changedById, userComment
			'reimbursementRequestId',
			'oldStatus',
			'newStatus',
			'changedBy',
			'userComment',
		],
		where: {
			statusHistoryId : params.statusHistoryId,
			...where,
		},
		include: [getParentRequestAccessInclude(user)],
		
	});

	if (!reimbursementStatusHistory) {
		throw notFound('ReimbursementStatusHistory', 'INVALID_REIMBURSEMENT_STATUS_HISTORY_ID');
	}

	return reimbursementStatusHistory.get({ plain: true }) as ReimbursementStatusHistory;
};

export const updateReimbursementStatusHistory = async (params: ReimbursementStatusHistoryPrimaryKeys, payload: UpdateReimbursementStatusHistoryInput, user: AuthenticatedUserContext): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<ReimbursementStatusHistory> & Record<symbol, unknown> = {};
	const reimbursementStatusHistory = await ReimbursementStatusHistory.findOne({
		where: {
			statusHistoryId : params.statusHistoryId,
			...where,
		},
		include: [getParentRequestAccessInclude(user)],
		transaction: t,
	});

	if (!reimbursementStatusHistory) {
		throw notFound('ReimbursementStatusHistory', 'INVALID_REIMBURSEMENT_STATUS_HISTORY_ID');
	}

	await assertParentRequestIsAccessible(payload.reimbursementRequestId, user, t);
	const scopedPayload = isEmployee(user) && !canManageReimbursements(user)
		? { ...payload, changedBy: user.userId }
		: payload;

	await reimbursementStatusHistory.update(scopedPayload, { transaction: t });

	return {
		message: 'ReimbursementStatusHistory updated successfully',
		data: reimbursementStatusHistory.get({ plain: true }),
	};
	});
};

export const getReimbursementStatusHistory = async (params: ReimbursementStatusHistoryPrimaryKeys, user: AuthenticatedUserContext): Promise<any> => {
	const include: Includeable[] = [];

	const reimbursementStatusHistory = await ReimbursementStatusHistory.findOne({
		attributes: [
// reimbursementRequestId, oldStatus, newStatus, changedById, changeDate, userComment
			'reimbursementRequestId',
			[Sequelize.literal('(SELECT business_purpose FROM reimbursement_requests  WHERE reimbursement_requests.reimbursement_request_id = "ReimbursementStatusHistory".reimbursement_request_id LIMIT 1)'), 'statusHistoryLabel'],
			'oldStatus',
			'newStatus',
			'changedBy',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "ReimbursementStatusHistory".changed_by LIMIT 1)'), 'statusChangesMadeLabel'],
			'changeDate',
			'userComment',
			[Sequelize.literal(`json_build_object('label', "ReimbursementStatusHistory"."old_status", 'primaryKeys', json_build_object('statusHistoryId', "ReimbursementStatusHistory"."status_history_id"::text))`), '_meta'],
		],
		where: {
			statusHistoryId : params.statusHistoryId,
		},
		include: [getParentRequestAccessInclude(user), ...include],
		
	});

	if (!reimbursementStatusHistory) {
		throw notFound('ReimbursementStatusHistory', 'INVALID_REIMBURSEMENT_STATUS_HISTORY_ID');
	}

	return {
		data: reimbursementStatusHistory.get({ plain: true }),
	};
};

export const deleteReimbursementStatusHistory = async (params: ReimbursementStatusHistoryPrimaryKeys, user: AuthenticatedUserContext): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<ReimbursementStatusHistory> & Record<symbol, unknown> = {};
	const reimbursementStatusHistory = await ReimbursementStatusHistory.findOne({
		where: {
			statusHistoryId : params.statusHistoryId,
			...where,
		},
		include: [getParentRequestAccessInclude(user)],
		transaction: t,
	});

	if (!reimbursementStatusHistory) {
		throw notFound('ReimbursementStatusHistory', 'INVALID_REIMBURSEMENT_STATUS_HISTORY_ID');
	}

	await reimbursementStatusHistory.destroy({ transaction: t });

	return { messageCode: 'REIMBURSEMENT_STATUS_HISTORY_DELETED_SUCCESSFULLY',  message: 'reimbursementStatusHistory Deleted Successfully' };
	});
};
