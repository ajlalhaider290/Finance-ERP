import { ReimbursementStatusHistoryCreate, ReimbursementStatusHistoryUpdate, ReimbursementStatusHistoryPager, ReimbursementStatusHistoryDetail, ReimbursementStatusHistoryQueryParams, ReimbursementStatusHistoryPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getReimbursementStatusHistories = async (queryParams: ReimbursementStatusHistoryQueryParams | null) => {
  const url = `/reimbursement-status-histories${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<ReimbursementStatusHistoryPager>(url);
};

export const getSelectReimbursementStatusHistories = async () => {
  const url = `/reimbursement-status-histories/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getReimbursementStatusHistoryDetails = async (primaryKeys: Partial<ReimbursementStatusHistoryPrimaryKeys>) => {
  const { statusHistoryId } = primaryKeys;
  const url = `/reimbursement-status-histories/detail/${statusHistoryId}`;
  const response = await apiClient.get<{ data: ReimbursementStatusHistoryDetail }>(url);
  return response.data;
};

export const getReimbursementStatusHistoryEditDetails = async (primaryKeys: Partial<ReimbursementStatusHistoryPrimaryKeys>) => {
  const { statusHistoryId } = primaryKeys;
  const url = `/reimbursement-status-histories/${statusHistoryId}`;
  return await apiClient.get<ReimbursementStatusHistoryUpdate>(url);
};

export const deleteReimbursementStatusHistory = async (primaryKeys: Partial<ReimbursementStatusHistoryPrimaryKeys>) => {
  const { statusHistoryId } = primaryKeys;
  const url = `/reimbursement-status-histories/${statusHistoryId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateReimbursementStatusHistory = async (data: Partial<ReimbursementStatusHistoryPrimaryKeys & ReimbursementStatusHistoryUpdate>) => {
  const { statusHistoryId, ...rest } = data;
  const url = `/reimbursement-status-histories/${statusHistoryId}`;
  return await apiClient.put<MutationResponse<ReimbursementStatusHistoryUpdate>>(url, { statusHistoryId, ...rest });
};

export const addReimbursementStatusHistory = async (data: Partial<ReimbursementStatusHistoryCreate>) => {
  return await apiClient.post<MutationResponse<ReimbursementStatusHistoryCreate>>('/reimbursement-status-histories', data);
};

export const uploadReimbursementStatusHistory = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/reimbursement-status-histories/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadReimbursementStatusHistory = async (data: ReimbursementStatusHistoryPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/reimbursement-status-histories/upload/${data.statusHistoryId}`, { data });
};

