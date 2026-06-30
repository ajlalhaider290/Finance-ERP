/**
 * InvoiceLineItem Module Constants
 *
 * Centralized constants for the invoiceLineItem module to avoid magic strings
 * and make refactoring easier.
 */

export const INVOICE_LINE_ITEM_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'invoiceLineItem',
  ENTITY_NAME: 'InvoiceLineItem',
  ENTITY_NAME_PLURAL: 'InvoiceLineItems',
  LABEL_FIELD: 'invoiceLineItemLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'invoiceLineItemTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'lineItemId',
  PRIMARY_KEYS: ['lineItemId'],

  // Field names
  FIELDS: {
    LINEITEMID: 'lineItemId',
    DESCRIPTION: 'description',
    QUANTITY: 'quantity',
    UNITPRICE: 'unitPrice',
    LINETOTAL: 'lineTotal',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    INVOICEID: 'invoiceId',
    TAXCODEID: 'taxCodeId'
  },

  // Routes
  ROUTES: {
    LIST: '/invoice-line-items',    CREATE: '/invoice-line-items/create',
    EDIT: '/invoice-line-items/edit',
    VIEW: '/invoice-line-items/view'
  },

  // React Query keys
  QUERY_KEY: 'invoiceLineItem',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'invoiceLineItem',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default INVOICE_LINE_ITEM_CONSTANTS;