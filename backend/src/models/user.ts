// from sequelize model creator 
import {Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute} from "sequelize";
import { CompanyEntity } from "./company-entity";

export class User extends Model< InferAttributes<User>, InferCreationAttributes<User>> {

declare userId: CreationOptional<string>;
declare email: string;
declare username: string;
declare password: string;
declare role: string;
declare department: CreationOptional<string> | null;
declare entityId: ForeignKey<CompanyEntity['entityId']> | null;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}


export function initializeUser(sequelize: Sequelize) {
	User.init({
			userId: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
				},
			email: {
				type: DataTypes.STRING,
				allowNull: false
				},
			username: {
				type: DataTypes.STRING,
				allowNull: false
				},
			password: {
				type: DataTypes.STRING,
				allowNull: false
				},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'employee'
				},
			department: {
				type: DataTypes.STRING,
				allowNull: true
				},
			entityId: {
				type: DataTypes.UUID,
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
			{ name: 'users_entityid_idx', fields: ['entity_id'], unique: false }, 
			{ name: 'users_department_idx', fields: ['department'], unique: false }, 
			{ name: 'u_users_username_idx', fields: ['username'], unique: true }, 
			{ name: 'u_users_email_idx', fields: ['email'], unique: true }],
			tableName: 'users',
			 sequelize
		})
}

export function establishRelationsUser() {
	  User.belongsTo(CompanyEntity, {
    foreignKey: 'entityId',
    as: 'users',
  });

	}