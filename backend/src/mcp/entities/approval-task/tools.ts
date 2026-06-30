import { EntityToolDefinition } from '../../types';
import { createToolResponse } from '../../utils';
import { listApprovalTasksSchema, updateApprovalTaskSchema } from './schema';
import { fetchApprovalTaskList, updateApprovalTask } from '../../../modules/approval-task/service';
import { updateApprovalTaskPayloadValidator } from '../../../modules/approval-task/validation';

export const approvalTaskTools: EntityToolDefinition[] = [
  {
    name: 'listApprovalTasks',
    description: 'List all approval tasks.',
    requiredRoles: ['user:employee', 'user:approver', 'user:accountant', 'user:accountsManager', 'user:superAdmin'],
    inputSchema: listApprovalTasksSchema,
    handler: async (args) => {
      const result = await fetchApprovalTaskList(args);
      return createToolResponse({
        ...result,
        meta: { ...result.meta, timestamp: new Date().toISOString() },
      });
    },
  },
  {
    name: 'updateApprovalTask',
    description: 'Update an approval task.',
    requiredRoles: ['user:approver', 'user:accountant', 'user:accountsManager', 'user:superAdmin'],
    inputSchema: updateApprovalTaskSchema,
    handler: async (args) => {
      const { taskId, ...payloadWithoutId } = args;
      const validatedPayload = await updateApprovalTaskPayloadValidator.parseAsync(payloadWithoutId);
      const result = await updateApprovalTask({ taskId: args.taskId }, validatedPayload);
      return createToolResponse({
        ...result,
        meta: { timestamp: new Date().toISOString() },
      });
    },
  },
];
