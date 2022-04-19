import { Bullet } from './bullet'
import { Ship } from './ship'
import { Star } from './star'

const STAR_COLOR = '#fff'
const STAR_SIZE = 2
const STAR_MIN_SCALE = 0.2
const OVERFLOW_THRESHOLD = 50
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8


export class Canvas {
  width: number
  height: number
  
  scale = 1 // device pixel ratio

  ctx: CanvasRenderingContext2D

  init = this._animate()

  ship: Ship
  stars: Star[] = []

  ships: Ship[] = []

  constructor(public canvas: HTMLCanvasElement) {
    this.width = canvas.width = window.innerWidth
    this.height = canvas.height = window.innerHeight
    this.ctx = canvas.getContext('2d')!

    const center = { x: this.width / 2, y: this.height / 2 }

    this.ship = new Ship(this.ctx, Object.create(center), 1, { x: 16, y: 32 })
    // const ship = new Ship(this.ctx, Object.create(center), 1, { x: 32, y: 64 })

    // this.ships.push(
    //   new Ship(this.ctx, Object.create(center), 1, { x: 16, y: 32 })
    // )
    // this.ships.push(
    //   new Ship(this.ctx, Object.create(center), 1, { x: 32, y: 64 })
    // )

    this.ctx.strokeStyle = `rgb(0, 200, 200)`

    this._listenControls()
    this._createStars()
  }

  private _listenControls() {
    addEventListener('keydown', (e) => {
      console.log(e.key)

      let is = true
      switch (e.key) {
        case 'a':
          this.ships.forEach((ship) => {
            ship.control.left = true
          })
          break
        case 'w':
          this.ships.forEach((ship) => {
            ship.control.forward = true
          })
          break
        case 'd':
          this.ships.forEach((ship) => {
            ship.control.right = true
          })
          break
        case 'Control':
          this.ships.forEach((ship) => {
            ship.control.shoot = true
          })
          break
        default:
          is = false
      }

      switch (e.key) {
        case 'ArrowLeft':
          this.ship.control.left = true
          break
        case 'ArrowUp':
          this.ship.control.forward = true
          break
        case 'ArrowRight':
          this.ship.control.right = true
          break
        case ' ':
          this.ship.control.shoot = true
          break
        default:
          is = false
      }
      if (is) e.preventDefault()
    })

    addEventListener('keyup', (e) => {
      let is = true

      switch (e.key) {
        case 'a':
          this.ships.forEach((ship) => {
            ship.control.left = false
          })
          break
        case 'w':
          this.ships.forEach((ship) => {
            ship.control.forward = false
          })
          break
        case 'd':
          this.ships.forEach((ship) => {
            ship.control.right = false
          })
          break
        case 'Control':
          this.ships.forEach((ship) => {
            ship.control.shoot = false
          })
          break
        default:
          is = false
      }

      switch (e.key) {
        case 'ArrowLeft':
          this.ship.control.left = false
          break
        case 'ArrowUp':
          this.ship.control.forward = false
          break
        case 'ArrowRight':
          this.ship.control.right = false
          break
        case ' ':
          this.ship.control.shoot = false
          break
        default:
          is = false
      }
      if (is) e.preventDefault()
    })
  }

  private _animate() {
    return () => {
      requestAnimationFrame(this._animate())

      this.ctx.fillStyle = `rgba(0, 0, 0, .4)`
      this.ctx.fillRect(0, 0, this.width, this.height)

      this._drawBG(this.ctx, this.canvas.height)

      // this.ships.forEach((ship) => {
      this.ship.update(this.width, this.height)

      ++this.ship.lastBullet
      if (this.ship.control.shoot && this.ship.lastBullet > this.ship.bulletTime) {
        this.ship.bullets.push(new Bullet(this.ship.position, this.ship.radians))
        this.ship.lastBullet = 0
      }
      for (let i = 0; i < this.ship.bullets.length; ++i) {
        let bull = this.ship.bullets[i]

        bull.update(this.ctx)

        if (
          bull.front.x > this.width ||
          bull.front.x < 0 ||
          bull.front.y > this.height ||
          bull.front.y < 0
        ) {
          this.ship.bullets.splice(i, 1)
          --i
        }
      }
      // })

      this.ship.update(this.width, this.height)

      ++this.ship.lastBullet
      if (
        this.ship.control.shoot &&
        this.ship.lastBullet > this.ship.bulletTime
      ) {
        this.ship.bullets.push(
          new Bullet(this.ship.position, this.ship.radians)
        )
        this.ship.lastBullet = 0
      }
      for (let i = 0; i < this.ship.bullets.length; ++i) {
        let bull = this.ship.bullets[i]

        bull.update(this.ctx)

        if (
          bull.front.x > this.width ||
          bull.front.x < 0 ||
          bull.front.y > this.height ||
          bull.front.y < 0
        ) {
          this.ship.bullets.splice(i, 1)
          --i
        }
      }

      this.stars.forEach((star) => {
        star.x += (this.ship.vel.x * -1) * star.z
        star.y += (this.ship.vel.y * -1) * star.z
    
        star.x += (star.x - this.width / 2) * star.vel.z * star.z
        star.y += (star.y - this.height / 2) * star.vel.z * star.z
        star.z += star.vel.z
    
        // recycle when out of bounds
        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > this.width + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > this.height + OVERFLOW_THRESHOLD
        ) {
          this._recycleStar(star)
        }
      })

      this.stars.forEach((star) => {
        this.ctx.beginPath()
        this.ctx.lineCap = 'round'
        this.ctx.lineWidth = STAR_SIZE * star.z * this.scale
        this.ctx.globalAlpha = 0.5 + 0.5 * Math.random()
        this.ctx.strokeStyle = STAR_COLOR
    
        this.ctx.beginPath()
        this.ctx.moveTo(star.x, star.y)
    
        let tailX = (this.ship.vel.x * -1) * 2;
        let tailY = (this.ship.vel.y * -1) * 2;
    
        // stroke() wont work on an invisible line
        if (Math.abs(tailX) < 0.1) tailX = 0.5
        if (Math.abs(tailY) < 0.1) tailY = 0.5
    
        this.ctx.lineTo(star.x + tailX, star.y + tailY)
    
        this.ctx.stroke()
      })
    }
  }

  private _placeStar(star: Star) {
    star.x = Math.random() * this.width
    star.y = Math.random() * this.height
  }

  private _recycleStar(star: Star) {
    let direction = 'z'
  
    let vx = Math.abs(this.ship.vel.x);
    let vy = Math.abs(this.ship.vel.y);
  
    if (vx > 1 || vy > 1) {
      let axis
  
      if (vx > vy) {
        axis = Math.random() < vx / (vx + vy) ? 'h' : 'v'
      } else {
        axis = Math.random() < vy / (vx + vy) ? 'v' : 'h'
      }
  
      if (axis === 'h') {
        direction = this.ship.vel.x > 0 ? 'l' : 'r'
      } else {
        direction = this.ship.vel.y > 0 ? 't' : 'b'
      }
    }
  
    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
  
    if (direction === 'z') {
      star.z = 0.1
      star.x = Math.random() * this.width
      star.y = Math.random() * this.height
    } else if (direction === 'l') {
      star.x = -OVERFLOW_THRESHOLD
      star.y = this.height * Math.random()
    } else if (direction === 'r') {
      star.x = this.width + OVERFLOW_THRESHOLD
      star.y = this.height * Math.random()
    } else if (direction === 't') {
      star.x = this.width * Math.random()
      star.y = -OVERFLOW_THRESHOLD
    } else if (direction === 'b') {
      star.x = this.width * Math.random()
      star.y = this.height + OVERFLOW_THRESHOLD
    }
  }

  private _createStars()  {
    for (let i = 0; i < STAR_COUNT; i++) {
      
      this.stars.push(new Star(0, 0, STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)))
    }
  }

  private _resize() {
    this.scale = window.devicePixelRatio || 1
  
    this.width = window.innerWidth * this.scale
    this.height = window.innerHeight * this.scale
  
    this.canvas.width = this.width
    this.canvas.height = this.height
  
    this.stars.forEach(this._placeStar)
  }

  private _drawBG(ctx: CanvasRenderingContext2D, height: number) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height)

    gradient.addColorStop(0, '#000000')
    gradient.addColorStop(1, '#010101')

    this.ctx.fillStyle = gradient
  }
}
