/**
 * Invoice Module Constants
 *
 * Centralized constants for the invoice module to avoid magic strings
 * and make refactoring easier.
 */

export const INVOICE_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'invoice',
  ENTITY_NAME: 'Invoice',
  ENTITY_NAME_PLURAL: 'Invoices',
  LABEL_FIELD: 'invoiceLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'invoiceTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'invoiceId',
  PRIMARY_KEYS: ['invoiceId'],

  // Field names
  FIELDS: {
    INVOICEID: 'invoiceId',
    INVOICENUMBER: 'invoiceNumber',
    INVOICEDATE: 'invoiceDate',
    DUEDATE: 'dueDate',
    CURRENCYCODE: 'currencyCode',
    SUBTOTAL: 'subtotal',
    TAXAMOUNT: 'taxAmount',
    TOTALAMOUNT: 'totalAmount',
    PAIDAMOUNT: 'paidAmount',
    BALANCEDUE: 'balanceDue',
    PAYMENTSTATUS: 'paymentStatus',
    STATUS: 'status',
    ENTITYID: 'entityId',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    VENDORID: 'vendorId',
    CUSTOMERID: 'customerId',
    CURRENTAPPROVERID: 'currentApproverId',
    INVOICEDOCUMENTID: 'invoiceDocumentId'
  },

  // Routes
  ROUTES: {
    LIST: '/invoices',    CREATE: '/invoices/create',
    EDIT: '/invoices/edit',
    VIEW: '/invoices/view'
  },

  // React Query keys
  QUERY_KEY: 'invoice',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'invoice',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default INVOICE_CONSTANTS;