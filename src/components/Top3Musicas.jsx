import React, { useEffect, useState } from 'react'
import { ModalTop3 } from './Modals/ModalTop3'
import { GetTop3Musicas } from './GetTop3'
import { useNavigate } from 'react-router-dom'

export const Top3Musicas = () => {

  const [top3Musicas, setTop3Musicas] = useState(null)
  const navigate = useNavigate()


  useEffect(()=>{
    GetTop3Musicas(setTop3Musicas)
  },[])

  return (
    <div className='w-full flex items-center flex-col min-h-20 bg-slate-800 p-5 font-semibold rounded-xl'>
      <div className='cabecalho flex items-center justify-between gap-4 w-full'>
        <p className='text-xl'>Top 3 Musicas</p>
        <ModalTop3 type={'musicas'} top3Musicas={top3Musicas}/>
      </div>
      <div className='flex flex-col w-full gap-5 mt-5'>
        {top3Musicas && 
          Object.values(top3Musicas).map((musica, key)=>(
            <div key={key} className='flex items-center gap-2'>
              <div className='md:w-9 md:h-9 md:bg-slate-700 flex items-center justify-center rounded-full'>
                <p className='text-xl font-bold'>{key+1}</p>
              </div>

            <div onClick={()=> navigate(`/album/${musica.album.id}`)} className='flex w-full gap-2 items-center border-2 border-slate-600 p-3 rounded-xl bg-slate-700 cursor-pointer hover:bg-slate-800'>
              <img className='w-12 md:w-16' src={musica.album.images[0].url} alt={`capa do album ${musica.album.name}`}/>
              <p className='text-xl'>{musica.name}</p>
            </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}
