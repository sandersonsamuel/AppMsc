import { useState, useEffect } from 'react';
import '../App.css'
import { CLIENT_ID } from '../configs/SpotifyConfigs';
import { CLIENT_SECRET } from '../configs/SpotifyConfigs';
import { Artistas } from '../components/Artistas';
import { useParams } from 'react-router';
import { NavBar } from '../components/NavBar';
import { Albuns } from '../components/Albuns';

export function Pesquisa(){

  const { id } = useParams()
  const pesq = id

  const [albuns, setAlbuns] = useState([])
  const [artists, setArtists] = useState("")
  const [accessToken, setAccessToken] = useState("")

  const [selectedOption, setSelectedOption] = useState("artistas");

  async function getToken(){
    var authParameters = {
      method : 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    let response = await fetch('https://accounts.spotify.com/api/token', authParameters)
    let data = await response.json()
    setAccessToken(data.access_token) 
    return data.access_token
  }

  function getArtista(token){

    var artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'aplication/json',
        'Authorization': 'Bearer ' + token
      }
    }

    var artistID = fetch('https://api.spotify.com/v1/search?q=' + pesq + '&type=artist', artistParameters)
    .then(response => response.json())
    .then(data => {
      setArtists(data.artists.items)
    })
  }

  function getAlbum(token){

    var artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'aplication/json',
        'Authorization': 'Bearer ' + token
      }
    }

    var artistID = fetch('https://api.spotify.com/v1/search?q=' + pesq + '&type=album', artistParameters)
    .then(response => response.json())
    .then(data => {
      setAlbuns(data.albums.items)
    })
  } 

  

  useEffect(() => {

    async function procurar(){
      const token  =  await getToken()
      await getArtista(token)
      await getAlbum(token)
    }

    procurar()
    
  }, [pesq])

  return(
    <>
      <div className='w-full min-h-screen flex flex-col bg-gradient-to-bl from-slate-900 to-slate-950 text-white relative'>

        <NavBar isLog={true}/>

        <div className='w-full flex justify-center gap-5 text-xl'>

          <div>
            <input 
              className='hidden' 
              type="radio" 
              id="artistas" 
              checked={selectedOption === "artistas"} 
              onChange={() => setSelectedOption("artistas")}
            />
            <label 
              className='cursor-pointer'
              htmlFor="artistas"
              style={{textDecoration: selectedOption === 'artistas' ? 'underline' : 'none'}}
            
            >Artistas</label>
          </div>

          <div>
            <input
              className='hidden' 
              type="radio" 
              id="Album" 
              checked={selectedOption === "Album"} 
              onChange={() => setSelectedOption("Album")}
            />
            <label 
              className='cursor-pointer'
              htmlFor="Album"
              style={{textDecoration: selectedOption === 'Album' ? 'underline' : 'none'}}
              >Album</label>
          </div>
          
        </div>

        <div className='text-center'>
          <h1 className='text-2xl mt-5'>Resultados para {pesq}:</h1>
        </div>

        <div className='mt-5'>
          {selectedOption === "artistas" ? (
            <Artistas artistas={artists} pesquisa={pesq}/>
          ) : (
            <Albuns albuns={albuns}/>
          )}
        </div>

      </div>
    </>
    
  )
}