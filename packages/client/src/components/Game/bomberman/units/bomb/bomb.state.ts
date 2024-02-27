import { BombUnit } from './bomb.unit'

const bombImageSrc = '/src/components/Game/bomberman/assets/bomb.png'
const flameImageSrc = '/src/components/Game/bomberman/assets/flame.png'
const explodeSoundSrc = '/src/components/Game/bomberman/assets/explode.flac'

export abstract class BombState {
  constructor(protected bomb: BombUnit) {}

  abstract draw(_canvasCtx: CanvasRenderingContext2D, _offsetX: number): void
}

class Idle extends BombState {
  protected _image
  protected _bomb
  protected _timer = 3000
  protected _startTime
  protected _sound

  constructor(protected bomb: BombUnit) {
    super(bomb)

    this._bomb = bomb
    this._image = new Image()
    this._image.src = bombImageSrc
    this._startTime = performance.now()
    this._sound = new Audio(explodeSoundSrc)
  }

  private _update() {
    if (
      performance.now() - this._startTime < this._timer &&
      !this._bomb.exploded
    ) {
      return
    }

    this._sound.play()
    this._bomb.detonate()
    this._bomb.changeState(new Explode(this._bomb))
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    this._update()
    canvasCtx.drawImage(this._image, this._bomb.x + offsetX, this._bomb.y)
  }
}

class Explode extends BombState {
  protected _bomb
  protected _image
  protected _explodeTime = 1000
  protected _frame = -1
  protected _startTime
  protected _complete = false

  constructor(protected bomb: BombUnit) {
    super(bomb)
    this._bomb = bomb
    this._image = new Image()
    this._image.src = flameImageSrc
    this._startTime = performance.now()
  }

  private _update() {
    this._frame++

    if (this._frame === 1) {
      this._bomb.command?.execute()
    }

    if (
      performance.now() - this._startTime >= this._explodeTime &&
      !this._complete
    ) {
      this._bomb.command?.execute()
      this._complete = true
    }
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    this._update()

    canvasCtx.drawImage(this._image, this._bomb.x + offsetX, this._bomb.y)

    this._bomb.magnitude.forEach(unit => {
      canvasCtx.drawImage(this._image, unit.x + offsetX, unit.y)
    })
  }
}

export const STATE = {
  IDLE: Idle,
  EXPLODE: Explode,
}
