import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { PaymentAllocation } from '../../models/payment-allocation';
import { Payment } from '../../models/payment';
import { convertStringFieldsToNumbers } from '../../util/dataTransform';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { PaymentAllocationPrimaryKeys, CreatePaymentAllocationInput, UpdatePaymentAllocationInput, QueryPaymentAllocationInput } from './types';

export const fetchPaymentAllocationList = async (params: QueryPaymentAllocationInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await PaymentAllocation.findAndCountAll({
		attributes: [
// paymentId, allocatedToType, allocatedToId, allocatedAmount, createdAt, updatedAt
			'paymentId',
			[Sequelize.literal('(SELECT currency_code FROM payments  WHERE payments.payment_id = "PaymentAllocation".payment_id LIMIT 1)'), 'allocationsLabel'],
			'allocatedToType',
			'allocatedToId',
			'allocatedAmount',
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "PaymentAllocation"."allocated_to_id", 'primaryKeys', json_build_object('allocationId', "PaymentAllocation"."allocation_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectPaymentAllocation = async () => {

	const results = await PaymentAllocation.findAll({
		attributes: [
			['allocation_id', 'value'],
			['allocated_to_id', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addPaymentAllocation = async (payload: CreatePaymentAllocationInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const paymentAllocationDefaultPayload = {
			allocatedToType: payload.allocatedToType ?? "invoice",
			allocatedAmount: payload.allocatedAmount ?? 0
	};
	const paymentAllocation = await PaymentAllocation.create({...payload, ...paymentAllocationDefaultPayload}, { transaction: t });

	return paymentAllocation.get({ plain: true });
	});
};

export const editPaymentAllocation = async (params: PaymentAllocationPrimaryKeys): Promise<PaymentAllocation> => {
	// Initialize filters and include relationships
	const where: WhereOptions<PaymentAllocation> & Record<symbol, unknown> = {};

	const paymentAllocation = await PaymentAllocation.findOne({
		attributes: [
// paymentId, allocatedToType, allocatedToId, allocatedAmount
			'paymentId',
			'allocatedToType',
			'allocatedToId',
			'allocatedAmount',
		],
		where: {
			allocationId : params.allocationId,
			...where,
		},
		
	});

	if (!paymentAllocation) {
		throw notFound('PaymentAllocation', 'INVALID_PAYMENT_ALLOCATION_ID');
	}

	const paymentAllocationData = paymentAllocation.get({ plain: true });
	return convertStringFieldsToNumbers(paymentAllocationData, ['allocatedAmount']) as PaymentAllocation;
};

export const updatePaymentAllocation = async (params: PaymentAllocationPrimaryKeys, payload: UpdatePaymentAllocationInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<PaymentAllocation> & Record<symbol, unknown> = {};
	const paymentAllocation = await PaymentAllocation.findOne({
		where: {
			allocationId : params.allocationId,
			...where,
		},
		transaction: t,
	});

	if (!paymentAllocation) {
		throw notFound('PaymentAllocation', 'INVALID_PAYMENT_ALLOCATION_ID');
	}

	await paymentAllocation.update(payload, { transaction: t });

	return {
		message: 'PaymentAllocation updated successfully',
		data: paymentAllocation.get({ plain: true }),
	};
	});
};

export const getPaymentAllocation = async (params: PaymentAllocationPrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const paymentAllocation = await PaymentAllocation.findOne({
		attributes: [
// paymentId, allocatedToType, allocatedToId, allocatedAmount, createdAt, updatedAt
			'paymentId',
			[Sequelize.literal('(SELECT currency_code FROM payments  WHERE payments.payment_id = "PaymentAllocation".payment_id LIMIT 1)'), 'allocationsLabel'],
			'allocatedToType',
			'allocatedToId',
			'allocatedAmount',
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "PaymentAllocation"."allocated_to_id", 'primaryKeys', json_build_object('allocationId', "PaymentAllocation"."allocation_id"::text))`), '_meta'],
		],
		where: {
			allocationId : params.allocationId,
		},
		include: [...include],
		
	});

	if (!paymentAllocation) {
		throw notFound('PaymentAllocation', 'INVALID_PAYMENT_ALLOCATION_ID');
	}

	return {
		data: paymentAllocation.get({ plain: true }),
	};
};

export const deletePaymentAllocation = async (params: PaymentAllocationPrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<PaymentAllocation> & Record<symbol, unknown> = {};
	const paymentAllocation = await PaymentAllocation.findOne({
		where: {
			allocationId : params.allocationId,
			...where,
		},
		transaction: t,
	});

	if (!paymentAllocation) {
		throw notFound('PaymentAllocation', 'INVALID_PAYMENT_ALLOCATION_ID');
	}

	await paymentAllocation.destroy({ transaction: t });

	return { messageCode: 'PAYMENT_ALLOCATION_DELETED_SUCCESSFULLY',  message: 'paymentAllocation Deleted Successfully' };
	});
};

