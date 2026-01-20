 import express, { Request, Response } from 'express';
 import type { PrismaClient } from '../../prisma/generated//client'; 
import bcryptjs from 'bcryptjs';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';

export default (prisma: PrismaClient) => {
  const router = express.Router();

  router.post('/register', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'both email and password are required' });
      }

      const normalizedEmail = email.toLowerCase();

      const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail }
      });

      if (existingUser) {
        return res.status(409).json({ error: 'user already registered' });
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email: normalizedEmail,
          password: hashedPassword
        }
      });

      const accessToken = generateAccessToken({
        userId: newUser.id,
        email: newUser.email
      });

      const refreshToken = generateRefreshToken({
        userId: newUser.id,
        email: newUser.email
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true, 
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return res.status(201).json({
        accessToken,
        user: {
          id: newUser.id,
          email: newUser.email
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      return res.status(500).json({ error: 'Failed to register' });
    }
  });

  router.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });
      console.log('Login Attempt:', { foundUser: !!user, email: email.toLowerCase() });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const accessToken = generateAccessToken({
        userId: user.id,
        email: user.email
      });

      const refreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return res.status(200).json({
        accessToken,
        user: {
          id: user.id,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Failed to login' });
    }
  });

  router.post('/refresh', async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token' });
      }

      const decoded = verifyRefreshToken(refreshToken);

      if (!decoded || !decoded.userId) {
        return res.status(401).json({ error: 'Invalid or expired refresh token' });
      }
 
      const user = await prisma.user.findUnique({
        where: { id: Number(decoded.userId) }
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      const newAccessToken = generateAccessToken({
        userId: user.id,
        email: user.email
      });

      return res.status(200).json({
        accessToken: newAccessToken
      });
    } catch (error) {
      console.error('Refresh error:', error);
      return res.status(500).json({ error: 'Failed to refresh token' });
    }
  });

  router.post('/logout', (req: Request, res: Response) => {
 
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  });

  return router;
};