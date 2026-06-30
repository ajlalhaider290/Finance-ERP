import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {journalEntryLineQueryValidator, createJournalEntryLinePayloadValidator, updateJournalEntryLinePayloadValidator, journalEntryLineParamValidator} from './validation';
import {fetchJournalEntryLineList, selectJournalEntryLine, addJournalEntryLine, editJournalEntryLine, updateJournalEntryLine, getJournalEntryLine, deleteJournalEntryLine} from './service';
import { QueryJournalEntryLineInput, JournalEntryLinePrimaryKeys } from './types';

export const JournalEntryLineRoutes: Router = Router();

JournalEntryLineRoutes.get('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(journalEntryLineQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchJournalEntryLineList(req.query as unknown as QueryJournalEntryLineInput);
    res.status(200).json(result);
  }),
);

JournalEntryLineRoutes.get('/select', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectJournalEntryLine();
    res.status(200).json(result);
  }),
);

JournalEntryLineRoutes.post('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(createJournalEntryLinePayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addJournalEntryLine(req.body);
    res.status(201).json(result);
  }),
);

JournalEntryLineRoutes.get('/:lineId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(journalEntryLineParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editJournalEntryLine(req.params as unknown as JournalEntryLinePrimaryKeys);
    res.status(200).json(result);
  }),
);

JournalEntryLineRoutes.put('/:lineId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(journalEntryLineParamValidator, 'params'),
  validateZodSchema(updateJournalEntryLinePayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateJournalEntryLine(req.params as unknown as JournalEntryLinePrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

JournalEntryLineRoutes.get('/detail/:lineId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(journalEntryLineParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getJournalEntryLine(req.params as unknown as JournalEntryLinePrimaryKeys);
    res.status(200).json(result);
  }),
);

JournalEntryLineRoutes.delete('/:lineId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(journalEntryLineParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteJournalEntryLine(req.params as unknown as JournalEntryLinePrimaryKeys);
    res.status(202).json(result);
  }),
);