import { NavBar } from "../components/NavBar";
import { UltimasAva } from "../components/UltimasAva";

export function LoggedArea(){

  return(
    
    <div className="w-ful min-h-screen bg-gradient-to-bl from-slate-900 to-slate-950 text-white">
      <NavBar isLog={true}/>
      <div className="w-full flex flex-col items-center">
        <UltimasAva/>
      </div>
    </div>
  )
}