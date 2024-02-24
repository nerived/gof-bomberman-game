import { RectGameUnit } from '../basics/unit'

export class DoorUnit extends RectGameUnit {
  public passable = false
  public destroyable = false
  private _image: HTMLImageElement

  constructor(x = 0, y = 0, width = 0, heigth = 0) {
    super(x, y, width, heigth)

    this._image = new Image()
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    canvasCtx.drawImage(this._image, this.x + offsetX, this.y)
  }
}