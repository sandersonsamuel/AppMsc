import { Link, useParams } from "react-router-dom"
import { auth, databaseApp } from "../configs/firebase"
import { useNavigate } from "react-router-dom"
import 'firebase/firestore';
import { useEffect, useState } from "react";
import { GetAvalAlbum, GetAvalMusica } from "../components/GetAval";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const PerfilUser = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [avaliacoesMusica, setAvaliacoesMusica] = useState(null)
  const [avaliacoesAlbum, setAvaliacoesAlbum] = useState(null)

  const [userName, setUserName] = useState('')

  function updateUserDB(){
    const uid = auth.currentUser.uid

    const docRef = doc(databaseApp, 'users', uid)
    setDoc(docRef, {
      [uid]: {
        uid: uid,
        userName: auth.currentUser.displayName,
        photoUrl: auth.currentUser.photoURL,
      }    }, {merge:true})

  }

  const handleUserName = (event) =>{
    setUserName(event.target.value)
  }

  const alterarDisplayName = () =>{
    if (userName.length > 1) {
      updateProfile(auth.currentUser, {
        displayName: userName
      }).then(()=>{
        setUserName('')
        updateUserDB()
      }).catch((error)=>{
        console.log(error)
      })
    }
  }

  useEffect(()=>{
    GetAvalMusica(setAvaliacoesMusica)
    GetAvalAlbum(setAvaliacoesAlbum)
  },[])
  

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

              {<div className="md:flex my-2 gap-5">
                <p className="text-center md:text-start text-sm md:text-md">Musicas Avaliadas: {avaliacoesMusica ? Object.values(avaliacoesMusica).length : 0}</p>
                <p className="text-center md:text-start text-sm md:text-md">Álbuns Avaliados: {avaliacoesMusica ? Object.values(avaliacoesAlbum).length : 0}</p>
              </div>}

            </div>
            
          </div>
        </div>

      <div className="w-10/12 md:w-1/2 p-4 md:p-10 md:py-7 bg-gray-800 text-white flex flex-col rounded-lg">
        
        <nav className="w-full">
          <ul className="flex flex-col items-center md:flex-row md:items-start justify-between text-xl font-semibold border-b-2 border-gray-500">
            <li className="text-center">Alterar Informações</li>
          </ul>
        </nav>

        <div className="w-full h-full py-5 flex flex-col gap-2">
          <div className="w-full flex gap-2 justify-between">
            <input value={userName} onChange={handleUserName} placeholder={auth.currentUser.displayName} className="h-8 bg-slate-800 rounded-md w-full" type="text" />
            <button disabled={userName.length <= 0} onClick={alterarDisplayName} className="px-3 bg-blue-600 rounded-md">Alterar</button>
          </div>
          <Link className="w-full flex justify-center" to={"/esqueceu/"}><button className="px-5 py-1 rounded-md bg-red-600 w-full lg:w-52">Redefinir Senha</button></Link>
        </div>
        
      </div>

      </div>
    )
  }
}
