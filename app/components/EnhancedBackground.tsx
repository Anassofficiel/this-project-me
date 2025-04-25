"use client"

import { useEffect, useRef } from "react"

const EnhancedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let mouseX = 0
    let mouseY = 0

    const particles: Particle[] = []
    const particleCount = 120
    // Professional dark color palette
    const colors = ["#2c3e50", "#34495e", "#3498db", "#2980b9", "#8e44ad", "#9b59b6"].map(
      (color) => color + "80", // Add 50% transparency
    )

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      life: number
      maxLife: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = Math.random() * 0.3 + 0.1
        this.life = 0
        this.maxLife = Math.random() * 200 + 100
      }

      update() {
        this.x += this.speedX + (mouseX - canvas.width / 2) * 0.001
        this.y += this.speedY + (mouseY - canvas.height / 2) * 0.001

        // Boundary check with bounce effect
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -1
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY *= -1
        }

        // Particle aging
        this.life++
        if (this.life >= this.maxLife) {
          // Reset particle instead of removing
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.life = 0
          this.maxLife = Math.random() * 200 + 100
        }
      }

      draw() {
        const lifeRatio = 1 - this.life / this.maxLife
        ctx.globalAlpha = this.opacity * lifeRatio
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - distance / 80)})`
            ctx.lineWidth = 0.3
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      // Create gradient background - dark professional colors
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#0f0f0f") // Very dark gray
      gradient.addColorStop(1, "#121212") // Dark gray with slight blue tint
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles and connections
      drawConnections()
      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    handleResize()
    init()
    animate()

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
}

export default EnhancedBackground
