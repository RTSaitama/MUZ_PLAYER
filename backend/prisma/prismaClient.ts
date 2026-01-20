import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg'; 
import { PrismaClient } from './generated/client';

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new pg.Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false 
  }
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });