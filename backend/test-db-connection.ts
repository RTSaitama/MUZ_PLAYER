 import 'dotenv/config';
import { PrismaClient } from './src/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter });
async function test() {
  try {
    await prisma.$connect();
    console.log('Connected to DB successfully');

    const users = await prisma.user.findMany();
    console.log('Users:', users);
  } catch (err) {
    console.error('Error connecting to DB:', err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
