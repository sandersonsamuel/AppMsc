import { Link, useParams } from 'react-router-dom'
import { CLIENT_SECRET, CLIENT_ID  } from '../configs/SpotifyConfigs'
import { useState, useEffect } from 'react'
import { Faixas } from './Faixas'
import { ColorExtractor } from 'react-color-extractor'

export function Album(){

  const { id } = useParams()
  const albumId = id

  const [accessToken, setAccessToken] = useState("")
  const [album, setAlbum] = useState(null)
  const [dateAlbum, setDateAlbum] = useState("")
  const [error, setError] = useState(null)
  const [color, setColor] = useState('')

  useEffect(() => {

    var authParameters = {
      method : 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(Result => Result.json())
    .then(data => {
      setAccessToken(data.access_token)
      return fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + data.access_token }
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Album não encontrado');
      }
      return response.json();
    })
    .then(data => {
      setAlbum(data)
      setDateAlbum(data.release_date.split("-")[0])
    })
    .catch(error => setError(error))
    
  }, [])

  const addColor = (colors) => {
    setColor(colors[0])
  }

  return(
    <>
      {error ? <div className='text-5xl'>Erro: {error.message}</div> :(album && (
      <>
        <ColorExtractor src={album.images[1].url} getColors={addColor} />
        <div className='bg-neutral-800 w-full h-full  text-white flex flex-col p-3 md:p-5 transition-all'>
          <div style={{backgroundImage: `linear-gradient(to top, #232323, ${color})`}} className='shadow-envolve-xl flex align-bottom justify-between position-relative gap-5 pb-10 p-5 transition-all w-full'>
              <div className='md:flex items-end gap-10 transition-all'>
                <img className='shadow-envolve-xl transition-all cursor-pointer hover:scale-105 w-60' src={album.images[1].url} alt={album.name}/>
                <div>
                  <h1 className={`text-md sm:text-2xl font-bold text-[${color}]`}>Album</h1>
                  <h1 className='text-3xl sm:text-7xl font-bold mb-3'>{album.name}</h1>
                  <div className='sm:flex gap-2'>
                    <h1 className='text-sm sm:text-xl font-bold'>{album.artists[0].name}</h1>
                    <p className='hidden sm:block sm:text-xl'>/</p>
                    <h1 className='text-sm sm:text-xl font-bold'>{dateAlbum}</h1>
                    <p className='hidden sm:block sm:text-xl'>/</p>
                    <h1 className='text-sm sm:text-xl font-bold'>{album.total_tracks} faixas</h1>
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-between h-100 items-center'>
                <Link to={album.external_urls.spotify}>
                  <i className="text-3xl sm:text-5xl fa-brands fa-spotify cursor-pointer hover:scale-110 transition hover:brightness-90"></i>
                </Link>
                <i className="text-2xl md:text-3xl fa-solid fa-pen-to-square p-2 sm:p-3 rounded-sm hover:brightness-90 cursor-pointer"></i>
              </div>
            </div>
            <Faixas album={album} color={color}/>
        </div>
      </>
      ))}
      
    </>
  )
}
