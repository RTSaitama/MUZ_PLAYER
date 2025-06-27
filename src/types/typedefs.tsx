export interface Track {
  id: string;
  title: string;
  artist: string;
  image: string;
  preview: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  image: string;
  preview: string;
}

export type MediaItem = Track | Album;