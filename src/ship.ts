import { Bullet } from './bullet'
import { Position } from './types'

export class Ship {
  control = {
    left: false,
    right: false,
    forward: false,
    shoot: false,
  }

  vel = { x: 0, y: 0 }
  radVel = 0

  bullets: Bullet[] = []
  lastBullet = 0
  bulletTime = 1

  constructor(
    public ctx: CanvasRenderingContext2D,
    public position: Position,
    public radians: number,
    public size: Position
  ) {}

  update(width: number, height: number) {
    this.ctx.strokeStyle = 'rgba(200, 200, 200, .8)'
    this.ctx.lineWidth = 2
    this.ctx.beginPath()
    this.ctx.moveTo(
      this.position.x + Math.cos(this.radians) * this.size.y,
      this.position.y + Math.sin(this.radians) * this.size.y
    )
    this.ctx.lineTo(
      this.position.x +
        Math.cos(this.radians + (2 * Math.PI) / 3) * this.size.x,
      this.position.y + Math.sin(this.radians + (2 * Math.PI) / 3) * this.size.x
    )
    this.ctx.lineTo(
      this.position.x +
        Math.cos(this.radians - (2 * Math.PI) / 3) * this.size.x,
      this.position.y + Math.sin(this.radians - (2 * Math.PI) / 3) * this.size.x
    )
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()

    /**
     * Velocidade da rotação
     */
    if (this.control.left) {
      this.radVel -= this.control.forward ? 0.001 : 0.003
    }
    if (this.control.right) {
      this.radVel += this.control.forward ? 0.001 : 0.003
    }

    this.radians += this.radVel *= 0.9

    /**
     * Velocidade
     */
    if (this.control.forward) {
      this.vel.x += Math.cos(this.radians) / 8
      this.vel.y += Math.sin(this.radians) / 8
    }

    /**
     * Velocidade da curva
     */
    this.position.x += this.vel.x *= 0.885
    this.position.y += this.vel.y *= 0.885

    if (this.position.x > width + 2 * this.size.x)
      this.position.x = -2 * this.size.x
    if (this.position.y > height + 2 * this.size.x)
      this.position.y = -2 * this.size.x
    if (this.position.x < -2 * this.size.x)
      this.position.x = width + 2 * this.size.x
    if (this.position.y < -2 * this.size.x)
      this.position.y = height + 2 * this.size.x
  }
}
