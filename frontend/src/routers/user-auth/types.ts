import { AppArea } from '@/config/areas/areaConfig';
import { loginUserPayloadValidator, registerUserPayloadValidator, profileUserPayloadValidator, changePasswordUserPayloadValidator, forgotPasswordUserPayloadValidator, resetPasswordUserPayloadValidator } from './validation';
import { z } from 'zod';

export type UserLoginRequest = z.infer<typeof loginUserPayloadValidator>

export type UserRegisterRequest = z.infer<typeof registerUserPayloadValidator>

export type UserProfile = z.infer<typeof profileUserPayloadValidator>

export type UserProfileDetail = UserProfile & {
	usersLabel: string;
};

export type UserChangePasswordRequest = z.infer<typeof changePasswordUserPayloadValidator>

export type UserForgotPasswordRequest = z.infer<typeof forgotPasswordUserPayloadValidator>

export type UserResetPasswordRequest = z.infer<typeof resetPasswordUserPayloadValidator>

export type UserSession = {
userId: string;
email: string;
username: string;
role: string;
department: string;
entityId: string;
createdAt: Date;
updatedAt: Date;

}
export type UserLoginResponse = {
	user: UserSession & { areaScope?: AppArea[], scope?: string[] };
	token: string;
	refreshToken: string;
};

