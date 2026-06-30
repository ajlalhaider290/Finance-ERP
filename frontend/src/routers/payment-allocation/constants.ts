/**
 * PaymentAllocation Module Constants
 *
 * Centralized constants for the paymentAllocation module to avoid magic strings
 * and make refactoring easier.
 */

export const PAYMENT_ALLOCATION_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'paymentAllocation',
  ENTITY_NAME: 'PaymentAllocation',
  ENTITY_NAME_PLURAL: 'PaymentAllocations',
  LABEL_FIELD: 'paymentAllocationLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'paymentAllocationTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'allocationId',
  PRIMARY_KEYS: ['allocationId'],

  // Field names
  FIELDS: {
    ALLOCATIONID: 'allocationId',
    PAYMENTID: 'paymentId',
    ALLOCATEDTOTYPE: 'allocatedToType',
    ALLOCATEDTOID: 'allocatedToId',
    ALLOCATEDAMOUNT: 'allocatedAmount',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt'
  },

  // Routes
  ROUTES: {
    LIST: '/payment-allocations',    CREATE: '/payment-allocations/create',
    EDIT: '/payment-allocations/edit',
    VIEW: '/payment-allocations/view'
  },

  // React Query keys
  QUERY_KEY: 'paymentAllocation',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'paymentAllocation',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default PAYMENT_ALLOCATION_CONSTANTS;