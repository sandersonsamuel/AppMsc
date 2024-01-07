import React, { useEffect, useRef, useState } from 'react'
import { Modal, ModalFooter, ModalBody, ModalHeader, Button } from 'flowbite-react'
import { CLIENT_ID, CLIENT_SECRET } from '../../configs/SpotifyConfigs'
import { Faixas } from '../Faixas'
import { Albuns } from '../Albuns'

export const useGetTA = (name, type) =>{

  const [response, setResponse] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

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
    .catch(error => setError(error))
    
  }, [name])

  return response
}

export const ModalTop3 = ({type}) => {

  const [open, setOpen] = useState(false)

  const handleOpen = () =>{
    setOpen(true)
  }

  const handleClose = () =>{
    setOpen(false)
  }

  const handleSubmit = () =>{
    setOpen(false)
  }

  return (
    <>
      <i onClick={handleOpen} className="fa-solid fa-circle-plus text-3xl cursor-pointer hover:scale-125 transition hover:text-blue-500"></i>
      <Modal show={open} onClose={handleClose}>
        <div className='text-white'>
          <ModalHeader>
            Escolha seu Top 3
          </ModalHeader>
          <ModalBody>

            <div className='flex flex-col gap-3 items-start'>

              <AdcTop type={type} top={1} />
              <AdcTop type={type} top={2} />
              <AdcTop type={type} top={3} />

            </div>

          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit}>Adicionar</Button>
            <Button onClick={handleClose} color='gray'>Cancelar</Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  )
}

export function AdcTop({top, type}){

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

  const evento = (array) =>{
    console.log(array)
  }

  return(

    <>
      {type == 'musicas' ? (<>
      <Button onClick={handleOpen} className='flex items-center'>
        <p className='mr-2'>Top-{top} </p><i className='text-xl fa-solid fa-circle-plus cursor-pointer'></i>
      </Button>

      <Modal show={open} onClose={handleClose}>
        <ModalHeader>Escolha seu top de Musicas</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className='flex gap-2 items-center text-white justify-center'>
            <input onChange={(e)=> setPesq(e.target.value)} type="text" className='w-52 xl:w-64 h-8 rounded-2xl outline-none bg-slate-800 px-4 focus:bg-slate-700 transition-all' />
          </form>
          <div className='text-white'>
          {musicas && <Faixas album={musicas} faixasOnly={true} evento={evento} />}
          </div>
        </ModalBody>
      </Modal>



      </>) : type == 'albuns' ? (
        <>
          <Button onClick={handleOpen} className='flex items-center'>
        <p className='mr-2'>Top-{top} </p><i className='text-xl fa-solid fa-circle-plus cursor-pointer'></i>
      </Button>

      <Modal show={open} onClose={handleClose}>
        <ModalHeader>Escolha seu top de Album</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className='flex gap-2 items-center text-white justify-center'>
            <input onChange={(e)=> setPesq(e.target.value)} type="text" className='w-52 xl:w-64 h-8 rounded-2xl outline-none bg-slate-800 px-4 focus:bg-slate-700 transition-all' />
          </form>
          <div className='text-white'>
          {albuns && <Albuns albuns={Object.values(albuns)[0].items} evento={evento} />}
          </div>
        </ModalBody>
      </Modal>
        </>
      ) : null}
    </>
  ) 
}
