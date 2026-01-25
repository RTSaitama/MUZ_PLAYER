 import express, { Request, Response } from 'express';
 import type { PrismaClient } from '../../prisma/generated/client'; 
import { authMiddleware } from '../middleware/authMiddlware';
 
interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export default (prisma: PrismaClient) => {
  const router = express.Router();

  router.get('/playlists', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
       const userId = Number(req.user?.userId);

      if (!userId) {
        return res.status(401).json({ error: 'User ID missing or invalid' });
      }

      const playlists = await prisma.playlist.findMany({
        where: { userId: userId },
        include: { tracks: true }
      });

      return res.json(playlists);
    } catch (error) {
      console.error('FETCH PLAYLISTS ERROR:', error);
      return res.status(500).json({ error: 'Failed to fetch playlists' });
    }
  });

  router.post('/playlists', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const { name } = req.body;
      const userId = Number(req.user?.userId);

      const playlist = await prisma.playlist.create({
        data: {
          name,
          userId: userId
        }
      });

      return res.status(201).json(playlist);
    } catch (error) {
      console.error('Create playlist error:', error);
      return res.status(500).json({ error: 'Failed to create playlist' });
    }
  });

  router.get('/playlists/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const playlistId = parseInt(req.params.id);
      const userId = Number(req.user?.userId);

      const playlist = await prisma.playlist.findUnique({
        where: { id: playlistId },
        include: { tracks: true }
      });

      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }

      if (Number(playlist.userId) !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      return res.json(playlist);
    } catch (error) {
      console.error('Get playlist error:', error);
      return res.status(500).json({ error: 'Failed to fetch playlist' });
    }
  });

  router.delete('/playlists/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const playlistId = parseInt(req.params.id);
      const userId = Number(req.user?.userId);

      const playlist = await prisma.playlist.findUnique({
        where: { id: playlistId }
      });

      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }

      if (Number(playlist.userId) !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      await prisma.playlist.delete({
        where: { id: playlistId }
      });

      return res.json({ message: `Плейліст ${playlistId} видалено` });
    } catch (error) {
      console.error('Delete playlist error:', error);
      return res.status(500).json({ error: 'Failed to delete playlist' });
    }
  });

  router.post('/playlists/:id/tracks', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const playlistId = parseInt(req.params.id);
      const userId = Number(req.user?.userId);
      const mediaItem = req.body;

      const playlist = await prisma.playlist.findUnique({
        where: { id: playlistId }
      });

      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }

      if (Number(playlist.userId) !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

 
      if (!mediaItem.preview && mediaItem.id) {
        const albumId = mediaItem.id.toString();
         const url = `https://itunes.apple.com/lookup?id=${albumId}&entity=song&limit=200`;
        const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        const results = data.results?.slice(1) || [];
        const albumImage = data.results?.[0]?.artworkUrl100 || '';

        const tracks = results
          .filter((entry: any) => entry.trackId && entry.kind === 'song')
          .map((entry: any) => ({
            trackId: entry.trackId.toString(),
            title: entry.trackName || 'Unknown',
            artist: entry.artistName || '',
            image: albumImage,
            preview: entry.previewUrl || '',
            albumId: albumId,
            playlistId
          }));

        for (const track of tracks) {
          const existing = await prisma.track.findFirst({
            where: { trackId: track.trackId, playlistId: playlistId }
          });
          if (!existing) await prisma.track.create({ data: track });
        }

        return res.status(201).json({ message: 'Album tracks added' });
      } else {
        const { id: trackId, title, artist, image, preview, albumId = '' } = mediaItem;
        
        const existing = await prisma.track.findFirst({
          where: { trackId: trackId.toString(), playlistId: playlistId }
        });

        if (existing) return res.status(400).json({ error: 'Track exists' });

        const track = await prisma.track.create({
          data: {
            trackId: trackId.toString(),
            title, artist, image, preview,
            albumId: albumId.toString(),
            playlistId
          }
        });

        return res.status(201).json(track);
      }
    } catch (error) {
      console.error('ADD TRACK ERROR:', error);
      return res.status(500).json({ error: 'Failed to add track' });
    }
  });

  router.delete('/playlists/:playlistId/tracks/:trackId', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const playlistId = Number(req.params.playlistId);
      const trackId = req.params.trackId.toString();
      const userId = Number(req.user?.userId);

      const playlist = await prisma.playlist.findUnique({
        where: { id: playlistId }
      });

      if (!playlist || Number(playlist.userId) !== userId) {
        return res.status(403).json({ error: 'Access denied or not found' });
      }

      await prisma.track.deleteMany({
        where: { trackId: trackId, playlistId: playlistId }
      });

      return res.status(200).json({ message: 'Track deleted' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal error' });
    }
  });
  router.get('/search/tracks-by-genre/:genreId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { genreId } = req.params;
    const url = `https://itunes.apple.com/search?term=${genreId}&media=music&entity=song&limit=20`;
    
    const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    if (!data.results) {
      return res.json([]);
    }

    const tracks = data.results
      .filter((entry: any) => entry.trackId && entry.kind === 'song')
      .map((entry: any) => ({
        id: entry.trackId.toString(),
        title: entry.trackName || 'Unknown',
        artist: entry.artistName || '',
        image: entry.artworkUrl100 || '',
        preview: entry.previewUrl || '',
        trackNumber: 0,
      }));

    return res.json(tracks);
  } catch (error) {
    console.error('Search tracks by genre error:', error);
    return res.status(500).json({ error: 'Failed to search tracks' });
  }
});

router.get('/search/podcasts-by-genre/:genreId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { genreId } = req.params;
    const url = `https://itunes.apple.com/search?term=${genreId}&media=podcast&limit=20`;
    
    const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    if (!data.results) {
      return res.json([]);
    }

    const podcasts = data.results.map((podcast: any) => ({
      id: podcast.trackId,
      name: podcast.artistName,
      feedUrl: podcast.feedUrl,
      artwork: podcast.artworkUrl600,
      genres: podcast.genres,
    }));

    return res.json(podcasts);
  } catch (error) {
    console.error('Search podcasts by genre error:', error);
    return res.status(500).json({ error: 'Failed to search podcasts' });
  }
});
  return router;
};