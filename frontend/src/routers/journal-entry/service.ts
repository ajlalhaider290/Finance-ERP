import { JournalEntryCreate, JournalEntryUpdate, JournalEntryPager, JournalEntryDetail, JournalEntryQueryParams, JournalEntryPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getJournalEntries = async (queryParams: JournalEntryQueryParams | null) => {
  const url = `/journal-entries${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<JournalEntryPager>(url);
};

export const getSelectJournalEntries = async () => {
  const url = `/journal-entries/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getJournalEntryDetails = async (primaryKeys: Partial<JournalEntryPrimaryKeys>) => {
  const { journalEntryId } = primaryKeys;
  const url = `/journal-entries/detail/${journalEntryId}`;
  const response = await apiClient.get<{ data: JournalEntryDetail }>(url);
  return response.data;
};

export const getJournalEntryEditDetails = async (primaryKeys: Partial<JournalEntryPrimaryKeys>) => {
  const { journalEntryId } = primaryKeys;
  const url = `/journal-entries/${journalEntryId}`;
  return await apiClient.get<JournalEntryUpdate>(url);
};

export const deleteJournalEntry = async (primaryKeys: Partial<JournalEntryPrimaryKeys>) => {
  const { journalEntryId } = primaryKeys;
  const url = `/journal-entries/${journalEntryId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateJournalEntry = async (data: Partial<JournalEntryPrimaryKeys & JournalEntryUpdate>) => {
  const { journalEntryId, ...rest } = data;
  const url = `/journal-entries/${journalEntryId}`;
  return await apiClient.put<MutationResponse<JournalEntryUpdate>>(url, { journalEntryId, ...rest });
};

export const addJournalEntry = async (data: Partial<JournalEntryCreate>) => {
  return await apiClient.post<MutationResponse<JournalEntryCreate>>('/journal-entries', data);
};

export const uploadJournalEntry = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/journal-entries/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadJournalEntry = async (data: JournalEntryPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/journal-entries/upload/${data.journalEntryId}`, { data });
};

