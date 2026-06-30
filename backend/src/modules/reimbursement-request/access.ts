import { Op, WhereOptions } from 'sequelize';
import { ReimbursementRequest } from '../../models/reimbursement-request';

export interface AuthenticatedUserContext {
	userId: string;
	role?: string;
	scope?: string[];
	entityId?: string | null;
	department?: string | null;
}

const hasScope = (user: AuthenticatedUserContext | undefined, scope: string) => Boolean(user?.scope?.includes(scope));

export const isSuperAdmin = (user: AuthenticatedUserContext | undefined) => hasScope(user, 'user:superAdmin');
export const isAccountsManager = (user: AuthenticatedUserContext | undefined) => hasScope(user, 'user:accountsManager');
export const isAccountant = (user: AuthenticatedUserContext | undefined) => hasScope(user, 'user:accountant');
export const isApprover = (user: AuthenticatedUserContext | undefined) => hasScope(user, 'user:approver');
export const isEmployee = (user: AuthenticatedUserContext | undefined) => hasScope(user, 'user:employee');

export const canManageReimbursements = (user: AuthenticatedUserContext | undefined) =>
	isSuperAdmin(user) || isAccountsManager(user) || isAccountant(user);

export const buildReimbursementAccessWhere = (user: AuthenticatedUserContext): WhereOptions<ReimbursementRequest> => {
	if (isSuperAdmin(user)) {
		return {};
	}

	if (isAccountsManager(user) || isAccountant(user)) {
		return user.entityId ? { entityId: user.entityId } : {};
	}

	if (isApprover(user)) {
		return {
			currentApproverId: user.userId,
		};
	}

	if (isEmployee(user)) {
		return {
			[Op.or]: [
				{ employeeId: user.userId },
				{ currentApproverId: user.userId },
			],
		};
	}

	return {
		reimbursementRequestId: '00000000-0000-0000-0000-000000000000',
	};
};

export const sanitizeEmployeeReimbursementPayload = <T extends Record<string, any>>(payload: T, user: AuthenticatedUserContext): T => {
	const allowedStatuses = ['draft', 'submitted', 'cancelled'];
	const status = allowedStatuses.includes(String(payload.status)) ? payload.status : 'submitted';

	return {
		...payload,
		employeeId: user.userId,
		entityId: user.entityId || payload.entityId,
		department: user.department || payload.department,
		status,
		currentApproverId: null,
		paidDate: null,
	} as T;
};
