import { z } from "zod";
import { Op } from "sequelize";
import { User } from "../../models/user";
import { passwordZod } from '../../validation/password';

export const userLoginValidation = z.object({
	email: z.email("Invalid email format"),
	password: passwordZod({ context: 'login', label: "Password" }),
});


export const userRegisterValidation = z.object({
	email: z.email("Invalid email format"),
	username: z.string({error: "Username is required"}),
	password: passwordZod({ context: 'register', label: "Password" }),
	role: z.enum(["superAdmin", "accountsManager", "accountant", "approver", "employee"]),
	department: z.string().nullable().optional().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format").nullable().optional(),
}).refine(async (data) => {
		
  const existingUser = await User.findOne({
    where: {
    	username: data.username
    },
  });
  return !existingUser;
}, {
  message: 'This combination of username already exists',
  path: ['username'],
}).refine(async (data) => {
		
  const existingUser = await User.findOne({
    where: {
    	email: data.email
    },
  });
  return !existingUser;
}, {
  message: 'This combination of email already exists',
  path: ['email'],
});


export const userProfileUpdateValidation = (userId: string) =>  z.object({
	email: z.email("Invalid email format"),
	username: z.string({error: "Username is required"}),
	role: z.enum(["superAdmin", "accountsManager", "accountant", "approver", "employee"]),
	department: z.string().nullable().optional().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format").nullable().optional(),
}).refine(async (data) => {
		
    const whereClauseUser: any = {
        username: data.username
    };

    if (userId) {
		whereClauseUser.userId = { [Op.ne]: userId}
    }

    const existingUser = await User.findOne({
      where: whereClauseUser,
    });
    return !existingUser;
  }, {
    message: 'This combination of username already exists',
    path: ['username'],
  }).refine(async (data) => {
		
    const whereClauseUser: any = {
        email: data.email
    };

    if (userId) {
		whereClauseUser.userId = { [Op.ne]: userId}
    }

    const existingUser = await User.findOne({
      where: whereClauseUser,
    });
    return !existingUser;
  }, {
    message: 'This combination of email already exists',
    path: ['email'],
  });


export const userForgotPasswordValidation = z.object({
  email: z.email().describe('User email address')
});

export const userResetPasswordValidation = z.object({
  token: z.string().describe('Password reset token'),
  newPassword: passwordZod({ context: 'resetPassword', label: "Password" }).describe('New password')
});

export const userChangePasswordValidation = z.object({
  currentPassword: z.string().describe('Current password'),
  newPassword: passwordZod({ context: 'changePassword', label: "Password" }).describe('New password')
});

export const userRefreshTokenValidation = z.object({
  refreshToken: z.string().min(1).describe('Refresh token')
});

