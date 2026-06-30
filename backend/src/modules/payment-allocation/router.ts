import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {paymentAllocationQueryValidator, createPaymentAllocationPayloadValidator, updatePaymentAllocationPayloadValidator, paymentAllocationParamValidator} from './validation';
import {fetchPaymentAllocationList, selectPaymentAllocation, addPaymentAllocation, editPaymentAllocation, updatePaymentAllocation, getPaymentAllocation, deletePaymentAllocation} from './service';
import { QueryPaymentAllocationInput, PaymentAllocationPrimaryKeys } from './types';

export const PaymentAllocationRoutes: Router = Router();

PaymentAllocationRoutes.get('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(paymentAllocationQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchPaymentAllocationList(req.query as unknown as QueryPaymentAllocationInput);
    res.status(200).json(result);
  }),
);

PaymentAllocationRoutes.get('/select', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectPaymentAllocation();
    res.status(200).json(result);
  }),
);

PaymentAllocationRoutes.post('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(createPaymentAllocationPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addPaymentAllocation(req.body);
    res.status(201).json(result);
  }),
);

PaymentAllocationRoutes.get('/:allocationId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(paymentAllocationParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editPaymentAllocation(req.params as unknown as PaymentAllocationPrimaryKeys);
    res.status(200).json(result);
  }),
);

PaymentAllocationRoutes.put('/:allocationId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(paymentAllocationParamValidator, 'params'),
  validateZodSchema(updatePaymentAllocationPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updatePaymentAllocation(req.params as unknown as PaymentAllocationPrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

PaymentAllocationRoutes.get('/detail/:allocationId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(paymentAllocationParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getPaymentAllocation(req.params as unknown as PaymentAllocationPrimaryKeys);
    res.status(200).json(result);
  }),
);

PaymentAllocationRoutes.delete('/:allocationId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(paymentAllocationParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deletePaymentAllocation(req.params as unknown as PaymentAllocationPrimaryKeys);
    res.status(202).json(result);
  }),
);