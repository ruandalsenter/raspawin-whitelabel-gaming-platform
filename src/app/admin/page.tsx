"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'

interface GameStats {
  totalGames: number
  totalRevenue: number
  totalUsers: number
  averageGameValue: number
  winRate: number
  topPrizes: Array<{
    name: string
    value: number
    frequency: number
  }>
}

interface BrandingConfig {
  primaryColor: string
  secondaryColor: string
  companyName: string
  logo?: string
  backgroundImage?: string
  welcomeMessage: string
}

interface PrizeConfig {
  id: string
  name: string
  value: number
  probability: number
  emoji: string
  active: boolean
}

const mockStats: GameStats = {
  totalGames: 8540,
  totalRevenue: 15420.50,
  totalUsers: 1250,
  averageGameValue: 1.81,
  winRate: 35.2,
  topPrizes: [
    { name: 'Jackpot', value: 1000, frequency: 12 },
    { name: 'Super Prêmio', value: 500, frequency: 28 },
    { name: 'Grande Prêmio', value: 100, frequency: 156 },
  ]
}

const defaultPrizes: PrizeConfig[] = [
  { id: '1', name: 'Jackpot!', value: 1000, probability: 1, emoji: '💎', active: true },
  { id: '2', name: 'Super Prêmio', value: 500, probability: 2, emoji: '🏆', active: true },
  { id: '3', name: 'Grande Prêmio', value: 100, probability: 5, emoji: '🎁', active: true },
  { id: '4', name: 'Prêmio Médio', value: 50, probability: 10, emoji: '🎯', active: true },
  { id: '5', name: 'Prêmio Pequeno', value: 20, probability: 15, emoji: '🎪', active: true },
  { id: '6', name: 'Prêmio Mínimo', value: 10, probability: 20, emoji: '🎈', active: true },
  { id: '7', name: 'Tente Novamente', value: 0, probability: 47, emoji: '😔', active: true }
]

export default function AdminPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<GameStats>(mockStats)
  const [branding, setBranding] = useState<BrandingConfig>({
    primaryColor: '#10B981',
    secondaryColor: '#059669',
    companyName: 'Casino Digital',
    welcomeMessage: 'Bem-vindo ao nosso cassino!'
  })
  const [prizes, setPrizes] = useState<PrizeConfig[]>(defaultPrizes)

  useEffect(() => {
    if (!user || user.role !== 'client-admin') {
      router.push('/auth')
      return
    }

    // Carregar configurações salvas
    const savedBranding = localStorage.getItem(`branding-${user.clientId}`)
    if (savedBranding) {
      setBranding(JSON.parse(savedBranding))
    }

    const savedPrizes = localStorage.getItem(`prizes-${user.clientId}`)
    if (savedPrizes) {
      setPrizes(JSON.parse(savedPrizes))
    }
  }, [user, router])

  const saveBranding = () => {
    if (user?.clientId) {
      localStorage.setItem(`branding-${user.clientId}`, JSON.stringify(branding))
      alert('Configurações de marca salvas com sucesso!')
    }
  }

  const savePrizes = () => {
    if (user?.clientId) {
      localStorage.setItem(`prizes-${user.clientId}`, JSON.stringify(prizes))
      alert('Configurações de prêmios salvas com sucesso!')
    }
  }

  const updatePrizeProbability = (prizeId: string, probability: number) => {
    setPrizes(prev => prev.map(prize => 
      prize.id === prizeId ? { ...prize, probability } : prize
    ))
  }

  const togglePrizeActive = (prizeId: string) => {
    setPrizes(prev => prev.map(prize => 
      prize.id === prizeId ? { ...prize, active: !prize.active } : prize
    ))
  }

  if (!user) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-blue-900 font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="text-white text-xl font-bold">{branding.companyName} - Admin</h1>
                <p className="text-blue-200 text-sm">Painel de Controle do Cliente</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-500/20 text-blue-200">
                Cliente Admin
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Receita Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-400">
                R$ {stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-green-200 text-sm">+8% este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Jogos Realizados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-400">
                {stats.totalGames.toLocaleString('pt-BR')}
              </p>
              <p className="text-blue-200 text-sm">+12% este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Usuários Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-400">
                {stats.totalUsers.toLocaleString('pt-BR')}
              </p>
              <p className="text-purple-200 text-sm">+5% este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Taxa de Vitória</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-400">{stats.winRate}%</p>
              <p className="text-orange-200 text-sm">Média da plataforma</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white/20">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="prizes" className="data-[state=active]:bg-white/20">
              Configurar Prêmios
            </TabsTrigger>
            <TabsTrigger value="branding" className="data-[state=active]:bg-white/20">
              Personalização
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-white/20">
              Usuários
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Prêmios Mais Populares</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.topPrizes.map((prize, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">{prize.name}</p>
                        <p className="text-gray-300 text-sm">
                          R$ {prize.value.toFixed(2)}
                        </p>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-200">
                        {prize.frequency}x
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Performance Mensal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white">Janeiro</span>
                      <span className="text-gray-300">R$ 12.450</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white">Fevereiro</span>
                      <span className="text-gray-300">R$ 15.420</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white">Março</span>
                      <span className="text-gray-300">R$ 8.200</span>
                    </div>
                    <Progress value={53} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="prizes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Configuração de Prêmios</h2>
              <Button onClick={savePrizes} className="bg-blue-500 hover:bg-blue-600">
                Salvar Configurações
              </Button>
            </div>

            <div className="grid gap-4">
              {prizes.map((prize) => (
                <Card key={prize.id} className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{prize.emoji}</span>
                        <div>
                          <h3 className="text-white font-bold">{prize.name}</h3>
                          <p className="text-gray-300 text-sm">
                            R$ {prize.value.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={prize.active}
                        onCheckedChange={() => togglePrizeActive(prize.id)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-white">Probabilidade</Label>
                        <span className="text-gray-300">{prize.probability}%</span>
                      </div>
                      <Slider
                        value={[prize.probability]}
                        onValueChange={(value) => updatePrizeProbability(prize.id, value[0])}
                        max={50}
                        min={0}
                        step={1}
                        className="w-full"
                        disabled={!prize.active}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-yellow-500/10 border-yellow-500/20 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <span className="text-yellow-400 text-xl">⚠️</span>
                  <div>
                    <h3 className="text-yellow-200 font-bold mb-2">Importante</h3>
                    <p className="text-yellow-100 text-sm">
                      A soma das probabilidades deve ser próxima a 100%. 
                      Atualmente: <strong>{prizes.reduce((sum, p) => sum + p.probability, 0)}%</strong>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Personalização da Marca</h2>
              <Button onClick={saveBranding} className="bg-blue-500 hover:bg-blue-600">
                Salvar Personalização
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Configurações Visuais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Nome da Empresa</Label>
                    <Input
                      value={branding.companyName}
                      onChange={(e) => setBranding(prev => ({ ...prev, companyName: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Mensagem de Boas-vindas</Label>
                    <Input
                      value={branding.welcomeMessage}
                      onChange={(e) => setBranding(prev => ({ ...prev, welcomeMessage: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Cor Primária</Label>
                      <div className="flex space-x-2">
                        <Input
                          type="color"
                          value={branding.primaryColor}
                          onChange={(e) => setBranding(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className="w-16 h-10 p-1 bg-white/10 border-white/20"
                        />
                        <Input
                          value={branding.primaryColor}
                          onChange={(e) => setBranding(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Cor Secundária</Label>
                      <div className="flex space-x-2">
                        <Input
                          type="color"
                          value={branding.secondaryColor}
                          onChange={(e) => setBranding(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className="w-16 h-10 p-1 bg-white/10 border-white/20"
                        />
                        <Input
                          value={branding.secondaryColor}
                          onChange={(e) => setBranding(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Preview da Personalização</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="p-6 rounded-lg border-2"
                    style={{ 
                      backgroundColor: branding.primaryColor + '20',
                      borderColor: branding.primaryColor + '50'
                    }}
                  >
                    <div className="text-center">
                      <h3 
                        className="text-2xl font-bold mb-2"
                        style={{ color: branding.primaryColor }}
                      >
                        {branding.companyName}
                      </h3>
                      <p className="text-white mb-4">{branding.welcomeMessage}</p>
                      <div 
                        className="w-32 h-32 mx-auto rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: branding.secondaryColor }}
                      >
                        <span className="text-white text-4xl">🎲</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Gestão de Usuários</h2>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Usuários Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'João Silva', email: 'joao@email.com', games: 45, winnings: 250.50, joined: '2024-03-15' },
                    { name: 'Maria Santos', email: 'maria@email.com', games: 32, winnings: 180.00, joined: '2024-03-14' },
                    { name: 'Pedro Costa', email: 'pedro@email.com', games: 28, winnings: 95.75, joined: '2024-03-13' },
                  ].map((user, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-gray-300 text-sm">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white">{user.games} jogos</p>
                        <p className="text-green-400">R$ {user.winnings.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
