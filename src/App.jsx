import { useState, useEffect } from 'react'
import { Login } from './pages/Login';
import { AppRoutes } from './Routes';
import { auth } from './configs/firebase';

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    });

    return () => unsubscribe();
  }, [auth])

  return (
    <>
      {user ? (
        <AppRoutes/>
      ):(
        <Login/>
      )}
    </>
  )
}

export default App
