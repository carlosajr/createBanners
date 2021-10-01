const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

const SIZE = {
  width: {
    initial: 0,
    final: 600
  },
  height: {
    initial: 0,
    final: 600
  }
}
const CONTENT_FRAME = {
  x: 35,
  y: 140,
  width: 530,
  height: 320,
}
CONTENT_FRAME.aspect = CONTENT_FRAME.width / CONTENT_FRAME.height

const MARGIN = {
  top: 15,
  right: 20,
}

const COLORS = {
  primary: "#3e5e91",
  secondary: "#6d8fc3",
  tertiary: "#ffffff",
  quaternary: "#fefefe"
}

const tituloBanner = "Armarios"
const subtituloBanner = "Perfeito para sua casa ou comercio"
const caminhoDoArquivo = "src/assets/produtos/2.png"

const canvas = createCanvas(SIZE.width.final, SIZE.height.final);
const context = canvas.getContext('2d');

(async () => {
  // cria o bg
  context.fillStyle = COLORS.quaternary
  context.fillRect(
    SIZE.width.initial,
    SIZE.height.initial,
    SIZE.width.final,
    SIZE.height.final
  )

  // cria curva de baixo
  context.fillStyle = COLORS.primary
  context.beginPath()
  context.moveTo(SIZE.width.initial, 465)
  context.bezierCurveTo(274, 504, 446, 419, SIZE.width.final, 258)
  context.lineTo(SIZE.width.final, SIZE.height.final)
  context.lineTo(SIZE.width.initial, SIZE.height.final)
  context.fill()

  // cria curva de cima
  context.fillStyle = COLORS.secondary
  context.beginPath()
  context.moveTo(SIZE.width.initial, 475)
  context.bezierCurveTo(306, 523, 454, 472, SIZE.width.final, 350)
  context.lineTo(SIZE.width.final, SIZE.height.final)
  context.lineTo(SIZE.width.initial, SIZE.height.final)
  context.fill()

  // coloca imagem de logo
  const logotipo = await loadImage('src/assets/logoGuimaraes.png')
  context.drawImage(logotipo, MARGIN.right, 10)

  // Escrever faça Pedido
  context.textBaseline = 'top'
  context.textAlign = 'right'
  context.font = 'bold 18pt Sans'
  context.fillStyle = COLORS.secondary

  let text = "FAÇA O SEU"
  context.fillText(text, SIZE.width.final - MARGIN.right, MARGIN.top)
  text = "PEDIDO AGORA!"
  context.fillText(text, SIZE.width.final - MARGIN.right, 45)

  context.fillStyle = COLORS.primary
  context.font = 'bold 14pt Sans'
  text = "(83)98184-2500"
  context.fillText(text, SIZE.width.final - MARGIN.right, 85)

  const tamanhoNumero = context.measureText(text)
  const logoWhats = await loadImage('src/assets/whatsapp.png')
  const posLogoWhats = SIZE.width.final
    - (MARGIN.right + tamanhoNumero.width + logoWhats.width + MARGIN.right)
  context.drawImage(logoWhats, posLogoWhats, 80)

  context.textBaseline = 'bottom'
  context.font = 'bold 44pt Sans'
  context.fillStyle = COLORS.tertiary
  context.fillText(
    tituloBanner,
    SIZE.width.final - MARGIN.right,
    SIZE.height.final - 35
  )

  context.font = 'bold 14pt Sans'
  context.fillText(
    subtituloBanner,
    SIZE.width.final - MARGIN.right,
    SIZE.height.final - 20
  )

  // coloca imagem no centro
  const produto = await loadImage(caminhoDoArquivo)
  const size = calculateSizeImage(produto)
  context.drawImage(produto, size.x, size.y, size.width, size.height)


  // renderiza a imagem
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync('./image.png', buffer)
})();

function calculateSizeImage(img) {
  const isVertical = img.height > img.width
  const isSquare = img.height === img.width

  if (isVertical || isSquare) {
    const aspectImg = img.height / img.width
    const newWidth = CONTENT_FRAME.height / aspectImg

    return {
      x: (SIZE.width.final - newWidth) / 2,
      y: CONTENT_FRAME.y,
      width: newWidth,
      height: CONTENT_FRAME.height
    }
  }

  const aspectImg = img.width / img.height
  const aspectImgLargerThanFrame = aspectImg > CONTENT_FRAME.aspect

  if (aspectImgLargerThanFrame) {
    const newHeight = CONTENT_FRAME.width / aspectImg

    return {
      x: CONTENT_FRAME.x,
      y: (SIZE.height.final - newHeight) / 2,
      width: CONTENT_FRAME.width,
      height: newHeight
    }
  }

  const newWidth = CONTENT_FRAME.height / aspectImg

  return {
    x: (SIZE.width.final - newWidth) / 2,
    y: CONTENT_FRAME.y,
    width: newWidth,
    height: CONTENT_FRAME.height
  }
}