/**
 * Dashboard Module Constants
 *
 * Centralized constants for the dashboard module
 */

export const DASHBOARD_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'dashboard',
  ENTITY_NAME: 'Dashboard',

  // API endpoints
  ENDPOINTS: {
    TOTAL_REIMBURSEMENT_REQUESTS: 'dashboard/total-reimbursement-requests',
    TOTAL_INVOICES: 'dashboard/total-invoices',
    TOTAL_INVOICE_AMOUNT: 'dashboard/total-invoice-amount',
    TOTAL_PAYMENTS_MADE: 'dashboard/total-payments-made',
    REIMBURSEMENT_REQUESTSBY_STATUS: 'dashboard/reimbursement-requests-by-status',
    INVOICES_TRENDBY_DATE: 'dashboard/invoices-trend-by-date',
    PAYMENTSBY_METHOD: 'dashboard/payments-by-method'
  },

  // Query keys for React Query
  QUERY_KEYS: {
    TOTAL_REIMBURSEMENT_REQUESTS: 'dashboard-total-reimbursement-requests',
    TOTAL_INVOICES: 'dashboard-total-invoices',
    TOTAL_INVOICE_AMOUNT: 'dashboard-total-invoice-amount',
    TOTAL_PAYMENTS_MADE: 'dashboard-total-payments-made',
    REIMBURSEMENT_REQUESTSBY_STATUS: 'dashboard-reimbursement-requests-by-status',
    INVOICES_TRENDBY_DATE: 'dashboard-invoices-trend-by-date',
    PAYMENTSBY_METHOD: 'dashboard-payments-by-method'
  },

  // Labels
  LABELS: {
    TOTAL_REIMBURSEMENT_REQUESTS: 'Total Reimbursement Requests',
    TOTAL_INVOICES: 'Total Invoices',
    TOTAL_INVOICE_AMOUNT: 'Total Invoice Amount',
    TOTAL_PAYMENTS_MADE: 'Total Payments Made',
    REIMBURSEMENT_REQUESTSBY_STATUS: 'Reimbursement Requests by Status',
    INVOICES_TRENDBY_DATE: 'Invoices Trend by Date',
    PAYMENTSBY_METHOD: 'Payments by Method'
  },

  // Descriptions
  DESCRIPTIONS: {
    TOTAL_REIMBURSEMENT_REQUESTS: 'Total number of reimbursement requests',
    TOTAL_INVOICES: 'Total number of invoices',
    TOTAL_INVOICE_AMOUNT: 'Sum of all invoice total amounts',
    TOTAL_PAYMENTS_MADE: 'Sum of all payment amounts',
    REIMBURSEMENT_REQUESTSBY_STATUS: 'Distribution of reimbursement requests by their current status',
    INVOICES_TRENDBY_DATE: 'Monthly trend of total invoice amounts',
    PAYMENTSBY_METHOD: 'Distribution of payments across different methods'
  }
};
