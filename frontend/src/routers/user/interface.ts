import { userCreateSchema, userUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type UserPrimaryKeys = {
	userId: string;
}


export type User = UserPrimaryKeys & {
	email: string;
	username: string;
	password: string;
	role: string;
	department?: string | null;
	entityId?: string | null;
	createdAt: Date;
	updatedAt: Date;
}


export type UserIndex = Omit<User, 'password' | 'userId'> & {
	usersLabel: string;
	_meta: ItemMeta<UserPrimaryKeys>;
}

export type UserPager = {
	data: UserIndex[];
	meta: Pager;
}

export type UserQueryParams = {
	page?: number;
	pageSize?: number;
}

export type UserDetail = Omit<User, 'password' | 'userId'> & {
	usersLabel: string;
	_meta: ItemMeta<UserPrimaryKeys>;
}

