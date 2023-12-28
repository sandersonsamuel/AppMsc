import { data } from "autoprefixer"
import { Result } from "postcss"
import { useEffect, useState } from "react"

export function Dados({ albuns }) {
  if (albuns){
    return (
      <div className="flex flex-wrap justify-center p-10 bg-gradient-to-r from-slate-900 to-slate-950 mt-10">
        {albuns && albuns.map((album, index) => (
          <div onClick={()=> location.href = `album/${album.id}`} key={index} className="flex flex-col sm:w-1/3 md:w-1/3 lg:w-1/5 p-4 justify-center m-3 bg-slate-800 cursor-pointer hover:scale-105 transition">
            <img src={album.images[0].url} alt={album.name} />
            <h1 className='text-xl'>{album.name}</h1>
            <h1 className='text-sm'>{"by: "+ album.artists[0].name}</h1>
          </div>
        ))}
      </div>
    )
  }else{
    return null
  }

}
