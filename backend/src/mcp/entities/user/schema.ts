import { z } from 'zod';

export const listUsersSchema = z.object({
  page: z.coerce.number().optional().describe('Page number for pagination (default 0)'),
  pageSize: z.coerce.number().optional().describe('Max results per page (default 10, max 100)'),
});

export const createUserSchema = z.object({
  email: z.email().describe('Email'),
  username: z.string().describe('Username'),
  password: z.string().describe('Password'),
  role: z.enum(['superAdmin', 'accountsManager', 'accountant', 'approver', 'employee']).default('employee').describe('Role'),
  department: z.string().optional().describe('Department'),
  entityId: z.uuid().optional().describe('Entity Id'),
});

export const updateUserSchema = z.object({
  userId: z.uuid().describe('User Id'),
  email: z.email().describe('Email'),
  username: z.string().describe('Username'),
  password: z.string().describe('Password'),
  role: z.enum(['superAdmin', 'accountsManager', 'accountant', 'approver', 'employee']).describe('Role'),
  department: z.string().optional().describe('Department'),
  entityId: z.uuid().optional().describe('Entity Id'),
});

export const deleteUserSchema = z.object({
  userId: z.uuid().describe('User Id'),
});

