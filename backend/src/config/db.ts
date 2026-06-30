import { Sequelize, Options } from 'sequelize';
import { env } from './env';
import logger from '../logger';
// imports models
import {establishRelationsUser, initializeUser } from './../models/user';
import { initializeCompanyEntity } from './../models/company-entity';
import {establishRelationsVendor, initializeVendor } from './../models/vendor';
import {establishRelationsIntercompanySettlementRecord, initializeIntercompanySettlementRecord } from './../models/intercompany-settlement-record';
import {establishRelationsCustomer, initializeCustomer } from './../models/customer';
import {establishRelationsJournalEntryLine, initializeJournalEntryLine } from './../models/journal-entry-line';
import {establishRelationsTaxCode, initializeTaxCode } from './../models/tax-code';
import {establishRelationsInvoiceLineItem, initializeInvoiceLineItem } from './../models/invoice-line-item';
import {establishRelationsIntercompanyTransaction, initializeIntercompanyTransaction } from './../models/intercompany-transaction';
import {establishRelationsInvoice, initializeInvoice } from './../models/invoice';
import {establishRelationsPaymentAllocation, initializePaymentAllocation } from './../models/payment-allocation';
import {establishRelationsJournalEntry, initializeJournalEntry } from './../models/journal-entry';
import {establishRelationsInvoiceDocument, initializeInvoiceDocument } from './../models/invoice-document';
import {establishRelationsExpenseCategory, initializeExpenseCategory } from './../models/expense-category';
import {establishRelationsApprovalTask, initializeApprovalTask } from './../models/approval-task';
import {establishRelationsReimbursementRequest, initializeReimbursementRequest } from './../models/reimbursement-request';
import {establishRelationsPayment, initializePayment } from './../models/payment';
import {establishRelationsApprovalHistory, initializeApprovalHistory } from './../models/approval-history';
import {establishRelationsReimbursementDocument, initializeReimbursementDocument } from './../models/reimbursement-document';
import {establishRelationsReimbursementStatusHistory, initializeReimbursementStatusHistory } from './../models/reimbursement-status-history';
import { initializePasswordResetToken, establishRelationsPasswordResetToken } from './../models/password-reset-token';
// imports hooks




// Database configuration
const CONFIG: Options = {
  host: env.DB_HOST,
  dialect: 'postgres',
  port: Number(process.env.DB_PORT),
  //## for PostgreSQL timezone setting
  timezone: env.DB_TIMEZONE,
  logging: false,
  pool: {
    max: 20,
    min: 5,
    acquire: 60000,
    idle: 30000,
  },
  define: {
    timestamps: false, // Disable timestamps
  },
};

export const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASS as string, CONFIG);


// initialize models
initializeUser(sequelize);
initializeCompanyEntity(sequelize);
initializeVendor(sequelize);
initializeIntercompanySettlementRecord(sequelize);
initializeCustomer(sequelize);
initializeJournalEntryLine(sequelize);
initializeTaxCode(sequelize);
initializeInvoiceLineItem(sequelize);
initializeIntercompanyTransaction(sequelize);
initializeInvoice(sequelize);
initializePaymentAllocation(sequelize);
initializeJournalEntry(sequelize);
initializeInvoiceDocument(sequelize);
initializeExpenseCategory(sequelize);
initializeApprovalTask(sequelize);
initializeReimbursementRequest(sequelize);
initializePayment(sequelize);
initializeApprovalHistory(sequelize);
initializeReimbursementDocument(sequelize);
initializeReimbursementStatusHistory(sequelize);
initializePasswordResetToken(sequelize);

// establish relations
establishRelationsUser();
establishRelationsVendor();
establishRelationsIntercompanySettlementRecord();
establishRelationsCustomer();
establishRelationsJournalEntryLine();
establishRelationsTaxCode();
establishRelationsInvoiceLineItem();
establishRelationsIntercompanyTransaction();
establishRelationsInvoice();
establishRelationsPaymentAllocation();
establishRelationsJournalEntry();
establishRelationsInvoiceDocument();
establishRelationsExpenseCategory();
establishRelationsApprovalTask();
establishRelationsReimbursementRequest();
establishRelationsPayment();
establishRelationsApprovalHistory();
establishRelationsReimbursementDocument();
establishRelationsReimbursementStatusHistory();
establishRelationsPasswordResetToken();

 

// Dev-only opt-in sync. Production schema changes flow through migrations (pnpm migrate).
if (env.ENVIRONMENT === 'development' && env.SYNC_DB === 'true') {
  sequelize.sync({ force: false, alter: false }).then(() => {
    logger.info('db synced');
 }).catch((err) => {
    logger.error('Error syncing db: ' + err);
  });
}

