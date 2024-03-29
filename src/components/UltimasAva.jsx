import { useEffect, useState } from "react"
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react"
import { GetAvalAlbum } from "./GetAval"
import { Rating, RatingStar } from "flowbite-react"
import { Link } from "react-router-dom"
import { ReviewAlbum } from "./ReviewAlbum"

export function UltimasAva(){

  const [avaliacoes, setAvaliacoes] = useState(null)

  useEffect(()=>{

    GetAvalAlbum(setAvaliacoes)

  },[])

  return(
    <>
      <div className="w-11/12 flex flex-col items-center h-[20rem] p-5 bg-slate-800 rounded-xl overflow-auto">
          <div className="w-full flex justify-between">
            <p className="text-2xl font-semibold">Albuns Avaliados</p>
            {avaliacoes && <p className="text-2xl font-semibold">{Object.values(avaliacoes).length}</p>}
          </div>
          <div className="w-full">
          {avaliacoes && 
            Object.values(avaliacoes).map((avaliacao, key)=>(
              <ReviewAlbum key={key} review={avaliacao} complete={true}/>
            ))
          }
          </div>
      </div>
    </>
  )
}