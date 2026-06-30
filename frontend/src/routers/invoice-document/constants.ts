/**
 * InvoiceDocument Module Constants
 *
 * Centralized constants for the invoiceDocument module to avoid magic strings
 * and make refactoring easier.
 */

export const INVOICE_DOCUMENT_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'invoiceDocument',
  ENTITY_NAME: 'InvoiceDocument',
  ENTITY_NAME_PLURAL: 'InvoiceDocuments',
  LABEL_FIELD: 'invoiceDocumentLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'invoiceDocumentTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'documentId',
  PRIMARY_KEYS: ['documentId'],

  // Field names
  FIELDS: {
    DOCUMENTID: 'documentId',
    FILEURL: 'fileUrl',
    FILENAME: 'fileName',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    UPLOADEDBY: 'uploadedBy'
  },

  // Routes
  ROUTES: {
    LIST: '/invoice-documents',    CREATE: '/invoice-documents/create',
    EDIT: '/invoice-documents/edit',
    VIEW: '/invoice-documents/view'
  },

  // React Query keys
  QUERY_KEY: 'invoiceDocument',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'invoiceDocument',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default INVOICE_DOCUMENT_CONSTANTS;