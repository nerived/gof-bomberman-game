import type { PlayerUnit } from './units/player/player.unit'
const backgroundSrc = '/src/components/Game/bomberman/assets/background.png'

interface TContext {
  tileSize: number
  stickyZoneStart: number
  stickyZoneEnd: number
  visibleWidth: number
  visibleHeight: number
}

interface TDrawable {
  draw: (canvasCtx: CanvasRenderingContext2D, offsetX: number) => void
}

export class Window {
  private _canvasCtx
  private _tileSize
  private _stickyZoneStart
  private _stickyZoneEnd
  private _visibleWidth
  private _visibleHeight
  private _worldOffsetX
  private _backgroundImage

  constructor(canvasCtx: CanvasRenderingContext2D, context: TContext) {
    this._canvasCtx = canvasCtx
    this._tileSize = context.tileSize
    this._stickyZoneStart = context.stickyZoneStart
    this._stickyZoneEnd = context.stickyZoneEnd
    this._visibleWidth = context.visibleWidth
    this._visibleHeight = context.visibleHeight
    this._worldOffsetX = 0
    this._canvasCtx.canvas.width = this._visibleWidth
    this._canvasCtx.canvas.height = this._visibleHeight

    this._backgroundImage = new Image()
    this._backgroundImage.src = backgroundSrc
  }

  public resetOffset() {
    this._worldOffsetX = 0
  }

  public stickWorldToPlayer(player: PlayerUnit) {
    if (player.x < this._stickyZoneStart) {
      this._worldOffsetX = 0
    }

    if (player.x >= this._stickyZoneStart && player.x <= this._stickyZoneEnd) {
      this._worldOffsetX = this._stickyZoneStart - player.x
    }

    if (player.x > this._stickyZoneEnd) {
      this._worldOffsetX =
        this._visibleWidth * 0.5 - this._stickyZoneEnd - this._tileSize
    }
  }

  public draw(...drawable: TDrawable[]) {
    this._canvasCtx.clearRect(0, 0, this._visibleWidth, this._visibleHeight)
    this._canvasCtx.drawImage(this._backgroundImage, this._worldOffsetX, 0)

    drawable.forEach(item => item.draw(this._canvasCtx, this._worldOffsetX))
  }
}
