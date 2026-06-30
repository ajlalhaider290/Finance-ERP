/**
 * IntercompanySettlementRecord Module Constants
 *
 * Centralized constants for the intercompanySettlementRecord module to avoid magic strings
 * and make refactoring easier.
 */

export const INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'intercompanySettlementRecord',
  ENTITY_NAME: 'IntercompanySettlementRecord',
  ENTITY_NAME_PLURAL: 'IntercompanySettlementRecords',
  LABEL_FIELD: 'intercompanySettlementRecordLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'intercompanySettlementRecordTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'settlementRecordId',
  PRIMARY_KEYS: ['settlementRecordId'],

  // Field names
  FIELDS: {
    SETTLEMENTRECORDID: 'settlementRecordId',
    TRANSACTIONID: 'transactionId',
    SETTLEMENTDATE: 'settlementDate',
    SETTLEMENTAMOUNT: 'settlementAmount',
    CURRENCYCODE: 'currencyCode',
    STATUS: 'status',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    RECORDEDBY: 'recordedBy'
  },

  // Routes
  ROUTES: {
    LIST: '/intercompany-settlement-records',    CREATE: '/intercompany-settlement-records/create',
    EDIT: '/intercompany-settlement-records/edit',
    VIEW: '/intercompany-settlement-records/view'
  },

  // React Query keys
  QUERY_KEY: 'intercompanySettlementRecord',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'intercompanySettlementRecord',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS;