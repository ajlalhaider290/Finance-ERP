import { ExpenseCategoryCreate, ExpenseCategoryUpdate, ExpenseCategoryPager, ExpenseCategoryDetail, ExpenseCategoryQueryParams, ExpenseCategoryPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getExpenseCategories = async (queryParams: ExpenseCategoryQueryParams | null) => {
  const url = `/expense-categories${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<ExpenseCategoryPager>(url);
};

export const getSelectExpenseCategories = async () => {
  const url = `/expense-categories/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getExpenseCategoryDetails = async (primaryKeys: Partial<ExpenseCategoryPrimaryKeys>) => {
  const { categoryId } = primaryKeys;
  const url = `/expense-categories/detail/${categoryId}`;
  const response = await apiClient.get<{ data: ExpenseCategoryDetail }>(url);
  return response.data;
};

export const getExpenseCategoryEditDetails = async (primaryKeys: Partial<ExpenseCategoryPrimaryKeys>) => {
  const { categoryId } = primaryKeys;
  const url = `/expense-categories/${categoryId}`;
  return await apiClient.get<ExpenseCategoryUpdate>(url);
};

export const deleteExpenseCategory = async (primaryKeys: Partial<ExpenseCategoryPrimaryKeys>) => {
  const { categoryId } = primaryKeys;
  const url = `/expense-categories/${categoryId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateExpenseCategory = async (data: Partial<ExpenseCategoryPrimaryKeys & ExpenseCategoryUpdate>) => {
  const { categoryId, ...rest } = data;
  const url = `/expense-categories/${categoryId}`;
  return await apiClient.put<MutationResponse<ExpenseCategoryUpdate>>(url, { categoryId, ...rest });
};

export const addExpenseCategory = async (data: Partial<ExpenseCategoryCreate>) => {
  return await apiClient.post<MutationResponse<ExpenseCategoryCreate>>('/expense-categories', data);
};

export const uploadExpenseCategory = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/expense-categories/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadExpenseCategory = async (data: ExpenseCategoryPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/expense-categories/upload/${data.categoryId}`, { data });
};

