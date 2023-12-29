import { Link } from "react-router-dom";

export function Artistas({artistas}){

  if (artistas){
    return(
      <>
        {artistas.map((artista, index)=>(
          <Link to={`artista/albuns/${artista.id}`} key={index}>
            <div className="gap-5 flex w-100 md:p-5 shadow-2xl border-2 border-neutral-700 m-5 bg-gradient-to-tl hover:bg-gradient-to-tr hover:from-neutral-900 hover:to-neutral-950 cursor-pointer from-neutral-800 to-neutral-900 items-center">
              {artista.images && artista.images[0] && artista.images[0].url ? <img src={artista.images[2].url} className="w-16 h-16 rounded-full" alt="" /> : <div className="min-w-16 h-16 bg-neutral-700 flex justify-center items-center text-2xl">?</div>}
              <h1 className="text-2xl whitespace-nowrap overflow-hidden overflow-ellipsis">{artista.name}</h1>
            </div>
          </Link>
        ))}
      </>
    )
  }else{
    return null
  }
}