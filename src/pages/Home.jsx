import { useState, useEffect } from 'react';
import { Dados } from '../components/Dados';

export function Home(){

  const [pesq, setPesq] = useState("")
  const [albuns, setAlbuns] = useState([])

  const CLIENT_ID = "a3537d89cf8c49ceb6deb52e6472ae6a"
  const CLIENT_SECRET = "49bdcc4d09ff4d3cac6c7da661b723b0"

  const [accessToken, setAccessToken] = useState("")

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
    .then(data => setAccessToken(data.access_token))
    
  }, [])

  async function procurar(event){

    event.preventDefault()

    var artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'aplication/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + pesq + '&type=artist', artistParameters)
    .then(response => response.json())
    .then(data => {return data.artists.items[0].id})

    var albums = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(response => response.json())
    .then(data => setAlbuns(data.items))
  }

  console.log(albuns)

  return(
    <div className='w-full flex flex-col justify-center bg-gradient-to-r from-slate-900 to-slate-950 text-white'>
      <nav className='p-5 px-10 flex w-full justify-between'>
        <form onSubmit={procurar} className='flex w-full justify-center'>
          <input 
            type="text" 
            className='w-96 rounded-l-md p-2 text-black'
            onChange={(event)=> setPesq(event.target.value)}
            />
          <button className='bg-purple-900 p-2 px-4 rounded-r-md'>Procurar</button>
        </form>
      </nav>

      <Dados albuns={albuns} />

    </div>
    
  )
}