import { AlbumGirando } from "../components/AlbumGirando";
import Typewriter from 'typewriter-effect';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../configs/firebase";
import { FooterHome } from "../components/FooterHome";

export function Home(){

  const [user, setUser] = useState(null)

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if (user){
        setUser(user)
      }else{
        return null
      }
    })
  },[])

  return(
    <>
      <div className="py-5 bg-gradient-to-bl from-slate-900 to-slate-950 w-full min-h-screen text-white pb-16">
        
        <AlbumGirando/>

        <p className="text-3xl md:text-5xl text-center font-thin m-3">Compartilhe a sua crítica sobre os discos que escutou.</p>
        <p className="text-2xl md:text-5xl text-center font-bold m-3 mt-20">Busque por Artistas ou Albuns</p>

        <div className="text-2xl md:text-5xl text-center font-semibold mt-5">
          <Typewriter
          options={{
            strings: ['Kendrick Lamar', 'To Pimp a Butterfly'],
            autoStart: true,
            loop: true,
          }}
          />
        </div>

        <div className="w-full flex items-center flex-col">
          <div className="bg-slate-900 border border-slate-800 rounded-md p-5 flex items-center gap-5 m-5 mt-10">
            <div>
              <img className="w-64 rounded-full" title="Kendrick Lamar" src={"https://blackmusicscholar.com/wp-content/uploads/2017/11/19955250_2359106054314953_8557416230665846784_n.jpg"} alt="" />
              <h1 className="font-thin md:text-2xl text-center md:font-semibold">Artista</h1>
            </div>
            <div>
              <img className="w-64" title="To Pimp a Butterfly" src={"https://upload.wikimedia.org/wikipedia/pt/c/c9/To_Pimp_a_Butterfly.jpg"} alt="" />
              <h1 className="font-thin md:text-2xl text-center md:font-semibold">Album</h1>
            </div>
          </div>
        </div>

        <div className="w-full flex-col flex items-center">
            <Link to={!user ? '/login' : '/pesquisa/kendrick lamar'}>
              <button className="bg-blue-800 font-bold md:text-lg rounded-md p-3 mt-3 hover:opacity-75">Avalie Agora</button>
            </Link>
        </div>

      </div>
      <FooterHome/>
    </>
  )
}