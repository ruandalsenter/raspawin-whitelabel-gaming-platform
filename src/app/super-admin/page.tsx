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

interface WhitelabelClient {
  id: string
  name: string
  domain: string
  status: 'active' | 'inactive' | 'pending'
  plan: 'basic' | 'premium' | 'enterprise'
  revenue: number
  users: number
  games: number
  createdAt: string
  branding: {
    primaryColor: string
    secondaryColor: string
    logo?: string
    companyName: string
  }
}

const mockClients: WhitelabelClient[] = [
  {
    id: 'client-1',
    name: 'Casino Digital',
    domain: 'casino-digital.com',
    status: 'active',
    plan: 'premium',
    revenue: 15420.50,
    users: 1250,
    games: 8540,
    createdAt: '2024-01-15',
    branding: {
      primaryColor: '#1E40AF',
      secondaryColor: '#3B82F6',
      companyName: 'Casino Digital'
    }
  },
  {
    id: 'client-2',
    name: 'Sorte Online',
    domain: 'sorteonline.com.br',
    status: 'active',
    plan: 'enterprise',
    revenue: 28750.80,
    users: 2100,
    games: 15200,
    createdAt: '2024-02-03',
    branding: {
      primaryColor: '#059669',
      secondaryColor: '#10B981',
      companyName: 'Sorte Online'
    }
  },
  {
    id: 'client-3',
    name: 'Mega Raspa',
    domain: 'megaraspa.net',
    status: 'pending',
    plan: 'basic',
    revenue: 0,
    users: 0,
    games: 0,
    createdAt: '2024-03-10',
    branding: {
      primaryColor: '#DC2626',
      secondaryColor: '#EF4444',
      companyName: 'Mega Raspa'
    }
  }
]

export default function SuperAdminPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [clients, setClients] = useState<WhitelabelClient[]>(mockClients)
  const [selectedClient, setSelectedClient] = useState<WhitelabelClient | null>(null)
  const [showNewClientForm, setShowNewClientForm] = useState(false)

  useEffect(() => {
    if (!user || user.role !== 'super-admin') {
      router.push('/auth')
      return
    }
  }, [user, router])

  const totalRevenue = clients.reduce((sum, client) => sum + client.revenue, 0)
  const totalUsers = clients.reduce((sum, client) => sum + client.users, 0)
  const totalGames = clients.reduce((sum, client) => sum + client.games, 0)
  const activeClients = clients.filter(c => c.status === 'active').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-200'
      case 'inactive': return 'bg-red-500/20 text-red-200'
      case 'pending': return 'bg-yellow-500/20 text-yellow-200'
      default: return 'bg-gray-500/20 text-gray-200'
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'basic': return 'bg-blue-500/20 text-blue-200'
      case 'premium': return 'bg-purple-500/20 text-purple-200'
      case 'enterprise': return 'bg-orange-500/20 text-orange-200'
      default: return 'bg-gray-500/20 text-gray-200'
    }
  }

  if (!user) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center">
                <span className="text-purple-900 font-bold text-xl">R</span>
              </div>
              <div>
                <h1 className="text-white text-xl font-bold">RaspaWin Super Admin</h1>
                <p className="text-purple-200 text-sm">Gestão Whitelabel Completa</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-purple-500/20 text-purple-200">
                Super Admin
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
                R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-green-200 text-sm">+12% este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Clientes Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-400">{activeClients}</p>
              <p className="text-blue-200 text-sm">de {clients.length} total</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Usuários Finais</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-400">
                {totalUsers.toLocaleString('pt-BR')}
              </p>
              <p className="text-purple-200 text-sm">+8% este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Jogos Realizados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-400">
                {totalGames.toLocaleString('pt-BR')}
              </p>
              <p className="text-orange-200 text-sm">+15% este mês</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="clients" className="data-[state=active]:bg-white/20">
              Clientes Whitelabel
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20">
              Analytics Global
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white/20">
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Clientes Whitelabel</h2>
              <Button
                onClick={() => setShowNewClientForm(true)}
                className="bg-purple-500 hover:bg-purple-600"
              >
                + Novo Cliente
              </Button>
            </div>

            <div className="grid gap-6">
              {clients.map((client) => (
                <Card key={client.id} className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-xl">{client.name}</CardTitle>
                        <CardDescription className="text-gray-300">
                          {client.domain}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                        <Badge className={getPlanColor(client.plan)}>
                          {client.plan}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-gray-300 text-sm">Receita</p>
                        <p className="text-white font-bold">
                          R$ {client.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">Usuários</p>
                        <p className="text-white font-bold">{client.users.toLocaleString('pt-BR')}</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">Jogos</p>
                        <p className="text-white font-bold">{client.games.toLocaleString('pt-BR')}</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">Criado em</p>
                        <p className="text-white font-bold">
                          {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => setSelectedClient(client)}
                      >
                        Gerenciar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Analytics
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Configurar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Analytics Global</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Performance por Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {clients.filter(c => c.status === 'active').map((client) => (
                    <div key={client.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white">{client.name}</span>
                        <span className="text-gray-300">
                          R$ {client.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <Progress 
                        value={(client.revenue / totalRevenue) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Distribuição de Planos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['basic', 'premium', 'enterprise'].map((plan) => {
                    const count = clients.filter(c => c.plan === plan).length
                    const percentage = (count / clients.length) * 100
                    return (
                      <div key={plan} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white capitalize">{plan}</span>
                          <span className="text-gray-300">{count} clientes</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Configurações da Plataforma</h2>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Configurações Gerais</CardTitle>
                <CardDescription className="text-gray-300">
                  Configurações que afetam toda a plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Permitir novos registros</Label>
                    <p className="text-sm text-gray-300">Permitir que novos clientes se registrem</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Modo manutenção</Label>
                    <p className="text-sm text-gray-300">Ativar modo de manutenção para todos os clientes</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Taxa de comissão padrão (%)</Label>
                  <Input
                    type="number"
                    defaultValue="15"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Limite de jogos por usuário/dia</Label>
                  <Input
                    type="number"
                    defaultValue="100"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
