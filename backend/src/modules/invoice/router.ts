import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {invoiceQueryValidator, createInvoicePayloadValidator, updateInvoicePayloadValidator, invoiceParamValidator} from './validation';
import {fetchInvoiceList, selectInvoice, addInvoice, editInvoice, updateInvoice, getInvoice, deleteInvoice} from './service';
import { QueryInvoiceInput, InvoicePrimaryKeys } from './types';

export const InvoiceRoutes: Router = Router();

InvoiceRoutes.get('/', validateAccessToken, requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(invoiceQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchInvoiceList(req.query as unknown as QueryInvoiceInput);
    res.status(200).json(result);
  }),
);

InvoiceRoutes.get('/select', validateAccessToken, requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectInvoice();
    res.status(200).json(result);
  }),
);

InvoiceRoutes.post('/', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(createInvoicePayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addInvoice(req.body);
    res.status(201).json(result);
  }),
);

InvoiceRoutes.get('/:invoiceId', validateAccessToken, requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(invoiceParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editInvoice(req.params as unknown as InvoicePrimaryKeys);
    res.status(200).json(result);
  }),
);

const validateUpdateInvoice = (req: Request, res: Response, next: NextFunction) => {
  const schema = updateInvoicePayloadValidator(req.params.invoiceId as unknown as string);
  return validateZodSchema(schema, 'body')(req, res, next);
};
InvoiceRoutes.put('/:invoiceId', validateAccessToken, requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(invoiceParamValidator, 'params'),
  validateUpdateInvoice,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateInvoice(req.params as unknown as InvoicePrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

InvoiceRoutes.get('/detail/:invoiceId', validateAccessToken, requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(invoiceParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getInvoice(req.params as unknown as InvoicePrimaryKeys);
    res.status(200).json(result);
  }),
);

InvoiceRoutes.delete('/:invoiceId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(invoiceParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteInvoice(req.params as unknown as InvoicePrimaryKeys);
    res.status(202).json(result);
  }),
);