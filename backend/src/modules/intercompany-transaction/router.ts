import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {intercompanyTransactionQueryValidator, createIntercompanyTransactionPayloadValidator, updateIntercompanyTransactionPayloadValidator, intercompanyTransactionParamValidator} from './validation';
import {fetchIntercompanyTransactionList, selectIntercompanyTransaction, addIntercompanyTransaction, editIntercompanyTransaction, updateIntercompanyTransaction, getIntercompanyTransaction, deleteIntercompanyTransaction} from './service';
import { QueryIntercompanyTransactionInput, IntercompanyTransactionPrimaryKeys } from './types';

export const IntercompanyTransactionRoutes: Router = Router();

IntercompanyTransactionRoutes.get('/', validateAccessToken, requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(intercompanyTransactionQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchIntercompanyTransactionList(req.query as unknown as QueryIntercompanyTransactionInput);
    res.status(200).json(result);
  }),
);

IntercompanyTransactionRoutes.get('/select', validateAccessToken, requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectIntercompanyTransaction();
    res.status(200).json(result);
  }),
);

IntercompanyTransactionRoutes.post('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(createIntercompanyTransactionPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addIntercompanyTransaction(req.body);
    res.status(201).json(result);
  }),
);

IntercompanyTransactionRoutes.get('/:transactionId', validateAccessToken, requireRoles(['user:approver','user:accountsManager','user:superAdmin']),
  validateZodSchema(intercompanyTransactionParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editIntercompanyTransaction(req.params as unknown as IntercompanyTransactionPrimaryKeys);
    res.status(200).json(result);
  }),
);

IntercompanyTransactionRoutes.put('/:transactionId', validateAccessToken, requireRoles(['user:approver','user:accountsManager','user:superAdmin']),
  validateZodSchema(intercompanyTransactionParamValidator, 'params'),
  validateZodSchema(updateIntercompanyTransactionPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateIntercompanyTransaction(req.params as unknown as IntercompanyTransactionPrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

IntercompanyTransactionRoutes.get('/detail/:transactionId', validateAccessToken, requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(intercompanyTransactionParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getIntercompanyTransaction(req.params as unknown as IntercompanyTransactionPrimaryKeys);
    res.status(200).json(result);
  }),
);

IntercompanyTransactionRoutes.delete('/:transactionId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(intercompanyTransactionParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteIntercompanyTransaction(req.params as unknown as IntercompanyTransactionPrimaryKeys);
    res.status(202).json(result);
  }),
);
