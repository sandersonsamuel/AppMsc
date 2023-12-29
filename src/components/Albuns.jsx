import { Link } from "react-router-dom"

export function Albuns({ albuns }) {
  if (albuns){
    return (
      <div className="flex flex-wrap justify-center md:p-10 w-full">
        {albuns && albuns.map((album, index) => (
        <Link to={`/album/${album.id}`} key={index} className="flex flex-col sm:w-1/3 md:w-1/3 lg:w-1/5 p-4 justify-center m-3 bg-gradient-to-tr from-slate-700 to-slate-800 rounded-md hover:shadow-envolve-xl cursor-pointer hover:scale-105 transition">
          <img src={album.images[0].url} alt={album.name} />
          <div className="w-full">
            <h1 className='text-md font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap'>{album.name}</h1>
            <h1 className='text-sm font-thin overflow-hidden overflow-ellipsis whitespace-nowrap'>{"by: "+ album.artists[0].name}</h1>
          </div>
        </Link>
        ))}
      </div>
    )
  }else{
    return null
  }

}
