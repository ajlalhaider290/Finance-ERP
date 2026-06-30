import { PaymentAllocationCreate, PaymentAllocationUpdate, PaymentAllocationPager, PaymentAllocationDetail, PaymentAllocationQueryParams, PaymentAllocationPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getPaymentAllocations = async (queryParams: PaymentAllocationQueryParams | null) => {
  const url = `/payment-allocations${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<PaymentAllocationPager>(url);
};

export const getSelectPaymentAllocations = async () => {
  const url = `/payment-allocations/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getPaymentAllocationDetails = async (primaryKeys: Partial<PaymentAllocationPrimaryKeys>) => {
  const { allocationId } = primaryKeys;
  const url = `/payment-allocations/detail/${allocationId}`;
  const response = await apiClient.get<{ data: PaymentAllocationDetail }>(url);
  return response.data;
};

export const getPaymentAllocationEditDetails = async (primaryKeys: Partial<PaymentAllocationPrimaryKeys>) => {
  const { allocationId } = primaryKeys;
  const url = `/payment-allocations/${allocationId}`;
  return await apiClient.get<PaymentAllocationUpdate>(url);
};

export const deletePaymentAllocation = async (primaryKeys: Partial<PaymentAllocationPrimaryKeys>) => {
  const { allocationId } = primaryKeys;
  const url = `/payment-allocations/${allocationId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updatePaymentAllocation = async (data: Partial<PaymentAllocationPrimaryKeys & PaymentAllocationUpdate>) => {
  const { allocationId, ...rest } = data;
  const url = `/payment-allocations/${allocationId}`;
  return await apiClient.put<MutationResponse<PaymentAllocationUpdate>>(url, { allocationId, ...rest });
};

export const addPaymentAllocation = async (data: Partial<PaymentAllocationCreate>) => {
  return await apiClient.post<MutationResponse<PaymentAllocationCreate>>('/payment-allocations', data);
};

export const uploadPaymentAllocation = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/payment-allocations/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadPaymentAllocation = async (data: PaymentAllocationPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/payment-allocations/upload/${data.allocationId}`, { data });
};

