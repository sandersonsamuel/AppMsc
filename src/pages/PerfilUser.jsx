import { useParams } from "react-router-dom"
import { auth } from "../configs/firebase"
import { useNavigate } from "react-router-dom"
import 'firebase/firestore';
import { useEffect, useState } from "react";
import { GetAvalMusica } from "../components/GetAval";

export const PerfilUser = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [avaliacoes, setAvaliacoes] = useState(null)
  const [avaliacoesUser, setAvaliacoesUser] = useState(null)
  
  const [qteAvas, setQteAvas] = useState(0)

  useEffect(()=>{

    if (!auth.currentUser){
      navigate('/')
    }

    GetAvalMusica(setAvaliacoes)
  },[])

  useEffect(()=>{
    let avas = []
    if (avaliacoes){
      Object.values(avaliacoes).forEach((avaliacao)=>{
        if (avaliacao.idUser == auth.currentUser.uid){
          avas.push(avaliacao)
        }
      })
      setAvaliacoesUser(avas)
    }else{
      setAvaliacoesUser(null)
    }
  }, [avaliacoes])

  useEffect(()=>{
    if(avaliacoesUser){
      setQteAvas(Object.values(avaliacoesUser).length)
    }
  },[avaliacoesUser])
  

  if (auth.currentUser){
    let creationTime = auth.currentUser.metadata.creationTime
    let date = new Date(creationTime)
    let dataCriacao = date.toLocaleDateString('pt-BR')

    return (
      <div className="w-full min-h-screen bg-gradient-to-bl from-slate-900 to-slate-950 text-white flex flex-col items-center pb-20">
        
        <div className="w-11/12 md:w-1/2 md:p-5 lg:p-10 h-72 shadow-2xl border-2 bg-gray-900 rounded-md border-slate-900 flex m-7 items-center justify-center md:justify-start">
          <div className="flex w-full flex-col md:flex-row items-center gap-5 md:gap-5">
            {auth.currentUser.photoURL && <img className="min-w-24 min-h-24 max-w-24 max-h-24 md:w-36 md:h-36 rounded-full border-2" src={auth.currentUser.photoURL} alt={`Foto de perfil do usuário ${auth.currentUser.displayName}`} />}
            {!auth.currentUser.photoURL && <div className="min-w-24 min-h-24 max-w-24 max-h-24 md:w-36 md:h-36 flex items-center justify-center text-3xl rounded-full bg-neutral-700 border-2"><i className="fa-regular fa-user"></i></div>}
            
            <div className="font-semibold w-full overflow-hidden gap-2">

              <p className="text-center md:text-start md:text-4xl overflow-hidden text-nowrap text-ellipsis">{auth.currentUser.displayName}</p>
              <p className="text-center md:text-start md:text-4xl md:min-h-12 overflow-hidden text-nowrap text-ellipsis">{auth.currentUser.email}</p>

              <div className="md:flex my-2 gap-5">
                <p className="text-center md:text-start text-sm md:text-md">Musicas Avaliadas: {qteAvas}</p>
                <p className="text-center md:text-start text-sm md:text-md">Albuns Avaliados: {'...'}</p>
              </div>

            </div>
            
          </div>
        </div>

      <div className="w-10/12 h-96 p-10 py-7 bg-gray-800 text-white flex flex-col rounded-lg">
        <nav className="w-full">
          <ul className="flex flex-col items-center md:flex-row md:items-start justify-between text-xl font-semibold border-b-2 border-gray-500">
            <li>Informações</li>
            <li>Alterar Informações</li>
          </ul>
        </nav>
      </div>

      </div>
    )
  }

  
}
