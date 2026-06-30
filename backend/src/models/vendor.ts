// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { CompanyEntity } from "./company-entity";

export class Vendor extends Model< InferAttributes<Vendor>, InferCreationAttributes<Vendor>> {

declare vendorId: CreationOptional<string>;
declare vendorName: string;
declare contactEmail: CreationOptional<string> | null;
declare contactPhone: CreationOptional<string> | null;
declare address: CreationOptional<string> | null;
declare entityId: ForeignKey<CompanyEntity['entityId']>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeVendor(sequelize: Sequelize) {
	Vendor.init({
			vendorId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			vendorName: {
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
			{ name: 'vendors_entityid_idx', fields: ['entity_id'], unique: false }, 
			{ name: 'u_vendors_vendorname_idx', fields: ['vendor_name'], unique: true }],
			tableName: 'vendors',
			 sequelize
		})
}

export function establishRelationsVendor() {
	  Vendor.belongsTo(CompanyEntity, {
    foreignKey: 'entityId',
    as: 'vendors',
  });

	}