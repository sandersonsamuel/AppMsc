import { useState, useEffect } from 'react'
import { Login } from './pages/Login';
import { AppRoutes } from './Routes';
import { auth } from './configs/firebase';
import { SyncLoader } from 'react-spinners'
import { Home } from './pages/Home';


function App() {

  return (
    <>
      <AppRoutes/>
    </>
  )
}

export default App
