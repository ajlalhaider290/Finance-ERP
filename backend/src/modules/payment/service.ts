import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { Payment } from '../../models/payment';
import { User } from '../../models/user';
import { CompanyEntity } from '../../models/company-entity';
import { convertStringFieldsToNumbers } from '../../util/dataTransform';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { PaymentPrimaryKeys, CreatePaymentInput, UpdatePaymentInput, QueryPaymentInput } from './types';

export const fetchPaymentList = async (params: QueryPaymentInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await Payment.findAndCountAll({
		attributes: [
// paymentDate, amount, currencyCode, paymentMethod, status, paidById, entityId, createdAt, updatedAt
			'paymentDate',
			'amount',
			'currencyCode',
			'paymentMethod',
			'status',
			'paidBy',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "Payment".paid_by LIMIT 1)'), 'paymentsMadeLabel'],
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "Payment".entity_id LIMIT 1)'), 'paymentsLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "Payment"."currency_code", 'primaryKeys', json_build_object('paymentId', "Payment"."payment_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectPayment = async () => {

	const results = await Payment.findAll({
		attributes: [
			['payment_id', 'value'],
			['currency_code', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addPayment = async (payload: CreatePaymentInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const paymentDefaultPayload = {
			paymentDate: payload.paymentDate ?? new Date(),
			amount: payload.amount ?? 0,
			currencyCode: payload.currencyCode ?? "USD",
			paymentMethod: payload.paymentMethod ?? "bank_transfer",
			status: payload.status ?? "pending"
	};
	const payment = await Payment.create({...payload, ...paymentDefaultPayload}, { transaction: t });

	return payment.get({ plain: true });
	});
};

export const editPayment = async (params: PaymentPrimaryKeys): Promise<Payment> => {
	// Initialize filters and include relationships
	const where: WhereOptions<Payment> & Record<symbol, unknown> = {};

	const payment = await Payment.findOne({
		attributes: [
// paymentDate, amount, currencyCode, paymentMethod, status, paidById, entityId
			'paymentDate',
			'amount',
			'currencyCode',
			'paymentMethod',
			'status',
			'paidBy',
			'entityId',
		],
		where: {
			paymentId : params.paymentId,
			...where,
		},
		
	});

	if (!payment) {
		throw notFound('Payment', 'INVALID_PAYMENT_ID');
	}

	const paymentData = payment.get({ plain: true });
	return convertStringFieldsToNumbers(paymentData, ['amount']) as Payment;
};

export const updatePayment = async (params: PaymentPrimaryKeys, payload: UpdatePaymentInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<Payment> & Record<symbol, unknown> = {};
	const payment = await Payment.findOne({
		where: {
			paymentId : params.paymentId,
			...where,
		},
		transaction: t,
	});

	if (!payment) {
		throw notFound('Payment', 'INVALID_PAYMENT_ID');
	}

	await payment.update(payload, { transaction: t });

	return {
		message: 'Payment updated successfully',
		data: payment.get({ plain: true }),
	};
	});
};

export const getPayment = async (params: PaymentPrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const payment = await Payment.findOne({
		attributes: [
// paymentDate, amount, currencyCode, paymentMethod, status, paidById, entityId, createdAt, updatedAt
			'paymentDate',
			'amount',
			'currencyCode',
			'paymentMethod',
			'status',
			'paidBy',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "Payment".paid_by LIMIT 1)'), 'paymentsMadeLabel'],
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "Payment".entity_id LIMIT 1)'), 'paymentsLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "Payment"."currency_code", 'primaryKeys', json_build_object('paymentId', "Payment"."payment_id"::text))`), '_meta'],
		],
		where: {
			paymentId : params.paymentId,
		},
		include: [...include],
		
	});

	if (!payment) {
		throw notFound('Payment', 'INVALID_PAYMENT_ID');
	}

	return {
		data: payment.get({ plain: true }),
	};
};

export const deletePayment = async (params: PaymentPrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<Payment> & Record<symbol, unknown> = {};
	const payment = await Payment.findOne({
		where: {
			paymentId : params.paymentId,
			...where,
		},
		transaction: t,
	});

	if (!payment) {
		throw notFound('Payment', 'INVALID_PAYMENT_ID');
	}

	await payment.destroy({ transaction: t });

	return { messageCode: 'PAYMENT_DELETED_SUCCESSFULLY',  message: 'payment Deleted Successfully' };
	});
};

