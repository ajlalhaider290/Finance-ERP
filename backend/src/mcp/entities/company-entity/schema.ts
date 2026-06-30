import { z } from 'zod';

export const listCompanyEntitiesSchema = z.object({
  page: z.coerce.number().optional().describe('Page number for pagination (default 0)'),
  pageSize: z.coerce.number().optional().describe('Max results per page (default 10, max 100)'),
});

