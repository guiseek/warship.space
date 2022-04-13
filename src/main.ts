import { Canvas } from './canvas'
import { SolarSystem } from './solar-system'

import './style.scss'


const query = <T extends HTMLElement>(selector: string) =>
  document.querySelector<T>(selector)!


const canvasEl = query<HTMLCanvasElement>('canvas')!
const canvas = new Canvas(canvasEl)

const canvasSSEl = query<HTMLCanvasElement>('#ss')!
const solarSystem = new SolarSystem(canvasSSEl);

solarSystem.init()

canvas.init()