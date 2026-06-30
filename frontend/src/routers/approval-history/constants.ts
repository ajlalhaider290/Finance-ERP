/**
 * ApprovalHistory Module Constants
 *
 * Centralized constants for the approvalHistory module to avoid magic strings
 * and make refactoring easier.
 */

export const APPROVAL_HISTORY_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'approvalHistory',
  ENTITY_NAME: 'ApprovalHistory',
  ENTITY_NAME_PLURAL: 'ApprovalHistorys',
  LABEL_FIELD: 'approvalHistoryLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'approvalHistoryTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'historyId',
  PRIMARY_KEYS: ['historyId'],

  // Field names
  FIELDS: {
    HISTORYID: 'historyId',
    TASKID: 'taskId',
    DOCUMENTTYPE: 'documentType',
    DOCUMENTID: 'documentId',
    ACTIONVALUE: 'actionValue',
    ACTIONDATE: 'actionDate',
    USERCOMMENT: 'userComment',
    APPROVERID: 'approverId'
  },

  // Routes
  ROUTES: {
    LIST: '/approval-histories',    CREATE: '/approval-histories/create',
    EDIT: '/approval-histories/edit',
    VIEW: '/approval-histories/view'
  },

  // React Query keys
  QUERY_KEY: 'approvalHistory',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'approvalHistory',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default APPROVAL_HISTORY_CONSTANTS;