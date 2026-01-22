import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  userId: number;
  email: string;
}

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};