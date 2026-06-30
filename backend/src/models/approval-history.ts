// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { ApprovalTask } from "./approval-task";
import { User } from "./user";

export class ApprovalHistory extends Model< InferAttributes<ApprovalHistory>, InferCreationAttributes<ApprovalHistory>> {

declare historyId: CreationOptional<string>;
declare taskId: ForeignKey<ApprovalTask['taskId']>;
declare documentType: string;
declare documentId: string;
declare approverId: ForeignKey<User['userId']>;
declare actionValue: string;
declare actionDate: CreationOptional<Date>;
declare userComment: CreationOptional<string> | null;
}


export function initializeApprovalHistory(sequelize: Sequelize) {
	ApprovalHistory.init({
			historyId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			taskId: {
				type: DataTypes.UUID,
				allowNull: false
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
			approverId: {
				type: DataTypes.UUID,
				allowNull: false
				},
			actionValue: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'approved'
				},
			actionDate: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
				},
			userComment: {
				type: DataTypes.TEXT,
				allowNull: true
				},
		},
		{
			underscored: true,
			indexes: [
			{ name: 'approval_history_actionvalue_idx', fields: ['action_value'], unique: false }, 
			{ name: 'approval_history_approverid_idx', fields: ['approver_id'], unique: false }, 
			{ name: 'approval_history_documentid_idx', fields: ['document_id'], unique: false }, 
			{ name: 'approval_history_taskid_idx', fields: ['task_id'], unique: false }],
			tableName: 'approval_history',
			 sequelize
		})
}

export function establishRelationsApprovalHistory() {
	  ApprovalHistory.belongsTo(ApprovalTask, {
    foreignKey: 'taskId',
    as: 'approvalHistory',
  });
  ApprovalHistory.belongsTo(User, {
    foreignKey: 'approverId',
    as: 'approvalsMade',
  });

	}