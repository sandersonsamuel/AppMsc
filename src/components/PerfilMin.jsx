import { auth } from "../configs/firebase"
import { reload, signOut } from "firebase/auth"

export function PerfilMin(){

  const user = auth.currentUser

  if (!user){
    return null
  }

  const userName = [] = user.displayName.split(' ')
  const primeiraLetra = userName[0][0]

  function logOut (){
    signOut(auth)
    location.reload(true)
  }

  

  return(
    <>
      <div className="flex gap-3 justify-center items-center md:rounded-md transition-all max-h-10">
        <div className="flex justify-center items-center">
          <h1 className="hidden lg:block text-xl cursor-pointer">{userName[0]}</h1>
        </div>
        {user.photoURL ? <div>
          <img className="w-10 rounded-full cursor-pointer" src={user.photoURL} alt="foto de perfil do usuário" />
        </div>: <div> <div className="flex justify-center items-center w-10 rounded-full cursor-pointer h-10 bg-neutral-600">{primeiraLetra}</div></div>}
        <i onClick={logOut} className="fa-solid fa-right-from-bracket text-xl cursor-pointer text-red-500"></i>
      </div>
    </>
  )
}