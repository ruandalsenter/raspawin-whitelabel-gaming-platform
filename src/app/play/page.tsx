"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScratchCard } from '@/components/scratch-card'

interface GameHistory {
  id: string
  date: string
  prize: string
  value: number
  won: boolean
}

export default function PlayPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [balance, setBalance] = useState(100.00)
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([])
  const [currentGame, setCurrentGame] = useState<string | null>(null)

  useEffect(() => {
    if (!user || user.role !== 'player') {
      router.push('/auth')
      return
    }

    // Carregar histórico do localStorage
    const savedHistory = localStorage.getItem(`game-history-${user.id}`)
    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory))
    }

    const savedBalance = localStorage.getItem(`balance-${user.id}`)
    if (savedBalance) {
      setBalance(parseFloat(savedBalance))
    }
  }, [user, router])

  const handleGameComplete = (won: boolean, prize: string, value: number) => {
    const newGame: GameHistory = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('pt-BR'),
      prize,
      value,
      won
    }

    const updatedHistory = [newGame, ...gameHistory].slice(0, 10) // Manter apenas os últimos 10 jogos
    setGameHistory(updatedHistory)
    localStorage.setItem(`game-history-${user?.id}`, JSON.stringify(updatedHistory))

    if (won) {
      const newBalance = balance + value
      setBalance(newBalance)
      localStorage.setItem(`balance-${user?.id}`, newBalance.toString())
    } else {
      const newBalance = Math.max(0, balance - 5) // Custo do jogo
      setBalance(newBalance)
      localStorage.setItem(`balance-${user?.id}`, newBalance.toString())
    }

    setCurrentGame(null)
  }

  const startNewGame = () => {
    if (balance < 5) {
      alert('Saldo insuficiente! Você precisa de pelo menos R$ 5,00 para jogar.')
      return
    }
    setCurrentGame(Date.now().toString())
  }

  if (!user) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
                <span className="text-green-900 font-bold text-xl">R</span>
              </div>
              <div>
                <h1 className="text-white text-xl font-bold">RaspaWin</h1>
                <p className="text-green-200 text-sm">Olá, {user.name}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-green-200 text-sm">Saldo</p>
                <p className="text-white text-xl font-bold">
                  R$ {balance.toFixed(2)}
                </p>
              </div>
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Area */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  🎯 Raspadinha Suprema
                </CardTitle>
                <div className="text-center">
                  <Badge className="bg-yellow-500/20 text-yellow-200">
                    Prêmios até R$ 1.000,00
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                {currentGame ? (
                  <ScratchCard
                    gameId={currentGame}
                    onComplete={handleGameComplete}
                  />
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-80 h-80 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🎲</div>
                        <p className="text-yellow-900 font-bold text-xl">
                          Clique para jogar!
                        </p>
                        <p className="text-yellow-800 text-sm mt-2">
                          Custo: R$ 5,00
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      onClick={startNewGame}
                      disabled={balance < 5}
                      size="lg"
                      className="bg-green-400 text-green-900 hover:bg-green-300 text-lg px-8 py-3"
                    >
                      {balance < 5 ? 'Saldo Insuficiente' : 'Jogar Agora - R$ 5,00'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Suas Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-green-200">Jogos Hoje:</span>
                  <span className="text-white font-bold">{gameHistory.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-200">Vitórias:</span>
                  <span className="text-white font-bold">
                    {gameHistory.filter(g => g.won).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-200">Taxa de Vitória:</span>
                  <span className="text-white font-bold">
                    {gameHistory.length > 0 
                      ? Math.round((gameHistory.filter(g => g.won).length / gameHistory.length) * 100)
                      : 0}%
                  </span>
                </div>
                
                {gameHistory.length > 0 && (
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-200">Progresso do Nível</span>
                      <span className="text-white">{gameHistory.length}/10</span>
                    </div>
                    <Progress 
                      value={(gameHistory.length / 10) * 100} 
                      className="h-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Game History */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Histórico Recente</CardTitle>
              </CardHeader>
              <CardContent>
                {gameHistory.length === 0 ? (
                  <p className="text-green-200 text-center py-4">
                    Nenhum jogo ainda
                  </p>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {gameHistory.map((game) => (
                      <div
                        key={game.id}
                        className={`p-3 rounded-lg border ${
                          game.won
                            ? 'bg-green-500/20 border-green-500/50'
                            : 'bg-red-500/20 border-red-500/50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className={`font-bold ${
                              game.won ? 'text-green-200' : 'text-red-200'
                            }`}>
                              {game.won ? '🎉 Ganhou!' : '😔 Não foi dessa vez'}
                            </p>
                            <p className="text-white text-sm">{game.prize}</p>
                            <p className="text-xs text-gray-300">{game.date}</p>
                          </div>
                          <div className={`text-right font-bold ${
                            game.won ? 'text-green-200' : 'text-red-200'
                          }`}>
                            {game.won ? '+' : '-'}R$ {game.value.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
