import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Album } from "./components/Album"
import { ArtistaAlbuns } from "./components/ArtistaAlbuns"

export function AppRoutes(){

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/album/:id" element={<Album/>}/>
        <Route path="artista/albuns/:id" element={<ArtistaAlbuns/>}/>
      </Routes>
    </Router>
  )
}