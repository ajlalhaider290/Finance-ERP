/**
 * CompanyEntity Module Constants
 *
 * Centralized constants for the companyEntity module to avoid magic strings
 * and make refactoring easier.
 */

export const COMPANY_ENTITY_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'companyEntity',
  ENTITY_NAME: 'CompanyEntity',
  ENTITY_NAME_PLURAL: 'CompanyEntitys',
  LABEL_FIELD: 'companyEntityLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'companyEntityTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'entityId',
  PRIMARY_KEYS: ['entityId'],

  // Field names
  FIELDS: {
    ENTITYID: 'entityId',
    ENTITYNAME: 'entityName',
    CURRENCYCODE: 'currencyCode',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt'
  },

  // Routes
  ROUTES: {
    LIST: '/company-entities',    CREATE: '/company-entities/create',
    EDIT: '/company-entities/edit',
    VIEW: '/company-entities/view'
  },

  // React Query keys
  QUERY_KEY: 'companyEntity',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'companyEntity',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default COMPANY_ENTITY_CONSTANTS;