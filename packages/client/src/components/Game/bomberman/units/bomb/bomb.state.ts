import { BombUnit } from './bomb.unit'
import bombImageSrc from '../../assets/bomb-sprite.png'
import flameImageSrc from '../../assets/flame.png'
import explodeSoundSrc from '../../assets/explode.flac'

export const SPRITE_SIZE = 112

export const SPRITE_INDEX = {
  IDLE: { posY: 0, frames: 8 },
}

export abstract class BombState {
  constructor(protected bomb: BombUnit) {}

  abstract draw(_canvasCtx: CanvasRenderingContext2D, _offsetX: number): void
}

class Idle extends BombState {
  private frame = 0
  private sprite = 0
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
    this.frame++

    if (this.frame % 8 === 0) {
      this.frame = 0
      this.sprite = (this.sprite + 1) % SPRITE_INDEX.IDLE.frames
    }

    if (
      performance.now() - this._startTime < this._timer &&
      !this._bomb.startExplode
    ) {
      return
    }

    this._sound.play()
    this._bomb.detonate()
    this._bomb.changeState(new Explode(this._bomb))
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    this._update()

    canvasCtx.drawImage(
      this._image,
      SPRITE_SIZE * this.sprite,
      SPRITE_SIZE * SPRITE_INDEX.IDLE.posY,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this._bomb.x + offsetX,
      this._bomb.y,
      this._bomb.width,
      this._bomb.height
    )
  }
}

class Explode extends BombState {
  protected _bomb
  protected _image
  protected _explodeTime = 1000
  protected _frame = -1
  protected _startTime

  constructor(protected bomb: BombUnit) {
    super(bomb)
    this._bomb = bomb
    this._image = new Image()
    this._image.src = flameImageSrc
    this._startTime = performance.now()
  }

  private _update() {
    this._frame++

    if (this._frame === 4) {
      this._bomb.exploded = true
      this._bomb.command?.execute()
    }

    if (performance.now() - this._startTime >= this._explodeTime) {
      this._bomb.command?.execute()
    }
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    this._update()

    for (const drawable of [this._bomb, ...this._bomb.magnitude]) {
      canvasCtx.drawImage(
        this._image,
        drawable.x + offsetX,
        drawable.y,
        drawable.width,
        drawable.height
      )
    }
  }
}

export const STATE = {
  IDLE: Idle,
  EXPLODE: Explode,
}
