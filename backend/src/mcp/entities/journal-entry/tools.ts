import { EntityToolDefinition } from '../../types';
import { createToolResponse } from '../../utils';
import { listJournalEntriesSchema, createJournalEntrySchema } from './schema';
import { fetchJournalEntryList, addJournalEntry } from '../../../modules/journal-entry/service';
import { createJournalEntryPayloadValidator } from '../../../modules/journal-entry/validation';

export const journalEntryTools: EntityToolDefinition[] = [
  {
    name: 'listJournalEntries',
    description: 'List all journal entries.',
    requiredRoles: ['user:accountant', 'user:accountsManager', 'user:superAdmin'],
    inputSchema: listJournalEntriesSchema,
    handler: async (args) => {
      const result = await fetchJournalEntryList(args);
      return createToolResponse({
        ...result,
        meta: { ...result.meta, timestamp: new Date().toISOString() },
      });
    },
  },
  {
    name: 'createJournalEntry',
    description: 'Create a new journal entry.',
    requiredRoles: ['user:accountant', 'user:accountsManager', 'user:superAdmin'],
    inputSchema: createJournalEntrySchema,
    handler: async (args) => {
      const validated = await createJournalEntryPayloadValidator.parseAsync(args);
      const result = await addJournalEntry(validated);
      return createToolResponse({
        ...result,
        meta: { timestamp: new Date().toISOString() },
      });
    },
  },
];
