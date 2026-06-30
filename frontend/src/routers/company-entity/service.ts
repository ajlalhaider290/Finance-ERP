import { CompanyEntityCreate, CompanyEntityUpdate, CompanyEntityPager, CompanyEntityDetail, CompanyEntityQueryParams, CompanyEntityPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getCompanyEntities = async (queryParams: CompanyEntityQueryParams | null) => {
  const url = `/company-entities${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<CompanyEntityPager>(url);
};

export const getSelectCompanyEntities = async () => {
  const url = `/company-entities/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getCompanyEntityDetails = async (primaryKeys: Partial<CompanyEntityPrimaryKeys>) => {
  const { entityId } = primaryKeys;
  const url = `/company-entities/detail/${entityId}`;
  const response = await apiClient.get<{ data: CompanyEntityDetail }>(url);
  return response.data;
};

export const getCompanyEntityEditDetails = async (primaryKeys: Partial<CompanyEntityPrimaryKeys>) => {
  const { entityId } = primaryKeys;
  const url = `/company-entities/${entityId}`;
  return await apiClient.get<CompanyEntityUpdate>(url);
};

export const deleteCompanyEntity = async (primaryKeys: Partial<CompanyEntityPrimaryKeys>) => {
  const { entityId } = primaryKeys;
  const url = `/company-entities/${entityId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateCompanyEntity = async (data: Partial<CompanyEntityPrimaryKeys & CompanyEntityUpdate>) => {
  const { entityId, ...rest } = data;
  const url = `/company-entities/${entityId}`;
  return await apiClient.put<MutationResponse<CompanyEntityUpdate>>(url, { entityId, ...rest });
};

export const addCompanyEntity = async (data: Partial<CompanyEntityCreate>) => {
  return await apiClient.post<MutationResponse<CompanyEntityCreate>>('/company-entities', data);
};

export const uploadCompanyEntity = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/company-entities/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadCompanyEntity = async (data: CompanyEntityPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/company-entities/upload/${data.entityId}`, { data });
};

