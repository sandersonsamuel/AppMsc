import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export function AppRoutes(){

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
    </Router>
  )
}