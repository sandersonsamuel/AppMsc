import { useEffect, useState } from "react"
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react"
import { GetAvalAlbum } from "./GetAval"
import { Rating, RatingStar } from "flowbite-react"
import { Link } from "react-router-dom"

export function UltimasAva(){

  const [avaliacoes, setAvaliacoes] = useState(null)

  console.log(avaliacoes);

  useEffect(()=>{

    GetAvalAlbum(setAvaliacoes)

  },[])

  return(
    <>
      <div className="w-11/12 md:w-[30rem] flex flex-col items-center h-[25rem] p-5 bg-slate-800 rounded-xl overflow-auto">
          <h1 className="text-2xl font-semibold mb-4">Albuns Avaliados</h1>
          <Accordion className="w-full">
            {avaliacoes && 
            Object.values(avaliacoes).map((avaliacao, key)=>(
              <AccordionPanel key={key}>
                <Accordion.Title>
                  <div className="md:flex gap-3 items-center">
                    <div className="flex gap-1 items-center">
                      <Link to={`/album/${avaliacao.idAlbum}`}>
                        <i className="text-white fa-solid fa-arrow-up-right-from-square mr-1 hover:scale-125"></i>
                      </Link>
                    <Rating>
                      <RatingStar>
                      </RatingStar>
                    </Rating>
                    <p className="text-slate-300">{avaliacao.notaAlbum}</p>
                    </div>
                    <p className="font-bold text-lg">{avaliacao.nameAlbum}</p>
                  </div>
                  </Accordion.Title>
                  <AccordionContent>
                    <p>{avaliacao.avaliacao}</p>
                  </AccordionContent>
              </AccordionPanel>
            ))}
          </Accordion>
      </div>
    </>
  )
}