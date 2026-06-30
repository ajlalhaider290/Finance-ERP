/**
 * ApprovalTask Module Constants
 *
 * Centralized constants for the approvalTask module to avoid magic strings
 * and make refactoring easier.
 */

export const APPROVAL_TASK_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'approvalTask',
  ENTITY_NAME: 'ApprovalTask',
  ENTITY_NAME_PLURAL: 'ApprovalTasks',
  LABEL_FIELD: 'approvalTaskLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'approvalTaskTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'taskId',
  PRIMARY_KEYS: ['taskId'],

  // Field names
  FIELDS: {
    TASKID: 'taskId',
    DOCUMENTTYPE: 'documentType',
    DOCUMENTID: 'documentId',
    ASSIGNEDTOUSERID: 'assignedToUserId',
    ASSIGNEDTOROLE: 'assignedToRole',
    STATUS: 'status',
    USERCOMMENT: 'userComment',
    ACTIONEDAT: 'actionedAt',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    ACTIONEDBY: 'actionedBy'
  },

  // Routes
  ROUTES: {
    LIST: '/approval-tasks',    CREATE: '/approval-tasks/create',
    EDIT: '/approval-tasks/edit',
    VIEW: '/approval-tasks/view'
  },

  // React Query keys
  QUERY_KEY: 'approvalTask',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'approvalTask',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default APPROVAL_TASK_CONSTANTS;