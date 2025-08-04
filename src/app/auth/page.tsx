"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const success = await login(email, password)
    
    if (!success) {
      setError('Email ou senha incorretos')
    }
  }

  const quickLogin = (userEmail: string) => {
    setEmail(userEmail)
    setPassword('123456')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center">
              <span className="text-green-900 font-bold text-2xl">R</span>
            </div>
            <span className="text-white text-3xl font-bold">RaspaWin</span>
          </div>
          <p className="text-green-100">Entre na sua conta</p>
        </div>

        {/* Login Form */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Login</CardTitle>
            <CardDescription className="text-green-100">
              Digite suas credenciais para acessar a plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-green-200"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-green-200"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <Alert className="bg-red-500/20 border-red-500/50">
                  <AlertDescription className="text-red-200">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-green-400 text-green-900 hover:bg-green-300"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            {/* Quick Login Options */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-green-100 text-sm mb-3 text-center">Acesso rápido para demonstração:</p>
              
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between bg-white/5 border-white/20 text-white hover:bg-white/10"
                  onClick={() => quickLogin('super@raspawin.com')}
                >
                  <span>Super Admin</span>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-200">
                    Gestão Total
                  </Badge>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between bg-white/5 border-white/20 text-white hover:bg-white/10"
                  onClick={() => quickLogin('admin@cliente1.com')}
                >
                  <span>Cliente Admin</span>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-200">
                    Gestão Cliente
                  </Badge>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between bg-white/5 border-white/20 text-white hover:bg-white/10"
                  onClick={() => quickLogin('jogador@teste.com')}
                >
                  <span>Jogador</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-200">
                    Experiência Final
                  </Badge>
                </Button>
              </div>
              
              <p className="text-xs text-green-200 mt-3 text-center">
                Senha padrão: <code className="bg-white/10 px-1 rounded">123456</code>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-green-200 hover:text-white hover:bg-white/10"
          >
            ← Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  )
}
