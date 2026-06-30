// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { Payment } from "./payment";

export class PaymentAllocation extends Model< InferAttributes<PaymentAllocation>, InferCreationAttributes<PaymentAllocation>> {

declare allocationId: CreationOptional<string>;
declare paymentId: ForeignKey<Payment['paymentId']>;
declare allocatedToType: string;
declare allocatedToId: string;
declare allocatedAmount: number;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializePaymentAllocation(sequelize: Sequelize) {
	PaymentAllocation.init({
			allocationId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			paymentId: {
				type: DataTypes.UUID,
				allowNull: false
				},
			allocatedToType: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'invoice'
				},
			allocatedToId: {
				type: DataTypes.STRING,
				allowNull: false
				},
			allocatedAmount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0
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
			{ name: 'payment_allocations_allocatedtoid_idx', fields: ['allocated_to_id'], unique: false }, 
			{ name: 'payment_allocations_allocatedtotype_idx', fields: ['allocated_to_type'], unique: false }, 
			{ name: 'payment_allocations_paymentid_idx', fields: ['payment_id'], unique: false }],
			tableName: 'payment_allocations',
			 sequelize
		})
}

export function establishRelationsPaymentAllocation() {
	  PaymentAllocation.belongsTo(Payment, {
    foreignKey: 'paymentId',
    as: 'allocations',
  });

	}