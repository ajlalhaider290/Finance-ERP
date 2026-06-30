import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {taxCodeQueryValidator, createTaxCodePayloadValidator, updateTaxCodePayloadValidator, taxCodeParamValidator} from './validation';
import {fetchTaxCodeList, selectTaxCode, addTaxCode, editTaxCode, updateTaxCode, getTaxCode, deleteTaxCode} from './service';
import { QueryTaxCodeInput, TaxCodePrimaryKeys } from './types';

export const TaxCodeRoutes: Router = Router();

TaxCodeRoutes.get('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(taxCodeQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchTaxCodeList(req.query as unknown as QueryTaxCodeInput);
    res.status(200).json(result);
  }),
);

TaxCodeRoutes.get('/select', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectTaxCode();
    res.status(200).json(result);
  }),
);

TaxCodeRoutes.post('/', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(createTaxCodePayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addTaxCode(req.body);
    res.status(201).json(result);
  }),
);

TaxCodeRoutes.get('/:taxCodeId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(taxCodeParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editTaxCode(req.params as unknown as TaxCodePrimaryKeys);
    res.status(200).json(result);
  }),
);

const validateUpdateTaxCode = (req: Request, res: Response, next: NextFunction) => {
  const schema = updateTaxCodePayloadValidator(req.params.taxCodeId as unknown as string);
  return validateZodSchema(schema, 'body')(req, res, next);
};
TaxCodeRoutes.put('/:taxCodeId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(taxCodeParamValidator, 'params'),
  validateUpdateTaxCode,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateTaxCode(req.params as unknown as TaxCodePrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

TaxCodeRoutes.get('/detail/:taxCodeId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(taxCodeParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getTaxCode(req.params as unknown as TaxCodePrimaryKeys);
    res.status(200).json(result);
  }),
);

TaxCodeRoutes.delete('/:taxCodeId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(taxCodeParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteTaxCode(req.params as unknown as TaxCodePrimaryKeys);
    res.status(202).json(result);
  }),
);