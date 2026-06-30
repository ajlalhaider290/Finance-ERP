import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {approvalHistoryQueryValidator, createApprovalHistoryPayloadValidator, updateApprovalHistoryPayloadValidator, approvalHistoryParamValidator} from './validation';
import {fetchApprovalHistoryList, selectApprovalHistory, addApprovalHistory, editApprovalHistory, updateApprovalHistory, getApprovalHistory, deleteApprovalHistory} from './service';
import { QueryApprovalHistoryInput, ApprovalHistoryPrimaryKeys } from './types';

export const ApprovalHistoryRoutes: Router = Router();

ApprovalHistoryRoutes.get('/', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(approvalHistoryQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchApprovalHistoryList(req.query as unknown as QueryApprovalHistoryInput);
    res.status(200).json(result);
  }),
);

ApprovalHistoryRoutes.get('/select', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectApprovalHistory();
    res.status(200).json(result);
  }),
);

ApprovalHistoryRoutes.post('/', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(createApprovalHistoryPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addApprovalHistory(req.body);
    res.status(201).json(result);
  }),
);

ApprovalHistoryRoutes.get('/:historyId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(approvalHistoryParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editApprovalHistory(req.params as unknown as ApprovalHistoryPrimaryKeys);
    res.status(200).json(result);
  }),
);

ApprovalHistoryRoutes.put('/:historyId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(approvalHistoryParamValidator, 'params'),
  validateZodSchema(updateApprovalHistoryPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateApprovalHistory(req.params as unknown as ApprovalHistoryPrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

ApprovalHistoryRoutes.get('/detail/:historyId', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(approvalHistoryParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getApprovalHistory(req.params as unknown as ApprovalHistoryPrimaryKeys);
    res.status(200).json(result);
  }),
);

ApprovalHistoryRoutes.delete('/:historyId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(approvalHistoryParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteApprovalHistory(req.params as unknown as ApprovalHistoryPrimaryKeys);
    res.status(202).json(result);
  }),
);