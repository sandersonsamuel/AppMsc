import { useState, useEffect } from 'react'
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AppRoutes } from './Routes';

function App() {

  const [user, setUser] = useState(true)

  /* useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []); */

  return (
    <>
      <AppRoutes/>
    </>
  )
}

export default App
