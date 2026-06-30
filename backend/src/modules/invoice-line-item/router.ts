import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {invoiceLineItemQueryValidator, createInvoiceLineItemPayloadValidator, updateInvoiceLineItemPayloadValidator, invoiceLineItemParamValidator} from './validation';
import {fetchInvoiceLineItemList, selectInvoiceLineItem, addInvoiceLineItem, editInvoiceLineItem, updateInvoiceLineItem, getInvoiceLineItem, deleteInvoiceLineItem} from './service';
import { QueryInvoiceLineItemInput, InvoiceLineItemPrimaryKeys } from './types';

export const InvoiceLineItemRoutes: Router = Router();

InvoiceLineItemRoutes.get('/', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(invoiceLineItemQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchInvoiceLineItemList(req.query as unknown as QueryInvoiceLineItemInput);
    res.status(200).json(result);
  }),
);

InvoiceLineItemRoutes.get('/select', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectInvoiceLineItem();
    res.status(200).json(result);
  }),
);

InvoiceLineItemRoutes.post('/', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(createInvoiceLineItemPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addInvoiceLineItem(req.body);
    res.status(201).json(result);
  }),
);

InvoiceLineItemRoutes.get('/:lineItemId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(invoiceLineItemParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editInvoiceLineItem(req.params as unknown as InvoiceLineItemPrimaryKeys);
    res.status(200).json(result);
  }),
);

InvoiceLineItemRoutes.put('/:lineItemId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(invoiceLineItemParamValidator, 'params'),
  validateZodSchema(updateInvoiceLineItemPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateInvoiceLineItem(req.params as unknown as InvoiceLineItemPrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

InvoiceLineItemRoutes.get('/detail/:lineItemId', validateAccessToken, requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(invoiceLineItemParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getInvoiceLineItem(req.params as unknown as InvoiceLineItemPrimaryKeys);
    res.status(200).json(result);
  }),
);

InvoiceLineItemRoutes.delete('/:lineItemId', validateAccessToken, requireRoles(['user:accountant','user:superAdmin']),
  validateZodSchema(invoiceLineItemParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteInvoiceLineItem(req.params as unknown as InvoiceLineItemPrimaryKeys);
    res.status(202).json(result);
  }),
);