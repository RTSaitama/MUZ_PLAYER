import express, { Request, Response } from 'express';
import type { PrismaClient } from '../../prisma/generated/client';


export default (prisma: PrismaClient) => {

  const router = express.Router();

  router.get('/search/tracks/:searchTerm', async (req: Request, res: Response) => {

    try {
      const {searchTerm} = req.params;

      const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=music&entity=song&limit=20`)
      
      const tracks = await response.json()
      return res.json(tracks);
    }catch(error) {
      return res.status(500).json({ error: 'Failed to fetch tracks search' });
    }
  })

  router.get('/search/albumTracks/:albumId', async(req:Request, res: Response) => {
    try{
      const { albumId } = req.params;
      const response = await fetch(`https://itunes.apple.com/lookup?id=${albumId}&entity=song&limit=200`)
      const tracksFromAlbum = await response.json()
      return res.json(tracksFromAlbum)
    }catch(error){ 
      return res.status(500).json({error:'Failed to fetch tracks  from album'})
    }
  })
  return router;
}
