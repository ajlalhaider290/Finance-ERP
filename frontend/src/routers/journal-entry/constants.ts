/**
 * JournalEntry Module Constants
 *
 * Centralized constants for the journalEntry module to avoid magic strings
 * and make refactoring easier.
 */

export const JOURNAL_ENTRY_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'journalEntry',
  ENTITY_NAME: 'JournalEntry',
  ENTITY_NAME_PLURAL: 'JournalEntrys',
  LABEL_FIELD: 'journalEntryLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'journalEntryTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'journalEntryId',
  PRIMARY_KEYS: ['journalEntryId'],

  // Field names
  FIELDS: {
    JOURNALENTRYID: 'journalEntryId',
    ENTRYDATE: 'entryDate',
    DESCRIPTION: 'description',
    SOURCEDOCUMENTTYPE: 'sourceDocumentType',
    SOURCEDOCUMENTID: 'sourceDocumentId',
    POSTEDAT: 'postedAt',
    STATUS: 'status',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    ENTITYID: 'entityId',
    POSTEDBY: 'postedBy'
  },

  // Routes
  ROUTES: {
    LIST: '/journal-entries',    CREATE: '/journal-entries/create',
    EDIT: '/journal-entries/edit',
    VIEW: '/journal-entries/view'
  },

  // React Query keys
  QUERY_KEY: 'journalEntry',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'journalEntry',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default JOURNAL_ENTRY_CONSTANTS;