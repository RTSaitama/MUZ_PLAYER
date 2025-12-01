 import express, { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client"

export default (prisma: PrismaClient) => {
  const router = express.Router();

  router.get('/playlists', async(req: Request, res: Response) => {
    try {
      const playlists = await prisma.playlist.findMany({
        include: { tracks: true }
      });
      res.json(playlists)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch playlists' })
    }
  });

  router.post('/playlists', async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const playlist = await prisma.playlist.create({
        data: { name }
      });
      res.status(201).json(playlist);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create playlist' })
    }
  })

  router.get('/playlists/:id', async (req: Request, res: Response) => {
    try {
      const playlistId = parseInt(req.params.id);
      const playlist = await prisma.playlist.findUnique({
        where: { id: playlistId },
        include: { tracks: true }
      });
      res.json(playlist);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch playlist' })
    }
  })

  router.delete('/playlists/:id', async (req: Request, res: Response) => {
    try {
      const playlistId = parseInt(req.params.id);
      await prisma.playlist.delete({
        where: { id: playlistId }
      });
      res.json({ message: `Плейліст ${playlistId} видалено` })
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete playlist' })
    }
  });

  return router;
}