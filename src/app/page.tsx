"use client"

import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      // Redirecionar baseado no role do usuário
      switch (user.role) {
        case 'super-admin':
          router.push('/super-admin')
          break
        case 'client-admin':
          router.push('/admin')
          break
        case 'player':
          router.push('/play')
          break
      }
    }
  }, [user, router])

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Redirecionando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
              <span className="text-green-900 font-bold text-xl">R</span>
            </div>
            <span className="text-white text-2xl font-bold">RaspaWin</span>
          </div>
          <Button 
            onClick={() => router.push('/auth')}
            variant="outline" 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Entrar
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-400 text-green-900 hover:bg-green-300">
            Plataforma Whitelabel
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Sua Plataforma de
            <span className="block text-green-400">Raspadinhas</span>
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Crie, customize e gerencie sua própria plataforma de jogos de raspadinha. 
            Solução completa whitelabel com analytics avançados e total personalização.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => router.push('/auth')}
              className="bg-green-400 text-green-900 hover:bg-green-300 text-lg px-8 py-3"
            >
              Começar Agora
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-3"
            >
              Ver Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-900 text-2xl">🎯</span>
              </div>
              <CardTitle className="text-white">Customização Total</CardTitle>
              <CardDescription className="text-green-100">
                Personalize cores, logos, prêmios e toda a experiência visual da sua marca.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-900 text-2xl">📊</span>
              </div>
              <CardTitle className="text-white">Analytics Avançados</CardTitle>
              <CardDescription className="text-green-100">
                Relatórios detalhados de engajamento, retenção e performance financeira.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-900 text-2xl">🚀</span>
              </div>
              <CardTitle className="text-white">Deploy Rápido</CardTitle>
              <CardDescription className="text-green-100">
                Sua plataforma no ar em minutos. Solução whitelabel pronta para usar.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Demo Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Experimente a Plataforma
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-green-100 mb-4">Credenciais de Teste:</div>
            <div className="space-y-2 text-sm text-green-200">
              <div><strong>Super Admin:</strong> super@raspawin.com</div>
              <div><strong>Cliente Admin:</strong> admin@cliente1.com</div>
              <div><strong>Jogador:</strong> jogador@teste.com</div>
              <div className="pt-2 border-t border-white/20">
                <strong>Senha:</strong> 123456
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-white/20">
        <div className="text-center text-green-200">
          <p>&copy; 2024 RaspaWin. Plataforma Whitelabel de Raspadinhas.</p>
        </div>
      </footer>
    </div>
  )
}
