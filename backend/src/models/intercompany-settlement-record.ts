// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { IntercompanyTransaction } from "./intercompany-transaction";
import { User } from "./user";

export class IntercompanySettlementRecord extends Model< InferAttributes<IntercompanySettlementRecord>, InferCreationAttributes<IntercompanySettlementRecord>> {

declare settlementRecordId: CreationOptional<string>;
declare transactionId: ForeignKey<IntercompanyTransaction['transactionId']>;
declare settlementDate: Date;
declare settlementAmount: number;
declare currencyCode: string;
declare status: string;
declare recordedBy: ForeignKey<User['userId']>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeIntercompanySettlementRecord(sequelize: Sequelize) {
	IntercompanySettlementRecord.init({
			settlementRecordId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			transactionId: {
				type: DataTypes.UUID,
				allowNull: false
				},
			settlementDate: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
				},
			settlementAmount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0
				},
			currencyCode: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'USD'
				},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'pending'
				},
			recordedBy: {
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
			{ name: 'intercompany_settlement_records_status_idx', fields: ['status'], unique: false }, 
			{ name: 'intercompany_settlement_records_settlementdate_idx', fields: ['settlement_date'], unique: false }, 
			{ name: 'intercompany_settlement_records_transactionid_idx', fields: ['transaction_id'], unique: false }],
			tableName: 'intercompany_settlement_records',
			 sequelize
		})
}

export function establishRelationsIntercompanySettlementRecord() {
	  IntercompanySettlementRecord.belongsTo(IntercompanyTransaction, {
    foreignKey: 'transactionId',
    as: 'settlementRecords',
  });
  IntercompanySettlementRecord.belongsTo(User, {
    foreignKey: 'recordedBy',
    as: 'settlementsRecorded',
  });

	}