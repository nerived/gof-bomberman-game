import { BombUnit, SPRITE_INDEX, SPRITE_SIZE } from './bomb.unit'
import explodeSoundSrc from '../../assets/explode.flac'

export abstract class BombState {
  protected frame = 0
  protected sprite = 0
  constructor(protected readonly bomb: BombUnit) {}

  abstract draw(_canvasCtx: CanvasRenderingContext2D, _offsetX: number): void
}

class Idle extends BombState {
  protected _timer = 3000
  protected _startTime
  protected _sound

  constructor(protected bomb: BombUnit) {
    super(bomb)
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
      !this.bomb.startExplode
    ) {
      return
    }

    this._sound.play()
    this.bomb.detonate()
    this.bomb.changeState(new Explode(this.bomb))
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    this._update()

    canvasCtx.drawImage(
      this.bomb.image,
      SPRITE_SIZE * this.sprite,
      SPRITE_SIZE * SPRITE_INDEX.IDLE.posY,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.bomb.x + offsetX,
      this.bomb.y,
      this.bomb.width,
      this.bomb.height
    )
  }
}

class Explode extends BombState {
  private _update() {
    this.frame++

    if (this.frame % 4 === 0) {
      this.sprite = (this.sprite + 1) % SPRITE_INDEX.EXPLODE.frames
    }

    if (this.frame === 4 && !this.bomb.exploded) {
      this.bomb.exploded = true
      this.bomb.command?.execute()
    }

    if (this.sprite === SPRITE_INDEX.EXPLODE.frames - 1) {
      this.bomb.command?.execute()
    }
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    this._update()

    for (const drawable of [this.bomb, ...this.bomb.magnitude]) {
      canvasCtx.drawImage(
        this.bomb.image,
        SPRITE_SIZE * this.sprite,
        SPRITE_SIZE * SPRITE_INDEX.EXPLODE.posY,
        SPRITE_SIZE,
        SPRITE_SIZE,
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
