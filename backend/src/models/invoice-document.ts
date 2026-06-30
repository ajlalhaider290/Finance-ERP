// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { User } from "./user";

export class InvoiceDocument extends Model< InferAttributes<InvoiceDocument>, InferCreationAttributes<InvoiceDocument>> {

declare documentId: CreationOptional<string>;
declare fileUrl: string;
declare fileName: string;
declare uploadedBy: ForeignKey<User['userId']>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeInvoiceDocument(sequelize: Sequelize) {
	InvoiceDocument.init({
			documentId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			fileUrl: {
				type: DataTypes.STRING,
				allowNull: false
				},
			fileName: {
				type: DataTypes.STRING,
				allowNull: false
				},
			uploadedBy: {
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
			tableName: 'invoice_documents',
			 sequelize
		})
}

export function establishRelationsInvoiceDocument() {
	  InvoiceDocument.belongsTo(User, {
    foreignKey: 'uploadedBy',
    as: 'invoiceDocumentsUploaded',
  });

	}