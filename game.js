const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)
canvas.height = 120
canvas.width = 160

const scale = 4
canvas.style.width = `${canvas.width * scale}px`
canvas.style.height = `${canvas.height * scale}px`
canvas.style.imageRendering = "pixelated"

const spriteCellSize = 16
const spriteSheet = new Image()
spriteSheet.crossOrigin = "anonymous"
spriteSheet.addEventListener("load", onLoad, false)
spriteSheet.src = "./monochrome-transparent.png"

const spriteSheetCanvas = document.createElement('canvas')

let heroSprite = undefined

function onLoad() {
  if (!heroSprite) {
    spriteSheetCanvas.width = spriteSheet.width
    spriteSheetCanvas.height = spriteSheet.height
    const spriteSheetContext = spriteSheetCanvas.getContext('2d')
    clearScreen(spriteSheetContext, spriteSheetCanvas.width, spriteSheetCanvas.height)
    drawSpriteSheet(spriteSheetContext, spriteSheet)
    heroSprite = getSpriteSheetCell(spriteSheetContext, spriteCellSize, 26, 0)
  }

  clearScreen(ctx, canvas.width, canvas.height)
  ctx.putImageData(heroSprite, canvas.width / 2 - spriteCellSize / 2, canvas.height / 2 - spriteCellSize / 2)
}

function clearScreen(ctx, w, h) {
  ctx.save()
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, w, h)
  ctx.restore()
}

function drawSpriteSheet(ctx, spriteSheet) {
  ctx.drawImage(spriteSheet, 0, 0)
}

function getSpriteSheetCell(ctx, spriteCellSize, col, row) {
  const x = spriteCellSize * col
  const y = spriteCellSize * row
  return ctx.getImageData(x, y, spriteCellSize, spriteCellSize)
}
