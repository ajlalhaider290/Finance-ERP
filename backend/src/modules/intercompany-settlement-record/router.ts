import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {intercompanySettlementRecordQueryValidator, createIntercompanySettlementRecordPayloadValidator, updateIntercompanySettlementRecordPayloadValidator, intercompanySettlementRecordParamValidator} from './validation';
import {fetchIntercompanySettlementRecordList, selectIntercompanySettlementRecord, addIntercompanySettlementRecord, editIntercompanySettlementRecord, updateIntercompanySettlementRecord, getIntercompanySettlementRecord, deleteIntercompanySettlementRecord} from './service';
import { QueryIntercompanySettlementRecordInput, IntercompanySettlementRecordPrimaryKeys } from './types';

export const IntercompanySettlementRecordRoutes: Router = Router();

IntercompanySettlementRecordRoutes.get('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(intercompanySettlementRecordQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchIntercompanySettlementRecordList(req.query as unknown as QueryIntercompanySettlementRecordInput);
    res.status(200).json(result);
  }),
);

IntercompanySettlementRecordRoutes.get('/select', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectIntercompanySettlementRecord();
    res.status(200).json(result);
  }),
);

IntercompanySettlementRecordRoutes.post('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(createIntercompanySettlementRecordPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addIntercompanySettlementRecord(req.body);
    res.status(201).json(result);
  }),
);

IntercompanySettlementRecordRoutes.get('/:settlementRecordId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(intercompanySettlementRecordParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editIntercompanySettlementRecord(req.params as unknown as IntercompanySettlementRecordPrimaryKeys);
    res.status(200).json(result);
  }),
);

IntercompanySettlementRecordRoutes.put('/:settlementRecordId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(intercompanySettlementRecordParamValidator, 'params'),
  validateZodSchema(updateIntercompanySettlementRecordPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateIntercompanySettlementRecord(req.params as unknown as IntercompanySettlementRecordPrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

IntercompanySettlementRecordRoutes.get('/detail/:settlementRecordId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(intercompanySettlementRecordParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getIntercompanySettlementRecord(req.params as unknown as IntercompanySettlementRecordPrimaryKeys);
    res.status(200).json(result);
  }),
);

IntercompanySettlementRecordRoutes.delete('/:settlementRecordId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(intercompanySettlementRecordParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteIntercompanySettlementRecord(req.params as unknown as IntercompanySettlementRecordPrimaryKeys);
    res.status(202).json(result);
  }),
);