const $canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const $pi = document.querySelector('#pi-value')
const $number = document.querySelector('#points-number')

let radius = Math.min(canvas.width, canvas.height) / 2
drawSquare(0, 0, radius * 2, radius * 2)
drawCircle(radius, radius, radius)


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
