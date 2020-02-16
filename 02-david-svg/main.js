import {
  render,
  group,
  rotate,
  translate,
  circle,
  square,
  line,
  range,
} from "./lib.js"

let star = () => group(square(15), rotate(45, square(15)))

let starsAround = offset => {
  let stars = 8
  return range(stars, n => rotate(n * (360 / stars), translate(offset, 0, star())))
}

render(
  group(
    star(),
    range(60, n => rotate(9 * n, starsAround((n + 1) * 30))),
  ),
)
