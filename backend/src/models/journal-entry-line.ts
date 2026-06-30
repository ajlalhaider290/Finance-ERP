// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { JournalEntry } from "./journal-entry";

export class JournalEntryLine extends Model< InferAttributes<JournalEntryLine>, InferCreationAttributes<JournalEntryLine>> {

declare lineId: CreationOptional<string>;
declare journalEntryId: ForeignKey<JournalEntry['journalEntryId']>;
declare debitAmount: number;
declare creditAmount: number;
declare description: CreationOptional<string> | null;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeJournalEntryLine(sequelize: Sequelize) {
	JournalEntryLine.init({
			lineId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			journalEntryId: {
				type: DataTypes.UUID,
				allowNull: false
				},
			debitAmount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0
				},
			creditAmount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0
				},
			description: {
				type: DataTypes.STRING,
				allowNull: true
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
			{ name: 'journal_entry_lines_journalentryid_idx', fields: ['journal_entry_id'], unique: false }],
			tableName: 'journal_entry_lines',
			 sequelize
		})
}

export function establishRelationsJournalEntryLine() {
	  JournalEntryLine.belongsTo(JournalEntry, {
    foreignKey: 'journalEntryId',
    as: 'entryLines',
  });

	}