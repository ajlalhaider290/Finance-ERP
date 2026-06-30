/**
 * ReimbursementRequest Module Constants
 *
 * Centralized constants for the reimbursementRequest module to avoid magic strings
 * and make refactoring easier.
 */

export const REIMBURSEMENT_REQUEST_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'reimbursementRequest',
  ENTITY_NAME: 'ReimbursementRequest',
  ENTITY_NAME_PLURAL: 'ReimbursementRequests',
  LABEL_FIELD: 'reimbursementRequestLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'reimbursementRequestTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'reimbursementRequestId',
  PRIMARY_KEYS: ['reimbursementRequestId'],

  // Field names
  FIELDS: {
    REIMBURSEMENTREQUESTID: 'reimbursementRequestId',
    BUSINESSPURPOSE: 'businessPurpose',
    EXPENSEDATE: 'expenseDate',
    CATEGORYID: 'categoryId',
    COSTCENTER: 'costCenter',
    DEPARTMENT: 'department',
    CURRENCYCODE: 'currencyCode',
    AMOUNT: 'amount',
    TAXAMOUNT: 'taxAmount',
    TOTALAMOUNT: 'totalAmount',
    STATUS: 'status',
    PAIDDATE: 'paidDate',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    EMPLOYEEID: 'employeeId',
    CURRENTAPPROVERID: 'currentApproverId',
    ENTITYID: 'entityId'
  },

  // Routes
  ROUTES: {
    LIST: '/reimbursement-requests',    CREATE: '/reimbursement-requests/create',
    EDIT: '/reimbursement-requests/edit',
    VIEW: '/reimbursement-requests/view'
  },

  // React Query keys
  QUERY_KEY: 'reimbursementRequest',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'reimbursementRequest',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default REIMBURSEMENT_REQUEST_CONSTANTS;