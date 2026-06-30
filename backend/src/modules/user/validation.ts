import { z } from "zod";
import { Op } from "sequelize";
import { User } from "../../models/user";
import { passwordZod } from '../../validation/password';

export const userQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const userParamValidator = z.object({
	userId: z.uuid("Invalid UUID format"),
});


const _userBaseSchema = z.object({
	email: z.email("Invalid email format"),
	username: z.string({error: "Username is required"}),
	password: passwordZod({ context: 'general', label: "Password" }),
	role: z.enum(["superAdmin", "accountsManager", "accountant", "approver", "employee"]),
	department: z.string().nullable().optional().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format").nullable().optional(),
});

export const createUserPayloadValidator = _userBaseSchema.refine(async (data) => {
		
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

export const updateUserPayloadValidator = (userId: string) => _userBaseSchema.omit({ password: true }).extend({
	password: passwordZod({ context: 'general', required: false, label: "Password" }).nullable().optional().or(z.literal('')),
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


