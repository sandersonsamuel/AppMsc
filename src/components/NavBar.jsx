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
  
  const [menu, setMenu] = useState(false)

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
      <nav className="bg-gradient-to-br text-white to-slate-900 from-slate-950 p-3 md:p-5 lg:px-10 flex flex-col-reverse md:flex-row items-center justify-between gap-2 flex-wrap">
        <div className="hidden md:block"><Link to={'/'}><h1 className="text-2xl font-bold">MelodyMingler.</h1></Link></div>

        <ul className="hidden lg:flex md:gap-5 gap-2 m-5 md:m-0 w-full md:w-auto justify-center">
          {!logged && <li className="cursor-pointer text-[0.9rem] md:text-lg font-bold hover:opacity-70" ><Link to={'/login'}>Login</Link></li>}
          {!logged && <li className="cursor-pointer text-[0.9rem] md:text-lg font-bold hover:opacity-70" ><Link to={'/criarconta'} >Criar Conta</Link></li>}
          {logged && <Link to={"/my"}><li className="cursor-pointer lg:text-lg font-bold hover:opacity-70 text-center" >Minhas Avaliações</li></Link>}
          <li className="cursor-pointer lg:text-lg font-bold hover:opacity-70 text-center" >Albuns do Momento</li>
        </ul>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            id="pesqInput"
            onChange={(e)=> setPesquisa(e.target.value)}
            type="text" 
            className="w-52 xl:w-80 h-8 rounded-2xl outline-none bg-slate-800 px-4 focus:bg-slate-700 transition-all"/>
          <label htmlFor="pesqInput"><Link to={pesquisa.length > 0 ? `/pesquisa/${pesquisa}`: null}><i className="fa-solid fa-magnifying-glass hover:scale-110 cursor-pointer transition"></i></Link></label>
        </form>

        
        {!logged === true ? null : (<PerfilMin/>)}
        
        <div className="lg:hidden">
          {!logged && <li className="list-none cursor-pointer text-xl md:text-lg font-bold hover:opacity-70" ><Link to={'/login'}>Entrar</Link></li>}
        </div>

        <div className="lg:hidden flex gap-3 items-center">
          <i 
            className="fa-solid fa-bars text-xl"
            onClick={()=> setMenu(!menu)}
          ></i>
          <Link className="md:hidden" to={'/'}><h1 className=" text-2xl font-bold">MelodyMingler.</h1></Link>
        </div>
        
      </nav>
      { menu &&
      <ul className="traniti bg-gradient-to-br text-white to-slate-900 from-slate-950 lg:hidden md:gap-5 gap-2 p-2 md:m-0 md:w-auto justify-center flex flex-col w-100">
        {logged && <Link to={"/my"}><li className="text-xl cursor-pointer lg:text-lg font-bold hover:opacity-70 text-center" >Minhas Avaliações</li></Link>}
        <li className="cursor-pointer text-xl lg:text-lg font-bold hover:opacity-70 text-center" >Albuns do Momento</li>
      </ul>
      }
    </>
  )
}