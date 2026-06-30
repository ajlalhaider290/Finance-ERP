/**
 * TaxCode Module Constants
 *
 * Centralized constants for the taxCode module to avoid magic strings
 * and make refactoring easier.
 */

export const TAX_CODE_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'taxCode',
  ENTITY_NAME: 'TaxCode',
  ENTITY_NAME_PLURAL: 'TaxCodes',
  LABEL_FIELD: 'taxCodeLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'taxCodeTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'taxCodeId',
  PRIMARY_KEYS: ['taxCodeId'],

  // Field names
  FIELDS: {
    TAXCODEID: 'taxCodeId',
    TAXCODENAME: 'taxCodeName',
    RATE: 'rate',
    DESCRIPTION: 'description',
    ENTITYID: 'entityId',
    ISACTIVE: 'isActive',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt'
  },

  // Routes
  ROUTES: {
    LIST: '/tax-codes',    CREATE: '/tax-codes/create',
    EDIT: '/tax-codes/edit',
    VIEW: '/tax-codes/view'
  },

  // React Query keys
  QUERY_KEY: 'taxCode',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'taxCode',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default TAX_CODE_CONSTANTS;