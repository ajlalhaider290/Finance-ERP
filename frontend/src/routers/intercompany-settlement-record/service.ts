import { IntercompanySettlementRecordCreate, IntercompanySettlementRecordUpdate, IntercompanySettlementRecordPager, IntercompanySettlementRecordDetail, IntercompanySettlementRecordQueryParams, IntercompanySettlementRecordPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getIntercompanySettlementRecords = async (queryParams: IntercompanySettlementRecordQueryParams | null) => {
  const url = `/intercompany-settlement-records${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<IntercompanySettlementRecordPager>(url);
};

export const getSelectIntercompanySettlementRecords = async () => {
  const url = `/intercompany-settlement-records/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getIntercompanySettlementRecordDetails = async (primaryKeys: Partial<IntercompanySettlementRecordPrimaryKeys>) => {
  const { settlementRecordId } = primaryKeys;
  const url = `/intercompany-settlement-records/detail/${settlementRecordId}`;
  const response = await apiClient.get<{ data: IntercompanySettlementRecordDetail }>(url);
  return response.data;
};

export const getIntercompanySettlementRecordEditDetails = async (primaryKeys: Partial<IntercompanySettlementRecordPrimaryKeys>) => {
  const { settlementRecordId } = primaryKeys;
  const url = `/intercompany-settlement-records/${settlementRecordId}`;
  return await apiClient.get<IntercompanySettlementRecordUpdate>(url);
};

export const deleteIntercompanySettlementRecord = async (primaryKeys: Partial<IntercompanySettlementRecordPrimaryKeys>) => {
  const { settlementRecordId } = primaryKeys;
  const url = `/intercompany-settlement-records/${settlementRecordId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateIntercompanySettlementRecord = async (data: Partial<IntercompanySettlementRecordPrimaryKeys & IntercompanySettlementRecordUpdate>) => {
  const { settlementRecordId, ...rest } = data;
  const url = `/intercompany-settlement-records/${settlementRecordId}`;
  return await apiClient.put<MutationResponse<IntercompanySettlementRecordUpdate>>(url, { settlementRecordId, ...rest });
};

export const addIntercompanySettlementRecord = async (data: Partial<IntercompanySettlementRecordCreate>) => {
  return await apiClient.post<MutationResponse<IntercompanySettlementRecordCreate>>('/intercompany-settlement-records', data);
};

export const uploadIntercompanySettlementRecord = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/intercompany-settlement-records/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadIntercompanySettlementRecord = async (data: IntercompanySettlementRecordPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/intercompany-settlement-records/upload/${data.settlementRecordId}`, { data });
};

