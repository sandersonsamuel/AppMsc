import { UltimasAva } from "../components/UltimasAva";
import { Top3Albuns } from "../components/Top3Albuns";
import { Top3Musicas } from "../components/Top3Musicas";

export function Atividade(){

  return(
    
    <div className="py-5 w-ful min-h-screen bg-gradient-to-bl from-slate-900 to-slate-950 text-white">
      <div className="w-full flex flex-col items-center">
        <UltimasAva/>
        <div className="flex flex-colw md:flex-row w-11/12 mt-10 gap-5">
          <Top3Albuns/>
          <Top3Musicas/>
        </div>
      </div>
    </div>
  )
}