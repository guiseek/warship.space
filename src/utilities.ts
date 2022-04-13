import { COLORS } from './constants'

export function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}
