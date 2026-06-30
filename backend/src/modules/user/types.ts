export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface UserPrimaryKeys {
	userId: string;
}
export interface CreateUserInput {
	email: string;
	username: string;
	password: string;
	role: string;
	department?: string | null;
	entityId?: string | null;
}

export type UpdateUserInput = Omit<CreateUserInput, 'password'> & {
	password?: string | null;
};

export interface QueryUserInput {
	page? : number;
	pageSize? : number;

}
