import { useParams } from 'react-router-dom'
import { CLIENT_SECRET } from '../configs/SpotifyConfigs'
import { CLIENT_ID } from '../configs/SpotifyConfigs'
import { useState, useEffect } from 'react'
import { useColor } from 'color-thief-react'
import { Faixas } from './Faixas'

export function Album({match}){

  const { id } = useParams()
  const albumId = id

  const [accessToken, setAccessToken] = useState("")
  const [album, setAlbum] = useState(null)
  const [dateAlbum, setDateAlbum] = useState("")

  const [error, setError] = useState(null)

  const [imgUrl, setImgUrl] = useState('')

  const { data, loading, erro } = useColor('https://static.significados.com.br/foto/cruzamento-teste-1.jpg', 'hex');

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


  return(
    <>
      {error ? <div className='text-5xl'>Erro: {error.message}</div> :(album && (
        <div className='w-full h-screen bg-neutral-800 text-white flex flex-col p-5'>
          <div className='flex align-bottom position-relative items-end gap-5 shadow-xl pb-10 p-5'>
              <img src={album.images[1].url} alt={album.name}/>
              <div>
                <h1 className='text-2xl font-bold'>Album</h1>
                <h1 className='text-7xl font-bold mb-3'>{album.name}</h1>
                <div className='flex gap-2'>
                  <h1 className='text-xl font-bold'>{album.artists[0].name}</h1>
                  <p className='text-xl'>/</p>
                  <h1 className='text-xl font-bold'>{dateAlbum}</h1>
                  <p className='text-xl'>/</p>
                  <h1 className='text-xl font-bold'>{album.total_tracks} faixas</h1>
                </div>
              </div>
            </div>
            <Faixas album={album}/>
        </div>
      ))}
      
    </>
  )
}
