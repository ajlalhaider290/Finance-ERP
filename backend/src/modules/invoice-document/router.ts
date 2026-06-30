import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {invoiceDocumentQueryValidator, createInvoiceDocumentPayloadValidator, updateInvoiceDocumentPayloadValidator, invoiceDocumentParamValidator, invoiceDocumentUploadValidator, invoiceDocumentRemoveUploadBodyValidator} from './validation';
import {fetchInvoiceDocumentList, selectInvoiceDocument, addInvoiceDocument, editInvoiceDocument, updateInvoiceDocument, getInvoiceDocument, deleteInvoiceDocument, uploadInvoiceDocument, removeInvoiceDocumentUpload} from './service';
import { QueryInvoiceDocumentInput, InvoiceDocumentPrimaryKeys } from './types';
import { createFileUploadMiddleware } from '../../middleware/uploader';


export const InvoiceDocumentRoutes: Router = Router();

// Create middleware for InvoiceDocument file uploads
const invoiceDocumentUploadMiddleware = createFileUploadMiddleware(invoiceDocumentUploadValidator);

InvoiceDocumentRoutes.get('/', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(invoiceDocumentQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchInvoiceDocumentList(req.query as unknown as QueryInvoiceDocumentInput);
    res.status(200).json(result);
  }),
);

InvoiceDocumentRoutes.get('/select', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectInvoiceDocument();
    res.status(200).json(result);
  }),
);

InvoiceDocumentRoutes.post('/', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(createInvoiceDocumentPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addInvoiceDocument(req.body);
    res.status(201).json(result);
  }),
);

InvoiceDocumentRoutes.get('/:documentId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(invoiceDocumentParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editInvoiceDocument(req.params as unknown as InvoiceDocumentPrimaryKeys);
    res.status(200).json(result);
  }),
);

InvoiceDocumentRoutes.put('/:documentId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(invoiceDocumentParamValidator, 'params'),
  validateZodSchema(updateInvoiceDocumentPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateInvoiceDocument(req.params as unknown as InvoiceDocumentPrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

InvoiceDocumentRoutes.get('/detail/:documentId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(invoiceDocumentParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getInvoiceDocument(req.params as unknown as InvoiceDocumentPrimaryKeys);
    res.status(200).json(result);
  }),
);

InvoiceDocumentRoutes.delete('/:documentId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(invoiceDocumentParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteInvoiceDocument(req.params as unknown as InvoiceDocumentPrimaryKeys);
    res.status(202).json(result);
  }),
);

InvoiceDocumentRoutes.post('/upload', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  invoiceDocumentUploadMiddleware,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validatedFile = req.validatedFile;

    if (!validatedFile) {
      throw badRequest('No validated file found', 'MISSING_FILE');
    }
    const result = await uploadInvoiceDocument(validatedFile);
    res.status(200).json(result);
  }),
);

InvoiceDocumentRoutes.delete('/upload/:documentId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(invoiceDocumentParamValidator, 'params'),
  validateZodSchema(invoiceDocumentRemoveUploadBodyValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await removeInvoiceDocumentUpload(req.params as unknown as InvoiceDocumentPrimaryKeys, req.body as { property: string });
    res.status(202).json(result);
  }),
);