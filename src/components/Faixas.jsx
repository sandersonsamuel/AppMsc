import { Explict } from "./Explict"

export function Faixas({album, color}){

  const faixas = album.tracks.items

  function msToMin(ms){
    let minutos = Math.floor(ms / 1000 / 60)
    let segundos = Math.floor((ms / 1000) % 60)

    return `${minutos}:${segundos}`
  }


  return(
    <div className="w-100">
      {
        faixas.map((msc, index)=>(
          <div key={index} className="flex justify-center items-center mt-5 gap-3 w-full px-5">
            <div className="flex w-full md:p-5 md:shadow-2xl md:border-2 border-neutral-700 md:m-5 md:bg-gradient-to-tl md:hover:bg-gradient-to-tr md:hover:from-neutral-900 md:hover:to-neutral-950 cursor-pointer from-neutral-800 to-neutral-900 justify-between items-center" key={index}>
              <div className="px-2 overflow-hidden overflow-ellipsis whitespace-nowrap w-96">
                <h1 className="text-white text-xl overflow-hidden overflow-ellipsis whitespace-nowrap">{msc.name}</h1>
                <div className="flex gap-2">
                  <Explict bool={msc.explicit}/>
                  <h1 className="text-white text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{msc.artists[0].name}</h1>
                </div>
              </div>
              <h1 className="text-white text-xl">{msToMin(msc.duration_ms)}</h1>
            </div>
            <i style={{background: color}} className="bg-gradient-to-r fa-solid fa-pen-to-square p-1 md:p-2 sm:p-3 rounded-sm hover:brightness-75 cursor-pointer"></i>
          </div>
        ))
      }
    </div>
  )
}