import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { Vendor } from '../../models/vendor';
import { CompanyEntity } from '../../models/company-entity';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { VendorPrimaryKeys, CreateVendorInput, UpdateVendorInput, QueryVendorInput } from './types';

export const fetchVendorList = async (params: QueryVendorInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await Vendor.findAndCountAll({
		attributes: [
// vendorName, contactEmail, contactPhone, address, entityId, createdAt, updatedAt
			'vendorName',
			'contactEmail',
			'contactPhone',
			'address',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "Vendor".entity_id LIMIT 1)'), 'vendorsLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "Vendor"."vendor_name", 'primaryKeys', json_build_object('vendorId', "Vendor"."vendor_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectVendor = async () => {

	const results = await Vendor.findAll({
		attributes: [
			['vendor_id', 'value'],
			['vendor_name', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addVendor = async (payload: CreateVendorInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const vendor = await Vendor.create(payload, { transaction: t });

	return vendor.get({ plain: true });
	});
};

export const editVendor = async (params: VendorPrimaryKeys): Promise<Vendor> => {
	// Initialize filters and include relationships
	const where: WhereOptions<Vendor> & Record<symbol, unknown> = {};

	const vendor = await Vendor.findOne({
		attributes: [
// vendorName, contactEmail, contactPhone, address, entityId
			'vendorName',
			'contactEmail',
			'contactPhone',
			'address',
			'entityId',
		],
		where: {
			vendorId : params.vendorId,
			...where,
		},
		
	});

	if (!vendor) {
		throw notFound('Vendor', 'INVALID_VENDOR_ID');
	}

	return vendor.get({ plain: true }) as Vendor;
};

export const updateVendor = async (params: VendorPrimaryKeys, payload: UpdateVendorInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<Vendor> & Record<symbol, unknown> = {};
	const vendor = await Vendor.findOne({
		where: {
			vendorId : params.vendorId,
			...where,
		},
		transaction: t,
	});

	if (!vendor) {
		throw notFound('Vendor', 'INVALID_VENDOR_ID');
	}

	await vendor.update(payload, { transaction: t });

	return {
		message: 'Vendor updated successfully',
		data: vendor.get({ plain: true }),
	};
	});
};

export const getVendor = async (params: VendorPrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const vendor = await Vendor.findOne({
		attributes: [
// vendorName, contactEmail, contactPhone, address, entityId, createdAt, updatedAt
			'vendorName',
			'contactEmail',
			'contactPhone',
			'address',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "Vendor".entity_id LIMIT 1)'), 'vendorsLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "Vendor"."vendor_name", 'primaryKeys', json_build_object('vendorId', "Vendor"."vendor_id"::text))`), '_meta'],
		],
		where: {
			vendorId : params.vendorId,
		},
		include: [...include],
		
	});

	if (!vendor) {
		throw notFound('Vendor', 'INVALID_VENDOR_ID');
	}

	return {
		data: vendor.get({ plain: true }),
	};
};

export const deleteVendor = async (params: VendorPrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<Vendor> & Record<symbol, unknown> = {};
	const vendor = await Vendor.findOne({
		where: {
			vendorId : params.vendorId,
			...where,
		},
		transaction: t,
	});

	if (!vendor) {
		throw notFound('Vendor', 'INVALID_VENDOR_ID');
	}

	await vendor.destroy({ transaction: t });

	return { messageCode: 'VENDOR_DELETED_SUCCESSFULLY',  message: 'vendor Deleted Successfully' };
	});
};

