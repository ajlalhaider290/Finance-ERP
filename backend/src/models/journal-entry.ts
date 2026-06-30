// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { CompanyEntity } from "./company-entity";
import { User } from "./user";

export class JournalEntry extends Model< InferAttributes<JournalEntry>, InferCreationAttributes<JournalEntry>> {

declare journalEntryId: CreationOptional<string>;
declare entryDate: Date;
declare description: string;
declare sourceDocumentType: CreationOptional<string> | null;
declare sourceDocumentId: CreationOptional<string> | null;
declare entityId: ForeignKey<CompanyEntity['entityId']>;
declare postedBy: ForeignKey<User['userId']> | null;
declare postedAt: CreationOptional<Date> | null;
declare status: string;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeJournalEntry(sequelize: Sequelize) {
	JournalEntry.init({
			journalEntryId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			entryDate: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
				},
			description: {
				type: DataTypes.STRING,
				allowNull: false
				},
			sourceDocumentType: {
				type: DataTypes.STRING,
				allowNull: true
				},
			sourceDocumentId: {
				type: DataTypes.STRING,
				allowNull: true
				},
			entityId: {
				type: DataTypes.UUID,
				allowNull: false
				},
			postedBy: {
				type: DataTypes.UUID,
				allowNull: true
				},
			postedAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: DataTypes.NOW
				},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'draft'
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
			{ name: 'journal_entries_status_idx', fields: ['status'], unique: false }, 
			{ name: 'journal_entries_entityid_idx', fields: ['entity_id'], unique: false }, 
			{ name: 'journal_entries_sourcedocumentid_idx', fields: ['source_document_id'], unique: false }, 
			{ name: 'journal_entries_sourcedocumenttype_idx', fields: ['source_document_type'], unique: false }, 
			{ name: 'journal_entries_entrydate_idx', fields: ['entry_date'], unique: false }],
			tableName: 'journal_entries',
			 sequelize
		})
}

export function establishRelationsJournalEntry() {
	  JournalEntry.belongsTo(CompanyEntity, {
    foreignKey: 'entityId',
    as: 'journalEntries',
  });
  JournalEntry.belongsTo(User, {
    foreignKey: 'postedBy',
    as: 'journalEntriesPosted',
  });

	}