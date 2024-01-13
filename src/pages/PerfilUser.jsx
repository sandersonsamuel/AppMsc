import { useParams } from "react-router-dom"
import { auth } from "../configs/firebase"
import { useNavigate } from "react-router-dom"
import 'firebase/firestore';

export const PerfilUser = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  

  if (!auth.currentUser){
    navigate('/')
  }else{
    let creationTime = auth.currentUser.metadata.creationTime
    let date = new Date(creationTime)
    let dataCriacao = date.toLocaleDateString('pt-BR')

    return (
      <div className="w-full min-h-screen bg-gradient-to-bl from-slate-900 to-slate-950 text-white flex flex-col items-center">
        
        <div className="w-11/12 md:w-1/2 h-72 shadow-2xl border-2 bg-gray-900 rounded-md border-slate-900 flex m-7 items-center justify-center md:justify-start">
          <div className="md:mx-16 flex w-10/12 flex-col md:flex-row items-center gap-5 md:gap-10">
            {auth.currentUser.photoURL && <img className="min-w-24 min-h-24 max-w-24 max-h-24 md:w-36 md:h-36 rounded-full border-2" src={auth.currentUser.photoURL} alt={`Foto de perfil do usuário ${auth.currentUser.displayName}`} />}
            {!auth.currentUser.photoURL && <div className="min-w-24 min-h-24 max-w-24 max-h-24 md:w-36 md:h-36 flex items-center justify-center text-3xl rounded-full bg-neutral-700 border-2"><i className="fa-regular fa-user"></i></div>}
            
            <div className="font-semibold w-full overflow-hidden">

              <p className="md:text-4xl overflow-hidden text-nowrap text-ellipsis">{auth.currentUser.displayName}</p>
              <p className="md:text-4xl overflow-hidden text-nowrap text-ellipsis">KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK</p>

              <div className="my-2">
                <p className="text-sm">Perfil criado em {dataCriacao}</p>
              </div>

            </div>
            
          </div>
        </div>

        

      </div>
    )
  }

  
}
