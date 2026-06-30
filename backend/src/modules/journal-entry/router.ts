import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {journalEntryQueryValidator, createJournalEntryPayloadValidator, updateJournalEntryPayloadValidator, journalEntryParamValidator} from './validation';
import {fetchJournalEntryList, selectJournalEntry, addJournalEntry, editJournalEntry, updateJournalEntry, getJournalEntry, deleteJournalEntry} from './service';
import { QueryJournalEntryInput, JournalEntryPrimaryKeys } from './types';

export const JournalEntryRoutes: Router = Router();

JournalEntryRoutes.get('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(journalEntryQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchJournalEntryList(req.query as unknown as QueryJournalEntryInput);
    res.status(200).json(result);
  }),
);

JournalEntryRoutes.get('/select', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectJournalEntry();
    res.status(200).json(result);
  }),
);

JournalEntryRoutes.post('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(createJournalEntryPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addJournalEntry(req.body);
    res.status(201).json(result);
  }),
);

JournalEntryRoutes.get('/:journalEntryId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(journalEntryParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editJournalEntry(req.params as unknown as JournalEntryPrimaryKeys);
    res.status(200).json(result);
  }),
);

JournalEntryRoutes.put('/:journalEntryId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(journalEntryParamValidator, 'params'),
  validateZodSchema(updateJournalEntryPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateJournalEntry(req.params as unknown as JournalEntryPrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

JournalEntryRoutes.get('/detail/:journalEntryId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(journalEntryParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getJournalEntry(req.params as unknown as JournalEntryPrimaryKeys);
    res.status(200).json(result);
  }),
);

JournalEntryRoutes.delete('/:journalEntryId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(journalEntryParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteJournalEntry(req.params as unknown as JournalEntryPrimaryKeys);
    res.status(202).json(result);
  }),
);