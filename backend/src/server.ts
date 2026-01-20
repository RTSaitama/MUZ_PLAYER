 import 'dotenv/config';
import express from 'express';
import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
 import cookieParser from 'cookie-parser';
import cors from 'cors';
import playlistsRouter from './routes/playlists';
import authRouter from './routes/auth';

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter });

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://rtsaitama.github.io'
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter(prisma));
app.use('/api', playlistsRouter(prisma));

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});