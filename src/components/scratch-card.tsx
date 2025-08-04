"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface Prize {
  id: string
  name: string
  value: number
  probability: number
  emoji: string
}

const prizes: Prize[] = [
  { id: '1', name: 'Jackpot!', value: 1000, probability: 0.01, emoji: '💎' },
  { id: '2', name: 'Super Prêmio', value: 500, probability: 0.02, emoji: '🏆' },
  { id: '3', name: 'Grande Prêmio', value: 100, probability: 0.05, emoji: '🎁' },
  { id: '4', name: 'Prêmio Médio', value: 50, probability: 0.10, emoji: '🎯' },
  { id: '5', name: 'Prêmio Pequeno', value: 20, probability: 0.15, emoji: '🎪' },
  { id: '6', name: 'Prêmio Mínimo', value: 10, probability: 0.20, emoji: '🎈' },
  { id: '7', name: 'Tente Novamente', value: 0, probability: 0.47, emoji: '😔' }
]

interface ScratchCardProps {
  gameId: string
  onComplete: (won: boolean, prize: string, value: number) => void
}

export function ScratchCard({ gameId, onComplete }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScratching, setIsScratching] = useState(false)
  const [scratchedPercentage, setScratchedPercentage] = useState(0)
  const [prize, setPrize] = useState<Prize | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    // Determinar o prêmio baseado nas probabilidades
    const random = Math.random()
    let cumulativeProbability = 0
    
    for (const p of prizes) {
      cumulativeProbability += p.probability
      if (random <= cumulativeProbability) {
        setPrize(p)
        break
      }
    }

    // Inicializar o canvas
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configurar o canvas
    canvas.width = 320
    canvas.height = 320

    // Desenhar a camada de cobertura
    const gradient = ctx.createLinearGradient(0, 0, 320, 320)
    gradient.addColorStop(0, '#C0C0C0')
    gradient.addColorStop(0.5, '#A0A0A0')
    gradient.addColorStop(1, '#808080')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 320, 320)

    // Adicionar textura
    ctx.fillStyle = '#999'
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 320
      const y = Math.random() * 320
      ctx.fillRect(x, y, 2, 2)
    }

    // Adicionar texto "RASPE AQUI"
    ctx.fillStyle = '#666'
    ctx.font = 'bold 24px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('RASPE AQUI', 160, 160)
    
    ctx.font = '16px Arial'
    ctx.fillText('🪙 Descubra seu prêmio! 🪙', 160, 190)

  }, [gameId])

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || isRevealed) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    let clientX: number, clientY: number

    if ('touches' in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const x = clientX - rect.left
    const y = clientY - rect.top

    // Configurar o modo de composição para "apagar"
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, 2 * Math.PI)
    ctx.fill()

    // Calcular a porcentagem raspada
    const imageData = ctx.getImageData(0, 0, 320, 320)
    const pixels = imageData.data
    let transparentPixels = 0

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++
      }
    }

    const percentage = (transparentPixels / (320 * 320)) * 100
    setScratchedPercentage(percentage)

    // Revelar automaticamente quando 30% for raspado
    if (percentage > 30 && !isRevealed) {
      setIsRevealed(true)
      setTimeout(() => setShowResult(true), 500)
    }
  }

  const handleMouseDown = () => setIsScratching(true)
  const handleMouseUp = () => setIsScratching(false)
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isScratching) scratch(e)
  }

  const handleTouchStart = () => setIsScratching(true)
  const handleTouchEnd = () => setIsScratching(false)
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (isScratching) scratch(e)
  }

  const handleComplete = () => {
    if (prize) {
      onComplete(prize.value > 0, prize.name, prize.value)
    }
  }

  const revealAll = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, 320, 320)
    setIsRevealed(true)
    setTimeout(() => setShowResult(true), 500)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {/* Background com o prêmio */}
        <div className="absolute inset-0 w-80 h-80 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl">
          {prize && (
            <div className="text-center">
              <div className="text-6xl mb-4">{prize.emoji}</div>
              <h3 className="text-yellow-900 font-bold text-2xl mb-2">
                {prize.name}
              </h3>
              {prize.value > 0 ? (
                <p className="text-yellow-800 text-xl font-bold">
                  R$ {prize.value.toFixed(2)}
                </p>
              ) : (
                <p className="text-yellow-800 text-lg">
                  Mais sorte na próxima!
                </p>
              )}
            </div>
          )}
        </div>

        {/* Canvas de raspagem */}
        <canvas
          ref={canvasRef}
          className={`rounded-2xl cursor-pointer transition-opacity duration-500 ${
            isRevealed ? 'opacity-0' : 'opacity-100'
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          style={{ touchAction: 'none' }}
        />
      </div>

      {/* Progress Bar */}
      <div className="w-80">
        <div className="flex justify-between text-sm text-green-200 mb-2">
          <span>Progresso da Raspagem</span>
          <span>{Math.round(scratchedPercentage)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-green-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(scratchedPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        {!isRevealed && (
          <Button
            onClick={revealAll}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Revelar Tudo
          </Button>
        )}
        
        {showResult && (
          <Button
            onClick={handleComplete}
            className="bg-green-400 text-green-900 hover:bg-green-300"
          >
            {prize && prize.value > 0 ? 'Coletar Prêmio! 🎉' : 'Jogar Novamente'}
          </Button>
        )}
      </div>

      {/* Instructions */}
      {!isRevealed && (
        <p className="text-green-200 text-sm text-center max-w-xs">
          💡 Dica: Raspe com o mouse ou toque na tela para descobrir seu prêmio!
        </p>
      )}
    </div>
  )
}
