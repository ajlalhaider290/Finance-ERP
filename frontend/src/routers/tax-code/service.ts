import { TaxCodeCreate, TaxCodeUpdate, TaxCodePager, TaxCodeDetail, TaxCodeQueryParams, TaxCodePrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getTaxCodes = async (queryParams: TaxCodeQueryParams | null) => {
  const url = `/tax-codes${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<TaxCodePager>(url);
};

export const getSelectTaxCodes = async () => {
  const url = `/tax-codes/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getTaxCodeDetails = async (primaryKeys: Partial<TaxCodePrimaryKeys>) => {
  const { taxCodeId } = primaryKeys;
  const url = `/tax-codes/detail/${taxCodeId}`;
  const response = await apiClient.get<{ data: TaxCodeDetail }>(url);
  return response.data;
};

export const getTaxCodeEditDetails = async (primaryKeys: Partial<TaxCodePrimaryKeys>) => {
  const { taxCodeId } = primaryKeys;
  const url = `/tax-codes/${taxCodeId}`;
  return await apiClient.get<TaxCodeUpdate>(url);
};

export const deleteTaxCode = async (primaryKeys: Partial<TaxCodePrimaryKeys>) => {
  const { taxCodeId } = primaryKeys;
  const url = `/tax-codes/${taxCodeId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateTaxCode = async (data: Partial<TaxCodePrimaryKeys & TaxCodeUpdate>) => {
  const { taxCodeId, ...rest } = data;
  const url = `/tax-codes/${taxCodeId}`;
  return await apiClient.put<MutationResponse<TaxCodeUpdate>>(url, { taxCodeId, ...rest });
};

export const addTaxCode = async (data: Partial<TaxCodeCreate>) => {
  return await apiClient.post<MutationResponse<TaxCodeCreate>>('/tax-codes', data);
};

export const uploadTaxCode = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/tax-codes/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadTaxCode = async (data: TaxCodePrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/tax-codes/upload/${data.taxCodeId}`, { data });
};

