import { rectVsRect } from '../../_lib'
import { EnemyState, EnemyUnit } from './enemy.unit'
import { IEnemyState } from './state'

const SPRITE_SIZE = 112

const SPRITE_INDEX = {
  IDLE: { posY: 0, frames: 4, throttle: 8 },
  RIGHT: { posY: 1, frames: 4, throttle: 8 },
  LEFT: { posY: 2, frames: 4, throttle: 8 },
  UP: { posY: 3, frames: 4, throttle: 8 },
  DOWN: { posY: 4, frames: 4, throttle: 8 },
  DEAD: { posY: 5, frames: 5, throttle: 8 },
}

export abstract class OctopusState implements IEnemyState {
  private _score
  protected _velocity
  protected frame = 0
  protected sprite = 0

  constructor(protected readonly _enemy: EnemyUnit) {
    this._score = 200
    this._velocity = this._enemy.velocity * 0.5
  }

  public getScore() {
    const result = this._score
    this._score = 0
    return result
  }

  protected abstract update(): void

  public abstract draw(
    canvasCtx: CanvasRenderingContext2D,
    offsetX: number
  ): void
}

class Idle extends OctopusState {
  protected update() {
    this.frame++

    if (this.frame % SPRITE_INDEX.IDLE.throttle === 0) {
      this.frame = 0
      this.sprite = (this.sprite + 1) % SPRITE_INDEX.IDLE.frames
    }
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this.update()

    canvasCtx.drawImage(
      this._enemy.image,
      SPRITE_SIZE * this.sprite,
      SPRITE_SIZE * SPRITE_INDEX.IDLE.posY,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this._enemy.x + offsetX,
      this._enemy.y,
      this._enemy.radius * 2,
      this._enemy.radius * 2
    )
  }
}

class MoveLeft extends OctopusState {
  protected move() {
    const { curPosX, curPosY } = this._enemy.getCurPos()

    const adjUnit = this._enemy.levelMatrix.getIn(curPosY, curPosX - 1)

    if (!adjUnit.passable && rectVsRect(this._enemy, adjUnit)) {
      this._enemy.x += this._velocity
      this._enemy.setState(EnemyState.IDLE)
      return
    }

    this._enemy.x -= this._velocity
    this._enemy.onMoveCommand?.()
  }

  protected update() {
    this.frame++

    if (this.frame % SPRITE_INDEX.LEFT.throttle === 0) {
      this.frame = 0
      this.sprite = (this.sprite + 1) % SPRITE_INDEX.LEFT.frames
    }
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this.update()
    this.move()

    canvasCtx.drawImage(
      this._enemy.image,
      SPRITE_SIZE * this.sprite,
      SPRITE_SIZE * SPRITE_INDEX.LEFT.posY,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this._enemy.x + offsetX,
      this._enemy.y,
      this._enemy.radius * 2,
      this._enemy.radius * 2
    )
  }
}

class MoveRight extends OctopusState {
  protected move() {
    const { curPosX, curPosY } = this._enemy.getCurPos()

    const adjUnit = this._enemy.levelMatrix.getIn(curPosY, curPosX + 1)

    if (!adjUnit.passable && rectVsRect(this._enemy, adjUnit)) {
      this._enemy.x -= this._velocity
      this._enemy.setState(EnemyState.IDLE)
      return
    }

    this._enemy.x += this._velocity
    this._enemy.onMoveCommand?.()
  }

  protected update() {
    this.frame++

    if (this.frame % SPRITE_INDEX.RIGHT.throttle === 0) {
      this.frame = 0
      this.sprite = (this.sprite + 1) % SPRITE_INDEX.RIGHT.frames
    }
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this.update()
    this.move()

    canvasCtx.drawImage(
      this._enemy.image,
      SPRITE_SIZE * this.sprite,
      SPRITE_SIZE * SPRITE_INDEX.RIGHT.posY,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this._enemy.x + offsetX,
      this._enemy.y,
      this._enemy.radius * 2,
      this._enemy.radius * 2
    )
  }
}

class MoveUp extends OctopusState {
  protected move() {
    const { curPosX, curPosY } = this._enemy.getCurPos()

    const adjUnit = this._enemy.levelMatrix.getIn(curPosY - 1, curPosX)

    if (!adjUnit.passable && rectVsRect(this._enemy, adjUnit)) {
      this._enemy.y += this._velocity
      this._enemy.setState(EnemyState.IDLE)
      return
    }

    this._enemy.y -= this._velocity
    this._enemy.onMoveCommand?.()
  }

  protected update() {
    this.frame++

    if (this.frame % SPRITE_INDEX.UP.throttle === 0) {
      this.frame = 0
      this.sprite = (this.sprite + 1) % SPRITE_INDEX.UP.frames
    }
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this.update()
    this.move()

    canvasCtx.drawImage(
      this._enemy.image,
      SPRITE_SIZE * this.sprite,
      SPRITE_SIZE * SPRITE_INDEX.UP.posY,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this._enemy.x + offsetX,
      this._enemy.y,
      this._enemy.radius * 2,
      this._enemy.radius * 2
    )
  }
}

class MoveDown extends OctopusState {
  protected move() {
    const { curPosX, curPosY } = this._enemy.getCurPos()

    const adjUnit = this._enemy.levelMatrix.getIn(curPosY + 1, curPosX)

    if (!adjUnit.passable && rectVsRect(this._enemy, adjUnit)) {
      this._enemy.y -= this._velocity
      this._enemy.setState(EnemyState.IDLE)
      return
    }

    this._enemy.y += this._velocity
    this._enemy.onMoveCommand?.()
  }

  protected update() {
    this.frame++

    if (this.frame % SPRITE_INDEX.DOWN.throttle === 0) {
      this.frame = 0
      this.sprite = (this.sprite + 1) % SPRITE_INDEX.DOWN.frames
    }
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this.update()
    this.move()

    canvasCtx.drawImage(
      this._enemy.image,
      SPRITE_SIZE * this.sprite,
      SPRITE_SIZE * SPRITE_INDEX.DOWN.posY,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this._enemy.x + offsetX,
      this._enemy.y,
      this._enemy.radius * 2,
      this._enemy.radius * 2
    )
  }
}

class Dead extends OctopusState {
  protected update() {
    this.frame++

    if (this.frame % SPRITE_INDEX.DEAD.throttle !== 0) return

    if (this.sprite === SPRITE_INDEX.DEAD.frames - 1) {
      this._enemy.onDeadCommand?.execute()
      return
    }

    this.frame = 0
    this.sprite = (this.sprite + 1) % SPRITE_INDEX.DEAD.frames
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this.update()

    canvasCtx.drawImage(
      this._enemy.image,
      SPRITE_SIZE * this.sprite,
      SPRITE_SIZE * SPRITE_INDEX.DEAD.posY,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this._enemy.x + offsetX,
      this._enemy.y,
      this._enemy.radius * 2,
      this._enemy.radius * 2
    )
  }
}

export const OCTOPUS = {
  IDLE: Idle,
  LEFT: MoveLeft,
  UP: MoveUp,
  RIGHT: MoveRight,
  DOWN: MoveDown,
  DEAD: Dead,
}
