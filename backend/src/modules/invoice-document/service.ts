import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { InvoiceDocument } from '../../models/invoice-document';
import { User } from '../../models/user';
import { fileExists, uploadFile, sanitizeFileName, removeFile } from '../../util/fileUploader';
import { UploadedFile } from '../../types/file';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { InvoiceDocumentPrimaryKeys, CreateInvoiceDocumentInput, UpdateInvoiceDocumentInput, QueryInvoiceDocumentInput } from './types';

export const fetchInvoiceDocumentList = async (params: QueryInvoiceDocumentInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await InvoiceDocument.findAndCountAll({
		attributes: [
// fileUrl, fileName, uploadedById, createdAt, updatedAt
			'fileUrl',
			'fileName',
			'uploadedBy',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "InvoiceDocument".uploaded_by LIMIT 1)'), 'invoiceDocumentsUploadedLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "InvoiceDocument"."file_url", 'primaryKeys', json_build_object('documentId', "InvoiceDocument"."document_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectInvoiceDocument = async () => {

	const results = await InvoiceDocument.findAll({
		attributes: [
			['document_id', 'value'],
			['file_url', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addInvoiceDocument = async (payload: CreateInvoiceDocumentInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const invoiceDocument = await InvoiceDocument.create(payload, { transaction: t });

	return invoiceDocument.get({ plain: true });
	});
};

export const editInvoiceDocument = async (params: InvoiceDocumentPrimaryKeys): Promise<InvoiceDocument> => {
	// Initialize filters and include relationships
	const where: WhereOptions<InvoiceDocument> & Record<symbol, unknown> = {};

	const invoiceDocument = await InvoiceDocument.findOne({
		attributes: [
// fileUrl, fileName, uploadedById
			'fileUrl',
			'fileName',
			'uploadedBy',
		],
		where: {
			documentId : params.documentId,
			...where,
		},
		
	});

	if (!invoiceDocument) {
		throw notFound('InvoiceDocument', 'INVALID_INVOICE_DOCUMENT_ID');
	}

	return invoiceDocument.get({ plain: true }) as InvoiceDocument;
};

export const updateInvoiceDocument = async (params: InvoiceDocumentPrimaryKeys, payload: UpdateInvoiceDocumentInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<InvoiceDocument> & Record<symbol, unknown> = {};
	const invoiceDocument = await InvoiceDocument.findOne({
		where: {
			documentId : params.documentId,
			...where,
		},
		transaction: t,
	});

	if (!invoiceDocument) {
		throw notFound('InvoiceDocument', 'INVALID_INVOICE_DOCUMENT_ID');
	}

	const { fileUrl: oldFileUrl } = invoiceDocument;

	await invoiceDocument.update(payload, { transaction: t });

	if (oldFileUrl && oldFileUrl !== payload.fileUrl) {
		await removeFile(oldFileUrl);

	}

	return {
		message: 'InvoiceDocument updated successfully',
		data: invoiceDocument.get({ plain: true }),
	};
	});
};

export const getInvoiceDocument = async (params: InvoiceDocumentPrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const invoiceDocument = await InvoiceDocument.findOne({
		attributes: [
// fileUrl, fileName, uploadedById, createdAt, updatedAt
			'fileUrl',
			'fileName',
			'uploadedBy',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "InvoiceDocument".uploaded_by LIMIT 1)'), 'invoiceDocumentsUploadedLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "InvoiceDocument"."file_url", 'primaryKeys', json_build_object('documentId', "InvoiceDocument"."document_id"::text))`), '_meta'],
		],
		where: {
			documentId : params.documentId,
		},
		include: [...include],
		
	});

	if (!invoiceDocument) {
		throw notFound('InvoiceDocument', 'INVALID_INVOICE_DOCUMENT_ID');
	}

	return {
		data: invoiceDocument.get({ plain: true }),
	};
};

export const deleteInvoiceDocument = async (params: InvoiceDocumentPrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<InvoiceDocument> & Record<symbol, unknown> = {};
	const invoiceDocument = await InvoiceDocument.findOne({
		where: {
			documentId : params.documentId,
			...where,
		},
		transaction: t,
	});

	if (!invoiceDocument) {
		throw notFound('InvoiceDocument', 'INVALID_INVOICE_DOCUMENT_ID');
	}

	const { fileUrl } = invoiceDocument;
	await invoiceDocument.destroy({ transaction: t });

	if (fileUrl && fileUrl.length > 0) {
		await removeFile(fileUrl);
	}

	return { messageCode: 'INVOICE_DOCUMENT_DELETED_SUCCESSFULLY',  message: 'invoiceDocument Deleted Successfully' };
	});
};

export const uploadInvoiceDocument = async (file: UploadedFile): Promise<any> => {

	
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

export const removeInvoiceDocumentUpload = async (params: InvoiceDocumentPrimaryKeys, payload: { property: string }): Promise<any> => {
	const allowedUploadProperties = ['fileUrl'] as const;
	if (!allowedUploadProperties.includes(payload.property as typeof allowedUploadProperties[number])) {
		throw badRequest('Invalid upload property', 'INVALID_UPLOAD_PROPERTY');
	}

	const where: WhereOptions<InvoiceDocument> & Record<symbol, unknown> = {};
	const invoiceDocument = await InvoiceDocument.findOne({
		where: {
			documentId : params.documentId,
			...where,
		},
	});

	if (!invoiceDocument) {
		throw notFound('InvoiceDocument', 'INVALID_INVOICE_DOCUMENT_ID');
	}

	const oldFileName = invoiceDocument.dataValues[payload.property as keyof typeof invoiceDocument.dataValues];

	if (oldFileName) {
		await invoiceDocument.update({ [payload.property]: null });
		await removeFile(oldFileName as string);
		return { messageCode: 'USER_FILE_DELETED_SUCCESSFULLY', message: 'File deleted Successfully' };
	} else {
		throw badRequest('Invalid object user, property not found in the object', 'INVALID_OBJECT_USER_PROPERTY_NOT_FOUND');
	}
};

