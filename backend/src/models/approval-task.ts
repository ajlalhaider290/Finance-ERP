// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { User } from "./user";

export class ApprovalTask extends Model< InferAttributes<ApprovalTask>, InferCreationAttributes<ApprovalTask>> {

declare taskId: CreationOptional<string>;
declare documentType: string;
declare documentId: string;
declare assignedToUserId: ForeignKey<User['userId']> | null;
declare assignedToRole: CreationOptional<string> | null;
declare status: string;
declare userComment: CreationOptional<string> | null;
declare actionedBy: ForeignKey<User['userId']> | null;
declare actionedAt: CreationOptional<Date> | null;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeApprovalTask(sequelize: Sequelize) {
	ApprovalTask.init({
			taskId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			documentType: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'reimbursement'
				},
			documentId: {
				type: DataTypes.STRING,
				allowNull: false
				},
			assignedToUserId: {
				type: DataTypes.UUID,
				allowNull: true
				},
			assignedToRole: {
				type: DataTypes.STRING,
				allowNull: true
				},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'pending'
				},
			userComment: {
				type: DataTypes.TEXT,
				allowNull: true
				},
			actionedBy: {
				type: DataTypes.UUID,
				allowNull: true
				},
			actionedAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: DataTypes.NOW
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
			{ name: 'approval_tasks_status_idx', fields: ['status'], unique: false }, 
			{ name: 'approval_tasks_assignedtorole_idx', fields: ['assigned_to_role'], unique: false }, 
			{ name: 'approval_tasks_assignedtouserid_idx', fields: ['assigned_to_user_id'], unique: false }, 
			{ name: 'approval_tasks_documentid_idx', fields: ['document_id'], unique: false }],
			tableName: 'approval_tasks',
			 sequelize
		})
}

export function establishRelationsApprovalTask() {
	  ApprovalTask.belongsTo(User, {
    foreignKey: 'assignedToUserId',
    as: 'assignedApprovalTasks',
  });
  ApprovalTask.belongsTo(User, {
    foreignKey: 'actionedBy',
    as: 'actionedApprovalTasks',
  });

	}