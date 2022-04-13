import laser from './assets/sounds/laser.mp3'
import { getRandomColor } from './utilities'
import { Position } from './types'



export class Bullet {
  static inc = 0

  position: Position
  front: Position

  velocity: Position

  color = getRandomColor()

  constructor(position: Position, radians: number) {
    this.position = Object.create(position)
    this.front = Object.create(position)

    if (Bullet.inc++ % 5 === 0) {
      const audio = new Audio(laser)
      audio.inputMode = 'gamepad'
      audio.volume = 0.1
      audio.play()
    }

    const velocity = 10

    this.velocity = {
      x: Math.cos(radians) * velocity,
      y: Math.sin(radians) * velocity,
    }

    this.position.x += this.velocity.x * 16
    this.position.y += this.velocity.y * 16

    this.front.x += this.velocity.x * 5
    this.front.y += this.velocity.y * 5
  }

  update(ctx: CanvasRenderingContext2D) {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.front.x += this.velocity.x
    this.front.y += this.velocity.y

    ctx.beginPath()
    ctx.moveTo(this.position.x, this.position.y)
    ctx.lineTo(this.front.x, this.front.y)
    ctx.strokeStyle = this.color
    ctx.stroke()
    ctx.closePath()
  }
}
