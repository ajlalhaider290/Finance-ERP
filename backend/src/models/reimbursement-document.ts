// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { ReimbursementRequest } from "./reimbursement-request";
import { User } from "./user";

export class ReimbursementDocument extends Model< InferAttributes<ReimbursementDocument>, InferCreationAttributes<ReimbursementDocument>> {

declare documentId: CreationOptional<string>;
declare reimbursementRequestId: ForeignKey<ReimbursementRequest['reimbursementRequestId']>;
declare documentType: string;
declare fileUrl: string;
declare fileName: string;
declare uploadedBy: ForeignKey<User['userId']>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeReimbursementDocument(sequelize: Sequelize) {
	ReimbursementDocument.init({
			documentId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			reimbursementRequestId: {
				type: DataTypes.UUID,
				allowNull: false
				},
			documentType: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'receipt'
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
			indexes: [
			{ name: 'reimbursement_documents_reimbursementrequestid_idx', fields: ['reimbursement_request_id'], unique: false }],
			tableName: 'reimbursement_documents',
			 sequelize
		})
}

export function establishRelationsReimbursementDocument() {
	  ReimbursementDocument.belongsTo(ReimbursementRequest, {
    foreignKey: 'reimbursementRequestId',
    as: 'reimbursementDocuments',
  });
  ReimbursementDocument.belongsTo(User, {
    foreignKey: 'uploadedBy',
    as: 'documentsUploaded',
  });

	}