 import express, { Request, Response } from 'express';
import { PrismaClient } from '../generated/client';
import { authMiddleware } from '../middleware/authMiddlware';

export default (prisma: PrismaClient) => {
  const router = express.Router();

   router.get('/playlists', authMiddleware, async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      const playlists = await prisma.playlist.findMany({
        where: { userId },
        include: { tracks: true }
      });

      return res.json(playlists);
    } catch (error) {
      console.error('ERROR:', error);
      return res.status(500).json({ error: 'Failed to fetch playlists' });
    }
  });

   router.post('/playlists', authMiddleware, async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const userId = req.user?.userId;

      if (!name) {
        return res.status(400).json({ error: 'Playlist name is required' });
      }

      const playlist = await prisma.playlist.create({
        data: {
          name,
          userId: userId!
        }
      });

      return res.status(201).json(playlist);
    } catch (error) {
      console.error('Create playlist error:', error);
      return res.status(500).json({ error: 'Failed to create playlist' });
    }
  });

   router.get('/playlists/:playlistId', authMiddleware, async (req: Request, res: Response) => {
    try {
      const playlistId = parseInt(req.params.playlistId);
      const userId = req.user?.userId;

      const playlist = await prisma.playlist.findUnique({
        where: { id: playlistId },
        include: { tracks: true }
      });

      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }

      if (playlist.userId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      return res.json(playlist);
    } catch (error) {
      console.error('Get playlist error:', error);
      return res.status(500).json({ error: 'Failed to fetch playlist' });
    }
  });

   router.delete('/playlists/:playlistId', authMiddleware, async (req: Request, res: Response) => {
    try {
      const playlistId = parseInt(req.params.playlistId);
      const userId = req.user?.userId;

      const playlist = await prisma.playlist.findUnique({
        where: { id: playlistId }
      });

      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }

      if (playlist.userId !== userId) {
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

   router.post('/playlists/:playlistId/tracks', authMiddleware, async (req: Request, res: Response) => {
    try {
      const playlistId = parseInt(req.params.playlistId);
      const userId = req.user?.userId;
      const mediaItem = req.body;

      const playlist = await prisma.playlist.findUnique({
        where: { id: playlistId }
      });

      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }

      if (playlist.userId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      if (!mediaItem.preview && mediaItem.id) {
        const albumId = mediaItem.id;

        try {
          const url = `https://itunes.apple.com/lookup?id=${albumId}&entity=song&limit=200`;
          const response = await fetch(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
          );

          if (!response.ok) {
            return res.status(400).json({
              error: `iTunes API returned status ${response.status}`
            });
          }

          const text = await response.text();

          if (!text) {
            return res.status(400).json({
              error: 'iTunes API returned empty response'
            });
          }

          const data = JSON.parse(text);

          if (!data.results || data.results.length === 0) {
            return res.status(400).json({
              error: 'No tracks found for this album'
            });
          }

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

          if (tracks.length === 0) {
            return res.status(400).json({
              error: 'No valid songs found in album'
            });
          }

          let addedCount = 0;

          for (const track of tracks) {
            const existing = await prisma.track.findFirst({
              where: {
                trackId: track.trackId,
                playlistId: playlistId
              }
            });

            if (!existing) {
              await prisma.track.create({ data: track });
              addedCount++;
            }
          }

          return res.status(201).json({
            message: `Added ${addedCount} tracks from album`,
            totalTracks: tracks.length,
            skipped: tracks.length - addedCount
          });
        } catch (fetchError) {
          console.error('iTunes API Error:', fetchError);
          return res.status(502).json({
            error: 'Failed to fetch data from iTunes API'
          });
        }
      } else {
        const { id: trackId, title, artist, image, preview, albumId = '' } = mediaItem;

        const existing = await prisma.track.findFirst({
          where: {
            trackId: trackId,
            playlistId: playlistId
          }
        });

        if (existing) {
          return res.status(400).json({ error: 'Track already exists in this playlist' });
        }

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

        return res.status(201).json(track);
      }
    } catch (error) {
      console.error('ADD TRACK ERROR:', error);
      return res.status(500).json({ error: 'Failed to add track' });
    }
  });

   router.delete('/playlists/:playlistId/tracks/:trackId', authMiddleware, async (req: Request, res: Response) => {
    try {
      const playlistId = Number(req.params.playlistId);
      const trackId = req.params.trackId;
      const userId = req.user?.userId;

      const playlist = await prisma.playlist.findUnique({
        where: { id: playlistId }
      });

      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }

      if (playlist.userId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      const result = await prisma.track.deleteMany({
        where: {
          trackId: trackId,
          playlistId: playlistId
        }
      });

      if (result.count === 0) {
        return res.status(404).json({ error: 'Track not found' });
      }

      return res.status(200).json({ message: 'Track deleted successfully' });
    } catch (error) {
      console.error('Delete track error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};