import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {reimbursementRequestQueryValidator, createReimbursementRequestPayloadValidator, updateReimbursementRequestPayloadValidator, reimbursementRequestParamValidator} from './validation';
import {fetchReimbursementRequestList, selectReimbursementRequest, addReimbursementRequest, editReimbursementRequest, updateReimbursementRequest, getReimbursementRequest, deleteReimbursementRequest} from './service';
import { QueryReimbursementRequestInput, ReimbursementRequestPrimaryKeys } from './types';

export const ReimbursementRequestRoutes: Router = Router();

ReimbursementRequestRoutes.get('/', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(reimbursementRequestQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchReimbursementRequestList(req.query as unknown as QueryReimbursementRequestInput, (req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementRequestRoutes.get('/select', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectReimbursementRequest((req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementRequestRoutes.post('/', validateAccessToken, requireRoles(['user:employee','user:superAdmin']),
  validateZodSchema(createReimbursementRequestPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addReimbursementRequest(req.body, (req as any).user);
    res.status(201).json(result);
  }),
);

ReimbursementRequestRoutes.get('/:reimbursementRequestId', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(reimbursementRequestParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editReimbursementRequest(req.params as unknown as ReimbursementRequestPrimaryKeys, (req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementRequestRoutes.put('/:reimbursementRequestId', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(reimbursementRequestParamValidator, 'params'),
  validateZodSchema(updateReimbursementRequestPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateReimbursementRequest(req.params as unknown as ReimbursementRequestPrimaryKeys, req.body, (req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementRequestRoutes.get('/detail/:reimbursementRequestId', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(reimbursementRequestParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getReimbursementRequest(req.params as unknown as ReimbursementRequestPrimaryKeys, (req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementRequestRoutes.delete('/:reimbursementRequestId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(reimbursementRequestParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteReimbursementRequest(req.params as unknown as ReimbursementRequestPrimaryKeys, (req as any).user);
    res.status(202).json(result);
  }),
);
