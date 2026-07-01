import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { CompanyEntity } from '../../models/company-entity';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { CompanyEntityPrimaryKeys, CreateCompanyEntityInput, UpdateCompanyEntityInput, QueryCompanyEntityInput } from './types';

export const fetchCompanyEntityList = async (params: QueryCompanyEntityInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await CompanyEntity.findAndCountAll({
		attributes: [
// entityName, currencyCode, createdAt, updatedAt
			'entityName',
			'currencyCode',
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "CompanyEntity"."entity_name", 'primaryKeys', json_build_object('entityId', "CompanyEntity"."entity_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectCompanyEntity = async () => {
	const results = await CompanyEntity.findAll({
		attributes: ['entityId', 'entityName'],
		order: [['entityName', 'ASC']],
	});

	return results.map((item) => {
		const row = item.get({ plain: true }) as { entityId: string; entityName: string };
		return {
			value: row.entityId,
			label: row.entityName,
		};
	});
};

export const addCompanyEntity = async (payload: CreateCompanyEntityInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const companyEntityDefaultPayload = {
			currencyCode: payload.currencyCode ?? "USD"
	};
	const companyEntity = await CompanyEntity.create({...payload, ...companyEntityDefaultPayload}, { transaction: t });

	return companyEntity.get({ plain: true });
	});
};

export const editCompanyEntity = async (params: CompanyEntityPrimaryKeys): Promise<CompanyEntity> => {
	// Initialize filters and include relationships
	const where: WhereOptions<CompanyEntity> & Record<symbol, unknown> = {};

	const companyEntity = await CompanyEntity.findOne({
		attributes: [
// entityName, currencyCode
			'entityName',
			'currencyCode',
		],
		where: {
			entityId : params.entityId,
			...where,
		},
		
	});

	if (!companyEntity) {
		throw notFound('CompanyEntity', 'INVALID_COMPANY_ENTITY_ID');
	}

	return companyEntity.get({ plain: true }) as CompanyEntity;
};

export const updateCompanyEntity = async (params: CompanyEntityPrimaryKeys, payload: UpdateCompanyEntityInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<CompanyEntity> & Record<symbol, unknown> = {};
	const companyEntity = await CompanyEntity.findOne({
		where: {
			entityId : params.entityId,
			...where,
		},
		transaction: t,
	});

	if (!companyEntity) {
		throw notFound('CompanyEntity', 'INVALID_COMPANY_ENTITY_ID');
	}

	await companyEntity.update(payload, { transaction: t });

	return {
		message: 'CompanyEntity updated successfully',
		data: companyEntity.get({ plain: true }),
	};
	});
};

export const getCompanyEntity = async (params: CompanyEntityPrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const companyEntity = await CompanyEntity.findOne({
		attributes: [
// entityName, currencyCode, createdAt, updatedAt
			'entityName',
			'currencyCode',
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "CompanyEntity"."entity_name", 'primaryKeys', json_build_object('entityId', "CompanyEntity"."entity_id"::text))`), '_meta'],
		],
		where: {
			entityId : params.entityId,
		},
		include: [...include],
		
	});

	if (!companyEntity) {
		throw notFound('CompanyEntity', 'INVALID_COMPANY_ENTITY_ID');
	}

	return {
		data: companyEntity.get({ plain: true }),
	};
};

export const deleteCompanyEntity = async (params: CompanyEntityPrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<CompanyEntity> & Record<symbol, unknown> = {};
	const companyEntity = await CompanyEntity.findOne({
		where: {
			entityId : params.entityId,
			...where,
		},
		transaction: t,
	});

	if (!companyEntity) {
		throw notFound('CompanyEntity', 'INVALID_COMPANY_ENTITY_ID');
	}

	await companyEntity.destroy({ transaction: t });

	return { messageCode: 'COMPANY_ENTITY_DELETED_SUCCESSFULLY',  message: 'companyEntity Deleted Successfully' };
	});
};

