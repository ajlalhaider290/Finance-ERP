import { CustomerCreate, CustomerUpdate, CustomerPager, CustomerDetail, CustomerQueryParams, CustomerPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getCustomers = async (queryParams: CustomerQueryParams | null) => {
  const url = `/customers${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<CustomerPager>(url);
};

export const getSelectCustomers = async () => {
  const url = `/customers/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getCustomerDetails = async (primaryKeys: Partial<CustomerPrimaryKeys>) => {
  const { customerId } = primaryKeys;
  const url = `/customers/detail/${customerId}`;
  const response = await apiClient.get<{ data: CustomerDetail }>(url);
  return response.data;
};

export const getCustomerEditDetails = async (primaryKeys: Partial<CustomerPrimaryKeys>) => {
  const { customerId } = primaryKeys;
  const url = `/customers/${customerId}`;
  return await apiClient.get<CustomerUpdate>(url);
};

export const deleteCustomer = async (primaryKeys: Partial<CustomerPrimaryKeys>) => {
  const { customerId } = primaryKeys;
  const url = `/customers/${customerId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateCustomer = async (data: Partial<CustomerPrimaryKeys & CustomerUpdate>) => {
  const { customerId, ...rest } = data;
  const url = `/customers/${customerId}`;
  return await apiClient.put<MutationResponse<CustomerUpdate>>(url, { customerId, ...rest });
};

export const addCustomer = async (data: Partial<CustomerCreate>) => {
  return await apiClient.post<MutationResponse<CustomerCreate>>('/customers', data);
};

export const uploadCustomer = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/customers/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadCustomer = async (data: CustomerPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/customers/upload/${data.customerId}`, { data });
};

