import { Link } from "react-router-dom";

export function Artistas({artistas, pesquisa}, ){

  console.log(artistas)

  if (artistas){
    return(
      <>
        {artistas.map((artista, index)=>(
          <Link to={`artista/albuns/${artista.id}`} key={index}>
            <div className="md:mx-10 gap-5 flex w-100 md:p-2 shadow-2xl border-2 border-slate-700 m-3 items-center bg-slate-800 hover:saturate-[120%] hover:shadow-envolve-xl">
              {artista.images && artista.images[0] && artista.images[0].url ? <img src={artista.images[2].url} className="w-16 h-16" alt="" /> : <div className="min-w-16 h-16 bg-neutral-700 flex justify-center items-center text-2xl">?</div>}
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