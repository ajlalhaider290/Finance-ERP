import { InvoiceDocumentCreate, InvoiceDocumentUpdate, InvoiceDocumentPager, InvoiceDocumentDetail, InvoiceDocumentQueryParams, InvoiceDocumentPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getInvoiceDocuments = async (queryParams: InvoiceDocumentQueryParams | null) => {
  const url = `/invoice-documents${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<InvoiceDocumentPager>(url);
};

export const getSelectInvoiceDocuments = async () => {
  const url = `/invoice-documents/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getInvoiceDocumentDetails = async (primaryKeys: Partial<InvoiceDocumentPrimaryKeys>) => {
  const { documentId } = primaryKeys;
  const url = `/invoice-documents/detail/${documentId}`;
  const response = await apiClient.get<{ data: InvoiceDocumentDetail }>(url);
  return response.data;
};

export const getInvoiceDocumentEditDetails = async (primaryKeys: Partial<InvoiceDocumentPrimaryKeys>) => {
  const { documentId } = primaryKeys;
  const url = `/invoice-documents/${documentId}`;
  return await apiClient.get<InvoiceDocumentUpdate>(url);
};

export const deleteInvoiceDocument = async (primaryKeys: Partial<InvoiceDocumentPrimaryKeys>) => {
  const { documentId } = primaryKeys;
  const url = `/invoice-documents/${documentId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateInvoiceDocument = async (data: Partial<InvoiceDocumentPrimaryKeys & InvoiceDocumentUpdate>) => {
  const { documentId, ...rest } = data;
  const url = `/invoice-documents/${documentId}`;
  return await apiClient.put<MutationResponse<InvoiceDocumentUpdate>>(url, { documentId, ...rest });
};

export const addInvoiceDocument = async (data: Partial<InvoiceDocumentCreate>) => {
  return await apiClient.post<MutationResponse<InvoiceDocumentCreate>>('/invoice-documents', data);
};

export const uploadInvoiceDocument = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/invoice-documents/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadInvoiceDocument = async (data: InvoiceDocumentPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/invoice-documents/upload/${data.documentId}`, { data });
};

