import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {vendorQueryValidator, createVendorPayloadValidator, updateVendorPayloadValidator, vendorParamValidator} from './validation';
import {fetchVendorList, selectVendor, addVendor, editVendor, updateVendor, getVendor, deleteVendor} from './service';
import { QueryVendorInput, VendorPrimaryKeys } from './types';

export const VendorRoutes: Router = Router();

VendorRoutes.get('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(vendorQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchVendorList(req.query as unknown as QueryVendorInput);
    res.status(200).json(result);
  }),
);

VendorRoutes.get('/select', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectVendor();
    res.status(200).json(result);
  }),
);

VendorRoutes.post('/', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(createVendorPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addVendor(req.body);
    res.status(201).json(result);
  }),
);

VendorRoutes.get('/:vendorId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(vendorParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editVendor(req.params as unknown as VendorPrimaryKeys);
    res.status(200).json(result);
  }),
);

const validateUpdateVendor = (req: Request, res: Response, next: NextFunction) => {
  const schema = updateVendorPayloadValidator(req.params.vendorId as unknown as string);
  return validateZodSchema(schema, 'body')(req, res, next);
};
VendorRoutes.put('/:vendorId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(vendorParamValidator, 'params'),
  validateUpdateVendor,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateVendor(req.params as unknown as VendorPrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

VendorRoutes.get('/detail/:vendorId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(vendorParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getVendor(req.params as unknown as VendorPrimaryKeys);
    res.status(200).json(result);
  }),
);

VendorRoutes.delete('/:vendorId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(vendorParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteVendor(req.params as unknown as VendorPrimaryKeys);
    res.status(202).json(result);
  }),
);