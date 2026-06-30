// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { CompanyEntity } from "./company-entity";

export class Customer extends Model< InferAttributes<Customer>, InferCreationAttributes<Customer>> {

declare customerId: CreationOptional<string>;
declare customerName: string;
declare contactEmail: CreationOptional<string> | null;
declare contactPhone: CreationOptional<string> | null;
declare address: CreationOptional<string> | null;
declare entityId: ForeignKey<CompanyEntity['entityId']>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeCustomer(sequelize: Sequelize) {
	Customer.init({
			customerId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			customerName: {
				type: DataTypes.STRING,
				allowNull: false
				},
			contactEmail: {
				type: DataTypes.STRING,
				allowNull: true
				},
			contactPhone: {
				type: DataTypes.STRING,
				allowNull: true
				},
			address: {
				type: DataTypes.TEXT,
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
			{ name: 'customers_entityid_idx', fields: ['entity_id'], unique: false }, 
			{ name: 'u_customers_customername_idx', fields: ['customer_name'], unique: true }],
			tableName: 'customers',
			 sequelize
		})
}

export function establishRelationsCustomer() {
	  Customer.belongsTo(CompanyEntity, {
    foreignKey: 'entityId',
    as: 'customers',
  });

	}