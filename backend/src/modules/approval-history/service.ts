import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { ApprovalHistory } from '../../models/approval-history';
import { ApprovalTask } from '../../models/approval-task';
import { User } from '../../models/user';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { ApprovalHistoryPrimaryKeys, CreateApprovalHistoryInput, UpdateApprovalHistoryInput, QueryApprovalHistoryInput } from './types';

export const fetchApprovalHistoryList = async (params: QueryApprovalHistoryInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await ApprovalHistory.findAndCountAll({
		attributes: [
// taskId, documentType, documentId, approverId, actionValue, actionDate, userComment
			'taskId',
			[Sequelize.literal('(SELECT document_id FROM approval_tasks  WHERE approval_tasks.task_id = "ApprovalHistory".task_id LIMIT 1)'), 'approvalHistoryLabel'],
			'documentType',
			'documentId',
			'approverId',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "ApprovalHistory".approver_id LIMIT 1)'), 'approvalsMadeLabel'],
			'actionValue',
			'actionDate',
			'userComment',
			[Sequelize.literal(`json_build_object('label', "ApprovalHistory"."document_id", 'primaryKeys', json_build_object('historyId', "ApprovalHistory"."history_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectApprovalHistory = async () => {

	const results = await ApprovalHistory.findAll({
		attributes: [
			['history_id', 'value'],
			['document_id', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addApprovalHistory = async (payload: CreateApprovalHistoryInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const approvalHistoryDefaultPayload = {
			documentType: payload.documentType ?? "reimbursement",
			actionValue: payload.actionValue ?? "approved"
	};
	const approvalHistory = await ApprovalHistory.create({...payload, ...approvalHistoryDefaultPayload}, { transaction: t });

	return approvalHistory.get({ plain: true });
	});
};

export const editApprovalHistory = async (params: ApprovalHistoryPrimaryKeys): Promise<ApprovalHistory> => {
	// Initialize filters and include relationships
	const where: WhereOptions<ApprovalHistory> & Record<symbol, unknown> = {};

	const approvalHistory = await ApprovalHistory.findOne({
		attributes: [
// taskId, documentType, documentId, approverId, actionValue, userComment
			'taskId',
			'documentType',
			'documentId',
			'approverId',
			'actionValue',
			'userComment',
		],
		where: {
			historyId : params.historyId,
			...where,
		},
		
	});

	if (!approvalHistory) {
		throw notFound('ApprovalHistory', 'INVALID_APPROVAL_HISTORY_ID');
	}

	return approvalHistory.get({ plain: true }) as ApprovalHistory;
};

export const updateApprovalHistory = async (params: ApprovalHistoryPrimaryKeys, payload: UpdateApprovalHistoryInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<ApprovalHistory> & Record<symbol, unknown> = {};
	const approvalHistory = await ApprovalHistory.findOne({
		where: {
			historyId : params.historyId,
			...where,
		},
		transaction: t,
	});

	if (!approvalHistory) {
		throw notFound('ApprovalHistory', 'INVALID_APPROVAL_HISTORY_ID');
	}

	await approvalHistory.update(payload, { transaction: t });

	return {
		message: 'ApprovalHistory updated successfully',
		data: approvalHistory.get({ plain: true }),
	};
	});
};

export const getApprovalHistory = async (params: ApprovalHistoryPrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const approvalHistory = await ApprovalHistory.findOne({
		attributes: [
// taskId, documentType, documentId, approverId, actionValue, actionDate, userComment
			'taskId',
			[Sequelize.literal('(SELECT document_id FROM approval_tasks  WHERE approval_tasks.task_id = "ApprovalHistory".task_id LIMIT 1)'), 'approvalHistoryLabel'],
			'documentType',
			'documentId',
			'approverId',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "ApprovalHistory".approver_id LIMIT 1)'), 'approvalsMadeLabel'],
			'actionValue',
			'actionDate',
			'userComment',
			[Sequelize.literal(`json_build_object('label', "ApprovalHistory"."document_id", 'primaryKeys', json_build_object('historyId', "ApprovalHistory"."history_id"::text))`), '_meta'],
		],
		where: {
			historyId : params.historyId,
		},
		include: [...include],
		
	});

	if (!approvalHistory) {
		throw notFound('ApprovalHistory', 'INVALID_APPROVAL_HISTORY_ID');
	}

	return {
		data: approvalHistory.get({ plain: true }),
	};
};

export const deleteApprovalHistory = async (params: ApprovalHistoryPrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<ApprovalHistory> & Record<symbol, unknown> = {};
	const approvalHistory = await ApprovalHistory.findOne({
		where: {
			historyId : params.historyId,
			...where,
		},
		transaction: t,
	});

	if (!approvalHistory) {
		throw notFound('ApprovalHistory', 'INVALID_APPROVAL_HISTORY_ID');
	}

	await approvalHistory.destroy({ transaction: t });

	return { messageCode: 'APPROVAL_HISTORY_DELETED_SUCCESSFULLY',  message: 'approvalHistory Deleted Successfully' };
	});
};

