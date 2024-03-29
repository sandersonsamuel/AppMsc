import { useState } from "react"
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from "firebase/auth"
import { auth, databaseApp } from "../configs/firebase"
import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { doc, setDoc } from "firebase/firestore"

export function Login(){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [erro, setErro] = useState(null)
  const navigate = useNavigate()

  const provider = new GoogleAuthProvider()

  function login(event){

    event.preventDefault()

    signInWithEmailAndPassword(auth, email, password).then((response)=>{
      updateUserDB()
      navigate('/')
    }).catch((error)=>{
      console.log(error)
      if (error.message === 'Firebase: Error (auth/invalid-credential).'){
        setErro("Email ou senha incorretos")
      }
    })
  }

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

  function sigInGoogle(){
    signInWithPopup(auth, provider).then(result=>{
      updateUserDB()
      navigate('/')
    }).catch(error=> {
      console.log(error)
      
    })
  }

  return(
    <>
      <div className="w-full h-screen bg-gradient-to-tr from-slate-900 to-slate-950 text-white justify-center flex md:flex-row flex-col items-center p-2 sm:p-5 md:p-10 sm:gap-10">
      <div className="flex gap-4 flex-col md:w-2/5">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl w-full font-bold text-center md:text-start">MelodyMingler</h2>
          <h1 className="hidden md:block text-2xl">Conecte-se conosco, explore o universo da música através das avaliações e interaja com amigos. Entre agora e faça parte da nossa comunidade musical!</h1>
        </div>
        <form onSubmit={login} className="h-4/5 w-full sm:w-[27rem] sm:bg-neutral-950 rounded-xl p-5 sm:p-10 flex flex-col gap-4 justify-center">

          
          <h1 className="text-5xl text-center font-semibold mb-5">Login</h1>

          <input
            type="email"
            autoComplete="on"
            className="w-full h-12 outline-none border-2 border-slate-300 rounded-md p-5 bg-transparent"
            placeholder="Email"
            onChange={event=> setEmail(event.target.value)}
            required
          />

          <input
            type="password"
            autoComplete="on"
            className="w-full h-12 outline-none border-2 border-slate-300 rounded-md p-5 bg-transparent"
            placeholder="Senha"
            onChange={event=> setPassword(event.target.value)}
            required
          />

          <input
            type="submit"
            className="w-full bg-neutral-800 h-12 rounded-md text-white cursor-pointer hover:bg-gradient-to-r 
            hover:outline outline-2 outline-blue-900 shadow-2xl hover:shadow-slate-900 transition-shadow"
            value={"Entrar"}
          />

          

          <button
            type="button"
            onClick={sigInGoogle}
            className="w-full text-blue-700 h-12 shadow-custom border-2 hover:bg-slate-200 border-slate-300 rounded-md space-x-3 flex items-center justify-center">
            <i className="fa-brands fa-google"></i>

            <p>Entre com o Google</p>
          </button>

          <div className="flex flex-col md:flex-row justify-between">
            
            <Link to={'/criarconta'} className="text-center text-blue-600 cursor-pointer">
              Não tenho uma conta
            </Link>
            
            <Link to={'/esqueceu'} className="text-center text-red-600 cursor-pointer">
              Esqueci a senha
            </Link>

            
          </div>

          <p className="text-center text-red-500">{erro}</p>
        </form>
        
      </div>
    </>
  )
}