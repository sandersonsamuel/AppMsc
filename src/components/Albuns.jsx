import { Link } from "react-router-dom"

export function Albuns({ albuns, evento }) {

  if (albuns){
    return (
      <>
      {!evento ? 
      (<div className="flex flex-wrap justify-center md:p-10 w-full items-center">
        {albuns && albuns.map((album, index) => (
        <Link to={`/album/${album.id}`} key={index} className="flex flex-col sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 justify-center m-3 bg-gradient-to-tr from-slate-700 to-slate-800 rounded-md hover:shadow-envolve-xl cursor-pointer hover:scale-105 transition-all">
          {album.images[0].url ? <img src={album.images[0].url} alt={album.name} /> : <div className="w-full h-full bg-neutral-700"></div>}
          <div className="max-w-60">
            <div className='text-md font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap' title={album.name}>{album.name}</div>
            <div className='text-sm font-thin overflow-hidden overflow-ellipsis whitespace-nowrap' title={"by: "+ album.artists[0].name}>{"by: "+ album.artists[0].name}</div>
          </div>
        </Link>
        ))}
      </div>): (
        <div className="flex flex-wrap justify-center md:p-10 w-full items-center">
        {albuns && albuns.map((album, index) => (
        <div onClick={()=> evento(album)} key={index} className="flex flex-col w-full lg:w-1/2 p-2 justify-center m-3 bg-gradient-to-tr from-slate-700 to-slate-800 rounded-md hover:shadow-envolve-xl cursor-pointer hover:scale-105 transition-all">
          {album.images[0].url ? <img src={album.images[0].url} alt={album.name} /> : <div className="w-full h-full bg-neutral-700"></div>}
          <div className="w-full">
            <div className='text-md font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap' title={album.name}>{album.name}</div>
            <div className='text-sm font-thin overflow-hidden overflow-ellipsis whitespace-nowrap' title={"by: "+ album.artists[0].name}>{"by: "+ album.artists[0].name}</div>
          </div>
        </div>
        ))}
      </div>
      )}
      </>
    )
  }else{
    return null
  }

}
