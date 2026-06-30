import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { Customer } from '../../models/customer';
import { CompanyEntity } from '../../models/company-entity';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { CustomerPrimaryKeys, CreateCustomerInput, UpdateCustomerInput, QueryCustomerInput } from './types';

export const fetchCustomerList = async (params: QueryCustomerInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await Customer.findAndCountAll({
		attributes: [
// customerName, contactEmail, contactPhone, address, entityId, createdAt, updatedAt
			'customerName',
			'contactEmail',
			'contactPhone',
			'address',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "Customer".entity_id LIMIT 1)'), 'customersLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "Customer"."customer_name", 'primaryKeys', json_build_object('customerId', "Customer"."customer_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectCustomer = async () => {

	const results = await Customer.findAll({
		attributes: [
			['customer_id', 'value'],
			['customer_name', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addCustomer = async (payload: CreateCustomerInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const customer = await Customer.create(payload, { transaction: t });

	return customer.get({ plain: true });
	});
};

export const editCustomer = async (params: CustomerPrimaryKeys): Promise<Customer> => {
	// Initialize filters and include relationships
	const where: WhereOptions<Customer> & Record<symbol, unknown> = {};

	const customer = await Customer.findOne({
		attributes: [
// customerName, contactEmail, contactPhone, address, entityId
			'customerName',
			'contactEmail',
			'contactPhone',
			'address',
			'entityId',
		],
		where: {
			customerId : params.customerId,
			...where,
		},
		
	});

	if (!customer) {
		throw notFound('Customer', 'INVALID_CUSTOMER_ID');
	}

	return customer.get({ plain: true }) as Customer;
};

export const updateCustomer = async (params: CustomerPrimaryKeys, payload: UpdateCustomerInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<Customer> & Record<symbol, unknown> = {};
	const customer = await Customer.findOne({
		where: {
			customerId : params.customerId,
			...where,
		},
		transaction: t,
	});

	if (!customer) {
		throw notFound('Customer', 'INVALID_CUSTOMER_ID');
	}

	await customer.update(payload, { transaction: t });

	return {
		message: 'Customer updated successfully',
		data: customer.get({ plain: true }),
	};
	});
};

export const getCustomer = async (params: CustomerPrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const customer = await Customer.findOne({
		attributes: [
// customerName, contactEmail, contactPhone, address, entityId, createdAt, updatedAt
			'customerName',
			'contactEmail',
			'contactPhone',
			'address',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "Customer".entity_id LIMIT 1)'), 'customersLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "Customer"."customer_name", 'primaryKeys', json_build_object('customerId', "Customer"."customer_id"::text))`), '_meta'],
		],
		where: {
			customerId : params.customerId,
		},
		include: [...include],
		
	});

	if (!customer) {
		throw notFound('Customer', 'INVALID_CUSTOMER_ID');
	}

	return {
		data: customer.get({ plain: true }),
	};
};

export const deleteCustomer = async (params: CustomerPrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<Customer> & Record<symbol, unknown> = {};
	const customer = await Customer.findOne({
		where: {
			customerId : params.customerId,
			...where,
		},
		transaction: t,
	});

	if (!customer) {
		throw notFound('Customer', 'INVALID_CUSTOMER_ID');
	}

	await customer.destroy({ transaction: t });

	return { messageCode: 'CUSTOMER_DELETED_SUCCESSFULLY',  message: 'customer Deleted Successfully' };
	});
};

