// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";

export class CompanyEntity extends Model< InferAttributes<CompanyEntity>, InferCreationAttributes<CompanyEntity>> {

declare entityId: CreationOptional<string>;
declare entityName: string;
declare currencyCode: string;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeCompanyEntity(sequelize: Sequelize) {
	CompanyEntity.init({
			entityId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			entityName: {
				type: DataTypes.STRING,
				allowNull: false
				},
			currencyCode: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'USD'
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
			{ name: 'u_company_entities_entityname_idx', fields: ['entity_name'], unique: true }],
			tableName: 'company_entities',
			 sequelize
		})
}