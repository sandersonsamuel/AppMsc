import { Link, useParams } from 'react-router-dom'
import { CLIENT_SECRET, CLIENT_ID  } from '../configs/SpotifyConfigs'
import { useState, useEffect } from 'react'
import { Faixas } from './Faixas'
import { ColorExtractor } from 'react-color-extractor'
import { ModalAva } from './Modals/ModalAva'
import StarCircle from '../assets/star-circle.svg'
import { auth, databaseApp } from '../configs/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { ReviewAlbum } from './ReviewAlbum'
import { Alert } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi'

function Alerta(){
  return(
  <Alert className='mb-5 fixed top-2' color="failure" icon={HiInformationCircle}>
    <span className="font-medium">Alerta!</span> Você deve avaliar todas as músicas antes de avaliar um album
  </Alert>
  )
}


export function Album(){

  const { id } = useParams()
  const albumId = id

  const [accessToken, setAccessToken] = useState("")
  const [album, setAlbum] = useState(null)
  const [dateAlbum, setDateAlbum] = useState("")
  const [error, setError] = useState(null)
  const [color, setColor] = useState('')
  const [avaliacaoAlbum, setAvaliacaoAlbum] = useState(null)
  const [albuns, setAlbuns] = useState(null)
  const [alerta, setAlerta] = useState(false)

  function darAlerta(){
    setAlerta(true)
    setTimeout(() => {
      setAlerta(false)
    }, 10000);
  }

  useEffect(()=>{

    if (albuns) {
      Object.values(albuns).forEach(albumAva=>{
        if (albumAva.idAlbum === albumId){
          setAvaliacaoAlbum(albumAva)
        }
      })
    }

  },[albuns])

  useEffect(() => {

    if (!auth.currentUser) {
      return;
    }

    const unsubscribe = onSnapshot(doc(databaseApp, `avaliacoes/${auth.currentUser.uid}`), (docSnap) => {
      if (docSnap.exists()) {
        setAlbuns(docSnap.data().album)
      }
    })

    return () => unsubscribe();
  }, [auth.currentUser]);

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
        <div className='bg-gradient-to-bl from-slate-900 to-slate-950 w-full min-h-screen text-white flex flex-col p-3 md:p-5 transition-all'>
        {alerta && <Alerta/>}
          <div style={{background: `${color}`}} className="md:flex align-bottom justify-between position-relative gap-5 p-5 md:p-7 transition-all w-full">
              <div className='md:flex items-center gap-10 transition-all'>
                <img className='shadow-envolve-xl transition-all cursor-pointer hover:scale-105 max-w-36 md:max-w-64' src={album.images[1].url} alt={album.name}/>
                
                <div className='mt-2'>

                  <h1 className={`text-md sm:text-2xl font-bold text-[${color}]`}>Album</h1>
                  <h1 className='text-[1.8rem] sm:text-7xl font-bold mb-3 md:text-clip break-words'>{album.name}</h1>
                  
                  <div className='sm:flex gap-2'>
                    <h1 className='text-sm sm:text-xl font-bold'>{album.artists[0].name}</h1>
                    <p className='hidden sm:block sm:text-xl'>/</p>
                    <h1 className='text-sm sm:text-xl font-bold'>{dateAlbum}</h1>
                    <p className='hidden sm:block sm:text-xl'>/</p>
                    <h1 className='text-sm sm:text-xl font-bold'>{album.total_tracks} faixas</h1>
                  </div>

                </div>
                
              </div>
              <div className='flex my-2 md:flex-col justify-between h-100 items-end'>
          
                <Link to={album.external_urls.spotify}>
                  <i className="text-3xl sm:text-4xl fa-brands fa-spotify cursor-pointer hover:scale-110 transition hover:brightness-90"></i>
                </Link>

                <ModalAva albumInfos={album} alerta={darAlerta}/>

              </div>
        
          </div>
          <ReviewAlbum review={avaliacaoAlbum}/>
            <Faixas album={album} color={color}/>
        </div>
      </>
      ))}
      
    </>
  )
}
