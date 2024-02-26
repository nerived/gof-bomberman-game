import { CircleGameUnit } from '../basics/unit'

const enemyImageSrc = '/src/components/Game/bomberman/assets/enemy.png'

export class EnemyUnit extends CircleGameUnit {
  private _image: HTMLImageElement
  public passable = true
  public destroyable = false
  public maxVelocity: number

  constructor(pixelRatio: number, x = 0, y = 0, radius = 0) {
    super(x, y, radius)
    this.maxVelocity = 4 * pixelRatio

    this._image = new Image()
    this._image.src = enemyImageSrc
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    canvasCtx.save()

    // debug circle >>>
    canvasCtx.beginPath()
    canvasCtx.arc(this.pX + offsetX, this.pY, this.radius, 0, 2 * Math.PI)
    canvasCtx.strokeStyle = 'red'
    canvasCtx.fillStyle = 'rgba(240 200 200 / 70%)'
    canvasCtx.stroke()
    canvasCtx.fill()
    // <<< debug circle

    canvasCtx.drawImage(this._image, this.x + offsetX, this.y)

    canvasCtx.restore()
  }
}
