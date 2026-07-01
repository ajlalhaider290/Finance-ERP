import { InvoiceCreate, InvoiceUpdate, InvoicePager, InvoiceDetail, InvoiceQueryParams, InvoicePrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getInvoices = async (queryParams: InvoiceQueryParams | null) => {
  const url = `/invoices${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<InvoicePager>(url);
};

export const getSelectInvoices = async () => {
  const url = `/invoices/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getInvoiceDetails = async (primaryKeys: Partial<InvoicePrimaryKeys>) => {
  const { invoiceId } = primaryKeys;
  const url = `/invoices/detail/${invoiceId}`;
  const response = await apiClient.get<{ data: InvoiceDetail }>(url);
  return response.data;
};

export const getInvoiceEditDetails = async (primaryKeys: Partial<InvoicePrimaryKeys>) => {
  const { invoiceId } = primaryKeys;
  const url = `/invoices/${invoiceId}`;
  return await apiClient.get<InvoiceUpdate>(url);
};

export const deleteInvoice = async (primaryKeys: Partial<InvoicePrimaryKeys>) => {
  const { invoiceId } = primaryKeys;
  const url = `/invoices/${invoiceId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateInvoice = async (data: Partial<InvoicePrimaryKeys & InvoiceUpdate>) => {
  const { invoiceId, ...rest } = data;
  const url = `/invoices/${invoiceId}`;
  return await apiClient.put<MutationResponse<InvoiceUpdate>>(url, { invoiceId, ...rest });
};

export const addInvoice = async (data: Partial<InvoiceCreate>) => {
  return await apiClient.post<MutationResponse<InvoiceCreate>>('/invoices', data);
};

export const submitInvoice = async (primaryKeys: Partial<InvoicePrimaryKeys>) => {
  const { invoiceId } = primaryKeys;
  return await apiClient.post<MutationResponse<InvoiceUpdate>>(`/invoices/${invoiceId}/submit`);
};

export const approveInvoice = async (primaryKeys: Partial<InvoicePrimaryKeys>) => {
  const { invoiceId } = primaryKeys;
  return await apiClient.post<MutationResponse<InvoiceUpdate>>(`/invoices/${invoiceId}/approve`);
};

export const rejectInvoice = async (primaryKeys: Partial<InvoicePrimaryKeys>) => {
  const { invoiceId } = primaryKeys;
  return await apiClient.post<MutationResponse<InvoiceUpdate>>(`/invoices/${invoiceId}/reject`);
};

export const returnInvoice = async (primaryKeys: Partial<InvoicePrimaryKeys>) => {
  const { invoiceId } = primaryKeys;
  return await apiClient.post<MutationResponse<InvoiceUpdate>>(`/invoices/${invoiceId}/return`);
};

export const uploadInvoice = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/invoices/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadInvoice = async (data: InvoicePrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/invoices/upload/${data.invoiceId}`, { data });
};
