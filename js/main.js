const $canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const $pi = document.querySelector('#pi-value')
const $number = document.querySelector('#points-number')
const $circleNumber = document.querySelector('#circle-points-number')
const $startButton = document.querySelector('#start-button')
const $speed = document.querySelector('#speed-slider')
const $speedLabel = document.querySelector('#speed-label')

$canvas.height = $canvas.width = window.innerHeight;

let isPlaying = false

let intervalId

let numberOfPoints = 0
let pointsInCircle = 0

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

$speed.addEventListener('input', event => {
  $speedLabel.innerText = event.target.value
  speed = $speed.value
  if (isPlaying) {
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
  $pi.innerText = evalPi(pointsInCircle, numberOfPoints, radius, radius, radius)
  $number.innerText = numberOfPoints
  $circleNumber.innerText = pointsInCircle
}

function evalPi(circlePoints, allPoints, x, y, radius) {
  return circlePoints / allPoints * 4
}

function spawnPoint(x, y) {
  numberOfPoints += 1
  if (isInCircle(radius, radius, radius, x, y)) {
    pointsInCircle += 1
    ctx.fillStyle = '#DD0000'
  } else {
    ctx.fillStyle = '#000000'
  }
  ctx.beginPath()
  ctx.arc(x, y, 1.5, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()
  // ctx.fillRect(x, y, 1, 1)
}

function drawSquare(x, y, width, height) {
  ctx.beginPath()
  ctx.rect(x, y, width, height);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath()
}

function drawCircle(x, y, r) {
  ctx.fillStyle = '#DD0000'
  ctx.beginPath()
  ctx.lineWidth = 2;
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.closePath()
}

function isInCircle(x, y, r, pointX, pointY) {
  return (pointX - x) * (pointX - x) + (pointY - y) * (pointY - y) <= r * r
}
