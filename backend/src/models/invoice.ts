// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { Vendor } from "./vendor";
import { Customer } from "./customer";
import { User } from "./user";
import { InvoiceDocument } from "./invoice-document";
import { CompanyEntity } from "./company-entity";

export class Invoice extends Model< InferAttributes<Invoice>, InferCreationAttributes<Invoice>> {

declare invoiceId: CreationOptional<string>;
declare vendorId: ForeignKey<Vendor['vendorId']> | null;
declare customerId: ForeignKey<Customer['customerId']> | null;
declare invoiceNumber: string;
declare invoiceDate: Date;
declare dueDate: Date;
declare currencyCode: string;
declare subtotal: number;
declare taxAmount: number;
declare totalAmount: number;
declare paidAmount: number;
declare balanceDue: string;
declare paymentStatus: string;
declare status: string;
declare currentApproverId: ForeignKey<User['userId']> | null;
declare invoiceDocumentId: ForeignKey<InvoiceDocument['documentId']> | null;
declare entityId: ForeignKey<CompanyEntity['entityId']>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeInvoice(sequelize: Sequelize) {
	Invoice.init({
			invoiceId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			vendorId: {
				type: DataTypes.UUID,
				allowNull: true
				},
			customerId: {
				type: DataTypes.UUID,
				allowNull: true
				},
			invoiceNumber: {
				type: DataTypes.STRING,
				allowNull: false
				},
			invoiceDate: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
				},
			dueDate: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
				},
			currencyCode: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'USD'
				},
			subtotal: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0
				},
			taxAmount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0
				},
			totalAmount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0
				},
			paidAmount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0
				},
			balanceDue: {
				type: DataTypes.CHAR,
				allowNull: false,
				defaultValue: '0.00'
				},
			paymentStatus: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'unpaid'
				},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'draft'
				},
			currentApproverId: {
				type: DataTypes.UUID,
				allowNull: true
				},
			invoiceDocumentId: {
				type: DataTypes.UUID,
				allowNull: true
				},
			entityId: {
				type: DataTypes.UUID,
				allowNull: false
				},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
				},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
				},
		},
		{
			underscored: true,
			indexes: [
			{ name: 'invoices_entityid_idx', fields: ['entity_id'], unique: false }, 
			{ name: 'invoices_invoicedocumentid_idx', fields: ['invoice_document_id'], unique: false }, 
			{ name: 'invoices_currentapproverid_idx', fields: ['current_approver_id'], unique: false }, 
			{ name: 'invoices_status_idx', fields: ['status'], unique: false }, 
			{ name: 'invoices_paymentstatus_idx', fields: ['payment_status'], unique: false }, 
			{ name: 'invoices_duedate_idx', fields: ['due_date'], unique: false }, 
			{ name: 'invoices_invoicedate_idx', fields: ['invoice_date'], unique: false }, 
			{ name: 'u_invoices_invoicenumber_idx', fields: ['invoice_number'], unique: true }, 
			{ name: 'invoices_customerid_idx', fields: ['customer_id'], unique: false }, 
			{ name: 'invoices_vendorid_idx', fields: ['vendor_id'], unique: false }],
			tableName: 'invoices',
			 sequelize
		})
}

export function establishRelationsInvoice() {
	  Invoice.belongsTo(Vendor, {
    foreignKey: 'vendorId',
    as: 'invoicesFromVendor',
  });
  Invoice.belongsTo(Customer, {
    foreignKey: 'customerId',
    as: 'invoicesToCustomer',
  });
  Invoice.belongsTo(User, {
    foreignKey: 'currentApproverId',
    as: 'invoiceApprovalsAssigned',
  });
  Invoice.belongsTo(InvoiceDocument, {
    foreignKey: 'invoiceDocumentId',
    as: 'invoiceRecords',
  });
  Invoice.belongsTo(CompanyEntity, {
    foreignKey: 'entityId',
    as: 'invoices',
  });

	}