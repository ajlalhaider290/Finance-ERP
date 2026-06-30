// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { User } from "./user";
import { CompanyEntity } from "./company-entity";

export class Payment extends Model< InferAttributes<Payment>, InferCreationAttributes<Payment>> {

declare paymentId: CreationOptional<string>;
declare paymentDate: Date;
declare amount: number;
declare currencyCode: string;
declare paymentMethod: string;
declare status: string;
declare paidBy: ForeignKey<User['userId']> | null;
declare entityId: ForeignKey<CompanyEntity['entityId']>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializePayment(sequelize: Sequelize) {
	Payment.init({
			paymentId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			paymentDate: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
				},
			amount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0
				},
			currencyCode: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'USD'
				},
			paymentMethod: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'bank_transfer'
				},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'pending'
				},
			paidBy: {
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
			{ name: 'payments_entityid_idx', fields: ['entity_id'], unique: false }, 
			{ name: 'payments_status_idx', fields: ['status'], unique: false }, 
			{ name: 'payments_paymentdate_idx', fields: ['payment_date'], unique: false }],
			tableName: 'payments',
			 sequelize
		})
}

export function establishRelationsPayment() {
	  Payment.belongsTo(User, {
    foreignKey: 'paidBy',
    as: 'paymentsMade',
  });
  Payment.belongsTo(CompanyEntity, {
    foreignKey: 'entityId',
    as: 'payments',
  });

	}