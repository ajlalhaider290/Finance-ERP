import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import { User } from '../models/user';



// Express Auth Helpers

export const generateAccessToken = (data: object) => {
  const secret = process.env.JWT_SECRET;
  let expiresIn: string | number = process.env.JWT_EXPIRATION || '1d';
  if (secret === undefined) throw new Error('JWT_SECRET is not defined');
  if (!isNaN(Number(expiresIn))) expiresIn = Number(expiresIn);
    return jwt.sign(data, secret, { algorithm: 'HS256', expiresIn } as jwt.SignOptions);

};

export const getScope = async (user: User, object: string) => {
  let scope = [];
		scope.push('user');
		if(user.role === 'superAdmin'){
			scope.push('user:superAdmin');
		}
		if(user.role === 'accountsManager'){
			scope.push('user:accountsManager');
		}
		if(user.role === 'accountant'){
			scope.push('user:accountant');
		}
		if(user.role === 'approver'){
			scope.push('user:approver');
		}
		if(user.role === 'employee'){
			scope.push('user:employee');
		}

  return scope;
};

export const getAreaScope = async (userScope: string[]) => {
   const areaAccess : {[key: string]: string[]} = {
    // admin: ['user:admin'],
    // default: ['user:hr', 'user:manager', 'user:employee', 'user:admin'],
    // public: []
    default: ['user:superAdmin', 'user:accountsManager', 'user:accountant', 'user:approver', 'user:employee']
   };
   // get list of areas from areaAccess which as atleast one scope in scope
   const areas = Object.keys(areaAccess);
   const areasWithScope = areas.filter((area) => area === 'public' || areaAccess[area].some((scope) => userScope.includes(scope)));
   return areasWithScope;
}

  export const hasRequiredRoles = (userRoles: string[], requiredRoles?: string[]): boolean => {
  // If no roles required, allow access
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  // Check if user has at least one of the required roles
  return requiredRoles.some((role) => userRoles.includes(role));
};

export const requireRoles = (roles: string | string[]) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    const userRoles = user?.scope || [];
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!allowedRoles.some((role) => userRoles.includes(role))) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

export const validateAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'] as string | undefined;
  const token = authHeader && authHeader.split(/\s+/)[1];
  const secret = process.env.JWT_SECRET;
  if (!token) return res.status(401).json({ errorCode: 'NO_TOKEN', message: 'No token provided' });
  if (!secret) return res.status(500).json({ errorCode: 'NO_SECRET', message: 'JWT secret not configured' });
  jwt.verify(token, secret, { algorithms: ['HS256'] }, (err: any, decoded: any) => {
    if (err) return res.status(401).json({ errorCode: 'INVALID_TOKEN', message: 'Invalid token' });
    (req as any).user = decoded;
    next();
  });
};

export const generateRefreshToken = (userId: string) => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRATION || '7d'; // Default 7 days
  if (secret === undefined) throw new Error('REFRESH_TOKEN_SECRET is not defined');
  return jwt.sign({ userId }, secret, { algorithm: 'HS256', expiresIn } as jwt.SignOptions);
};

export const checkUsernameValidity = async (username: string, type: string) => {
  let userCount = 0;
  if (type === 'user') {
    userCount = await User.count({ where: { email: username } });
  }

  return { valid: userCount === 0 };
};

export const hashPassword = async (password: string) => {
  const passwordHash = await bcrypt.hash(password, env.PASSWORD_SALT_ROUNDS);
  return { passwordHash };
};

export const verifyPassword = async (password: string, hashed: string) => {
  const valid = await bcrypt.compare(password, hashed);
  return { valid };
};

export const generateRandomPassword = (minLength: number = 8) => {
  const getRandomChar = (characters: string) => characters[crypto.randomInt(0, characters.length)];
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  const chars = [getRandomChar(lowercaseLetters), getRandomChar(uppercaseLetters), getRandomChar(numbers), getRandomChar(specialChars)];
  const remainingLength = Math.max(0, minLength - chars.length);
  const allChars = lowercaseLetters + uppercaseLetters + numbers + specialChars;
  for (let i = 0; i < remainingLength; i++) {
    chars.push(getRandomChar(allChars));
  }
  // Fisher-Yates shuffle seeded from crypto.randomInt
  for (let i = chars.length - 1; i > 0; i--) {
    const j = crypto.randomInt(0, i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return { password: chars.join('') };
};

export const generatePasswordResetToken = (length: number = 48) => {
  const token = crypto.randomBytes(length).toString('hex');
  return { token };
};

export const hashResetToken = async (token: string) => {
  // Deterministic hash so the verify flow can look up by hashedToken.
  // Safe because the token is already 48 bytes of crypto.randomBytes entropy.
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  return { hashedToken };
};

export const getPasswordResetExpiry = (minutes: number = 15) => {
  const expiresAt = new Date(Date.now() + minutes * 60 * 1000);
  return { expiresAt };
};

export const clearPasswordResetState = (auth: any, tokenField: string, expiryField: string) => {
  auth[tokenField] = null;
  auth[expiryField] = null;
};
