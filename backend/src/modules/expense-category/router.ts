import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {expenseCategoryQueryValidator, createExpenseCategoryPayloadValidator, updateExpenseCategoryPayloadValidator, expenseCategoryParamValidator} from './validation';
import {fetchExpenseCategoryList, selectExpenseCategory, addExpenseCategory, editExpenseCategory, updateExpenseCategory, getExpenseCategory, deleteExpenseCategory} from './service';
import { QueryExpenseCategoryInput, ExpenseCategoryPrimaryKeys } from './types';

export const ExpenseCategoryRoutes: Router = Router();

ExpenseCategoryRoutes.get('/', validateAccessToken, requireRoles(['user:employee','user:approver','user:superAdmin']),
  validateZodSchema(expenseCategoryQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchExpenseCategoryList(req.query as unknown as QueryExpenseCategoryInput);
    res.status(200).json(result);
  }),
);

ExpenseCategoryRoutes.get('/select', validateAccessToken, requireRoles(['user:employee','user:approver','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectExpenseCategory();
    res.status(200).json(result);
  }),
);

ExpenseCategoryRoutes.post('/', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(createExpenseCategoryPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addExpenseCategory(req.body);
    res.status(201).json(result);
  }),
);

ExpenseCategoryRoutes.get('/:categoryId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(expenseCategoryParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editExpenseCategory(req.params as unknown as ExpenseCategoryPrimaryKeys);
    res.status(200).json(result);
  }),
);

const validateUpdateExpenseCategory = (req: Request, res: Response, next: NextFunction) => {
  const schema = updateExpenseCategoryPayloadValidator(req.params.categoryId as unknown as string);
  return validateZodSchema(schema, 'body')(req, res, next);
};
ExpenseCategoryRoutes.put('/:categoryId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(expenseCategoryParamValidator, 'params'),
  validateUpdateExpenseCategory,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateExpenseCategory(req.params as unknown as ExpenseCategoryPrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

ExpenseCategoryRoutes.get('/detail/:categoryId', validateAccessToken, requireRoles(['user:employee','user:approver','user:superAdmin']),
  validateZodSchema(expenseCategoryParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getExpenseCategory(req.params as unknown as ExpenseCategoryPrimaryKeys);
    res.status(200).json(result);
  }),
);

ExpenseCategoryRoutes.delete('/:categoryId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(expenseCategoryParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteExpenseCategory(req.params as unknown as ExpenseCategoryPrimaryKeys);
    res.status(202).json(result);
  }),
);