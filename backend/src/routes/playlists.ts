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
      console.error('ERROR:', error);
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
      console.error(error)
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
router.post('/playlists/:id/tracks', async (req: Request, res: Response) => {
  try {
    const playlistId = parseInt(req.params.id);
    const mediaItem = req.body;

    if (!mediaItem.preview && mediaItem.id) {
      const albumId = mediaItem.id;
      const response = await fetch(
        `https://corsproxy.io/?https://itunes.apple.com/lookup?id=${albumId}&entity=song&limit=200`
      );
      const data = await response.json();

      const results = data.results?.slice(1) || [];
      const albumImage = data.results?.[0]?.artworkUrl100 || '';

   const tracks = results
  .filter((entry: any) => entry.trackId && entry.kind === 'song')
  .map((entry: any) => {
    return {
      trackId: entry.trackId.toString(),
      title: entry.trackName || 'Unknown',
      artist: entry.artistName || '',
      image: albumImage,
      preview: entry.previewUrl || '',
      albumId: albumId,
      playlistId
    };
  });

      // Додай всі треки
      for (const track of tracks) {
        await prisma.track.create({ data: track });
      }

      res.status(201).json({ message: `Added ${tracks.length} tracks from album` });
    } else {
      // Це трек - додай як є
      const { id: trackId, title, artist, image, preview, albumId = '' } = mediaItem;

      const track = await prisma.track.create({
        data: {
          trackId,
          title,
          artist,
          image,
          preview,
          albumId,
          playlistId
        }
      });

      res.status(201).json(track);
    }
  } catch (error) {
    console.error('ADD TRACK ERROR:', error);
    res.status(500).json({ error: 'Failed to add track' });
  }
});
  return router;
}