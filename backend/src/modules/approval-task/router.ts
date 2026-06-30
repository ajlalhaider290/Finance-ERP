import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {approvalTaskQueryValidator, createApprovalTaskPayloadValidator, updateApprovalTaskPayloadValidator, approvalTaskParamValidator} from './validation';
import {fetchApprovalTaskList, selectApprovalTask, addApprovalTask, editApprovalTask, updateApprovalTask, getApprovalTask, deleteApprovalTask} from './service';
import { QueryApprovalTaskInput, ApprovalTaskPrimaryKeys } from './types';

export const ApprovalTaskRoutes: Router = Router();

ApprovalTaskRoutes.get('/', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(approvalTaskQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchApprovalTaskList(req.query as unknown as QueryApprovalTaskInput);
    res.status(200).json(result);
  }),
);

ApprovalTaskRoutes.get('/select', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectApprovalTask();
    res.status(200).json(result);
  }),
);

ApprovalTaskRoutes.post('/', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(createApprovalTaskPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addApprovalTask(req.body);
    res.status(201).json(result);
  }),
);

ApprovalTaskRoutes.get('/:taskId', validateAccessToken, requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(approvalTaskParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editApprovalTask(req.params as unknown as ApprovalTaskPrimaryKeys);
    res.status(200).json(result);
  }),
);

ApprovalTaskRoutes.put('/:taskId', validateAccessToken, requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(approvalTaskParamValidator, 'params'),
  validateZodSchema(updateApprovalTaskPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateApprovalTask(req.params as unknown as ApprovalTaskPrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

ApprovalTaskRoutes.get('/detail/:taskId', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(approvalTaskParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getApprovalTask(req.params as unknown as ApprovalTaskPrimaryKeys);
    res.status(200).json(result);
  }),
);

ApprovalTaskRoutes.delete('/:taskId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(approvalTaskParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteApprovalTask(req.params as unknown as ApprovalTaskPrimaryKeys);
    res.status(202).json(result);
  }),
);