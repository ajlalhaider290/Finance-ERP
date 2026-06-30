import { EntityToolDefinition } from '../../types';
import { createToolResponse } from '../../utils';
import { listCompanyEntitiesSchema } from './schema';
import { fetchCompanyEntityList } from '../../../modules/company-entity/service';

export const companyEntityTools: EntityToolDefinition[] = [
  {
    name: 'listCompanyEntities',
    description: 'List all company entities.',
    requiredRoles: ['user:employee', 'user:approver', 'user:accountant', 'user:accountsManager', 'user:superAdmin'],
    inputSchema: listCompanyEntitiesSchema,
    handler: async (args) => {
      const result = await fetchCompanyEntityList(args);
      return createToolResponse({
        ...result,
        meta: { ...result.meta, timestamp: new Date().toISOString() },
      });
    },
  },
];
