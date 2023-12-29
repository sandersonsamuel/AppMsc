import { useParams } from "react-router-dom";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/SpotifyConfigs";
import { useState, useEffect } from "react";
import { Albuns } from "./Albuns";

export function ArtistaAlbuns() {
  const { id } = useParams();
  const artistaId = id;

  const [albuns, setAlbuns] = useState(null);
  const [artista, setArtista] = useState(null);
  const [InfoArtista, setInfoArtista] = useState(null);

  useEffect(() => {
    const getAccessToken = async () => {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      });

      const data = await response.json();
      return data.access_token;
    };

    const getArtistData = async (accessToken) => {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistaId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
        },
      });

      const data = await response.json();
      setArtista(data.name);
      setInfoArtista(data);
    };

    const getAlbums = async (accessToken) => {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistaId}/albums?album_type=album&limit=50`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      setAlbuns(data.items);
    };

    const fetchData = async () => {
      const accessToken = await getAccessToken();
      await getArtistData(accessToken);
      await getAlbums(accessToken);
    };

    fetchData();
  }, [artistaId]);

  return (
    <>
      <div className="justify-center p-10 w-full bg-neutral-800 min-h-screen text-white transition-all">
        <h1 style={{overflowWrap: "break-word"}} className="text-6xl font-bold text-center w-full overflow- transition-all">Albuns de {artista}</h1>
        <Albuns albuns={albuns} />
      </div>
    </>
  );
}
