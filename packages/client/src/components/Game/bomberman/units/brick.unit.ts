import { Queue } from '../basics/queue'
import { RectGameUnit, TGameUnit } from '../basics/unit'

const brickImageSrc = '/src/components/Game/bomberman/assets/brick.png'

export class BrickUnit extends RectGameUnit {
  private _image: HTMLImageElement
  public passable = false
  public destroyable = true
  public queue = new Queue<TGameUnit>()

  constructor(x = 0, y = 0, width = 0, heigth = 0) {
    super(x, y, width, heigth)

    this._image = new Image()
    this._image.src = brickImageSrc
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    canvasCtx.drawImage(this._image, this.x + offsetX, this.y)
  }
}