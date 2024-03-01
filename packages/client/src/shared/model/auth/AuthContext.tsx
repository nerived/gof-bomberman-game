import React, { createContext, useState } from 'react'

interface IAuthContext {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = () => setIsLoggedIn(true)
  const logout = () => setIsLoggedIn(false)

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
