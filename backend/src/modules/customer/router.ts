import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {customerQueryValidator, createCustomerPayloadValidator, updateCustomerPayloadValidator, customerParamValidator} from './validation';
import {fetchCustomerList, selectCustomer, addCustomer, editCustomer, updateCustomer, getCustomer, deleteCustomer} from './service';
import { QueryCustomerInput, CustomerPrimaryKeys } from './types';

export const CustomerRoutes: Router = Router();

CustomerRoutes.get('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(customerQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchCustomerList(req.query as unknown as QueryCustomerInput);
    res.status(200).json(result);
  }),
);

CustomerRoutes.get('/select', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectCustomer();
    res.status(200).json(result);
  }),
);

CustomerRoutes.post('/', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(createCustomerPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addCustomer(req.body);
    res.status(201).json(result);
  }),
);

CustomerRoutes.get('/:customerId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(customerParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editCustomer(req.params as unknown as CustomerPrimaryKeys);
    res.status(200).json(result);
  }),
);

const validateUpdateCustomer = (req: Request, res: Response, next: NextFunction) => {
  const schema = updateCustomerPayloadValidator(req.params.customerId as unknown as string);
  return validateZodSchema(schema, 'body')(req, res, next);
};
CustomerRoutes.put('/:customerId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(customerParamValidator, 'params'),
  validateUpdateCustomer,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateCustomer(req.params as unknown as CustomerPrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

CustomerRoutes.get('/detail/:customerId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(customerParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getCustomer(req.params as unknown as CustomerPrimaryKeys);
    res.status(200).json(result);
  }),
);

CustomerRoutes.delete('/:customerId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(customerParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteCustomer(req.params as unknown as CustomerPrimaryKeys);
    res.status(202).json(result);
  }),
);