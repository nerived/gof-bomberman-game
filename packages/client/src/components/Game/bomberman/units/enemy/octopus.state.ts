import { rectVsRect } from '../../_lib'
import { EnemyState, EnemyUnit } from './enemy.unit'
import { IEnemyState } from './state'

export class OctopusState implements IEnemyState {
  private _score
  protected _velocity

  constructor(protected readonly _enemy: EnemyUnit) {
    this._score = 200
    this._velocity = this._enemy.velocity * 0.5
  }

  public getScore() {
    const result = this._score
    this._score = 0
    return result
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected _update() {}

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this._update()

    canvasCtx.save()

    canvasCtx.drawImage(
      this._enemy.image,
      this._enemy.x + offsetX,
      this._enemy.y,
      this._enemy.radius * 2,
      this._enemy.radius * 2
    )

    canvasCtx.restore()
  }
}

class Idle extends OctopusState {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected _update() {}
}

class MoveLeft extends OctopusState {
  protected _update() {
    const { curPosX, curPosY } = this._enemy.getCurPos()

    const adjUnit = this._enemy.levelMatrix.getIn(curPosY, curPosX - 1)

    if (!adjUnit.passable && rectVsRect(this._enemy, adjUnit)) {
      this._enemy.x += this._velocity
      this._enemy.setState(EnemyState.IDLE)
      return
    }

    this._enemy.x -= this._velocity
    this._enemy.onMoveCommand?.(this._enemy)
  }
}

class MoveRight extends OctopusState {
  protected _update() {
    const { curPosX, curPosY } = this._enemy.getCurPos()

    const adjUnit = this._enemy.levelMatrix.getIn(curPosY, curPosX + 1)

    if (!adjUnit.passable && rectVsRect(this._enemy, adjUnit)) {
      this._enemy.x -= this._velocity
      this._enemy.setState(EnemyState.IDLE)
      return
    }

    this._enemy.x += this._velocity
    this._enemy.onMoveCommand?.(this._enemy)
  }
}

class MoveUp extends OctopusState {
  protected _update() {
    const { curPosX, curPosY } = this._enemy.getCurPos()

    const adjUnit = this._enemy.levelMatrix.getIn(curPosY - 1, curPosX)

    if (!adjUnit.passable && rectVsRect(this._enemy, adjUnit)) {
      this._enemy.y += this._velocity
      this._enemy.setState(EnemyState.IDLE)
      return
    }

    this._enemy.y -= this._velocity
    this._enemy.onMoveCommand?.(this._enemy)
  }
}

class MoveDown extends OctopusState {
  protected _update() {
    const { curPosX, curPosY } = this._enemy.getCurPos()

    const adjUnit = this._enemy.levelMatrix.getIn(curPosY + 1, curPosX)

    if (!adjUnit.passable && rectVsRect(this._enemy, adjUnit)) {
      this._enemy.y -= this._velocity
      this._enemy.setState(EnemyState.IDLE)
      return
    }

    this._enemy.y += this._velocity
    this._enemy.onMoveCommand?.(this._enemy)
  }
}

export const OCTOPUS = {
  IDLE: Idle,
  LEFT: MoveLeft,
  UP: MoveUp,
  RIGHT: MoveRight,
  DOWN: MoveDown,
}
