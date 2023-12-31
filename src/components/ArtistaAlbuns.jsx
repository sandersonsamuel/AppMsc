import { useParams } from "react-router-dom";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/SpotifyConfigs";
import { useState, useEffect } from "react";
import { Albuns } from "./Albuns";
import { SyncLoader } from "react-spinners";

export function ArtistaAlbuns() {
  const { id } = useParams();
  const artistaId = id;

  const [albuns, setAlbuns] = useState([])
  const [artista, setArtista] = useState(null);
  const [InfoArtista, setInfoArtista] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
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
      await setIsLoading(false)
    };

    fetchData();
  }, [artistaId]);

  if(isLoading){

    return (
      <div className='w-screen h-screen flex justify-center items-center bg-neutral-800'>
        <SyncLoader size={30} color="#364ed6" />
      </div>
    )
  }else if(albuns.length === 0){
    return(
      <>
        <div className="justify-center p-2 md:p-10 w-full bg-gradient-to-bl from-slate-900 to-slate-950 min-h-screen text-white transition-all flex flex-col gap-5">
          <h1 style={{overflowWrap: "break-word"}} className="text-6xl font-bold text-center w-full overflow- transition-all">{artista} não possui albuns</h1>
        </div>
      </>
    )
  }else{
    return (
      <>
        <div className="justify-center p-2 md:p-10 w-full bg-gradient-to-bl from-slate-900 to-slate-950 min-h-screen text-white transition-all flex flex-col gap-5">
          <h1 style={{overflowWrap: "break-word"}} className="text-6xl font-bold text-center w-full overflow- transition-all">Albuns de {artista}</h1>
          <Albuns albuns={albuns} />
        </div>
      </>
    )
  }
}
