import { JournalEntryLineCreate, JournalEntryLineUpdate, JournalEntryLinePager, JournalEntryLineDetail, JournalEntryLineQueryParams, JournalEntryLinePrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getJournalEntryLines = async (queryParams: JournalEntryLineQueryParams | null) => {
  const url = `/journal-entry-lines${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<JournalEntryLinePager>(url);
};

export const getSelectJournalEntryLines = async () => {
  const url = `/journal-entry-lines/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getJournalEntryLineDetails = async (primaryKeys: Partial<JournalEntryLinePrimaryKeys>) => {
  const { lineId } = primaryKeys;
  const url = `/journal-entry-lines/detail/${lineId}`;
  const response = await apiClient.get<{ data: JournalEntryLineDetail }>(url);
  return response.data;
};

export const getJournalEntryLineEditDetails = async (primaryKeys: Partial<JournalEntryLinePrimaryKeys>) => {
  const { lineId } = primaryKeys;
  const url = `/journal-entry-lines/${lineId}`;
  return await apiClient.get<JournalEntryLineUpdate>(url);
};

export const deleteJournalEntryLine = async (primaryKeys: Partial<JournalEntryLinePrimaryKeys>) => {
  const { lineId } = primaryKeys;
  const url = `/journal-entry-lines/${lineId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateJournalEntryLine = async (data: Partial<JournalEntryLinePrimaryKeys & JournalEntryLineUpdate>) => {
  const { lineId, ...rest } = data;
  const url = `/journal-entry-lines/${lineId}`;
  return await apiClient.put<MutationResponse<JournalEntryLineUpdate>>(url, { lineId, ...rest });
};

export const addJournalEntryLine = async (data: Partial<JournalEntryLineCreate>) => {
  return await apiClient.post<MutationResponse<JournalEntryLineCreate>>('/journal-entry-lines', data);
};

export const uploadJournalEntryLine = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/journal-entry-lines/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadJournalEntryLine = async (data: JournalEntryLinePrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/journal-entry-lines/upload/${data.lineId}`, { data });
};

