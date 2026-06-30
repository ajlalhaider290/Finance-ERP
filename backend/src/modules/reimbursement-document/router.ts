import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {reimbursementDocumentQueryValidator, createReimbursementDocumentPayloadValidator, updateReimbursementDocumentPayloadValidator, reimbursementDocumentParamValidator, reimbursementDocumentUploadValidator, reimbursementDocumentRemoveUploadBodyValidator} from './validation';
import {fetchReimbursementDocumentList, selectReimbursementDocument, addReimbursementDocument, editReimbursementDocument, updateReimbursementDocument, getReimbursementDocument, deleteReimbursementDocument, uploadReimbursementDocument, removeReimbursementDocumentUpload} from './service';
import { QueryReimbursementDocumentInput, ReimbursementDocumentPrimaryKeys } from './types';
import { createFileUploadMiddleware } from '../../middleware/uploader';


export const ReimbursementDocumentRoutes: Router = Router();

// Create middleware for ReimbursementDocument file uploads
const reimbursementDocumentUploadMiddleware = createFileUploadMiddleware(reimbursementDocumentUploadValidator);

ReimbursementDocumentRoutes.get('/', validateAccessToken, requireRoles(['user:employee','user:superAdmin']),
  validateZodSchema(reimbursementDocumentQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchReimbursementDocumentList(req.query as unknown as QueryReimbursementDocumentInput, (req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementDocumentRoutes.get('/select', validateAccessToken, requireRoles(['user:employee','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectReimbursementDocument((req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementDocumentRoutes.post('/', validateAccessToken, requireRoles(['user:employee','user:superAdmin']),
  validateZodSchema(createReimbursementDocumentPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addReimbursementDocument(req.body, (req as any).user);
    res.status(201).json(result);
  }),
);

ReimbursementDocumentRoutes.get('/:documentId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(reimbursementDocumentParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editReimbursementDocument(req.params as unknown as ReimbursementDocumentPrimaryKeys, (req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementDocumentRoutes.put('/:documentId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(reimbursementDocumentParamValidator, 'params'),
  validateZodSchema(updateReimbursementDocumentPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateReimbursementDocument(req.params as unknown as ReimbursementDocumentPrimaryKeys, req.body, (req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementDocumentRoutes.get('/detail/:documentId', validateAccessToken, requireRoles(['user:employee','user:superAdmin']),
  validateZodSchema(reimbursementDocumentParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getReimbursementDocument(req.params as unknown as ReimbursementDocumentPrimaryKeys, (req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementDocumentRoutes.delete('/:documentId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(reimbursementDocumentParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteReimbursementDocument(req.params as unknown as ReimbursementDocumentPrimaryKeys, (req as any).user);
    res.status(202).json(result);
  }),
);

ReimbursementDocumentRoutes.post('/upload', validateAccessToken, requireRoles(['user:employee','user:superAdmin']),
  reimbursementDocumentUploadMiddleware,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validatedFile = req.validatedFile;

    if (!validatedFile) {
      throw badRequest('No validated file found', 'MISSING_FILE');
    }
    const result = await uploadReimbursementDocument(validatedFile);
    res.status(200).json(result);
  }),
);

ReimbursementDocumentRoutes.delete('/upload/:documentId', validateAccessToken, requireRoles(['user:employee','user:superAdmin']),
  validateZodSchema(reimbursementDocumentParamValidator, 'params'),
  validateZodSchema(reimbursementDocumentRemoveUploadBodyValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await removeReimbursementDocumentUpload(req.params as unknown as ReimbursementDocumentPrimaryKeys, req.body as { property: string }, (req as any).user);
    res.status(202).json(result);
  }),
);
