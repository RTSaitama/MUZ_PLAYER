
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret-key-change-in-env';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key-change-in-env';

export interface TokenPayload {
  userId: number;
  email: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  });

  return token;
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: '7d'
  });

  return token;
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};