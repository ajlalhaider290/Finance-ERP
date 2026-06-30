import { Sequelize } from 'sequelize';
import { User } from '../../models/user';
import { CompanyEntity } from '../../models/company-entity';
import { Vendor } from '../../models/vendor';
import { IntercompanySettlementRecord } from '../../models/intercompany-settlement-record';
import { Customer } from '../../models/customer';
import { JournalEntryLine } from '../../models/journal-entry-line';
import { TaxCode } from '../../models/tax-code';
import { InvoiceLineItem } from '../../models/invoice-line-item';
import { IntercompanyTransaction } from '../../models/intercompany-transaction';
import { Invoice } from '../../models/invoice';
import { PaymentAllocation } from '../../models/payment-allocation';
import { JournalEntry } from '../../models/journal-entry';
import { InvoiceDocument } from '../../models/invoice-document';
import { ExpenseCategory } from '../../models/expense-category';
import { ApprovalTask } from '../../models/approval-task';
import { ReimbursementRequest } from '../../models/reimbursement-request';
import { Payment } from '../../models/payment';
import { ApprovalHistory } from '../../models/approval-history';
import { ReimbursementDocument } from '../../models/reimbursement-document';
import { ReimbursementStatusHistory } from '../../models/reimbursement-status-history';
import { AuthenticatedUserContext, buildReimbursementAccessWhere } from '../reimbursement-request/access';

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
export const selectCompanyEntity = async () => {

	const results = await CompanyEntity.findAll({
		attributes: [
			['entity_id', 'value'],
			['entity_name', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
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
export const selectIntercompanySettlementRecord = async () => {

	const results = await IntercompanySettlementRecord.findAll({
		attributes: [
			['settlement_record_id', 'value'],
			['currency_code', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
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
export const selectJournalEntryLine = async () => {

	const results = await JournalEntryLine.findAll({
		attributes: [
			['line_id', 'value'],
			['description', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
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
export const selectInvoiceLineItem = async () => {

	const results = await InvoiceLineItem.findAll({
		attributes: [
			['line_item_id', 'value'],
			['description', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};
export const selectIntercompanyTransaction = async () => {

	const results = await IntercompanyTransaction.findAll({
		attributes: [
			['transaction_id', 'value'],
			['currency_code', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};
export const selectInvoice = async () => {

	const results = await Invoice.findAll({
		attributes: [
			['invoice_id', 'value'],
			['invoice_number', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
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
export const selectJournalEntry = async () => {

	const results = await JournalEntry.findAll({
		attributes: [
			['journal_entry_id', 'value'],
			['description', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};
export const selectInvoiceDocument = async () => {

	const results = await InvoiceDocument.findAll({
		attributes: [
			['document_id', 'value'],
			['file_url', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};
export const selectExpenseCategory = async () => {

	const results = await ExpenseCategory.findAll({
		attributes: [
			['category_id', 'value'],
			['category_name', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};
export const selectApprovalTask = async () => {

	const results = await ApprovalTask.findAll({
		attributes: [
			['task_id', 'value'],
			['document_id', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};
export const selectReimbursementRequest = async (user: AuthenticatedUserContext) => {

	const results = await ReimbursementRequest.findAll({
		attributes: [
			['reimbursement_request_id', 'value'],
			['business_purpose', 'label'],
		],
		where: buildReimbursementAccessWhere(user),
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
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
export const selectApprovalHistory = async () => {

	const results = await ApprovalHistory.findAll({
		attributes: [
			['history_id', 'value'],
			['document_id', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};
export const selectReimbursementDocument = async (user: AuthenticatedUserContext) => {

	const results = await ReimbursementDocument.findAll({
		attributes: [
			['document_id', 'value'],
			['file_url', 'label'],
		],
		include: [{
			model: ReimbursementRequest,
			as: 'reimbursementDocuments',
			attributes: [],
			required: true,
			where: buildReimbursementAccessWhere(user),
		}],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};
export const selectReimbursementStatusHistory = async (user: AuthenticatedUserContext) => {

	const results = await ReimbursementStatusHistory.findAll({
		attributes: [
			['status_history_id', 'value'],
			['old_status', 'label'],
		],
		include: [{
			model: ReimbursementRequest,
			as: 'statusHistory',
			attributes: [],
			required: true,
			where: buildReimbursementAccessWhere(user),
		}],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};
