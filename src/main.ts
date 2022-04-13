import { Bullet } from './bullet'

import './style.scss'

const canvas = document.querySelector('canvas')!

const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)
const ctx = canvas.getContext('2d')!

let radians = 1
const center = { x: width / 2, y: height / 2 }
const position = Object.create(center)
const vel = { x: 0, y: 0 }
let radVel = 0
const size = { x: 16, y: 32 }

const bullets: Bullet[] = []
let lastBullet = 0
const bulletTime = 1

const control = {
  left: false,
  right: false,
  forward: false,
  shoot: false,
}

ctx.strokeStyle = `rgb(0, 200, 200)`

function drawBG(ctx: CanvasRenderingContext2D, height: number) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height)

  gradient.addColorStop(0, '#271232')
  gradient.addColorStop(1, '#183070')

  ctx.fillStyle = gradient
}

function anim() {
  window.requestAnimationFrame(anim)

  // ctx.fillStyle = `rgba(0, 0, 0, .4)`
  ctx.fillRect(0, 0, width, height)

  drawThing()

  drawBG(ctx, canvas.height)

  /**
   * Velocidade da rotação
   */
  if (control.left) {
    radVel -= control.forward ? 0.002 : 0.005
  }
  if (control.right) {
    radVel += control.forward ? 0.002 : 0.005
  }

  radians += radVel *= 0.9

  /**
   * Velocidade
   */
  if (control.forward) {
    vel.x += Math.cos(radians) / 15
    vel.y += Math.sin(radians) / 15
  }

  /**
   * Velocidade da curva
   */
  position.x += vel.x *= 0.995
  position.y += vel.y *= 0.995

  if (position.x > width + 2 * size.x) position.x = -2 * size.x
  if (position.y > height + 2 * size.x) position.y = -2 * size.x
  if (position.x < -2 * size.x) position.x = width + 2 * size.x
  if (position.y < -2 * size.x) position.y = height + 2 * size.x

  ++lastBullet
  if (control.shoot && lastBullet > bulletTime) {
    bullets.push(new Bullet(position, radians))
    lastBullet = 0
  }
  for (let i = 0; i < bullets.length; ++i) {
    let bull = bullets[i]

    bull.update(ctx)

    if (
      bull.front.x > width ||
      bull.front.x < 0 ||
      bull.front.y > height ||
      bull.front.y < 0
    ) {
      bullets.splice(i, 1)
      --i
    }
  }
}
anim()

function drawThing() {
  ctx.strokeStyle = 'rgb(200, 200, 200)'
  ctx.fillStyle = 'rgba(200, 200, 200, .1)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(
    position.x + Math.cos(radians) * size.y,
    position.y + Math.sin(radians) * size.y
  )
  ctx.lineTo(
    position.x + Math.cos(radians + (2 * Math.PI) / 3) * size.x,
    position.y + Math.sin(radians + (2 * Math.PI) / 3) * size.x
  )
  ctx.lineTo(
    position.x + Math.cos(radians - (2 * Math.PI) / 3) * size.x,
    position.y + Math.sin(radians - (2 * Math.PI) / 3) * size.x
  )
  ctx.closePath()
  ctx.stroke()
  ctx.fill()
}

addEventListener('keydown', (e) => {
  let is = true
  switch (e.key) {
    case 'ArrowLeft':
      control.left = true
      break
    case 'ArrowUp':
      control.forward = true
      break
    case 'ArrowRight':
      control.right = true
      break
    case ' ':
      control.shoot = true
      break
    default:
      is = false
  }
  if (is) e.preventDefault()
})

addEventListener('keyup', (e) => {
  let is = true
  console.log(`keyCode: `, e.keyCode)
  console.log(`key: `, e.key)
  console.log(`code: `, e.code)

  switch (e.key) {
    case 'ArrowLeft':
      control.left = false
      break
    case 'ArrowUp':
      control.forward = false
      break
    case 'ArrowRight':
      control.right = false
      break
    case ' ':
      control.shoot = false
      break
    default:
      is = false
  }
  if (is) e.preventDefault()
})
