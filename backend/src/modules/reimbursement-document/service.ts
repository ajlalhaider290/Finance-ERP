import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { ReimbursementDocument } from '../../models/reimbursement-document';
import { ReimbursementRequest } from '../../models/reimbursement-request';
import { User } from '../../models/user';
import { fileExists, uploadFile, sanitizeFileName, removeFile } from '../../util/fileUploader';
import { UploadedFile } from '../../types/file';
import { AppError, notFound, badRequest, conflict } from '../../errors';
import { AuthenticatedUserContext, buildReimbursementAccessWhere, canManageReimbursements, isEmployee } from '../reimbursement-request/access';


import { ReimbursementDocumentPrimaryKeys, CreateReimbursementDocumentInput, UpdateReimbursementDocumentInput, QueryReimbursementDocumentInput } from './types';

const getParentRequestAccessInclude = (user: AuthenticatedUserContext): Includeable => ({
	model: ReimbursementRequest,
	as: 'reimbursementDocuments',
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

export const fetchReimbursementDocumentList = async (params: QueryReimbursementDocumentInput, user: AuthenticatedUserContext) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await ReimbursementDocument.findAndCountAll({
		attributes: [
// reimbursementRequestId, documentType, fileUrl, fileName, uploadedById, createdAt, updatedAt
			'reimbursementRequestId',
			[Sequelize.literal('(SELECT business_purpose FROM reimbursement_requests  WHERE reimbursement_requests.reimbursement_request_id = "ReimbursementDocument".reimbursement_request_id LIMIT 1)'), 'reimbursementDocumentsLabel'],
			'documentType',
			'fileUrl',
			'fileName',
			'uploadedBy',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "ReimbursementDocument".uploaded_by LIMIT 1)'), 'documentsUploadedLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "ReimbursementDocument"."file_url", 'primaryKeys', json_build_object('documentId', "ReimbursementDocument"."document_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		include: [getParentRequestAccessInclude(user)],
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectReimbursementDocument = async (user: AuthenticatedUserContext) => {

	const results = await ReimbursementDocument.findAll({
		attributes: [
			['document_id', 'value'],
			['file_url', 'label'],
		],
		include: [getParentRequestAccessInclude(user)],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addReimbursementDocument = async (payload: CreateReimbursementDocumentInput, user: AuthenticatedUserContext): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties
	await assertParentRequestIsAccessible(payload.reimbursementRequestId, user, t);

	const scopedPayload = isEmployee(user) && !canManageReimbursements(user)
		? { ...payload, uploadedBy: user.userId }
		: payload;

	const reimbursementDocumentDefaultPayload = {
			documentType: scopedPayload.documentType ?? "receipt"
	};
	const reimbursementDocument = await ReimbursementDocument.create({...scopedPayload, ...reimbursementDocumentDefaultPayload}, { transaction: t });

	return reimbursementDocument.get({ plain: true });
	});
};

export const editReimbursementDocument = async (params: ReimbursementDocumentPrimaryKeys, user: AuthenticatedUserContext): Promise<ReimbursementDocument> => {
	// Initialize filters and include relationships
	const where: WhereOptions<ReimbursementDocument> & Record<symbol, unknown> = {};

	const reimbursementDocument = await ReimbursementDocument.findOne({
		attributes: [
// reimbursementRequestId, documentType, fileUrl, fileName, uploadedById
			'reimbursementRequestId',
			'documentType',
			'fileUrl',
			'fileName',
			'uploadedBy',
		],
		where: {
			documentId : params.documentId,
			...where,
		},
		include: [getParentRequestAccessInclude(user)],
		
	});

	if (!reimbursementDocument) {
		throw notFound('ReimbursementDocument', 'INVALID_REIMBURSEMENT_DOCUMENT_ID');
	}

	return reimbursementDocument.get({ plain: true }) as ReimbursementDocument;
};

export const updateReimbursementDocument = async (params: ReimbursementDocumentPrimaryKeys, payload: UpdateReimbursementDocumentInput, user: AuthenticatedUserContext): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<ReimbursementDocument> & Record<symbol, unknown> = {};
	const reimbursementDocument = await ReimbursementDocument.findOne({
		where: {
			documentId : params.documentId,
			...where,
		},
		include: [getParentRequestAccessInclude(user)],
		transaction: t,
	});

	if (!reimbursementDocument) {
		throw notFound('ReimbursementDocument', 'INVALID_REIMBURSEMENT_DOCUMENT_ID');
	}

	const { fileUrl: oldFileUrl } = reimbursementDocument;
	await assertParentRequestIsAccessible(payload.reimbursementRequestId, user, t);

	const scopedPayload = isEmployee(user) && !canManageReimbursements(user)
		? { ...payload, uploadedBy: user.userId }
		: payload;

	await reimbursementDocument.update(scopedPayload, { transaction: t });

	if (oldFileUrl && oldFileUrl !== payload.fileUrl) {
		await removeFile(oldFileUrl);

	}

	return {
		message: 'ReimbursementDocument updated successfully',
		data: reimbursementDocument.get({ plain: true }),
	};
	});
};

export const getReimbursementDocument = async (params: ReimbursementDocumentPrimaryKeys, user: AuthenticatedUserContext): Promise<any> => {
	const include: Includeable[] = [];

	const reimbursementDocument = await ReimbursementDocument.findOne({
		attributes: [
// reimbursementRequestId, documentType, fileUrl, fileName, uploadedById, createdAt, updatedAt
			'reimbursementRequestId',
			[Sequelize.literal('(SELECT business_purpose FROM reimbursement_requests  WHERE reimbursement_requests.reimbursement_request_id = "ReimbursementDocument".reimbursement_request_id LIMIT 1)'), 'reimbursementDocumentsLabel'],
			'documentType',
			'fileUrl',
			'fileName',
			'uploadedBy',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "ReimbursementDocument".uploaded_by LIMIT 1)'), 'documentsUploadedLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "ReimbursementDocument"."file_url", 'primaryKeys', json_build_object('documentId', "ReimbursementDocument"."document_id"::text))`), '_meta'],
		],
		where: {
			documentId : params.documentId,
		},
		include: [getParentRequestAccessInclude(user), ...include],
		
	});

	if (!reimbursementDocument) {
		throw notFound('ReimbursementDocument', 'INVALID_REIMBURSEMENT_DOCUMENT_ID');
	}

	return {
		data: reimbursementDocument.get({ plain: true }),
	};
};

export const deleteReimbursementDocument = async (params: ReimbursementDocumentPrimaryKeys, user: AuthenticatedUserContext): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<ReimbursementDocument> & Record<symbol, unknown> = {};
	const reimbursementDocument = await ReimbursementDocument.findOne({
		where: {
			documentId : params.documentId,
			...where,
		},
		include: [getParentRequestAccessInclude(user)],
		transaction: t,
	});

	if (!reimbursementDocument) {
		throw notFound('ReimbursementDocument', 'INVALID_REIMBURSEMENT_DOCUMENT_ID');
	}

	const { fileUrl } = reimbursementDocument;
	await reimbursementDocument.destroy({ transaction: t });

	if (fileUrl && fileUrl.length > 0) {
		await removeFile(fileUrl);
	}

	return { messageCode: 'REIMBURSEMENT_DOCUMENT_DELETED_SUCCESSFULLY',  message: 'reimbursementDocument Deleted Successfully' };
	});
};

export const uploadReimbursementDocument = async (file: UploadedFile): Promise<any> => {

	
	const prefix = (file.isImage ? 'img' : 'file') + '_' + Date.now();
	const fileName = sanitizeFileName(file.originalname, prefix);

	if (await fileExists(fileName)) {
		throw conflict(`File already exists with the name: ${fileName}`, 'FILE_EXIST');
	}

	try {
		await uploadFile(file.buffer, fileName);
		return {
			url: fileName,
			originalName: file.originalname,
			size: file.size,
			mimetype: file.mimetype,
		};
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown upload error';
		throw badRequest(errorMessage, 'UPLOAD_ERROR');
	}};

export const removeReimbursementDocumentUpload = async (params: ReimbursementDocumentPrimaryKeys, payload: { property: string }, user: AuthenticatedUserContext): Promise<any> => {
	const allowedUploadProperties = ['fileUrl'] as const;
	if (!allowedUploadProperties.includes(payload.property as typeof allowedUploadProperties[number])) {
		throw badRequest('Invalid upload property', 'INVALID_UPLOAD_PROPERTY');
	}

	const where: WhereOptions<ReimbursementDocument> & Record<symbol, unknown> = {};
	const reimbursementDocument = await ReimbursementDocument.findOne({
		where: {
			documentId : params.documentId,
			...where,
		},
		include: [getParentRequestAccessInclude(user)],
	});

	if (!reimbursementDocument) {
		throw notFound('ReimbursementDocument', 'INVALID_REIMBURSEMENT_DOCUMENT_ID');
	}

	const oldFileName = reimbursementDocument.dataValues[payload.property as keyof typeof reimbursementDocument.dataValues];

	if (oldFileName) {
		await reimbursementDocument.update({ [payload.property]: null });
		await removeFile(oldFileName as string);
		return { messageCode: 'USER_FILE_DELETED_SUCCESSFULLY', message: 'File deleted Successfully' };
	} else {
		throw badRequest('Invalid object user, property not found in the object', 'INVALID_OBJECT_USER_PROPERTY_NOT_FOUND');
	}
};
