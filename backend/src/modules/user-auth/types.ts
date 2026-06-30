// from auth interface creator 
export interface AuthUserRegisterInput {
	email: string;
	username: string;
	password: string;
	role: string;
	department?: string | null;
	entityId?: string | null;

}

export interface AuthUserProfileUpdateInput {
	email: string;
	username: string;
	role: string;
	department?: string | null;
	entityId?: string | null;

}

export type UserScope = 'user' | 'user:superAdmin | user:accountsManager | user:accountant | user:approver | user:employee';
export interface AuthUser {
	userId: string;
	email: string;
	username: string;
	role: string;
	department?: string | null;
	entityId?: string | null;
	createdAt: Date;
	updatedAt: Date;
	scope: UserScope[];

}

