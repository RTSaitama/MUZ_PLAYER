export interface Track {
  id: string;
  title: string;
  artist: string;
  image: string;
  preview: string;
  trackNumber?:number;
  albumId?:string;
  trackId?:string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  image: string;
}

export interface Playlist {
  name:string;
  id:number;
  tracks: Track[];
}

export type MediaItem = Track | Album;

export type MediaItemToAdd = {
  selectedItem: MediaItem | null
}
export interface iTunesFeedEntry {
  id: {
    attributes: {
      'im:id': string;
    };
  };
  'im:name': {
    label: string;
  };
  'im:artist': {
    label: string;
  };
  'im:image': Array<{
    label: string;
  }>;
  'im:collection'?: {
    link?: {
      attributes?: {
        href?: string;
      };
    };
  };
  link?: Array<{
    attributes?: {
      type?: string;
      href?: string;
    };
  }>;
}

export interface iTunesFeedResponse {
  feed: {
    entry: iTunesFeedEntry[];
  };
}

export interface iTunesSearchResult {
  trackId: number;
  kind: string;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl?: string;
}

export interface iTunesSearchResponse {
  results: iTunesSearchResult[];
}

export interface iTunesAlbumResult {
  trackId: number;
  kind: string;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl?: string;
  trackNumber?: number;
}

export interface iTunesAlbumLookupResponse {
  results: iTunesAlbumResult[];
}