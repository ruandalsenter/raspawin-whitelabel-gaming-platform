"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export type UserRole = 'super-admin' | 'client-admin' | 'player'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  clientId?: string // Para client-admin e players
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users para demonstração
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'super@raspawin.com',
    role: 'super-admin'
  },
  {
    id: '2',
    name: 'Cliente Admin',
    email: 'admin@cliente1.com',
    role: 'client-admin',
    clientId: 'client-1'
  },
  {
    id: '3',
    name: 'Jogador Teste',
    email: 'jogador@teste.com',
    role: 'player',
    clientId: 'client-1'
  }
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('raspawin-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const foundUser = mockUsers.find(u => u.email === email)
    
    if (foundUser && password === '123456') { // Senha padrão para demo
      setUser(foundUser)
      localStorage.setItem('raspawin-user', JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('raspawin-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
