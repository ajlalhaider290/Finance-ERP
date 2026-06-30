import { IntercompanyTransactionCreate, IntercompanyTransactionUpdate, IntercompanyTransactionPager, IntercompanyTransactionDetail, IntercompanyTransactionQueryParams, IntercompanyTransactionPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getIntercompanyTransactions = async (queryParams: IntercompanyTransactionQueryParams | null) => {
  const url = `/intercompany-transactions${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<IntercompanyTransactionPager>(url);
};

export const getSelectIntercompanyTransactions = async () => {
  const url = `/intercompany-transactions/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getIntercompanyTransactionDetails = async (primaryKeys: Partial<IntercompanyTransactionPrimaryKeys>) => {
  const { transactionId } = primaryKeys;
  const url = `/intercompany-transactions/detail/${transactionId}`;
  const response = await apiClient.get<{ data: IntercompanyTransactionDetail }>(url);
  return response.data;
};

export const getIntercompanyTransactionEditDetails = async (primaryKeys: Partial<IntercompanyTransactionPrimaryKeys>) => {
  const { transactionId } = primaryKeys;
  const url = `/intercompany-transactions/${transactionId}`;
  return await apiClient.get<IntercompanyTransactionUpdate>(url);
};

export const deleteIntercompanyTransaction = async (primaryKeys: Partial<IntercompanyTransactionPrimaryKeys>) => {
  const { transactionId } = primaryKeys;
  const url = `/intercompany-transactions/${transactionId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateIntercompanyTransaction = async (data: Partial<IntercompanyTransactionPrimaryKeys & IntercompanyTransactionUpdate>) => {
  const { transactionId, ...rest } = data;
  const url = `/intercompany-transactions/${transactionId}`;
  return await apiClient.put<MutationResponse<IntercompanyTransactionUpdate>>(url, { transactionId, ...rest });
};

export const addIntercompanyTransaction = async (data: Partial<IntercompanyTransactionCreate>) => {
  return await apiClient.post<MutationResponse<IntercompanyTransactionCreate>>('/intercompany-transactions', data);
};

export const uploadIntercompanyTransaction = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/intercompany-transactions/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadIntercompanyTransaction = async (data: IntercompanyTransactionPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/intercompany-transactions/upload/${data.transactionId}`, { data });
};

