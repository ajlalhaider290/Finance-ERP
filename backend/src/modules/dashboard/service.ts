import { Op, Sequelize, WhereOptions } from 'sequelize';
import { DashboardFilters } from './types';
import { ReimbursementRequest } from '../../models/reimbursement-request';
import { Invoice } from '../../models/invoice';
import { Payment } from '../../models/payment';
import {
	AuthenticatedUserContext,
	buildReimbursementAccessWhere,
	isAccountant,
	isAccountsManager,
	isApprover,
	isSuperAdmin,
} from '../reimbursement-request/access';

const getOp = (op?: string) => {
	const map: Record<string, any> = { eq: Op.eq, gt: Op.gt, gte: Op.gte, lt: Op.lt, lte: Op.lte, ne: Op.ne };
	return map[op || 'eq'] || Op.eq;
};

const noInvoiceAccessWhere: WhereOptions<Invoice> = {
	invoiceId: '00000000-0000-0000-0000-000000000000',
};

const noPaymentAccessWhere: WhereOptions<Payment> = {
	paymentId: '00000000-0000-0000-0000-000000000000',
};

const buildInvoiceAccessWhere = (user: AuthenticatedUserContext): WhereOptions<Invoice> => {
	if (isSuperAdmin(user)) {
		return {};
	}

	if (isAccountsManager(user) || isAccountant(user)) {
		return user.entityId ? { entityId: user.entityId } : {};
	}

	if (isApprover(user)) {
		return { currentApproverId: user.userId };
	}

	return noInvoiceAccessWhere;
};

const buildPaymentAccessWhere = (user: AuthenticatedUserContext): WhereOptions<Payment> => {
	if (isSuperAdmin(user)) {
		return {};
	}

	if (isAccountsManager(user) || isAccountant(user)) {
		return user.entityId ? { entityId: user.entityId } : {};
	}

	return noPaymentAccessWhere;
};

export const getTotalReimbursementRequests = async (filters: DashboardFilters, user: AuthenticatedUserContext): Promise<any> => {
	const count = await ReimbursementRequest.count({
		where: buildReimbursementAccessWhere(user),
	});
	return { count };
};

export const getTotalInvoices = async (filters: DashboardFilters, user: AuthenticatedUserContext): Promise<any> => {
	const count = await Invoice.count({
		where: buildInvoiceAccessWhere(user),
	});
	return { count };
};

export const getTotalInvoiceAmount = async (filters: DashboardFilters, user: AuthenticatedUserContext): Promise<any> => {
	const result:any = await Invoice.findOne({
		attributes: [
			[Sequelize.fn('SUM', Sequelize.col('total_amount')), 'total']
		],
		where: buildInvoiceAccessWhere(user),
	});
	return { total: result?.dataValues?.total || 0 };
};

export const getTotalPaymentsMade = async (filters: DashboardFilters, user: AuthenticatedUserContext): Promise<any> => {
	const result:any = await Payment.findOne({
		attributes: [
			[Sequelize.fn('SUM', Sequelize.col('amount')), 'total']
		],
		where: buildPaymentAccessWhere(user),
	});
	return { total: result?.dataValues?.total || 0 };
};

export const getReimbursementRequestsByStatus = async (filters: DashboardFilters, user: AuthenticatedUserContext): Promise<any> => {
	const results:any = await ReimbursementRequest.findAll({
		attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('status')), 'value']],
		where: buildReimbursementAccessWhere(user),
		group: ['status'],
		limit: 10,
		raw: true
	});
	return { data: results };
};

export const getInvoicesTrendByDate = async (filters: DashboardFilters, user: AuthenticatedUserContext): Promise<any> => {
	const results:any = await Invoice.findAll({
		attributes: [[Sequelize.fn('TO_CHAR', Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('invoice_date')), 'MM-YYYY'), 'invoice_date'], [Sequelize.fn('SUM', Sequelize.col('total_amount')), 'value']],
		where: buildInvoiceAccessWhere(user),
		group: [Sequelize.fn('TO_CHAR', Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('invoice_date')), 'MM-YYYY')],
		limit: 10,
		raw: true
	});
	return { data: results };
};

export const getPaymentsByMethod = async (filters: DashboardFilters, user: AuthenticatedUserContext): Promise<any> => {
	const results:any = await Payment.findAll({
		attributes: ['payment_method', [Sequelize.fn('SUM', Sequelize.col('amount')), 'value']],
		where: buildPaymentAccessWhere(user),
		group: ['payment_method'],
		limit: 10,
		raw: true
	});
	return { data: results };
};
