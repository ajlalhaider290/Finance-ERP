import { ApprovalTaskCreate, ApprovalTaskUpdate, ApprovalTaskPager, ApprovalTaskDetail, ApprovalTaskQueryParams, ApprovalTaskPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getApprovalTasks = async (queryParams: ApprovalTaskQueryParams | null) => {
  const url = `/approval-tasks${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<ApprovalTaskPager>(url);
};

export const getSelectApprovalTasks = async () => {
  const url = `/approval-tasks/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getApprovalTaskDetails = async (primaryKeys: Partial<ApprovalTaskPrimaryKeys>) => {
  const { taskId } = primaryKeys;
  const url = `/approval-tasks/detail/${taskId}`;
  const response = await apiClient.get<{ data: ApprovalTaskDetail }>(url);
  return response.data;
};

export const getApprovalTaskEditDetails = async (primaryKeys: Partial<ApprovalTaskPrimaryKeys>) => {
  const { taskId } = primaryKeys;
  const url = `/approval-tasks/${taskId}`;
  return await apiClient.get<ApprovalTaskUpdate>(url);
};

export const deleteApprovalTask = async (primaryKeys: Partial<ApprovalTaskPrimaryKeys>) => {
  const { taskId } = primaryKeys;
  const url = `/approval-tasks/${taskId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateApprovalTask = async (data: Partial<ApprovalTaskPrimaryKeys & ApprovalTaskUpdate>) => {
  const { taskId, ...rest } = data;
  const url = `/approval-tasks/${taskId}`;
  return await apiClient.put<MutationResponse<ApprovalTaskUpdate>>(url, { taskId, ...rest });
};

export const addApprovalTask = async (data: Partial<ApprovalTaskCreate>) => {
  return await apiClient.post<MutationResponse<ApprovalTaskCreate>>('/approval-tasks', data);
};

export const uploadApprovalTask = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/approval-tasks/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadApprovalTask = async (data: ApprovalTaskPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/approval-tasks/upload/${data.taskId}`, { data });
};

