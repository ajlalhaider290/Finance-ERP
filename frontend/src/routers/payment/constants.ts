/**
 * Payment Module Constants
 *
 * Centralized constants for the payment module to avoid magic strings
 * and make refactoring easier.
 */

export const PAYMENT_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'payment',
  ENTITY_NAME: 'Payment',
  ENTITY_NAME_PLURAL: 'Payments',
  LABEL_FIELD: 'paymentLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'paymentTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'paymentId',
  PRIMARY_KEYS: ['paymentId'],

  // Field names
  FIELDS: {
    PAYMENTID: 'paymentId',
    PAYMENTDATE: 'paymentDate',
    AMOUNT: 'amount',
    CURRENCYCODE: 'currencyCode',
    PAYMENTMETHOD: 'paymentMethod',
    STATUS: 'status',
    ENTITYID: 'entityId',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    PAIDBY: 'paidBy'
  },

  // Routes
  ROUTES: {
    LIST: '/payments',    CREATE: '/payments/create',
    EDIT: '/payments/edit',
    VIEW: '/payments/view'
  },

  // React Query keys
  QUERY_KEY: 'payment',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'payment',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default PAYMENT_CONSTANTS;