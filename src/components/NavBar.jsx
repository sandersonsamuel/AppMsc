import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { PerfilMin } from "./PerfilMin";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../configs/firebase";

export function NavBar(){

  const [pesquisa, setPesquisa] = useState("")
  const navigate = useNavigate()
  const [logged, setLogged] = useState(null)

  useEffect(()=>{

    onAuthStateChanged(auth, (user)=>{

      if (user){
        setLogged(user)
      }

    })

  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pesquisa.length > 0) {
      navigate(`/pesquisa/${pesquisa}`);
    }
  }

  return(
    <>
      <nav className="bg-gradient-to-r text-white from-slate-900 to-slate-950 p-3 md:p-5 lg:px-16 flex flex-col md:flex-row items-center justify-evenly">
        <Link to={'/'}><h1 className="text-2xl font-bold">MelodyMingler.</h1></Link>

        <div className="md:hidden mt-3">
        {logged && (<PerfilMin/>)}
        </div>

        <ul className="flex md:gap-5 gap-2 m-5 md:m-0 w-full md:w-auto justify-center">
          {!logged && <li className="cursor-pointer text-[0.9rem] md:text-lg font-bold hover:opacity-70" ><Link to={'/login'}>Login</Link></li>}
          {!logged && <li className="cursor-pointer text-[0.9rem] md:text-lg font-bold hover:opacity-70" ><Link to={'/criarconta'} >Criar Conta</Link></li>}
          {logged && <Link to={"/my"}><li className="cursor-pointer text-[0.9rem] md:text-lg font-bold hover:opacity-70 text-center" >Minhas Avaliações</li></Link>}
          <li className="cursor-pointer text-[0.9rem] md:text-lg font-bold hover:opacity-70 text-center" >Albuns do Momento</li>
        </ul>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            id="pesqInput"
            onChange={(e)=> setPesquisa(e.target.value)}
            type="text" 
            className="w-48 h-8 rounded-2xl outline-none bg-slate-800 px-4 focus:bg-slate-700 transition-all"/>
          <label htmlFor="pesqInput"><Link to={pesquisa.length > 0 ? `/pesquisa/${pesquisa}`: null}><i className="fa-solid fa-magnifying-glass hover:scale-110 cursor-pointer transition"></i></Link></label>
        </form>
        <div className="hidden md:block">
        {!logged === true ? null : (<PerfilMin/>)}
        </div>
      </nav>
    </>
  )
}