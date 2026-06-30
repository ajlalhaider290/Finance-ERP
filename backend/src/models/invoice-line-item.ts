// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { Invoice } from "./invoice";
import { TaxCode } from "./tax-code";

export class InvoiceLineItem extends Model< InferAttributes<InvoiceLineItem>, InferCreationAttributes<InvoiceLineItem>> {

declare lineItemId: CreationOptional<string>;
declare invoiceId: ForeignKey<Invoice['invoiceId']>;
declare description: string;
declare quantity: number;
declare unitPrice: number;
declare lineTotal: string;
declare taxCodeId: ForeignKey<TaxCode['taxCodeId']> | null;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeInvoiceLineItem(sequelize: Sequelize) {
	InvoiceLineItem.init({
			lineItemId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			invoiceId: {
				type: DataTypes.UUID,
				allowNull: false
				},
			description: {
				type: DataTypes.STRING,
				allowNull: false
				},
			quantity: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 1
				},
			unitPrice: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0
				},
			lineTotal: {
				type: DataTypes.CHAR,
				allowNull: false,
				defaultValue: '0.00'
				},
			taxCodeId: {
				type: DataTypes.UUID,
				allowNull: true
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
			{ name: 'invoice_line_items_taxcodeid_idx', fields: ['tax_code_id'], unique: false }, 
			{ name: 'invoice_line_items_invoiceid_idx', fields: ['invoice_id'], unique: false }],
			tableName: 'invoice_line_items',
			 sequelize
		})
}

export function establishRelationsInvoiceLineItem() {
	  InvoiceLineItem.belongsTo(Invoice, {
    foreignKey: 'invoiceId',
    as: 'lineItems',
  });
  InvoiceLineItem.belongsTo(TaxCode, {
    foreignKey: 'taxCodeId',
    as: 'invoiceLineItems',
  });

	}