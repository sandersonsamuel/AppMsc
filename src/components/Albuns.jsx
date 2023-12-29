import { Link } from "react-router-dom"

export function Albuns({ albuns }) {
  if (albuns){
    return (
      <div className="flex flex-wrap justify-center md:p-10 w-full">
        {albuns && albuns.map((album, index) => (
        <Link to={`/album/${album.id}`} key={index} className="flex flex-col sm:w-1/2 md:w-1/3 lg:w-1/5 p-4 justify-center m-3 bg-gradient-to-tr from-slate-700 to-slate-800 rounded-md hover:shadow-envolve-xl cursor-pointer hover:scale-105 transition">
          <img className="max-w-72" src={album.images[0].url} alt={album.name} />
          <div className="max-w-72">
            <div className='text-md font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap' title={album.name}>{album.name}</div>
            <div className='text-sm font-thin overflow-hidden overflow-ellipsis whitespace-nowrap' title={"by: "+ album.artists[0].name}>{"by: "+ album.artists[0].name}</div>
          </div>
        </Link>
        ))}
      </div>
    )
  }else{
    return null
  }

}
