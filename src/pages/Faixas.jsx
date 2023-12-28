import { Explict } from "../components/Explict"

export function Faixas({album, color}){

  const faixas = album.tracks.items

  function msToMin(ms){
    let minutos = Math.floor(ms / 1000 / 60)
    let segundos = Math.floor((ms / 1000) % 60)

    return `${minutos}:${segundos}`
  }


  return(
    <div  >
      {
        faixas.map((msc, index)=>(
          <div key={index} className="flex justify-center items-center">
          <div className="flex w-full p-5 shadow-2xl border-2 border-neutral-700 m-5 bg-gradient-to-tl hover:bg-gradient-to-tr hover:from-neutral-900 hover:to-neutral-950 cursor-pointer from-neutral-800 to-neutral-900 justify-between items-center" key={index}>
            <div>
              <h1 className="text-white text-xl">{msc.name}</h1>
              <div className="flex gap-2">
                <Explict bool={msc.explicit}/>
                <h1 className="text-white text-sm">{msc.artists[0].name}</h1>
              </div>
            </div>
            <h1 className="text-white text-xl">{msToMin(msc.duration_ms)}</h1>
          </div>
          <i style={{background: color}} className="fa-solid fa-pen-to-square p-2 sm:p-3 rounded-sm hover:brightness-75 cursor-pointer"></i>
          </div>
        ))
      }
    </div>
  )
}