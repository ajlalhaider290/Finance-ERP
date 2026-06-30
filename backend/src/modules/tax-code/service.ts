import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { TaxCode } from '../../models/tax-code';
import { CompanyEntity } from '../../models/company-entity';
import { convertStringFieldsToNumbers } from '../../util/dataTransform';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { TaxCodePrimaryKeys, CreateTaxCodeInput, UpdateTaxCodeInput, QueryTaxCodeInput } from './types';

export const fetchTaxCodeList = async (params: QueryTaxCodeInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await TaxCode.findAndCountAll({
		attributes: [
// taxCodeName, rate, description, entityId, isActive, createdAt, updatedAt
			'taxCodeName',
			'rate',
			'description',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "TaxCode".entity_id LIMIT 1)'), 'taxCodesLabel'],
			'isActive',
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "TaxCode"."tax_code_name", 'primaryKeys', json_build_object('taxCodeId', "TaxCode"."tax_code_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectTaxCode = async () => {

	const results = await TaxCode.findAll({
		attributes: [
			['tax_code_id', 'value'],
			['tax_code_name', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addTaxCode = async (payload: CreateTaxCodeInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const taxCodeDefaultPayload = {
			rate: payload.rate ?? 0,
			isActive: payload.isActive ?? true
	};
	const taxCode = await TaxCode.create({...payload, ...taxCodeDefaultPayload}, { transaction: t });

	return taxCode.get({ plain: true });
	});
};

export const editTaxCode = async (params: TaxCodePrimaryKeys): Promise<TaxCode> => {
	// Initialize filters and include relationships
	const where: WhereOptions<TaxCode> & Record<symbol, unknown> = {};

	const taxCode = await TaxCode.findOne({
		attributes: [
// taxCodeName, rate, description, entityId, isActive
			'taxCodeName',
			'rate',
			'description',
			'entityId',
			'isActive',
		],
		where: {
			taxCodeId : params.taxCodeId,
			...where,
		},
		
	});

	if (!taxCode) {
		throw notFound('TaxCode', 'INVALID_TAX_CODE_ID');
	}

	const taxCodeData = taxCode.get({ plain: true });
	return convertStringFieldsToNumbers(taxCodeData, ['rate']) as TaxCode;
};

export const updateTaxCode = async (params: TaxCodePrimaryKeys, payload: UpdateTaxCodeInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<TaxCode> & Record<symbol, unknown> = {};
	const taxCode = await TaxCode.findOne({
		where: {
			taxCodeId : params.taxCodeId,
			...where,
		},
		transaction: t,
	});

	if (!taxCode) {
		throw notFound('TaxCode', 'INVALID_TAX_CODE_ID');
	}

	await taxCode.update(payload, { transaction: t });

	return {
		message: 'TaxCode updated successfully',
		data: taxCode.get({ plain: true }),
	};
	});
};

export const getTaxCode = async (params: TaxCodePrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const taxCode = await TaxCode.findOne({
		attributes: [
// taxCodeName, rate, description, entityId, isActive, createdAt, updatedAt
			'taxCodeName',
			'rate',
			'description',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "TaxCode".entity_id LIMIT 1)'), 'taxCodesLabel'],
			'isActive',
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "TaxCode"."tax_code_name", 'primaryKeys', json_build_object('taxCodeId', "TaxCode"."tax_code_id"::text))`), '_meta'],
		],
		where: {
			taxCodeId : params.taxCodeId,
		},
		include: [...include],
		
	});

	if (!taxCode) {
		throw notFound('TaxCode', 'INVALID_TAX_CODE_ID');
	}

	return {
		data: taxCode.get({ plain: true }),
	};
};

export const deleteTaxCode = async (params: TaxCodePrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<TaxCode> & Record<symbol, unknown> = {};
	const taxCode = await TaxCode.findOne({
		where: {
			taxCodeId : params.taxCodeId,
			...where,
		},
		transaction: t,
	});

	if (!taxCode) {
		throw notFound('TaxCode', 'INVALID_TAX_CODE_ID');
	}

	await taxCode.destroy({ transaction: t });

	return { messageCode: 'TAX_CODE_DELETED_SUCCESSFULLY',  message: 'taxCode Deleted Successfully' };
	});
};

