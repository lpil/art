let element = (name, attributes, children = []) => {
  let ns = "http://www.w3.org/2000/svg"
  let element = document.createElementNS(ns, name)
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttributeNS(null, key, value)
  })
  children.forEach(child => element.appendChild(child))
  return element
}

export let render = collage => {
  document.querySelector("body").appendChild(
    element("svg", { width: "100%", height: "100%" }, [
      element(
        "g",
        { transform: "translate(500, 500)" }, // TODO: find a better way to move everything into the middle
        [collage(newTransform())],
      ),
    ]),
  )
}

let newTransform = () => ({
  translateX: 0,
  translateY: 0,
  scaleX: 1,
  scaleY: 1,
  rotate: 0,
})

let transformAttribute = ({ translateX, translateY, scaleX, scaleY, rotate }) =>
  [
    `translate(${translateX}, ${translateY})`,
    `scale(${scaleX}, ${scaleY})`,
    `rotate(${rotate}, ${0 - translateX / 2}, ${0 - translateY / 2})`,
  ].join(" ")

export let range = (upTo, f) => group(...[...Array(upTo).keys()].map(f))

export let range1 = (upTo, f) => range(upTo, n => f(n + 1))

export let line = length => transform =>
  element("line", {
    x1: 0,
    y1: 0,
    x2: length,
    y2: 0,
    stroke: "black",
    "vector-effect": "non-scaling-stroke",
    transform: transformAttribute(transform),
  })

export let rect = (height, width) => transform =>
  element("rect", {
    x: 0 - width / 2,
    y: 0 - height / 2,
    width: width,
    height: height,
    stroke: "black",
    fill: "none",
    "vector-effect": "non-scaling-stroke",
    transform: transformAttribute(transform),
  })

export let square = width => rect(width, width)

export let ellipse = (height, width) => transform =>
  element("ellipse", {
    cx: 0,
    cy: 0,
    rx: width / 2,
    ry: height / 2,
    stroke: "black",
    fill: "none",
    "vector-effect": "non-scaling-stroke",
    transform: transformAttribute(transform),
  })

export let circle = radius => ellipse(radius, radius)

export let group = (...shapes) => transform =>
  element(
    "g",
    { transform: transformAttribute(transform) },
    shapes.map(shape => shape(newTransform())),
  )

export let translate = (x, y, shape) => transform =>
  shape({
    ...transform,
    translateX: transform.translateX + x,
    translateY: transform.translateY + y,
  })

export let scale = (x, y, shape) => transform =>
  shape({
    ...transform,
    scaleX: transform.scaleX * x,
    scaleY: transform.scaleY * y,
  })

export let rotate = (degrees, shape) => transform =>
  group(shape)({
    ...transform,
    rotate: transform.rotate + degrees,
  })
