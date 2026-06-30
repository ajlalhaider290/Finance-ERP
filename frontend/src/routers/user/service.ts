import { UserCreate, UserUpdate, UserPager, UserDetail, UserQueryParams, UserPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getUsers = async (queryParams: UserQueryParams | null) => {
  const url = `/users${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<UserPager>(url);
};

export const getSelectUsers = async () => {
  const url = `/users/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getUserDetails = async (primaryKeys: Partial<UserPrimaryKeys>) => {
  const { userId } = primaryKeys;
  const url = `/users/detail/${userId}`;
  const response = await apiClient.get<{ data: UserDetail }>(url);
  return response.data;
};

export const getUserEditDetails = async (primaryKeys: Partial<UserPrimaryKeys>) => {
  const { userId } = primaryKeys;
  const url = `/users/${userId}`;
  return await apiClient.get<UserUpdate>(url);
};

export const deleteUser = async (primaryKeys: Partial<UserPrimaryKeys>) => {
  const { userId } = primaryKeys;
  const url = `/users/${userId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateUser = async (data: Partial<UserPrimaryKeys & UserUpdate>) => {
  const { userId, ...rest } = data;
  const url = `/users/${userId}`;
  return await apiClient.put<MutationResponse<UserUpdate>>(url, { userId, ...rest });
};

export const addUser = async (data: Partial<UserCreate>) => {
  return await apiClient.post<MutationResponse<UserCreate>>('/users', data);
};

export const uploadUser = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/users/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadUser = async (data: UserPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/users/upload/${data.userId}`, { data });
};

