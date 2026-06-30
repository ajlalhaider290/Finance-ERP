import { PaymentCreate, PaymentUpdate, PaymentPager, PaymentDetail, PaymentQueryParams, PaymentPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getPayments = async (queryParams: PaymentQueryParams | null) => {
  const url = `/payments${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<PaymentPager>(url);
};

export const getSelectPayments = async () => {
  const url = `/payments/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getPaymentDetails = async (primaryKeys: Partial<PaymentPrimaryKeys>) => {
  const { paymentId } = primaryKeys;
  const url = `/payments/detail/${paymentId}`;
  const response = await apiClient.get<{ data: PaymentDetail }>(url);
  return response.data;
};

export const getPaymentEditDetails = async (primaryKeys: Partial<PaymentPrimaryKeys>) => {
  const { paymentId } = primaryKeys;
  const url = `/payments/${paymentId}`;
  return await apiClient.get<PaymentUpdate>(url);
};

export const deletePayment = async (primaryKeys: Partial<PaymentPrimaryKeys>) => {
  const { paymentId } = primaryKeys;
  const url = `/payments/${paymentId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updatePayment = async (data: Partial<PaymentPrimaryKeys & PaymentUpdate>) => {
  const { paymentId, ...rest } = data;
  const url = `/payments/${paymentId}`;
  return await apiClient.put<MutationResponse<PaymentUpdate>>(url, { paymentId, ...rest });
};

export const addPayment = async (data: Partial<PaymentCreate>) => {
  return await apiClient.post<MutationResponse<PaymentCreate>>('/payments', data);
};

export const uploadPayment = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/payments/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadPayment = async (data: PaymentPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/payments/upload/${data.paymentId}`, { data });
};

