import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { User } from '../../models/user';
import { hashPassword } from '../../helper/auth';
import { CompanyEntity } from '../../models/company-entity';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { UserPrimaryKeys, CreateUserInput, UpdateUserInput, QueryUserInput } from './types';

export const fetchUserList = async (params: QueryUserInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await User.findAndCountAll({
		attributes: [
// email, username, role, department, entityId, createdAt, updatedAt
			'email',
			'username',
			'role',
			'department',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "User".entity_id LIMIT 1)'), 'usersLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "User"."email", 'primaryKeys', json_build_object('userId', "User"."user_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectUser = async () => {

	const results = await User.findAll({
		attributes: [
			['user_id', 'value'],
			['email', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addUser = async (payload: CreateUserInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

if(payload.password !== undefined && payload.password.length > 0){
					const {passwordHash} = await hashPassword(payload.password);
					payload.password = passwordHash;
			}
					const userDefaultPayload = {
			role: payload.role ?? "employee"
	};
	const user = await User.create({...payload, ...userDefaultPayload}, { transaction: t });

	return user.get({ plain: true });
	});
};

export const editUser = async (params: UserPrimaryKeys): Promise<User> => {
	// Initialize filters and include relationships
	const where: WhereOptions<User> & Record<symbol, unknown> = {};

	const user = await User.findOne({
		attributes: [
// email, username, role, department, entityId
			'email',
			'username',
			'role',
			'department',
			'entityId',
		],
		where: {
			userId : params.userId,
			...where,
		},
		
	});

	if (!user) {
		throw notFound('User', 'INVALID_USER_ID');
	}

	return user.get({ plain: true }) as User;
};

export const updateUser = async (params: UserPrimaryKeys, payload: UpdateUserInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<User> & Record<symbol, unknown> = {};
	const user = await User.findOne({
		where: {
			userId : params.userId,
			...where,
		},
		transaction: t,
	});

	if (!user) {
		throw notFound('User', 'INVALID_USER_ID');
	}

	const { password, ...restPayload } = payload;
	const updateData = { ...restPayload, ...( password && password.length > 0 ? { password: (await hashPassword(password)).passwordHash } : {}) };
	await user.update(updateData, { transaction: t });

	return {
		message: 'User updated successfully',
		data: user.get({ plain: true }),
	};
	});
};

export const getUser = async (params: UserPrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const user = await User.findOne({
		attributes: [
// email, username, role, department, entityId, createdAt, updatedAt
			'email',
			'username',
			'role',
			'department',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "User".entity_id LIMIT 1)'), 'usersLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "User"."email", 'primaryKeys', json_build_object('userId', "User"."user_id"::text))`), '_meta'],
		],
		where: {
			userId : params.userId,
		},
		include: [...include],
		
	});

	if (!user) {
		throw notFound('User', 'INVALID_USER_ID');
	}

	return {
		data: user.get({ plain: true }),
	};
};

export const deleteUser = async (params: UserPrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<User> & Record<symbol, unknown> = {};
	const user = await User.findOne({
		where: {
			userId : params.userId,
			...where,
		},
		transaction: t,
	});

	if (!user) {
		throw notFound('User', 'INVALID_USER_ID');
	}

	await user.destroy({ transaction: t });

	return { messageCode: 'USER_DELETED_SUCCESSFULLY',  message: 'user Deleted Successfully' };
	});
};

