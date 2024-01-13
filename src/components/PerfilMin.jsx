import { Link } from "react-router-dom"
import { auth } from "../configs/firebase"
import { signOut } from "firebase/auth"

export function PerfilMin(){

  const user = auth.currentUser

  if (user){/* 
    const userName = [] = user.displayName.split(' ') */
    /* const primeiraLetra = userName[0][0] */
  
    function logOut (){
      signOut(auth)
      location.reload(true)
    }

    return(
      <>
          <div className="flex gap-3 justify-center items-center md:rounded-md transition-all max-h-10">
            <Link to={'/user'} className="flex gap-2">
              <div className="flex justify-center items-center">{/* 
                <h1 className="hidden lg:block text-xl cursor-pointer">{userName[0]}</h1> */}
              </div>
              {user.photoURL ? <div>
                <img className="w-10 rounded-full cursor-pointer" src={user.photoURL} alt="foto de perfil do usuário" />
              </div>: <div className="flex text-center items-center justify-center bg-neutral-700 w-10 h-10 rounded-full font-semibold text-sm text-gray-300"><i className="fa-regular fa-user"></i></div>}
            </Link>
            <i onClick={logOut} className="fa-solid fa-right-from-bracket text-xl cursor-pointer text-red-500"></i>
          </div>
      </>
    )
  }else{
    return null    
  }

}