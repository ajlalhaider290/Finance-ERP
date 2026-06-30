// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { ReimbursementRequest } from "./reimbursement-request";
import { User } from "./user";

export class ReimbursementStatusHistory extends Model< InferAttributes<ReimbursementStatusHistory>, InferCreationAttributes<ReimbursementStatusHistory>> {

declare statusHistoryId: CreationOptional<string>;
declare reimbursementRequestId: ForeignKey<ReimbursementRequest['reimbursementRequestId']>;
declare oldStatus: CreationOptional<string> | null;
declare newStatus: string;
declare changedBy: ForeignKey<User['userId']>;
declare changeDate: CreationOptional<Date>;
declare userComment: CreationOptional<string> | null;
}


export function initializeReimbursementStatusHistory(sequelize: Sequelize) {
	ReimbursementStatusHistory.init({
			statusHistoryId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			reimbursementRequestId: {
				type: DataTypes.UUID,
				allowNull: false
				},
			oldStatus: {
				type: DataTypes.STRING,
				allowNull: true
				},
			newStatus: {
				type: DataTypes.STRING,
				allowNull: false
				},
			changedBy: {
				type: DataTypes.UUID,
				allowNull: false
				},
			changeDate: {
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
			{ name: 'reimbursement_status_history_newstatus_idx', fields: ['new_status'], unique: false }, 
			{ name: 'reimbursement_status_history_reimbursementrequestid_idx', fields: ['reimbursement_request_id'], unique: false }],
			tableName: 'reimbursement_status_history',
			 sequelize
		})
}

export function establishRelationsReimbursementStatusHistory() {
	  ReimbursementStatusHistory.belongsTo(ReimbursementRequest, {
    foreignKey: 'reimbursementRequestId',
    as: 'statusHistory',
  });
  ReimbursementStatusHistory.belongsTo(User, {
    foreignKey: 'changedBy',
    as: 'statusChangesMade',
  });

	}