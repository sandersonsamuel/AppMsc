import { useState, useEffect } from 'react'
import { Home } from './pages/Home';
import { Login } from './pages/Login';

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
      {
        user === null? (
          <Login/>
        ): (<Home/>)
      }
    </>
  )
}

export default App
