import React from 'react'
import { ModalTop3 } from './Modals/ModalTop3'

export const Top3Musicas = () => {
  return (
    <div className='w-full flex items-center flex-col min-h-20 bg-slate-800 p-5 font-semibold rounded-xl'>
      <div className='cabecalho flex items-center justify-between gap-4 w-full'>
        <p className='text-xl'>Top 3 Musicas</p>
        <ModalTop3/>
      </div>
    </div>
  )
}
