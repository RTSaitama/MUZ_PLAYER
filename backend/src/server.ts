 import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import playlistsRouter from './routes/playlists.js'
import cors  from 'cors'
const PORT = 3005;

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || 'file:./dev.db'
})

const prisma = new PrismaClient({ adapter })

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', playlistsRouter(prisma));

app.listen(PORT, () => {
  console.log('server started at 3005 PORT')
})