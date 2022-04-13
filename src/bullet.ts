import { Position } from './types'
import laser from './assets/sounds/laser.mp3'

let N = 0


export class Bullet {
  i = N++

  position: Position
  front: Position

  velocity: Position

  constructor(position: Position, radians: number) {
    this.position = Object.create(position)
    this.front = Object.create(position)

    if (this.i % 5 === 0) {
      const audio = new Audio(laser)
      audio.play()
    }

    const velocity = 10

    this.velocity = {
      x: Math.cos(radians) * velocity,
      y: Math.sin(radians) * velocity,
    }

    this.position.x += this.velocity.x * 6
    this.position.y += this.velocity.y * 6

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
    ctx.stroke()
    ctx.closePath()
  }
}
