import { EntityToolDefinition } from '../../types';
import { createToolResponse } from '../../utils';
import { listUsersSchema, createUserSchema, updateUserSchema, deleteUserSchema } from './schema';
import { fetchUserList, addUser, updateUser, deleteUser } from '../../../modules/user/service';
import { createUserPayloadValidator, updateUserPayloadValidator } from '../../../modules/user/validation';

export const userTools: EntityToolDefinition[] = [
  {
    name: 'listUsers',
    description: 'List all users in the system.',
    requiredRoles: ['user:approver', 'user:accountant', 'user:accountsManager', 'user:superAdmin'],
    inputSchema: listUsersSchema,
    handler: async (args) => {
      const result = await fetchUserList(args);
      return createToolResponse({
        ...result,
        meta: { ...result.meta, timestamp: new Date().toISOString() },
      });
    },
  },
  {
    name: 'createUser',
    description: 'Create a new user.',
    requiredRoles: ['user:superAdmin'],
    inputSchema: createUserSchema,
    handler: async (args) => {
      const validated = await createUserPayloadValidator.parseAsync(args);
      const result = await addUser(validated);
      return createToolResponse({
        ...result,
        meta: { timestamp: new Date().toISOString() },
      });
    },
  },
  {
    name: 'updateUser',
    description: 'Update an existing user.',
    requiredRoles: ['user:accountsManager', 'user:superAdmin'],
    inputSchema: updateUserSchema,
    handler: async (args) => {
      const { userId, ...payloadWithoutId } = args;
      const validatedPayload = await updateUserPayloadValidator(args.userId).parseAsync(payloadWithoutId);
      const result = await updateUser({ userId: args.userId }, validatedPayload);
      return createToolResponse({
        ...result,
        meta: { timestamp: new Date().toISOString() },
      });
    },
  },
  {
    name: 'deleteUser',
    description: 'Delete a user.',
    requiredRoles: ['user:superAdmin'],
    inputSchema: deleteUserSchema,
    handler: async (args) => {
      const result = await deleteUser({ userId: args.userId });
      return createToolResponse({
        ...result,
        meta: { timestamp: new Date().toISOString() },
      });
    },
  },
];
