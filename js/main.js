const $canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const $pi = document.querySelector('#pi-value')
const $number = document.querySelector('#points-number')
const $startButton = document.querySelector('#start-button')
const $speed = document.querySelector('#speed-slider')

let isPlaying = false

let intervalId

let points = []

let speed = $speed.value

$startButton.addEventListener('click', () => {
  isPlaying = !isPlaying
  $startButton.innerText = isPlaying ? 'Stop' : 'Start'
  if (isPlaying) {
    intervalId = setInterval(spawnIteration, 1000 / speed)
  } else {
    clearInterval(intervalId)
  }
})

$speed.addEventListener('change', () => {
  speed = $speed.value
  if (isPlaying) {
    console.log(1000 / speed)
    clearInterval(intervalId)
    intervalId = setInterval(spawnIteration, 1000 / speed)
  }
})

let radius = Math.min(canvas.width, canvas.height) / 2
drawSquare(0, 0, radius * 2, radius * 2)
drawCircle(radius, radius, radius)

function spawnIteration() {
  let x = Math.random() * radius * 2
  let y = Math.random() * radius * 2
  spawnPoint(x, y)
  points.push({
    x: x,
    y: y
  })
  $pi.innerText = evalPi(points, radius, radius, radius)
  $number.innerText = points.length
}

function evalPi(points, x, y, radius) {
  let squareArea = radius * radius * 4
  let numberOfPoints = points.length
  let pointsInCircle = 0
  points.forEach(pnt => {
    if (isInCircle(x, y, radius, pnt.x, pnt.y)) {
      pointsInCircle += 1
    }
  })
  return pointsInCircle / numberOfPoints * 4
}

function spawnPoint(x, y) {
  ctx.fillRect(x, y, 1, 1)
}

function drawSquare(x, y, width, height) {
  ctx.rect(x, y, width, height);
  ctx.stroke();
}

function drawCircle(x, y, r) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.closePath()
}

function isInCircle(x, y, r, pointX, pointY) {
  return (pointX - x) * (pointX - x) + (pointY - y) * (pointY - y) <= r * r
}
