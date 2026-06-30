/**
 * ReimbursementDocument Module Constants
 *
 * Centralized constants for the reimbursementDocument module to avoid magic strings
 * and make refactoring easier.
 */

export const REIMBURSEMENT_DOCUMENT_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'reimbursementDocument',
  ENTITY_NAME: 'ReimbursementDocument',
  ENTITY_NAME_PLURAL: 'ReimbursementDocuments',
  LABEL_FIELD: 'reimbursementDocumentLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'reimbursementDocumentTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'documentId',
  PRIMARY_KEYS: ['documentId'],

  // Field names
  FIELDS: {
    DOCUMENTID: 'documentId',
    DOCUMENTTYPE: 'documentType',
    FILEURL: 'fileUrl',
    FILENAME: 'fileName',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    REIMBURSEMENTREQUESTID: 'reimbursementRequestId',
    UPLOADEDBY: 'uploadedBy'
  },

  // Routes
  ROUTES: {
    LIST: '/reimbursement-documents',    CREATE: '/reimbursement-documents/create',
    EDIT: '/reimbursement-documents/edit',
    VIEW: '/reimbursement-documents/view'
  },

  // React Query keys
  QUERY_KEY: 'reimbursementDocument',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'reimbursementDocument',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default REIMBURSEMENT_DOCUMENT_CONSTANTS;