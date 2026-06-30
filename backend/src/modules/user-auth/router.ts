import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { badRequest, unauthorized } from '../../errors';
import { validateZodSchema } from '../../middleware/zodValidation';
import { authRateLimit } from '../../middleware/authRateLimit';

import {
  userLoginValidation,
  userRegisterValidation,
  userProfileUpdateValidation,
  userForgotPasswordValidation,
  userResetPasswordValidation,
  userChangePasswordValidation,
  userRefreshTokenValidation
} from './validation';

import {
  loginUser,
  registerUser,
  fetchUserProfile,
  updateUserProfile,
  forgotUserPassword,
  resetUserPassword,
  changeUserPassword,
  refreshUserToken
} from './service';

import { validateAccessToken } from '../../helper/auth';

export const UserAuthRoutes: Router = Router();

UserAuthRoutes.post('/login',
  authRateLimit,
  validateZodSchema(userLoginValidation, 'body'),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body as { email: string; password: string };
    const result = await loginUser(email, password);
    res.status(200).json(result);
  }),
);

UserAuthRoutes.post('/register',
  validateZodSchema(userRegisterValidation, 'body'),
  asyncHandler(async (req, res) => {
    const result = await registerUser(req.body as any);
    res.status(201).json(result);
  }),
);

UserAuthRoutes.get('/profile',
  validateAccessToken,
  asyncHandler(async (req, res) => {
    const userId = (req as any).user?.userId;
    const result = await fetchUserProfile(userId);
    res.status(200).json(result.data ?? result);
  }),
);

const validateUpdateUserProfile = (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user?.userId;
  const schema = userProfileUpdateValidation(userId);
  return validateZodSchema(schema, 'body')(req, res, next);
};
UserAuthRoutes.put('/profile',
  validateAccessToken,
  validateUpdateUserProfile,
  asyncHandler(async (req, res) => {
    const userId = (req as any).user?.userId;

    const result = await updateUserProfile(userId, req.body as any);
    res.status(200).json(result);
  }),
);

UserAuthRoutes.post('/forgot-password',
  authRateLimit,
  validateZodSchema(userForgotPasswordValidation, 'body'),
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    const result = await forgotUserPassword(email);
    res.status(200).json(result);
  }),
);

UserAuthRoutes.post('/reset-password',
  authRateLimit,
  validateZodSchema(userResetPasswordValidation, 'body'),
  asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;
    const result = await resetUserPassword(token, newPassword);
    res.status(200).json(result);
  }),
);

UserAuthRoutes.put('/change-password',
  authRateLimit,
  validateAccessToken,
  validateZodSchema(userChangePasswordValidation, 'body'),
  asyncHandler(async (req, res) => {
    const userId = (req as any).user?.userId;
    const { currentPassword, newPassword } = req.body;
    const result = await changeUserPassword(userId, currentPassword, newPassword);
    res.status(200).json(result);
  }),
);

UserAuthRoutes.post('/refresh-token',
  authRateLimit,
  validateZodSchema(userRefreshTokenValidation, 'body'),
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body as { refreshToken: string };

    let decoded: { userId: string };
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, { algorithms: ['HS256'] }) as { userId: string };
    } catch {
      throw unauthorized('Invalid or expired refresh token', 'INVALID_REFRESH_TOKEN');
    }

    const result = await refreshUserToken(decoded.userId);
    res.status(200).json(result);
  }),
);

