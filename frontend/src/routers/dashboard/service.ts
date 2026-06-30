import { TotalReimbursementRequestsResponse, TotalInvoicesResponse, TotalInvoiceAmountResponse, TotalPaymentsMadeResponse, ReimbursementRequestsbyStatusResponse, InvoicesTrendbyDateResponse, PaymentsbyMethodResponse } from './interface';
import apiClient from '@/services/apiClient';
import { DASHBOARD_CONSTANTS } from './constants';

/**
 * Fetch Total Reimbursement Requests
 */
export const getTotalReimbursementRequests = async (filters?: Record<string, string | undefined>) => {
  const url = DASHBOARD_CONSTANTS.ENDPOINTS.TOTAL_REIMBURSEMENT_REQUESTS;
  return await apiClient.get<TotalReimbursementRequestsResponse>(url, { params: filters });
};

/**
 * Fetch Total Invoices
 */
export const getTotalInvoices = async (filters?: Record<string, string | undefined>) => {
  const url = DASHBOARD_CONSTANTS.ENDPOINTS.TOTAL_INVOICES;
  return await apiClient.get<TotalInvoicesResponse>(url, { params: filters });
};

/**
 * Fetch Total Invoice Amount
 */
export const getTotalInvoiceAmount = async (filters?: Record<string, string | undefined>) => {
  const url = DASHBOARD_CONSTANTS.ENDPOINTS.TOTAL_INVOICE_AMOUNT;
  return await apiClient.get<TotalInvoiceAmountResponse>(url, { params: filters });
};

/**
 * Fetch Total Payments Made
 */
export const getTotalPaymentsMade = async (filters?: Record<string, string | undefined>) => {
  const url = DASHBOARD_CONSTANTS.ENDPOINTS.TOTAL_PAYMENTS_MADE;
  return await apiClient.get<TotalPaymentsMadeResponse>(url, { params: filters });
};

/**
 * Fetch Reimbursement Requests by Status
 */
export const getReimbursementRequestsbyStatus = async (filters?: Record<string, string | undefined>) => {
  const url = DASHBOARD_CONSTANTS.ENDPOINTS.REIMBURSEMENT_REQUESTSBY_STATUS;
  return await apiClient.get<ReimbursementRequestsbyStatusResponse>(url, { params: filters });
};

/**
 * Fetch Invoices Trend by Date
 */
export const getInvoicesTrendbyDate = async (filters?: Record<string, string | undefined>) => {
  const url = DASHBOARD_CONSTANTS.ENDPOINTS.INVOICES_TRENDBY_DATE;
  return await apiClient.get<InvoicesTrendbyDateResponse>(url, { params: filters });
};

/**
 * Fetch Payments by Method
 */
export const getPaymentsbyMethod = async (filters?: Record<string, string | undefined>) => {
  const url = DASHBOARD_CONSTANTS.ENDPOINTS.PAYMENTSBY_METHOD;
  return await apiClient.get<PaymentsbyMethodResponse>(url, { params: filters });
};
