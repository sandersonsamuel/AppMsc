import { useEffect, useState } from "react"
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react"
import { GetAvalAlbum } from "./GetAval"
import { Rating, RatingStar } from "flowbite-react"

export function UltimasAva(){

  const [avaliacoes, setAvaliacoes] = useState(null)

  console.log(avaliacoes);

  useEffect(()=>{

    GetAvalAlbum(setAvaliacoes)

  },[])

  return(
    <>
      <div className="w-11/12 md:w-[40rem] flex flex-col items-center h-[25rem] p-5 bg-slate-800 rounded-xl overflow-auto">
          <h1 className="text-2xl font-semibold mb-4">Suas Avaliações</h1>
          <Accordion className="w-full">
            {avaliacoes && 
            Object.values(avaliacoes).map((avaliacao, key)=>(
              <AccordionPanel key={key}>
                <Accordion.Title>
                  <div className="flex gap-3 items-center">
                    <div className="flex gap-1">
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