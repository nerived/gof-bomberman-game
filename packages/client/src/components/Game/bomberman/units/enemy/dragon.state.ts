import enemyImageSrc from '../../assets/enemy.png'
import { rectVsRect } from '../../_lib'
import { EnemyState, EnemyUnit } from './enemy.unit'
import { IEnemyState } from './state'

export abstract class DragonState implements IEnemyState {
  private _image
  private _score
  protected _velocity

  constructor(protected readonly _enemy: EnemyUnit) {
    this._image = new Image()
    this._image.src = enemyImageSrc
    this._score = 200
    this._velocity = this._enemy.velocity * 0.5
  }

  public getScore() {
    return this._score
  }

  protected abstract _update(): void

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this._update()

    canvasCtx.save()

    // debug circle >>>
    canvasCtx.beginPath()
    canvasCtx.arc(
      this._enemy.pX + offsetX,
      this._enemy.pY,
      this._enemy.radius,
      0,
      2 * Math.PI
    )
    canvasCtx.strokeStyle = 'red'
    canvasCtx.fillStyle = 'rgba(240 200 200 / 70%)'
    canvasCtx.stroke()
    canvasCtx.fill()
    // <<< debug circle

    canvasCtx.drawImage(
      this._image,
      this._enemy.x + offsetX,
      this._enemy.y,
      this._enemy.radius * 2,
      this._enemy.radius * 2
    )

    canvasCtx.restore()
  }
}

class Idle extends DragonState {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected _update() {}
}

class MoveLeft extends DragonState {
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

class MoveRight extends DragonState {
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

class MoveUp extends DragonState {
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

class MoveDown extends DragonState {
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

export const DRAGON = {
  IDLE: Idle,
  LEFT: MoveLeft,
  UP: MoveUp,
  RIGHT: MoveRight,
  DOWN: MoveDown,
}
