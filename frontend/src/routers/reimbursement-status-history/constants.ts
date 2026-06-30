/**
 * ReimbursementStatusHistory Module Constants
 *
 * Centralized constants for the reimbursementStatusHistory module to avoid magic strings
 * and make refactoring easier.
 */

export const REIMBURSEMENT_STATUS_HISTORY_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'reimbursementStatusHistory',
  ENTITY_NAME: 'ReimbursementStatusHistory',
  ENTITY_NAME_PLURAL: 'ReimbursementStatusHistorys',
  LABEL_FIELD: 'reimbursementStatusHistoryLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'reimbursementStatusHistoryTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'statusHistoryId',
  PRIMARY_KEYS: ['statusHistoryId'],

  // Field names
  FIELDS: {
    STATUSHISTORYID: 'statusHistoryId',
    OLDSTATUS: 'oldStatus',
    NEWSTATUS: 'newStatus',
    CHANGEDBY: 'changedBy',
    CHANGEDATE: 'changeDate',
    USERCOMMENT: 'userComment',
    REIMBURSEMENTREQUESTID: 'reimbursementRequestId'
  },

  // Routes
  ROUTES: {
    LIST: '/reimbursement-status-histories',    CREATE: '/reimbursement-status-histories/create',
    EDIT: '/reimbursement-status-histories/edit',
    VIEW: '/reimbursement-status-histories/view'
  },

  // React Query keys
  QUERY_KEY: 'reimbursementStatusHistory',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'reimbursementStatusHistory',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default REIMBURSEMENT_STATUS_HISTORY_CONSTANTS;