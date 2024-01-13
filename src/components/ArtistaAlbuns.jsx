import { useParams } from "react-router-dom";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/SpotifyConfigs";
import { useState, useEffect } from "react";
import { Albuns } from "./Albuns";
import { SyncLoader } from "react-spinners";
import AvatarEditor from "react-avatar-editor";
import { useRef } from "react";
import { Link } from "react-router-dom";

export function ArtistaAlbuns() {
  const { id } = useParams();
  const artistaId = id;

  const editorRef = useRef(null);

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
      setInfoArtista(data)
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
      <div className='w-full h-screen flex justify-center items-center bg-neutral-800'>
        <SyncLoader size={30} color="#364ed6" />
      </div>
    )
  }else if(albuns.length === 0){
    return(
      <>
        <div className="bg-gradient-to-bl from-slate-900 to-slate-950 min-h-screen text-white">
          <div className="w-full md:p-10">
            <div className="flex p-5 justify-between md:justify-center md:gap-8">

              <div className="md:flex gap-5">
                <AvatarEditor
                className="border-4 border-slate-800"
                        ref={editorRef}
                        image={InfoArtista.images[0].url}
                        border={0}
                        color={[255, 255, 255, 0.6]}
                        scale={1.2}
                        rotate={0}
                />

                <div className="w-full flex flex-col justify-end">
                  <h1 className="text-4xl md:text-7xl font-bold my-2">{artista}</h1>
                  <h1 className="text-lg md:text-2xl font-bold">seguidores: {InfoArtista.followers.total.toLocaleString('pt-BR')}</h1>
                </div>
              </div>

              <div className="flex items-start">
                <Link to={InfoArtista.external_urls.spotify}>
                      <i className="text-3xl sm:text-5xl fa-brands fa-spotify cursor-pointer hover:scale-110 transition hover:brightness-90"></i>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </>
    )
  }else{
    return (
      <div className="bg-gradient-to-bl from-slate-900 to-slate-950 min-h-screen text-white">
        <div className="w-full md:p-10">
          <div className="flex p-5 justify-between md:justify-center md:gap-8">

            <div className="md:flex gap-5">
              <AvatarEditor
              className="border-4 border-slate-800"
                      ref={editorRef}
                      image={InfoArtista.images[0].url}
                      border={0}
                      color={[255, 255, 255, 0.6]}
                      scale={1.2}
                      rotate={0}
                    />

              <div className="w-full flex flex-col justify-end">
                <h1 className="text-4xl md:text-7xl font-bold my-2">{artista}</h1>
                <h1 className="text-lg md:text-2xl font-bold">seguidores: {InfoArtista.followers.total.toLocaleString('pt-BR')}</h1>
              </div>
            </div>

            <div className="flex items-start">
              <Link to={InfoArtista.external_urls.spotify}>
                    <i className="text-3xl sm:text-5xl fa-brands fa-spotify cursor-pointer hover:scale-110 transition hover:brightness-90"></i>
              </Link>
            </div>

          </div>
        </div>
        <div className="justify-center p-2 md:p-10 w-full transition-all flex flex-col gap-5">
          <h1 style={{overflowWrap: "break-word"}} className="text-6xl font-bold text-center w-full overflow- transition-all">Albuns</h1>
          <Albuns albuns={albuns} />
        </div>
      </div>
    )
  }
}
