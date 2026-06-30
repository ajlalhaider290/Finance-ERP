/**
 * Vendor Module Constants
 *
 * Centralized constants for the vendor module to avoid magic strings
 * and make refactoring easier.
 */

export const VENDOR_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'vendor',
  ENTITY_NAME: 'Vendor',
  ENTITY_NAME_PLURAL: 'Vendors',
  LABEL_FIELD: 'vendorLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'vendorTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'vendorId',
  PRIMARY_KEYS: ['vendorId'],

  // Field names
  FIELDS: {
    VENDORID: 'vendorId',
    VENDORNAME: 'vendorName',
    CONTACTEMAIL: 'contactEmail',
    CONTACTPHONE: 'contactPhone',
    ADDRESS: 'address',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    ENTITYID: 'entityId'
  },

  // Routes
  ROUTES: {
    LIST: '/vendors',    CREATE: '/vendors/create',
    EDIT: '/vendors/edit',
    VIEW: '/vendors/view'
  },

  // React Query keys
  QUERY_KEY: 'vendor',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'vendor',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default VENDOR_CONSTANTS;