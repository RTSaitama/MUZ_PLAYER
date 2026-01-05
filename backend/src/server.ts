 import express from 'express';
import { PrismaClient } from './generated/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import playlistsRouter from './routes/playlists';
import authRouter from './routes/auth';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || 'file:./dev.db'
});

const prisma = new PrismaClient({ adapter });

const app = express();

app.use(cors({
origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
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