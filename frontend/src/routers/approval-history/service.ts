import { ApprovalHistoryCreate, ApprovalHistoryUpdate, ApprovalHistoryPager, ApprovalHistoryDetail, ApprovalHistoryQueryParams, ApprovalHistoryPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getApprovalHistories = async (queryParams: ApprovalHistoryQueryParams | null) => {
  const url = `/approval-histories${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<ApprovalHistoryPager>(url);
};

export const getSelectApprovalHistories = async () => {
  const url = `/approval-histories/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getApprovalHistoryDetails = async (primaryKeys: Partial<ApprovalHistoryPrimaryKeys>) => {
  const { historyId } = primaryKeys;
  const url = `/approval-histories/detail/${historyId}`;
  const response = await apiClient.get<{ data: ApprovalHistoryDetail }>(url);
  return response.data;
};

export const getApprovalHistoryEditDetails = async (primaryKeys: Partial<ApprovalHistoryPrimaryKeys>) => {
  const { historyId } = primaryKeys;
  const url = `/approval-histories/${historyId}`;
  return await apiClient.get<ApprovalHistoryUpdate>(url);
};

export const deleteApprovalHistory = async (primaryKeys: Partial<ApprovalHistoryPrimaryKeys>) => {
  const { historyId } = primaryKeys;
  const url = `/approval-histories/${historyId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateApprovalHistory = async (data: Partial<ApprovalHistoryPrimaryKeys & ApprovalHistoryUpdate>) => {
  const { historyId, ...rest } = data;
  const url = `/approval-histories/${historyId}`;
  return await apiClient.put<MutationResponse<ApprovalHistoryUpdate>>(url, { historyId, ...rest });
};

export const addApprovalHistory = async (data: Partial<ApprovalHistoryCreate>) => {
  return await apiClient.post<MutationResponse<ApprovalHistoryCreate>>('/approval-histories', data);
};

export const uploadApprovalHistory = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/approval-histories/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadApprovalHistory = async (data: ApprovalHistoryPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/approval-histories/upload/${data.historyId}`, { data });
};

