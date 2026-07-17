import React, { useState, useEffect } from 'react'
import MyContext from './MyContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Firebase/firebase'

const ContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <MyContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </MyContext.Provider>
  )
}

export default ContextProvider;
