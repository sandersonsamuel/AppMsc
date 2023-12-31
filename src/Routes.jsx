import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Album } from "./components/Album"
import { ArtistaAlbuns } from "./components/ArtistaAlbuns"
import {Pesquisa} from './pages/Pesquisa'
import { CriarConta } from "./pages/CriarConta"
import { auth } from "./configs/firebase"
import { onAuthStateChanged } from "@firebase/auth"
import { useState } from "react"
import { LoggedArea } from "./pages/LoggedArea"

export function AppRoutes(){

  const [user, setUser] = useState(null)

  useState(()=>{
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
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pesquisa/:id" element={<Pesquisa/>}/>
        <Route path="/my" element={ user ? <LoggedArea/> : <Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/criarconta" element={<CriarConta/>}/>
        <Route path="/album/:id" element={<Album/>}/>
        <Route path="artista/albuns/:id" element={<ArtistaAlbuns/>}/>
      </Routes>
    </Router>
  )
}