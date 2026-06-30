// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { User } from "./user";
import { ExpenseCategory } from "./expense-category";
import { CompanyEntity } from "./company-entity";

export class ReimbursementRequest extends Model< InferAttributes<ReimbursementRequest>, InferCreationAttributes<ReimbursementRequest>> {

declare reimbursementRequestId: CreationOptional<string>;
declare employeeId: ForeignKey<User['userId']>;
declare businessPurpose: string;
declare expenseDate: Date;
declare categoryId: ForeignKey<ExpenseCategory['categoryId']>;
declare costCenter: CreationOptional<string> | null;
declare department: CreationOptional<string> | null;
declare currencyCode: string;
declare amount: number;
declare taxAmount: number;
declare totalAmount: string;
declare status: string;
declare currentApproverId: ForeignKey<User['userId']> | null;
declare paidDate: CreationOptional<Date> | null;
declare entityId: ForeignKey<CompanyEntity['entityId']>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeReimbursementRequest(sequelize: Sequelize) {
	ReimbursementRequest.init({
			reimbursementRequestId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			employeeId: {
				type: DataTypes.UUID,
				allowNull: false
				},
			businessPurpose: {
				type: DataTypes.STRING,
				allowNull: false
				},
			expenseDate: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
				},
			categoryId: {
				type: DataTypes.UUID,
				allowNull: false
				},
			costCenter: {
				type: DataTypes.STRING,
				allowNull: true
				},
			department: {
				type: DataTypes.STRING,
				allowNull: true
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
			taxAmount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0
				},
			totalAmount: {
				type: DataTypes.CHAR,
				allowNull: false,
				defaultValue: '0.00'
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
			paidDate: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: DataTypes.NOW
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
			{ name: 'reimbursement_requests_entityid_idx', fields: ['entity_id'], unique: false }, 
			{ name: 'reimbursement_requests_currentapproverid_idx', fields: ['current_approver_id'], unique: false }, 
			{ name: 'reimbursement_requests_status_idx', fields: ['status'], unique: false }, 
			{ name: 'reimbursement_requests_department_idx', fields: ['department'], unique: false }, 
			{ name: 'reimbursement_requests_costcenter_idx', fields: ['cost_center'], unique: false }, 
			{ name: 'reimbursement_requests_categoryid_idx', fields: ['category_id'], unique: false }, 
			{ name: 'reimbursement_requests_expensedate_idx', fields: ['expense_date'], unique: false }, 
			{ name: 'reimbursement_requests_employeeid_idx', fields: ['employee_id'], unique: false }],
			tableName: 'reimbursement_requests',
			 sequelize
		})
}

export function establishRelationsReimbursementRequest() {
  ReimbursementRequest.belongsTo(User, {
    foreignKey: 'employeeId',
    as: 'employee',
  });
  ReimbursementRequest.belongsTo(ExpenseCategory, {
    foreignKey: 'categoryId',
    as: 'category',
  });
  ReimbursementRequest.belongsTo(User, {
    foreignKey: 'currentApproverId',
    as: 'approvalsAssigned',
  });
  ReimbursementRequest.belongsTo(CompanyEntity, {
    foreignKey: 'entityId',
    as: 'entity',
  });

	}
