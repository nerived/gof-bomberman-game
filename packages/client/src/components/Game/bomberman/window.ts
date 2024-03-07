import type { PlayerUnit } from './units/player/player.unit'
import backgroundSrc from './assets/background.png'

interface TGameContext {
  tileSize: number
  stickyZoneStart: number
  stickyZoneEnd: number
  worldWidth: number
  worldHeight: number
  visibleWidth: number
  visibleHeight: number
  pixelRatio: number
}

interface TDrawable {
  draw: (canvasCtx: CanvasRenderingContext2D, offsetX: number) => void
}

export class GameWindow {
  private _canvasCtx
  private _tileSize
  private _worldWidth
  private _worldHeight
  private _stickyZoneStart
  private _stickyZoneEnd
  private _visibleWidth
  private _visibleHeight
  private _worldOffsetX
  private _backgroundImage
  private _dt = 0
  private _drawDt = 0
  private _timeStamp = performance.now()
  private readonly _drawInterval = 16

  constructor(canvasCtx: CanvasRenderingContext2D, context: TGameContext) {
    this._canvasCtx = canvasCtx
    this._tileSize = context.tileSize
    this._worldWidth = context.worldWidth
    this._worldHeight = context.worldHeight
    this._visibleWidth = context.visibleWidth
    this._visibleHeight = context.visibleHeight
    this._stickyZoneStart = context.stickyZoneStart
    this._stickyZoneEnd = context.stickyZoneEnd
    this._worldOffsetX = 0
    this._canvasCtx.canvas.style.width =
      this._visibleWidth / context.pixelRatio + 'px'
    this._canvasCtx.canvas.style.height =
      this._visibleHeight / context.pixelRatio + 'px'
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

  private _fpsGuard() {
    this._dt = (performance.now() - this._timeStamp) << 0
    this._timeStamp = performance.now()
    this._drawDt += this._dt

    const shouldDraw = this._drawDt >= this._drawInterval

    if (shouldDraw) {
      this._drawDt = this._drawDt - this._drawInterval
    }

    return shouldDraw
  }

  public draw(...drawable: TDrawable[]) {
    if (!this._fpsGuard()) return

    this._canvasCtx.clearRect(0, 0, this._visibleWidth, this._visibleHeight)
    this._canvasCtx.drawImage(
      this._backgroundImage,
      this._worldOffsetX,
      0,
      this._worldWidth,
      this._worldHeight
    )

    drawable.forEach(item => item.draw(this._canvasCtx, this._worldOffsetX))
  }
}
