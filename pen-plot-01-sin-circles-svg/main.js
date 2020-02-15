let ns = "http://www.w3.org/2000/svg"
let body = document.querySelector("body")
let svg = document.createElementNS(ns, "svg")
svg.setAttributeNS(null, "width", "100%")
svg.setAttributeNS(null, "height", "100%")
body.appendChild(svg)

let renderElement = (name, attributes) => {
  let element = document.createElementNS(ns, name)
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttributeNS(null, key, value)
  })
  svg.appendChild(element)
}

let range = upTo => [...Array(upTo).keys()]

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
    Object.freeze(this)
  }

  translate(x, y) {
    return new Point(x + this.x, y + this.y)
  }
}

let xy = (x, y) => new Point(x, y)

const here = new Point(0, 0)

class Line {
  constructor(from, to) {
    this.from = from
    this.to = to
    Object.freeze(this)
  }

  render() {
    renderElement("line", {
      x1: this.from.x,
      y1: this.from.y,
      x2: this.to.x,
      y2: this.to.y,
      stroke: "black",
    })
  }

  translate(x, y) {
    return new Ellipse(this.from.translate(x, y), this.to.translate(x, y))
  }
}

class Rect {
  constructor(origin, width, height) {
    this.origin = origin
    this.width = width
    this.height = height
    Object.freeze(this)
  }

  render() {
    renderElement("rect", {
      x: this.origin.x,
      y: this.origin.y,
      width: this.width,
      height: this.height,
      stroke: "black",
      fill: "none",
    })
  }

  translate(x, y) {
    return new Ellipse(this.origin.translate(x, y), this.width, this.height)
  }
}

class Ellipse {
  constructor(origin, width, height) {
    this.origin = origin
    this.width = width
    this.height = height
    Object.freeze(this)
  }

  render() {
    renderElement("ellipse", {
      cx: this.origin.x,
      cy: this.origin.y,
      rx: this.width / 2,
      ry: this.height / 2,
      stroke: "black",
      fill: "none",
    })
  }

  translate(x, y) {
    return new Ellipse(this.origin.translate(x, y), this.width, this.height)
  }
}

class Circle {
  constructor(origin, radius) {
    this.origin = origin
    this.radius = radius
    Object.freeze(this)
  }

  render() {
    renderElement("ellipse", {
      cx: this.origin.x,
      cy: this.origin.y,
      rx: this.radius,
      ry: this.radius,
      stroke: "black",
      fill: "none",
    })
  }

  translate(x, y) {
    return new Circle(this.origin.translate(x, y), this.radius)
  }
}

class Collage {
  constructor(shapes) {
    this.shapes = shapes
    Object.freeze(shapes)
    Object.freeze(this)
  }

  render() {
    this.shapes.forEach(shape => shape.render())
  }

  translate(x, y) {
    return new Collage(this.shapes.map(shape => shape.translate(x, y)))
  }
}

// Drawing time

let ring = iteration => {
  let growth = iteration * 8
  let steps = 33
  let phase = ((Math.PI * 2) / steps) * iteration
  let wobble = Math.abs(Math.sin(phase) * 100)
  return new Circle(here, wobble + growth + 1)
}

new Collage(range(68).map(ring))
.translate(600, 600).render()
