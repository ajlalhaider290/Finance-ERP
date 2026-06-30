import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { ApprovalTask } from '../../models/approval-task';
import { User } from '../../models/user';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { ApprovalTaskPrimaryKeys, CreateApprovalTaskInput, UpdateApprovalTaskInput, QueryApprovalTaskInput } from './types';

export const fetchApprovalTaskList = async (params: QueryApprovalTaskInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await ApprovalTask.findAndCountAll({
		attributes: [
// documentType, documentId, assignedToUserId, assignedToRole, status, userComment, actionedById, actionedAt, createdAt, updatedAt
			'documentType',
			'documentId',
			'assignedToUserId',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "ApprovalTask".assigned_to_user_id LIMIT 1)'), 'assignedApprovalTasksLabel'],
			'assignedToRole',
			'status',
			'userComment',
			'actionedBy',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "ApprovalTask".actioned_by LIMIT 1)'), 'actionedApprovalTasksLabel'],
			'actionedAt',
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "ApprovalTask"."document_id", 'primaryKeys', json_build_object('taskId', "ApprovalTask"."task_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectApprovalTask = async () => {

	const results = await ApprovalTask.findAll({
		attributes: [
			['task_id', 'value'],
			['document_id', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addApprovalTask = async (payload: CreateApprovalTaskInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const approvalTaskDefaultPayload = {
			documentType: payload.documentType ?? "reimbursement",
			status: payload.status ?? "pending",
			actionedAt: payload.actionedAt ?? new Date()
	};
	const approvalTask = await ApprovalTask.create({...payload, ...approvalTaskDefaultPayload}, { transaction: t });

	return approvalTask.get({ plain: true });
	});
};

export const editApprovalTask = async (params: ApprovalTaskPrimaryKeys): Promise<ApprovalTask> => {
	// Initialize filters and include relationships
	const where: WhereOptions<ApprovalTask> & Record<symbol, unknown> = {};

	const approvalTask = await ApprovalTask.findOne({
		attributes: [
// documentType, documentId, assignedToUserId, assignedToRole, status, userComment, actionedById, actionedAt
			'documentType',
			'documentId',
			'assignedToUserId',
			'assignedToRole',
			'status',
			'userComment',
			'actionedBy',
			'actionedAt',
		],
		where: {
			taskId : params.taskId,
			...where,
		},
		
	});

	if (!approvalTask) {
		throw notFound('ApprovalTask', 'INVALID_APPROVAL_TASK_ID');
	}

	return approvalTask.get({ plain: true }) as ApprovalTask;
};

export const updateApprovalTask = async (params: ApprovalTaskPrimaryKeys, payload: UpdateApprovalTaskInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<ApprovalTask> & Record<symbol, unknown> = {};
	const approvalTask = await ApprovalTask.findOne({
		where: {
			taskId : params.taskId,
			...where,
		},
		transaction: t,
	});

	if (!approvalTask) {
		throw notFound('ApprovalTask', 'INVALID_APPROVAL_TASK_ID');
	}

	await approvalTask.update(payload, { transaction: t });

	return {
		message: 'ApprovalTask updated successfully',
		data: approvalTask.get({ plain: true }),
	};
	});
};

export const getApprovalTask = async (params: ApprovalTaskPrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const approvalTask = await ApprovalTask.findOne({
		attributes: [
// documentType, documentId, assignedToUserId, assignedToRole, status, userComment, actionedById, actionedAt, createdAt, updatedAt
			'documentType',
			'documentId',
			'assignedToUserId',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "ApprovalTask".assigned_to_user_id LIMIT 1)'), 'assignedApprovalTasksLabel'],
			'assignedToRole',
			'status',
			'userComment',
			'actionedBy',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "ApprovalTask".actioned_by LIMIT 1)'), 'actionedApprovalTasksLabel'],
			'actionedAt',
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "ApprovalTask"."document_id", 'primaryKeys', json_build_object('taskId', "ApprovalTask"."task_id"::text))`), '_meta'],
		],
		where: {
			taskId : params.taskId,
		},
		include: [...include],
		
	});

	if (!approvalTask) {
		throw notFound('ApprovalTask', 'INVALID_APPROVAL_TASK_ID');
	}

	return {
		data: approvalTask.get({ plain: true }),
	};
};

export const deleteApprovalTask = async (params: ApprovalTaskPrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<ApprovalTask> & Record<symbol, unknown> = {};
	const approvalTask = await ApprovalTask.findOne({
		where: {
			taskId : params.taskId,
			...where,
		},
		transaction: t,
	});

	if (!approvalTask) {
		throw notFound('ApprovalTask', 'INVALID_APPROVAL_TASK_ID');
	}

	await approvalTask.destroy({ transaction: t });

	return { messageCode: 'APPROVAL_TASK_DELETED_SUCCESSFULLY',  message: 'approvalTask Deleted Successfully' };
	});
};

