import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {companyEntityQueryValidator, createCompanyEntityPayloadValidator, updateCompanyEntityPayloadValidator, companyEntityParamValidator} from './validation';
import {fetchCompanyEntityList, selectCompanyEntity, addCompanyEntity, editCompanyEntity, updateCompanyEntity, getCompanyEntity, deleteCompanyEntity} from './service';
import { QueryCompanyEntityInput, CompanyEntityPrimaryKeys } from './types';

export const CompanyEntityRoutes: Router = Router();

CompanyEntityRoutes.get('/', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(companyEntityQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchCompanyEntityList(req.query as unknown as QueryCompanyEntityInput);
    res.status(200).json(result);
  }),
);

CompanyEntityRoutes.get('/select', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectCompanyEntity();
    res.status(200).json(result);
  }),
);

CompanyEntityRoutes.post('/', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(createCompanyEntityPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addCompanyEntity(req.body);
    res.status(201).json(result);
  }),
);

CompanyEntityRoutes.get('/:entityId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(companyEntityParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editCompanyEntity(req.params as unknown as CompanyEntityPrimaryKeys);
    res.status(200).json(result);
  }),
);

const validateUpdateCompanyEntity = (req: Request, res: Response, next: NextFunction) => {
  const schema = updateCompanyEntityPayloadValidator(req.params.entityId as unknown as string);
  return validateZodSchema(schema, 'body')(req, res, next);
};
CompanyEntityRoutes.put('/:entityId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(companyEntityParamValidator, 'params'),
  validateUpdateCompanyEntity,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateCompanyEntity(req.params as unknown as CompanyEntityPrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

CompanyEntityRoutes.get('/detail/:entityId', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(companyEntityParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getCompanyEntity(req.params as unknown as CompanyEntityPrimaryKeys);
    res.status(200).json(result);
  }),
);

CompanyEntityRoutes.delete('/:entityId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(companyEntityParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteCompanyEntity(req.params as unknown as CompanyEntityPrimaryKeys);
    res.status(202).json(result);
  }),
);