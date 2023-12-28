import { useState, useEffect } from 'react';
import { Dados } from '../components/Dados';
import '../App.css'
import { PerfilMin } from '../components/PerfilMin';
import { CLIENT_ID } from '../configs/SpotifyConfigs';
import { CLIENT_SECRET } from '../configs/SpotifyConfigs';

export function Home(){

  const [pesq, setPesq] = useState("")
  const [albuns, setAlbuns] = useState([])
  const [artists, setArtists] = useState("")

  const [accessToken, setAccessToken] = useState("")

  useEffect(()=>{
    const ultimaPesq = sessionStorage.getItem('ultimaPesq')
    if (ultimaPesq){
      setPesq(ultimaPesq)
    }
  },[])


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

    sessionStorage.setItem('ultimaPesq', pesq);

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
    .then(data => {
      console.log(data)
      return data.artists.items[0].id
    })

    var albums = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?album_type=album&limit=50`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(response => response.json())
    .then(data => {
      setAlbuns(data.items)
      sessionStorage.setItem('ultimaPesq', pesq)
    })
  }

  return(
    <>
      <div className='w-full h-screen flex flex-col bg-gradient-to-r from-slate-900 to-slate-950 text-white relative'>
      <div className=''>
        
        <nav className='p-2 md:p-5 md:px-16 md:flex w-full justify-between bg-gradient-to-r from-slate-900 to-slate-950  z-50'>
          <h1 className='ssm:mb-5 md:m-0 text-center md:text-start text-3xl font-bold'>Logo.</h1>
          <div className='md:hidden mb-5'>
            <PerfilMin/>
          </div>
          <form onSubmit={procurar} className='flex w-full justify-center items-center'>

            <input 
              type="text" 
              className='rounded-l-lg p-2 text-black outline-none px-4 w-32 ssm:w-40 sm:w-96'
              value={pesq}
              onChange={(event)=> setPesq(event.target.value)}
              
              />
            <button className='bg-purple-900 p-2 px-4 rounded-r-lg hover:bg-purple-950'><i className="fa-solid fa-magnifying-glass"></i></button>

            <i onClick={()=>{
              setAlbuns([])
              sessionStorage.removeItem("ultimaPesq")
            }} className="fa-solid fa-x m-0 text-sm md:text-xl cursor-pointer hover:scale-125 transition text-red-600 ml-2 md:ml-5"></i>
            
          </form>

          <div className='hidden md:flex'>
            <PerfilMin/>
          </div>

        </nav>
      </div>

      <Dados albuns={albuns} />

    </div>
    </>
    
  )
}