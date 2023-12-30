import { Link } from "react-router-dom";

export function NavBar(){

  return(
    <>
      <nav className="p-3 md:p-7 md:px-16 flex flex-col md:flex-row items-center justify-evenly">
        <h1 className="text-2xl font-bold">MelodyMingler.</h1>
        <ul className="flex md:gap-5 gap-2 m-5 md:m-0 w-full md:w-auto justify-center">
          <li className="cursor-pointer text-[0.9rem] md:text-lg font-bold hover:opacity-70" ><Link to={'/login'}>Login</Link></li>
          <li className="cursor-pointer text-[0.9rem] md:text-lg font-bold hover:opacity-70" >Criar Conta</li>
          <li className="cursor-pointer text-[0.9rem] md:text-lg font-bold hover:opacity-70" >Albuns mais Avaliados</li>
        </ul>

        <div className="flex items-center gap-2">
          <input type="text" className="w-48 h-8 rounded-2xl outline-none bg-slate-800 px-4 focus:w-64 focus:bg-slate-700 transition-all"/>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </nav>
    </>
  )
}