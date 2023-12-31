import React, { useEffect, useState } from 'react'
import { Modal, ModalFooter, ModalBody, ModalHeader, Button, Alert } from 'flowbite-react'
import { CLIENT_ID, CLIENT_SECRET } from '../../configs/SpotifyConfigs'
import { Faixas } from '../Faixas'
import { Albuns } from '../Albuns'
import { auth, databaseApp } from '../../configs/firebase'
import { doc, updateDoc} from 'firebase/firestore'
import { HiInformationCircle } from 'react-icons/hi'

function Alerta(){
  return(
  <Alert style={{zIndex: 9999}} className='mb-5 fixed top-2 right-2' color="success" icon={HiInformationCircle}>Adicionado com sucesso
  </Alert>
  )
}

export const useGetTA = (name, type) =>{

  const [response, setResponse] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  useEffect(() => {

    if (name) {
      if (name.length > 0){

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
      return fetch(`https://api.spotify.com/v1/search?q=${name}&type=${type}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + data.access_token }
      })})  
      .then(response => {
        if (!response.ok) {
          throw new Error('Musica não encontrada');
        }
        return response.json();
      })
      .then(data => {
        setResponse(data)
      })
      .catch(error => console.log(error))
        
      }
    }
    
  }, [name])

  return response
}

export const ModalTop3 = ({type, top3Albuns, top3Musicas}) => {

  const [open, setOpen] = useState(false)

  const [top1Musica, setTop1Musica] = useState(null)
  const [top2Musica, setTop2Musica] = useState(null)
  const [top3Musica, setTop3Musica] = useState(null)
  
  const [top1Album, setTop1Album] = useState(null)
  const [top2Album, setTop2Album] = useState(null)
  const [top3Album, setTop3Album] = useState(null)

  const [alerta, setAlerta] = useState(null)

  const top3AlbunsTemp = [top1Album, top2Album, top3Album]
  const top3MusicasTemp = [top1Musica, top2Musica, top3Musica]


  useEffect(()=>{

    if (top3Musicas) {
      setTop1Musica(top3Musicas[0])
      setTop2Musica(top3Musicas[1])
      setTop3Musica(top3Musicas[2])
    }

  }, [top3Musicas])

  useEffect(()=>{

    if (top3Albuns) {
      setTop1Album(top3Albuns[0])
      setTop2Album(top3Albuns[1])
      setTop3Album(top3Albuns[2])
    }

  }, [top3Albuns])

  useEffect(()=>{
    if (top1Musica || top2Musica || top3Musica){
      if (top3Musicas) {
        if (top1Musica != top3Musicas[0] || top2Musica != top3Musicas[1] || top3Musica != top3Musicas[2]) {
          setAlerta(true)
  
          setTimeout(() => {
          setAlerta(false)
          }, 3000)
        }
      }else{
        setAlerta(true)
  
          setTimeout(() => {
          setAlerta(false)
          }, 3000)
      }
    }

  }, [top1Musica, top2Musica, top3Musica])

  useEffect(()=>{
    if (top1Album || top2Album || top3Album){
      if (top3Albuns) {
        if (top1Album != top3Albuns[0] || top2Album != top3Albuns[1] || top3Album != top3Albuns[2]) {
          setAlerta(true)
  
          setTimeout(() => {
          setAlerta(false)
          }, 3000)
        }
      }else{
        setAlerta(true)
  
          setTimeout(() => {
          setAlerta(false)
          }, 3000)
      }
    }

  }, [top1Album, top2Album, top3Album])



  const handleOpen = () =>{
    setOpen(true)
  }

  const handleClose = () =>{
    setOpen(false)
  }

  const handleSubmit = async () =>{
    setOpen(false)

    if (type == "musicas"){
      if (top1Musica && top2Musica && top3Musica){
        const db = databaseApp
        const docRef = doc(db, 'avaliacoes', auth.currentUser.uid) 
        
        await updateDoc(docRef, {
          top3Musicas: [
            top1Musica,
            top2Musica,
            top3Musica,
          ]
        })

      }

    }else{
      if (top1Album && top2Album && top3Album){
        const db = databaseApp
        const docRef = doc(db, 'avaliacoes', auth.currentUser.uid) 
        
        await updateDoc(docRef, {
          top3Albuns: [
             top1Album,
             top2Album,
             top3Album,
          ]
        })

      }
    }

  }

  return (
    <>
    {alerta && <Alerta/>}
      <i onClick={handleOpen} className="fa-solid fa-circle-plus text-3xl cursor-pointer hover:scale-125 transition hover:text-blue-500"></i>
      <Modal show={open} onClose={handleClose}>
        <div className='text-white'>
          <ModalHeader>
            Escolha seu Top 3
          </ModalHeader>
          <ModalBody>

            <div className='flex flex-col gap-3 items-start'>

              <AdcTop type={type} top3Albuns={top3AlbunsTemp} top3Musicas={top3MusicasTemp} top={1} setTA={type == 'musicas' ? setTop1Musica : setTop1Album}/>
              <AdcTop type={type} top3Albuns={top3AlbunsTemp} top3Musicas={top3MusicasTemp} top={2} setTA={type == 'musicas' ? setTop2Musica : setTop2Album}/>
              <AdcTop type={type} top3Albuns={top3AlbunsTemp} top3Musicas={top3MusicasTemp} top={3} setTA={type == 'musicas' ? setTop3Musica : setTop3Album}/>

            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit}>{top3Albuns || top3Musicas ? 'Modificar': 'Adicionar'}</Button>
            <Button onClick={handleClose} color='gray'>Cancelar</Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  )
}

export function AdcTop({top, type, setTA, top3Albuns, top3Musicas}){

  const [open, setOpen] = useState(false)
  const [pesq, setPesq] = useState(null)

  const musicas = useGetTA(pesq, 'track')
  const albuns = useGetTA(pesq, 'album')

  const handleOpen = () =>{
    setOpen(true)
  }

  const handleClose = () =>{
    setOpen(false)
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
  }

  return(

    <>
      {type == 'musicas' ? (<>

      <div className='flex items-center justify-between w-full'>
      {top3Musicas && top3Musicas[top-1] && (
        <p className='text-xl'>
          <span className='font-bold'>{top}:</span> {top3Musicas[top-1].name}
        </p>
      )}

        <Button onClick={handleOpen} color='gray' className='flex items-center'>
          <p className='mr-2'>Top-{top} </p><i className='text-xl fa-solid fa-circle-plus cursor-pointer'></i>
        </Button>
      </div>

      <Modal show={open} onClose={handleClose}>
        <ModalHeader>Adicione uma música para seu Top-{top}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className='flex gap-2 items-center text-white justify-center'>
            <input onChange={(e)=> setPesq(e.target.value)} type="text" className='w-52 xl:w-64 h-8 rounded-2xl outline-none bg-slate-800 px-4 focus:bg-slate-700 transition-all' />
          </form>
          <div className='text-white'>
          {musicas && <Faixas album={musicas} faixasOnly={true} evento={setTA} />}
          </div>
        </ModalBody>
      </Modal>



      </>) : type == 'albuns' ? (
        <>
          <div className='flex items-center justify-between w-full'>
            {top3Albuns && top3Albuns[top-1] && (
              <p className='text-xl'>
                <span className='font-bold'>{top}:</span> {top3Albuns[top-1].name}
              </p>
            )}

            <Button onClick={handleOpen} color='gray' className='flex items-center'>
              <p className='mr-2'>Top-{top} </p><i className='text-xl fa-solid fa-circle-plus cursor-pointer'></i>
            </Button>
          </div>

      <Modal show={open} onClose={handleClose}>
        <ModalHeader>Adicione um Album</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className='flex gap-2 items-center text-white justify-center'>
            <input onChange={(e)=> setPesq(e.target.value)} type="text" className='w-52 xl:w-64 h-8 rounded-2xl outline-none bg-slate-800 px-4 focus:bg-slate-700 transition-all' />
          </form>
          <div className='text-white'>
          {albuns && <Albuns albuns={Object.values(albuns)[0].items} evento={setTA} />}
          </div>
        </ModalBody>
      </Modal>
        </>
      ) : null}
    </>
  ) 
}
