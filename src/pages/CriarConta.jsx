import { useEffect, useState } from "react"
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { auth, databaseApp} from "../configs/firebase"
import { Link, useNavigate } from "react-router-dom"


export function CriarConta(){

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [erro, setErro] = useState(null)

  const navigate = useNavigate()

  const provider = new GoogleAuthProvider()

  function sigInGoogle(){
    signInWithPopup(auth, provider).then(result=>{
      navigate('/')
    }).catch(error=> console.log(error))
  }

  async function CreatAccount(event){
    event.preventDefault()

    if (password.length < 6){
      setErro("A senha deve conter pelo menos 6 caracteres")
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>{
        const user = userCredential.user

        updateProfile(user, { displayName: userName })

        setEmail('')
        setUserName('')
        setPassword('')

        navigate('/')
        
      }).catch((error)=>{
        console.log('não foi possivel criar a conta ' + error)
        if(error.message === 'Firebase: Error (auth/email-already-in-use).'){
          setErro("Já possui uma conta cadastrada neste Email.")
        }
      })
    }

  }

  return(
    <>
      <div className="w-full h-screen bg-gradient-to-tr from-slate-900 to-slate-950 text-white lg:justify-center flex md:flex-row flex-col items-center p-2 sm:p-5 md:p-10 sm:gap-10">
        <div className="flex gap-4 flex-col md:w-2/5">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl w-full font-bold text-center md:text-start">MelodyMingler</h2>
          <h1 className="hidden md:block text-2xl">Conecte-se conosco, explore o universo da música através das avaliações e interaja com amigos. Entre agora e faça parte da nossa comunidade musical!</h1>
        </div>
        <form onSubmit={CreatAccount} className="min-h-4/5 w-full sm:w-[27rem] sm:bg-neutral-950 rounded-xl p-5 sm:p-10 flex flex-col gap-4 justify-center">

          <h1 className="text-5xl text-center font-semibold mb-5">Criar Conta</h1>

          <input
            type="text"
            className="w-full h-12 outline-none border-2 border-slate-300 rounded-md p-5 bg-transparent"
            placeholder="Usuário"
            onChange={event=> setUserName(event.target.value)}
            value={userName}
            required
          />

          <input
            type="email"
            autoComplete="on"
            className="w-full h-12 outline-none border-2 border-slate-300 rounded-md p-5 bg-transparent"
            placeholder="Email"
            onChange={event=> setEmail(event.target.value)}
            value={email}
            required
          />

          <input
            type="password"
            autoComplete="on"
            className="w-full h-12 outline-none border-2 border-slate-300 rounded-md p-5 bg-transparent"
            placeholder="Senha"
            onChange={event=> setPassword(event.target.value)}
            value={password}
            required
          />

          <input
            type="submit"
            className="w-full bg-neutral-800 h-12 rounded-md text-white cursor-pointer hover:bg-gradient-to-r 
            hover:outline outline-2 outline-blue-900 shadow-2xl hover:shadow-slate-900 transition-shadow"
            value={"Criar Conta"}
          />

          <button
            type="button"
            onClick={sigInGoogle}
            className="w-full text-blue-700 h-12 shadow-custom border-2 hover:bg-slate-200 border-slate-300 rounded-md space-x-3 flex items-center justify-center">
            <i className="fa-brands fa-google"></i>

            <p>Entre com o Google</p>
          </button>

          <Link to={'/login'} className="text-center text-blue-600 cursor-pointer">
            Já tenho uma Conta
          </Link>
          <p className="text-center text-red-500">{erro}</p>
        </form>
        
      </div>
    </>
  )
}