import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Album } from "./pages/Album"

export function AppRoutes(){

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Album/:id" element={<Album/>}/>
      </Routes>
    </Router>
  )
}