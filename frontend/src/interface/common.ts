export interface ItemMeta<T = Record<string, unknown>> {
	primaryKeys: T;
	label: string;
}

export interface CommonSelect {
	value : string | number;
	label : string;
	}

export interface QueryPager {
	page?: number,
	pageSize?: number
	}

// Internal pager state that guarantees non-undefined values
export interface PagerState {
	page: number,
	pageSize: number
	}	
export interface Pager {
	page: number,
	pageSize: number,
	total: number,
	}
	// TODO: unify with SelectedObj in selectedObjSlice.ts
	export interface SelectedObj {
		showForm: boolean;
		showEdit: boolean;
		showView: boolean;
		showDelete: boolean;
		keys: Record<string, unknown>;
		primaryKeys: Record<string, unknown>;
		label: string;
		isOpen: boolean;
		mode?: string;
		data?: unknown;
	}	

	export type RelationshipType = "M2M" | "O2M" | "M2O" | "" | undefined;
	export interface ChildObj {
		open: boolean;
		filterKeys: Record<string, unknown>;
		label: string;
	}				
export interface ISessionUser {
		userId: string;
		email:	string;
		username?: string;
		role?: string;
		department?: string | null;
		entityId?: string | null;
		status:	boolean;	
		scope: string[];
	}		
	
	export interface MenuItem {
		key: string;
		label: string;
		scope: string[];
		children?: MenuItem[];
		icon?: React.ComponentType<Record<string, unknown>>;
	}

	export interface IFile {
		fileList: { originFileObj: File }[];
	}

	export interface MutationResponse<T> {
		message: string,
		isError: true,
		data: T
	}
	
	export interface ILanguage {
		code: string,
		dir: 'rtl' | 'ltr'
	}

	export interface CustomRoutes {
		key: string;
		path: string;
		component: React.LazyExoticComponent<React.FC<Record<string, unknown>>>;
	}

	export type NotificationType = 'success' | 'info' | 'warning' | 'error';
