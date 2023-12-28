import { auth } from "../configs/firebase"
import { signOut } from "firebase/auth"

export function PerfilMin(){

  const user = auth.currentUser
  const userName = [] = user.displayName.split(' ')

  function logOut (){
    signOut(auth)
  }

  return(
    <>
      <div className="flex gap-3 justify-center items-center">
        <div className="">
        <h1 className="hidden lg:block text-xl cursor-pointer">{userName[0]}</h1>
        </div>
        <div>
          <img className="w-14 md:w-20 rounded-full cursor-pointer" src={user.photoURL} alt="foto de perfil do usuário" />
        </div>
        <i onClick={logOut} className="fa-solid fa-right-from-bracket text-xl cursor-pointer text-red-500"></i>
      </div>
    </>
  )
}