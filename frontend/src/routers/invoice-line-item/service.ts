import { InvoiceLineItemCreate, InvoiceLineItemUpdate, InvoiceLineItemPager, InvoiceLineItemDetail, InvoiceLineItemQueryParams, InvoiceLineItemPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getInvoiceLineItems = async (queryParams: InvoiceLineItemQueryParams | null) => {
  const url = `/invoice-line-items${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<InvoiceLineItemPager>(url);
};

export const getSelectInvoiceLineItems = async () => {
  const url = `/invoice-line-items/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getInvoiceLineItemDetails = async (primaryKeys: Partial<InvoiceLineItemPrimaryKeys>) => {
  const { lineItemId } = primaryKeys;
  const url = `/invoice-line-items/detail/${lineItemId}`;
  const response = await apiClient.get<{ data: InvoiceLineItemDetail }>(url);
  return response.data;
};

export const getInvoiceLineItemEditDetails = async (primaryKeys: Partial<InvoiceLineItemPrimaryKeys>) => {
  const { lineItemId } = primaryKeys;
  const url = `/invoice-line-items/${lineItemId}`;
  return await apiClient.get<InvoiceLineItemUpdate>(url);
};

export const deleteInvoiceLineItem = async (primaryKeys: Partial<InvoiceLineItemPrimaryKeys>) => {
  const { lineItemId } = primaryKeys;
  const url = `/invoice-line-items/${lineItemId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateInvoiceLineItem = async (data: Partial<InvoiceLineItemPrimaryKeys & InvoiceLineItemUpdate>) => {
  const { lineItemId, ...rest } = data;
  const url = `/invoice-line-items/${lineItemId}`;
  return await apiClient.put<MutationResponse<InvoiceLineItemUpdate>>(url, { lineItemId, ...rest });
};

export const addInvoiceLineItem = async (data: Partial<InvoiceLineItemCreate>) => {
  return await apiClient.post<MutationResponse<InvoiceLineItemCreate>>('/invoice-line-items', data);
};

export const uploadInvoiceLineItem = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/invoice-line-items/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadInvoiceLineItem = async (data: InvoiceLineItemPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/invoice-line-items/upload/${data.lineItemId}`, { data });
};

