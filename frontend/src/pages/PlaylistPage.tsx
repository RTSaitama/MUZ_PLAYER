import { useGetPlaylistQuery } from "@/store/apis/playlistsApi"
import { useParams } from "react-router-dom";
import type { Track } from "@/types/typedefs";

export const PlaylistPage = () => {
  const { id } = useParams();
  const playlistId = Number(id);
  const { data:playlist, isLoading, error } = useGetPlaylistQuery(playlistId);

  if (isLoading){ 
    return <div>Loading...</div>;
  }
  if (error){
    return <div>Error loading playlist</div>;
  }

  return (
    <div>
      <ul className="playlist_tracks">
        {playlist?.tracks?.map((track: Track) =>
          <li key={track.id}>
            <img className='' src={track.image} alt="track image" />
            <p className="playlist__track_name">{track.id}</p>
            <p className="playlist__track_artist">{track.artist}</p>
            <p className="playlist__track_preview">{track.preview}</p>
          </li>
        )}
      </ul>

    </div>
  )
}