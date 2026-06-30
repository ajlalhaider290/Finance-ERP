// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { CompanyEntity } from "./company-entity";
import { User } from "./user";

export class IntercompanyTransaction extends Model< InferAttributes<IntercompanyTransaction>, InferCreationAttributes<IntercompanyTransaction>> {

declare transactionId: CreationOptional<string>;
declare sourceEntityId: ForeignKey<CompanyEntity['entityId']>;
declare targetEntityId: ForeignKey<CompanyEntity['entityId']>;
declare transactionDate: Date;
declare transactionType: string;
declare currencyCode: string;
declare amount: number;
declare lineDetail: CreationOptional<Record<string, unknown>[]> | null;
declare taxAmount: number;
declare status: string;
declare currentApproverId: ForeignKey<User['userId']> | null;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeIntercompanyTransaction(sequelize: Sequelize) {
	IntercompanyTransaction.init({
			transactionId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			sourceEntityId: {
				type: DataTypes.UUID,
				allowNull: false
				},
			targetEntityId: {
				type: DataTypes.UUID,
				allowNull: false
				},
			transactionDate: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
				},
			transactionType: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'billing'
				},
			currencyCode: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'USD'
				},
			amount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0
				},
			lineDetail: {
				type: DataTypes.JSONB,
				allowNull: true,
				defaultValue: []
				},
			taxAmount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0
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
			{ name: 'intercompany_transactions_currentapproverid_idx', fields: ['current_approver_id'], unique: false }, 
			{ name: 'intercompany_transactions_status_idx', fields: ['status'], unique: false }, 
			{ name: 'intercompany_transactions_transactiontype_idx', fields: ['transaction_type'], unique: false }, 
			{ name: 'intercompany_transactions_transactiondate_idx', fields: ['transaction_date'], unique: false }, 
			{ name: 'intercompany_transactions_targetentityid_idx', fields: ['target_entity_id'], unique: false }, 
			{ name: 'intercompany_transactions_sourceentityid_idx', fields: ['source_entity_id'], unique: false }],
			tableName: 'intercompany_transactions',
			 sequelize
		})
}

export function establishRelationsIntercompanyTransaction() {
	  IntercompanyTransaction.belongsTo(CompanyEntity, {
    foreignKey: 'sourceEntityId',
    as: 'transactionsFromSource',
  });
  IntercompanyTransaction.belongsTo(CompanyEntity, {
    foreignKey: 'targetEntityId',
    as: 'transactionsToTarget',
  });
  IntercompanyTransaction.belongsTo(User, {
    foreignKey: 'currentApproverId',
    as: 'intercompanyApprovalsAssigned',
  });

	}