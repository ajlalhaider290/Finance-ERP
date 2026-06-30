import { ReimbursementDocumentCreate, ReimbursementDocumentUpdate, ReimbursementDocumentPager, ReimbursementDocumentDetail, ReimbursementDocumentQueryParams, ReimbursementDocumentPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getReimbursementDocuments = async (queryParams: ReimbursementDocumentQueryParams | null) => {
  const url = `/reimbursement-documents${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<ReimbursementDocumentPager>(url);
};

export const getSelectReimbursementDocuments = async () => {
  const url = `/reimbursement-documents/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getReimbursementDocumentDetails = async (primaryKeys: Partial<ReimbursementDocumentPrimaryKeys>) => {
  const { documentId } = primaryKeys;
  const url = `/reimbursement-documents/detail/${documentId}`;
  const response = await apiClient.get<{ data: ReimbursementDocumentDetail }>(url);
  return response.data;
};

export const getReimbursementDocumentEditDetails = async (primaryKeys: Partial<ReimbursementDocumentPrimaryKeys>) => {
  const { documentId } = primaryKeys;
  const url = `/reimbursement-documents/${documentId}`;
  return await apiClient.get<ReimbursementDocumentUpdate>(url);
};

export const deleteReimbursementDocument = async (primaryKeys: Partial<ReimbursementDocumentPrimaryKeys>) => {
  const { documentId } = primaryKeys;
  const url = `/reimbursement-documents/${documentId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateReimbursementDocument = async (data: Partial<ReimbursementDocumentPrimaryKeys & ReimbursementDocumentUpdate>) => {
  const { documentId, ...rest } = data;
  const url = `/reimbursement-documents/${documentId}`;
  return await apiClient.put<MutationResponse<ReimbursementDocumentUpdate>>(url, { documentId, ...rest });
};

export const addReimbursementDocument = async (data: Partial<ReimbursementDocumentCreate>) => {
  return await apiClient.post<MutationResponse<ReimbursementDocumentCreate>>('/reimbursement-documents', data);
};

export const uploadReimbursementDocument = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/reimbursement-documents/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadReimbursementDocument = async (data: ReimbursementDocumentPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/reimbursement-documents/upload/${data.documentId}`, { data });
};

