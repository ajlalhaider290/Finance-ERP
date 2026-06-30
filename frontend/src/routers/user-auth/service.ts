import { UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserProfile, UserProfileDetail, UserForgotPasswordRequest, UserResetPasswordRequest, UserChangePasswordRequest } from './types';
import apiClient from '@/services/apiClient';

export const userLogin = async (credentials: UserLoginRequest) => {
  return await apiClient.post<UserLoginResponse>('/users-auth/login', credentials);
};export const userRegister = async (userData: UserRegisterRequest) => {
  return await apiClient.post<UserLoginResponse>('/users-auth/register', userData);
};export const getUserProfile = async (token?: string) => {
  return await apiClient.get<UserProfileDetail>('/users-auth/profile', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};

export const updateUserProfile = async (profileData: Partial<UserProfile>) => {
  return await apiClient.put<UserProfile>(`/users-auth/profile`, profileData);
};

export const userLogout = async (token?: string) => {
  if (token) {
    return await apiClient.post<void>('/users-auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
};

export const userForgotPassword = async (request: UserForgotPasswordRequest) => {
  return await apiClient.post<{ message: string }>('/users-auth/forgot-password', request);
};

export const userResetPassword = async (request: UserResetPasswordRequest) => {
  return await apiClient.post<{ message: string }>('/users-auth/reset-password', request);
};

export const userChangePassword = async (request: UserChangePasswordRequest) => {
  return await apiClient.put<{ message: string }>(`/users-auth/change-password`, request);
};
