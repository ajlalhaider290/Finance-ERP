import { ReimbursementRequestCreate, ReimbursementRequestUpdate, ReimbursementRequestPager, ReimbursementRequestDetail, ReimbursementRequestQueryParams, ReimbursementRequestPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getReimbursementRequests = async (queryParams: ReimbursementRequestQueryParams | null) => {
  const url = `/reimbursement-requests${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<ReimbursementRequestPager>(url);
};

export const getSelectReimbursementRequests = async () => {
  const url = `/reimbursement-requests/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getReimbursementRequestDetails = async (primaryKeys: Partial<ReimbursementRequestPrimaryKeys>) => {
  const { reimbursementRequestId } = primaryKeys;
  const url = `/reimbursement-requests/detail/${reimbursementRequestId}`;
  const response = await apiClient.get<{ data: ReimbursementRequestDetail }>(url);
  return response.data;
};

export const getReimbursementRequestEditDetails = async (primaryKeys: Partial<ReimbursementRequestPrimaryKeys>) => {
  const { reimbursementRequestId } = primaryKeys;
  const url = `/reimbursement-requests/${reimbursementRequestId}`;
  return await apiClient.get<ReimbursementRequestUpdate>(url);
};

export const deleteReimbursementRequest = async (primaryKeys: Partial<ReimbursementRequestPrimaryKeys>) => {
  const { reimbursementRequestId } = primaryKeys;
  const url = `/reimbursement-requests/${reimbursementRequestId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateReimbursementRequest = async (data: Partial<ReimbursementRequestPrimaryKeys & ReimbursementRequestUpdate>) => {
  const { reimbursementRequestId, ...rest } = data;
  const url = `/reimbursement-requests/${reimbursementRequestId}`;
  return await apiClient.put<MutationResponse<ReimbursementRequestUpdate>>(url, { reimbursementRequestId, ...rest });
};

export const addReimbursementRequest = async (data: Partial<ReimbursementRequestCreate>) => {
  return await apiClient.post<MutationResponse<ReimbursementRequestCreate>>('/reimbursement-requests', data);
};

export const uploadReimbursementRequest = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/reimbursement-requests/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadReimbursementRequest = async (data: ReimbursementRequestPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/reimbursement-requests/upload/${data.reimbursementRequestId}`, { data });
};

