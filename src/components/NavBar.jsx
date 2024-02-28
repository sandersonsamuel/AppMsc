import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PerfilMin } from "./PerfilMin";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../configs/firebase";
import 'react-slidedown/lib/slidedown.css';
import '../App.css'

export function NavBar(){

  const [pesquisa, setPesquisa] = useState("")
  const navigate = useNavigate()

  const [logged, setLogged] = useState(null)
  
  const [menu, setMenu] = useState(false)
  const [menuUl, setMenuUl] = useState(false)

  useEffect(()=>{
    if (!menu){
      setMenuUl(false)
    }else{
      setTimeout(() => {
        setMenuUl(true)
      }, 500);
    }
  }, [menu])

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
      <nav className={`w-full h-40 md:h-20 lg:h-20 ${menu && 'h-52 md:h-28'} duration-300 text-white bg-neutral-950 p-3 md:p-5 flex flex-col md:gap-2`}>
        <div className="w-full flex flex-col md:flex-row items-center md:items-start md:justify-between gap-2 flex-wrap">
          <div className="hidden md:block"><Link to={'/'}><h1 className="text-2xl font-bold">MelodyMingler.</h1></Link></div>

            <ul className="hidden lg:flex md:gap-5 gap-2 m-5 md:m-0 w-full md:w-auto justify-center">
              {!logged && <li className="cursor-pointer text-[0.9rem] md:text-lg font-bold hover:opacity-70" ><Link to={'/login'}>Login</Link></li>}
              {!logged && <li className="cursor-pointer text-[0.9rem] md:text-lg font-bold hover:opacity-70" ><Link to={'/criarconta'} >Criar Conta</Link></li>}
              {logged && <Link to={"/my"}><li className="cursor-pointer lg:text-lg font-bold hover:opacity-70 text-center" >Minha Atividade</li></Link>}
            </ul>
            
            <div className="md:hidden flex gap-3 items-center">
              {logged && 
                <i 
                className="fa-solid fa-bars text-xl cursor-pointer"
                onClick={()=> setMenu(!menu)}
              ></i>
              }
              <Link className="md:hidden" to={'/'}><h1 className=" text-2xl font-bold">MelodyMingler.</h1></Link>
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                id="pesqInput"
                onChange={(e)=> setPesquisa(e.target.value)}
                type="text" 
                className="w-52 xl:w-64 h-8 rounded-2xl outline-none bg-neutral-800 px-4 focus:bg-neutral-700 transition-all"/>
              <label htmlFor="pesqInput"><Link to={pesquisa.length > 0 ? `/pesquisa/${pesquisa}`: null}><i className="fa-solid fa-magnifying-glass hover:scale-110 cursor-pointer transition"></i></Link></label>
            </form>


            {!logged === true ? null : (<PerfilMin/>)}

            <div className="hidden md:block lg:hidden">
              <i 
                className="fa-solid fa-bars text-xl cursor-pointer"
                onClick={()=> setMenu(!menu)}
              ></i>
            </div>

            <div className="lg:hidden">
              {!logged && <li className="list-none cursor-pointer text-xl md:text-lg font-bold hover:opacity-70" ><Link to={'/login'}>Entrar</Link></li>}
            </div>

        </div>

        { menuUl &&
          logged &&
            <ul className="text-white md:flex gap-20 lg:hidden md:justify-center transition-all">
              {logged && <Link to={"/my"}><li className="text-xl cursor-pointer lg:text-lg font-bold hover:opacity-70 text-center" >Minha Atividade</li></Link>}
              <li className="cursor-pointer text-xl lg:text-lg font-bold hover:opacity-70 text-center" >Albuns do Momento</li>
            </ul>
          }
        
      </nav>
      
    </>
  )
}