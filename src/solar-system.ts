import sun from './assets/sun.png'
import moon from './assets/moon.png'
import earth from './assets/earth.png'

const image = {
  sun: new Image(),
  moon: new Image(),
  earth: new Image(),
}
export class SolarSystem {
  constructor(public canvas: HTMLCanvasElement) {}

  init() {
    image.sun.src = sun
    image.moon.src = moon
    image.earth.src = earth
    this.draw()
  }

  draw = this._draw()

  private _draw() {
    return () => {
      const ctx = this.canvas.getContext('2d')!

      ctx.globalCompositeOperation = 'destination-over'
      
      // clear canvas
      ctx.clearRect(0, 0, 300, 300)

      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
      ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)'
      ctx.save()
      ctx.translate(150, 150)

      // Earth
      const time = new Date()
      ctx.rotate(
        ((2 * Math.PI) / 60) * time.getSeconds() +
          ((2 * Math.PI) / 60000) * time.getMilliseconds()
      )
      ctx.translate(105, 0)
      // Shadow
      ctx.fillRect(0, -12, 40, 24)
      ctx.drawImage(image.earth, -12, -12)

      // Moon
      ctx.save()
      ctx.rotate(
        ((2 * Math.PI) / 6) * time.getSeconds() +
          ((2 * Math.PI) / 6000) * time.getMilliseconds()
      )
      ctx.translate(0, 28.5)
      ctx.drawImage(image.moon, -3.5, -3.5)
      ctx.restore()

      ctx.restore()

      ctx.beginPath()
      // Earth orbit
      ctx.arc(150, 150, 105, 0, Math.PI * 2, false)
      ctx.strokeStyle = '#ffffff11'
      ctx.stroke()

      ctx.drawImage(image.sun, 0, 0, 300, 300)

      requestAnimationFrame(this._draw())
    }
  }
}
