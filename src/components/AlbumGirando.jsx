import { useEffect, useRef } from 'react'
import capaAlbumJesusIsKing from '../assets/jesusAlbum.png'
import gsap from 'gsap'

export function AlbumGirando(){

  return(
    <>
      <div className="flex w-full flex-col items-center">
          <img src={capaAlbumJesusIsKing} 
          className="w-[14rem] md:w-[30rem] animate-spin-super-slow" alt="Capa do album jesus is king (kanye west)" />
      </div>
    </>
  )
}
