import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateZodSchema } from '../../middleware/zodValidation';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { badRequest } from '../../errors';
import {userQueryValidator, createUserPayloadValidator, updateUserPayloadValidator, userParamValidator} from './validation';
import {fetchUserList, selectUser, addUser, editUser, updateUser, getUser, deleteUser} from './service';
import { QueryUserInput, UserPrimaryKeys } from './types';

export const UserRoutes: Router = Router();

UserRoutes.get('/', validateAccessToken, requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(userQueryValidator, 'query'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await fetchUserList(req.query as unknown as QueryUserInput);
    res.status(200).json(result);
  }),
);

UserRoutes.get('/select', validateAccessToken, requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectUser();
    res.status(200).json(result);
  }),
);

UserRoutes.post('/', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(createUserPayloadValidator, 'body'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await addUser(req.body);
    res.status(201).json(result);
  }),
);

UserRoutes.get('/:userId', validateAccessToken, requireRoles(['user:accountsManager','user:superAdmin']),
  validateZodSchema(userParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await editUser(req.params as unknown as UserPrimaryKeys);
    res.status(200).json(result);
  }),
);

const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = updateUserPayloadValidator(req.params.userId as unknown as string);
  return validateZodSchema(schema, 'body')(req, res, next);
};
UserRoutes.put('/:userId', validateAccessToken, requireRoles(['user:accountsManager','user:superAdmin']),
  validateZodSchema(userParamValidator, 'params'),
  validateUpdateUser,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await updateUser(req.params as unknown as UserPrimaryKeys, req.body);
    res.status(200).json(result);
  }),
);

UserRoutes.get('/detail/:userId', validateAccessToken, requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  validateZodSchema(userParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getUser(req.params as unknown as UserPrimaryKeys);
    res.status(200).json(result);
  }),
);

UserRoutes.delete('/:userId', validateAccessToken, requireRoles(['user:superAdmin']),
  validateZodSchema(userParamValidator, 'params'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await deleteUser(req.params as unknown as UserPrimaryKeys);
    res.status(202).json(result);
  }),
);