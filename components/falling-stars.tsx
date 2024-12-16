'use client'

import { useEffect, useRef } from 'react'

export function FallingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Particle {
      x: number
      y: number
      size: number
      speed: number
      color: string

      constructor(isStarDust: boolean) {
        this.x = Math.random() * (canvas?.width ?? window.innerWidth)
        this.y = Math.random() * (canvas?.height ?? window.innerHeight)
        this.size = isStarDust ? Math.random() * 0.5 + 0.1 : Math.random() * 1 + 0.5
        this.speed = Math.random() * 0.5 + 0.1
        this.color = isStarDust ? '#ffffff' : '#4ff2ff'
      }

      fall() {
        this.y += this.speed
        if (this.y > (canvas?.height ?? window.innerHeight)) {
          this.y = 0
          this.x = Math.random() * (canvas?.width ?? window.innerWidth)
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles = [
      ...Array.from({ length: 100 }, () => new Particle(false)), // Blue dust
      ...Array.from({ length: 150 }, () => new Particle(true))  // Star dust
    ]

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(particle => {
        particle.fall()
        particle.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}

