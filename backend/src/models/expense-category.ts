// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { CompanyEntity } from "./company-entity";

export class ExpenseCategory extends Model< InferAttributes<ExpenseCategory>, InferCreationAttributes<ExpenseCategory>> {

declare categoryId: CreationOptional<string>;
declare categoryName: string;
declare description: CreationOptional<string> | null;
declare entityId: ForeignKey<CompanyEntity['entityId']>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeExpenseCategory(sequelize: Sequelize) {
	ExpenseCategory.init({
			categoryId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			categoryName: {
				type: DataTypes.STRING,
				allowNull: false
				},
			description: {
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
			{ name: 'expense_categories_entityid_idx', fields: ['entity_id'], unique: false }, 
			{ name: 'u_expense_categories_categoryname_idx', fields: ['category_name'], unique: true }],
			tableName: 'expense_categories',
			 sequelize
		})
}

export function establishRelationsExpenseCategory() {
	  ExpenseCategory.belongsTo(CompanyEntity, {
    foreignKey: 'entityId',
    as: 'expenseCategories',
  });

	}