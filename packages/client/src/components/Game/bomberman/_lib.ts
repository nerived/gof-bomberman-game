interface TMatrixTile {
  x: number
  y: number
  width: number
  height: number
  passable: boolean
}

export type TLevelMatrix = TMatrixTile[][]

interface TCircle {
  pX: number
  pY: number
  radius: number
}

interface TRect {
  x: number
  y: number
  width: number
  height: number
}

export const potentialPositions = [
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
]

export function circleVsCircleCollision(
  circleA: TCircle,
  circleB: TCircle,
  scale = 1
) {
  const distX = circleA.pX - circleB.pX
  const distY = circleA.pY - circleB.pY
  const radSum = (circleA.radius + circleB.radius) * scale
  return Math.pow(distX, 2) + Math.pow(distY, 2) <= Math.pow(radSum, 2)
}

export function circleVsRectCollision(
  circle: TCircle,
  rect: TRect,
  circleScale = 1
) {
  let { pX, pY } = circle
  const radius = Math.trunc(circle.radius * circleScale)
  const { x: rectX, y: rectY, width: rectW, height: rectH } = rect

  const vNearestPointX = Math.max(rectX, Math.min(rectX + rectW, pX))
  const vNearestPointY = Math.max(rectY, Math.min(rectY + rectH, pY))

  const vRayToNearestPointX = vNearestPointX - pX
  const vRayToNearestPointY = vNearestPointY - pY

  let vectorMagnitude = Math.sqrt(
    vRayToNearestPointX * vRayToNearestPointX +
      vRayToNearestPointY * vRayToNearestPointY
  )

  const overlap = radius - vectorMagnitude
  vectorMagnitude = vectorMagnitude || 1
  const isOverlap = overlap > 0

  if (isOverlap) {
    pX = pX - (vRayToNearestPointX / vectorMagnitude) * overlap
    pY = pY - (vRayToNearestPointY / vectorMagnitude) * overlap
  }

  return { pX, pY, isOverlap }
}
