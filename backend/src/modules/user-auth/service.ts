import { Op, Sequelize, fn } from 'sequelize';
import { sequelize } from '../../config/db';
import { AuthUserRegisterInput, AuthUserProfileUpdateInput, AuthUser} from './types';
import { User } from '../../models/user';
import { generateRandomPassword, hashPassword, verifyPassword, generateAccessToken, generateRefreshToken, checkUsernameValidity, getScope, getAreaScope,  generatePasswordResetToken, hashResetToken, getPasswordResetExpiry } from '../../helper/auth';
import { sendEmail, generatePasswordResetEmail } from '../../helper/email';
import { PasswordResetToken } from '../../models/password-reset-token';
import { AppError, notFound, badRequest, conflict, unauthorized } from '../../errors';


export const loginUser = async (username: string, password: string) => {
	const user = await User.findOne({
		where: { email: username },
		attributes: [
// userId, email, username, password, role, department, entityId, createdAt, updatedAt
			'userId',
			'email',
			'username',
			'password',
			'role',
			'department',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "User".entity_id LIMIT 1)'), 'usersLabel'],
			'createdAt',
			'updatedAt',
		],
	});

	if (!user) {
		throw new AppError({ statusCode: 406, errorCode: 'INVALID_CREDENTIALS', message: 'User not found or username/password incorrect' });
	}

	let { valid } = await verifyPassword(password, user.password!);

	if (!valid) {
		throw new AppError({ statusCode: 406, errorCode: 'INVALID_CREDENTIALS', message: 'User not found or username/password incorrect' });
	}

	const scope = await getScope(user, 'user');
	const areaScope = await getAreaScope(scope);
	const plain = user.get({ plain: true }) as any;
	const sessionData: Partial<AuthUser> = {
		userId: plain.userId,
		email: plain.email,
		username: plain.username,
		role: plain.role,
		department: plain.department,
		entityId: plain.entityId,
		createdAt: plain.createdAt,
		updatedAt: plain.updatedAt,
	};
	let data = { ...sessionData, scope, areaScope };

	let token = generateAccessToken(data);

	let refreshToken = generateRefreshToken(plain.userId);

	return {
		message: 'user logged in successfully.',
		user: data,
		token: token,
		refreshToken: refreshToken,
	};
};

export const registerUser = async (payload: AuthUserRegisterInput) => {
	return sequelize.transaction(async (t) => {
	// check if user already exists
	const existingUser = await User.findOne({
		where: { email: payload.email },
		transaction: t,
	 });

	if (existingUser) {
		throw new AppError({ statusCode: 406, errorCode: 'ALREADY_EXISTS', message: 'User already exists' });
	}

	// prepare password
	let passwordHash = '';
	
	if (payload.password) {
		let hashResult = await hashPassword(payload.password);
		passwordHash = hashResult.passwordHash;
	}
	
	// Create a clean object for creation
	const createPayload: any = {
		...payload,
		password: passwordHash,
	};

	const user = await User.create(createPayload, { fields: ['email', 'username', 'password', 'role', 'department', 'entityId', 'userId', 'createdAt', 'updatedAt'], transaction: t });

	const scope = await getScope(user, 'user');
	const areaScope = await getAreaScope(scope);
	const userReloaded = await User.findOne({
		where: { userId: user.userId },
		attributes: [
// userId, email, username, password, role, department, entityId, createdAt, updatedAt
			'userId',
			'email',
			'username',
			'password',
			'role',
			'department',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "User".entity_id LIMIT 1)'), 'usersLabel'],
			'createdAt',
			'updatedAt',
		],
		transaction: t,
	});
	const plain = (userReloaded ?? user).get({ plain: true }) as any;
	const sessionData: Partial<AuthUser> = {
		userId: plain.userId,
		email: plain.email,
		username: plain.username,
		role: plain.role,
		department: plain.department,
		entityId: plain.entityId,
		createdAt: plain.createdAt,
		updatedAt: plain.updatedAt,
	};
	let data = { ...sessionData, scope, areaScope };

	let token = generateAccessToken(data);

	let refreshToken = generateRefreshToken(plain.userId);

	return {
		message: 'user has been created successfully.',
		user: data,
		token: token,
		refreshToken: refreshToken,
	};
	});
};

export const refreshUserToken = async (userId: string) => {
	const user = await User.findOne({
		where: {
			userId: userId,
		},
		attributes: [
// userId, email, username, password, role, department, entityId, createdAt, updatedAt
			'userId',
			'email',
			'username',
			'password',
			'role',
			'department',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "User".entity_id LIMIT 1)'), 'usersLabel'],
			'createdAt',
			'updatedAt',
		],
	});

	if (!user) {
		throw new AppError({ statusCode: 406, errorCode: 'INVALID_USER_ID', message: 'Invalid user ID' });
	}

	const scope = await getScope(user, 'user');
	const areaScope = await getAreaScope(scope);
	const plain = user.get({ plain: true }) as any;
	const sessionData: Partial<AuthUser> = {
		userId: plain.userId,
		email: plain.email,
		username: plain.username,
		role: plain.role,
		department: plain.department,
		entityId: plain.entityId,
		createdAt: plain.createdAt,
		updatedAt: plain.updatedAt,
	};
	let data = { ...sessionData, scope, areaScope };

	let token = generateAccessToken(data);

	let refreshToken = generateRefreshToken(plain.userId);

	return {
		message: 'user token refreshed successfully',
		user: data,
		token: token,
		refreshToken: refreshToken,
	};
};

export const fetchUserProfile = async (userId: string) => {
	const user = await User.findOne({
		attributes: [
// userId, email, username, role, department, entityId, createdAt, updatedAt
			'userId',
			'email',
			'username',
			'role',
			'department',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "User".entity_id LIMIT 1)'), 'usersLabel'],
			'createdAt',
			'updatedAt',
		],
		where: {
			userId: userId,
		},
	});

	if (!user) {
		throw new AppError({ statusCode: 406, errorCode: 'INVALID_USER_ID', message: 'Invalid user ID' });
	}

	return {
		data: user.get({ plain: true }),
	};
};

export const updateUserProfile = async (userId: string, payload: AuthUserProfileUpdateInput) => {
	return sequelize.transaction(async (t) => {
	const user = await User.findOne({
		where: {
			userId: userId,
		},
		transaction: t,
	});

	if (!user) {
		throw new AppError({ statusCode: 406, errorCode: 'INVALID_USER_ID', message: 'Invalid user ID' });
	}

	// Create update payload
	const updatePayload: AuthUserProfileUpdateInput = { ...payload } as AuthUserProfileUpdateInput;
	
	await user.update(updatePayload, { transaction: t });

	return {
		message: 'User updated successfully',
	};
	});
};

export const forgotUserPassword = async (email: string) => {
	try {
		// Find user by email
		const user = await User.findOne({
			where: { email: email },
		});

		if (!user) {
			throw notFound('User', 'INVALID_USER_EMAIL');
		}

		// Generate reset token: email the plaintext; store only the hash.
		const { token } = generatePasswordResetToken();
		const { hashedToken } = await hashResetToken(token);
		const { expiresAt } = getPasswordResetExpiry();

		await PasswordResetToken.create({
			userId: user.userId,
			token: hashedToken,
			expiresAt,
		});

		// Plaintext token goes in the reset link — verify handler hashes it before lookup.
		const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/userResetPassword?token=${token}`;

		// Send email
		const emailTemplate = generatePasswordResetEmail(resetLink, user.email);
		await sendEmail(email, emailTemplate);

		return {
			message: 'Password reset email sent successfully',
		};
	} catch (error) {
		if (error instanceof AppError) throw error;
		console.error('Forgot password error:', error);
		throw new AppError({ statusCode: 500, errorCode: 'EMAIL_SEND_FAILED', message: 'Failed to send password reset email' });
	}
};

export const resetUserPassword = async (token: string, newPassword: string) => {
	try {
		// Audit fix 3.5: run the password update + reset-token destroy in a managed transaction
		// so a mid-flow failure leaves neither an orphan token nor a half-updated credential.
		return await sequelize.transaction(async (t) => {
			// Hash the supplied plaintext token and look up by the hash
			const { hashedToken } = await hashResetToken(token);
			const resetToken = await PasswordResetToken.findOne({
				where: {
					token: hashedToken,
					expiresAt: { [Op.gt]: new Date() },
				},
				transaction: t,
			});

			if (!resetToken) {
				throw badRequest('Invalid or expired reset token', 'INVALID_RESET_TOKEN');
			}

			// Find user
			const user = await User.findByPk(resetToken.userId, { transaction: t });

			if (!user) {
				throw notFound('User');
			}

			// Hash new password
			const { passwordHash } = await hashPassword(newPassword);

			// Update password
			await user.update({
				password: passwordHash,
			}, { transaction: t });

			// Delete used reset token
			await resetToken.destroy({ transaction: t });

			return {
				message: 'Password reset successfully',
			};
		});
	} catch (error) {
		if (error instanceof AppError) throw error;
		console.error('Reset password error:', error);
		throw new AppError({ statusCode: 500, errorCode: 'RESET_PASSWORD_FAILED', message: 'Failed to reset password' });
	}
};

export const changeUserPassword = async (userId: string, currentPassword: string, newPassword: string) => {
	try {
		// Find user
		const user = await User.findByPk(userId);

		if (!user) {
			throw notFound('User');
		}

		// Verify current password
		const { valid } = await verifyPassword(currentPassword, user.password);

		if (!valid) {
			throw badRequest('Current password is incorrect', 'INVALID_PASSWORD');
		}

		// Hash new password
		const { passwordHash } = await hashPassword(newPassword);

		// Update password
		await user.update({
			password: passwordHash,
		});

		return {
			message: 'Password changed successfully',
		};
	} catch (error) {
		if (error instanceof AppError) throw error;
		console.error('Change password error:', error);
		throw new AppError({ statusCode: 500, errorCode: 'CHANGE_PASSWORD_FAILED', message: 'Failed to change password' });
	}
};

export const logoutUser = async (userId: string) => {
	const user = await User.findOne({
		where: {
			userId: userId,
		},
	});

	if (!user) {
		throw new AppError({ statusCode: 406, errorCode: 'INVALID_USER_ID', message: 'Invalid user ID' });
	}

	return {
		message: 'user logged out successfully',
	};
};

