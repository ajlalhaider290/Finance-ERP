/**
 * Dashboard Module Interfaces
 */

export type TotalReimbursementRequestsResponse = {
  count: number;
};

export type TotalInvoicesResponse = {
  count: number;
};

export type TotalInvoiceAmountResponse = {
  total: number;
};

export type TotalPaymentsMadeResponse = {
  total: number;
};

export type ReimbursementRequestsbyStatusDataItem = {
  status: string | number;
  value: number;
};

export type ReimbursementRequestsbyStatusResponse = {
  data: ReimbursementRequestsbyStatusDataItem[];
};

export type InvoicesTrendbyDateDataItem = {
  invoice_date: string | number;
  value: number;
};

export type InvoicesTrendbyDateResponse = {
  data: InvoicesTrendbyDateDataItem[];
};

export type PaymentsbyMethodDataItem = {
  payment_method: string | number;
  value: number;
};

export type PaymentsbyMethodResponse = {
  data: PaymentsbyMethodDataItem[];
};

export type DashboardMetrics = {
  totalReimbursementRequests?: TotalReimbursementRequestsResponse;
  totalInvoices?: TotalInvoicesResponse;
  totalInvoiceAmount?: TotalInvoiceAmountResponse;
  totalPaymentsMade?: TotalPaymentsMadeResponse;
  reimbursementRequestsbyStatus?: ReimbursementRequestsbyStatusResponse;
  invoicesTrendbyDate?: InvoicesTrendbyDateResponse;
  paymentsbyMethod?: PaymentsbyMethodResponse;
};

export type DashboardFilters = Record<string, string | undefined>;
