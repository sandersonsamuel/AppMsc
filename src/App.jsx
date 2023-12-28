import { useState, useEffect } from 'react'
import { Login } from './pages/Login';
import { AppRoutes } from './Routes';
import { auth } from './configs/firebase';
import { SyncLoader } from 'react-spinners'


function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    });

    return () => unsubscribe();
  }, [auth])

  if (loading) {
    return (
      <div className='w-screen h-screen flex justify-center items-center bg-neutral-800'>
        <SyncLoader size={30} color="#364ed6" />
      </div>
    )
  }

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
