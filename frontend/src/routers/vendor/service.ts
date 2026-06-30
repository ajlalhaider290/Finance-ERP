import { VendorCreate, VendorUpdate, VendorPager, VendorDetail, VendorQueryParams, VendorPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getVendors = async (queryParams: VendorQueryParams | null) => {
  const url = `/vendors${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<VendorPager>(url);
};

export const getSelectVendors = async () => {
  const url = `/vendors/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getVendorDetails = async (primaryKeys: Partial<VendorPrimaryKeys>) => {
  const { vendorId } = primaryKeys;
  const url = `/vendors/detail/${vendorId}`;
  const response = await apiClient.get<{ data: VendorDetail }>(url);
  return response.data;
};

export const getVendorEditDetails = async (primaryKeys: Partial<VendorPrimaryKeys>) => {
  const { vendorId } = primaryKeys;
  const url = `/vendors/${vendorId}`;
  return await apiClient.get<VendorUpdate>(url);
};

export const deleteVendor = async (primaryKeys: Partial<VendorPrimaryKeys>) => {
  const { vendorId } = primaryKeys;
  const url = `/vendors/${vendorId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateVendor = async (data: Partial<VendorPrimaryKeys & VendorUpdate>) => {
  const { vendorId, ...rest } = data;
  const url = `/vendors/${vendorId}`;
  return await apiClient.put<MutationResponse<VendorUpdate>>(url, { vendorId, ...rest });
};

export const addVendor = async (data: Partial<VendorCreate>) => {
  return await apiClient.post<MutationResponse<VendorCreate>>('/vendors', data);
};

export const uploadVendor = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/vendors/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadVendor = async (data: VendorPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/vendors/upload/${data.vendorId}`, { data });
};

