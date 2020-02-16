import { Collage, Circle, origin, range } from "./svg.js"

let ring = iteration => {
  let growth = iteration * 8
  let steps = 33
  let phase = ((Math.PI * 2) / steps) * iteration
  let wobble = Math.abs(Math.sin(phase) * 100)
  return new Circle(origin, wobble + growth + 1)
}

new Collage(range(68).map(ring)).translate(600, 600).render()
