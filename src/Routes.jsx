import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Album } from "./components/Album"
import { ArtistaAlbuns } from "./components/ArtistaAlbuns"
import {Pesquisa} from './pages/Pesquisa'
import { CriarConta } from "./pages/CriarConta"
import { auth } from "./configs/firebase"
import { onAuthStateChanged } from "@firebase/auth"
import { useEffect, useState } from "react"
import { Atividade } from "./pages/Atividade"
import { NavBar } from "./components/NavBar"
import { PerfilUser } from "./pages/PerfilUser"
import { EsqueceuSenha } from "./pages/EsqueceuSenha"

export function AppRoutes(){

  const [user, setUser] = useState(null)

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if (user){
        setUser(user)
      }else{
        return null
      }
    })
  },[])

  return(
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pesquisa/:id" element={<Pesquisa/>}/>
        <Route path="/my" element={ user ? <Atividade/> : <Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/criarconta" element={<CriarConta/>}/>
        <Route path="/album/:id" element={<Album/>}/>
        <Route path="artista/:id" element={<ArtistaAlbuns/>}/>
        <Route path="user/" element={<PerfilUser/>}/>
        <Route path="esqueceu/" element={<EsqueceuSenha/>}/>
      </Routes>
    </Router>
  )
}