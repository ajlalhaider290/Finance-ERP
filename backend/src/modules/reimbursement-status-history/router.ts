import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {reimbursementStatusHistoryQueryValidator, createReimbursementStatusHistoryPayloadValidator, updateReimbursementStatusHistoryPayloadValidator, reimbursementStatusHistoryParamValidator} from './validation';
import {fetchReimbursementStatusHistoryList, selectReimbursementStatusHistory, addReimbursementStatusHistory, editReimbursementStatusHistory, updateReimbursementStatusHistory, getReimbursementStatusHistory, deleteReimbursementStatusHistory} from './service';
import { QueryReimbursementStatusHistoryInput, ReimbursementStatusHistoryPrimaryKeys } from './types';

export const ReimbursementStatusHistoryRoutes: Router = Router();

ReimbursementStatusHistoryRoutes.get('/', validateAccessToken, requireRoles(['user:employee','user:superAdmin']),
  validateZodSchema(reimbursementStatusHistoryQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchReimbursementStatusHistoryList(req.query as unknown as QueryReimbursementStatusHistoryInput, (req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementStatusHistoryRoutes.get('/select', validateAccessToken, requireRoles(['user:employee','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectReimbursementStatusHistory((req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementStatusHistoryRoutes.post('/', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(createReimbursementStatusHistoryPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addReimbursementStatusHistory(req.body, (req as any).user);
    res.status(201).json(result);
  }),
);

ReimbursementStatusHistoryRoutes.get('/:statusHistoryId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(reimbursementStatusHistoryParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editReimbursementStatusHistory(req.params as unknown as ReimbursementStatusHistoryPrimaryKeys, (req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementStatusHistoryRoutes.put('/:statusHistoryId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(reimbursementStatusHistoryParamValidator, 'params'),
  validateZodSchema(updateReimbursementStatusHistoryPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateReimbursementStatusHistory(req.params as unknown as ReimbursementStatusHistoryPrimaryKeys, req.body, (req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementStatusHistoryRoutes.get('/detail/:statusHistoryId', validateAccessToken, requireRoles(['user:employee','user:superAdmin']),
  validateZodSchema(reimbursementStatusHistoryParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getReimbursementStatusHistory(req.params as unknown as ReimbursementStatusHistoryPrimaryKeys, (req as any).user);
    res.status(200).json(result);
  }),
);

ReimbursementStatusHistoryRoutes.delete('/:statusHistoryId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(reimbursementStatusHistoryParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteReimbursementStatusHistory(req.params as unknown as ReimbursementStatusHistoryPrimaryKeys, (req as any).user);
    res.status(202).json(result);
  }),
);
