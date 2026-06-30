import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {paymentQueryValidator, createPaymentPayloadValidator, updatePaymentPayloadValidator, paymentParamValidator} from './validation';
import {fetchPaymentList, selectPayment, addPayment, editPayment, updatePayment, getPayment, deletePayment} from './service';
import { QueryPaymentInput, PaymentPrimaryKeys } from './types';

export const PaymentRoutes: Router = Router();

PaymentRoutes.get('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(paymentQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchPaymentList(req.query as unknown as QueryPaymentInput);
    res.status(200).json(result);
  }),
);

PaymentRoutes.get('/select', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectPayment();
    res.status(200).json(result);
  }),
);

PaymentRoutes.post('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(createPaymentPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addPayment(req.body);
    res.status(201).json(result);
  }),
);

PaymentRoutes.get('/:paymentId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(paymentParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editPayment(req.params as unknown as PaymentPrimaryKeys);
    res.status(200).json(result);
  }),
);

PaymentRoutes.put('/:paymentId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(paymentParamValidator, 'params'),
  validateZodSchema(updatePaymentPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updatePayment(req.params as unknown as PaymentPrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

PaymentRoutes.get('/detail/:paymentId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(paymentParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getPayment(req.params as unknown as PaymentPrimaryKeys);
    res.status(200).json(result);
  }),
);

PaymentRoutes.delete('/:paymentId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(paymentParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deletePayment(req.params as unknown as PaymentPrimaryKeys);
    res.status(202).json(result);
  }),
);