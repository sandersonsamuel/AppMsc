import { auth } from "../configs/FirebaseConfigs"
export function PerfilMin(){

  const user = auth.currentUser
  const userName = [] = user.displayName.split(' ')

  return(
    <>
      <div className="flex gap-3 justify-center items-center">
        <div className="">
        <h1 className="text-xl cursor-pointer">{userName[0]}</h1>
        </div>
        <div>
          <img className="w-14 rounded-full cursor-pointer" src={user.photoURL} alt="foto de perfil do usuário" />
        </div>
      </div>
    </>
  )
}