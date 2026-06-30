/**
 * IntercompanyTransaction Module Constants
 *
 * Centralized constants for the intercompanyTransaction module to avoid magic strings
 * and make refactoring easier.
 */

export const INTERCOMPANY_TRANSACTION_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'intercompanyTransaction',
  ENTITY_NAME: 'IntercompanyTransaction',
  ENTITY_NAME_PLURAL: 'IntercompanyTransactions',
  LABEL_FIELD: 'intercompanyTransactionLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'intercompanyTransactionTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'transactionId',
  PRIMARY_KEYS: ['transactionId'],

  // Field names
  FIELDS: {
    TRANSACTIONID: 'transactionId',
    TRANSACTIONDATE: 'transactionDate',
    TRANSACTIONTYPE: 'transactionType',
    CURRENCYCODE: 'currencyCode',
    AMOUNT: 'amount',
    LINEDETAIL: 'lineDetail',
    TAXAMOUNT: 'taxAmount',
    STATUS: 'status',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    SOURCEENTITYID: 'sourceEntityId',
    TARGETENTITYID: 'targetEntityId',
    CURRENTAPPROVERID: 'currentApproverId'
  },

  // Routes
  ROUTES: {
    LIST: '/intercompany-transactions',    CREATE: '/intercompany-transactions/create',
    EDIT: '/intercompany-transactions/edit',
    VIEW: '/intercompany-transactions/view'
  },

  // React Query keys
  QUERY_KEY: 'intercompanyTransaction',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'intercompanyTransaction',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default INTERCOMPANY_TRANSACTION_CONSTANTS;