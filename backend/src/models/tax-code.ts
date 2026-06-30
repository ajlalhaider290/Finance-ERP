// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { CompanyEntity } from "./company-entity";

export class TaxCode extends Model< InferAttributes<TaxCode>, InferCreationAttributes<TaxCode>> {

declare taxCodeId: CreationOptional<string>;
declare taxCodeName: string;
declare rate: number;
declare description: CreationOptional<string> | null;
declare entityId: ForeignKey<CompanyEntity['entityId']>;
declare isActive: boolean;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeTaxCode(sequelize: Sequelize) {
	TaxCode.init({
			taxCodeId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			taxCodeName: {
				type: DataTypes.STRING,
				allowNull: false
				},
			rate: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0
				},
			description: {
				type: DataTypes.TEXT,
				allowNull: true
				},
			entityId: {
				type: DataTypes.UUID,
				allowNull: false
				},
			isActive: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true
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
			{ name: 'tax_codes_entityid_idx', fields: ['entity_id'], unique: false }, 
			{ name: 'u_tax_codes_taxcodename_idx', fields: ['tax_code_name'], unique: true }],
			tableName: 'tax_codes',
			 sequelize
		})
}

export function establishRelationsTaxCode() {
	  TaxCode.belongsTo(CompanyEntity, {
    foreignKey: 'entityId',
    as: 'taxCodes',
  });

	}