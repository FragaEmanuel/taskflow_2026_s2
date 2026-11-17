import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { unauthorized } from '../lib/http';

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return secret;
}

export interface TokenPayload {
  userId: number;
  email: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '24h' });
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const header = req.header('authorization');
  if (!header || !header.startsWith('Bearer ')) {
    next(unauthorized());
    return;
  }
  try {
    const decoded = jwt.verify(header.slice(7), getJwtSecret()) as TokenPayload;
    req.user = { userId: decoded.userId, email: decoded.email };
    next();
  } catch {
    next(unauthorized('Invalid or expired token'));
  }
}
