import { useState } from "react"
import { GoogleAuthProvider, sendPasswordResetEmail} from "firebase/auth"
import { auth} from "../configs/firebase"
import { useNavigate } from "react-router-dom"

export const EsqueceuSenha = () => {

  const [email, setEmail] = useState("")
  const [erro, setErro] = useState(null)

  const provider = new GoogleAuthProvider()

  function recoveryPassword(event) {
    event.preventDefault()
    sendPasswordResetEmail(auth, email).then(()=>{
      setErro('Email enviado com sucesso, verifique sua caixa de entrada.')
    }).catch((error)=>{
      setErro("Algo deu errado")
      console.log(error)
    })

  }


  return (
    <div className="w-full h-screen bg-gradient-to-tr from-slate-900 to-slate-950 text-white justify-center flex md:flex-row flex-col items-center p-2 sm:p-5 md:p-10 sm:gap-10">

        <form onSubmit={recoveryPassword} className="w-full sm:w-[27rem] sm:bg-neutral-950 rounded-xl p-5 sm:p-10 flex flex-col gap-4 justify-center">

          
          <h1 className="text-3xl text-center font-semibold mb-5">Recuperar senha</h1>

          <input
            type="email"
            autoComplete="on"
            className="w-full h-12 outline-none border-2 border-slate-300 rounded-md p-5 bg-transparent"
            placeholder="Email"
            onChange={event=> setEmail(event.target.value)}
            required
          />

          <input
            type="submit"
            className="w-full bg-neutral-800 h-12 rounded-md text-white cursor-pointer hover:bg-gradient-to-r 
            hover:outline outline-2 outline-blue-900 shadow-2xl hover:shadow-slate-900 transition-shadow"
            value={"Recuperar"}
          />

          <p className="text-center text-red-500">{erro}</p>
        </form>
        
      </div>
  )
}