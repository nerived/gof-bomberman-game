import { EnemyUnit } from './enemy.unit'
import enemyImageSrc from '../../assets/enemy.png'
import { IEnemyState } from './state'
import { rectVsRect } from '../../_lib'

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

  protected _getCurPos() {
    const titleSize = this._enemy.levelMatrix[0][0].width
    const curPosX = Math.trunc(this._enemy.pX / titleSize)
    const curPosY = Math.trunc(this._enemy.pY / titleSize)
    return { curPosX, curPosY }
  }

  protected abstract _update(): void

  public getScore() {
    return this._score
  }

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
    const { curPosX, curPosY } = this._getCurPos()

    const adjUnit = this._enemy.levelMatrix[curPosY][curPosX - 1]

    if (!adjUnit.passable && rectVsRect(this._enemy, adjUnit)) {
      this._enemy.x = adjUnit.getRight()
      this._enemy.setState('IDLE')
      return
    }

    this._enemy.x -= this._velocity
    this._enemy.onMove?.()
  }
}

class MoveRight extends DragonState {
  protected _update() {
    const { curPosX, curPosY } = this._getCurPos()

    const adjUnit = this._enemy.levelMatrix[curPosY][curPosX + 1]

    if (!adjUnit.passable && rectVsRect(this._enemy, adjUnit)) {
      this._enemy.x = adjUnit.getLeft() - adjUnit.width
      this._enemy.setState('IDLE')
      return
    }

    this._enemy.x += this._velocity
    this._enemy.onMove?.()
  }
}

class MoveUp extends DragonState {
  protected _update() {
    const { curPosX, curPosY } = this._getCurPos()

    const adjUnit = this._enemy.levelMatrix[curPosY - 1][curPosX]

    if (!adjUnit.passable && rectVsRect(this._enemy, adjUnit)) {
      this._enemy.y = adjUnit.getBottom()
      this._enemy.setState('IDLE')
      return
    }

    this._enemy.y -= this._velocity
    this._enemy.onMove?.()
  }
}

class MoveDown extends DragonState {
  protected _update() {
    const { curPosX, curPosY } = this._getCurPos()

    const adjUnit = this._enemy.levelMatrix[curPosY + 1][curPosX]

    if (!adjUnit.passable && rectVsRect(this._enemy, adjUnit)) {
      this._enemy.y = adjUnit.getTop() - adjUnit.height
      this._enemy.setState('IDLE')
      return
    }

    this._enemy.y += this._velocity
    this._enemy.onMove?.()
  }
}

export const DRAGON = {
  IDLE: Idle,
  LEFT: MoveLeft,
  UP: MoveUp,
  RIGHT: MoveRight,
  DOWN: MoveDown,
}
