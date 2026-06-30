/**
 * JournalEntryLine Module Constants
 *
 * Centralized constants for the journalEntryLine module to avoid magic strings
 * and make refactoring easier.
 */

export const JOURNAL_ENTRY_LINE_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'journalEntryLine',
  ENTITY_NAME: 'JournalEntryLine',
  ENTITY_NAME_PLURAL: 'JournalEntryLines',
  LABEL_FIELD: 'journalEntryLineLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'journalEntryLineTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'lineId',
  PRIMARY_KEYS: ['lineId'],

  // Field names
  FIELDS: {
    LINEID: 'lineId',
    JOURNALENTRYID: 'journalEntryId',
    DEBITAMOUNT: 'debitAmount',
    CREDITAMOUNT: 'creditAmount',
    DESCRIPTION: 'description',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt'
  },

  // Routes
  ROUTES: {
    LIST: '/journal-entry-lines',    CREATE: '/journal-entry-lines/create',
    EDIT: '/journal-entry-lines/edit',
    VIEW: '/journal-entry-lines/view'
  },

  // React Query keys
  QUERY_KEY: 'journalEntryLine',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'journalEntryLine',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default JOURNAL_ENTRY_LINE_CONSTANTS;