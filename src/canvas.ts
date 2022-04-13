import { Bullet } from './bullet'
import { Position } from './types'

export class Canvas {
  width: number
  height: number

  ctx: CanvasRenderingContext2D

  position: Position
  radians: number
  size: Position

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

  init = this._animate()

  constructor(public canvas: HTMLCanvasElement) {
    this.width = canvas.width = window.innerWidth
    this.height = canvas.height = window.innerHeight
    this.ctx = canvas.getContext('2d')!

    this.radians = 1

    const center = { x: this.width / 2, y: this.height / 2 }

    this.position = Object.create(center)
    this.size = { x: 16, y: 32 }

    this.ctx.strokeStyle = `rgb(0, 200, 200)`

    this._listenControls()
  }

  private _listenControls() {
    addEventListener('keydown', (e) => {
      let is = true
      switch (e.key) {
        case 'ArrowLeft':
          this.control.left = true
          break
        case 'ArrowUp':
          this.control.forward = true
          break
        case 'ArrowRight':
          this.control.right = true
          break
        case ' ':
          this.control.shoot = true
          break
        default:
          is = false
      }
      if (is) e.preventDefault()
    })

    addEventListener('keyup', (e) => {
      let is = true
      switch (e.key) {
        case 'ArrowLeft':
          this.control.left = false
          break
        case 'ArrowUp':
          this.control.forward = false
          break
        case 'ArrowRight':
          this.control.right = false
          break
        case ' ':
          this.control.shoot = false
          break
        default:
          is = false
      }
      if (is) e.preventDefault()
    })
  }

  private _animate() {
    return () => {
      window.requestAnimationFrame(this._animate())

      // this.ctx.fillStyle = `rgba(0, 0, 0, .4)`
      this.ctx.fillRect(0, 0, this.width, this.height)

      this._drawThing(this.ctx)

      this._drawBG(this.ctx, this.canvas.height)

      /**
       * Velocidade da rotação
       */
      if (this.control.left) {
        this.radVel -= this.control.forward ? 0.002 : 0.005
      }
      if (this.control.right) {
        this.radVel += this.control.forward ? 0.002 : 0.005
      }

      this.radians += this.radVel *= 0.9

      /**
       * Velocidade
       */
      if (this.control.forward) {
        this.vel.x += Math.cos(this.radians) / 15
        this.vel.y += Math.sin(this.radians) / 15
      }

      /**
       * Velocidade da curva
       */
      this.position.x += this.vel.x *= 0.995
      this.position.y += this.vel.y *= 0.995

      if (this.position.x > this.width + 2 * this.size.x)
        this.position.x = -2 * this.size.x
      if (this.position.y > this.height + 2 * this.size.x)
        this.position.y = -2 * this.size.x
      if (this.position.x < -2 * this.size.x)
        this.position.x = this.width + 2 * this.size.x
      if (this.position.y < -2 * this.size.x)
        this.position.y = this.height + 2 * this.size.x

      ++this.lastBullet
      if (this.control.shoot && this.lastBullet > this.bulletTime) {
        this.bullets.push(new Bullet(this.position, this.radians))
        this.lastBullet = 0
      }
      for (let i = 0; i < this.bullets.length; ++i) {
        let bull = this.bullets[i]

        bull.update(this.ctx)

        if (
          bull.front.x > this.width ||
          bull.front.x < 0 ||
          bull.front.y > this.height ||
          bull.front.y < 0
        ) {
          this.bullets.splice(i, 1)
          --i
        }
      }
    }
  }

  private _drawThing(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'rgb(200, 200, 200)'
    ctx.fillStyle = 'rgba(200, 200, 200, .1)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(
      this.position.x + Math.cos(this.radians) * this.size.y,
      this.position.y + Math.sin(this.radians) * this.size.y
    )
    ctx.lineTo(
      this.position.x +
        Math.cos(this.radians + (2 * Math.PI) / 3) * this.size.x,
      this.position.y + Math.sin(this.radians + (2 * Math.PI) / 3) * this.size.x
    )
    ctx.lineTo(
      this.position.x +
        Math.cos(this.radians - (2 * Math.PI) / 3) * this.size.x,
      this.position.y + Math.sin(this.radians - (2 * Math.PI) / 3) * this.size.x
    )
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
  }

  private _drawBG(ctx: CanvasRenderingContext2D, height: number) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height)

    gradient.addColorStop(0, '#000000')
    gradient.addColorStop(1, '#010101')

    this.ctx.fillStyle = gradient
  }
}
