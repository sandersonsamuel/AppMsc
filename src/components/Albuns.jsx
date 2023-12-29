import { Link } from "react-router-dom"

export function Albuns({ albuns }) {
  if (albuns){
    return (
      <div className="flex flex-wrap justify-center p-10 bg-inherit w-full">
        {albuns && albuns.map((album, index) => (
        <Link to={`/album/${album.id}`} key={index} className="flex flex-col sm:w-1/3 md:w-1/3 lg:w-1/5 p-4 justify-center m-3 bg-neutral-600 cursor-pointer hover:scale-105 transition">
          <img src={album.images[0].url} alt={album.name} />
          <div>
            <h1 className='text-xl'>{album.name}</h1>
            <h1 className='text-sm'>{"by: "+ album.artists[0].name}</h1>
          </div>
        </Link>
        ))}
      </div>
      
    )
  }else{
    return null
  }

}
