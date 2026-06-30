/**
 * Customer Module Constants
 *
 * Centralized constants for the customer module to avoid magic strings
 * and make refactoring easier.
 */

export const CUSTOMER_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'customer',
  ENTITY_NAME: 'Customer',
  ENTITY_NAME_PLURAL: 'Customers',
  LABEL_FIELD: 'customerLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'customerTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'customerId',
  PRIMARY_KEYS: ['customerId'],

  // Field names
  FIELDS: {
    CUSTOMERID: 'customerId',
    CUSTOMERNAME: 'customerName',
    CONTACTEMAIL: 'contactEmail',
    CONTACTPHONE: 'contactPhone',
    ADDRESS: 'address',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    ENTITYID: 'entityId'
  },

  // Routes
  ROUTES: {
    LIST: '/customers',    CREATE: '/customers/create',
    EDIT: '/customers/edit',
    VIEW: '/customers/view'
  },

  // React Query keys
  QUERY_KEY: 'customer',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'customer',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default CUSTOMER_CONSTANTS;