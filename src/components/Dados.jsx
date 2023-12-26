import { data } from "autoprefixer"
import { Result } from "postcss"
import { useEffect, useState } from "react"

export function Dados({ albuns }) {
  return (
    <div className="flex flex-wrap justify-center p-10">
      {albuns && albuns.map((album, index) => (
        <div key={index} className="flex flex-col sm:w-1/3 md:w-1/3 lg:w-1/4 p-4 justify-center m-3 bg-slate-800 cursor-pointer hover:scale-105 transition">
          <img src={album.images[0].url} alt={album.name} />
          <h1 className='text-xl'>{album.name}</h1>
        </div>
      ))}
    </div>
)
}
