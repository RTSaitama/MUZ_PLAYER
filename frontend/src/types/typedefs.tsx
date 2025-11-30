export interface Track {
  id: string;
  title: string;
  artist: string;
  image: string;
  preview: string;
  trackNumber?:number;
  albumId?:string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  image: string;
}

export interface Playlist {
  id:number
  tracks: Track[];
}

export type MediaItem = Track | Album;